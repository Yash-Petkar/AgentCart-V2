import React from 'react';
import { Star, ShoppingCart, Zap, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetails: (productId: string) => void;
  onToggleCompare?: (product: Product) => void;
  isComparing?: boolean;
  isAddingToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onToggleCompare,
  isComparing = false,
  isAddingToCart = false,
}) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-lg border border-zinc-200 hover:border-zinc-300 hover:shadow-xs transition-all duration-150 flex flex-col overflow-hidden relative"
    >
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
        {product.discount > 0 ? (
          <span className="bg-zinc-900 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-2xs">
            {product.discount}% OFF
          </span>
        ) : <span />}

        {isOutOfStock ? (
          <span className="bg-zinc-100 text-zinc-600 border border-zinc-200 text-[10px] font-medium px-2 py-0.5 rounded">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium px-2 py-0.5 rounded">
            Only {product.stock} Left!
          </span>
        ) : (
          <span className="bg-zinc-50 text-zinc-600 border border-zinc-200/80 text-[10px] font-medium px-2 py-0.5 rounded">
            In Stock
          </span>
        )}
      </div>

      {/* Image container */}
      <div
        onClick={() => onViewDetails(product.id)}
        className="cursor-pointer bg-zinc-50/70 relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center p-4 border-b border-zinc-100 group-hover:bg-zinc-50 transition-colors"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
          <span className="font-semibold text-zinc-700 uppercase tracking-wider text-[10px]">{product.brand}</span>
          <span className="text-zinc-400 text-[11px]">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onViewDetails(product.id)}
          className="cursor-pointer font-semibold text-zinc-900 text-sm hover:text-zinc-600 transition-colors line-clamp-2 min-h-[40px] leading-snug"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 mb-1.5">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold ml-1 text-zinc-900">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-zinc-400">({product.reviewsCount})</span>
        </div>

        {/* Amazon Badge & Bought in Past Month */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {product.badge && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs ${
                product.badge.includes('Best Seller')
                  ? 'bg-amber-600 text-white'
                  : product.badge.includes('Choice')
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-800 text-white'
              }`}
            >
              {product.badge.includes('Choice') ? (
                <span><span className="text-amber-400">Amazon's</span> Choice</span>
              ) : (
                product.badge
              )}
            </span>
          )}
          {product.boughtInPastMonth && (
            <span className="text-[10px] text-zinc-500 font-medium">
              {product.boughtInPastMonth}
            </span>
          )}
        </div>

        {/* Key Specs Pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
            <span
              key={key}
              className="inline-block bg-zinc-50 text-zinc-600 text-[10px] font-medium px-2 py-0.5 rounded border border-zinc-200 truncate max-w-[140px]"
            >
              {val}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-zinc-100 space-y-2">
          {/* Price Row */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-zinc-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[10px] text-zinc-500">
              FREE delivery <strong className="text-zinc-700 font-semibold">Tomorrow</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock || isAddingToCart}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-zinc-900 hover:bg-black text-white disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            <button
              id={`buy-now-btn-${product.id}`}
              onClick={() => onBuyNow(product)}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-zinc-700" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Compare toggle */}
          {onToggleCompare && (
            <div className="mt-2.5 text-center">
              <button
                onClick={() => onToggleCompare(product)}
                className={`text-[11px] font-medium inline-flex items-center gap-1 transition-colors ${
                  isComparing ? 'text-zinc-900 font-semibold' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {isComparing ? (
                  <>
                    <Check className="w-3 h-3 text-zinc-900" />
                    <span>Added to Compare</span>
                  </>
                ) : (
                  <>
                    <span>+ Compare Specs</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
