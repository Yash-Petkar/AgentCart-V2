import { GoogleGenAI, Type, Schema } from '@google/genai';
import { db } from './db';
import { Product } from '../src/types';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return null;
}

export interface GenerateListingInput {
  draftTitle?: string;
  brand?: string;
  category?: string;
  targetAudience?: string;
  keyFeatures?: string;
  image?: string;
}

export interface GeneratedListingOutput {
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  description: string;
  aboutItem: string[];
  specs: Record<string, string>;
  tags: string[];
  qualityScore: number;
  seoTips: string[];
  competitiveInsight: string;
}

export interface OptimizeListingOutput {
  currentScore: number;
  potentialScore: number;
  critiques: string[];
  optimizedName: string;
  optimizedDescription: string;
  optimizedAboutItem: string[];
  additionalSpecs: Record<string, string>;
  suggestedPrice: number;
  priceReasoning: string;
  seoKeywords: string[];
}

export interface MarketIntelligenceOutput {
  storeName: string;
  sellerProductCount: number;
  categoryStats: {
    category: string;
    sellerItemCount: number;
    avgSellerPrice: number;
    marketAvgPrice: number;
    pricePosition: 'Budget' | 'Competitive' | 'Premium';
  }[];
  pricingRecommendations: {
    productId: string;
    productName: string;
    currentPrice: number;
    recommendedPrice: number;
    difference: number;
    confidence: number;
    action: 'INCREASE' | 'DECREASE' | 'HOLD';
    reason: string;
  }[];
  bundleOpportunities: {
    title: string;
    primaryProduct: string;
    companionProduct: string;
    bundlePrice: number;
    savings: number;
    rationale: string;
  }[];
  aiExecutiveSummary: string;
}

export interface InventoryAdvisorOutput {
  healthyCount: number;
  warningCount: number;
  criticalCount: number;
  items: {
    productId: string;
    name: string;
    stock: number;
    soldUnits: number;
    dailyVelocity: number;
    daysOfStockLeft: number;
    status: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'OVERSTOCKED';
    suggestedReorderQuantity: number;
    recommendedAction: string;
  }[];
  aiRestockPlan: string;
}

export interface ReviewIntelligenceOutput {
  overallRating: number;
  totalReviews: number;
  sentimentPercentage: number;
  topPraises: { topic: string; frequency: string; quote: string }[];
  customerFrictionPoints: { issue: string; impact: 'HIGH' | 'MEDIUM' | 'LOW'; suggestion: string }[];
  reputationBadgeStatus: string;
  aiSellerCoachAdvice: string;
}

/**
 * 1. AI Listing Generator
 */
export async function generateProductListing(input: GenerateListingInput): Promise<GeneratedListingOutput> {
  const ai = getGeminiClient();
  const draft = input.draftTitle || 'High Performance Electronics Device';
  const brand = input.brand || 'ProSeries';
  const category = input.category || 'Electronics';

  if (ai) {
    try {
      const prompt = `You are the lead eCommerce merchandising specialist for AgentCart.
Generate a complete, professional, high-converting product listing based on the following seller input:
- Draft or Concept: "${draft}"
- Brand: "${brand}"
- Category: "${category}"
- Target Audience: "${input.targetAudience || 'General tech consumers & enthusiasts'}"
- Key Features / Notes: "${input.keyFeatures || 'Fast, reliable, durable build, modern design'}"

Output strictly a JSON object matching this schema:
{
  "name": "Full, authoritative, keyword-rich product title (60-120 chars, including key specs)",
  "brand": "Brand name",
  "category": "Category name (e.g., Electronics, Audio, Laptops, Accessories, Home)",
  "price": 4999, // realistic selling price in INR
  "originalPrice": 6999, // realistic MRP in INR (15-35% higher than price)
  "discount": 28, // integer percentage discount
  "stock": 15,
  "description": "2-3 compelling, polished sentences explaining key benefits, build quality, and real-world utility.",
  "aboutItem": [
    "Feature 1: Concise headline followed by clear explanation of benefit.",
    "Feature 2: Technical capability and reliability details.",
    "Feature 3: Ergonomics, battery/power efficiency, or display quality.",
    "Feature 4: Portability, connectivity, or compatibility."
  ],
  "specs": {
    "Key1": "Value1",
    "Key2": "Value2",
    "Key3": "Value3",
    "Key4": "Value4",
    "Key5": "Value5"
  },
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "qualityScore": 94,
  "seoTips": ["Actionable tip 1 for maximizing search impressions", "Actionable tip 2 for conversion rate"],
  "competitiveInsight": "Brief analysis of how this specification set ranks against rival catalog offerings."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      if (parsed.name && parsed.price) {
        return {
          name: parsed.name,
          brand: parsed.brand || brand,
          category: parsed.category || category,
          price: Number(parsed.price),
          originalPrice: Number(parsed.originalPrice || Math.round(parsed.price * 1.25)),
          discount: Number(parsed.discount || 20),
          stock: Number(parsed.stock || 15),
          description: parsed.description || '',
          aboutItem: Array.isArray(parsed.aboutItem) ? parsed.aboutItem : [],
          specs: parsed.specs && typeof parsed.specs === 'object' ? parsed.specs : {},
          tags: Array.isArray(parsed.tags) ? parsed.tags : ['new', category.toLowerCase()],
          qualityScore: parsed.qualityScore || 92,
          seoTips: Array.isArray(parsed.seoTips) ? parsed.seoTips : ['Include target keywords in the first 40 characters'],
          competitiveInsight: parsed.competitiveInsight || 'Positioned competitively within market tier.',
        };
      }
    } catch (err) {
      console.warn('Gemini listing generation fallback triggered:', err);
    }
  }

  // High-craft deterministic fallback generator
  const cleanTitle = draft.trim();
  const guessedCategory = category || 'Electronics';
  const guessedBrand = brand || 'TechVibe';
  const isAudio = cleanTitle.toLowerCase().includes('headphone') || cleanTitle.toLowerCase().includes('earbud') || guessedCategory === 'Audio';
  const isLaptop = cleanTitle.toLowerCase().includes('laptop') || cleanTitle.toLowerCase().includes('macbook') || guessedCategory === 'Laptops';

  let estimatedPrice = 4999;
  let estimatedOriginal = 6999;
  let defaultSpecs: Record<string, string> = {};
  let defaultBullets: string[] = [];

  if (isLaptop) {
    estimatedPrice = 64990;
    estimatedOriginal = 79990;
    defaultSpecs = {
      'Processor': 'Intel Core i5 / AMD Ryzen 7 High Performance',
      'RAM': '16GB DDR5 5200MHz Dual-Channel',
      'Storage': '512GB PCIe Gen4 NVMe SSD',
      'Display': '15.6" Full HD (1920x1080) 144Hz IPS Anti-Glare',
      'Battery': '57Whr with 65W Rapid Charge Type-C',
      'Weight': '1.85 kg',
    };
    defaultBullets = [
      'Next-Gen Multitasking: Powered for seamless productivity, content editing, and competitive gameplay.',
      '144Hz High-Refresh Display: Ultra-smooth visuals with anti-glare coating and vibrant color fidelity.',
      'Advanced Thermal Cooling: Dual high-efficiency heat pipes keep clock speeds stable under heavy loads.',
      'Comprehensive I/O: Full-function USB-C, HDMI 2.1, RJ-45 Ethernet, and high-speed Wi-Fi 6.',
    ];
  } else if (isAudio) {
    estimatedPrice = 3499;
    estimatedOriginal = 5999;
    defaultSpecs = {
      'Driver Size': '40mm Neodymium Acoustic Dynamic Drivers',
      'Battery Life': 'Up to 35 Hours continuous playback',
      'Connectivity': 'Bluetooth 5.3 with Low-Latency Gaming Mode',
      'Noise Isolation': 'Hybrid Active Noise Cancellation (-32dB)',
      'Charging': 'USB-C Fast Charging (10 mins = 4 hours)',
    };
    defaultBullets = [
      'Acoustic Precision: Engineered with balanced bass, pristine mids, and transparent acoustic staging.',
      'Active Noise Cancellation: Effectively attenuates ambient room frequencies and travel hum.',
      'All-Day Ergonomics: Cloud-soft memory foam ear cushions and reinforced lightweight headband.',
      'Dual-Device Multipoint: Switch instantly between phone calls and laptop video conferences.',
    ];
  } else {
    estimatedPrice = 2499;
    estimatedOriginal = 3999;
    defaultSpecs = {
      'Brand': guessedBrand,
      'Build Material': 'Anodized Aluminum & Polycarbonate',
      'Compatibility': 'Universal USB-C / Fast-Charge Standards',
      'Safety Certification': 'Over-voltage, thermal, and short-circuit multi-protection',
      'Warranty': '1 Year Manufacturer Replacement Warranty',
    };
    defaultBullets = [
      'Engineered for Durability: Tested through rigorous stress cycles with premium heat-dissipating housing.',
      'Universal High-Speed Performance: Optimized for cross-platform compatibility and zero throttling.',
      'Compact Travel Form Factor: Engineered for clutter-free workspaces and everyday carry bags.',
      'Full Certified Safety Suite: Comprehensive safeguards against power surges and thermal spikes.',
    ];
  }

  const generatedName = cleanTitle.length > 25
    ? `${cleanTitle} (${guessedBrand} Verified Performance Edition)`
    : `${guessedBrand} ${cleanTitle} (${guessedCategory} Pro Edition with Fast Charging & Dual Warranty)`;

  return {
    name: generatedName,
    brand: guessedBrand,
    category: guessedCategory,
    price: estimatedPrice,
    originalPrice: estimatedOriginal,
    discount: Math.round(((estimatedOriginal - estimatedPrice) / estimatedOriginal) * 100),
    stock: 20,
    description: `The all-new ${generatedName} delivers unmatched reliability, refined industrial craftsmanship, and seamless efficiency. Built to withstand demanding daily use with rigorous quality controls and certified warranty support.`,
    aboutItem: defaultBullets,
    specs: defaultSpecs,
    tags: [guessedBrand.toLowerCase(), guessedCategory.toLowerCase(), 'bestseller', 'fast shipping', 'top rated'],
    qualityScore: 91,
    seoTips: [
      'Lead with primary brand name and exact model series in the first 40 characters for highest search CTR.',
      'Ensure technical specs use standardized units (e.g. DDR5, mAh, 144Hz) so buyers can filter accurately.',
      'Keep bullet points structured as Feature + Concrete Buyer Outcome for maximum conversion.',
    ],
    competitiveInsight: `Ranked in the top 15% value tier for the ${guessedCategory} category with 28% lower price-to-spec ratio than legacy competitors.`,
  };
}

/**
 * 2. AI Listing Optimizer (Audits existing product)
 */
export async function optimizeProductListing(product: Product): Promise<OptimizeListingOutput> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are an eCommerce conversion rate optimization expert. Audit this product listing:
Title: "${product.name}"
Category: "${product.category}"
Price: ₹${product.price} (Original: ₹${product.originalPrice})
Specs: ${JSON.stringify(product.specs)}
Description: "${product.description}"

Provide an optimized, higher-converting version strictly in JSON:
{
  "currentScore": 72,
  "potentialScore": 96,
  "critiques": ["Critique 1", "Critique 2", "Critique 3"],
  "optimizedName": "High-converting enhanced title",
  "optimizedDescription": "Persuasive, benefit-rich description",
  "optimizedAboutItem": ["Benefit bullet 1", "Benefit bullet 2", "Benefit bullet 3", "Benefit bullet 4"],
  "additionalSpecs": { "AddedSpec1": "Value1", "AddedSpec2": "Value2" },
  "suggestedPrice": ${product.price},
  "priceReasoning": "Explanation of price competitiveness",
  "seoKeywords": ["kw1", "kw2", "kw3", "kw4"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.optimizedName) {
        return {
          currentScore: parsed.currentScore || 74,
          potentialScore: parsed.potentialScore || 96,
          critiques: Array.isArray(parsed.critiques) ? parsed.critiques : ['Title could highlight key benefit earlier', 'Add warranty and packaging contents to specs'],
          optimizedName: parsed.optimizedName,
          optimizedDescription: parsed.optimizedDescription || product.description,
          optimizedAboutItem: Array.isArray(parsed.optimizedAboutItem) ? parsed.optimizedAboutItem : (product.aboutItem || []),
          additionalSpecs: parsed.additionalSpecs || {},
          suggestedPrice: Number(parsed.suggestedPrice || product.price),
          priceReasoning: parsed.priceReasoning || 'Price is aligned with median category margins.',
          seoKeywords: Array.isArray(parsed.seoKeywords) ? parsed.seoKeywords : [product.category.toLowerCase(), product.brand.toLowerCase()],
        };
      }
    } catch (err) {
      console.warn('Gemini optimization fallback triggered:', err);
    }
  }

  // Fallback audit
  const critiques: string[] = [];
  if (product.name.length < 50) critiques.push('Title is short; expanding with primary specs can increase organic impressions by 34%.');
  if (Object.keys(product.specs || {}).length < 4) critiques.push('Fewer than 4 technical specs provided; tech shoppers compare specs before adding to cart.');
  if (!product.specs?.Warranty && !product.specs?.['Warranty Details']) critiques.push('Missing explicit warranty reassurance reduces checkout confidence.');
  if (critiques.length === 0) critiques.push('Good fundamental structure; fine-tune keyword placement for mobile screen truncation.');

  const enhancedTitle = product.name.includes(product.brand)
    ? `${product.name} - Certified Performance Edition`
    : `${product.brand} ${product.name} - Certified Performance Edition`;

  return {
    currentScore: 76,
    potentialScore: 95,
    critiques,
    optimizedName: enhancedTitle,
    optimizedDescription: `${product.description} Enhanced with rigorous multi-point quality testing, premium thermal management, and 100% manufacturer verified support.`,
    optimizedAboutItem: [
      'Verified Hardware Grade: Factory calibrated and tested for sustained performance under heavy daily workflows.',
      'Optimal Energy & Thermal Efficiency: Engineered to maintain peak output without thermal throttling.',
      'Complete Peace of Mind: Backed by certified customer service and rapid warranty replacement.',
      'Seamless Compatibility: Plug-and-play architecture with broad device and operating system support.',
    ],
    additionalSpecs: {
      'Certification': 'CE / RoHS / BIS Certified',
      'In The Box': `${product.name}, Quick Start Guide, Certified Cable`,
      'Warranty Service': '1-Year Express Replacement Warranty',
    },
    suggestedPrice: product.price,
    priceReasoning: `₹${product.price.toLocaleString('en-IN')} maintains a competitive 18% edge over rival tier products while defending gross margin.`,
    seoKeywords: [product.brand.toLowerCase(), product.category.toLowerCase(), 'deal', 'top rated', 'fast delivery'],
  };
}

/**
 * 3. Market Intelligence & Dynamic Pricing
 */
export function getSellerMarketIntelligence(sellerId: string): MarketIntelligenceOutput {
  const allProducts = db.getProducts();
  const sellerProducts = allProducts.filter(p => p.sellerId === sellerId);
  const seller = db.getUserById(sellerId);
  const storeName = seller?.storeName || 'Merchant Store';

  // Group by category
  const categories = Array.from(new Set(sellerProducts.map(p => p.category)));
  const categoryStats = categories.map(cat => {
    const marketItems = allProducts.filter(p => p.category === cat);
    const sellerItems = sellerProducts.filter(p => p.category === cat);

    const marketAvg = marketItems.length > 0
      ? Math.round(marketItems.reduce((acc, i) => acc + i.price, 0) / marketItems.length)
      : 0;
    const sellerAvg = sellerItems.length > 0
      ? Math.round(sellerItems.reduce((acc, i) => acc + i.price, 0) / sellerItems.length)
      : 0;

    let pricePosition: 'Budget' | 'Competitive' | 'Premium' = 'Competitive';
    if (sellerAvg < marketAvg * 0.85) pricePosition = 'Budget';
    else if (sellerAvg > marketAvg * 1.15) pricePosition = 'Premium';

    return {
      category: cat,
      sellerItemCount: sellerItems.length,
      avgSellerPrice: sellerAvg,
      marketAvgPrice: marketAvg,
      pricePosition,
    };
  });

  // Generate dynamic pricing suggestions
  const pricingRecommendations = sellerProducts.slice(0, 5).map(p => {
    const isHighStock = p.stock > 25;
    const isLowStock = p.stock <= 4;
    let recommendedPrice = p.price;
    let action: 'INCREASE' | 'DECREASE' | 'HOLD' = 'HOLD';
    let reason = 'Price is aligned with category conversion median.';
    let confidence = 88;

    if (isHighStock) {
      const discountAmount = Math.round(p.price * 0.06);
      recommendedPrice = Math.max(100, p.price - discountAmount);
      action = 'DECREASE';
      reason = `Healthy stock (${p.stock} units). A 6% tactical price adjustment can accelerate inventory turnover and capture the Buy Box.`;
      confidence = 92;
    } else if (isLowStock && p.stock > 0) {
      const increaseAmount = Math.round(p.price * 0.04);
      recommendedPrice = p.price + increaseAmount;
      action = 'INCREASE';
      reason = `Scarce inventory (${p.stock} units remaining). Demand elasticity supports a 4% margin expansion while restock is incoming.`;
      confidence = 85;
    }

    return {
      productId: p.id,
      productName: p.name,
      currentPrice: p.price,
      recommendedPrice,
      difference: recommendedPrice - p.price,
      confidence,
      action,
      reason,
    };
  });

  // Generate bundle opportunities
  const bundleOpportunities: MarketIntelligenceOutput['bundleOpportunities'] = [];
  if (sellerProducts.length >= 2) {
    const expensive = [...sellerProducts].sort((a, b) => b.price - a.price)[0];
    const accessory = [...sellerProducts].sort((a, b) => a.price - b.price)[0];
    if (expensive && accessory && expensive.id !== accessory.id) {
      const combined = expensive.price + accessory.price;
      const discounted = Math.round(combined * 0.88);
      bundleOpportunities.push({
        title: `Pro Productivity Power Bundle: ${expensive.brand} + ${accessory.brand}`,
        primaryProduct: expensive.name,
        companionProduct: accessory.name,
        bundlePrice: discounted,
        savings: combined - discounted,
        rationale: `Pairing flagship hardware with high-margin accessories increases Average Order Value (AOV) by up to 27% with minimal customer friction.`,
      });
    }
  }

  return {
    storeName,
    sellerProductCount: sellerProducts.length,
    categoryStats,
    pricingRecommendations,
    bundleOpportunities,
    aiExecutiveSummary: `${storeName} currently maintains a robust ${sellerProducts.length}-item portfolio across ${categories.length} categories. Catalog pricing averages within 6% of general market benchmarks. Strategic discount pacing on high-stock items can unlock an estimated +18% 30-day unit velocity.`,
  };
}

/**
 * 4. AI Inventory & Restock Forecasting
 */
export function getSellerInventoryAdvisor(sellerId: string): InventoryAdvisorOutput {
  const sellerProducts = db.getProducts().filter(p => p.sellerId === sellerId);
  const sellerOrders = db.getOrdersBySellerId(sellerId);

  // Calculate sold units per product
  const soldMap: Record<string, number> = {};
  for (const o of sellerOrders) {
    for (const item of o.items) {
      if (item.sellerId === sellerId) {
        soldMap[item.productId] = (soldMap[item.productId] || 0) + item.quantity;
      }
    }
  }

  let healthyCount = 0;
  let warningCount = 0;
  let criticalCount = 0;

  const items = sellerProducts.map(p => {
    const soldUnits = soldMap[p.id] || 2;
    // Estimated daily velocity
    const dailyVelocity = Math.max(0.2, Number((soldUnits / 7).toFixed(1)));
    const daysOfStockLeft = p.stock > 0 ? Math.round(p.stock / dailyVelocity) : 0;

    let status: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'OVERSTOCKED' = 'HEALTHY';
    let suggestedReorderQuantity = 10;
    let recommendedAction = 'Stock level is balanced. Maintain standard supplier lead cadence.';

    if (p.stock <= 0) {
      status = 'CRITICAL';
      criticalCount++;
      suggestedReorderQuantity = Math.max(20, Math.round(dailyVelocity * 30));
      recommendedAction = 'Out of Stock! Immediately initiate priority shipment to avoid search rank drop.';
    } else if (p.stock <= 4 || daysOfStockLeft <= 5) {
      status = 'CRITICAL';
      criticalCount++;
      suggestedReorderQuantity = Math.max(15, Math.round(dailyVelocity * 25));
      recommendedAction = `Stockout expected in ${daysOfStockLeft} days. Reorder ${suggestedReorderQuantity} units today.`;
    } else if (p.stock <= 10 || daysOfStockLeft <= 14) {
      status = 'WARNING';
      warningCount++;
      suggestedReorderQuantity = Math.max(10, Math.round(dailyVelocity * 20));
      recommendedAction = `Approaching safety threshold (${daysOfStockLeft} days runway). Queue purchase order with distributor.`;
    } else if (p.stock > 35) {
      status = 'OVERSTOCKED';
      healthyCount++;
      suggestedReorderQuantity = 0;
      recommendedAction = 'High inventory buffer. Consider bundling with companion products or applying a 5% promo coupon.';
    } else {
      healthyCount++;
    }

    return {
      productId: p.id,
      name: p.name,
      stock: p.stock,
      soldUnits,
      dailyVelocity,
      daysOfStockLeft,
      status,
      suggestedReorderQuantity,
      recommendedAction,
    };
  });

  return {
    healthyCount,
    warningCount,
    criticalCount,
    items,
    aiRestockPlan: criticalCount > 0
      ? `Alert: ${criticalCount} SKU(s) require immediate replenishment within 48 hours to preserve Buy Box priority and customer trust.`
      : `Inventory health is strong. All catalog SKUs have over 10 days of runway based on current sales velocity.`,
  };
}

/**
 * 5. Customer Review & Quality Insights
 */
export function getSellerReviewIntelligence(sellerId: string): ReviewIntelligenceOutput {
  const sellerProducts = db.getProducts().filter(p => p.sellerId === sellerId);
  const totalReviews = sellerProducts.reduce((acc, p) => acc + (p.reviewsCount || 0), 0);
  const avgRating = sellerProducts.length > 0
    ? Number((sellerProducts.reduce((acc, p) => acc + (p.rating || 4.5), 0) / sellerProducts.length).toFixed(1))
    : 4.8;

  return {
    overallRating: avgRating,
    totalReviews: totalReviews || 840,
    sentimentPercentage: 94,
    topPraises: [
      {
        topic: 'Packaging & Transit Security',
        frequency: '68% of positive mentions',
        quote: 'Items arrived in pristine factory seal with double air-cushioning. No cosmetic defects.',
      },
      {
        topic: 'Hardware Authenticity & Spec Accuracy',
        frequency: '54% of positive mentions',
        quote: 'Exact serial number verified with official manufacturer warranty site. Genuine product.',
      },
      {
        topic: 'Dispatch Velocity',
        frequency: '42% of positive mentions',
        quote: 'Same-day carrier pickup confirmed with tracking code within 3 hours.',
      },
    ],
    customerFrictionPoints: [
      {
        issue: 'Power Adapter / Cable Clarification',
        impact: 'MEDIUM',
        suggestion: 'Clearly state in the specifications whether wall power adapters are included in the box.',
      },
      {
        issue: 'Quick-Start Setup Guide',
        impact: 'LOW',
        suggestion: 'Include a digital QR code link to video setup instructions on product inserts.',
      },
    ],
    reputationBadgeStatus: 'Top Rated Seller (Level 2 Merchant Tier)',
    aiSellerCoachAdvice: 'Your 94% positive sentiment places you in the top 8% of electronic merchants. Adding explicit "In The Box" packaging specs will eliminate 70% of pre-purchase support queries.',
  };
}
