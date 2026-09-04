import { User, Product, CartDetails, Order, Address, AIMessage, ComparisonMatrixItem, OrderTrackingInfo, OrderStatus } from '../types';

const TOKEN_KEY = 'agentcart_token';
const GUEST_KEY = 'agentcart_guest_id';

function getGuestId(): string {
  let guestId = localStorage.getItem(GUEST_KEY);
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem(GUEST_KEY, guestId);
  }
  return guestId;
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-guest-id': getGuestId(),
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    const errorMsg = data?.error?.message || data?.message || 'Request failed';
    throw new Error(errorMsg);
  }

  return data.data;
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await request<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(res.token);
    return res;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    phone?: string;
    storeName?: string;
  }): Promise<{ token: string; user: User }> {
    const res = await request<{ token: string; user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setAuthToken(res.token);
    return res;
  },

  async getMe(): Promise<{ user: User }> {
    return request<{ user: User }>('/api/auth/me');
  },

  logout() {
    setAuthToken(null);
  },

  // Products
  async getProducts(params?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
  }): Promise<{ total: number; products: Product[] }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') query.append(k, String(v));
      });
    }
    const qStr = query.toString();
    return request<{ total: number; products: Product[] }>(`/api/products${qStr ? `?${qStr}` : ''}`);
  },

  async getCategories(): Promise<{ categories: Array<{ name: string; count: number }> }> {
    return request<{ categories: Array<{ name: string; count: number }> }>('/api/products/categories');
  },

  async getProduct(id: string): Promise<{ product: Product; related: Product[] }> {
    return request<{ product: Product; related: Product[] }>(`/api/products/${id}`);
  },

  async compareProducts(productIds: string[]): Promise<{ products: Product[]; matrix: ComparisonMatrixItem[] }> {
    return request<{ products: Product[]; matrix: ComparisonMatrixItem[] }>('/api/products/compare', {
      method: 'POST',
      body: JSON.stringify({ productIds }),
    });
  },

  // Cart
  async getCart(): Promise<CartDetails> {
    return request<CartDetails>('/api/cart');
  },

  async addToCart(productId: string, quantity = 1): Promise<CartDetails> {
    return request<CartDetails>('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateCartQuantity(productId: string, quantity: number): Promise<CartDetails> {
    return request<CartDetails>('/api/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async removeFromCart(productId: string): Promise<CartDetails> {
    return request<CartDetails>(`/api/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  },

  async clearCart(): Promise<CartDetails> {
    return request<CartDetails>('/api/cart/clear', {
      method: 'DELETE',
    });
  },

  // Checkout & Razorpay
  async createCheckoutOrder(shippingAddress: Address): Promise<{
    orderId: string;
    orderNumber: string;
    amount: number;
    amountInPaise: number;
    currency: string;
    razorpayOrderId: string;
    keyId: string;
    user: { name: string; email: string; phone: string };
    testSignature?: string;
  }> {
    return request('/api/checkout/create-order', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  },

  async verifyPayment(payload: {
    orderId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ order: Order }> {
    return request<{ order: Order }>('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Orders
  async getOrders(): Promise<{ orders: Order[] }> {
    return request<{ orders: Order[] }>('/api/orders');
  },

  async getOrder(id: string): Promise<{ order: Order }> {
    return request<{ order: Order }>(`/api/orders/${id}`);
  },

  async getOrderTracking(id: string): Promise<{ tracking: OrderTrackingInfo; order: Order }> {
    return request<{ tracking: OrderTrackingInfo; order: Order }>(`/api/orders/${id}/track`);
  },

  async cancelOrder(id: string, reason?: string): Promise<{ tracking: OrderTrackingInfo; order: Order; message: string }> {
    return request<{ tracking: OrderTrackingInfo; order: Order; message: string }>(`/api/orders/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<{ tracking: OrderTrackingInfo; order: Order; message: string }> {
    return request<{ tracking: OrderTrackingInfo; order: Order; message: string }>(`/api/orders/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  },

  // Addresses
  async getAddresses(): Promise<{ addresses: Address[] }> {
    return request<{ addresses: Address[] }>('/api/account/addresses');
  },

  async addAddress(addr: Omit<Address, 'id' | 'userId'>): Promise<{ address: Address }> {
    return request<{ address: Address }>('/api/account/addresses', {
      method: 'POST',
      body: JSON.stringify(addr),
    });
  },

  async deleteAddress(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/account/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  // AI Agent
  async sendAIMessage(message: string, history: AIMessage[] = [], image?: string): Promise<AIMessage> {
    return request<AIMessage>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history, image }),
    });
  },

  async getAISuggestions(): Promise<{ suggestions: string[] }> {
    return request<{ suggestions: string[] }>('/api/ai/suggestions');
  },

  // Seller Dashboard
  async getSellerDashboard(): Promise<any> {
    return request('/api/seller/dashboard');
  },

  async getSellerProducts(): Promise<{ products: Product[] }> {
    return request<{ products: Product[] }>('/api/seller/products');
  },

  async createSellerProduct(productData: any): Promise<{ product: Product }> {
    return request<{ product: Product }>('/api/seller/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async updateSellerProduct(id: string, productData: any): Promise<{ product: Product }> {
    return request<{ product: Product }>(`/api/seller/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  async deleteSellerProduct(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/seller/products/${id}`, {
      method: 'DELETE',
    });
  },

  async getSellerOrders(): Promise<{ orders: Order[] }> {
    return request<{ orders: Order[] }>('/api/seller/orders');
  },

  // AI Seller Studio Endpoints
  async generateSellerListing(data: {
    draftTitle?: string;
    brand?: string;
    category?: string;
    targetAudience?: string;
    keyFeatures?: string;
    image?: string;
  }): Promise<any> {
    return request('/api/seller/ai/generate-listing', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async optimizeSellerListing(data: { productId?: string; productData?: any }): Promise<any> {
    return request('/api/seller/ai/optimize-listing', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getSellerMarketIntelligence(): Promise<any> {
    return request('/api/seller/ai/market-intelligence');
  },

  async getSellerInventoryAdvisor(): Promise<any> {
    return request('/api/seller/ai/inventory-advisor');
  },

  async getSellerReviewIntelligence(): Promise<any> {
    return request('/api/seller/ai/review-intelligence');
  },

  // Admin Dashboard
  async getAdminDashboard(): Promise<any> {
    return request('/api/admin/dashboard');
  },

  async getAdminUsers(): Promise<{ users: any[] }> {
    return request<{ users: any[] }>('/api/admin/users');
  },

  async getAdminEmails(): Promise<{ emailLogs: any[] }> {
    return request<{ emailLogs: any[] }>('/api/admin/emails');
  },
};
