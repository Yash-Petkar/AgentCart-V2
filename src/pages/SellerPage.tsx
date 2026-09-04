import React, { useState, useEffect } from 'react';
import {
  Store,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Package,
  DollarSign,
  TrendingUp,
  X,
  Sparkles,
  Wand2,
  Layers,
  Star,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { User, Product } from '../types';
import { api } from '../lib/api';
import { AiListingCopilot } from '../components/seller/AiListingCopilot';
import { AiMarketIntelligence } from '../components/seller/AiMarketIntelligence';
import { AiInventoryAdvisor } from '../components/seller/AiInventoryAdvisor';
import { AiReviewIntelligence } from '../components/seller/AiReviewIntelligence';
import { AiListingOptimizerModal } from '../components/seller/AiListingOptimizerModal';

interface SellerPageProps {
  user: User | null;
  navigate: (route: string) => void;
}

export const SellerPage: React.FC<SellerPageProps> = ({ user, navigate }) => {
  const [dashboard, setDashboard] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [optimizingProduct, setOptimizingProduct] = useState<Product | null>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<'inventory' | 'copilot' | 'pricing' | 'advisor' | 'reviews'>('inventory');

  // Form Fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Laptops');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [specsText, setSpecsText] = useState('Processor: Core i5\nRAM: 16GB DDR5\nStorage: 512GB SSD');
  const [autoFilling, setAutoFilling] = useState(false);
  const [autoFillNotice, setAutoFillNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) {
      navigate('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashRes, prodRes, ordRes] = await Promise.all([
        api.getSellerDashboard(),
        api.getSellerProducts(),
        api.getSellerOrders(),
      ]);
      setDashboard(dashRes);
      setProducts(prodRes.products);
      setOrders(ordRes.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const specsObj: Record<string, string> = {};
      specsText.split('\n').forEach(line => {
        const [k, v] = line.split(':');
        if (k && v) specsObj[k.trim()] = v.trim();
      });

      const payload = {
        name,
        brand,
        category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : Number(price),
        stock: Number(stock),
        description,
        images: image ? [image] : ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'],
        specs: specsObj,
        tags: [brand.toLowerCase(), category.toLowerCase()],
      };

      if (editingProduct) {
        await api.updateSellerProduct(editingProduct.id, payload);
      } else {
        await api.createSellerProduct(payload);
      }

      setShowAddModal(false);
      setEditingProduct(null);
      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setName('');
    setBrand('');
    setCategory('Laptops');
    setPrice('');
    setOriginalPrice('');
    setStock('');
    setDescription('');
    setImage('');
    setSpecsText('Processor: Core i5\nRAM: 16GB DDR5\nStorage: 512GB SSD');
    setAutoFillNotice(null);
  };

  const handleOpenFormWithData = (data: Partial<Product> & { specsText: string }) => {
    setEditingProduct(null);
    setName(data.name || '');
    setBrand(data.brand || '');
    setCategory(data.category || 'Electronics');
    setPrice(data.price ? String(data.price) : '');
    setOriginalPrice(data.originalPrice ? String(data.originalPrice) : '');
    setStock(data.stock ? String(data.stock) : '15');
    setDescription(data.description || '');
    setImage(data.images && data.images[0] ? data.images[0] : '');
    setSpecsText(data.specsText || '');
    setShowAddModal(true);
  };

  const handleAutoFillWithAi = async () => {
    if (!name.trim()) return;
    setAutoFilling(true);
    setAutoFillNotice(null);
    try {
      const res = await api.generateSellerListing({
        draftTitle: name,
        brand: brand || undefined,
        category: category || undefined,
      });

      if (res?.data) {
        const item = res.data;
        setName(item.name || name);
        if (item.brand) setBrand(item.brand);
        if (item.category) setCategory(item.category);
        if (item.price) setPrice(String(item.price));
        if (item.originalPrice) setOriginalPrice(String(item.originalPrice));
        if (item.stock) setStock(String(item.stock));
        if (item.description) setDescription(item.description);

        if (item.specs && Object.keys(item.specs).length > 0) {
          const formatted = Object.entries(item.specs)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n');
          setSpecsText(formatted);
        }

        setAutoFillNotice(`✨ Auto-filled using Gemini! Quality Score: ${item.qualityScore}/100.`);
      }
    } catch (err) {
      console.error(err);
      setAutoFillNotice('Could not auto-fill. Please verify inputs.');
    } finally {
      setAutoFilling(false);
    }
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(String(p.price));
    setOriginalPrice(String(p.originalPrice));
    setStock(String(p.stock));
    setDescription(p.description);
    setImage(p.images[0] || '');
    setSpecsText(
      Object.entries(p.specs)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    );
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product from catalog?')) return;
    try {
      await api.deleteSellerProduct(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-xs font-medium text-zinc-600">Loading AI Seller Studio...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Hub Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <Store className="w-3.5 h-3.5 text-zinc-700" />
            <span>AI Seller Studio & Merchant Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {user?.storeName || 'TechVibe Electronics'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('copilot')}
            className="px-3 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Listing Copilot</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              resetForm();
              setShowAddModal(true);
            }}
            className="px-3.5 py-1.5 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      {dashboard && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <span className="text-[11px] text-zinc-500 font-medium">Active Products</span>
            <div className="text-xl font-bold text-zinc-900 mt-1 tracking-tight">{dashboard.metrics.totalProducts}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <span className="text-[11px] text-zinc-500 font-medium">Orders Fulfilled</span>
            <div className="text-xl font-bold text-zinc-900 mt-1 tracking-tight">{dashboard.metrics.totalOrders}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <span className="text-[11px] text-zinc-500 font-medium">Units Sold</span>
            <div className="text-xl font-bold text-zinc-900 mt-1 tracking-tight">{dashboard.metrics.totalUnitsSold}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <span className="text-[11px] text-zinc-500 font-medium">Total Revenue</span>
            <div className="text-xl font-bold text-zinc-900 mt-1 tracking-tight">
              ₹{dashboard.metrics.totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <span className="text-[11px] text-zinc-500 font-medium">Low Stock Alerts</span>
            <div className="text-xl font-bold text-amber-600 mt-1 tracking-tight">{dashboard.metrics.lowStockCount}</div>
          </div>
        </div>
      )}

      {/* AI Studio Feature Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-200 overflow-x-auto pb-px text-xs font-medium">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'inventory'
              ? 'border-zinc-900 text-zinc-900 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Catalog Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'copilot'
              ? 'border-zinc-900 text-zinc-900 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Listing Copilot</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
            NEW
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'pricing'
              ? 'border-zinc-900 text-zinc-900 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
          <span>Market & Dynamic Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('advisor')}
          className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'advisor'
              ? 'border-zinc-900 text-zinc-900 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Inventory & Restock Advisor</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'reviews'
              ? 'border-zinc-900 text-zinc-900 font-semibold'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-500" />
          <span>Review & Quality Insights</span>
        </button>
      </div>

      {/* Tab Content 1: Catalog Inventory */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
          <div className="p-3.5 border-b border-zinc-200 bg-zinc-50/60 flex items-center justify-between">
            <h2 className="font-semibold text-xs sm:text-sm text-zinc-900">
              Active Store Inventory ({products.length})
            </h2>
            <span className="text-[11px] text-zinc-500">
              Click <strong className="text-zinc-800">✨ AI Optimize</strong> on any row to audit title, description, and specs.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-medium text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Level</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-9 h-9 rounded-md object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0"
                      />
                      <div className="max-w-md">
                        <span className="font-medium text-zinc-900 block truncate">{p.name}</span>
                        <span className="text-zinc-400 text-[10px] uppercase font-semibold">{p.brand}</span>
                      </div>
                    </td>
                    <td className="p-3 text-zinc-600">{p.category}</td>
                    <td className="p-3 font-semibold text-zinc-900">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                          p.stock <= 0
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : p.stock <= 4
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 font-medium text-zinc-700">★ {p.rating}</td>
                    <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setOptimizingProduct(p)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-medium rounded-md border border-emerald-200 transition-colors inline-flex items-center gap-1"
                        title="Audit & Optimize with AI"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>AI Optimize</span>
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1 text-zinc-500 hover:text-zinc-900 transition-colors inline-block"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-zinc-400 hover:text-rose-600 transition-colors inline-block"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 2: AI Listing Copilot */}
      {activeTab === 'copilot' && (
        <AiListingCopilot
          onPublishSuccess={loadData}
          onOpenFormWithData={handleOpenFormWithData}
        />
      )}

      {/* Tab Content 3: Market & Dynamic Pricing */}
      {activeTab === 'pricing' && (
        <AiMarketIntelligence onProductUpdated={loadData} />
      )}

      {/* Tab Content 4: Inventory & Restock Advisor */}
      {activeTab === 'advisor' && (
        <AiInventoryAdvisor onInventoryUpdated={loadData} />
      )}

      {/* Tab Content 5: Review & Quality Insights */}
      {activeTab === 'reviews' && (
        <AiReviewIntelligence />
      )}

      {/* Optimizer Modal */}
      {optimizingProduct && (
        <AiListingOptimizerModal
          product={optimizingProduct}
          onClose={() => setOptimizingProduct(null)}
          onOptimized={loadData}
        />
      )}

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl border border-zinc-200">
            <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
              <h3 className="font-semibold text-xs sm:text-sm">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 overflow-y-auto space-y-3.5 text-xs">
              {/* Quick AI Auto-Fill Helper */}
              <div className="p-2.5 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-md flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium truncate">
                    Type a draft model title, then auto-fill specs & pricing
                  </span>
                </div>
                <button
                  type="button"
                  disabled={autoFilling || !name.trim()}
                  onClick={handleAutoFillWithAi}
                  className="px-2.5 py-1 bg-white hover:bg-zinc-100 text-zinc-900 rounded-sm text-[11px] font-semibold transition-colors shrink-0 disabled:opacity-50 flex items-center gap-1"
                >
                  {autoFilling ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <span>✨ AI Auto-Fill</span>
                  )}
                </button>
              </div>

              {autoFillNotice && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-[11px]">
                  {autoFillNotice}
                </div>
              )}

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Acer Nitro V 15 Gaming Laptop"
                  className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. Acer"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Monitors">Monitors</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="69990"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(e.target.value)}
                    placeholder="79990"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    placeholder="10"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">
                  Specifications (one key: value per line)
                </label>
                <textarea
                  rows={4}
                  value={specsText}
                  onChange={e => setSpecsText(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md font-mono text-[11px] focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-md text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium shadow-xs transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
