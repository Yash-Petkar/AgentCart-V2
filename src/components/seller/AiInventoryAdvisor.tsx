import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle2, RefreshCw, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { api } from '../../lib/api';

interface AiInventoryAdvisorProps {
  onInventoryUpdated: () => void;
}

export const AiInventoryAdvisor: React.FC<AiInventoryAdvisorProps> = ({ onInventoryUpdated }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [reorderSuccess, setReorderSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadAdvisor();
  }, []);

  const loadAdvisor = async () => {
    setLoading(true);
    try {
      const res = await api.getSellerInventoryAdvisor();
      if (res?.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateReorder = async (productId: string, currentStock: number, reorderQty: number) => {
    setReorderingId(productId);
    try {
      const newStock = currentStock + reorderQty;
      await api.updateSellerProduct(productId, { stock: newStock });
      setReorderSuccess(`Successfully replenished +${reorderQty} units (New Stock: ${newStock})!`);
      setTimeout(() => setReorderSuccess(null), 3000);
      onInventoryUpdated();
      loadAdvisor();
    } catch (err) {
      console.error(err);
    } finally {
      setReorderingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center shadow-2xs">
        <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <div className="text-xs text-zinc-600 font-medium">Computing sales velocity and inventory depletion curves...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Top Advisory Banner */}
      <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Zap className="w-3 h-3 text-amber-700" />
            <span>AI Predictive Stock & Supply Chain Forecaster</span>
          </div>
          <button
            onClick={loadAdvisor}
            className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Recalculate Run-Rate</span>
          </button>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
          Inventory Depletion & Restock Guidance
        </h2>
        <p className="text-xs text-zinc-600 mt-1 max-w-3xl leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-200/70">
          {data.aiRestockPlan}
        </p>

        {reorderSuccess && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reorderSuccess}</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500">Critical / Stockout Risk</span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-600 mt-1">{data.criticalCount} SKUs</div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">&lt; 5 days runway remaining</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500">Low Stock Warning</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 mt-1">{data.warningCount} SKUs</div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">5 - 14 days runway remaining</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500">Optimal Buffer</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{data.healthyCount} SKUs</div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">Healthy supply-demand equilibrium</span>
        </div>
      </div>

      {/* SKU Depletion Table */}
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
        <div className="p-3.5 border-b border-zinc-200 bg-zinc-50/70">
          <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">
            SKU Run-Rate Depletion & Reorder Recommendations ({data.items.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-medium text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Velocity</th>
                <th className="p-3">Runway Days</th>
                <th className="p-3">Status</th>
                <th className="p-3">AI Recommendation</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {data.items.map((item: any) => {
                const isReordering = reorderingId === item.productId;
                return (
                  <tr key={item.productId} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-3 font-medium text-zinc-900 max-w-xs truncate">
                      {item.name}
                    </td>
                    <td className="p-3 font-semibold text-zinc-800">
                      {item.stock} units
                    </td>
                    <td className="p-3 text-zinc-600">
                      {item.dailyVelocity} / day
                    </td>
                    <td className="p-3 font-medium">
                      <span className={item.daysOfStockLeft <= 5 ? 'text-rose-600 font-bold' : item.daysOfStockLeft <= 14 ? 'text-amber-600' : 'text-zinc-700'}>
                        {item.daysOfStockLeft} days
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                          item.status === 'CRITICAL'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.status === 'WARNING'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : item.status === 'OVERSTOCKED'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-zinc-600 max-w-sm">
                      {item.recommendedAction}
                    </td>
                    <td className="p-3 text-right">
                      {item.suggestedReorderQuantity > 0 ? (
                        <button
                          type="button"
                          disabled={isReordering}
                          onClick={() => handleSimulateReorder(item.productId, item.stock, item.suggestedReorderQuantity)}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-black text-white text-[11px] font-medium rounded-md transition-colors shadow-2xs disabled:opacity-50 inline-flex items-center gap-1"
                        >
                          {isReordering ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              <span>+ Reorder {item.suggestedReorderQuantity}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[11px] text-zinc-400 italic">No action needed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
