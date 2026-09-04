import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Layers, ArrowUpRight, ArrowDownRight, Check, RefreshCw, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { api } from '../../lib/api';

interface AiMarketIntelligenceProps {
  onProductUpdated: () => void;
}

export const AiMarketIntelligence: React.FC<AiMarketIntelligenceProps> = ({ onProductUpdated }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadIntelligence();
  }, []);

  const loadIntelligence = async () => {
    setLoading(true);
    try {
      const res = await api.getSellerMarketIntelligence();
      if (res?.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPrice = async (productId: string, newPrice: number) => {
    setUpdatingId(productId);
    try {
      await api.updateSellerProduct(productId, { price: newPrice });
      setSuccessMessage(`Price updated to ₹${newPrice.toLocaleString('en-IN')}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      onProductUpdated();
      loadIntelligence();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center shadow-2xs">
        <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <div className="text-xs text-zinc-600 font-medium">Analyzing market pricing & demand elasticity...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Executive Market Brief */}
      <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
            <TrendingUp className="w-3 h-3 text-sky-700" />
            <span>Market Intelligence & Margin Health</span>
          </div>
          <button
            onClick={loadIntelligence}
            className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh Analysis</span>
          </button>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
          Competitor Benchmarks & Dynamic Pricing
        </h2>
        <p className="text-xs text-zinc-600 mt-1 max-w-3xl leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-200/70">
          {data.aiExecutiveSummary}
        </p>

        {successMessage && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Category Price Positioning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.categoryStats.map((cat: any, i: number) => (
          <div key={i} className="bg-white rounded-lg border border-zinc-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-zinc-900">{cat.category}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-700 uppercase">
                {cat.pricePosition} Positioning
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-100">
              <div>
                <span className="text-[10px] text-zinc-400 block font-medium">Your Avg Price</span>
                <span className="text-sm font-bold text-zinc-900">₹{cat.avgSellerPrice.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block font-medium">Market Catalog Avg</span>
                <span className="text-sm font-semibold text-zinc-600">₹{cat.marketAvgPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 pt-1">
              Active Store SKUs: <strong className="text-zinc-800 font-medium">{cat.sellerItemCount}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Pricing Recommendations */}
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">
              AI Dynamic Pricing & Buy Box Optimization
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Elasticity models evaluating current stock velocity vs competitive category spreads.
            </p>
          </div>
        </div>

        <div className="divide-y divide-zinc-200 text-xs">
          {data.pricingRecommendations.map((rec: any) => {
            const isUpdating = updatingId === rec.productId;
            return (
              <div key={rec.productId} className="p-4 hover:bg-zinc-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                        rec.action === 'DECREASE'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : rec.action === 'INCREASE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {rec.action === 'DECREASE' ? 'Discount Opportunity' : rec.action === 'INCREASE' ? 'Margin Expansion' : 'Price Balanced'}
                    </span>
                    <span className="text-[11px] text-zinc-400">•</span>
                    <span className="text-[11px] text-zinc-500 font-medium">{rec.confidence}% Confidence</span>
                  </div>
                  <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">{rec.productName}</h4>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium uppercase">Current → AI Target</span>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs text-zinc-500 line-through">₹{rec.currentPrice.toLocaleString('en-IN')}</span>
                      <span className="text-sm font-bold text-zinc-900">₹{rec.recommendedPrice.toLocaleString('en-IN')}</span>
                      {rec.difference !== 0 && (
                        <span className={`text-[11px] font-semibold ${rec.difference > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ({rec.difference > 0 ? `+₹${rec.difference}` : `-₹${Math.abs(rec.difference)}`})
                        </span>
                      )}
                    </div>
                  </div>

                  {rec.action !== 'HOLD' && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleApplyPrice(rec.productId, rec.recommendedPrice)}
                      className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-medium rounded-md transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Applying...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Apply Target Price</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High AOV Bundle Engine */}
      {data.bundleOpportunities?.length > 0 && (
        <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">
              AI High-AOV Multi-Product Bundle Engine
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.bundleOpportunities.map((b: any, idx: number) => (
              <div key={idx} className="p-4 rounded-md bg-purple-50/40 border border-purple-200/70 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-xs">{b.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-purple-100 text-purple-800 border border-purple-200">
                    Saves ₹{b.savings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-zinc-700 bg-white p-2 rounded-md border border-purple-100">
                  <div className="truncate">• <strong>Primary:</strong> {b.primaryProduct}</div>
                  <div className="truncate">• <strong>Add-on:</strong> {b.companionProduct}</div>
                </div>

                <p className="text-[11px] text-zinc-600 leading-relaxed">{b.rationale}</p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-medium">Recommended Bundle Price</span>
                    <span className="text-sm font-bold text-purple-950">₹{b.bundlePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[11px] font-medium text-purple-700 bg-white px-2 py-1 rounded-md border border-purple-200">
                    Ready for Promotion
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
