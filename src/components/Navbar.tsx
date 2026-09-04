import React from 'react';
import { ShoppingBag, Sparkles, User as UserIcon, Store, ShieldCheck, LogOut, Search, Menu, X } from 'lucide-react';
import { User, CartDetails } from '../types';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  user: User | null;
  cart: CartDetails | null;
  onOpenAI: () => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  user,
  cart,
  onOpenAI,
  onLogout,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const itemCount = cart?.itemCount || 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              id="brand-logo-btn"
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center font-bold text-white text-xs tracking-wider transition-transform group-hover:scale-105">
                AC
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-zinc-900">
                  Agent<span className="text-zinc-500 font-medium">Cart</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 rounded">
                  AI-Native
                </span>
              </div>
            </button>

            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
              <button
                id="nav-home-btn"
                onClick={() => navigate('/')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute === '/'
                    ? 'text-zinc-900 bg-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Home
              </button>
              <button
                id="nav-products-btn"
                onClick={() => navigate('/products')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute === '/products'
                    ? 'text-zinc-900 bg-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Products
              </button>
              <button
                id="nav-orders-btn"
                onClick={() => navigate(user ? '/orders' : '/login')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentRoute === '/orders'
                    ? 'text-zinc-900 bg-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Orders
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden lg:block">
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search across all categories (electronics, fitness, kitchen, beauty, decor...)"
                className="w-full bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 pl-9 pr-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900 transition-colors"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Ask AI Agent Trigger Button */}
            <button
              id="navbar-ask-ai-btn"
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Ask AI</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="navbar-cart-btn"
              onClick={() => navigate('/cart')}
              className="relative p-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute 0.5 top-0.5 right-0.5 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account / Role Buttons */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {user.role === 'SELLER' && (
                  <button
                    id="navbar-seller-portal-btn"
                    onClick={() => navigate('/seller')}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200 hover:bg-zinc-200 transition-colors"
                  >
                    <Store className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Seller Hub</span>
                  </button>
                )}
                {user.role === 'ADMIN' && (
                  <button
                    id="navbar-admin-portal-btn"
                    onClick={() => navigate('/admin')}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200 hover:bg-zinc-200 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Admin</span>
                  </button>
                )}

                <button
                  id="navbar-account-btn"
                  onClick={() => navigate('/account')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors border border-zinc-200/60"
                >
                  <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
                </button>

                <button
                  id="navbar-logout-btn"
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="navbar-signin-btn"
                onClick={() => navigate('/login')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-zinc-600" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-zinc-200 space-y-2">
            <form onSubmit={onSearchSubmit} className="relative pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-zinc-50 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 pl-9 pr-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-900"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            </form>
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 rounded"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/products');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 rounded"
            >
              Browse Catalog
            </button>
            <button
              onClick={() => {
                navigate(user ? '/orders' : '/login');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 rounded"
            >
              My Orders
            </button>
            {user?.role === 'SELLER' && (
              <button
                onClick={() => {
                  navigate('/seller');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-100 rounded"
              >
                Seller Hub
              </button>
            )}
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => {
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-100 rounded"
              >
                Admin Control
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
