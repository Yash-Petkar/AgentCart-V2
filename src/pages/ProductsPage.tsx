import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, X, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  categories: Array<{ name: string; count: number }>;
  selectedCategory?: string;
  searchQuery?: string;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (productId: string) => void;
  onToggleCompare: (product: Product) => void;
  compareProductIds: string[];
  onOpenCompareModal: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  categories,
  selectedCategory: initialCategory,
  searchQuery: initialSearch,
  onAddToCart,
  onBuyNow,
  onViewProduct,
  onToggleCompare,
  compareProductIds,
  onOpenCompareModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [search, setSearch] = useState<string>(initialSearch || '');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const bSet = new Set<string>();
    products.forEach(p => bSet.add(p.brand));
    return Array.from(bSet).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'ALL' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (selectedBrand !== 'ALL' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchCat && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, maxPrice, inStockOnly, search, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedBrand('ALL');
    setMaxPrice(250000);
    setInStockOnly(false);
    setSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Product Catalog</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Showing {filteredProducts.length} verified products available for instant order
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-normal">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-zinc-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-800 focus:outline-none focus:border-zinc-900"
            >
              <option value="featured">Featured Picks</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filter Panel (Desktop & Mobile Drawer) */}
        <div
          className={`md:block col-span-1 space-y-4 ${
            isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'
          }`}
        >
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-4 md:hidden">
              <h3 className="font-semibold text-base text-zinc-900">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-zinc-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Search within catalog */}
          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-2xs">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Keywords Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Model, spec, tag..."
                className="w-full text-xs text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:bg-white focus:border-zinc-900"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-2xs">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Category
            </label>
            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md font-medium transition-colors flex justify-between items-center ${
                    selectedCategory === cat.name
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-zinc-400 text-[11px]">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-2xs">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-md p-1.5 font-medium text-zinc-800 focus:outline-none focus:border-zinc-900"
            >
              <option value="ALL">All Brands</option>
              {brands.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Max Price
              </label>
              <span className="text-xs font-semibold text-zinc-900">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={250000}
              step={2000}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-zinc-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>₹1,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* Stock Filter Checkbox */}
          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-2xs">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-zinc-900 accent-zinc-900"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Reset button */}
          <button
            onClick={resetFilters}
            className="w-full py-2 px-3 rounded-md border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-medium transition-colors"
          >
            Reset All Filters
          </button>

          {isMobileFilterOpen && (
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-md bg-zinc-900 text-white font-medium text-xs"
            >
              Apply Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center space-y-3">
              <SlidersHorizontal className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="text-sm font-semibold text-zinc-900">No products match your criteria</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try widening your price range or adjusting brand/category filters to discover matching products.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-md bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
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
          )}
        </div>
      </div>

      {/* Floating Compare Drawer Bar if items selected */}
      {compareProductIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 text-white px-5 py-2.5 rounded-full shadow-xl border border-zinc-800 flex items-center gap-4 animate-in slide-in-from-bottom duration-200">
          <div className="text-xs">
            <span className="font-semibold text-white">{compareProductIds.length}</span> product(s) selected to compare
          </div>
          <button
            onClick={onOpenCompareModal}
            className="px-3 py-1 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <span>Compare Matrix</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
