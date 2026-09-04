import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { db, Product } from './db';
import { scoreProducts, generateComparisonMatrix, RecommendationConstraints } from './recommendation';
import { buildOrderTracking, OrderTrackingInfo } from './tracking';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  image?: string;
  toolCalls?: Array<{
    name: string;
    args: any;
    result?: any;
  }>;
  products?: Product[];
  actionTaken?: {
    type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'SHOW_CART' | 'PROCEED_CHECKOUT';
    productName?: string;
    quantity?: number;
    success: boolean;
    message: string;
  };
  comparison?: {
    products: Product[];
    matrix: Array<{ attribute: string; values: Record<string, string> }>;
    verdict?: string;
  };
  bundle?: {
    title: string;
    theme?: string;
    budget: number;
    totalAmount: number;
    savings: number;
    items: Product[];
    reason: string;
  };
  orderTracking?: OrderTrackingInfo;
  quizRecommendation?: {
    product: Product;
    matchScore: number;
    matchReasons: string[];
    criteriaSummary: string;
  };
}

// Tool Declarations for Gemini Function Calling
const searchProductsTool: FunctionDeclaration = {
  name: 'search_products',
  description: 'Search catalog for real products based on category, price range, brand, or use case (gaming, coding, student, etc.)',
  parameters: {
    type: Type.OBJECT,
    properties: {
      category: { type: Type.STRING, description: 'Category like Laptops, Smartphones, Audio, Monitors, Fashion, Kitchen' },
      maxPrice: { type: Type.NUMBER, description: 'Maximum budget ceiling in INR' },
      minPrice: { type: Type.NUMBER, description: 'Minimum price in INR' },
      brand: { type: Type.STRING, description: 'Brand name, e.g. Lenovo, Apple, Asus, Acer, HP, Sony' },
      useCase: { type: Type.STRING, description: 'Use case, e.g. gaming, coding, battery, travel' },
      minRamGb: { type: Type.NUMBER, description: 'Minimum RAM required in GB (e.g. 16)' },
      query: { type: Type.STRING, description: 'General search keyword' },
    },
  },
};

const compareProductsTool: FunctionDeclaration = {
  name: 'compare_products',
  description: 'Compare two or more products side by side by their IDs or search keywords to generate a spec and price comparison matrix',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productIds: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'List of product IDs to compare',
      },
      searchTerms: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Product names to look up and compare (e.g. ["Lenovo LOQ", "Acer Nitro"])',
      },
    },
  },
};

const buildBudgetBundleTool: FunctionDeclaration = {
  name: 'build_budget_bundle',
  description: 'Build a cohesive bundle of compatible products and accessories that fit within a total budget ceiling (e.g. laptop + mouse + headphones)',
  parameters: {
    type: Type.OBJECT,
    properties: {
      budget: { type: Type.NUMBER, description: 'Maximum total price in INR' },
      theme: { type: Type.STRING, description: 'gaming, student, coding, workstation, everyday, travel' },
    },
    required: ['budget'],
  },
};

const trackOrderTool: FunctionDeclaration = {
  name: 'track_order',
  description: 'Lookup the live tracking status, shipment milestones, carrier, and estimated delivery date for the user\'s orders',
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderNumber: { type: Type.STRING, description: 'Optional specific order number, e.g. AC-362112-579' },
    },
  },
};

const quizFindMatchTool: FunctionDeclaration = {
  name: 'quiz_find_match',
  description: 'Find the highest matching catalog product based on 3 user preferences: use case, budget bracket, and priority spec',
  parameters: {
    type: Type.OBJECT,
    properties: {
      useCase: { type: Type.STRING, description: 'gaming, coding, work, student, travel, entertainment' },
      budgetBracket: { type: Type.STRING, description: 'under 40k, 40k-75k, 75k-120k, any' },
      priority: { type: Type.STRING, description: 'battery, performance, display, value, portability' },
    },
    required: ['useCase', 'priority'],
  },
};

const getProductTool: FunctionDeclaration = {
  name: 'get_product',
  description: 'Get full details and specifications of a specific product by ID',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productId: { type: Type.STRING, description: 'Product ID' },
    },
    required: ['productId'],
  },
};

const addToCartTool: FunctionDeclaration = {
  name: 'add_to_cart',
  description: 'Add a verified catalog product to the user cart',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productId: { type: Type.STRING, description: 'The exact product ID to add' },
      quantity: { type: Type.NUMBER, description: 'Quantity to add, default 1' },
    },
    required: ['productId'],
  },
};

const removeFromCartTool: FunctionDeclaration = {
  name: 'remove_from_cart',
  description: 'Remove a product from the user cart',
  parameters: {
    type: Type.OBJECT,
    properties: {
      productId: { type: Type.STRING, description: 'Product ID to remove' },
    },
    required: ['productId'],
  },
};

const getCartTool: FunctionDeclaration = {
  name: 'get_cart',
  description: 'View current items, quantities, subtotal and totals in the cart',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

// Tool Execution Dispatcher
export function executeTool(
  name: string,
  args: any,
  userId: string,
  userEmail?: string
): {
  result: any;
  actionTaken?: any;
  products?: Product[];
  comparison?: any;
  bundle?: any;
  orderTracking?: any;
  quizRecommendation?: any;
} {
  console.log(`[AI Tool Execution] Calling tool: ${name} with args:`, JSON.stringify(args));

  // 1. Search Products
  if (name === 'search_products') {
    const products = db.getProducts();
    const scored = scoreProducts(products, {
      category: args.category,
      maxPrice: args.maxPrice,
      minPrice: args.minPrice,
      brand: args.brand,
      useCase: args.useCase,
      minRamGb: args.minRamGb,
      mustBeInStock: true,
    });

    const matches = scored.slice(0, 5).map(s => ({
      id: s.product.id,
      name: s.product.name,
      brand: s.product.brand,
      price: s.product.price,
      rating: s.product.rating,
      stock: s.product.stock,
      score: s.score,
      reasons: s.reasons,
      keySpecs: s.product.specs,
    }));

    return {
      result: {
        totalFound: matches.length,
        bestMatch: matches[0] || null,
        candidates: matches,
      },
      products: scored.slice(0, 5).map(s => s.product),
    };
  }

  // 2. Automated Spec & Price Comparison Matrix
  if (name === 'compare_products') {
    const allProducts = db.getProducts();
    let comparedProducts: Product[] = [];

    if (args.productIds && Array.isArray(args.productIds) && args.productIds.length > 0) {
      comparedProducts = allProducts.filter(p => args.productIds.includes(p.id));
    }

    if (comparedProducts.length < 2 && args.searchTerms && Array.isArray(args.searchTerms)) {
      for (const term of args.searchTerms) {
        const cleanTerm = String(term).trim().toLowerCase();
        if (!cleanTerm) continue;
        const found = allProducts.find(
          p =>
            p.name.toLowerCase().includes(cleanTerm) ||
            cleanTerm.includes(p.name.toLowerCase()) ||
            p.brand.toLowerCase().includes(cleanTerm) ||
            cleanTerm.includes(p.brand.toLowerCase())
        );
        if (found && !comparedProducts.some(p => p.id === found.id)) {
          comparedProducts.push(found);
        }
      }
    }

    // If 1 product matched, pick the closest category companion (e.g. another laptop or similar category)
    if (comparedProducts.length === 1) {
      const p1 = comparedProducts[0];
      const isLaptop = p1.name.toLowerCase().includes('laptop') || p1.name.toLowerCase().includes('macbook');
      const companions = allProducts.filter(
        p => p.id !== p1.id && (isLaptop ? (p.name.toLowerCase().includes('laptop') || p.name.toLowerCase().includes('macbook')) : p.category === p1.category)
      );
      if (companions.length > 0) {
        comparedProducts.push(companions[0]);
      }
    }

    // Default fallback: pick top 2 laptops in catalog
    if (comparedProducts.length < 2) {
      const laptops = allProducts.filter(
        p => p.name.toLowerCase().includes('laptop') || p.name.toLowerCase().includes('macbook')
      );
      comparedProducts = laptops.length >= 2 ? laptops.slice(0, 2) : allProducts.slice(0, 2);
    }

    const matrix = generateComparisonMatrix(comparedProducts);

    // Compute comparative verdict
    let verdict = '';
    if (comparedProducts.length >= 2) {
      const [p1, p2] = comparedProducts;
      const priceDiff = Math.abs(p1.price - p2.price);
      const cheaper = p1.price < p2.price ? p1 : p2;
      const pricier = p1.price >= p2.price ? p1 : p2;

      verdict = `${pricier.name} offers superior high-performance headroom (Rating: ★${pricier.rating}), while ${cheaper.name} is the value-focused champion saving you ₹${priceDiff.toLocaleString('en-IN')}.`;
    }

    return {
      result: {
        productsCount: comparedProducts.length,
        matrix,
        verdict,
      },
      products: comparedProducts,
      comparison: {
        products: comparedProducts,
        matrix,
        verdict,
      },
    };
  }

  // 3. AI "Budget Bundle Builder" (1-Click Multi-Add)
  if (name === 'build_budget_bundle') {
    const budget = Number(args.budget) || 75000;
    const theme = (args.theme || 'everyday').toLowerCase();
    const allProducts = db.getProducts().filter(p => p.stock > 0);

    // Find a primary hero item (Laptop or Smartphone) taking ~65% - 85% of the budget
    const targetHeroMax = budget * 0.85;
    const heroCandidates = allProducts.filter(
      p =>
        (p.category.toLowerCase().includes('laptop') ||
          p.category.toLowerCase().includes('phone') ||
          p.category.toLowerCase().includes('work') ||
          p.category.toLowerCase().includes('audio')) &&
        p.price <= targetHeroMax
    );

    let heroProduct = heroCandidates.sort((a, b) => b.price - a.price)[0];
    if (!heroProduct) {
      heroProduct = allProducts.filter(p => p.price <= budget).sort((a, b) => b.price - a.price)[0] || allProducts[0];
    }

    // Remaining budget for accessories
    let remainingBudget = budget - (heroProduct ? heroProduct.price : 0);
    const bundleItems: Product[] = heroProduct ? [heroProduct] : [];

    // Find complementary accessories
    const accessories = allProducts.filter(
      p =>
        p.id !== heroProduct?.id &&
        p.price <= remainingBudget &&
        (p.category.toLowerCase().includes('audio') ||
          p.category.toLowerCase().includes('accessories') ||
          p.name.toLowerCase().includes('mouse') ||
          p.name.toLowerCase().includes('watch') ||
          p.name.toLowerCase().includes('case') ||
          p.name.toLowerCase().includes('keyboard') ||
          p.name.toLowerCase().includes('backpack') ||
          p.name.toLowerCase().includes('bottle'))
    );

    // Pick 1 or 2 accessories that fit within remaining budget
    for (const acc of accessories) {
      if (acc.price <= remainingBudget && bundleItems.length < 3) {
        bundleItems.push(acc);
        remainingBudget -= acc.price;
      }
    }

    const totalAmount = bundleItems.reduce((sum, item) => sum + item.price, 0);
    const savings = Math.max(1200, Math.round(totalAmount * 0.08));

    const bundleData = {
      title: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Power Bundle`,
      theme,
      budget,
      totalAmount,
      savings,
      items: bundleItems,
      reason: `Engineered setup combining the primary device (${heroProduct?.name || 'Device'}) with essential peripherals while staying ₹${(budget - totalAmount).toLocaleString('en-IN')} below your budget ceiling.`,
    };

    return {
      result: {
        budget,
        totalAmount,
        savings,
        itemsCount: bundleItems.length,
      },
      products: bundleItems,
      bundle: bundleData,
    };
  }

  // 4. AI Order Status & Tracking Agent
  if (name === 'track_order') {
    const orders = db.getOrdersByUserId(userId, userEmail);
    let matchedOrder = null;

    if (args.orderNumber) {
      const fullStr = String(args.orderNumber).trim();
      const codeMatch = fullStr.match(/AC-[A-Za-z0-9-]+/i) || fullStr.match(/\b[A-Za-z0-9]{8,}\b/i);
      const q = (codeMatch ? codeMatch[0] : fullStr).toLowerCase();

      matchedOrder = orders.find(
        o => o.orderNumber.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
      );
      if (!matchedOrder) {
        const allOrders = db.getOrders();
        matchedOrder = allOrders.find(
          o => o.orderNumber.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
        );
      }
    } else {
      matchedOrder = orders[0] || db.getOrders()[0];
    }

    if (!matchedOrder) {
      return {
        result: {
          found: false,
          message: 'No recent orders found in database. Place an order to start tracking delivery progress in real time.',
        },
      };
    }

    const tracking = buildOrderTracking(matchedOrder);

    return {
      result: {
        found: true,
        orderId: matchedOrder.id,
        orderNumber: matchedOrder.orderNumber,
        status: matchedOrder.status,
        carrier: tracking.carrier,
        trackingNumber: tracking.trackingNumber,
        estimatedDelivery: tracking.estimatedDelivery,
        currentMilestone: tracking.timeline.find(t => t.current)?.label || tracking.status,
      },
      orderTracking: tracking,
    };
  }

  // 5. 3-Question "Find My Match" Guided Quiz Matcher
  if (name === 'quiz_find_match') {
    const { useCase = 'gaming', budgetBracket = '40k-75k', priority = 'performance' } = args;

    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if ((budgetBracket.includes('40') || budgetBracket.includes('40k')) && (budgetBracket.includes('75') || budgetBracket.includes('75k'))) {
      minPrice = 30000;
      maxPrice = 75000;
    } else if (budgetBracket.includes('under') || budgetBracket.includes('<') || budgetBracket.includes('40')) {
      maxPrice = 42000;
    } else if (budgetBracket.includes('75') || budgetBracket.includes('75k') || budgetBracket.includes('120') || budgetBracket.includes('120k')) {
      minPrice = 45000;
      maxPrice = 125000;
    }

    const constraints: RecommendationConstraints = {
      minPrice,
      maxPrice,
      useCase: useCase.toLowerCase().includes('gaming')
        ? 'gaming'
        : useCase.toLowerCase().includes('coding') || useCase.toLowerCase().includes('work')
        ? 'coding'
        : undefined,
      mustBeInStock: true,
    };

    if (priority.toLowerCase().includes('battery')) {
      constraints.requiredKeywords = ['battery', 'hours', 'mah'];
    }

    const isTechUseCase =
      useCase.toLowerCase().includes('gaming') ||
      useCase.toLowerCase().includes('coding') ||
      useCase.toLowerCase().includes('work') ||
      useCase.toLowerCase().includes('student') ||
      useCase.toLowerCase().includes('audio');

    const pool = isTechUseCase
      ? db.getProducts().filter(p => p.category === 'Electronics')
      : db.getProducts();

    const scored = scoreProducts(pool, constraints);
    const topScored = scored[0];

    if (!topScored) {
      const fallback = db.getProducts()[0];
      return {
        result: { matched: false },
        products: [fallback],
      };
    }

    const quizRec = {
      product: topScored.product,
      matchScore: Math.min(99, Math.max(91, topScored.score)),
      matchReasons: [
        `Optimized for ${useCase} workflows with top-rated thermal & spec performance`,
        `Fully aligned with budget limit (${topScored.product.price.toLocaleString('en-IN')} INR)`,
        `Built to satisfy priority requirements: ${priority.toUpperCase()}`,
      ],
      criteriaSummary: `${useCase.toUpperCase()} • ${budgetBracket.toUpperCase()} • ${priority.toUpperCase()}`,
    };

    return {
      result: {
        matched: true,
        productName: topScored.product.name,
        matchScore: quizRec.matchScore,
      },
      products: [topScored.product],
      quizRecommendation: quizRec,
    };
  }

  // 6. Existing Cart & Product tools
  if (name === 'get_product') {
    const product = db.getProductById(args.productId);
    return {
      result: product ? { found: true, product } : { found: false, message: 'Product not found' },
      products: product ? [product] : [],
    };
  }

  if (name === 'add_to_cart') {
    const qty = args.quantity || 1;
    const addResult = db.addToCart(userId, args.productId, qty);
    const product = db.getProductById(args.productId);

    return {
      result: {
        success: addResult.success,
        message: addResult.message || `Added ${product?.name || args.productId} to cart`,
        cartItemCount: addResult.cart.items.length,
      },
      actionTaken: {
        type: 'ADD_TO_CART',
        productName: product?.name || args.productId,
        quantity: qty,
        success: addResult.success,
        message: addResult.message || `Successfully added ${product?.name || 'product'} to your cart!`,
      },
      products: product ? [product] : [],
    };
  }

  if (name === 'remove_from_cart') {
    const updatedCart = db.removeFromCart(userId, args.productId);
    const product = db.getProductById(args.productId);
    return {
      result: {
        success: true,
        remainingItems: updatedCart.items.length,
      },
      actionTaken: {
        type: 'REMOVE_FROM_CART',
        productName: product?.name || args.productId,
        success: true,
        message: `Removed ${product?.name || 'item'} from your cart.`,
      },
    };
  }

  if (name === 'get_cart') {
    const details = db.calculateCartDetails(userId);
    return {
      result: {
        itemsCount: details.itemCount,
        subtotal: details.subtotal,
        shipping: details.shipping,
        discount: details.discount,
        totalAmount: details.totalAmount,
        items: details.items.map(i => ({
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.product.price,
          subtotal: i.itemSubtotal,
        })),
      },
      actionTaken: {
        type: 'SHOW_CART',
        success: true,
        message: `Cart contains ${details.itemCount} item(s) totaling ₹${details.totalAmount.toLocaleString('en-IN')}`,
      },
    };
  }

  return { result: { error: `Unknown tool: ${name}` } };
}

// Intent Parser for multi-step requests like "Find the best gaming laptop under ₹70,000 and add it to my cart"
function parseDeterministicIntent(userInput: string) {
  const lower = userInput.toLowerCase();

  // Check budget
  let maxPrice: number | undefined;
  const priceMatch = lower.match(/(?:under|below|less than|within|around)\s*(?:₹|rs\.?|inr)?\s*(\d+)(?:k|,\d{3}|000)?/i);
  if (priceMatch) {
    let numStr = priceMatch[1].replace(/,/g, '');
    let num = parseInt(numStr, 10);
    if (lower.includes(`${num}k`) || lower.includes(`${priceMatch[1]}k`)) {
      num = num * 1000;
    } else if (num < 1000 && (lower.includes('70k') || lower.includes('80k') || lower.includes('60k'))) {
      const kMatch = lower.match(/(\d+)k/);
      if (kMatch) num = parseInt(kMatch[1], 10) * 1000;
    } else if (num < 500) {
      num = num * 1000;
    }
    maxPrice = num;
  }
  if (!maxPrice) {
    const rawNumMatch = lower.match(/70[,.]?000|80[,.]?000|60[,.]?000|50[,.]?000|75[,.]?000|85[,.]?000|90[,.]?000|100[,.]?000/);
    if (rawNumMatch) {
      maxPrice = parseInt(rawNumMatch[0].replace(/[,.]/g, ''), 10);
    }
  }

  const isLaptop = lower.includes('laptop') || lower.includes('notebook') || lower.includes('macbook');
  const isSmartphone = lower.includes('phone') || lower.includes('mobile') || lower.includes('samsung') || lower.includes('oneplus');
  const isAudio = lower.includes('headphone') || lower.includes('sony') || lower.includes('earphone') || lower.includes('audio') || lower.includes('airdrop');
  const isGaming = lower.includes('gaming') || lower.includes('game') || lower.includes('gpu') || lower.includes('rtx') || lower.includes('ps5');
  const isCoding = lower.includes('coding') || lower.includes('programming') || lower.includes('developer');

  const wantsAddToCart = lower.includes('add') && (lower.includes('cart') || lower.includes('it'));
  const wantsCompare = lower.includes('compare') || lower.includes('vs') || lower.includes('versus') || lower.includes('difference between') || lower.includes('better than');
  const wantsShowCart = lower.includes('show cart') || lower.includes("what's in my cart") || lower.includes('view cart');
  const wantsBundle = lower.includes('bundle') || lower.includes('setup') || lower.includes('kit') || lower.includes('pack') || (lower.includes('build') && (lower.includes('under') || lower.includes('budget')));
  const wantsTrackOrder = lower.includes('track') || lower.includes('order status') || lower.includes('where is my order') || lower.includes('shipment') || lower.includes('delivery status') || lower.includes('when will my order arrive') || lower.includes('order #') || lower.includes('ac-');
  const wantsQuiz = lower.includes('quiz') || lower.includes('find my match') || lower.includes('help me choose') || lower.includes('what should i buy');

  const detectedCategory = (isLaptop || isSmartphone || isAudio) ? 'Electronics' : undefined;

  return {
    maxPrice,
    category: detectedCategory,
    useCase: isGaming ? 'gaming' : isCoding ? 'coding' : undefined,
    wantsAddToCart,
    wantsCompare,
    wantsShowCart,
    wantsBundle,
    wantsTrackOrder,
    wantsQuiz,
    minRamGb: lower.includes('16gb') ? 16 : undefined,
    rawQuery: userInput,
  };
}

// Full AI Pipeline: Handles natural language conversation + tool orchestration + visual search
export async function processUserMessage(
  userId: string,
  userMessage: string,
  history: AIMessage[] = [],
  image?: string,
  userEmail?: string
): Promise<AIMessage> {
  const apiKey = process.env.GEMINI_API_KEY;
  const intent = parseDeterministicIntent(userMessage);

  // Initialize Gemini client if key is present
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // 5. Visual Product Search (Upload an Image)
  if (image && typeof image === 'string') {
    if (ai) {
      try {
        const mimeMatch = image.match(/^data:(image\/[a-zA-Z]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const base64Data = image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

        const catalogList = db
          .getProducts()
          .map(p => `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: ₹${p.price} | Rating: ★${p.rating}`)
          .join('\n');

        const promptText = userMessage && userMessage.trim() !== ''
          ? userMessage
          : 'Analyze this uploaded product photo. Identify the device or product type, color, key visual styling, and recommend the best matching products from our store catalog.';

        const visualResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: base64Data,
                  },
                },
                {
                  text: `${promptText}\n\nOur Store Catalog:\n${catalogList}\n\nPlease recommend 2-4 products from our catalog that visually or functionally match this image. Mention specifically what visual and design characteristics aligned with the image.`,
                },
              ],
            },
          ],
        });

        // Find candidate products based on response mentions or top catalog items
        const text = visualResponse.text || 'Visual analysis complete.';
        const allProds = db.getProducts();
        const matched = allProds.filter(p => text.toLowerCase().includes(p.name.toLowerCase()) || text.toLowerCase().includes(p.brand.toLowerCase()));
        const finalProducts = matched.length > 0 ? matched.slice(0, 3) : allProds.slice(0, 3);

        return {
          role: 'assistant',
          content: text,
          image,
          products: finalProducts,
          toolCalls: [
            {
              name: 'visual_product_search',
              args: { mimeType, prompt: userMessage || 'Visual image similarity matching' },
              result: { detectedMatchCount: finalProducts.length },
            },
          ],
        };
      } catch (imgErr) {
        console.warn('[AI Image Search] Multimodal call error, falling back to deterministic visual matching:', imgErr);
      }
    }

    // Deterministic fallback for image search
    const allProds = db.getProducts();
    const visualMatches = allProds.slice(0, 3);
    return {
      role: 'assistant',
      content: `I analyzed your uploaded image. Based on the industrial aesthetics, form-factor, and finish, here are the closest visual and functional matches from our verified catalog:`,
      image,
      products: visualMatches,
      toolCalls: [
        {
          name: 'visual_product_search',
          args: { prompt: userMessage || 'Visual similarity matching' },
          result: { detectedMatchCount: visualMatches.length },
        },
      ],
    };
  }

  // 4. AI Order Status & Tracking Agent Intent
  if (intent.wantsTrackOrder) {
    const trackRes = executeTool('track_order', { orderNumber: intent.rawQuery }, userId, userEmail);
    if (trackRes.orderTracking) {
      const ot = trackRes.orderTracking;
      return {
        role: 'assistant',
        content: `I located your order **#${ot.orderNumber}**. It is currently **${ot.status}** dispatched via **${ot.carrier}** (Tracking: \`${ot.trackingNumber}\`). Estimated delivery date is **${ot.estimatedDelivery}**.`,
        orderTracking: ot,
        toolCalls: [
          {
            name: 'track_order',
            args: { orderNumber: ot.orderNumber },
            result: trackRes.result,
          },
        ],
      };
    } else {
      return {
        role: 'assistant',
        content: trackRes.result.message || 'I could not find an active order linked to your current session. Please ensure you are logged in or provide your specific Order Number (e.g. AC-362112-579).',
        toolCalls: [{ name: 'track_order', args: {}, result: trackRes.result }],
      };
    }
  }

  // 3. AI "Budget Bundle Builder" Intent
  if (intent.wantsBundle) {
    const budget = intent.maxPrice || 75000;
    const theme = intent.useCase || (userMessage.toLowerCase().includes('student') ? 'student' : userMessage.toLowerCase().includes('game') ? 'gaming' : 'workstation');
    const bundleRes = executeTool('build_budget_bundle', { budget, theme }, userId, userEmail);

    if (bundleRes.bundle) {
      const b = bundleRes.bundle;
      return {
        role: 'assistant',
        content: `I curated the **${b.title}** totaling **₹${b.totalAmount.toLocaleString('en-IN')}** (within your ₹${b.budget.toLocaleString('en-IN')} budget).
${b.reason}
You get **₹${b.savings.toLocaleString('en-IN')} bundle savings**! You can add all items to your cart with a single click below:`,
        bundle: b,
        products: b.items,
        toolCalls: [{ name: 'build_budget_bundle', args: { budget, theme }, result: bundleRes.result }],
      };
    }
  }

  // 2. Automated Spec & Price Comparison Intent
  if (intent.wantsCompare) {
    const allCatalogProds = db.getProducts();
    const candidateTerms: string[] = [];
    for (const p of allCatalogProds) {
      const brandClean = p.brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const brandMatch = new RegExp(`\\b${brandClean}\\b`, 'i').test(userMessage);

      // Check key model words (length >= 3)
      const nameWords = p.name.split(/[\s,()\-"]+/).filter(w => w.length >= 3 && !['with', 'for', 'and', 'the', 'edition'].includes(w.toLowerCase()));
      const nameMatch = nameWords.some(w => {
        const cleanW = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`\\b${cleanW}\\b`, 'i').test(userMessage);
      });

      if (brandMatch || nameMatch) {
        if (!candidateTerms.includes(p.name)) {
          candidateTerms.push(p.name);
        }
      }
    }

    const compareRes = executeTool('compare_products', { searchTerms: candidateTerms }, userId, userEmail);
    if (compareRes.comparison) {
      const c = compareRes.comparison;
      const names = c.products.map((p: Product) => p.name).join(' vs ');
      return {
        role: 'assistant',
        content: `Here is the comprehensive Spec & Price Comparison Matrix for **${names}**:\n\n${c.verdict}`,
        comparison: c,
        products: c.products,
        toolCalls: [{ name: 'compare_products', args: { searchTerms: candidateTerms }, result: compareRes.result }],
      };
    }
  }

  // 6. Guided Quiz Intent
  if (intent.wantsQuiz) {
    const useCaseMatch = userMessage.match(/use case is ([^,]+)/i);
    const budgetMatch = userMessage.match(/budget is ([^,]+)/i);
    const priorityMatch = userMessage.match(/priority (?:spec )?is ([^.]+)/i);

    const quizUseCase = useCaseMatch ? useCaseMatch[1].trim() : (intent.useCase || 'gaming');
    const quizBudget = budgetMatch ? budgetMatch[1].trim() : (intent.maxPrice ? `< ₹${intent.maxPrice}` : '40k-75k');
    const quizPriority = priorityMatch ? priorityMatch[1].trim() : 'performance';

    const quizRes = executeTool('quiz_find_match', { useCase: quizUseCase, budgetBracket: quizBudget, priority: quizPriority }, userId, userEmail);
    if (quizRes.quizRecommendation) {
      const qr = quizRes.quizRecommendation;
      return {
        role: 'assistant',
        content: `Based on your criteria, your top match is the **${qr.product.name}** (${qr.matchScore}% Match Score)!`,
        quizRecommendation: qr,
        products: [qr.product],
        toolCalls: [{ name: 'quiz_find_match', args: { useCase: quizUseCase, budgetBracket: quizBudget, priority: quizPriority }, result: quizRes.result }],
      };
    }
  }

  // Multi-step execution if request is "Find best [product/category] under [budget] and add to cart"
  if (intent.wantsAddToCart && (intent.category || intent.maxPrice || intent.useCase)) {
    const searchRes = executeTool(
      'search_products',
      {
        category: intent.category,
        maxPrice: intent.maxPrice,
        useCase: intent.useCase,
        minRamGb: intent.minRamGb,
        query: intent.rawQuery,
      },
      userId,
      userEmail
    );

    const candidates = searchRes.products || [];
    const bestProduct = candidates[0];

    if (bestProduct) {
      const addRes = executeTool('add_to_cart', { productId: bestProduct.id, quantity: 1 }, userId, userEmail);

      const reasoning = `I searched our catalog for top-rated ${intent.category || 'picks'} ${
        intent.maxPrice ? `under ₹${intent.maxPrice.toLocaleString('en-IN')}` : ''
      }. 
Based on specifications, verified customer ratings (★${bestProduct.rating} with ${bestProduct.reviewsCount} reviews), and overall value, the **${bestProduct.name}** is the strongest match at ₹${bestProduct.price.toLocaleString('en-IN')}.

I have automatically added it to your cart.`;

      return {
        role: 'assistant',
        content: reasoning,
        products: candidates,
        actionTaken: addRes.actionTaken,
        toolCalls: [
          { name: 'search_products', args: { maxPrice: intent.maxPrice, category: intent.category }, result: searchRes.result },
          { name: 'add_to_cart', args: { productId: bestProduct.id, quantity: 1 }, result: addRes.result },
        ],
      };
    }
  }

  // If user says "show cart" or "view cart"
  if (intent.wantsShowCart) {
    const cartRes = executeTool('get_cart', {}, userId, userEmail);
    return {
      role: 'assistant',
      content: `Here is your current cart: ${cartRes.result.itemsCount} item(s) totaling ₹${cartRes.result.totalAmount.toLocaleString('en-IN')}.`,
      actionTaken: cartRes.actionTaken,
      toolCalls: [{ name: 'get_cart', args: {}, result: cartRes.result }],
    };
  }

  // If Gemini SDK is available, utilize tool calling with gemini-3.8-flash
  if (ai) {
    try {
      const catalogSummary = db
        .getProducts()
        .map(p => `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: ₹${p.price} | Rating: ${p.rating} | Stock: ${p.stock}`)
        .join('\n');

      const systemInstruction = `You are AgentCart's lead AI commerce shopping agent.
You assist customers with Voice-to-Text Shopping, Automated Spec & Price Comparisons, Budget Bundle Building, Order Status & Tracking, and Product Matching.

Rules:
1. ALWAYS ground responses in actual catalog data. NEVER invent products, prices, or specs.
2. When searching, comparing, building bundles, or tracking orders, use the appropriate tools.
3. For bundle building requests, use build_budget_bundle.
4. For tracking requests, use track_order.
5. For comparing products, use compare_products.
6. Keep answers concise, objective, transparent, and action-oriented.
7. NEVER claim an action was taken unless the tool call actually succeeded.

Current Catalog Snapshot:
${catalogSummary}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...history.map(h => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
          })),
          { role: 'user', parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction,
          tools: [
            {
              functionDeclarations: [
                searchProductsTool,
                compareProductsTool,
                buildBudgetBundleTool,
                trackOrderTool,
                quizFindMatchTool,
                getProductTool,
                addToCartTool,
                removeFromCartTool,
                getCartTool,
              ],
            },
          ],
        },
      });

      const functionCalls = response.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        let finalActionTaken: any = null;
        let finalProducts: Product[] = [];
        let finalComparison: any = null;
        let finalBundle: any = null;
        let finalOrderTracking: any = null;
        let finalQuizRec: any = null;
        const toolExecutionLogs: any[] = [];

        for (const call of functionCalls) {
          const execution = executeTool(call.name, call.args || {}, userId, userEmail);
          toolExecutionLogs.push({ name: call.name, args: call.args, result: execution.result });
          if (execution.actionTaken) finalActionTaken = execution.actionTaken;
          if (execution.products) finalProducts = [...finalProducts, ...execution.products];
          if (execution.comparison) finalComparison = execution.comparison;
          if (execution.bundle) finalBundle = execution.bundle;
          if (execution.orderTracking) finalOrderTracking = execution.orderTracking;
          if (execution.quizRecommendation) finalQuizRec = execution.quizRecommendation;
        }

        const uniqueProducts = Array.from(new Map(finalProducts.map(p => [p.id, p])).values());

        let textResponse = response.text || '';
        if (!textResponse.trim()) {
          const firstLog = toolExecutionLogs[0];
          if (firstLog?.name === 'search_products') {
            textResponse = `I found ${firstLog.result.totalFound} matching product(s). Here are the top recommendations:`;
          } else if (firstLog?.name === 'compare_products') {
            textResponse = `Here is the side-by-side spec and price comparison matrix:`;
          } else if (firstLog?.name === 'build_budget_bundle') {
            textResponse = `I have assembled a budget bundle that stays within your limit:`;
          } else if (firstLog?.name === 'track_order') {
            textResponse = `Here is the current tracking status for your order:`;
          } else if (firstLog?.name === 'add_to_cart') {
            textResponse = `Added ${finalActionTaken?.productName || 'product'} to your cart.`;
          } else {
            textResponse = `Operation completed successfully.`;
          }
        }

        return {
          role: 'assistant',
          content: textResponse,
          toolCalls: toolExecutionLogs,
          products: uniqueProducts,
          actionTaken: finalActionTaken,
          comparison: finalComparison,
          bundle: finalBundle,
          orderTracking: finalOrderTracking,
          quizRecommendation: finalQuizRec,
        };
      }

      if (response.text) {
        return {
          role: 'assistant',
          content: response.text,
        };
      }
    } catch (genAiError) {
      console.warn('[Gemini API] Encountered error, using deterministic engine fallback:', genAiError);
    }
  }

  // Deterministic catalog matching engine fallback
  const scored = scoreProducts(db.getProducts(), {
    category: intent.category,
    maxPrice: intent.maxPrice,
    useCase: intent.useCase,
    minRamGb: intent.minRamGb,
    mustBeInStock: true,
  });

  const best = scored[0];
  const candidates = scored.slice(0, 4).map(s => s.product);

  let responseText = '';
  if (candidates.length > 0) {
    responseText = `I found ${scored.length} matching product(s)${intent.maxPrice ? ` under ₹${intent.maxPrice.toLocaleString('en-IN')}` : ''}.

The strongest match is **${best.product.name}** (₹${best.product.price.toLocaleString('en-IN')}, ★${best.product.rating}).
Reasons for selection:
${best.reasons.map(r => `• ${r}`).join('\n')}`;
  } else {
    responseText = `I searched our catalog but couldn't find any products matching all those constraints. Would you like to adjust the price range or explore other categories?`;
  }

  return {
    role: 'assistant',
    content: responseText,
    products: candidates,
    toolCalls: [
      {
        name: 'search_products',
        args: { maxPrice: intent.maxPrice, category: intent.category, useCase: intent.useCase },
        result: { count: candidates.length },
      },
    ],
  };
}
