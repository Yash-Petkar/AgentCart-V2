import { Product } from './db';

export interface RecommendationConstraints {
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  brand?: string;
  useCase?: string; // 'gaming' | 'coding' | 'student' | 'battery life' | 'productivity' | 'general'
  minRamGb?: number;
  minStorageGb?: number;
  minRating?: number;
  requiredKeywords?: string[];
  mustBeInStock?: boolean;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  breakdown: {
    priceFitScore: number;
    ratingScore: number;
    specScore: number;
    useCaseScore: number;
    availabilityScore: number;
  };
  reasons: string[];
}

export interface RecommendationConfig {
  priceWeight: number;       // default 0.25
  ratingWeight: number;      // default 0.20
  specWeight: number;        // default 0.25
  useCaseWeight: number;     // default 0.20
  availabilityWeight: number;// default 0.10
}

const DEFAULT_CONFIG: RecommendationConfig = {
  priceWeight: 0.25,
  ratingWeight: 0.20,
  specWeight: 0.25,
  useCaseWeight: 0.20,
  availabilityWeight: 0.10,
};

export function scoreProducts(
  products: Product[],
  constraints: RecommendationConstraints,
  config: RecommendationConfig = DEFAULT_CONFIG
): ScoredProduct[] {
  const scoredList: ScoredProduct[] = [];

  for (const product of products) {
    // Hard constraint filters
    if (constraints.mustBeInStock && product.stock <= 0) {
      continue;
    }
    if (constraints.category && product.category.toLowerCase() !== constraints.category.toLowerCase()) {
      // If constraint is 'laptop' or 'laptops' or a tag like 'skincare', 'coffee', 'perfume'
      const normCat = constraints.category.toLowerCase().replace(/s$/, '');
      const prodCat = product.category.toLowerCase().replace(/s$/, '');
      const tagMatch = product.tags.some(t => t.toLowerCase().includes(normCat) || normCat.includes(t.toLowerCase()));
      if (normCat !== prodCat && !tagMatch) continue;
    }
    if (constraints.minPrice && product.price < constraints.minPrice) {
      continue;
    }
    if (constraints.maxPrice && product.price > constraints.maxPrice) {
      continue;
    }
    if (constraints.brand && product.brand.toLowerCase() !== constraints.brand.toLowerCase()) {
      continue;
    }

    const allSpecsText = `${product.name} ${product.description} ${product.brand} ${product.category} ${JSON.stringify(product.specs)} ${product.tags.join(' ')}`.toLowerCase();

    if (constraints.requiredKeywords && constraints.requiredKeywords.length > 0) {
      const hasAny = constraints.requiredKeywords.some(k => allSpecsText.includes(k.toLowerCase()));
      if (!hasAny) continue;
    }

    const reasons: string[] = [];

    // 1. Price Fit Score (0 - 100)
    // Closest to the budget ceiling without exceeding it gives higher value-for-money utilization,
    // or if maxPrice given, optimal sweet spot around 85-95% of maxPrice.
    let priceFit = 70;
    if (constraints.maxPrice) {
      const ratio = product.price / constraints.maxPrice;
      if (ratio <= 1.0) {
        priceFit = 60 + Math.round(ratio * 40); // 60 to 100
        reasons.push(`Within target budget (₹${product.price.toLocaleString('en-IN')} / ₹${constraints.maxPrice.toLocaleString('en-IN')})`);
      }
    } else {
      priceFit = 80;
    }

    // 2. Rating Score (0 - 100)
    // Rating out of 5.0 scaled to 100 + volume of reviews booster
    const normalizedRating = Math.min(100, Math.round((product.rating / 5.0) * 100));
    const reviewsBoost = Math.min(10, Math.round(Math.log10(product.reviewsCount + 1) * 3));
    const ratingScore = Math.min(100, normalizedRating + reviewsBoost);
    reasons.push(`High customer satisfaction: ★${product.rating} (${product.reviewsCount} reviews)`);

    // 3. Specification Score (0 - 100)
    let specScore = 60;

    if (constraints.minRamGb) {
      const ramMatch = allSpecsText.match(/(\d+)\s*gb\s*(ddr\d|ram|unified)?/);
      if (ramMatch) {
        const foundRam = parseInt(ramMatch[1], 10);
        if (foundRam >= constraints.minRamGb) {
          specScore += 20;
          reasons.push(`Meets RAM requirement: ${foundRam}GB DDR5/Unified Memory`);
        } else {
          specScore -= 30;
        }
      }
    } else {
      if (allSpecsText.includes('16gb') || allSpecsText.includes('32gb')) {
        specScore += 15;
        reasons.push('Equipped with generous 16GB+ RAM');
      }
    }

    if (allSpecsText.includes('rtx 40') || allSpecsText.includes('m2') || allSpecsText.includes('gen 2')) {
      specScore += 15;
      reasons.push('Current-generation high performance processor/GPU');
    }

    specScore = Math.min(100, Math.max(0, specScore));

    // 4. Use Case Score (0 - 100)
    let useCaseScore = 50;
    if (constraints.useCase) {
      const uc = constraints.useCase.toLowerCase();
      if (uc.includes('gaming')) {
        if (allSpecsText.includes('rtx') || allSpecsText.includes('gaming') || allSpecsText.includes('144hz')) {
          useCaseScore = 95;
          reasons.push('Optimized for high-FPS competitive gaming with dedicated GPU & high-refresh panel');
        } else {
          useCaseScore = 20;
        }
      } else if (uc.includes('coding') || uc.includes('programming') || uc.includes('developer')) {
        if (allSpecsText.includes('i5') || allSpecsText.includes('ryzen') || allSpecsText.includes('m2') || allSpecsText.includes('16gb')) {
          useCaseScore = 90;
          reasons.push('Ideal compilation performance and multi-tasking headroom for software development');
        }
      } else if (uc.includes('battery') || uc.includes('travel') || uc.includes('lightweight')) {
        if (allSpecsText.includes('macbook') || allSpecsText.includes('1.2') || allSpecsText.includes('18 hours')) {
          useCaseScore = 98;
          reasons.push('Exceptional battery endurance and featherlight portability');
        }
      }
    } else {
      useCaseScore = 75;
    }

    // 5. Availability Score (0 - 100)
    let availabilityScore = 100;
    if (product.stock <= 0) {
      availabilityScore = 0;
    } else if (product.stock <= 3) {
      availabilityScore = 50;
      reasons.push('Low stock warning (under 3 units left)');
    } else {
      availabilityScore = 100;
      reasons.push('Readily in stock for immediate dispatch');
    }

    // Weighted Overall Score
    const totalScore = Math.round(
      priceFit * config.priceWeight +
      ratingScore * config.ratingWeight +
      specScore * config.specWeight +
      useCaseScore * config.useCaseWeight +
      availabilityScore * config.availabilityWeight
    );

    scoredList.push({
      product,
      score: totalScore,
      breakdown: {
        priceFitScore: priceFit,
        ratingScore,
        specScore,
        useCaseScore,
        availabilityScore
      },
      reasons: reasons.slice(0, 4)
    });
  }

  // Sort descending by score
  return scoredList.sort((a, b) => b.score - a.score);
}

// Side-by-side comparison generator
export function generateComparisonMatrix(products: Product[]) {
  const commonKeys = ['Price', 'Brand', 'Rating', 'Stock', 'Processor', 'RAM', 'Storage', 'Graphics', 'Display'];
  const matrix = commonKeys.map(key => {
    const values: Record<string, string> = {};
    for (const p of products) {
      if (key === 'Price') {
        values[p.id] = `₹${p.price.toLocaleString('en-IN')}`;
      } else if (key === 'Brand') {
        values[p.id] = p.brand;
      } else if (key === 'Rating') {
        values[p.id] = `★ ${p.rating} (${p.reviewsCount})`;
      } else if (key === 'Stock') {
        values[p.id] = p.stock > 0 ? `${p.stock} available` : 'Out of Stock';
      } else {
        values[p.id] = p.specs[key] || 'N/A';
      }
    }
    return { attribute: key, values };
  });

  return matrix;
}
