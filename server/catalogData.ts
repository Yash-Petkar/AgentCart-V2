import type { Product } from './db';
import { allNewProducts } from './moreCatalogData';

export const initialProducts: Product[] = [
  // ============================================================
  // 1. ELECTRONICS (BUDGET, MID-RANGE & FLAGSHIP)
  // ============================================================
  {
    id: 'prod_elec_boat_airdopes',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'boAt Airdopes 141 ANC TWS Earbuds (32dB Active Noise Cancellation, 42H Playtime, Low Latency Beast Mode, ENx Tech)',
    brand: 'boAt',
    category: 'Electronics',
    description: 'Immerse in pure acoustics with up to 32dB active noise cancellation, massive 42 hours playback, 10mm drivers, and quad mics with ENx technology for crystal clear calls.',
    price: 1499,
    originalPrice: 4490,
    discount: 66,
    stock: 45,
    rating: 4.3,
    reviewsCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '4K+ bought in past month',
    warranty: '1 Year boAt India Warranty',
    aboutItem: [
      'Active Noise Cancellation: Up to 32dB ANC effectively cancels ambient commute and office noise.',
      'Massive Playback: Get up to 42 hours of nonstop entertainment, with ASAP Charge giving 75 mins in 10 mins.',
      'Crystal Clear Calling: Equipped with 4 microphones powered by ENx algorithm for wind-resistant vocal clarity.',
      'Beast Mode Low Latency: 50ms super low latency mode engineered for synchronized mobile gaming.',
      'IPX5 Water & Sweat Resistance: Safely workout or commute in rain without moisture worries.'
    ],
    specs: {
      'Brand': 'boAt',
      'Model Name': 'Airdopes 141 ANC',
      'Color': 'Active Black',
      'Headphones Form Factor': 'In Ear',
      'Noise Control': 'Active Noise Cancellation (up to 32dB)',
      'Battery Life': 'Up to 42 Hours',
      'Connectivity': 'Bluetooth 5.3'
    },
    tags: ['electronics', 'audio', 'earbuds', 'tws', 'boat', 'budget', 'anc', 'wireless'],
    isFeatured: false,
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString()
  },
  {
    id: 'prod_elec_portronics_powerbank',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Portronics Luxcell 10K 10000mAh Power Bank (22.5W Fast Charging, Type-C PD + USB-A Output, LED Battery Indicator)',
    brand: 'Portronics',
    category: 'Electronics',
    description: 'Ultra-compact luxury textured power bank with 22.5W Power Delivery and Quick Charge 3.0 support, capable of charging smartphones 50% in just 30 minutes.',
    price: 1299,
    originalPrice: 2999,
    discount: 56,
    stock: 38,
    rating: 4.4,
    reviewsCount: 890,
    images: [
      'https://images.unsplash.com/photo-1609592426508-410a7b4588e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '1 Year Portronics Domestic Warranty',
    aboutItem: [
      '22.5W Maximum Output: Supports rapid charging for iPhone 15/14, Samsung Galaxy S series, and Google Pixel.',
      'Dual Device Fast Charging: Charge two devices simultaneously via USB Type-C PD and USB-A QC outputs.',
      'Luxury Textured Finish: Premium scratch-resistant chassis with sleek metallic accent trim and compact profile.',
      'Intelligent Safety Architecture: Multi-layered circuit protection against over-current, short-circuit, and overheating.',
      'Aircraft Carry-On Approved: Complies with international civil aviation battery flight regulations.'
    ],
    specs: {
      'Brand': 'Portronics',
      'Model Name': 'Luxcell 10K',
      'Battery Capacity': '10000 mAh Lithium Polymer',
      'Connector Type': 'USB Type C, USB Type A',
      'Output Wattage': '22.5 Watts Max (PD 3.0 & QC 3.0)',
      'Dimensions': '10.5 x 6.8 x 1.6 cm',
      'Weight': '185 Grams'
    },
    tags: ['electronics', 'power bank', 'charger', 'battery', 'portronics', 'travel', 'budget', 'type-c'],
    isFeatured: false,
    createdAt: new Date('2026-01-02').toISOString(),
    updatedAt: new Date('2026-01-02').toISOString()
  },
  {
    id: 'prod_elec_anker_cube',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Anker 3-in-1 Cube with Official MagSafe (15W Fast Wireless Charging for iPhone, Apple Watch & AirPods, Foldable Stand)',
    brand: 'Anker',
    category: 'Electronics',
    description: 'The definitive all-in-one travel charging hub. Certified 15W MagSafe magnetic fast charging for iPhone, dedicated high-speed Apple Watch puck, and wireless AirPods base in an ultra-compact foldable cube.',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    stock: 26,
    rating: 4.8,
    reviewsCount: 620,
    images: [
      '/images/anker_magsafe_cube.jpg',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '2 Years Anker Global Warranty',
    aboutItem: [
      'Official 15W Made for MagSafe: Charges iPhone 15/14/13/12 up to 50% in under 35 minutes with perfect magnetic alignment.',
      'Adjustable 60-Degree Viewing Angle: Smoothly tilt phone in landscape or portrait mode for StandBy display mode.',
      'Pocket-Sized Foldable Design: Ingenious cube folds down into a pocketable unit for business travel and clutter-free desks.',
      '3-in-1 Simultaneous Power: Power iPhone, Apple Watch Ultra/Series, and AirPods Pro simultaneously from one wall outlet.',
      'Weighted Aluminum Base: Premium tactile weighting prevents shifting when detaching phone with one hand.'
    ],
    specs: {
      'Brand': 'Anker',
      'Model Name': 'Anker 3-in-1 Cube',
      'Compatibility': 'iPhone 12-15 Series, Apple Watch, AirPods',
      'Total Output': '30W (15W MagSafe + 5W Watch + 5W AirPods)',
      'Form Factor': 'Foldable Desktop Charging Cube',
      'Material': 'Anodized Aluminum & Soft-Touch Matte Polycarbonate',
      'Weight': '410 Grams'
    },
    tags: ['electronics', 'wireless charger', 'magsafe', 'anker', 'iphone', 'accessories', 'desk setup'],
    isFeatured: true,
    createdAt: new Date('2026-01-03').toISOString(),
    updatedAt: new Date('2026-01-03').toISOString()
  },
  {
    id: 'prod_elec_echo_show_8',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Amazon Echo Show 8 (3rd Gen, 2024 Release | Smart Display with Spatial Audio, 13MP Auto-Framing Camera, Built-in Smart Home Hub)',
    brand: 'Amazon',
    category: 'Electronics',
    description: 'Transform your living space with an 8-inch HD touchscreen, room-filling spatial audio, centered 13 MP auto-framing camera for video calls, and integrated Zigbee/Matter smart home hub.',
    price: 7999,
    originalPrice: 13999,
    discount: 43,
    stock: 22,
    rating: 4.6,
    reviewsCount: 1150,
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '3K+ bought in past month',
    warranty: '1 Year Amazon Device Warranty',
    aboutItem: [
      'Immersive Spatial Audio: Custom-tuned stereo neodymium speakers deliver room-filling clarity and deep resonant bass.',
      '13MP Centered Camera: Auto-framing pans and zooms intelligently to keep you centered during family and work video calls.',
      'Built-in Smart Home Hub: Seamlessly pairs with Matter, Zigbee, and Thread smart lights, plugs, sensors, and locks.',
      'Adaptive Content Screen: Home screen dynamically adjusts typography and widgets based on your distance from the device.',
      'Privacy First Architecture: Includes physical camera shutter slide and dedicated microphone disconnect switch.'
    ],
    specs: {
      'Brand': 'Amazon',
      'Model Name': 'Echo Show 8 (3rd Gen)',
      'Display': '8.0-inch HD Touchscreen (1280 x 800)',
      'Camera': '13 MP with built-in shutter and auto-framing',
      'Audio': 'Dual 2.0" neodymium drivers with passive bass radiator',
      'Smart Protocols': 'Matter, Zigbee, Thread, Bluetooth Low Energy, Wi-Fi 6',
      'Color': 'Glacier White'
    },
    tags: ['electronics', 'smart home', 'alexa', 'echo show', 'speaker', 'display', 'iot'],
    isFeatured: true,
    createdAt: new Date('2026-01-04').toISOString(),
    updatedAt: new Date('2026-01-04').toISOString()
  },
  {
    id: 'prod_elec_kindle_paperwhite',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Kindle Paperwhite Signature Edition (32GB Storage, 6.8" 300 ppi Glare-Free Display, Auto-Adjusting Warm Light, Wireless Charging)',
    brand: 'Amazon',
    category: 'Electronics',
    description: 'The ultimate e-reader experience with 32GB storage for thousands of titles and audiobooks, flush-front 300 ppi display, auto-adjusting warm ambient lighting, and Qi wireless charging.',
    price: 15499,
    originalPrice: 17999,
    discount: 14,
    stock: 18,
    rating: 4.8,
    reviewsCount: 1640,
    images: [
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '1 Year Amazon Comprehensive Warranty',
    aboutItem: [
      '300 ppi Glare-Free Paper Display: Reads just like real paper even in direct, bright outdoor sunlight.',
      'Auto-Adjusting Front Light: Built-in ambient light sensor automatically tunes brightness as lighting conditions shift.',
      'Up to 10 Weeks Battery Life: A single charge via USB-C or compatible Qi wireless charging pad lasts up to 10 weeks.',
      'Waterproof Reading (IPX8): Enjoy reading relaxing in the bath, by the swimming pool, or on the beach without worry.',
      'Massive 32GB Storage: Store thousands of graphic novels, technical reference PDFs, and Audible audiobooks.'
    ],
    specs: {
      'Brand': 'Amazon',
      'Model Name': 'Kindle Paperwhite Signature Edition',
      'Display Size': '6.8-inch Flush-Front Paperwhite Display',
      'Resolution': '300 ppi, 16-level grayscale',
      'Storage': '32 GB Internal',
      'Charging': 'Qi Wireless Charging & USB-C Fast Charge',
      'Water Resistance': 'IPX8 (Submersion up to 2 meters for 60 mins)'
    },
    tags: ['electronics', 'kindle', 'ereader', 'books', 'amazon', 'paperwhite', 'reading', 'travel'],
    isFeatured: false,
    createdAt: new Date('2026-01-05').toISOString(),
    updatedAt: new Date('2026-01-05').toISOString()
  },
  {
    id: 'prod_elec_sony_headphones',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones (Auto NC Optimizer, 30H Battery, Multipoint Bluetooth)',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Class-leading active noise cancellation powered by two processors and 8 microphones. Enjoy ultra-detailed Hi-Res LDAC audio, crystal-clear 4-mic beamforming calls, and 30-hour battery life.',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    stock: 19,
    rating: 4.8,
    reviewsCount: 1840,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '3K+ bought in past month',
    warranty: '1 Year Sony India Warranty',
    aboutItem: [
      'Industry-Leading Noise Cancellation: 8 microphones and Integrated Processor V1 silence planes, trains, and chatter.',
      'Magnificent Hi-Res Audio: Specially engineered 30mm carbon fiber composite driver unit delivers authentic studio sound.',
      'Crystal Clear Beamforming Calls: 4 beamforming microphones with AI noise reduction algorithm isolate your speech cleanly.',
      '30-Hour Battery with Fast Charging: Get 3 hours playback from just a quick 3-minute USB-PD charge.',
      'Multipoint Connection: Seamlessly switch audio playback between your laptop and smartphone simultaneously.'
    ],
    specs: {
      'Brand': 'Sony',
      'Model Name': 'WH-1000XM5',
      'Driver Size': '30mm Carbon Fiber Dome',
      'Noise Cancelling': 'Dual Processor V1 + QN1 Active Cancelling',
      'Battery Life': '30 Hours (NC On) / 40 Hours (NC Off)',
      'Audio Codecs': 'LDAC, AAC, SBC',
      'Weight': '250 Grams'
    },
    tags: ['electronics', 'audio', 'headphones', 'sony', 'anc', 'wireless', 'music', 'work from home'],
    isFeatured: true,
    createdAt: new Date('2026-01-06').toISOString(),
    updatedAt: new Date('2026-01-06').toISOString()
  },
  {
    id: 'prod_elec_dji_osmo_pocket3',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'DJI Osmo Pocket 3 Creator Combo (1" CMOS Sensor, 4K/120fps Video, 3-Axis Mechanical Gimbal, 2" Rotating OLED Touchscreen)',
    brand: 'DJI',
    category: 'Electronics',
    description: 'Capture breathtaking cinematic footage on the move with a 1-inch CMOS sensor capable of 4K/120fps, mechanical 3-axis stabilization, ActiveTrack 6.0, and DJI Mic 2 wireless transmitter included.',
    price: 53990,
    originalPrice: 62990,
    discount: 14,
    stock: 12,
    rating: 4.9,
    reviewsCount: 540,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '800+ bought in past month',
    warranty: '1 Year DJI Authorized Manufacturer Warranty',
    aboutItem: [
      '1-Inch Large CMOS Sensor: Captures brilliant highlight-to-shadow details and stellar low-light performance in 4K/120fps.',
      'Rotatable 2-Inch OLED Screen: Effortlessly switch between horizontal landscape cinema and vertical portrait social formats.',
      '3-Axis Mechanical Gimbal Stabilization: Fluid camera movement eliminates shake during rapid running, walking, or sports.',
      'ActiveTrack 6.0 Intelligence: Face auto-detect and dynamic framing track subjects automatically across complex scenes.',
      'Full Creator Combo: Includes DJI Mic 2 transmitter, battery handle extension, mini tripod, and dedicated carry case.'
    ],
    specs: {
      'Brand': 'DJI',
      'Model Name': 'Osmo Pocket 3 Creator Combo',
      'Sensor': '1.0-inch CMOS Sensor',
      'Video Resolution': '4K UHD up to 120 fps, 10-bit D-Log M',
      'Display': '2.0-inch Rotatable OLED Touchscreen (314 x 556)',
      'Stabilization': '3-Axis Mechanical Motorized Gimbal',
      'Battery Runtime': 'Up to 166 Minutes (1080p/24fps)'
    },
    tags: ['electronics', 'camera', 'vlogging', 'dji', 'gimbal', '4k', 'creator', 'videography'],
    isFeatured: true,
    createdAt: new Date('2026-01-07').toISOString(),
    updatedAt: new Date('2026-01-07').toISOString()
  },
  {
    id: 'prod_elec_sony_bravia_55',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Sony Bravia 55" 4K Ultra HD Smart Google TV (Cognitive Processor XR, 120Hz Gaming, Dolby Vision HDR, Acoustic Surface Audio)',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Transform home entertainment with Sony Cognitive Processor XR delivering lifelike depth and contrast. Features native 120Hz refresh rate, HDMI 2.1 eARC for PS5 gaming, and sound emanating directly from the glass screen.',
    price: 62990,
    originalPrice: 89900,
    discount: 30,
    stock: 14,
    rating: 4.7,
    reviewsCount: 430,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '400+ bought in past month',
    warranty: '2 Years Comprehensive Sony India Warranty',
    aboutItem: [
      'Cognitive Processor XR: Intelligently processes image elements like the human eye for supreme realism and color purity.',
      'Native 120Hz Refresh Rate: Perfect for next-gen consoles with 4K/120fps, VRR (Variable Refresh Rate), and ALLM mode.',
      'Acoustic Multi-Audio Technology: Sound actuators vibrate the screen to position dialog precisely where actors stand.',
      'Dolby Vision & Atmos: Experience theatrical cinematic picture dynamics and three-dimensional spatial sound immersion.',
      'Google TV with Voice Control: Access Netflix, Prime Video, Apple TV+, and YouTube with hands-free Google Assistant.'
    ],
    specs: {
      'Brand': 'Sony',
      'Model Name': 'Bravia XR-55X90L',
      'Display Size': '55 Inches (139 cm)',
      'Resolution': '4K Ultra HD (3840 x 2160 pixels)',
      'Refresh Rate': '120 Hz Native',
      'Audio Output': '30W Acoustic Multi-Audio',
      'Operating System': 'Google TV'
    },
    tags: ['electronics', 'tv', 'smart tv', 'sony', '4k', 'gaming', 'bravia', 'home theater'],
    isFeatured: false,
    createdAt: new Date('2026-01-08').toISOString(),
    updatedAt: new Date('2026-01-08').toISOString()
  },
  {
    id: 'prod_elec_lenovo_loq',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Lenovo LOQ 15 Gaming Laptop (Intel Core i5-13450HX 10-core, 16GB DDR5, 512GB SSD, NVIDIA RTX 4060 8GB GDDR6, 144Hz FHD)',
    brand: 'Lenovo',
    category: 'Electronics',
    description: 'Dominate esports and AAA gaming with high-wattage NVIDIA RTX 4060 8GB graphics (115W TGP), 13th Gen Intel HX processor, dual whisper-quiet hyperchamber fans, and 100% sRGB gaming display.',
    price: 69990,
    originalPrice: 94990,
    discount: 26,
    stock: 15,
    rating: 4.6,
    reviewsCount: 420,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '1 Year Lenovo Onsite Warranty with Accidental Damage Protection',
    aboutItem: [
      'High TGP NVIDIA RTX 4060 8GB: Full-power 115W TGP GPU supports DLSS 3 frame generation and ray tracing.',
      'Intel Core i5-13450HX Processor: 10 cores (6 Performance + 4 Efficient) and 16 threads clocking up to 4.6 GHz.',
      '16GB Dual-Channel DDR5 4800MHz RAM: Expandable up to 32GB for extreme rendering and browser multitasking.',
      '15.6" Full HD 144Hz IPS Screen: 100% sRGB color gamut with NVIDIA G-SYNC eliminates screen tearing.',
      'Lenovo Hyperchamber Thermal Cooling: Inward dual fans push cool air across heatpipes, lowering surface temps.'
    ],
    specs: {
      'Brand': 'Lenovo',
      'Model Name': 'LOQ 15IRX9',
      'Processor': 'Intel Core i5-13450HX (10 Cores, 16 Threads, up to 4.6 GHz)',
      'RAM': '16GB DDR5 4800MHz (2x 8GB)',
      'Storage': '512GB PCIe 4.0 NVMe M.2 SSD',
      'Graphics': 'NVIDIA GeForce RTX 4060 8GB GDDR6 (115W TGP)',
      'Display': '15.6" FHD (1920x1080) IPS 144Hz, 100% sRGB, G-SYNC'
    },
    tags: ['electronics', 'laptop', 'gaming', 'lenovo', 'rtx 4060', 'intel', 'esports'],
    isFeatured: true,
    createdAt: new Date('2026-01-09').toISOString(),
    updatedAt: new Date('2026-01-09').toISOString()
  },
  {
    id: 'prod_elec_apple_macbook_air',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Apple MacBook Air 13" (Apple M2 chip 8-core CPU / 8-core GPU, 8GB Unified Memory, 256GB SSD, Liquid Retina, Midnight)',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Incredibly thin and fast in a durable all-aluminum unibody enclosure. Powered by the next-generation M2 chip with up to 18 hours of battery life, MagSafe 3 charging, and 1080p FaceTime HD camera.',
    price: 84990,
    originalPrice: 99900,
    discount: 15,
    stock: 16,
    rating: 4.8,
    reviewsCount: 1640,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '1 Year Apple International Limited Warranty',
    aboutItem: [
      'Strikingly Thin Lightweight Profile: Weighs just 1.24 kg with an ultra-slim 11.3 mm profile crafted from 100% recycled aluminum.',
      'Supercharged by Apple M2: Next-generation 8-core CPU and 8-core GPU run complex coding, video editing, and office tasks silently.',
      '18 Hours Battery Life: Go all day and into the night without needing to find a wall power outlet.',
      '13.6-Inch Liquid Retina Display: Supports 1 billion colors and 500 nits brightness for vibrant, life-like photos and video.',
      'Fanless Silent Architecture: Operates in total quietness even under heavy computational development loads.'
    ],
    specs: {
      'Brand': 'Apple',
      'Model Name': 'MacBook Air (M2 13-inch)',
      'Processor': 'Apple M2 chip (8-core CPU / 8-core GPU)',
      'RAM': '8GB Unified Memory',
      'Storage': '256GB High-Speed SSD',
      'Display': '13.6-inch Liquid Retina with True Tone (2560 x 1664)',
      'Weight': '1.24 kg'
    },
    tags: ['electronics', 'laptop', 'apple', 'macbook', 'm2', 'lightweight', 'student', 'battery'],
    isFeatured: true,
    createdAt: new Date('2026-01-10').toISOString(),
    updatedAt: new Date('2026-01-10').toISOString()
  },
  {
    id: 'prod_elec_samsung_s24',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Samsung Galaxy S24 5G (8GB RAM, 256GB Storage, Galaxy AI, 50MP ProVisual Camera, 6.2" Dynamic AMOLED 2X 120Hz, Onyx Black)',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Unleash mobile intelligence with Galaxy AI: Circle to Search, Live Call Translation, and Note Assist. Features armor aluminum frame, 50MP triple camera system, and 2600-nit outdoor display.',
    price: 64999,
    originalPrice: 79999,
    discount: 19,
    stock: 18,
    rating: 4.7,
    reviewsCount: 880,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '1K+ bought in past month',
    warranty: '1 Year Samsung India Manufacturer Warranty',
    aboutItem: [
      'Built-in Galaxy AI Suite: Instant Circle to Search with Google, real-time live phone call interpretation, and Photo Assist.',
      '50MP Triple Camera with ProVisual Engine: High-resolution detail and AI Nightography capture true-to-life portraits.',
      '6.2" Dynamic AMOLED 2X Display: Up to 2600 nits peak brightness and adaptive 1-120Hz refresh rate for fluid scrolling.',
      'Enhanced Armor Aluminum Frame: Tough aerospace-grade satin finish with IP68 dust and water resistance.',
      '7 Generations of OS Upgrades: Long-term longevity guaranteed with 7 years of Android OS and security updates.'
    ],
    specs: {
      'Brand': 'Samsung',
      'Model Name': 'Galaxy S24 5G',
      'Display': '6.2-inch Dynamic AMOLED 2X, FHD+ (2340 x 1080), 120Hz, 2600 nits',
      'RAM & Storage': '8GB LPDDR5X RAM / 256GB UFS 4.0',
      'Rear Cameras': '50MP (OIS) Main + 12MP Ultra-Wide + 10MP (3x Optical Telephoto)',
      'Battery': '4000 mAh with 25W Fast Charging and Wireless PowerShare',
      'Weight': '167 Grams'
    },
    tags: ['electronics', 'smartphones', 'samsung', 'galaxy s24', 'ai', '5g', 'flagship', 'android'],
    isFeatured: false,
    createdAt: new Date('2026-01-11').toISOString(),
    updatedAt: new Date('2026-01-11').toISOString()
  },
  {
    id: 'prod_elec_ps5_slim',
    sellerId: 'user_seller_1',
    sellerName: 'TechVibe Electronics',
    name: 'Sony PlayStation 5 Slim Console (Disc Edition with 1TB Ultra-High Speed Custom SSD, 4K Ray Tracing, DualSense Wireless Controller)',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Experience lightning-fast loading with an ultra-high speed 1TB SSD, deeper gaming immersion with haptic feedback, adaptive triggers, 3D Audio, and an all-new slim profile.',
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    stock: 12,
    rating: 4.9,
    reviewsCount: 1450,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '1 Year Sony India Official Warranty',
    aboutItem: [
      'Slim & Compact Hardware Design: 30% smaller volume and lighter weight with detachable Ultra HD Blu-ray disc drive.',
      'Massive 1TB Custom NVMe SSD: Store and launch games in seconds with 5.5 GB/s raw read bandwidth.',
      'DualSense Wireless Controller: Feel dynamic haptic feedback and tension-responsive adaptive triggers in your palms.',
      'Ray Tracing Realism: Individually simulated rays of light create true-to-life reflections and shadows in supported games.',
      'Up to 120fps with 120Hz Output: Enjoy smooth high-frame-rate gameplay on 4K compatible displays.'
    ],
    specs: {
      'Brand': 'Sony',
      'Model Name': 'PlayStation 5 Slim (CFI-2000 Model)',
      'Storage': '1TB Custom PCIe 4.0 NVMe SSD',
      'Optical Drive': 'Ultra HD Blu-ray Disc Drive (Detachable)',
      'Resolution Support': '4K 120Hz, 8K output, HDR',
      'Audio': 'Tempest 3D AudioTech',
      'Included Accessories': 'DualSense Wireless Controller, 2 Horizontal Stand Feet, HDMI 2.1 Cable'
    },
    tags: ['electronics', 'gaming', 'playstation', 'ps5', 'console', 'sony', 'dualsense'],
    isFeatured: true,
    createdAt: new Date('2026-01-12').toISOString(),
    updatedAt: new Date('2026-01-12').toISOString()
  },

  // ============================================================
  // 2. HOME DECOR (BUDGET, MID-RANGE & LUXURY ACCENTS)
  // ============================================================
  {
    id: 'prod_decor_flame_diffuser',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'AuraFlame Ultrasonic Flame Ambient Aromatherapy Diffuser & Air Humidifier (7 LED Flame Colors, Essential Oil Basin, Auto-Off)',
    brand: 'AuraFlame',
    category: 'Home Decor',
    description: 'Elevate your sanctuary with mesmerizing realistic flame mist illumination. Operates whisper-quietly with high-frequency ultrasonic waves to diffuse essential oils and moisturize dry ambient air.',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    stock: 40,
    rating: 4.6,
    reviewsCount: 780,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '3K+ bought in past month',
    warranty: '1 Year Replacement Guarantee',
    aboutItem: [
      'Realistic Simulation Flame Mist: Combination of intelligent LED light and fine ultrasonic mist creates an authentic fireplace visual.',
      'Whisper Quiet 24dB Operation: Relaxes the mind during meditation, deep sleep, yoga, or focused office work without humming.',
      'Aromatherapy Essential Oil Basin: Add 2-3 drops of lavender, eucalyptus, or sandalwood oil directly into the water tank.',
      'Intelligent Auto Waterless Shut-Off: Automatically powers down when water runs low to prevent overheating and dry burning.',
      '7 Color Gradient Ambient Glow: Choose warm amber campfire orange, serene twilight blue, emerald green, or auto-cycling colors.'
    ],
    specs: {
      'Brand': 'AuraFlame',
      'Capacity': '200 ml Tank',
      'Mist Output': '20-30 ml/hour',
      'Power Source': 'USB Type-C (5V/2A)',
      'Material': 'BPA-Free Matte Polypropylene & ABS',
      'Dimensions': '17.1 x 7.5 x 10.1 cm',
      'Timer Modes': 'Continuous, 1 Hour, 3 Hours, 5 Hours'
    },
    tags: ['home decor', 'aromatherapy', 'diffuser', 'humidifier', 'flame', 'wellness', 'relaxation', 'bedroom'],
    isFeatured: true,
    createdAt: new Date('2026-01-13').toISOString(),
    updatedAt: new Date('2026-01-13').toISOString()
  },
  {
    id: 'prod_decor_nordic_vases',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Nordic Fluted Matte Ceramic Vases - Minimalist Set of 3 (Handcrafted Stoneware, Neutral Sand & Charcoal, Pampas Grass Accent)',
    brand: 'Nordic Haven',
    category: 'Home Decor',
    description: 'A striking trio of fluted geometric ceramic stoneware vases. Featuring tactile matte textured glazes in complementary warm sand, chalk ivory, and slate charcoal to anchor any modern mantel or coffee table.',
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    stock: 35,
    rating: 4.8,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '1K+ bought in past month',
    warranty: 'Breakage-Free Arrival Guarantee',
    aboutItem: [
      'Artisan Handcrafted Ceramic: Kiln-fired at 1300°C for exceptional structural density, water resistance, and matte durability.',
      'Complementary Trio Proportions: Includes tall ribbed vase (24cm), round donut silhouette (18cm), and fluted teardrop (14cm).',
      'Scratch-Proof Padded Bases: Non-slip felt pads on the bottom protect glass, marble, and delicate wooden furniture finishes.',
      'Waterproof Interior Glaze: Suitable for fresh-cut botanical flowers as well as dried pampas grass and eucalyptus stems.',
      'Sculptural Statement Art: Beautiful as standalone modern minimalist abstract sculptures even without floral arrangements.'
    ],
    specs: {
      'Brand': 'Nordic Haven',
      'Material': 'High-Density Matte Ceramic Stoneware',
      'Quantity': 'Set of 3 Vases',
      'Finishes': 'Sand Dune Matte, Chalk White, Charcoal Slate',
      'Dimensions (Tall)': '24 cm H x 8.5 cm W',
      'Dimensions (Round)': '18 cm H x 12 cm W',
      'Care': 'Hand wash with mild damp cloth'
    },
    tags: ['home decor', 'vases', 'ceramic', 'nordic', 'scandinavian', 'minimalist', 'living room', 'tabletop'],
    isFeatured: false,
    createdAt: new Date('2026-01-14').toISOString(),
    updatedAt: new Date('2026-01-14').toISOString()
  },
  {
    id: 'prod_decor_brass_shelves',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Artisan Solid Brass Floating Wall Shelves - Set of 2 (Hand-Brushed Satin Gold Finish, Heavy-Duty Concealed Mounting, 24" Length)',
    brand: 'Atelier Brass',
    category: 'Home Decor',
    description: 'Luxurious architectural floating ledges crafted from 100% solid brass with a protective clear coat over hand-brushed satin gold. Engineered with concealed steel brackets to support up to 15 kg per shelf.',
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    stock: 25,
    rating: 4.7,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '400+ bought in past month',
    warranty: '5 Years Structural & Anti-Tarnish Guarantee',
    aboutItem: [
      '100% Solid Heavy Brass: Thick gauge plate construction resists bending, sagging, or warping over decades of use.',
      'Anti-Tarnish Protective Lacquer: Sealed against moisture and humidity, making them ideal for bathrooms, kitchens, and lounges.',
      'Seamless Concealed Floating Mount: Completely hides screw heads and brackets for a clean gallery-grade presentation.',
      'Heavy Weight Capacity: Holds up to 15 kg per ledge—perfect for books, framed art prints, trailing plants, and luxury perfumes.',
      'Complete Installation Kit: Includes heavy-duty drywall anchors, masonry plugs, precision level, and stainless steel hardware.'
    ],
    specs: {
      'Brand': 'Atelier Brass',
      'Material': 'Solid Architectural Brass',
      'Finish': 'Hand-Brushed Satin Gold (Lacquered)',
      'Dimensions': '60 cm L x 12 cm D x 4 cm H (24 x 4.7 inches)',
      'Weight Capacity': '15 kg per shelf',
      'Mounting Type': 'Concealed Floating Wall Mount'
    },
    tags: ['home decor', 'shelves', 'brass', 'floating shelf', 'gold', 'wall decor', 'luxury', 'bathroom'],
    isFeatured: false,
    createdAt: new Date('2026-01-15').toISOString(),
    updatedAt: new Date('2026-01-15').toISOString()
  },
  {
    id: 'prod_decor_zen_fountain',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Kyoto Handcrafted Tabletop Zen Water Fountain (Natural Polished River Stones, Warm LED Accent Glow, Submersible Silent Pump)',
    brand: 'Zenith Living',
    category: 'Home Decor',
    description: 'Bring the soothing natural sounds of trickling stream water into your workspace or meditation room. Handcrafted with textured slate-finish polyresin, tiered ceramic bowls, and smooth river pebbles.',
    price: 4250,
    originalPrice: 6500,
    discount: 35,
    stock: 20,
    rating: 4.6,
    reviewsCount: 290,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Pick',
    boughtInPastMonth: '600+ bought in past month',
    warranty: '1 Year Silent Pump Replacement Warranty',
    aboutItem: [
      'Tranquil Acoustic Ambiance: Natural multi-tier water flow creates gentle babbling brook sounds that mask tinnitus and city noise.',
      'Built-in Warm Illumination: Soft amber waterproof LED creates shimmering reflections across the water ripples.',
      'Ultra-Quiet Recirculating Pump: Low-voltage silent electric pump continuously cycles water without splashing onto desks.',
      'Natural River Stones Included: Includes genuine polished basalt river stones to personalize water sound and aesthetic balance.',
      'Ideal Stress Relief Accent: Creates an authentic Japanese Zen atmosphere for yoga studios, study desks, and therapy clinics.'
    ],
    specs: {
      'Brand': 'Zenith Living',
      'Material': 'Weathered Slate Polyresin & Glazed Ceramic',
      'Dimensions': '21 cm L x 18 cm W x 26 cm H',
      'Power Source': 'Standard Wall Cord (1.8m length, 220V)',
      'Water Capacity': '800 ml Recirculating Basin',
      'Sound Level': 'Less than 20 dB'
    },
    tags: ['home decor', 'water fountain', 'zen', 'meditation', 'relaxation', 'office', 'tabletop'],
    isFeatured: false,
    createdAt: new Date('2026-01-16').toISOString(),
    updatedAt: new Date('2026-01-16').toISOString()
  },
  {
    id: 'prod_decor_arc_floor_lamp',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Japandi Minimalist Dimmable LED Arc Floor Lamp with Solid Travertine Stone Base (Hand-Spun Linen Shade, Stepless Foot Dimmer)',
    brand: 'Lumina Craft',
    category: 'Home Decor',
    description: 'An iconic cantilevered arch floor lamp suspended from a genuine solid travertine stone base. The hand-spun natural oatmeal linen drum shade casts a soft, glare-free warm ambient glow over sofas and reading nooks.',
    price: 6499,
    originalPrice: 11999,
    discount: 46,
    stock: 18,
    rating: 4.8,
    reviewsCount: 380,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '500+ bought in past month',
    warranty: '3 Years Comprehensive Lamp Warranty',
    aboutItem: [
      'Genuine Italian Travertine Stone Base: 8 kg solid honed travertine anchor prevents tipping around pets and playful children.',
      'Stepless Dimming Range (10%-100%): Smooth sliding foot dimmer pedal lets you adjust from gentle nightlight to reading brightness.',
      'Energy-Efficient 2700K Warm LED: Includes long-lasting 12W warm white LED bulb with high CRI 90+ for true color rendering.',
      'Adjustable Overhead Reach: Telescoping matte black steel arm extends from 160 cm to 195 cm height to clear sectional sofas.',
      'Hand-Spun Natural Oatmeal Linen: Textured organic woven shade diffuses light 360 degrees without harsh hotspots.'
    ],
    specs: {
      'Brand': 'Lumina Craft',
      'Base Material': 'Solid Natural Travertine Marble (8 kg)',
      'Arm Material': 'Matte Powder-Coated Carbon Steel',
      'Shade Material': 'Hand-Woven Natural Oatmeal Linen',
      'Height Range': '160 cm to 195 cm (Adjustable)',
      'Bulb Included': '12W E27 Dimmable LED (2700K Warm White, 1100 Lumens)',
      'Switch Type': 'Stepless Foot Dimmer Switch'
    },
    tags: ['home decor', 'lighting', 'floor lamp', 'arc lamp', 'japandi', 'minimalist', 'living room', 'travertine'],
    isFeatured: true,
    createdAt: new Date('2026-01-17').toISOString(),
    updatedAt: new Date('2026-01-17').toISOString()
  },
  {
    id: 'prod_decor_beni_rug',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Moroccan Beni Ourain Handwoven Geometric Wool Area Rug (5x7 Feet, 100% High-Pile New Zealand Wool, Plush Ivory & Charcoal)',
    brand: 'Atlas Artisan',
    category: 'Home Decor',
    description: 'Indulgently thick and soft underfoot, this authentic Berber-style geometric area rug is hand-knotted by master weavers using 100% pure undyed New Zealand virgin wool with hand-braided fringe tassels.',
    price: 12999,
    originalPrice: 21999,
    discount: 41,
    stock: 14,
    rating: 4.9,
    reviewsCount: 220,
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '200+ bought in past month',
    warranty: 'Lifetime Weaving Craftsmanship Guarantee',
    aboutItem: [
      '100% Pure Virgin New Zealand Wool: Natural lanolin-coated wool provides supreme stain resistance and cloud-like warmth.',
      'Generous 1.2-Inch Plush Pile Height: High-density knotting delivers deep cushioned comfort for bare feet in bedrooms and lounges.',
      'Classic Diamond Trellis Motif: Asymmetrical tribal charcoal linework on creamy unbleached ivory adds organic rhythm.',
      'Naturally Hypoallergenic & Flame-Retardant: Non-toxic natural fiber composition free from VOCs, synthetic glues, and microplastics.',
      'Hand-Braided Fringe Accents: Traditional fringed ends celebrate generational North African weaving heritage.'
    ],
    specs: {
      'Brand': 'Atlas Artisan',
      'Material': '100% New Zealand Wool with Cotton Weft',
      'Dimensions': '5 x 7 Feet (152 x 213 cm)',
      'Pile Height': '30 mm (1.2 Inches Plush High-Pile)',
      'Construction': 'Hand-Knotted Berber Weave',
      'Origin': 'Artisan Handcrafted',
      'Backing': 'Natural Cotton Warp'
    },
    tags: ['home decor', 'rug', 'area rug', 'wool', 'moroccan', 'beni ourain', 'carpet', 'boho', 'plush'],
    isFeatured: true,
    createdAt: new Date('2026-01-18').toISOString(),
    updatedAt: new Date('2026-01-18').toISOString()
  },
  {
    id: 'prod_decor_lounge_chair',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Modern Velvet Swivel Accent Armchair with Brushed Gold Base (High-Density Foam Cushioning, Ergonomic Barrel Back, Forest Emerald)',
    brand: 'Velvet & Co.',
    category: 'Home Decor',
    description: 'A showstopping statement lounge chair wrapped in stain-resistant performance velvet. Features an enveloping 360-degree silent swivel mechanism and brushed brass base for reading rooms, master suites, and modern lounges.',
    price: 21999,
    originalPrice: 32000,
    discount: 31,
    stock: 10,
    rating: 4.8,
    reviewsCount: 175,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Pick',
    boughtInPastMonth: '150+ bought in past month',
    warranty: '5 Years Frame & Mechanism Warranty',
    aboutItem: [
      'Performance Spill-Resistant Velvet: Hydrophobic fabric coating repels liquids and accidental stains for effortless wipe-down cleaning.',
      'Ultra-Smooth 360° Ball-Bearing Swivel: Concealed steel swivel platform rotates effortlessly without grinding or wobble.',
      'High-Resilience Dual-Layer Cushioning: High-density pocket spring core wrapped in fiberfill maintains crisp silhouette.',
      'Ergonomic Curved Barrel Backrest: Wraps around the lumbar spine to support natural posture during long reading sessions.',
      'Reinforced Kiln-Dried Hardwood Frame: Solid engineered frame tested to withstand up to 150 kg static load.'
    ],
    specs: {
      'Brand': 'Velvet & Co.',
      'Upholstery': 'Commercial-Grade Performance Velvet (Stain Resistant)',
      'Base': 'Heavy Cast Stainless Steel with Brushed Brass Finish',
      'Dimensions': '82 cm W x 78 cm D x 76 cm H',
      'Seat Height': '44 cm',
      'Max Weight Load': '150 kg (330 lbs)',
      'Color': 'Forest Emerald Green'
    },
    tags: ['home decor', 'chair', 'armchair', 'velvet', 'lounge', 'furniture', 'swivel', 'living room'],
    isFeatured: true,
    createdAt: new Date('2026-01-19').toISOString(),
    updatedAt: new Date('2026-01-19').toISOString()
  },
  {
    id: 'prod_decor_walnut_desk',
    sellerId: 'user_seller_decor',
    sellerName: 'Nordic Haven Living',
    name: 'Handcrafted Solid American Walnut Writing & Executive Desk (Natural Live-Edge Bevel, Dual Soft-Close Drawers, Cable Management Tray)',
    brand: 'Timber & Grain',
    category: 'Home Decor',
    description: 'An heirloom executive writing desk master-crafted from sustainably harvested American black walnut. Features continuous grain waterfall bevels, solid mortise-and-tenon joinery, and integrated brushed aluminum cable trough.',
    price: 28500,
    originalPrice: 42000,
    discount: 32,
    stock: 8,
    rating: 4.9,
    reviewsCount: 140,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '100+ bought in past month',
    warranty: '10 Years Structural Hardwood Warranty',
    aboutItem: [
      '100% Solid American Black Walnut: No MDF, particle board, or fake veneers; pure FSC-certified kiln-dried hardwood.',
      'Continuous Waterfall Grain Match: Wood slabs are carefully paired across drawer fronts to preserve seamless natural grain waves.',
      'Blum Soft-Close Undermount Slides: Dual deep stationery drawers glide shut in absolute silence with integrated finger pulls.',
      'Concealed Power & Cable Management: Under-desk magnetic cord tray and rear cable passthrough keep cords completely hidden.',
      'Natural Matte Hardwax Oil Finish: Hand-rubbed European plant oil seals the wood while retaining its authentic raw tactile warmth.'
    ],
    specs: {
      'Brand': 'Timber & Grain',
      'Material': '100% Solid FSC American Black Walnut',
      'Finish': 'Osmo Natural Hardwax Polyx Oil (Zero VOC)',
      'Dimensions': '135 cm L x 65 cm W x 75 cm H (53 x 25.5 x 29.5 inches)',
      'Drawers': '2x Solid Oak Dovetail Soft-Close Drawers',
      'Legs': 'Chamfered Solid Walnut Tapered A-Frame Legs',
      'Weight': '38 kg'
    },
    tags: ['home decor', 'desk', 'walnut', 'solid wood', 'furniture', 'office', 'executive', 'workspace'],
    isFeatured: true,
    createdAt: new Date('2026-01-20').toISOString(),
    updatedAt: new Date('2026-01-20').toISOString()
  },

  // ============================================================
  // 3. FASHION (EVERYDAY BASICS, ACCESSORIES & LUXURY WEAR)
  // ============================================================
  {
    id: 'prod_fashion_uniqlo_tee',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Heavyweight Organic Cotton Oversized Crewneck T-Shirt - Pack of 2 (280 GSM Compact Spun Cotton, Drop Shoulder, Vintage White & Black)',
    brand: 'Atelier Basics',
    category: 'Fashion',
    description: 'The definitive luxury heavyweight tee. Crafted from dense 280 GSM combed organic cotton with a structured boxy drape, reinforced herringbone neckband, and anti-shrink enzyme wash finish.',
    price: 1290,
    originalPrice: 2490,
    discount: 48,
    stock: 50,
    rating: 4.5,
    reviewsCount: 960,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '4K+ bought in past month',
    warranty: 'Wash & Wear Anti-Shrink Guarantee',
    aboutItem: [
      'Heavyweight 280 GSM Combed Cotton: Substantial, non-see-through fabric holds a crisp architectural silhouette all day.',
      'Drop-Shoulder Boxy Streetwear Cut: Contemporary relaxed drape tailored through the chest with an untucked waistline.',
      'Double-Needle Ribbed Collar: Bound 1.25" crewneck collar with reinforced tape prevents sagging or stretching over repeated washes.',
      'Pre-Shrunk Bio-Enzyme Washed: Pre-laundered fabric eliminates shrinkage and delivers an ultra-soft peached surface feel.',
      'Versatile Twin-Pack Palette: Includes one Vintage Chalk White and one Washed Obsidian Black essential tee.'
    ],
    specs: {
      'Brand': 'Atelier Basics',
      'Material': '100% GOTS-Certified Organic Combed Cotton',
      'Fabric Weight': '280 GSM (Heavyweight)',
      'Fit': 'Oversized Boxy Fit (Drop Shoulder)',
      'Pack Contents': '2 T-Shirts (1 Vintage White + 1 Obsidian Black)',
      'Care': 'Machine wash cold inside-out, tumble dry low'
    },
    tags: ['fashion', 't-shirt', 'basics', 'cotton', 'oversized', 'streetwear', 'apparel', 'menswear', 'budget'],
    isFeatured: false,
    createdAt: new Date('2026-01-21').toISOString(),
    updatedAt: new Date('2026-01-21').toISOString()
  },
  {
    id: 'prod_fashion_sunglasses_rayban',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Ray-Ban Classic Polarized Aviator Sunglasses (Gold Metal Monel Frame, Crystal Green G-15 Polarized Lens, 100% UV400 Protection)',
    brand: 'Ray-Ban',
    category: 'Fashion',
    description: 'An enduring timeless icon since 1937. Featuring teardrop crystal G-15 polarized mineral glass lenses encased in lightweight monel gold alloy with adjustable hypoallergenic silicone nose pads.',
    price: 8590,
    originalPrice: 11290,
    discount: 24,
    stock: 28,
    rating: 4.8,
    reviewsCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    badge: "Amazon's Choice",
    boughtInPastMonth: '2K+ bought in past month',
    warranty: '2 Years Manufacturer International Warranty',
    aboutItem: [
      'Authentic Crystal G-15 Polarized Lenses: Absorbs 85% of visible light and blocks blinding surface glare from roads and water.',
      '100% UV400 Protection: Shields the corneas against harmful UVA and UVB radiation without altering color accuracy.',
      'Corrosion-Resistant Gold Monel Alloy: Lightweight yet exceptionally resilient temple arms withstand bending and humid climates.',
      'Adjustable Soft Silicone Nose Pads: Comfortably conforms to any bridge shape for all-day slip-free wearing.',
      'Original Italian Leather Case Included: Comes with protective embossed case, microfiber polishing cloth, and authenticity card.'
    ],
    specs: {
      'Brand': 'Ray-Ban',
      'Model': 'RB3025 Aviator Classic',
      'Frame Material': 'Gold Monel Metal Alloy',
      'Lens Material': 'Crystal Mineral Glass (Polarized G-15 Green)',
      'Lens Width': '58 mm (Standard)',
      'Bridge Width': '14 mm',
      'Temple Length': '135 mm'
    },
    tags: ['fashion', 'sunglasses', 'ray-ban', 'aviator', 'accessories', 'polarized', 'eyewear'],
    isFeatured: true,
    createdAt: new Date('2026-01-22').toISOString(),
    updatedAt: new Date('2026-01-22').toISOString()
  },
  {
    id: 'prod_fashion_selvedge_denim',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Japanese Kurabo Mill 14oz Selvedge Raw Denim Jeans (Red-Line Shuttle Loom Edge, Slim Straight Fit, Pure Indigo Rope Dye)',
    brand: 'Kurabo Artisans',
    category: 'Fashion',
    description: 'Woven in Kojima, Japan on vintage Toyoda shuttle looms. Features 14oz unwashed raw selvedge denim, pure indigo rope-dyeing that develops unique high-contrast fades with wear, and custom copper hardware.',
    price: 9499,
    originalPrice: 14999,
    discount: 37,
    stock: 22,
    rating: 4.7,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '400+ bought in past month',
    warranty: 'Lifetime Rivet & Stitching Guarantee',
    aboutItem: [
      'Authentic Vintage Shuttle Loom Weave: Distinctive red-and-white selvedge ticker edge visible when cuffs are turned up.',
      '14oz Mid-Heavy Raw Denim: Substantial rigidity that softens and moulds precisely to your body contours over months of wear.',
      'Deep Indigo Rope Dyeing: Pure plant-derived indigo oxidizes into personalized whiskers, honeycombs, and stacks over time.',
      'Solid Copper Punch-Through Rivets: Reinforces pocket stress points alongside hidden back pocket reinforcement rivets.',
      'Vegetable-Tanned Leather Back Patch: 3mm thick saddle leather patch that patinas naturally with sunlight and age.'
    ],
    specs: {
      'Brand': 'Kurabo Artisans',
      'Fabric': '14oz Raw Selvedge Denim (Kurabo Mills, Okayama, Japan)',
      'Composition': '100% Long-Staple Cotton',
      'Fit': 'Slim Straight (Medium Rise)',
      'Fly': 'Button Fly with Antiqued Donut Buttons',
      'Details': 'Chain-stitched hem, hidden rivets, red-line selvedge'
    },
    tags: ['fashion', 'jeans', 'denim', 'selvedge', 'japanese', 'indigo', 'raw denim', 'apparel'],
    isFeatured: false,
    createdAt: new Date('2026-01-23').toISOString(),
    updatedAt: new Date('2026-01-23').toISOString()
  },
  {
    id: 'prod_fashion_cashmere_sweater',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: '100% Pure Mongolian Cashmere Ribbed Turtleneck Sweater (Grade-A 2-Ply Fine Yarn, Thermoregulating, Oatmeal Heather)',
    brand: 'Highland Cashmere',
    category: 'Fashion',
    description: 'An epitome of tactile luxury. Spun from Grade-A Mongolian cashmere fibers averaging 15.2 microns in fineness for cloud-like softness against bare skin, with elegant English ribbing along the collar, cuffs, and hem.',
    price: 11499,
    originalPrice: 18500,
    discount: 38,
    stock: 16,
    rating: 4.9,
    reviewsCount: 240,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '350+ bought in past month',
    warranty: 'Pill-Resistant Fiber Quality Guarantee',
    aboutItem: [
      'Grade-A Pure Mongolian Cashmere: Sourced exclusively from Inner Mongolian goat underfleece for unmatched softness.',
      '2-Ply Twisted Yarn Architecture: Enhanced tensile strength prevents sagging, pilling, or thinning through winters.',
      'Natural Thermoregulation: Keeps you 8 times warmer than sheep wool while weighing a fraction of the mass.',
      'Subtle English Rib Detailing: Structured 2x2 ribbed foldover neck holds its poise under tailored wool blazers or coats.',
      'OEKO-TEX Certified Dyeing: Non-toxic organic dyes preserve fiber integrity and gentle next-to-skin softness.'
    ],
    specs: {
      'Brand': 'Highland Cashmere',
      'Composition': '100% Grade-A Pure Mongolian Cashmere (15.2 micron)',
      'Knit Gauge': '12 Gauge, 2-Ply Fine Yarn',
      'Fit': 'Tailored Regular Fit',
      'Neckline': 'Ribbed Foldover Turtleneck',
      'Care': 'Hand wash in lukewarm water with cashmere shampoo; dry flat'
    },
    tags: ['fashion', 'cashmere', 'sweater', 'turtleneck', 'knitwear', 'luxury', 'winter', 'apparel'],
    isFeatured: true,
    createdAt: new Date('2026-01-24').toISOString(),
    updatedAt: new Date('2026-01-24').toISOString()
  },
  {
    id: 'prod_fashion_chelsea_boots',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Hand-Burnished Tuscan Suede Chelsea Ankle Boots (Blake-Stitched Construction, Natural Crepe Rubber Sole, Snuff Tobacco Brown)',
    brand: 'Cavaliere Firenze',
    category: 'Fashion',
    description: 'Handmade in Tuscany from water-resistant calfskin split suede with rich nap. Blake-stitched to a flexible natural crepe rubber sole with elasticated side gussets and woven pull tabs for effortless slip-on elegance.',
    price: 14999,
    originalPrice: 22500,
    discount: 33,
    stock: 15,
    rating: 4.8,
    reviewsCount: 360,
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Pick',
    boughtInPastMonth: '450+ bought in past month',
    warranty: '2 Years Soling & Leather Craft Guarantee',
    aboutItem: [
      'Full-Grain Italian Calfskin Suede: Velvety textured nap treated with Scotchgard fluoropolymer for weather resistance.',
      'Resoleable Blake Stitching: Leather insole stitched directly to outsole allows multiple resoling cycles over a lifetime.',
      'Natural Plantation Crepe Sole: Delivers cushioned spring-like shock absorption and silent traction on city pavements.',
      'Full Vegetable-Tanned Calf Lining: Absorbs moisture and conforms comfortably to foot shape without odors.',
      'Reinforced Elastic Gussets: Heavy-duty ribbed side webbing retains its snap and shape over thousands of wears.'
    ],
    specs: {
      'Brand': 'Cavaliere Firenze',
      'Upper': 'Italian Calfskin Suede (Water-Resistant Treated)',
      'Lining': '100% Vegetable-Tanned Full-Grain Calfskin',
      'Sole': 'Natural Plantation Crepe Rubber',
      'Construction': 'Blake Welt Stitched (Resoleable)',
      'Origin': 'Handcrafted in Florence, Italy'
    },
    tags: ['fashion', 'boots', 'chelsea boots', 'footwear', 'suede', 'italian', 'leather', 'menswear'],
    isFeatured: false,
    createdAt: new Date('2026-01-25').toISOString(),
    updatedAt: new Date('2026-01-25').toISOString()
  },
  {
    id: 'prod_fashion_canvas_duffle',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Heritage Waxed Heavy Canvas & Full-Grain Leather Weekender Duffle Bag (Waterproof 18oz Duck Canvas, Solid Brass Hardware, 45L)',
    brand: 'Voyager Heritage',
    category: 'Fashion',
    description: 'Built for lifetimes of rugged travel. Crafted from 18oz paraffin-waxed cotton duck canvas trimmed with 4mm vegetable-tanned bridle leather straps, heavy YKK solid brass zippers, and airline carry-on compliant 45L volume.',
    price: 18990,
    originalPrice: 26900,
    discount: 29,
    stock: 12,
    rating: 4.9,
    reviewsCount: 280,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Handcrafted',
    boughtInPastMonth: '300+ bought in past month',
    warranty: 'Lifetime Rugged Craftsmanship Guarantee',
    aboutItem: [
      'Heavy 18oz Martexin Waxed Canvas: Weatherproof cotton fabric repels rain, snow, and trail grime while developing a rugged patina.',
      'Full-Grain Bridle Leather Straps: Double-riveted saddle leather handles and detachable padded shoulder harness.',
      'Indestructible Solid Brass Hardware: Sand-cast brass clasps, D-rings, and heavy #10 YKK two-way main compartment zipper.',
      'Airline Overhead Carry-On Compliant: Dimensions fit comfortably in domestic and international aircraft overhead bins.',
      'Dedicated Interior Shoe Compartment: Water-resistant nylon compartment keeps footwear separate from clean apparel.'
    ],
    specs: {
      'Brand': 'Voyager Heritage',
      'Capacity': '45 Liters',
      'Materials': '18oz Waxed Cotton Duck Canvas & 4mm Bridle Leather',
      'Hardware': 'Solid Sand-Cast Brass & #10 YKK Zippers',
      'Dimensions': '54 cm L x 28 cm W x 30 cm H (21.5 x 11 x 12 inches)',
      'Weight': '1.85 kg',
      'Pockets': '1 Main 45L Cavity, 1 Shoe Tunnel, 2 Internal Zipper Pockets, 1 Passport Stash'
    },
    tags: ['fashion', 'bag', 'duffle bag', 'travel', 'leather', 'waxed canvas', 'weekender', 'luggage'],
    isFeatured: true,
    createdAt: new Date('2026-01-26').toISOString(),
    updatedAt: new Date('2026-01-26').toISOString()
  },
  {
    id: 'prod_fashion_leather_jacket',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Full-Grain Italian Nappa Leather Biker Jacket (Hand-Waxed Aniline Finish, Asymmetrical YKK Brass Hardware, Quilted Satin Lining)',
    brand: 'Sartorial Artisan',
    category: 'Fashion',
    description: 'The quintessential cafe racer moto jacket. Tailored from supple 1.2mm full-grain Italian lamb nappa leather with asymmetrical front closure, dual snap lapels, zippered gusset cuffs, and diamond-quilted insulated satin interior.',
    price: 24999,
    originalPrice: 38000,
    discount: 34,
    stock: 10,
    rating: 4.9,
    reviewsCount: 190,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Rated',
    boughtInPastMonth: '250+ bought in past month',
    warranty: '10 Years Leather Integrity Guarantee',
    aboutItem: [
      '1.2mm Full-Grain Italian Nappa Leather: Incredible buttery handfeel with natural pebble graining that conforms to your shoulders.',
      'Heavy Antiqued Brass Hardware: Industrial-grade #8 YKK zippers, snapped lapel anchors, and adjustable side waist cinches.',
      'Diamond-Quilted Thermal Satin Lining: Glides effortlessly over shirts and knitwear while blocking wind chill on brisk evenings.',
      'Action-Back Bi-Swing Gussets: Ergonomic shoulder folds provide unrestricted arm mobility whether driving or walking.',
      'Four Secure Pockets: Three exterior zippered utility pockets plus interior leather-trimmed passport pocket.'
    ],
    specs: {
      'Brand': 'Sartorial Artisan',
      'Material': '100% Full-Grain Italian Lambskin Nappa (1.2mm)',
      'Lining': 'Diamond-Quilted Cupro Satin with 60g Polyfill',
      'Zippers': 'Antiqued Brass Heavy YKK Excella Hardware',
      'Fit': 'Tailored Slim Moto Cut',
      'Origin': 'Master Artisan Workshop, Milan'
    },
    tags: ['fashion', 'leather jacket', 'moto', 'jacket', 'biker', 'luxury', 'outerwear', 'menswear'],
    isFeatured: true,
    createdAt: new Date('2026-01-27').toISOString(),
    updatedAt: new Date('2026-01-27').toISOString()
  },
  {
    id: 'prod_fashion_seiko_presage',
    sellerId: 'user_seller_fashion',
    sellerName: 'Atelier & Co. Clothiers',
    name: 'Seiko Presage \'Cocktail Time\' Automatic Mechanical Watch (Sunburst Guilloche Dial, Caliber 4R35, Box-Shaped Hardlex, Calfskin Strap)',
    brand: 'Seiko',
    category: 'Fashion',
    description: 'Inspired by Tokyo glamour bars. Features an intricate sunburst guilloche dial coated in seven layers of gloss lacquer, Japanese Caliber 4R35 automatic movement with manual winding, exhibition display caseback, and deployant buckle.',
    price: 38500,
    originalPrice: 46000,
    discount: 16,
    stock: 9,
    rating: 4.9,
    reviewsCount: 380,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '#1 Best Seller',
    boughtInPastMonth: '400+ bought in past month',
    warranty: '3 Years Official Seiko International Warranty',
    aboutItem: [
      'Exquisite Sunburst Guilloche Dial: Hand-finished radial wave texturing captures and reflects ambient light like a cut cocktail glass.',
      'Japanese In-House Caliber 4R35: 23-jewel automatic mechanical movement with 41-hour power reserve and manual hand-winding.',
      'Exhibition Mineral Display Caseback: Admire the gold-toned oscillating balance rotor and escapement in mechanical action.',
      'Box-Shaped Hardlex Crystal: Vintage mid-century domed glass profile with razor-sharp faceted dauphine hands.',
      'Deployant Clasp Calfskin Strap: Genuine alligator-grain embossed leather band with push-button release stainless steel clasp.'
    ],
    specs: {
      'Brand': 'Seiko',
      'Collection': 'Presage Cocktail Time',
      'Movement': 'Automatic Caliber 4R35 (23 Jewels, 21,600 vph, 41-hour reserve)',
      'Case Material': '316L Stainless Steel (Mirror Polished)',
      'Case Diameter': '40.5 mm (Thickness 11.8 mm)',
      'Crystal': 'Box-Shaped Hardlex Crystal',
      'Water Resistance': '50 Meters (5 Bar / 165 Feet)'
    },
    tags: ['fashion', 'watch', 'automatic watch', 'seiko', 'presage', 'luxury', 'accessories', 'timepiece'],
    isFeatured: true,
    createdAt: new Date('2026-01-28').toISOString(),
    updatedAt: new Date('2026-01-28').toISOString()
  },
  ...allNewProducts
];

export const expandedCatalogProducts = initialProducts;
