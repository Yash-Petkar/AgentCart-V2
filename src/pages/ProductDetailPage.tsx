import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Zap, Sparkles, ArrowLeft, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';
import { api } from '../lib/api';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onAddToCart: (product: Product, qty?: number) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (id: string) => void;
  onOpenAIWithPrompt: (prompt: string) => void;
  navigate: (route: string) => void;
  onToggleCompare: (product: Product) => void;
  compareProductIds: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onAddToCart,
  onBuyNow,
  onViewProduct,
  onOpenAIWithPrompt,
  navigate,
  onToggleCompare,
  compareProductIds,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProduct(productId);
        setProduct(data.product);
        setRelatedProducts(data.related);
        setSelectedImage(data.product.images[0] || '');
        setQuantity(1);
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-sm font-semibold text-slate-700">Loading catalog specifications...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-500">{error || 'The requested product could not be located in our catalog.'}</p>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isComparing = compareProductIds.includes(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Products</span>
      </button>

      {/* Main Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/3] bg-white rounded-lg border border-zinc-200 p-6 flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-md bg-white border p-1.5 shrink-0 transition-all ${
                    selectedImage === img ? 'border-zinc-900 ring-1 ring-zinc-900' : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Actions */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
              <span className="font-semibold text-zinc-700 uppercase tracking-wider text-[11px]">{product.brand}</span>
              <span className="text-zinc-400">Category: {product.category}</span>
            </div>

            {/* Amazon Choice / Best Seller Badge */}
            {product.badge && (
              <div className="mb-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded shadow-2xs ${
                    product.badge.includes('Best Seller')
                      ? 'bg-amber-600 text-white'
                      : product.badge.includes('Choice')
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-800 text-white'
                  }`}
                >
                  {product.badge.includes('Choice') ? (
                    <>
                      <span className="text-[#FF9900] font-bold">Amazon's</span> Choice
                      <span className="text-zinc-400 font-normal text-[11px] ml-1">for "{product.category}"</span>
                    </>
                  ) : (
                    <>
                      <span>{product.badge}</span>
                      <span className="text-amber-100 font-normal text-[11px] ml-1">in {product.category}</span>
                    </>
                  )}
                </span>
              </div>
            )}

            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2.5">
              <div className="flex items-center text-zinc-900 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-zinc-500 font-normal">({product.reviewsCount} customer reviews)</span>
              {product.boughtInPastMonth && (
                <>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                    {product.boughtInPastMonth}
                  </span>
                </>
              )}
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-500">Seller: <strong className="text-zinc-700 font-medium">{product.sellerName}</strong></span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-lg bg-zinc-50/70 border border-zinc-200 space-y-1.5">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-zinc-400 line-through">
                    M.R.P.: ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-200 px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-zinc-500">Inclusive of all taxes • FREE delivery <strong className="text-zinc-800 font-semibold">Tomorrow, 11 AM</strong></p>
            <p className="text-[11px] text-zinc-600 pt-0.5">
              EMI starts at ₹{Math.round(product.price / 12).toLocaleString('en-IN')}/month. No Cost EMI available.
            </p>
          </div>

          {/* Stock Availability */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-zinc-600">Availability:</span>
            {isOutOfStock ? (
              <span className="font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Currently Unavailable
              </span>
            ) : product.stock <= 4 ? (
              <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Only {product.stock} left in stock - order soon.
              </span>
            ) : (
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                In Stock ({product.stock} units ready to ship)
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{product.description}</p>

          {/* Amazon-style About This Item */}
          {product.aboutItem && product.aboutItem.length > 0 && (
            <div className="pt-4 border-t border-zinc-200 space-y-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">
                About this item
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700">
                {product.aboutItem.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-zinc-400 font-bold select-none text-sm leading-none mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Action Buttons */}
          <div className="space-y-3 pt-1">
            {!isOutOfStock && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-zinc-600">Quantity:</span>
                <div className="flex items-center border border-zinc-200 rounded-md bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-50 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1 text-xs font-semibold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-50 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                id="pdp-add-to-cart-btn"
                onClick={() => onAddToCart(product, quantity)}
                disabled={isOutOfStock}
                className="py-2.5 px-4 rounded-md text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-black text-white disabled:bg-zinc-100 disabled:text-zinc-400 flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={() => onBuyNow(product)}
                disabled={isOutOfStock}
                className="py-2.5 px-4 rounded-md text-xs sm:text-sm font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 flex items-center justify-center gap-2 transition-colors"
              >
                <Zap className="w-4 h-4 text-zinc-700" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Compare Button */}
            <div className="pt-1">
              <button
                onClick={() => onToggleCompare(product)}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1.5 transition-colors"
              >
                {isComparing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-zinc-900" />
                    <span className="text-zinc-900 font-semibold">Product added to comparison matrix</span>
                  </>
                ) : (
                  <span>+ Add to Compare Matrix</span>
                )}
              </button>
            </div>
          </div>

          {/* AI Advisor Shortcut Box */}
          <div className="p-4 rounded-lg bg-zinc-50 text-zinc-900 border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
              <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
              <span>Ask AI About This Product</span>
            </div>
            <p className="text-xs text-zinc-500">
              Not sure if this matches your workflow or budget? Ask our AI agent to evaluate this model.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() =>
                  onOpenAIWithPrompt(`Is ${product.name} suitable for high-end gaming and streaming?`)
                }
                className="text-xs bg-white hover:bg-zinc-100 px-3 py-1 rounded-full text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition-colors shadow-2xs"
              >
                "Is this good for gaming?"
              </button>
              <button
                onClick={() =>
                  onOpenAIWithPrompt(`How does ${product.name} compare to similar models under ₹${product.price + 10000}?`)
                }
                className="text-xs bg-white hover:bg-zinc-100 px-3 py-1 rounded-full text-zinc-700 hover:text-zinc-900 border border-zinc-200 transition-colors shadow-2xs"
              >
                "Compare with alternatives"
              </button>
            </div>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-200 text-center text-[11px] text-zinc-500">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-zinc-700 mb-1" />
              <span className="font-medium text-zinc-800">Free Delivery</span>
              <span className="text-[10px] text-zinc-400">By Tomorrow</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-zinc-700 mb-1" />
              <span className="font-medium text-zinc-800">{product.warranty ? 'Brand Warranty' : '1 Year Warranty'}</span>
              <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">{product.warranty || 'Comprehensive'}</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-4 h-4 text-zinc-700 mb-1" />
              <span className="font-medium text-zinc-800">7 Days Return</span>
              <span className="text-[10px] text-zinc-400">Replacement Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="space-y-4 pt-6 border-t border-zinc-200">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">Technical Specifications</h2>
        <div className="border border-zinc-200 rounded-lg overflow-hidden text-xs">
          {Object.entries(product.specs).map(([key, val], idx) => (
            <div
              key={key}
              className={`grid grid-cols-3 p-3.5 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
              } border-b border-zinc-200 last:border-0`}
            >
              <span className="font-semibold text-zinc-700">{key}</span>
              <span className="col-span-2 font-medium text-zinc-900">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-5 pt-6 border-t border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">Similar Products in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onAddToCart={p => onAddToCart(p)}
                onBuyNow={onBuyNow}
                onViewDetails={onViewProduct}
                onToggleCompare={onToggleCompare}
                isComparing={compareProductIds.includes(rel.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
