import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Check, Copy, Tag, CheckCircle2, AlertCircle, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { api } from '../../lib/api';
import { Product } from '../../types';

interface AiListingCopilotProps {
  onPublishSuccess: () => void;
  onOpenFormWithData: (data: Partial<Product> & { specsText: string }) => void;
}

export const AiListingCopilot: React.FC<AiListingCopilotProps> = ({
  onPublishSuccess,
  onOpenFormWithData,
}) => {
  const [draftTitle, setDraftTitle] = useState('');
  const [brand, setBrand] = useState('Anker');
  const [category, setCategory] = useState('Electronics');
  const [targetAudience, setTargetAudience] = useState('Remote professionals & gamers');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [copiedSpecs, setCopiedSpecs] = useState(false);

  const [generatedListing, setGeneratedListing] = useState<any | null>(null);

  const presets = [
    {
      label: 'Gaming Laptop RTX 4060',
      title: 'Lenovo LOQ 15 Gaming Laptop Intel i5-13450HX 16GB DDR5 512GB SSD RTX 4060 144Hz',
      brand: 'Lenovo',
      category: 'Electronics',
      target: 'Competitive gamers and STEM students',
      features: '144Hz FHD anti-glare display, 8GB RTX 4060 GDDR6 GPU, dual-fan cooling system',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    },
    {
      label: 'Foldable MagSafe Station',
      title: '3-in-1 Foldable Travel Wireless Charging Cube with 15W MagSafe and Apple Watch Fast Puck',
      brand: 'Anker',
      category: 'Electronics',
      target: 'Frequent travelers and minimalist desk setups',
      features: 'Official 15W MagSafe magnetic pad, fast watch charging, compact pocketable aluminum cube',
      image: '/images/anker_magsafe_cube.jpg',
    },
    {
      label: 'Studio ANC Headphones',
      title: 'Sony WH-1000XM5 Premium Noise Canceling Wireless Over-Ear Headphones 30H Playtime',
      brand: 'Sony',
      category: 'Audio',
      target: 'Audiophiles, daily commuters, and hybrid office workers',
      features: 'Industry-leading Auto NC optimizer, 8 microphones, multipoint Bluetooth 5.3, 30-hour battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    },
    {
      label: 'Mechanical Hot-Swap Keyboard',
      title: 'Keychron V1 Custom Mechanical Keyboard Hot-Swappable RGB Backlight QMK/VIA PBT Keycaps',
      brand: 'Keychron',
      category: 'Electronics',
      target: 'Software engineers, mechanical keyboard enthusiasts, typists',
      features: 'Hot-swappable PCB, acoustic silicone dampening pad, south-facing RGB, Mac/Windows switch',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setDraftTitle(p.title);
    setBrand(p.brand);
    setCategory(p.category);
    setTargetAudience(p.target);
    setKeyFeatures(p.features);
    setImageUrl(p.image);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) return;

    setLoading(true);
    setPublishSuccess(false);
    try {
      const res = await api.generateSellerListing({
        draftTitle,
        brand,
        category,
        targetAudience,
        keyFeatures,
        image: imageUrl || undefined,
      });
      if (res?.data) {
        setGeneratedListing(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNow = async () => {
    if (!generatedListing) return;
    setPublishing(true);
    try {
      const payload = {
        name: generatedListing.name,
        brand: generatedListing.brand,
        category: generatedListing.category,
        price: generatedListing.price,
        originalPrice: generatedListing.originalPrice,
        stock: generatedListing.stock || 15,
        description: generatedListing.description,
        aboutItem: generatedListing.aboutItem,
        images: imageUrl
          ? [imageUrl]
          : ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80'],
        specs: generatedListing.specs,
        tags: generatedListing.tags,
      };

      await api.createSellerProduct(payload);
      setPublishSuccess(true);
      onPublishSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setPublishing(false);
    }
  };

  const handleOpenInModal = () => {
    if (!generatedListing) return;
    const specsStr = Object.entries(generatedListing.specs || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    onOpenFormWithData({
      name: generatedListing.name,
      brand: generatedListing.brand,
      category: generatedListing.category,
      price: generatedListing.price,
      originalPrice: generatedListing.originalPrice,
      stock: generatedListing.stock || 15,
      description: generatedListing.description,
      images: imageUrl ? [imageUrl] : [],
      specsText: specsStr,
    });
  };

  const handleCopySpecs = () => {
    if (!generatedListing?.specs) return;
    const text = Object.entries(generatedListing.specs)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2 border border-emerald-200/60">
              <Sparkles className="w-3 h-3" />
              <span>Gemini 3.8 Flash Powered Merchandising</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              AI Product Listing Generator
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 max-w-2xl">
              Type a basic model name, rough specifications, or a product concept. Gemini drafts SEO-optimized titles, structured technical specifications, compelling marketing bullets, and competitive pricing in seconds.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-400">Quick Templates:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-zinc-200 p-5 shadow-2xs">
          <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-zinc-700" />
            <span>Listing Input & Criteria</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Draft Product Title / Model <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                value={draftTitle}
                onChange={e => setDraftTitle(e.target.value)}
                placeholder="e.g. Dell XPS 15 2024 OLED i7 32GB RAM RTX 4050"
                className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
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
                  placeholder="e.g. Sony, Anker, Lenovo"
                  className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
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
                  <option value="Home & Office">Home & Office</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-zinc-700 mb-1">Target Customer / Buyer Persona</label>
              <input
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                placeholder="e.g. Daily commuters, coding engineers, fitness runners"
                className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-700 mb-1">Key Features / Raw Bullet Points</label>
              <textarea
                rows={2}
                value={keyFeatures}
                onChange={e => setKeyFeatures(e.target.value)}
                placeholder="e.g. 144Hz IPS display, 45W Type-C fast charging, aluminum chassis"
                className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-700 mb-1">Product Image URL (Optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:outline-none focus:bg-white focus:border-zinc-900"
              />
              {imageUrl && (
                <div className="mt-2 flex items-center gap-2 p-1.5 bg-zinc-50 border border-zinc-200 rounded-md">
                  <img src={imageUrl} alt="" className="w-10 h-10 object-contain rounded-md bg-white border border-zinc-200" />
                  <span className="text-[11px] text-zinc-500 truncate">{imageUrl}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !draftTitle.trim()}
              className="w-full mt-2 py-2 px-4 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Gemini is Synthesizing Listing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Complete Listing with AI</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          {generatedListing ? (
            <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs animate-in fade-in duration-300">
              {/* Score & Actions Bar */}
              <div className="p-3.5 bg-zinc-50/80 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                    {generatedListing.qualityScore}/100 Quality Score
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">Ready to Publish</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenInModal}
                    className="px-3 py-1 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 rounded-md text-xs font-medium transition-colors"
                  >
                    Edit in Form
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishNow}
                    disabled={publishing || publishSuccess}
                    className="px-3.5 py-1 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-60"
                  >
                    {publishSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Published!</span>
                      </>
                    ) : publishing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>1-Click Publish</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {publishSuccess && (
                <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Successfully added <strong>{generatedListing.name}</strong> to your store inventory! It is now live in the store catalog.
                  </span>
                </div>
              )}

              {/* Product Content Body */}
              <div className="p-5 space-y-4 text-xs">
                {/* Title & Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-sm">
                      {generatedListing.brand}
                    </span>
                    <span className="text-[10px] text-zinc-400">•</span>
                    <span className="text-[11px] text-zinc-500 font-medium">{generatedListing.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                    {generatedListing.name}
                  </h3>
                </div>

                {/* Price Matrix */}
                <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase font-medium">Selling Price</span>
                    <span className="text-base font-bold text-zinc-900">
                      ₹{Number(generatedListing.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <span className="text-[10px] text-zinc-500 block uppercase font-medium">Original MRP</span>
                    <span className="text-xs text-zinc-400 line-through">
                      ₹{Number(generatedListing.originalPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <span className="text-[10px] text-zinc-500 block uppercase font-medium">Discount</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                      {generatedListing.discount}% OFF
                    </span>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <span className="text-[10px] text-zinc-500 block uppercase font-medium">Initial Stock</span>
                    <span className="text-xs font-semibold text-zinc-800">
                      {generatedListing.stock} units
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-zinc-900 mb-1 text-[11px] uppercase tracking-wider">Product Overview</h4>
                  <p className="text-zinc-600 leading-relaxed bg-zinc-50/50 p-3 rounded-md border border-zinc-100">
                    {generatedListing.description}
                  </p>
                </div>

                {/* Bullet Points */}
                {generatedListing.aboutItem?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-zinc-900 mb-1.5 text-[11px] uppercase tracking-wider">
                      Key Highlights ("About This Item")
                    </h4>
                    <ul className="space-y-1.5 list-disc pl-4 text-zinc-700">
                      {generatedListing.aboutItem.map((item: string, i: number) => (
                        <li key={i} className="leading-snug">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Structured Specs */}
                {generatedListing.specs && Object.keys(generatedListing.specs).length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-semibold text-zinc-900 text-[11px] uppercase tracking-wider">
                        Technical Specifications Table
                      </h4>
                      <button
                        type="button"
                        onClick={handleCopySpecs}
                        className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
                      >
                        {copiedSpecs ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSpecs ? 'Copied' : 'Copy Specs'}</span>
                      </button>
                    </div>
                    <div className="rounded-md border border-zinc-200 overflow-hidden divide-y divide-zinc-200 text-[11px]">
                      {Object.entries(generatedListing.specs).map(([k, v]) => (
                        <div key={k} className="grid grid-cols-3 p-2 bg-white hover:bg-zinc-50/50">
                          <span className="font-medium text-zinc-600 col-span-1">{k}</span>
                          <span className="text-zinc-900 font-semibold col-span-2">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO Tips & Competitive Insight */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-md space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Search Ranking & Market Positioning Insights</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    {generatedListing.competitiveInsight}
                  </p>
                  {generatedListing.seoTips?.length > 0 && (
                    <ul className="space-y-1 text-[11px] text-amber-900 list-disc pl-4 pt-1">
                      {generatedListing.seoTips.map((tip: string, idx: number) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-lg border border-dashed border-zinc-300 p-10 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-500">
                <Sparkles className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">AI Merchandising Preview</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Select a quick template on the left or enter a basic product draft. Click <strong>Generate with AI</strong> to inspect the generated listing, technical specs, and SEO audit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
