import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { CartDetails, Product } from '../types';

interface CartPageProps {
  cart: CartDetails | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onViewProduct: (productId: string) => void;
  onOpenAIWithPrompt: (prompt: string) => void;
  navigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onViewProduct,
  onOpenAIWithPrompt,
  navigate,
}) => {
  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-lg mx-auto bg-white rounded-xl border border-zinc-200/80 p-8 sm:p-12 text-center space-y-5 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200/70 flex items-center justify-center mx-auto shadow-2xs">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Your Shopping Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
              Explore our catalog of gaming laptops, smartphones, and accessories, or let our AI agent recommend products matching your budget.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            <button
              id="empty-cart-browse-btn"
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors shadow-2xs"
            >
              Browse Catalog
            </button>
            <button
              id="empty-cart-ai-btn"
              onClick={() => onOpenAIWithPrompt('Find me the best laptop under ₹70,000')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              <span>Ask AI to Recommend</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasOutOfStockItem = items.some(item => !item.inStock);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {cart?.itemCount} item(s) in your basket • Server-authoritative totals
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Stock warning banner if any item exceeds availability */}
      {hasOutOfStockItem && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Inventory constraint detected:</span> One or more items in your cart exceeds current warehouse stock. Please adjust quantities before checkout.
          </div>
        </div>
      )}

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-3.5">
          {items.map(({ product, quantity, itemSubtotal, inStock }) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-zinc-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-zinc-300 transition-colors shadow-2xs"
            >
              {/* Product Image */}
              <img
                src={product.images[0]}
                alt={product.name}
                onClick={() => onViewProduct(product.id)}
                className="w-20 h-20 rounded-md object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0 cursor-pointer"
              />

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{product.brand}</div>
                <h3
                  onClick={() => onViewProduct(product.id)}
                  className="font-medium text-sm text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-2 cursor-pointer mt-0.5"
                >
                  {product.name}
                </h3>
                <div className="text-xs text-zinc-500 mt-1 flex items-center gap-3">
                  <span>Unit: ₹{product.price.toLocaleString('en-IN')}</span>
                  {product.stock <= 4 && (
                    <span className="text-amber-700 font-medium">
                      ({product.stock} left in stock)
                    </span>
                  )}
                </div>

                {!inStock && (
                  <div className="mt-1 text-[11px] font-semibold text-red-600">
                    * Requested quantity ({quantity}) exceeds available stock ({product.stock})
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                <div className="flex items-center border border-zinc-200 rounded-md bg-white overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-50 font-bold text-xs"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-50 font-bold text-xs disabled:opacity-30"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right">
                  <div className="text-sm font-bold text-zinc-900">
                    ₹{itemSubtotal.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-[11px] text-zinc-400 hover:text-red-600 mt-1 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 sticky top-24 shadow-2xs">
            <h2 className="text-sm font-semibold text-zinc-900 pb-3 border-b border-zinc-100">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-zinc-900">₹{cart?.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery & Handling</span>
                <span className="font-semibold text-zinc-900">
                  {cart?.shipping === 0 ? 'FREE' : `₹${cart?.shipping}`}
                </span>
              </div>
              {cart && cart.discount > 0 && (
                <div className="flex justify-between text-zinc-900 font-medium">
                  <span>Promotional Savings</span>
                  <span>-₹{cart.discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm">
                <span className="font-semibold text-zinc-900">Final Total</span>
                <span className="text-2xl font-bold text-zinc-900">
                  ₹{cart?.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="cart-checkout-btn"
                onClick={onProceedToCheckout}
                disabled={hasOutOfStockItem || isEmpty}
                className="w-full py-2.5 px-4 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-[11px] text-zinc-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                <span>Zero-trust server price calculation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                <span>Protected by Razorpay Test Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
