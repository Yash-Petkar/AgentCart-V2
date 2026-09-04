import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { initialProducts } from './catalogData';

export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
  role: UserRole;
  phone?: string;
  storeName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: Record<string, string>;
  tags: string[];
  isFeatured?: boolean;
  aboutItem?: string[];
  badge?: string;
  boughtInPastMonth?: string;
  warranty?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  priceAtPurchase: number;
  quantity: number;
  subtotal: number;
  sellerId: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  shippingAddress: Address;
  emailNotificationSent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'CREATED' | 'SUCCESS' | 'FAILED';
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  errorReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailNotificationLog {
  id: string;
  orderId: string;
  recipientEmail: string;
  subject: string;
  status: 'SENT' | 'QUEUED' | 'FAILED';
  sentAt: string;
  htmlContent: string;
}

export interface DatabaseSchema {
  users: User[];
  addresses: Address[];
  products: Product[];
  carts: Cart[];
  orders: Order[];
  payments: PaymentTransaction[];
  emailLogs: EmailNotificationLog[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Password helper using PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const result = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return result === hash;
}

// Initial Seed Data
const initialUsers: User[] = [
  {
    id: 'user_cust_1',
    email: 'customer@agentcart.com',
    name: 'Yash Sharma',
    role: 'CUSTOMER',
    phone: '+91 98765 43210',
    ...hashPassword('Customer@123', 'seed_salt_cust_1'),
    passwordHash: hashPassword('Customer@123', 'seed_salt_cust_1').hash,
    salt: 'seed_salt_cust_1',
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'user_seller_1',
    email: 'seller@agentcart.com',
    name: 'TechVibe Official Store',
    storeName: 'TechVibe Electronics',
    role: 'SELLER',
    phone: '+91 98765 11223',
    ...hashPassword('Seller@123', 'seed_salt_seller_1'),
    passwordHash: hashPassword('Seller@123', 'seed_salt_seller_1').hash,
    salt: 'seed_salt_seller_1',
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'user_admin_1',
    email: 'admin@agentcart.com',
    name: 'System Admin',
    role: 'ADMIN',
    phone: '+91 98765 99887',
    ...hashPassword('Admin@123', 'seed_salt_admin_1'),
    passwordHash: hashPassword('Admin@123', 'seed_salt_admin_1').hash,
    salt: 'seed_salt_admin_1',
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date('2026-01-01').toISOString(),
  }
];

const initialAddresses: Address[] = [
  {
    id: 'addr_1',
    userId: 'user_cust_1',
    fullName: 'Yash Sharma',
    street: 'Flat 402, Lotus Grand Residences, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true,
  }
];

class Database {
  private data: DatabaseSchema;
  private isWriting = false;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        
        // Merge initial catalog products with persisted products
        const existingProducts: Product[] = parsed.products || [];
        const existingProductMap = new Map(existingProducts.map(p => [p.id, p]));
        const mergedProducts = [...existingProducts];

        for (const initP of initialProducts) {
          if (!existingProductMap.has(initP.id)) {
            mergedProducts.push(initP);
          } else {
            // Update metadata like images, specs, aboutItem, badge, warranty while preserving current stock
            const existing = existingProductMap.get(initP.id)!;
            Object.assign(existing, {
              ...initP,
              stock: existing.stock !== undefined ? existing.stock : initP.stock,
            });
          }
        }

        const schema: DatabaseSchema = {
          users: parsed.users || initialUsers,
          addresses: parsed.addresses || initialAddresses,
          products: mergedProducts,
          carts: parsed.carts || [],
          orders: parsed.orders || [],
          payments: parsed.payments || [],
          emailLogs: parsed.emailLogs || [],
        };
        this.saveImmediate(schema);
        return schema;
      }
    } catch (err) {
      console.error('[DB] Error loading db.json, falling back to defaults', err);
    }

    const defaultData: DatabaseSchema = {
      users: initialUsers,
      addresses: initialAddresses,
      products: initialProducts,
      carts: [],
      orders: [],
      payments: [],
      emailLogs: [],
    };
    this.saveImmediate(defaultData);
    return defaultData;
  }

  private saveImmediate(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const tempPath = `${DB_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('[DB] Error saving db.json', err);
    }
  }

  public save() {
    this.saveImmediate(this.data);
  }

  public reload(): DatabaseSchema {
    this.data = this.load();
    return this.data;
  }

  // Users
  public getUsers(): User[] {
    return this.data.users;
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public addUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.data.users[idx] = { ...this.data.users[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.users[idx];
  }

  // Addresses
  public getAddresses(userId: string): Address[] {
    return this.data.addresses.filter(a => a.userId === userId);
  }

  public addAddress(address: Address): Address {
    if (address.isDefault) {
      this.data.addresses.forEach(a => {
        if (a.userId === address.userId) a.isDefault = false;
      });
    }
    this.data.addresses.push(address);
    this.save();
    return address;
  }

  public deleteAddress(id: string, userId: string): boolean {
    const len = this.data.addresses.length;
    this.data.addresses = this.data.addresses.filter(a => !(a.id === id && a.userId === userId));
    if (this.data.addresses.length !== len) {
      this.save();
      return true;
    }
    return false;
  }

  // Products
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    if (!id) return undefined;
    const direct = this.data.products.find(p => p.id === id);
    if (direct) return direct;

    // Backward-compatibility alias map for previously seeded IDs
    const aliasMap: Record<string, string> = {
      'prod_lenovo_loq': 'prod_elec_lenovo_loq',
      'prod_sony_wh1000xm5': 'prod_elec_sony_headphones',
      'prod_acer_nitro_v': 'prod_elec_lenovo_loq',
      'prod_apple_macbook_air_m2': 'prod_elec_apple_macbook_air',
      'prod_anker_prime_powerbank': 'prod_elec_anker_cube',
    };

    if (aliasMap[id]) {
      const aliasMatch = this.data.products.find(p => p.id === aliasMap[id]);
      if (aliasMatch) return aliasMatch;
    }

    // Fuzzy matching for category-prefixed IDs
    const cleanId = id.replace(/^prod_(elec_|decor_|fashion_|kitchen_|fit_|beauty_|prod_|pet_)?/, '');
    if (cleanId.length >= 4) {
      const fuzzyMatch = this.data.products.find(p => p.id.includes(cleanId));
      if (fuzzyMatch) return fuzzyMatch;
    }

    return undefined;
  }

  public addProduct(product: Product): Product {
    this.data.products.push(product);
    this.save();
    return product;
  }

  public updateProduct(id: string, updates: Partial<Product>, sellerId?: string): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    if (sellerId && this.data.products[idx].sellerId !== sellerId) {
      return null; // unauthorized
    }
    this.data.products[idx] = { ...this.data.products[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.products[idx];
  }

  public deleteProduct(id: string, sellerId?: string): boolean {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    if (sellerId && this.data.products[idx].sellerId !== sellerId) {
      return false; // unauthorized
    }
    this.data.products.splice(idx, 1);
    this.save();
    return true;
  }

  // Atomic stock decrement with race-condition prevention
  public atomicDecrementStock(items: { productId: string; quantity: number }[]): boolean {
    // 1. First verify all items have enough stock
    for (const item of items) {
      const p = this.data.products.find(x => x.id === item.productId);
      if (!p || p.stock < item.quantity) {
        return false;
      }
    }
    // 2. Decrement
    for (const item of items) {
      const p = this.data.products.find(x => x.id === item.productId)!;
      p.stock -= item.quantity;
      p.updatedAt = new Date().toISOString();
    }
    this.save();
    return true;
  }

  // Carts
  public getCart(userId: string): Cart {
    let cart = this.data.carts.find(c => c.userId === userId);
    if (!cart) {
      cart = {
        id: `cart_${userId}`,
        userId,
        items: [],
        updatedAt: new Date().toISOString(),
      };
      this.data.carts.push(cart);
      this.save();
    }
    return cart;
  }

  public addToCart(userId: string, productId: string, quantity = 1): { success: boolean; cart: Cart; message?: string } {
    const product = this.getProductById(productId);
    if (!product) return { success: false, cart: this.getCart(userId), message: 'Product not found' };
    if (product.stock <= 0) return { success: false, cart: this.getCart(userId), message: 'Product is out of stock' };

    const cart = this.getCart(userId);
    const existing = cart.items.find(i => i.productId === productId);
    const targetQty = (existing?.quantity || 0) + quantity;

    if (targetQty > product.stock) {
      return {
        success: false,
        cart,
        message: `Only ${product.stock} units available in stock`
      };
    }

    if (existing) {
      existing.quantity = targetQty;
    } else {
      cart.items.push({
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }
    cart.updatedAt = new Date().toISOString();
    this.save();
    return { success: true, cart };
  }

  public updateCartQuantity(userId: string, productId: string, quantity: number): { success: boolean; cart: Cart; message?: string } {
    const product = this.getProductById(productId);
    const cart = this.getCart(userId);

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== productId);
      cart.updatedAt = new Date().toISOString();
      this.save();
      return { success: true, cart };
    }

    if (!product) {
      cart.items = cart.items.filter(i => i.productId !== productId);
      this.save();
      return { success: false, cart, message: 'Product not found' };
    }

    if (quantity > product.stock) {
      return { success: false, cart, message: `Only ${product.stock} units available in stock` };
    }

    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      cart.updatedAt = new Date().toISOString();
      this.save();
    }
    return { success: true, cart };
  }

  public removeFromCart(userId: string, productId: string): Cart {
    const cart = this.getCart(userId);
    cart.items = cart.items.filter(i => i.productId !== productId);
    cart.updatedAt = new Date().toISOString();
    this.save();
    return cart;
  }

  public clearCart(userId: string): Cart {
    const cart = this.getCart(userId);
    cart.items = [];
    cart.updatedAt = new Date().toISOString();
    this.save();
    return cart;
  }

  // Merge a guest cart into an authenticated user's cart
  public mergeCart(guestId: string, userId: string): Cart {
    if (!guestId || !userId || guestId === userId) {
      return this.getCart(userId);
    }
    const guestCart = this.getCart(guestId);
    const userCart = this.getCart(userId);

    if (guestCart.items && guestCart.items.length > 0) {
      for (const gItem of guestCart.items) {
        const product = this.getProductById(gItem.productId);
        if (!product) continue;
        const existing = userCart.items.find(u => u.productId === product.id);
        if (existing) {
          existing.quantity = Math.min(product.stock, existing.quantity + gItem.quantity);
        } else {
          userCart.items.push({
            id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            productId: product.id,
            quantity: Math.min(product.stock, gItem.quantity),
            addedAt: new Date().toISOString(),
          });
        }
      }
      userCart.updatedAt = new Date().toISOString();
      // Clear guest cart after transferring items
      guestCart.items = [];
      guestCart.updatedAt = new Date().toISOString();
      this.save();
    }
    return userCart;
  }

  // Calculate authoritative cart totals based strictly on current product prices
  public calculateCartDetails(userId: string) {
    const cart = this.getCart(userId);
    let subtotal = 0;
    const validatedItems: Array<{
      productId: string;
      product: Product;
      quantity: number;
      itemSubtotal: number;
      inStock: boolean;
    }> = [];
    const validCartItems: typeof cart.items = [];

    for (const item of cart.items) {
      const product = this.getProductById(item.productId);
      if (product) {
        // Normalize product ID if resolved via alias
        item.productId = product.id;
        validCartItems.push(item);

        const itemSubtotal = product.price * item.quantity;
        subtotal += itemSubtotal;
        validatedItems.push({
          productId: product.id,
          product,
          quantity: item.quantity,
          itemSubtotal,
          inStock: product.stock >= item.quantity,
        });
      }
    }

    // Purge any defunct orphaned items from cart.items
    if (cart.items.length !== validCartItems.length) {
      cart.items = validCartItems;
      this.save();
    }

    // Business rules: free shipping over ₹500, else ₹99
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 99;
    // 5% discount for orders above ₹50,000 up to ₹2,500 max
    const discount = subtotal >= 50000 ? Math.min(2500, Math.round(subtotal * 0.05)) : 0;
    const totalAmount = subtotal + shipping - discount;

    return {
      cart,
      items: validatedItems,
      itemCount: validatedItems.reduce((acc, i) => acc + i.quantity, 0),
      subtotal,
      shipping,
      discount,
      totalAmount,
      canCheckout: validatedItems.length > 0 && validatedItems.every(i => i.inStock),
    };
  }

  // Orders
  public getOrders(): Order[] {
    return this.data.orders;
  }

  public getOrdersByUserId(userId: string, userEmail?: string): Order[] {
    return this.data.orders
      .filter(o => o.userId === userId || (userEmail && o.userEmail?.toLowerCase() === userEmail.toLowerCase()))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrdersBySellerId(sellerId: string): Order[] {
    return this.data.orders.filter(o => o.items.some(i => i.sellerId === sellerId)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id);
  }

  public addOrder(order: Order): Order {
    this.data.orders.push(order);
    this.save();
    return order;
  }

  public updateOrder(id: string, updates: Partial<Order>): Order | null {
    const idx = this.data.orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    this.data.orders[idx] = { ...this.data.orders[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.orders[idx];
  }

  // Payments
  public addPayment(payment: PaymentTransaction): PaymentTransaction {
    this.data.payments.push(payment);
    this.save();
    return payment;
  }

  public getPaymentByOrderId(orderId: string): PaymentTransaction | undefined {
    return this.data.payments.find(p => p.orderId === orderId);
  }

  public getPaymentByRazorpayOrderId(rzpOrderId: string): PaymentTransaction | undefined {
    return this.data.payments.find(p => p.razorpayOrderId === rzpOrderId);
  }

  public updatePayment(id: string, updates: Partial<PaymentTransaction>): PaymentTransaction | null {
    const idx = this.data.payments.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.payments[idx] = { ...this.data.payments[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.payments[idx];
  }

  public getPayments(): PaymentTransaction[] {
    return this.data.payments;
  }

  // Email Notifications
  public addEmailLog(log: EmailNotificationLog): EmailNotificationLog {
    this.data.emailLogs.push(log);
    this.save();
    return log;
  }

  public getEmailLogs(): EmailNotificationLog[] {
    return this.data.emailLogs.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }
}

export const db = new Database();
