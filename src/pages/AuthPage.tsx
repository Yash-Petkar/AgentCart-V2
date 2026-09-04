import React, { useState } from 'react';
import { Lock, Mail, User as UserIcon, Shield, Store, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { User } from '../types';
import { api } from '../lib/api';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
  navigate: (route: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, navigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'CUSTOMER' | 'SELLER'>('CUSTOMER');
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (isRegister) {
        const res = await api.register({
          email,
          password,
          name,
          role,
          phone,
          storeName: role === 'SELLER' ? storeName : undefined,
        });
        onLoginSuccess(res.user);
      } else {
        const res = await api.login(email, password);
        onLoginSuccess(res.user);
      }
      navigate('/');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string, demoPass: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await api.login(demoEmail, demoPass);
      onLoginSuccess(res.user);
      if (res.user.role === 'SELLER') navigate('/seller');
      else if (res.user.role === 'ADMIN') navigate('/admin');
      else {
        // If customer was checking out or has cart items, resume checkout
        try {
          const cartRes = await api.getCart();
          if (cartRes.items && cartRes.items.length > 0) {
            navigate('/checkout');
            return;
          }
        } catch (_) {}
        navigate('/');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setIsRegister(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-md bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-xs">
          AC
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
          {isRegister ? 'Create an Account' : 'Welcome to AgentCart'}
        </h1>
        <p className="text-xs text-zinc-500">
          {isRegister
            ? 'Sign up for personalized AI shopping and verified checkout'
            : 'Sign in to access your cart, orders, and saved addresses'}
        </p>
      </div>

      {/* Quick Demo Sign-in Box */}
      <div className="bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 space-y-3 text-xs shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Instant 1-Click Role Login</span>
          </div>
          <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">All Accounts Active</span>
        </div>
        <p className="text-zinc-400 text-[11px] leading-relaxed">
          Click any role below to sign in instantly, or use these credentials:
        </p>
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <button
            type="button"
            id="demo-login-customer"
            onClick={() => handleQuickDemoLogin('customer@agentcart.com', 'Customer@123')}
            disabled={isLoading}
            className="p-2.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-center transition-all hover:scale-[1.02] active:scale-95"
          >
            <UserIcon className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
            <div className="font-semibold text-xs text-white">Customer</div>
            <div className="text-[10px] text-zinc-400 truncate">Customer@123</div>
          </button>
          <button
            type="button"
            id="demo-login-seller"
            onClick={() => handleQuickDemoLogin('seller@agentcart.com', 'Seller@123')}
            disabled={isLoading}
            className="p-2.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-center transition-all hover:scale-[1.02] active:scale-95"
          >
            <Store className="w-4 h-4 mx-auto mb-1 text-sky-400" />
            <div className="font-semibold text-xs text-white">Seller</div>
            <div className="text-[10px] text-zinc-400 truncate">Seller@123</div>
          </button>
          <button
            type="button"
            id="demo-login-admin"
            onClick={() => handleQuickDemoLogin('admin@agentcart.com', 'Admin@123')}
            disabled={isLoading}
            className="p-2.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-center transition-all hover:scale-[1.02] active:scale-95"
          >
            <Shield className="w-4 h-4 mx-auto mb-1 text-purple-400" />
            <div className="font-semibold text-xs text-white">Admin</div>
            <div className="text-[10px] text-zinc-400 truncate">Admin@123</div>
          </button>
        </div>

        <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Admin login: <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">admin@agentcart.com</code> / <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">Admin@123</code></span>
          <button
            type="button"
            onClick={() => handleFillCredentials('admin@agentcart.com', 'Admin@123')}
            className="text-amber-400 hover:underline font-medium ml-1 shrink-0"
          >
            Fill form
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-2xs space-y-4">
        {/* Toggle Login / Register */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-md text-xs font-medium text-zinc-600">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-1.5 rounded-sm transition-colors ${
              !isRegister ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-1.5 rounded-sm transition-colors ${
              isRegister ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="block text-zinc-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('CUSTOMER')}
                    className={`p-2 rounded-md border text-center font-medium ${
                      role === 'CUSTOMER'
                        ? 'border-zinc-900 bg-zinc-50 text-zinc-900 font-semibold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    Shopper (Customer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('SELLER')}
                    className={`p-2 rounded-md border text-center font-medium ${
                      role === 'SELLER'
                        ? 'border-zinc-900 bg-zinc-50 text-zinc-900 font-semibold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    Merchant (Seller)
                  </button>
                </div>
              </div>

              {role === 'SELLER' && (
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Store / Business Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                    placeholder="e.g. Apex Tech Store"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-zinc-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. user@example.com"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-md p-2 text-xs focus:outline-none focus:bg-white focus:border-zinc-900"
              required
            />
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
