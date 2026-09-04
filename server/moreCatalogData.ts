import type { Product } from './db';

// ============================================================
// 4. KITCHEN & DINING (6 PRODUCTS)
// ============================================================
export const kitchenProducts: Product[] = [
  {
    id: 'prod_kitchen_fellow_stagg',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'Fellow Stagg EKG Precision Electric Pour-Over Kettle (1200W Rapid Boil, PID Temperature Control, LCD Stopwatch, Matte Black, 0.9L)',
    brand: 'Fellow',
    category: 'Kitchen & Dining',
    description: 'The premier kettle for specialty coffee and artisanal tea. Features variable degree-by-degree temperature control (135°F to 212°F), a precision gooseneck spout for controlled flow rate, and a minimalist weighted counterbalanced handle.',
    price: 13990,
    originalPrice: 16990,
    discount: 18,
    stock: 24,
    rating: 4.8,
    reviewsCount: 840,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '2 Years Fellow Manufacturer Warranty',
    aboutItem: [
      'Precision Gooseneck Spout: Engineered fluted tip provides an optimal, drip-free pour rate for pour-over coffee extractions.',
      'PID Temperature Controller: Holds your exact desired temperature with precision down to a single degree for up to 60 minutes.',
      'Brew Stopwatch & Screen: Built-in high-contrast LCD displays set point and real-time brew stopwatch to track pour timings.',
      '1200W Ultra-Fast Heating: High-efficiency heating element brings a full 0.9L kettle to boil in under 3.5 minutes.',
      'Counterbalanced Wooden Feel Grip: Ergonomic weighted handle shifts center of mass closer to hand for effortless slow pours.'
    ],
    specs: {
      'Brand': 'Fellow',
      'Model Name': 'Stagg EKG Electric Pour-Over',
      'Capacity': '0.9 Liters (30 oz)',
      'Material': '304 18/8 Stainless Steel Body & Lid',
      'Wattage': '1200 Watts (220V/50Hz)',
      'Temperature Range': '57°C - 100°C (135°F - 212°F)',
      'Dimensions': '29.2 x 17.1 x 20.3 cm'
    },
    tags: ['kitchen', 'coffee', 'kettle', 'pour-over', 'fellow', 'barista', 'tea', 'appliances'],
    isFeatured: true,
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date('2026-02-01').toISOString()
  },
  {
    id: 'prod_kitchen_delonghi_dedica',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'De\'Longhi Dedica Deluxe 15-Bar Manual Pump Espresso & Cappuccino Machine (Ultra-Slim 6" Profile, Stainless Steel, Manual Milk Frother)',
    brand: 'De\'Longhi',
    category: 'Kitchen & Dining',
    description: 'Brew cafe-grade rich espresso, velvety lattes, and frothy cappuccinos at home. Features 15-bar professional pressure, rapid thermoblock heating in 40 seconds, dual-drip tray for travel mugs, and full stainless steel housing.',
    price: 19990,
    originalPrice: 24990,
    discount: 20,
    stock: 18,
    rating: 4.7,
    reviewsCount: 1120,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Amazon\'s Choice',
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '2 Years De\'Longhi India Official Warranty',
    aboutItem: [
      '15-Bar Professional Italian Pump: Delivers optimal extraction pressure for thick, golden hazelnut crema and intense espresso aroma.',
      'Ultra-Slim 6-Inch Space-Saving Width: Compact architectural footprint fits neatly under low cabinets and small apartment counters.',
      'Advanced Manual Cappuccino Wand: Swiveling stainless steam frother mixes steam and milk to create microfoam for latte art.',
      'Thermoblock Fast Heating: Reach optimal brewing temperature in under 40 seconds with auto-standby power conservation.',
      'Customizable Single or Double Shots: Three-in-one professional filter holder accommodates single shot, double shot, or ESE pods.'
    ],
    specs: {
      'Brand': 'De\'Longhi',
      'Model Name': 'Dedica Deluxe EC685.M',
      'Pump Pressure': '15 Bar High Pressure',
      'Water Tank Capacity': '1.1 Liters Removable Basin',
      'Body Material': 'Full Brushed Stainless Steel',
      'Dimensions': '33 x 14.9 x 30.5 cm (Slim 6" Width)',
      'Weight': '4.2 kg'
    },
    tags: ['kitchen', 'espresso', 'coffee machine', 'cappuccino', 'delonghi', 'latte', 'barista', 'appliances'],
    isFeatured: true,
    createdAt: new Date('2026-02-02').toISOString(),
    updatedAt: new Date('2026-02-02').toISOString()
  },
  {
    id: 'prod_kitchen_le_creuset_dutch_oven',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'Le Creuset Signature Enameled Cast Iron Round Dutch Oven (5.5 Qt / 26cm, Volcanic Flame Orange, Oven Safe to 500°F)',
    brand: 'Le Creuset',
    category: 'Kitchen & Dining',
    description: 'The gold standard of culinary cookware handcrafted in France since 1925. Renowned for superior heat retention, crack-resistant vibrant porcelain enamel, tight-fitting moisture-circulation lid, and 45% larger loop handles.',
    price: 26500,
    originalPrice: 33000,
    discount: 20,
    stock: 12,
    rating: 4.9,
    reviewsCount: 760,
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '400+ bought in past month',
    warranty: 'Lifetime Le Creuset International Warranty',
    aboutItem: [
      'Superior Cast Iron Thermal Mass: Distributes heat evenly without hot spots for slow braising, roasting, bread baking, and stews.',
      'Crack & Chip-Resistant Sand Enamel: Non-reactive interior enamel requires no seasoning, resists acid staining, and cleans effortlessly.',
      'Moisture-Locking Tight Dome Lid: Internal condensation rings continuously baste food, returning juices back onto roasts.',
      'Ergonomic Stainless Steel Knob: Solid stainless lid knob safe to any oven temperature up to 500°F (260°C).',
      'Compatible Across All Cooktops: Safe for induction, gas, electric, ceramic glass, halogen, and outdoor camp grills.'
    ],
    specs: {
      'Brand': 'Le Creuset',
      'Collection': 'Signature Round Dutch Oven',
      'Capacity': '5.5 Quarts (5.3 Liters / 26 cm Diameter)',
      'Material': 'Handcrafted Enameled Cast Iron (Made in France)',
      'Color': 'Volcanic Flame Orange',
      'Heat Resistance': 'Oven safe up to 500°F (260°C)',
      'Weight': '5.1 kg'
    },
    tags: ['kitchen', 'cookware', 'dutch oven', 'le creuset', 'cast iron', 'baking', 'gourmet', 'culinary'],
    isFeatured: true,
    createdAt: new Date('2026-02-03').toISOString(),
    updatedAt: new Date('2026-02-03').toISOString()
  },
  {
    id: 'prod_kitchen_yoshihiro_knife',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'Yoshihiro Damascus VG-10 67-Layer 8-Inch Japanese Chef\'s Gyuto Knife (Octagonal Rosewood Handle, Hand-Hammered Tsuchime, Saya Sheath)',
    brand: 'Yoshihiro',
    category: 'Kitchen & Dining',
    description: 'Handcrafted in Sakai, Japan by master swordsmiths. Features a high-carbon VG-10 steel cutting core hardened to 60-61 HRC clad in 66 layers of folded Damascus steel, hammered tsuchime texture to prevent sticking, and natural magnolia saya sheath.',
    price: 8499,
    originalPrice: 12999,
    discount: 35,
    stock: 22,
    rating: 4.9,
    reviewsCount: 540,
    images: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '800+ bought in past month',
    warranty: 'Lifetime Blade Steel & Craftsmanship Warranty',
    aboutItem: [
      'Japanese VG-10 Core (60-61 HRC): Razor-sharp 15° double bevel edge slices sashimi, vegetables, and proteins with effortless precision.',
      '67-Layer Hammered Damascus Cladding: Distinctive wavy Damascus pattern and hand-hammered tsuchime dimples eliminate food stickiness.',
      'Traditional Octagonal Rosewood Handle: Ergonomic Japanese wa-handle fits comfortably in either hand for tireless culinary prep.',
      'Handcrafted Magnolia Wood Saya Included: Protective wooden sheath with ebony pin shields blade edge during drawer storage.',
      'Versatile All-Purpose Gyuto Profile: Curved belly allows smooth rocking chops as well as precise push-cutting techniques.'
    ],
    specs: {
      'Brand': 'Yoshihiro Cutlery',
      'Blade Type': 'Gyuto (Japanese Multipurpose Chef Knife)',
      'Blade Length': '8 Inches (210 mm)',
      'Steel Type': 'VG-10 Core Clad in 66-Layer Stainless Damascus',
      'Hardness': '60-61 HRC (Rockwell Hardness Scale)',
      'Handle': 'Octagonal Solid Rosewood with Pakkawood Ferrule',
      'Origin': 'Handcrafted in Sakai, Japan'
    },
    tags: ['kitchen', 'knife', 'chef knife', 'damascus', 'japanese', 'cutlery', 'cooking', 'sharp'],
    isFeatured: false,
    createdAt: new Date('2026-02-04').toISOString(),
    updatedAt: new Date('2026-02-04').toISOString()
  },
  {
    id: 'prod_kitchen_philips_airfryer',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'Philips Digital Air Fryer XL with Rapid CombiAir Technology (6.2L Capacity, 14-in-1 Presets, NutriU App Guided Cooking, Black)',
    brand: 'Philips',
    category: 'Kitchen & Dining',
    description: 'Cook crispy, juicy meals using up to 90% less oil. Powered by Rapid CombiAir vortex airflow technology, featuring an oversized 6.2L family-sized basket, intuitive touchscreen with 14 smart presets, and dishwasher-safe QuickClean components.',
    price: 7999,
    originalPrice: 14999,
    discount: 47,
    stock: 30,
    rating: 4.6,
    reviewsCount: 1650,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '4K+ bought in past month',
    warranty: '2 Years Philips Comprehensive Warranty',
    aboutItem: [
      'Rapid CombiAir Dynamic Airflow: Automatically adjusts airflow speed from gentle dehydrate to intense high-speed crisping.',
      'Oversized 6.2L (1.2 kg) Basket: Roasts a whole 1.4 kg chicken or up to 5 servings of crispy golden fries in one batch.',
      '90% Less Fat Cooking: Patented starfish base drains excess oil while circulating superheated air for golden crunch.',
      '14-in-1 Cooking Versatility: Fry, roast, grill, bake, broil, dehydrate, toast, defrost, and reheat with a single tap.',
      'Dishwasher Safe QuickClean Basket: Removable non-stick mesh basket cleans in seconds under running water or in the dishwasher.'
    ],
    specs: {
      'Brand': 'Philips',
      'Model Name': 'Airfryer XL Series 5000',
      'Capacity': '6.2 Liters (1.2 kg Basket)',
      'Power Wattage': '2000 Watts',
      'Temperature Range': '40°C to 200°C',
      'Presets': '14 Pre-Programmed Smart Modes',
      'Dimensions': '40.3 x 31.5 x 30.7 cm'
    },
    tags: ['kitchen', 'air fryer', 'philips', 'appliances', 'healthy', 'cooking', 'crispy', 'fryer'],
    isFeatured: false,
    createdAt: new Date('2026-02-05').toISOString(),
    updatedAt: new Date('2026-02-05').toISOString()
  },
  {
    id: 'prod_kitchen_emile_henry_cloche',
    sellerId: 'user_seller_kitchen',
    sellerName: 'Chef\'s Atelier Supply',
    name: 'Emile Henry Artisan Ceramic Bread Cloche Dome Baker (High-Resistance French Ceramic, Crispy Crust Dome, Grand Cru Red)',
    brand: 'Emile Henry',
    category: 'Kitchen & Dining',
    description: 'Bake authentic European artisan sourdough boules with crackling blistered crusts and soft, airy crumb. Handcrafted from French Burgundy clay that mirrors the humidity and thermal conditions of traditional brick steam ovens.',
    price: 4299,
    originalPrice: 6999,
    discount: 39,
    stock: 20,
    rating: 4.8,
    reviewsCount: 380,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '500+ bought in past month',
    warranty: '10 Years Emile Henry Craftsmanship Guarantee',
    aboutItem: [
      'French Burgundy Refractory Clay: Traps natural dough steam inside the domed bell to produce a blistered, golden artisan crust.',
      'Sourdough Cloche Baker Dome: The bell lid fits snugly onto the ribbed grooved base, preventing dough from sticking without parchment.',
      'High Resistance (HR) Ceramic Glaze: Extremely scratch-proof glass enamel permits scoring dough directly in the baker with a razor lame.',
      'Thermal Shock Resistant (-20°C to 270°C): Moves directly from cold refrigerator proofing into a preheated 500°F oven.',
      'Easy Care & Dishwasher Safe: Non-porous interior enamel washes effortlessly by hand or safely inside home dishwashers.'
    ],
    specs: {
      'Brand': 'Emile Henry France',
      'Collection': 'Artisan Bread Cloche',
      'Diameter': '34 cm (13.4 inches / 28 cm baking area)',
      'Material': 'Natural Burgundy Flame Ceramic (Lead and Cadmium Free)',
      'Oven Safe': 'Up to 270°C (520°F)',
      'Origin': 'Marcigny, France'
    },
    tags: ['kitchen', 'baking', 'bread cloche', 'sourdough', 'ceramic', 'cookware', 'artisan', 'french'],
    isFeatured: false,
    createdAt: new Date('2026-02-06').toISOString(),
    updatedAt: new Date('2026-02-06').toISOString()
  }
];

// ============================================================
// 5. FITNESS & OUTDOORS (6 PRODUCTS)
// ============================================================
export const fitnessProducts: Product[] = [
  {
    id: 'prod_fit_bowflex_dumbbells',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Bowflex SelectTech 552 Rapid-Dial Adjustable Dumbbells Pair (Adjusts 2.5 to 24 kg per Dumbbell, Space-Saving Storage Cradles)',
    brand: 'Bowflex',
    category: 'Fitness & Outdoors',
    description: 'Replaces 15 pairs of traditional iron dumbbells. With a simple turn of the rapid mechanical selection dial, easily adjust resistance from 2.5 kg up to 24 kg (5 to 52.5 lbs) for squats, chest presses, bicep curls, and lunges.',
    price: 28990,
    originalPrice: 38990,
    discount: 26,
    stock: 14,
    rating: 4.8,
    reviewsCount: 1480,
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '3 Years Mechanical Mechanism Warranty',
    aboutItem: [
      'Replaces 15 Dumbbell Sets: Adjusts in 1.1 kg increments up to 11 kg, then 2.2 kg increments up to 24 kg per hand.',
      'Smooth Mechanical Turn-Dial: Precision mechanical gear clicks into place instantly without clattering weight plates.',
      'Durable Molding Over Metal Plates: Smooth thermoplastic coating protects gym flooring and eliminates metallic clanking noise.',
      'Ergonomic Textured Grip Handles: Contoured rubberized knurling ensures safe, slip-free grip during sweaty heavy sets.',
      'Heavy-Duty Storage Trays Included: Custom molded cradles keep unselected plates securely aligned and organized off the floor.'
    ],
    specs: {
      'Brand': 'Bowflex',
      'Model Name': 'SelectTech 552i',
      'Weight Range': '2.5 to 24 kg (5 to 52.5 lbs) per dumbbell',
      'Weight Increments': '15 Distinct Weight Settings',
      'Quantity': 'Pair of 2 Dumbbells with 2 Storage Cradles',
      'Dimensions': '43 x 21 x 23 cm each'
    },
    tags: ['fitness', 'dumbbells', 'strength training', 'home gym', 'bowflex', 'weights', 'workout'],
    isFeatured: true,
    createdAt: new Date('2026-02-07').toISOString(),
    updatedAt: new Date('2026-02-07').toISOString()
  },
  {
    id: 'prod_fit_garmin_forerunner_265',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Garmin Forerunner 265 GPS Running & Triathlon Smartwatch (1.3" AMOLED Touchscreen, Dual-Frequency SatIQ, Training Readiness)',
    brand: 'Garmin',
    category: 'Fitness & Outdoors',
    description: 'Train brilliantly with a colorful 1.3" AMOLED touchscreen, morning report with HRV status, SatIQ multi-band GPS accuracy, training readiness score, wrist-based running dynamics, and up to 13 days of battery life.',
    price: 42990,
    originalPrice: 49990,
    discount: 14,
    stock: 16,
    rating: 4.9,
    reviewsCount: 920,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '2 Years Garmin India Official Warranty',
    aboutItem: [
      '1.3" Ultra-Bright AMOLED Display: Vibrant high-resolution touchscreen paired with traditional 5-button athletic control.',
      'Training Readiness Score: Combines sleep score, recovery time, HRV status, and acute training load to indicate readiness.',
      'Multi-Band SatIQ GPS Technology: Pinpoint satellite tracking in dense forests and high-rise city marathon courses.',
      'Wrist-Based Running Dynamics: Measures cadence, stride length, ground contact time, and vertical oscillation without chest straps.',
      '13 Days Smartwatch Battery Life: Up to 20 hours continuous GPS tracking mode with music storage and Garmin Pay.'
    ],
    specs: {
      'Brand': 'Garmin',
      'Model Name': 'Forerunner 265',
      'Display': '1.3" AMOLED (416 x 416 pixels) with Corning Gorilla Glass 3',
      'Battery Life': 'Up to 13 Days (Smartwatch Mode) / 20 Hours (GPS)',
      'Water Rating': '5 ATM (50 Meters Submersion)',
      'Sensors': 'Garmin Elevate Gen 4 Optical HR, Pulse Ox, Compass, Barometer',
      'Weight': '47 Grams'
    },
    tags: ['fitness', 'smartwatch', 'garmin', 'running', 'gps', 'triathlon', 'outdoors', 'heart rate'],
    isFeatured: true,
    createdAt: new Date('2026-02-08').toISOString(),
    updatedAt: new Date('2026-02-08').toISOString()
  },
  {
    id: 'prod_fit_manduka_pro_mat',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Manduka PRO 6mm High-Density Professional Yoga Mat (Extra Long 71", Closed-Cell Hygienic Surface, Non-Slip Dot Pattern, Black Sage)',
    brand: 'Manduka',
    category: 'Fitness & Outdoors',
    description: 'The #1 mat recommended by yoga instructors and physical therapists worldwide. Engineered with 6mm ultra-dense cushioning to protect sensitive joints, a proprietary closed-cell barrier that locks out sweat, and an OEKO-TEX certified emission-free build.',
    price: 9499,
    originalPrice: 13999,
    discount: 32,
    stock: 28,
    rating: 4.8,
    reviewsCount: 1100,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Amazon\'s Choice',
    boughtInPastMonth: '2K+ bought in past month',
    warranty: 'Lifetime Manduka Wear & Tear Guarantee',
    aboutItem: [
      '6mm Ultra-Dense Joint Cushioning: Unsurpassed protection for knees, spine, hips, and elbows on hardwood and tile surfaces.',
      'Hygienic Closed-Cell Surface: Sweat and moisture never penetrate into the mat core, preventing bacterial buildup and foul odors.',
      'Proprietary Bottom Dot Grip: Textured circular bottom firmly grips floor surfaces to prevent slipping during vinyasa transitions.',
      'Textured Fabric-Like Top Finish: Medium grip surface improves with use, offering fluid transitions without sticky skin pull.',
      'Certified Non-Toxic & 100% Latex-Free: Manufactured in Germany with zero toxic emissions and 100% recyclable OEKO-TEX materials.'
    ],
    specs: {
      'Brand': 'Manduka',
      'Model Name': 'Manduka PRO Mat',
      'Dimensions': '180 cm L x 66 cm W x 6 mm Thick (71" x 26")',
      'Weight': '3.4 kg (Dense Heavyweight Mat)',
      'Material': 'High-Density Closed-Cell PVC (Latex-Free, 100% OEKO-TEX)',
      'Origin': 'Made in Germany'
    },
    tags: ['fitness', 'yoga', 'yoga mat', 'manduka', 'pilates', 'stretching', 'exercise', 'wellness'],
    isFeatured: false,
    createdAt: new Date('2026-02-09').toISOString(),
    updatedAt: new Date('2026-02-09').toISOString()
  },
  {
    id: 'prod_fit_osprey_atmos_backpack',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Osprey Atmos AG 65 Anti-Gravity Trekking & Mountaineering Backpack (Tensioned 3D Mesh Lumbar, Fit-on-the-Fly Hipbelt, 65L, Rainforest Green)',
    brand: 'Osprey',
    category: 'Fitness & Outdoors',
    description: 'Conquer multi-day mountain expeditions with Osprey award-winning Anti-Gravity suspension system. Features seamless continuous 3D mesh that suspends the load away from your back, integrated raincover, sleeping bag compartment, and trekking pole attachments.',
    price: 21500,
    originalPrice: 28000,
    discount: 23,
    stock: 15,
    rating: 4.9,
    reviewsCount: 420,
    images: [
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '350+ bought in past month',
    warranty: 'Osprey All Mighty Lifetime Repair Guarantee',
    aboutItem: [
      'AntiGravity (AG) 3D Suspension: Continuous tensioned mesh wraps seamlessly from the upper back through the lumbar and hipbelt.',
      'Fit-on-the-Fly Adjustable Hipbelt & Harness: Custom-tune torso length and hipbelt wings while wearing the pack on the trail.',
      'Integrated Waterproof Raincover: Deploys in seconds from a dedicated zippered bottom pocket to safeguard contents from torrential rain.',
      'Stow-on-the-Go Trekking Pole Attachment: Quickly stash trekking poles without needing to stop or unbuckle your backpack.',
      '65-Liter Expedition Volume: Includes dual side stretch mesh water bottle pockets, sleeping bag compartment, and removable floating lid.'
    ],
    specs: {
      'Brand': 'Osprey',
      'Model Name': 'Atmos AG 65',
      'Capacity': '65 Liters (Medium/Large Torso)',
      'Suspension': 'Anti-Gravity 3D Trampoline Mesh System',
      'Main Fabric': '210D High Tenacity Nylon DWR (100% Recycled)',
      'Dimensions': '88 x 39 x 36 cm',
      'Weight': '2.18 kg'
    },
    tags: ['fitness', 'outdoors', 'backpack', 'hiking', 'camping', 'osprey', 'travel', 'trekking'],
    isFeatured: true,
    createdAt: new Date('2026-02-10').toISOString(),
    updatedAt: new Date('2026-02-10').toISOString()
  },
  {
    id: 'prod_fit_hydro_flask_32',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Hydro Flask 32 oz Wide Mouth Vacuum Insulated Stainless Steel Bottle (TempShield Cold 24H, Leakproof Flex Straw Cap, Cobalt Blue)',
    brand: 'Hydro Flask',
    category: 'Fitness & Outdoors',
    description: 'Stay hydrated with ice-cold water on trails, gym sessions, and road trips. Features TempShield double-wall vacuum insulation keeping beverages ice-cold for 24 hours, pro-grade 18/8 stainless steel, and ergonomic leakproof straw lid.',
    price: 2899,
    originalPrice: 4499,
    discount: 36,
    stock: 45,
    rating: 4.7,
    reviewsCount: 1890,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '5K+ bought in past month',
    warranty: 'Hydro Flask Lifetime Limited Warranty',
    aboutItem: [
      'TempShield Double Wall Vacuum Insulation: Keeps beverages icy cold for 24 hours or steaming hot for 12 hours without sweating.',
      'Pro-Grade 18/8 Stainless Steel: Ensures pure taste without flavor transfer, metallic aftertaste, or oxidation over years of use.',
      'Leakproof Flex Straw Cap: Sip on the move effortlessly without unscrewing lids; completely leakproof when folded shut.',
      'Color Last Powder Coat Finish: Slip-free grip, condensation-free exterior, and durable powder coating withstands trail drops.',
      'BPA-Free & Phthalate-Free: Safe, non-toxic hydration compatible with most backcountry water filtration systems.'
    ],
    specs: {
      'Brand': 'Hydro Flask',
      'Capacity': '32 oz (946 ml Wide Mouth)',
      'Material': 'Pro-Grade 18/8 Stainless Steel & BPA-Free Polypropylene',
      'Insulation': 'TempShield Vacuum Double Wall',
      'Lid': 'Flex Straw Cap with Flexible Carry Strap',
      'Dishwasher Safe': 'Yes (Bottle and Cap)'
    },
    tags: ['fitness', 'water bottle', 'hydro flask', 'hydration', 'insulated', 'outdoors', 'travel', 'gym'],
    isFeatured: false,
    createdAt: new Date('2026-02-11').toISOString(),
    updatedAt: new Date('2026-02-11').toISOString()
  },
  {
    id: 'prod_fit_black_diamond_headlamp',
    sellerId: 'user_seller_fitness',
    sellerName: 'Apex Performance Gear',
    name: 'Black Diamond Storm 500-R Rechargeable Waterproof Headlamp (500 Lumens, Dual-Beam Optical Lens, Night Vision LEDs, IP67 Submersible)',
    brand: 'Black Diamond',
    category: 'Fitness & Outdoors',
    description: 'Engineered for technical climbing, trail running, and alpine trekking. Generates 500 lumens of optical clarity with dual-beam distance and proximity lenses, RGB night vision LEDs, PowerTap touch brightness switching, and micro-USB rechargeable battery.',
    price: 4750,
    originalPrice: 6500,
    discount: 27,
    stock: 30,
    rating: 4.8,
    reviewsCount: 610,
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Pick',
    boughtInPastMonth: '800+ bought in past month',
    warranty: '3 Years Black Diamond International Warranty',
    aboutItem: [
      '500 Lumens Max Output: Pierces darkness up to 120 meters with smooth, artifact-free optical facet lenses.',
      'PowerTap Instant Brightness: Tap the housing side with gloved hands to instantly transition between full output and dimmed beam.',
      'RGB Night Vision Lighting: Features dedicated red, green, and blue LEDs to preserve dark-adapted vision and read maps.',
      'IP67 Submersible Waterproof: Operates submerged up to 1 meter underwater for 30 minutes; dust-tight sealed chassis.',
      'Rechargeable 2400 mAh Li-ion Battery: Charges via micro-USB with precise 6-setting integrated battery meter.'
    ],
    specs: {
      'Brand': 'Black Diamond',
      'Model Name': 'Storm 500-R',
      'Luminance Output': '500 Lumens (Max Beam Distance: 120m)',
      'Waterproof Rating': 'IP67 Waterproof & Dustproof',
      'Battery': 'Integrated 2400 mAh Rechargeable Li-Ion (USB-C Charged)',
      'Headband': 'Recycled Elastic Fiber Breathable Webbing',
      'Weight': '100 Grams'
    },
    tags: ['fitness', 'outdoors', 'headlamp', 'hiking', 'camping', 'trail running', 'climbing', 'flashlight'],
    isFeatured: false,
    createdAt: new Date('2026-02-12').toISOString(),
    updatedAt: new Date('2026-02-12').toISOString()
  }
];

// ============================================================
// 6. BEAUTY & PERSONAL CARE (6 PRODUCTS)
// ============================================================
export const beautyProducts: Product[] = [
  {
    id: 'prod_beauty_dyson_nural',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'Dyson Supersonic Nural Intelligent Hair Dryer (Scalp Protect Infrared Sensor, Nural Hall Sensors, Wave+Curl Diffuser, Vinca Blue)',
    brand: 'Dyson',
    category: 'Beauty & Personal Care',
    description: 'The most intelligent hair dryer from Dyson. Equipped with an array of Nural sensors: Scalp Protect Mode automatically adjusts temperature as it nears your head to prevent thermal damage, while Pause Detect stops airflow when set down.',
    price: 41900,
    originalPrice: 47900,
    discount: 13,
    stock: 15,
    rating: 4.9,
    reviewsCount: 680,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '2 Years Dyson Comprehensive Warranty with Home Pickup',
    aboutItem: [
      'Scalp Protect Mode: A Time-of-Flight infrared sensor measures distance, reducing heat to 55°C as it approaches your scalp.',
      'Capsule Illumination: Color-changing capsule changes from cool blue to warm yellow to fiery red indicating live heat levels.',
      'Attachment Learning Intelligence: Hall sensors recognize each magnetic attachment and automatically restore your preferred styling settings.',
      'Pause Detect Accelerometer: Senses when you set the dryer down on dressing tables, automatically turning off the motor and heat.',
      'Wave+Curl Diffuser Attachment: Two modes in one—diffuses airflow through curls or enhances natural defined waves.'
    ],
    specs: {
      'Brand': 'Dyson',
      'Model Name': 'Supersonic Nural HD16',
      'Motor': 'Dyson Digital Motor V9 (110,000 RPM)',
      'Wattage': '1600 Watts',
      'Sensors': 'Infrared Distance Time-of-Flight, Hall Magnetic, Motion Accelerometer',
      'Attachments Included': 'Wave+Curl Diffuser, Styling Concentrator, Gentle Air Attachment, Wide-Tooth Comb, Flyaway Attachment',
      'Weight': '680 Grams'
    },
    tags: ['beauty', 'hair dryer', 'dyson', 'haircare', 'styling', 'luxury', 'salon', 'grooming'],
    isFeatured: true,
    createdAt: new Date('2026-02-13').toISOString(),
    updatedAt: new Date('2026-02-13').toISOString()
  },
  {
    id: 'prod_beauty_philips_s9000',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'Philips Norelco Series 9000 Prestige Wet & Dry Electric Shaver (NanoTech Precision Blades, SkinIQ Pressure Sensor, Qi Wireless Charging Pad)',
    brand: 'Philips',
    category: 'Beauty & Personal Care',
    description: 'Experience ultimate closeness without irritation. Features NanoTech DualPrecision blades delivering 165,000 cutting actions per minute, SkinIQ pressure-guard sensors, 360-degree contouring flex heads, and Qi wireless charging pad.',
    price: 18499,
    originalPrice: 26999,
    discount: 31,
    stock: 20,
    rating: 4.8,
    reviewsCount: 820,
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '700+ bought in past month',
    warranty: '2 Years Philips Worldwide Guarantee',
    aboutItem: [
      'NanoTech DualPrecision Blades: 72 self-sharpening hardened steel blades cut up to 165,000 times per minute for baby-smooth closeness.',
      'SkinGlide Protective Coating: Up to 500,000 micro-tech beads per square centimeter reduce skin friction by 50% against redness.',
      'SkinIQ Pressure Sensor: Light ring signals green for ideal pressure, blue for too soft, and orange for too hard.',
      '360-D Contouring Flex Heads: Fully flexible rotary heads swivel in all directions following jawlines and neck contours seamlessly.',
      'Qi Wireless Charging Pad Included: Recharges completely on the luxury non-slip wireless charging pad in 3 hours.'
    ],
    specs: {
      'Brand': 'Philips Norelco',
      'Model Name': 'Series 9000 Prestige (SP9860)',
      'Blade System': 'NanoTech DualPrecision Blades',
      'Shaving Performance': 'SkinIQ Pressure Sensor & Hydro SkinGlide Coating',
      'Battery Runtime': '60 Minutes (Lithium-Ion)',
      'Charging': 'Qi Wireless Charging Pad & Quick Charge',
      'Waterproof': '100% Wet & Dry Waterproof'
    },
    tags: ['beauty', 'grooming', 'shaver', 'electric razor', 'philips', 'mens grooming', 'skincare', 'shaving'],
    isFeatured: true,
    createdAt: new Date('2026-02-14').toISOString(),
    updatedAt: new Date('2026-02-14').toISOString()
  },
  {
    id: 'prod_beauty_augustinus_bader',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'Augustinus Bader The Rich Cream 50ml (Patented TFC8 Cellular Renewal Complex, Evening Primrose, Hyaluronic Acid, Squalane)',
    brand: 'Augustinus Bader',
    category: 'Beauty & Personal Care',
    description: 'An iconic skincare breakthrough formulated by biomedical scientist Professor Augustinus Bader. Powered by patented TFC8 (Trigger Factor Complex) combining natural amino acids, vitamins, and synthesized molecules to guide key nutrients into skin cells.',
    price: 22500,
    originalPrice: 28000,
    discount: 20,
    stock: 14,
    rating: 4.9,
    reviewsCount: 510,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Amazon\'s Choice',
    boughtInPastMonth: '450+ bought in past month',
    warranty: '100% Authentic Batch Verification Seal',
    aboutItem: [
      'Patented TFC8 Technology: 30 years of epigenetic cellular repair research stimulates innate skin renewal and collagen synthesis.',
      'Deeply Nourishing Rich Texture: Enriched with cold-pressed argan, avocado, and evening primrose oils for immediate plump radiance.',
      'Clinically Proven Fine Line Reduction: Visibly diminishes forehead wrinkles, fine lines, and environmental hyperpigmentation in 4 weeks.',
      'Strengthens Moisture Barrier: Hyaluronic acid and olive squalane lock hydration deep within dermal layers against transepidermal loss.',
      'Clean Formulations: Free from parabens, synthetic fragrances, silicones, and mineral oils; non-comedogenic and hypoallergenic.'
    ],
    specs: {
      'Brand': 'Augustinus Bader',
      'Volume': '50 ml / 1.7 fl. oz. Bottle',
      'Key Active': 'TFC8 (Trigger Factor Complex), Argan Oil, Evening Primrose',
      'Skin Type': 'Normal, Dry, Mature, and Dehydrated Skin',
      'Packaging': 'Recyclable Cobalt Blue Glass Airless Pump'
    },
    tags: ['beauty', 'skincare', 'moisturizer', 'anti-aging', 'augustinus bader', 'luxury', 'serum', 'cream'],
    isFeatured: true,
    createdAt: new Date('2026-02-15').toISOString(),
    updatedAt: new Date('2026-02-15').toISOString()
  },
  {
    id: 'prod_beauty_foreo_luna4',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'FOREO LUNA 4 Smart Facial Cleansing & Firming Massager (Ultra-Hygienic Silicone Bristles, 8000 T-Sonic Pulsations, App Connected, Peach)',
    brand: 'FOREO',
    category: 'Beauty & Personal Care',
    description: 'Transform your daily skincare ritual with clinically proven 2-in-1 sonic cleansing and firming. Removes 99.5% of dirt, sebum, sunscreen, and makeup residue while stimulating microcirculation and lymphatic drainage.',
    price: 16990,
    originalPrice: 22990,
    discount: 26,
    stock: 22,
    rating: 4.7,
    reviewsCount: 640,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Pick',
    boughtInPastMonth: '600+ bought in past month',
    warranty: '2 Years FOREO International Warranty',
    aboutItem: [
      '35x More Hygienic Than Nylon: Bacteria-resistant velvety body-safe silicone bristles never require replacement brush heads.',
      '8,000 T-Sonic Pulsations per Minute: Gently dislodges impurities trapped deep within pores without abrasive skin tugging.',
      'Targeted Concentric Firming Ridges: Low-frequency massage ridges tone jawlines and smooth expression lines on foreheads.',
      'Custom Cleansing Modes: Choose between Gentle, Regular, and Deep cleansing intensities tailored to skin sensitivity via app.',
      'Up to 600 Uses from a Single USB Charge: Ultra-long battery longevity makes it the ultimate travel companion for skincare enthusiasts.'
    ],
    specs: {
      'Brand': 'FOREO Sweden',
      'Model Name': 'LUNA 4',
      'Material': 'Body-Safe Ultra-Hygienic Silicone (BPA & Phthalate Free)',
      'Vibration': '8,000 T-Sonic Pulsations / Min (16 Intensities)',
      'Battery Life': 'Up to 600 Uses Per USB Charge',
      'Waterproof': '100% Waterproof (IPX8 Shower Safe)'
    },
    tags: ['beauty', 'skincare', 'foreo', 'facial cleanser', 'cleansing brush', 'spa', 'massage', 'wellness'],
    isFeatured: false,
    createdAt: new Date('2026-02-16').toISOString(),
    updatedAt: new Date('2026-02-16').toISOString()
  },
  {
    id: 'prod_beauty_aesop_duet',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'Aesop Resurrection Aromatique Hand Wash & Hand Balm Duet Set (500ml Each, Mandarin Rind, Rosemary Leaf, Cedar Atlas)',
    brand: 'Aesop',
    category: 'Beauty & Personal Care',
    description: 'The definitive luxury apothecary pairing for bathroom vanities. Cleanses hardworking hands without stripping moisture using gentle orange and lavender botanicals, paired with a rich, non-greasy balm of shea butter and sweet almond oil.',
    price: 8200,
    originalPrice: 11000,
    discount: 25,
    stock: 25,
    rating: 4.9,
    reviewsCount: 940,
    images: [
      'https://images.unsplash.com/photo-1608248597359-00994f2756a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: 'Aesop Genuine Origin Guarantee',
    aboutItem: [
      'Signature Herbaceous Citrus Aroma: Uplifting notes of crisp mandarin rind, rosemary sprig, and deep smoky cedar atlas.',
      'Sulfate-Free Botanical Cleansing: Cleanses hands thoroughly while maintaining natural skin lipid moisture barrier.',
      'Non-Greasy Rapid Balm Absorption: Nourishes dry cuticles and knuckles with sweet almond oil, coconut oil, and macadamia seed oil.',
      'Iconic Amber Pump Dispensers: Minimalist apothecary brown PET bottles complement modern Scandinavian bathrooms and vanity tables.',
      'Cruelty-Free & Certified Vegan: Formulated without animal testing, sulfates, parabens, synthetic dyes, or microplastics.'
    ],
    specs: {
      'Brand': 'Aesop',
      'Collection': 'Resurrection Aromatique Duet',
      'Set Contents': '1x Hand Wash (500ml) + 1x Hand Balm (500ml)',
      'Aroma Profile': 'Citrus, Woody, Herbaceous',
      'Key Botanicals': 'Mandarin Rind, Rosemary Leaf, Cedarwood Atlas, Lavender Stem',
      'Origin': 'Melbourne, Australia'
    },
    tags: ['beauty', 'hand wash', 'lotion', 'aesop', 'apothecary', 'luxury', 'skincare', 'vanity'],
    isFeatured: false,
    createdAt: new Date('2026-02-17').toISOString(),
    updatedAt: new Date('2026-02-17').toISOString()
  },
  {
    id: 'prod_beauty_mfk_baccarat_540',
    sellerId: 'user_seller_beauty',
    sellerName: 'Aura Botanical & Grooming',
    name: 'Maison Francis Kurkdjian Baccarat Rouge 540 Eau de Parfum (70ml, Luminous Amber Floral Jasmine & Saffron Signature)',
    brand: 'Maison Francis Kurkdjian',
    category: 'Beauty & Personal Care',
    description: 'One of the most celebrated olfactory masterpieces in modern perfumery. Crafted by master perfumer Francis Kurkdjian, blending airy Egyptian Grandiflorum jasmine petals, radiant saffron, warm cedarwood from Virginia, and ambergris accord.',
    price: 29990,
    originalPrice: 35000,
    discount: 14,
    stock: 12,
    rating: 4.9,
    reviewsCount: 780,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '400+ bought in past month',
    warranty: 'Authentic French Fragrance Certificate',
    aboutItem: [
      'Luminous Olfactory Density: Creates an enchanting, intoxicating aura of burnt caramelized sugar, woods, and crystalline amber.',
      'Master Perfumer Formula: Blended by Francis Kurkdjian to celebrate the 250th anniversary of French crystal house Baccarat.',
      'Exceptional Projection & Longevity: A single spray lingers on skin for over 18 hours and radiates an unmistakable sillage.',
      'Saffron & Jasmine Grandiflorum Top Notes: Hand-harvested golden saffron threads and delicate white Egyptian jasmine flowers.',
      'Hand-Polished French Flacon: Heavy cut glass bottle topped with gold-plated zinc monobloc cap and scarlet red label.'
    ],
    specs: {
      'Brand': 'Maison Francis Kurkdjian Paris',
      'Fragrance': 'Baccarat Rouge 540 Eau de Parfum',
      'Volume': '70 ml / 2.4 fl. oz.',
      'Fragrance Family': 'Amber Floral Woody',
      'Notes': 'Hedione Jasmine, Saffron, Cedarwood, Ambroxan Ambergris',
      'Origin': 'Made in Paris, France'
    },
    tags: ['beauty', 'perfume', 'fragrance', 'luxury', 'baccarat rouge', 'parfum', 'cologne'],
    isFeatured: true,
    createdAt: new Date('2026-02-18').toISOString(),
    updatedAt: new Date('2026-02-18').toISOString()
  }
];

// ============================================================
// 7. BOOKS & PRODUCTIVITY (5 PRODUCTS)
// ============================================================
export const productivityProducts: Product[] = [
  {
    id: 'prod_prod_remarkable_2',
    sellerId: 'user_seller_stationery',
    sellerName: 'Kyoto Fine Desk & Paper',
    name: 'reMarkable 2 Paper Tablet Bundle with Marker Plus & Polymer Weave Folio (10.3" Monochrome Canvas E-Ink, Paper-Like Writing Friction)',
    brand: 'reMarkable',
    category: 'Books & Productivity',
    description: 'The next-generation digital notebook that feels and writes like real paper. At just 4.7 mm, it is the world\'s thinnest tablet. Converts handwritten notes into digital text, annotates PDFs, organizes documents, and features 2 weeks of battery life.',
    price: 48990,
    originalPrice: 56990,
    discount: 14,
    stock: 14,
    rating: 4.8,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '800+ bought in past month',
    warranty: '1 Year reMarkable Manufacturer Warranty',
    aboutItem: [
      'World\'s Thinnest Tablet at 4.7 mm: Sleek aluminum anodized spine with rubber feet provides an ultra-light distraction-free workstation.',
      'True Paper-Like Surface Friction: Custom-engineered textured surface mimics the microscopic friction and sound of pencil on paper.',
      'Marker Plus with Built-in Eraser: Features 4096 levels of pressure sensitivity, tilt detection, and digital eraser top without charging.',
      'Instant Handwriting-to-Text: Convert handwritten meeting minutes into typed text and email them directly to colleagues.',
      '2 Weeks Continuous Battery: Read, sketch, and brainstorm for two full weeks on a single USB-C charge without notification interruptions.'
    ],
    specs: {
      'Brand': 'reMarkable',
      'Model Name': 'reMarkable 2 Complete Bundle',
      'Display': '10.3" Monochrome Digital Paper Display (1872 x 1404 / 226 DPI)',
      'Thickness': '4.7 mm (World\'s Thinnest Tablet)',
      'Stylus Included': 'Marker Plus with Digital Eraser Top and 10 Spare Nibs',
      'Folio Case': 'Polymer Weave Gray Magnetic Book Folio',
      'Storage': '8 GB Internal (Stores 100,000 pages)'
    },
    tags: ['productivity', 'ereader', 'notes', 'remarkable', 'tablet', 'paper', 'writing', 'office'],
    isFeatured: true,
    createdAt: new Date('2026-02-19').toISOString(),
    updatedAt: new Date('2026-02-19').toISOString()
  },
  {
    id: 'prod_prod_pilot_custom_823',
    sellerId: 'user_seller_stationery',
    sellerName: 'Kyoto Fine Desk & Paper',
    name: 'Pilot Custom 823 Amber Vacuum Fountain Pen (14K Solid Gold #15 Nib, Translucent Demonstrator, High-Capacity Plunger Fill, Fine Nib)',
    brand: 'Pilot',
    category: 'Books & Productivity',
    description: 'Widely regarded by fountain pen aficionados as the finest writing instrument in existence. Handcrafted in Japan featuring a huge 14-karat solid gold #15 size nib, high-capacity vacuum plunger filling system holding 2.2ml of ink, and warm amber resin barrel.',
    price: 23500,
    originalPrice: 28900,
    discount: 18,
    stock: 12,
    rating: 4.9,
    reviewsCount: 390,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585336261026-7f0932c02c6d?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '250+ bought in past month',
    warranty: '3 Years Pilot Japan Fountain Pen Warranty',
    aboutItem: [
      '14K Solid Gold #15 Nib: Custom tuned 14-karat gold nib provides sublime, buttery smooth ink flow with subtle responsive springiness.',
      'Continuous Vacuum Plunger Filling: Single-stroke internal vacuum draws 2.2ml of bottled ink—3x more than typical cartridge converters.',
      'Translucent Amber Demonstrator Barrel: Elegant warm amber acrylic lets you inspect remaining ink level and internal brass hardware.',
      'Safety Shut-Off Valve for Flying: Screw-down blind cap seals ink reservoir completely to prevent leaking during commercial flights.',
      'Master Artisan Japanese Heritage: Individually tested and tuned by master nibmeisters in Tokyo, Japan.'
    ],
    specs: {
      'Brand': 'Pilot Japan',
      'Model': 'Custom 823 (FKK-3MRP-BN)',
      'Nib Material': '14-Karat Solid Gold (#15 Large Nib)',
      'Nib Size': 'Fine (F)',
      'Filling Mechanism': 'Vacuum Plunger Filling System (2.2 ml Capacity)',
      'Body Material': 'Translucent Smoky Amber Acrylic Resin with Gold-Plated Trim',
      'Origin': 'Made in Tokyo, Japan'
    },
    tags: ['stationery', 'fountain pen', 'pen', 'pilot', 'calligraphy', 'writing', 'luxury', 'journaling'],
    isFeatured: true,
    createdAt: new Date('2026-02-20').toISOString(),
    updatedAt: new Date('2026-02-20').toISOString()
  },
  {
    id: 'prod_prod_grovemade_desk_shelf',
    sellerId: 'user_seller_stationery',
    sellerName: 'Kyoto Fine Desk & Paper',
    name: 'Grovemade Solid American Walnut Desktop Monitor Stand & Desk Shelf (Heavy 5052 Anodized Aluminum Stiffener, Natural Cork Feet)',
    brand: 'Grovemade',
    category: 'Books & Productivity',
    description: 'The pinnacle of ergonomic desk setups. Handcrafted from sustainably sourced solid American black walnut with a 5052 curved aircraft aluminum under-chassis to elevate dual monitors or iMacs, creating clean storage space for keyboards underneath.',
    price: 14990,
    originalPrice: 21000,
    discount: 28,
    stock: 18,
    rating: 4.8,
    reviewsCount: 410,
    images: [
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '400+ bought in past month',
    warranty: '5 Years Structural Integrity Guarantee',
    aboutItem: [
      '100% Solid American Walnut Hardwood: Rich, deep chocolate grain hand-rubbed with natural zero-VOC vegetable conditioning oils.',
      'Supports Heavy Multi-Monitor Setups: Structural 5052 aluminum shelf bracket effortlessly supports up to 25 kg of monitors without sag.',
      'Natural Cushioning Portuguese Cork Legs: Non-slip natural cork feet dampen acoustic resonance and protect fine walnut table finishes.',
      'Integrated Under-Shelf Keyboard Dock: Tucks full-sized mechanical keyboards and mice away to reclaim desk real estate for writing.',
      'Ergonomic Eye-Level Alignment: Elevates display screens 4.5 inches to encourage healthy spinal posture and prevent neck fatigue.'
    ],
    specs: {
      'Brand': 'Grovemade',
      'Product': 'Wood Desk Shelf (Large Dual Monitor)',
      'Dimensions': '117 cm L x 23 cm D x 11.4 cm H (46" x 9" x 4.5")',
      'Hardwood': 'Solid FSC American Black Walnut',
      'Under-Chassis': '1/8" Anodized 5052 Structural Aluminum',
      'Weight Capacity': '25 kg (55 lbs)'
    },
    tags: ['productivity', 'desk setup', 'monitor stand', 'grovemade', 'walnut', 'office', 'ergonomics', 'workspace'],
    isFeatured: false,
    createdAt: new Date('2026-02-21').toISOString(),
    updatedAt: new Date('2026-02-21').toISOString()
  },
  {
    id: 'prod_prod_bellroy_work_folio',
    sellerId: 'user_seller_stationery',
    sellerName: 'Kyoto Fine Desk & Paper',
    name: 'Bellroy Work Folio A4 Premium Leather Organizer (Full-Grain Environmentally Certified Leather, iPad Pro Sleeve, Pen Loop, Caramel)',
    brand: 'Bellroy',
    category: 'Books & Productivity',
    description: 'Streamline your executive meetings and travel. Crafted from supple gold-rated environmentally certified leather, featuring dedicated compartments for an A4 or Letter notepad, 13" iPad Pro or MacBook Air, phone, business cards, cables, and favorite pen.',
    price: 12490,
    originalPrice: 17500,
    discount: 28,
    stock: 20,
    rating: 4.7,
    reviewsCount: 320,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Amazon\'s Choice',
    boughtInPastMonth: '300+ bought in past month',
    warranty: '3 Years Bellroy International Warranty',
    aboutItem: [
      'Full-Grain LWG Certified Leather: Tanned under Gold-rated Leather Working Group environmental protocols for rich texture and durability.',
      'Accommodates A4 / US Letter Notebooks: Slides any standard legal notepad or spiral bound notebook securely into the right sleeve.',
      'Padded Tablet / 13" Laptop Sleeve: Left-hand zippered sleeve protects iPad Pro 12.9", tablet, or ultra-thin 13" laptops.',
      'Full Zip-Around Security: Heavy-duty metal YKK zipper keeps passports, checks, cards, and receipts completely secure inside bags.',
      'Smart Organization Pockets: Includes 6 business card slots, elastic charging cable loops, and centered leather pen holder.'
    ],
    specs: {
      'Brand': 'Bellroy',
      'Model Name': 'Work Folio A4',
      'Dimensions': '33 x 25 x 2 cm',
      'Material': 'Full-Grain Premium Vegetable Tanned Leather',
      'Capacity': 'A4/Letter Notepad + 13" Tablet/Laptop + Cables & Cards',
      'Zipper': 'Full Perimeter Metal YKK Zip Closure'
    },
    tags: ['productivity', 'leather', 'folio', 'bellroy', 'organizer', 'office', 'executive', 'travel'],
    isFeatured: false,
    createdAt: new Date('2026-02-22').toISOString(),
    updatedAt: new Date('2026-02-22').toISOString()
  },
  {
    id: 'prod_prod_midori_md_journal',
    sellerId: 'user_seller_stationery',
    sellerName: 'Kyoto Fine Desk & Paper',
    name: 'Midori MD Notebook Journal & Hand-Tooled Italian Vachetta Leather Cover (Bleed-Proof Japanese MD Paper, Ribbon Bookmark, A5 Dot Grid)',
    brand: 'Midori',
    category: 'Books & Productivity',
    description: 'The definitive writer\'s journal. Pairing Midori legendary bleed-resistant Japanese MD fountain pen paper bound in 180-degree lay-flat codex binding with a vegetable-tanned un-dyed Italian vachetta leather jacket that matures with sunlight and natural oils.',
    price: 3850,
    originalPrice: 5500,
    discount: 30,
    stock: 35,
    rating: 4.9,
    reviewsCount: 710,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: 'Zero Ghosting Ink Guarantee',
    aboutItem: [
      'Legendary Japanese MD Paper: Formulated specifically to prevent ink feathering, bleeding, or strike-through with wet fountain pens.',
      'Un-Dyed Natural Italian Vachetta Leather: Starts as pale nude leather and oxidizes into a rich, lustrous honey-caramel patina over years.',
      '180-Degree Thread-Stitched Lay-Flat Binding: Opens completely flat without breaking the spine for effortless two-page writing.',
      'Subtle 5mm Dot Grid System: Provides clean alignment for bullet journaling, sketching wireframes, and freehand drafting.',
      'Includes Archive Labeling Stickers: Traditional bookbinder ribbon bookmark and index tabs for cataloging past volumes.'
    ],
    specs: {
      'Brand': 'Midori Japan',
      'Cover Material': 'Vegetable-Tanned Italian Vachetta Goat Leather',
      'Page Count': '176 Pages (A5 Format: 14.8 x 21 cm)',
      'Ruling': '5mm Subtle Gray Dot Grid',
      'Paper Weight': '80 GSM Bleed-Proof Japanese MD Paper',
      'Binding': 'Thread-Stitched Codex Lay-Flat'
    },
    tags: ['stationery', 'notebook', 'journal', 'midori', 'leather', 'bullet journal', 'writing', 'sketchbook'],
    isFeatured: false,
    createdAt: new Date('2026-02-23').toISOString(),
    updatedAt: new Date('2026-02-23').toISOString()
  }
];

// ============================================================
// 8. PET CARE & SMART ACCESSORIES (4 PRODUCTS)
// ============================================================
export const petCareProducts: Product[] = [
  {
    id: 'prod_pet_petkit_feeder',
    sellerId: 'user_seller_pets',
    sellerName: 'Paws & Tail Pet Care',
    name: 'PETKIT YumShare Dual-Hopper Smart Pet Feeder with 1080p Night Vision Camera (AI Pet Recognition, Two-Way Audio, App Control, 5L)',
    brand: 'PETKIT',
    category: 'Pet Care',
    description: 'Ensure your beloved pets are fed precisely on time and check in on them from anywhere. Features a 1080p wide-angle camera with infrared night vision, dual separate food hoppers for mixed dry and freeze-dried kibble, two-way walkie-talkie audio, and anti-clogging dispenser.',
    price: 14990,
    originalPrice: 19990,
    discount: 25,
    stock: 20,
    rating: 4.8,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '900+ bought in past month',
    warranty: '1 Year PETKIT Official Replacement Warranty',
    aboutItem: [
      '1080p HD Ultra-Wide Angle Camera: 140° viewing angle with infrared night vision lets you watch your pet eat in real time.',
      'AI Pet Recognition & Auto-Recording: Automatically clips video milestones when your cat or dog approaches the bowl.',
      'Dual Independent Food Hoppers (5L Total): Feed different types of kibble or cater to multi-pet dietary requirements.',
      'Two-Way High-Clarity Audio: Speak live to comfort anxious pets and listen to their purrs or barks while you are at work.',
      'Triple Fresh-Lock Seal & Anti-Jam Motor: Silicone sealing ring, desiccant compartment, and auto-reversing impeller prevent stale food or jams.'
    ],
    specs: {
      'Brand': 'PETKIT',
      'Model Name': 'YumShare Dual Hopper Camera Feeder',
      'Capacity': '5 Liters (Split 3L + 2L Hoppers)',
      'Camera': '1080p Full HD with Infrared Night Vision & 140° Field of View',
      'Bowl Material': 'Food-Grade 304 Stainless Steel (Dishwasher Safe)',
      'Connectivity': '2.4 GHz Wi-Fi & Bluetooth 5.0 (PETKIT App iOS/Android)',
      'Backup Power': 'Emergency D-Cell Battery Backup'
    },
    tags: ['pet care', 'smart pet feeder', 'cat feeder', 'dog feeder', 'petkit', 'camera', 'smart home'],
    isFeatured: true,
    createdAt: new Date('2026-02-24').toISOString(),
    updatedAt: new Date('2026-02-24').toISOString()
  },
  {
    id: 'prod_pet_eversweet_water_fountain',
    sellerId: 'user_seller_pets',
    sellerName: 'Paws & Tail Pet Care',
    name: 'Petkit Eversweet 3 Pro Wireless Water Fountain for Cats & Dogs (Ultra-Silent Magnetic Induction Pump, Quadruple Filtration, 1.8L)',
    brand: 'PETKIT',
    category: 'Pet Care',
    description: 'Keep your pets hydrated with oxygen-rich, constantly flowing filtered water. Features a revolutionary magnetic induction wireless pump with no submerged electrical wires, SUS304 stainless steel basin, and medical-grade quadruple filtration.',
    price: 4899,
    originalPrice: 6999,
    discount: 30,
    stock: 28,
    rating: 4.7,
    reviewsCount: 780,
    images: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Amazon\'s Choice',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '1 Year Warranty on Pump & Chassis',
    aboutItem: [
      'Wireless Magnetic Induction Pump: Eliminates exposed wires in water; lifts out effortlessly for quick refilling and cleaning.',
      'Whisper-Quiet Operation (<20dB): Natural flowing spring trickles quieter than a whisper, so it never startles timid kittens.',
      'Quadruple High-Efficiency Filtration: High-density micro-cotton, coconut shell activated carbon, and ion-exchange resin soften water.',
      '304 Stainless Steel Clean Basin: Resists feline acne and bacterial buildup common with cheap plastic pet bowls.',
      'Smart Light Indicator & Auto-Off: Roman numeral LED pulses blue for normal flow and flashes red when water needs topping up.'
    ],
    specs: {
      'Brand': 'PETKIT',
      'Model Name': 'Eversweet 3 Pro Wireless',
      'Water Capacity': '1.8 Liters (60 oz)',
      'Pump Type': 'Magnetic Wireless Induction Pump',
      'Noise Level': 'Below 20 dB',
      'Material': 'SUS304 Stainless Steel & BPA-Free ABS',
      'Filtration': 'Quadruple Stage Ion-Exchange & Activated Carbon'
    },
    tags: ['pet care', 'water fountain', 'cat water fountain', 'petkit', 'hydration', 'quiet', 'stainless steel'],
    isFeatured: false,
    createdAt: new Date('2026-02-25').toISOString(),
    updatedAt: new Date('2026-02-25').toISOString()
  },
  {
    id: 'prod_pet_furbo_360_dog_cam',
    sellerId: 'user_seller_pets',
    sellerName: 'Paws & Tail Pet Care',
    name: 'Furbo 360° Dog Camera with Smart Treat Tossing (Auto Dog Tracking, Barking Sensor Alerts, Full Color Night Vision, Two-Way Talk)',
    brand: 'Furbo',
    category: 'Pet Care',
    description: 'The ultimate smart companion for dog parents. Features 360-degree rotating panoramic camera with auto-tracking that follows your pup everywhere in the room, fun remote treat tossing from your smartphone, and real-time barking notifications.',
    price: 16500,
    originalPrice: 22000,
    discount: 25,
    stock: 16,
    rating: 4.8,
    reviewsCount: 650,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '600+ bought in past month',
    warranty: '2 Years Furbo International Manufacturer Warranty',
    aboutItem: [
      '360° Rotating Wide-Angle Coverage: Silent motorized base turns left and right automatically to keep your dog centered in the frame.',
      'Interactive Remote Treat Tossing: Toss your dog\'s favorite round treats via the free iOS/Android app with fun customized sound bites.',
      'Smart Real-Time Barking Alerts: Detects anxious whining, continuous howling, or intruder barking and alerts your phone immediately.',
      'Full Color Night Vision: High-sensitivity image sensor maintains vibrant natural color illumination even in dimly lit rooms.',
      'Two-Way Noise-Canceling Audio: Comfort your dog with your familiar voice to ease separation anxiety when you are away from home.'
    ],
    specs: {
      'Brand': 'Furbo',
      'Model': 'Furbo 360° Dog Camera',
      'Rotation': '360° Continuous Horizontal Pan with Auto Dog Tracking',
      'Video Quality': '1080p Full HD with 4x Zoom and Color Night Vision',
      'Treat Capacity': 'Holds up to 100 treats (approx 0.5" diameter recommended)',
      'Audio': 'High Quality Mic with Background Noise Suppression',
      'Security': 'Bank-Level 256-bit Encrypted Video Streaming'
    },
    tags: ['pet care', 'dog camera', 'treat tosser', 'furbo', 'pet monitor', 'smart home', 'dogs'],
    isFeatured: true,
    createdAt: new Date('2026-02-26').toISOString(),
    updatedAt: new Date('2026-02-26').toISOString()
  },
  {
    id: 'prod_pet_kong_extreme_set',
    sellerId: 'user_seller_pets',
    sellerName: 'Paws & Tail Pet Care',
    name: 'KONG Classic Extreme Heavy-Duty Rubber Dog Chew & Treat Dispensing Toy (Pack of 2, Large, Puncture-Resistant Ultra-Durable Natural Rubber)',
    brand: 'KONG',
    category: 'Pet Care',
    description: 'The world\'s most durable dog toy designed specifically for tenacious, power chewers. Made from ultra-tough all-natural black rubber, mentally stimulating unpredictable erratic bounce for fetch games, and hollow interior for peanut butter stuffing.',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    stock: 50,
    rating: 4.9,
    reviewsCount: 2400,
    images: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '4K+ bought in past month',
    warranty: 'KONG Tough Chew Satisfaction Guarantee',
    aboutItem: [
      'Ultra-Durable KONG Extreme Black Rubber: Specifically formulated for aggressive chewers that tear apart standard plush toys.',
      'Mental Stimulation & Boredom Relief: Helps satisfy dogs\' instinctual chewing urges, preventing destructive shoe and furniture chewing.',
      'Erratic Bouncing Dynamics: Unique ribbed snowman shape creates unpredictable bounces that keep dogs engaged during fetch.',
      'Stuffable Treat Reservoir: Fill with kibble, yogurt, or peanut butter and freeze overnight for hours of healthy mental exercise.',
      'Veterinarian & Trainer Endorsed: Recommended by pet professionals worldwide for crate training and separation anxiety relief.'
    ],
    specs: {
      'Brand': 'KONG Company',
      'Model': 'KONG Extreme Large (Pack of 2)',
      'Size': 'Large (Suitable for dogs weighing 13-30 kg / 30-65 lbs)',
      'Material': '100% Non-Toxic Puncture-Resistant All-Natural Black Rubber',
      'Dishwasher Safe': 'Top Rack Dishwasher Safe',
      'Origin': 'Made in USA with Globally Sourced Materials'
    },
    tags: ['pet care', 'dog toy', 'kong', 'chew toy', 'durable', 'enrichment', 'dogs', 'budget'],
    isFeatured: false,
    createdAt: new Date('2026-02-27').toISOString(),
    updatedAt: new Date('2026-02-27').toISOString()
  }
];

export const allNewProducts: Product[] = [
  ...kitchenProducts,
  ...fitnessProducts,
  ...beautyProducts,
  ...productivityProducts,
  ...petCareProducts
];
