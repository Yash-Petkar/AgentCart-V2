import React, { useState, useEffect } from 'react';
import { ShieldCheck, Star, ThumbsUp, AlertCircle, RefreshCw, MessageSquare, Award } from 'lucide-react';
import { api } from '../../lib/api';

export const AiReviewIntelligence: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await api.getSellerReviewIntelligence();
      if (res?.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center shadow-2xs">
        <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <div className="text-xs text-zinc-600 font-medium">Aggregating buyer feedback and sentiment clusters...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 mb-2">
              <Award className="w-3 h-3 text-emerald-700" />
              <span>{data.reputationBadgeStatus}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Customer Sentiment & Review Intelligence
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 max-w-2xl">
              Gemini continuously mines customer reviews and product Q&As to synthesize seller reputation, top recurring praises, and defect risk alerts.
            </p>
          </div>

          <button
            onClick={loadReviews}
            className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Re-analyze Reviews</span>
          </button>
        </div>

        {/* AI Merchant Coach */}
        <div className="mt-4 p-3.5 bg-zinc-50 rounded-md border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900 block mb-1">AI Merchant Coach Summary:</strong>
          {data.aiSellerCoachAdvice}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <span className="text-[11px] font-medium text-zinc-500">Average Store Rating</span>
          <div className="text-xl font-bold text-zinc-900 mt-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{data.overallRating} / 5.0</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">Across {data.totalReviews.toLocaleString('en-IN')} verified orders</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <span className="text-[11px] font-medium text-zinc-500">Net Sentiment Score</span>
          <div className="text-xl font-bold text-emerald-600 mt-1">{data.sentimentPercentage}% Positive</div>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">Ranked in top 8% of platform merchants</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
          <span className="text-[11px] font-medium text-zinc-500">Reputation Tier</span>
          <div className="text-xl font-bold text-zinc-900 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Seller</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-0.5 block">Zero policy violations</span>
        </div>
      </div>

      {/* Side-by-Side: Praises vs Friction Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Top Praises */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">
              Top Customer Praises (Sentiment Drivers)
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {data.topPraises.map((p: any, idx: number) => (
              <div key={idx} className="p-3 bg-emerald-50/40 rounded-md border border-emerald-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-950">{p.topic}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                    {p.frequency}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600 italic">
                  "{p.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Friction Points & Remediation */}
        <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">
              Customer Friction Points & AI Remediation
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {data.customerFrictionPoints.map((f: any, idx: number) => (
              <div key={idx} className="p-3 bg-amber-50/40 rounded-md border border-amber-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">{f.issue}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                    f.impact === 'HIGH'
                      ? 'bg-rose-100 text-rose-800'
                      : f.impact === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {f.impact} Impact
                  </span>
                </div>
                <div className="text-[11px] text-zinc-700 bg-white p-2 rounded-sm border border-amber-100">
                  <strong className="text-zinc-900">AI Suggested Action: </strong>
                  {f.suggestion}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
