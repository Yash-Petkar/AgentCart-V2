import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Laptop,
  Smartphone,
  Headphones,
  Monitor,
  Cpu,
  Home,
  Shirt,
  Tv,
  Compass,
  Utensils,
  Activity,
  BookOpen,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  categories: Array<{ name: string; count: number }>;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (productId: string) => void;
  onOpenAIWithPrompt: (prompt: string) => void;
  navigate: (route: string) => void;
  onToggleCompare: (product: Product) => void;
  compareProductIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  onAddToCart,
  onBuyNow,
  onViewProduct,
  onOpenAIWithPrompt,
  navigate,
  onToggleCompare,
  compareProductIds,
}) => {
  const [heroPrompt, setHeroPrompt] = useState('');

  const featuredProducts = products.filter(p => p.isFeatured || p.rating >= 4.5).slice(0, 8);

  const samplePrompts = [
    'Find me espresso machines or pour-over kettles under ₹20,000.',
    'I want adjustable dumbbells or smart running watches.',
    'Find luxury skincare or Dyson hair dryers and add to cart.',
    'Show me smart pet feeders and automatic fountains under ₹15,000',
  ];

  const categoryIcons: Record<string, any> = {
    Electronics: Zap,
    'Home Decor': Home,
    Fashion: Shirt,
    'Kitchen & Dining': Utensils,
    'Fitness & Outdoors': Activity,
    'Beauty & Personal Care': Sparkles,
    'Books & Productivity': BookOpen,
    'Pet Care': Heart,
    Laptops: Laptop,
    Smartphones: Smartphone,
    Audio: Headphones,
    Monitors: Monitor,
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      onOpenAIWithPrompt(heroPrompt.trim());
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white text-zinc-900 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            <span>AI-Native E-Commerce Platform with Real Razorpay Gateway</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            Shop Smarter with <span className="underline decoration-zinc-300 underline-offset-8">AgentCart</span>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-600 text-sm sm:text-base leading-relaxed">
            Communicate naturally with an autonomous shopping agent that searches real products, compares technical specifications, ranks value-for-money, and manages your cart seamlessly.
          </p>

          {/* Primary AI Prompt Box */}
          <div className="max-w-2xl mx-auto mt-6">
            <form
              onSubmit={handleHeroSubmit}
              className="bg-zinc-50 p-1.5 rounded-lg border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
                <Sparkles className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  id="hero-ai-prompt-input"
                  type="text"
                  value={heroPrompt}
                  onChange={e => setHeroPrompt(e.target.value)}
                  placeholder="e.g. Find best gaming laptop under ₹70,000 and add to cart"
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none py-2"
                />
              </div>
              <button
                id="hero-ai-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <span>Ask AI Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Suggestion Chips */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Try:</span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenAIWithPrompt(prompt)}
                  className="text-xs text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full transition-colors text-left shadow-2xs"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Explore Categories</h2>
            <p className="text-xs text-zinc-500">Verified products with atomic inventory tracking</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {categories.map(cat => {
            const Icon = categoryIcons[cat.name] || Cpu;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className="p-4 sm:p-5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-xs transition-all text-left group flex items-start justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-md bg-zinc-100 group-hover:bg-zinc-900 text-zinc-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-sm group-hover:text-zinc-900 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-zinc-400 mt-0.5 inline-block">{cat.count} verified models</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">
              <Zap className="w-3 h-3 text-zinc-500" />
              <span>Recommended Picks</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Trending & High Value Products</h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center gap-1"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onViewDetails={onViewProduct}
              onToggleCompare={onToggleCompare}
              isComparing={compareProductIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Architecture & Reliability Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-50 rounded-xl p-6 sm:p-10 text-zinc-900 border border-zinc-200">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Architectural Integrity</span>
            <h2 className="text-xl sm:text-2xl font-bold mt-1.5 text-zinc-900">
              Why AgentCart Is Built Different
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Unlike chatbots that simulate shopping actions with hallucinated mock data, AgentCart operates with strict server authorization. Every AI action maps to a backend tool that executes real database transactions, atomic inventory decrementing, and cryptographically verified Razorpay payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-zinc-200 text-xs sm:text-sm">
            <div>
              <div className="font-semibold text-zinc-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                <span>Zero Hallucination Cart</span>
              </div>
              <p className="text-xs text-zinc-500 leading-normal">
                The agent cannot add products that don't exist or claim success without backend confirmation.
              </p>
            </div>
            <div>
              <div className="font-semibold text-zinc-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                <span>Server-Side Pricing Truth</span>
              </div>
              <p className="text-xs text-zinc-500 leading-normal">
                Prices and discounts are calculated strictly on the server to prevent frontend tampering.
              </p>
            </div>
            <div>
              <div className="font-semibold text-zinc-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                <span>Cryptographic Signatures</span>
              </div>
              <p className="text-xs text-zinc-500 leading-normal">
                Razorpay payment payloads are verified with HMAC-SHA256 before inventory is finalized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
