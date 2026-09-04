import React from 'react';
import { ShieldCheck, Zap, Lock, RefreshCw, Sparkles } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-white text-zinc-600 border-t border-zinc-200 pt-12 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security & Architecture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-zinc-200">
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80">
            <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">AI-Grounded Commerce</h4>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">Multi-step agent with deterministic catalog constraints and parameter verification.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80">
            <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">Razorpay Test Mode</h4>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">HMAC-SHA256 signature verification. Never trust frontend payment reports.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80">
            <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">Authoritative Pricing</h4>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">Backend computes exact subtotals, discounts, shipping, and atomic inventory locks.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80">
            <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">Order Notifications</h4>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">Automatic itemized HTML purchase confirmations generated upon verification.</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <h3 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider mb-3">AgentCart Platform</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-zinc-900 transition-colors">
                  Home & Discovery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-zinc-900 transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cart')} className="hover:text-zinc-900 transition-colors">
                  Shopping Cart
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/orders')} className="hover:text-zinc-900 transition-colors">
                  My Orders & Invoices
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider mb-3">Multi-Tenant Roles</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-zinc-900 transition-colors">
                  Customer Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/seller')} className="hover:text-zinc-900 transition-colors">
                  Seller Dashboard & Stock
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-zinc-900 transition-colors">
                  Admin Control & Audits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-zinc-900 transition-colors">
                  Account Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider mb-3">Popular Categories</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/products?category=Laptops')} className="hover:text-zinc-900 transition-colors">
                  Gaming Laptops
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products?category=Smartphones')} className="hover:text-zinc-900 transition-colors">
                  5G Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products?category=Audio')} className="hover:text-zinc-900 transition-colors">
                  ANC Headphones
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products?category=Monitors')} className="hover:text-zinc-900 transition-colors">
                  QHD Gaming Displays
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider mb-3">Security & Compliance</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              AgentCart enforces strict server-side authorization. Payments are processed through Razorpay's test mode with cryptographic signature validation.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-700">
              <Zap className="w-3.5 h-3.5 text-zinc-900" />
              Powered by Gemini 3.8 Flash & Node.js
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 AgentCart. Full-Stack AI E-Commerce Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <span>PCI-DSS Compliant Gateway</span>
            <span>•</span>
            <span>Zero-Trust API Gateway</span>
            <span>•</span>
            <span>ACID Inventory Controls</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
