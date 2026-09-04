import fs from 'fs';
import path from 'path';
import { initialProducts } from '../server/catalogData';
import type { DatabaseSchema, Product, User } from '../server/db';
import { hashPassword } from '../server/db';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

export function seedDatabase(options: { forceReset?: boolean } = {}) {
  console.log('='.repeat(70));
  console.log(' 🚀 AgentCart Product Catalog Database Seeding Script');
  console.log('='.repeat(70));

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  let dbData: DatabaseSchema;

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbData = JSON.parse(raw);
    } catch (err) {
      console.warn('⚠️ Existing db.json could not be parsed. Initializing fresh schema.');
      dbData = {
        users: [],
        addresses: [],
        products: [],
        carts: [],
        orders: [],
        payments: [],
        emailLogs: []
      };
    }
  } else {
    dbData = {
      users: [],
      addresses: [],
      products: [],
      carts: [],
      orders: [],
      payments: [],
      emailLogs: []
    };
  }

  // Ensure supplementary sellers exist in users collection for multi-seller authenticity
  const additionalSellers: User[] = [
    {
      id: 'user_seller_decor',
      email: 'decor@agentcart.com',
      name: 'Nordic Haven Living',
      storeName: 'Nordic Haven Studio',
      role: 'SELLER',
      phone: '+91 98765 22334',
      ...hashPassword('Seller@123', 'seed_salt_seller_decor'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_decor').hash,
      salt: 'seed_salt_seller_decor',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_fashion',
      email: 'fashion@agentcart.com',
      name: 'Atelier & Co. Clothiers',
      storeName: 'Atelier & Co.',
      role: 'SELLER',
      phone: '+91 98765 33445',
      ...hashPassword('Seller@123', 'seed_salt_seller_fashion'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_fashion').hash,
      salt: 'seed_salt_seller_fashion',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_kitchen',
      email: 'kitchen@agentcart.com',
      name: 'Chef\'s Atelier Supply',
      storeName: 'Gourmet Kitchen Lab',
      role: 'SELLER',
      phone: '+91 98765 44556',
      ...hashPassword('Seller@123', 'seed_salt_seller_kitchen'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_kitchen').hash,
      salt: 'seed_salt_seller_kitchen',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_fitness',
      email: 'fitness@agentcart.com',
      name: 'Apex Performance Gear',
      storeName: 'Apex Sports & Outdoors',
      role: 'SELLER',
      phone: '+91 98765 55667',
      ...hashPassword('Seller@123', 'seed_salt_seller_fitness'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_fitness').hash,
      salt: 'seed_salt_seller_fitness',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_beauty',
      email: 'beauty@agentcart.com',
      name: 'Aura Botanical & Grooming',
      storeName: 'Aura Apothecary',
      role: 'SELLER',
      phone: '+91 98765 66778',
      ...hashPassword('Seller@123', 'seed_salt_seller_beauty'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_beauty').hash,
      salt: 'seed_salt_seller_beauty',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_stationery',
      email: 'stationery@agentcart.com',
      name: 'Kyoto Fine Desk & Paper',
      storeName: 'Craftsman Desk Works',
      role: 'SELLER',
      phone: '+91 98765 77889',
      ...hashPassword('Seller@123', 'seed_salt_seller_stationery'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_stationery').hash,
      salt: 'seed_salt_seller_stationery',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'user_seller_pets',
      email: 'pets@agentcart.com',
      name: 'Paws & Tail Pet Care',
      storeName: 'Pawsome Essentials',
      role: 'SELLER',
      phone: '+91 98765 88990',
      ...hashPassword('Seller@123', 'seed_salt_seller_pets'),
      passwordHash: hashPassword('Seller@123', 'seed_salt_seller_pets').hash,
      salt: 'seed_salt_seller_pets',
      createdAt: new Date('2026-01-01').toISOString(),
      updatedAt: new Date('2026-01-01').toISOString()
    }
  ];

  if (!dbData.users) dbData.users = [];
  for (const seller of additionalSellers) {
    if (!dbData.users.some(u => u.id === seller.id)) {
      dbData.users.push(seller);
    }
  }

  // Update products in dbData
  const productsToSeed: Product[] = initialProducts;
  dbData.products = productsToSeed;

  // Metadata Validation Check
  let validProductsCount = 0;
  const missingMetadataReport: string[] = [];

  for (const p of productsToSeed) {
    const missing: string[] = [];
    if (!p.id) missing.push('id');
    if (!p.name) missing.push('name');
    if (!p.brand) missing.push('brand');
    if (!p.category) missing.push('category');
    if (!p.description) missing.push('description');
    if (typeof p.price !== 'number') missing.push('price');
    if (!p.images || p.images.length === 0) missing.push('images');
    if (!p.specs || Object.keys(p.specs).length === 0) missing.push('specs');
    if (!p.tags || p.tags.length === 0) missing.push('tags');
    if (!p.aboutItem || p.aboutItem.length === 0) missing.push('aboutItem');
    if (!p.badge) missing.push('badge');
    if (!p.boughtInPastMonth) missing.push('boughtInPastMonth');
    if (!p.warranty) missing.push('warranty');

    if (missing.length > 0) {
      missingMetadataReport.push(`${p.name} (${p.id}): Missing [${missing.join(', ')}]`);
    } else {
      validProductsCount++;
    }
  }

  // Atomic Write to db.json
  const tempPath = `${DB_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(dbData, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE);

  // Grouping Analysis for Summary Output
  const categories = Array.from(new Set(productsToSeed.map(p => p.category)));
  const budgetProducts = productsToSeed.filter(p => p.price < 2000);
  const midRangeProducts = productsToSeed.filter(p => p.price >= 2000 && p.price <= 25000);
  const premiumProducts = productsToSeed.filter(p => p.price > 25000);

  console.log(`\n✅ Successfully seeded ${productsToSeed.length} products to:`);
  console.log(`   ${DB_FILE}`);
  console.log(`\n📊 Metadata Verification:`);
  console.log(`   - Complete coverage: ${validProductsCount}/${productsToSeed.length} items`);
  if (missingMetadataReport.length > 0) {
    console.warn(`   ⚠️ Warning: Some items had missing fields:`);
    missingMetadataReport.forEach(m => console.warn(`     - ${m}`));
  } else {
    console.log(`   - 100% full coverage of Amazon-style specs, badges, warranties & 'about item' bullets.`);
  }

  console.log(`\n🏷️ Category Breakdown:`);
  for (const cat of categories) {
    const items = productsToSeed.filter(p => p.category === cat);
    const minPrice = Math.min(...items.map(p => p.price));
    const maxPrice = Math.max(...items.map(p => p.price));
    console.log(`   • ${cat.padEnd(16)}: ${items.length.toString().padStart(2)} products (Range: ₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')})`);
  }

  console.log(`\n💰 Price Range Spectrum:`);
  console.log(`   • Budget (< ₹2,000)            : ${budgetProducts.length} products (e.g., boAt Earbuds, Aroma Diffuser, Ceramic Vases, Heavyweight Tee)`);
  console.log(`   • Mid-Range (₹2,000 - ₹25,000)  : ${midRangeProducts.length} products (e.g., MagSafe Cube, Echo Show, Arc Floor Lamp, Beni Ourain Rug, Ray-Ban Aviators, Tuscan Boots)`);
  console.log(`   • Premium (> ₹25,000)          : ${premiumProducts.length} products (e.g., Sony WH-1000XM5, PS5 Slim, MacBook Air M2, Walnut Writing Desk, Seiko Presage Watch)`);

  console.log('\n✨ Database seeding completed successfully!\n');
  return {
    totalSeeded: productsToSeed.length,
    validProductsCount,
    categoriesCount: categories.length
  };
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('seed')) {
  seedDatabase();
}
