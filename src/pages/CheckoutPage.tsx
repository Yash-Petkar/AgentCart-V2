import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Plus, CheckCircle2, ArrowRight, Lock, AlertCircle, ShoppingBag } from 'lucide-react';
import { User, CartDetails, Address, Order } from '../types';
import { api } from '../lib/api';
import { RazorpayModal } from '../components/RazorpayModal';

interface CheckoutPageProps {
  user: User | null;
  cart: CartDetails | null;
  onPaymentCompleted: (order: Order) => void;
  onLoginSuccess?: (user: User) => void;
  navigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  user,
  cart,
  onPaymentCompleted,
  onLoginSuccess,
  navigate,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(!user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Address Form Fields
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newPhone, setNewPhone] = useState(user?.phone || '9876543210');

  // Razorpay Checkout Modal state
  const [razorpayOrderData, setRazorpayOrderData] = useState<any | null>(null);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadAddresses();
      if (!newFullName) setNewFullName(user.name);
      if (user.phone && newPhone === '9876543210') setNewPhone(user.phone);
    } else {
      setShowNewAddressForm(true);
    }
  }, [user]);

  const loadAddresses = async () => {
    try {
      const res = await api.getAddresses();
      setAddresses(res.addresses);
      if (res.addresses.length > 0) {
        const defaultAddr = res.addresses.find(a => a.isDefault) || res.addresses[0];
        setSelectedAddressId(defaultAddr.id);
        setShowNewAddressForm(false);
      } else {
        setShowNewAddressForm(true);
      }
    } catch (err) {
      console.error('Failed to fetch addresses', err);
      setShowNewAddressForm(true);
    }
  };

  const handleQuickCustomerLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await api.login('customer@agentcart.com', 'Customer@123');
      onLoginSuccess?.(res.user);
      const addrRes = await api.getAddresses();
      setAddresses(addrRes.addresses);
      if (addrRes.addresses.length > 0) {
        const defaultAddr = addrRes.addresses.find(a => a.isDefault) || addrRes.addresses[0];
        setSelectedAddressId(defaultAddr.id);
        setShowNewAddressForm(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newStreet || !newCity || !newState || !newPostalCode || !newPhone) {
      setErrorMessage('Please fill out all address fields');
      return;
    }

    if (!user) {
      // For guests, mark address as ready
      setShowNewAddressForm(false);
      setErrorMessage(null);
      return;
    }

    try {
      const res = await api.addAddress({
        fullName: newFullName,
        street: newStreet,
        city: newCity,
        state: newState,
        postalCode: newPostalCode,
        country: 'India',
        phone: newPhone,
        isDefault: addresses.length === 0,
      });

      setAddresses(prev => [...prev, res.address]);
      setSelectedAddressId(res.address.id);
      setShowNewAddressForm(false);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save address');
    }
  };

  const handleInitiateRazorpay = async () => {
    let selectedAddr: Address | undefined;
    if (user && addresses.length > 0 && selectedAddressId && !showNewAddressForm) {
      selectedAddr = addresses.find(a => a.id === selectedAddressId);
    }

    if (!selectedAddr) {
      if (!newFullName || !newStreet || !newCity || !newState || !newPostalCode || !newPhone) {
        setErrorMessage('Please complete all shipping address fields before proceeding');
        setShowNewAddressForm(true);
        return;
      }
      selectedAddr = {
        id: `addr_${Date.now()}`,
        userId: user?.id || 'guest',
        fullName: newFullName,
        street: newStreet,
        city: newCity,
        state: newState,
        postalCode: newPostalCode,
        country: 'India',
        phone: newPhone,
        isDefault: true,
      };
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Step 1: Create Order on server with strict authoritativeness
      const orderRes = await api.createCheckoutOrder(selectedAddr);
      console.log('[Checkout] Created order on backend:', orderRes);

      setRazorpayOrderData(orderRes);
      setIsRazorpayModalOpen(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create order. Please verify your cart.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-zinc-200">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Checkout</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Review destination address and authorize payment</p>
      </div>

      {/* Guest Authentication Banner if not signed in */}
      {!user && (
        <div className="bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-zinc-100">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Checkout Options</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Sign in with 1 click as Customer (Yash Sharma) or checkout directly as a guest.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="checkout-quick-login-customer"
              onClick={handleQuickCustomerLogin}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium border border-zinc-700/80 transition-colors shrink-0"
            >
              1-Click Sign In (Customer)
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white text-xs font-medium transition-colors shrink-0"
            >
              All Sign-in Options
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Delivery Address Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-700" />
                <span>Shipping Address</span>
              </h2>
              {!showNewAddressForm && (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="text-xs font-medium text-zinc-700 hover:text-zinc-900 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              )}
            </div>

            {/* Saved Addresses List */}
            {!showNewAddressForm && addresses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addresses.map(addr => (
                  <label
                    key={addr.id}
                    className={`cursor-pointer p-4 rounded-lg border transition-all relative flex flex-col justify-between ${
                      selectedAddressId === addr.id
                        ? 'border-zinc-900 bg-zinc-50/70 ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-900">{addr.fullName}</span>
                        <input
                          type="radio"
                          name="shipping_addr"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="accent-zinc-900"
                        />
                      </div>
                      <div className="text-zinc-600 leading-relaxed">{addr.street}</div>
                      <div className="text-zinc-600">
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </div>
                      <div className="text-zinc-500 pt-1 text-[11px]">Phone: {addr.phone}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* New Address Form */}
            {showNewAddressForm && (
              <form onSubmit={handleCreateAddress} className="space-y-3.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-700 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={e => setNewFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={e => setNewPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-zinc-700 font-medium mb-1">Street Address / Flat No.</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={e => setNewStreet(e.target.value)}
                      placeholder="e.g. Flat 402, Sunset Heights, Indiranagar"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={e => setNewCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-1">State</label>
                    <input
                      type="text"
                      value={newState}
                      onChange={e => setNewState(e.target.value)}
                      placeholder="e.g. Karnataka"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-1">Postal PIN Code</label>
                    <input
                      type="text"
                      value={newPostalCode}
                      onChange={e => setNewPostalCode(e.target.value)}
                      placeholder="e.g. 560038"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
                  >
                    Save Address
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-4 py-2 rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Purchased Items Preview */}
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-3 shadow-2xs">
            <h2 className="text-sm font-semibold text-zinc-900">Itemized Items ({cart.items.length})</h2>
            <div className="divide-y divide-zinc-100">
              {cart.items.map(({ product, quantity, itemSubtotal }) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0"
                    />
                    <div>
                      <div className="font-medium text-zinc-900">{product.name}</div>
                      <div className="text-zinc-500 mt-0.5 text-[11px]">
                        Qty: {quantity} • ₹{product.price.toLocaleString('en-IN')} each
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-zinc-900 text-sm">
                    ₹{itemSubtotal.toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Authoritative Pricing Summary & Payment */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 sticky top-24 shadow-2xs">
            <h2 className="text-sm font-semibold text-zinc-900 pb-3 border-b border-zinc-100">
              Payment Summary
            </h2>

            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-zinc-900">₹{cart.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-zinc-900">
                  {cart.shipping === 0 ? 'FREE' : `₹${cart.shipping}`}
                </span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-zinc-900 font-medium">
                  <span>Discount</span>
                  <span>-₹{cart.discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm">
                <span className="font-semibold text-zinc-900">Amount Due</span>
                <span className="text-2xl font-bold text-zinc-900">
                  ₹{cart.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              id="checkout-pay-btn"
              onClick={handleInitiateRazorpay}
              disabled={isLoading || !selectedAddressId}
              className="w-full py-2.5 px-4 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Initializing Razorpay...</span>
              ) : (
                <>
                  <span>Pay ₹{cart.totalAmount.toLocaleString('en-IN')} with Razorpay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-[11px] text-zinc-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                <span>Server-authoritative total validation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                <span>Cryptographic HMAC SHA-256 signatures</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Gateway Modal Component */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        orderData={razorpayOrderData}
        onPaymentSuccess={confirmedOrder => {
          setIsRazorpayModalOpen(false);
          onPaymentCompleted(confirmedOrder);
        }}
      />
    </div>
  );
};
