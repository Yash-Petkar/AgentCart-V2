import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, ArrowRight, RefreshCw, CheckCircle2, AlertCircle, FileText, Sliders } from 'lucide-react';
import { api } from '../../lib/api';
import { Product } from '../../types';

interface AiListingOptimizerModalProps {
  product: Product;
  onClose: () => void;
  onOptimized: () => void;
}

export const AiListingOptimizerModal: React.FC<AiListingOptimizerModalProps> = ({
  product,
  onClose,
  onOptimized,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    runAudit();
  }, [product.id]);

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await api.optimizeSellerListing({ productId: product.id, productData: product });
      if (res?.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyUpgrades = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const mergedSpecs = {
        ...(product.specs || {}),
        ...(data.additionalSpecs || {}),
      };

      const payload: Partial<Product> = {
        name: data.optimizedName,
        description: data.optimizedDescription,
        specs: mergedSpecs,
        price: data.suggestedPrice || product.price,
      };

      if (data.optimizedAboutItem && data.optimizedAboutItem.length > 0) {
        payload.aboutItem = data.optimizedAboutItem;
      }

      await api.updateSellerProduct(product.id, payload);
      setSaveSuccess(true);
      setTimeout(() => {
        onOptimized();
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl border border-zinc-200">
        {/* Modal Header */}
        <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-zinc-800 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-semibold text-xs sm:text-sm">AI Listing Optimizer</h3>
              <span className="text-[10px] text-zinc-400 block truncate max-w-xs">{product.name}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="text-xs text-zinc-600 font-medium">Auditing listing quality, keyword density, and specs...</div>
            </div>
          ) : data ? (
            <>
              {/* Score Benchmark */}
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Current Score</span>
                    <span className="text-base font-bold text-amber-600">{data.currentScore}/100</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">After AI Upgrades</span>
                    <span className="text-base font-bold text-emerald-600">{data.potentialScore}/100</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    +{data.potentialScore - data.currentScore} Pts Conversion Lift
                  </span>
                </div>
              </div>

              {/* Critiques Identified */}
              {data.critiques?.length > 0 && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-md space-y-1.5">
                  <span className="font-semibold text-amber-950 flex items-center gap-1.5 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Identified Listing Weaknesses & Drop-off Risks:</span>
                  </span>
                  <ul className="space-y-1 list-disc pl-4 text-[11px] text-amber-900">
                    {data.critiques.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Title Comparison */}
              <div className="space-y-1.5">
                <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[10px] block">
                  Product Title Optimization
                </span>
                <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-500 text-[11px]">
                  <strong className="text-zinc-600 block text-[10px] uppercase mb-0.5">Original Title:</strong>
                  {product.name}
                </div>
                <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-md text-zinc-900 text-[11px] font-medium">
                  <strong className="text-emerald-800 block text-[10px] uppercase mb-0.5">AI Enhanced Title:</strong>
                  {data.optimizedName}
                </div>
              </div>

              {/* Description Comparison */}
              <div className="space-y-1.5">
                <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[10px] block">
                  Optimized Benefit Copy
                </span>
                <div className="p-2.5 bg-emerald-50/40 border border-emerald-100 rounded-md text-zinc-700 text-[11px] leading-relaxed">
                  {data.optimizedDescription}
                </div>
              </div>

              {/* Added Specifications */}
              {data.additionalSpecs && Object.keys(data.additionalSpecs).length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[10px] block">
                    Recommended Technical Specifications to Add
                  </span>
                  <div className="rounded-md border border-zinc-200 overflow-hidden divide-y divide-zinc-200 text-[11px]">
                    {Object.entries(data.additionalSpecs).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-3 p-2 bg-white">
                        <span className="font-medium text-zinc-600 col-span-1">{k}</span>
                        <span className="text-zinc-900 font-semibold col-span-2">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Evaluation */}
              <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-medium block uppercase">Pricing Competitiveness</span>
                  <span className="text-xs font-semibold text-zinc-800">
                    Recommended Price: ₹{Number(data.suggestedPrice || product.price).toLocaleString('en-IN')}
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{data.priceReasoning}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-zinc-500">Failed to generate listing audit.</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 rounded-md text-xs font-medium transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading || saving || saveSuccess || !data}
            onClick={handleApplyUpgrades}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upgrades Applied!</span>
              </>
            ) : saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving to Catalog...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply All AI Upgrades</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
