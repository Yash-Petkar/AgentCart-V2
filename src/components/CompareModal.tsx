import React from 'react';
import { X, ShoppingCart, Star } from 'lucide-react';
import { Product, ComparisonMatrixItem } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  matrix: ComparisonMatrixItem[];
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  matrix,
  onAddToCart,
}) => {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        id="product-compare-modal"
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-zinc-200"
      >
        {/* Header */}
        <div className="p-4 bg-white text-zinc-900 flex items-center justify-between border-b border-zinc-200">
          <div>
            <h3 className="font-semibold text-base text-zinc-900">Product Comparison Matrix</h3>
            <p className="text-xs text-zinc-500">Comparing specifications, price-to-performance, and availability</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-zinc-200">
            {products.map(p => (
              <div key={p.id} className="flex flex-col items-center text-center p-3 rounded-lg bg-zinc-50/60 border border-zinc-200">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-24 h-24 object-contain mb-3 rounded bg-white p-1 border border-zinc-200/60"
                />
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{p.brand}</span>
                <h4 className="font-semibold text-xs text-zinc-900 line-clamp-2 mt-0.5">{p.name}</h4>
                <div className="text-base font-bold text-zinc-900 my-1.5">
                  ₹{p.price.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center text-amber-500 text-xs font-semibold mb-3">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span className="text-zinc-800">{p.rating} ({p.reviewsCount})</span>
                </div>
                <button
                  onClick={() => onAddToCart(p)}
                  disabled={p.stock <= 0}
                  className="w-full py-1.5 px-3 rounded-md text-xs font-medium bg-zinc-900 hover:bg-black text-white disabled:bg-zinc-100 disabled:text-zinc-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Matrix Specs Rows */}
          <div className="mt-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-zinc-500 mb-3">
              Detailed Specifications Breakdown
            </h4>
            <div className="border border-zinc-200 rounded-lg overflow-hidden text-xs">
              {matrix.map((row, idx) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-3 sm:grid-cols-4 p-3 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                  } border-b border-zinc-200 last:border-0`}
                >
                  <div className="font-semibold text-zinc-700 col-span-1">{row.attribute}</div>
                  <div className="col-span-2 sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {products.map(p => (
                      <div key={p.id} className="text-zinc-900 font-medium truncate">
                        {row.values[p.id] || '—'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50/70 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
