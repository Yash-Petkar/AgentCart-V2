export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  storeName?: string;
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
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface ValidatedCartItem {
  productId: string;
  product: Product;
  quantity: number;
  itemSubtotal: number;
  inStock: boolean;
}

export interface CartDetails {
  cart: {
    id: string;
    userId: string;
    items: CartItem[];
  };
  items: ValidatedCartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  canCheckout: boolean;
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

export interface TrackingTimelineEvent {
  key: string;
  label: string;
  description: string;
  location?: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderTrackingInfo {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  canCancel: boolean;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: TrackingTimelineEvent[];
  isCancelled: boolean;
  cancelledAt?: string;
  cancelReason?: string;
}

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
    matrix: ComparisonMatrixItem[];
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

export interface ComparisonMatrixItem {
  attribute: string;
  values: Record<string, string>;
}
