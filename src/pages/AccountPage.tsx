import React, { useState, useEffect } from 'react';
import { User as UserIcon, MapPin, Trash2, Plus, Shield, Store, ShoppingBag, LogOut } from 'lucide-react';
import { User, Address } from '../types';
import { api } from '../lib/api';

interface AccountPageProps {
  user: User | null;
  onLogout: () => void;
  onSwitchRole: (email: string, pass: string) => void;
  navigate: (route: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  user,
  onLogout,
  onSwitchRole,
  navigate,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '9876543210');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadAddresses();
  }, [user]);

  const loadAddresses = async () => {
    try {
      const res = await api.getAddresses();
      setAddresses(res.addresses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.addAddress({
        fullName,
        street,
        city,
        state,
        postalCode,
        country: 'India',
        phone,
        isDefault: addresses.length === 0,
      });
      setAddresses(prev => [...prev, res.address]);
      setShowAddModal(false);
      setStreet('');
      setCity('');
      setState('');
      setPostalCode('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await api.deleteAddress(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">My Account</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Manage profile, delivery addresses, and session credentials</p>
        </div>
        <button
          onClick={onLogout}
          className="px-3 py-1.5 rounded-md bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs font-medium border border-zinc-200 flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-900">{user.name}</h3>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200">
                {user.role}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-zinc-600">
            <div>
              <span className="text-zinc-400 block text-[11px]">Email Address</span>
              <strong className="text-zinc-900 font-medium">{user.email}</strong>
            </div>
            {user.phone && (
              <div>
                <span className="text-zinc-400 block text-[11px]">Phone</span>
                <span className="text-zinc-800">{user.phone}</span>
              </div>
            )}
            {user.storeName && (
              <div>
                <span className="text-zinc-400 block text-[11px]">Store Name</span>
                <span className="text-zinc-900 font-semibold">{user.storeName}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-100 space-y-2">
            <button
              onClick={() => navigate('/orders')}
              className="w-full py-2 px-3 rounded-md bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200/60 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-zinc-700" />
                <span>My Orders & Invoices</span>
              </div>
              <span className="text-zinc-400">→</span>
            </button>

            {user.role === 'SELLER' && (
              <button
                onClick={() => navigate('/seller')}
                className="w-full py-2 px-3 rounded-md bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200/60 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-zinc-700" />
                  <span>Seller Hub & Inventory</span>
                </div>
                <span className="text-zinc-400">→</span>
              </button>
            )}

            {user.role === 'ADMIN' && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full py-2 px-3 rounded-md bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200/60 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-zinc-700" />
                  <span>Admin Control Center</span>
                </div>
                <span className="text-zinc-400">→</span>
              </button>
            )}
          </div>

          {/* Quick Demo Switcher */}
          <div className="pt-3 border-t border-zinc-100 text-xs space-y-2">
            <span className="font-semibold text-zinc-700 block text-[11px]">Switch Role (Instant Test Mode):</span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                id="account-switch-customer"
                onClick={() => onSwitchRole('customer@agentcart.com', 'Customer@123')}
                className="p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md font-medium text-zinc-800 border border-zinc-200 transition-colors"
              >
                Customer
              </button>
              <button
                id="account-switch-seller"
                onClick={() => onSwitchRole('seller@agentcart.com', 'Seller@123')}
                className="p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md font-medium text-zinc-800 border border-zinc-200 transition-colors"
              >
                Seller
              </button>
              <button
                id="account-switch-admin"
                onClick={() => onSwitchRole('admin@agentcart.com', 'Admin@123')}
                className="p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md font-medium text-zinc-800 border border-zinc-200 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Addresses Management */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-zinc-200 p-5 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-700" />
              <span>Saved Delivery Addresses</span>
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs font-medium text-zinc-700 hover:text-zinc-900 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Address</span>
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 bg-zinc-50 rounded-lg border border-zinc-200">
              No saved addresses found. Add an address for rapid one-click checkout.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {addresses.map(addr => (
                <div key={addr.id} className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 transition-colors relative text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-zinc-900 font-semibold">{addr.fullName}</strong>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-zinc-400 hover:text-red-600 transition-colors"
                      title="Delete Address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-zinc-600 leading-relaxed">{addr.street}</div>
                  <div className="text-zinc-600">
                    {addr.city}, {addr.state} - {addr.postalCode}
                  </div>
                  <div className="text-zinc-500 pt-1 text-[11px]">Phone: {addr.phone}</div>
                </div>
              ))}
            </div>
          )}

          {/* Add Address Form Modal */}
          {showAddModal && (
            <form onSubmit={handleAddAddress} className="pt-4 border-t border-zinc-200 space-y-3 text-xs">
              <h3 className="font-semibold text-zinc-900">Add New Shipping Address</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
                <input
                  type="text"
                  placeholder="Street / Flat"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="col-span-2 bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="px-4 py-2 bg-zinc-900 hover:bg-black text-white font-medium text-xs rounded-md shadow-xs transition-colors">
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-medium text-xs rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
