import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Product, CartDetails, Order, ComparisonMatrixItem } from './types';
import { api, getAuthToken } from './lib/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { CompareModal } from './components/CompareModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { SellerPage } from './pages/SellerPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [routeParam, setRouteParam] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<{ name: string; count: number }>>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Assistant Drawer state
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  // Comparison State
  const [compareProductIds, setCompareProductIds] = useState<string[]>([]);
  const [compareMatrix, setCompareMatrix] = useState<ComparisonMatrixItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Confirmed Order state (shown immediately after checkout)
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Navigation router
  const navigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (path.startsWith('/products/')) {
      const id = path.replace('/products/', '');
      setRouteParam(id);
      setCurrentRoute('/products/:id');
    } else {
      setRouteParam('');
      setCurrentRoute(path);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initial Data Bootstrap
  useEffect(() => {
    // Check authenticated user
    if (getAuthToken()) {
      api
        .getMe()
        .then(res => setUser(res.user))
        .catch(() => api.logout());
    }

    // Load initial cart
    loadCart();

    // Load catalog and categories
    loadCatalog();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  };

  const loadCatalog = async () => {
    try {
      const [prodData, catData] = await Promise.all([api.getProducts(), api.getCategories()]);
      setProducts(prodData.products);
      setCategories(catData.categories);
    } catch (err) {
      console.error('Failed to load products/categories', err);
    }
  };

  // Cart Handlers
  const handleAddToCart = async (product: Product, quantity = 1) => {
    try {
      const updated = await api.addToCart(product.id, quantity);
      setCart(updated);
      showToast(`Added ${quantity}x "${product.name}" to cart`);
    } catch (err: any) {
      showToast(err.message || 'Failed to add item to cart');
    }
  };

  const handleBuyNow = async (product: Product) => {
    try {
      const updated = await api.addToCart(product.id, 1);
      setCart(updated);
      navigate('/checkout');
    } catch (err: any) {
      showToast(err.message || 'Failed to proceed to checkout');
    }
  };

  const handleUpdateQuantity = async (productId: string, qty: number) => {
    try {
      if (qty <= 0) {
        handleRemoveItem(productId);
        return;
      }
      const updated = await api.updateCartQuantity(productId, qty);
      setCart(updated);
    } catch (err: any) {
      showToast(err.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const updated = await api.removeFromCart(productId);
      setCart(updated);
      showToast('Item removed from cart');
    } catch (err: any) {
      showToast(err.message || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      const updated = await api.clearCart();
      setCart(updated);
      showToast('Cart cleared');
    } catch (err: any) {
      showToast(err.message || 'Failed to clear cart');
    }
  };

  // AI Prompt Handlers
  const handleOpenAIWithPrompt = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setIsAIOpen(true);
  };

  // Compare Handlers
  const handleToggleCompare = async (product: Product) => {
    if (compareProductIds.includes(product.id)) {
      setCompareProductIds(prev => prev.filter(id => id !== product.id));
    } else {
      if (compareProductIds.length >= 3) {
        showToast('You can compare up to 3 products at a time');
        return;
      }
      const newIds = [...compareProductIds, product.id];
      setCompareProductIds(newIds);
      if (newIds.length >= 2) {
        try {
          const res = await api.compareProducts(newIds);
          setCompareMatrix(res.matrix);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handleOpenCompareModal = async () => {
    if (compareProductIds.length < 2) {
      showToast('Select at least 2 products to compare');
      return;
    }
    try {
      const res = await api.compareProducts(compareProductIds);
      setCompareMatrix(res.matrix);
      setIsCompareModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  // User Auth Handlers
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    loadCart();
    showToast(`Welcome back, ${loggedInUser.name}!`);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    showToast('Signed out successfully');
    navigate('/');
  };

  const handleSwitchDemoRole = async (email: string, pass: string) => {
    try {
      const res = await api.login(email, pass);
      setUser(res.user);
      showToast(`Switched role to ${res.user.role}`);
      if (res.user.role === 'SELLER') navigate('/seller');
      else if (res.user.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentCompleted = (order: Order) => {
    setConfirmedOrder(order);
    loadCart(); // cart was cleared on server
    navigate('/orders');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        user={user}
        cart={cart}
        onOpenAI={() => {
          setAiInitialPrompt('');
          setIsAIOpen(true);
        }}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-zinc-900 text-white px-4 py-3 rounded-lg shadow-lg border border-zinc-800 flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Confirmed Order Banner if just checked out */}
      <AnimatePresence>
        {confirmedOrder && (
          <motion.div
            id="confirmed-order-banner"
            key={confirmedOrder.id || confirmedOrder.orderNumber}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.8,
            }}
            className="bg-zinc-900 text-white py-3 px-4 text-xs sm:text-sm font-medium border-b border-zinc-800 flex items-center justify-between shadow-sm relative z-30"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-2.5 flex-1 pr-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Payment Verified! Order <strong className="font-semibold text-emerald-300">#{confirmedOrder.orderNumber}</strong> confirmed. An automated itemized email was logged and dispatched to {confirmedOrder.userEmail}.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="confirmed-banner-view-order"
                onClick={() => {
                  setConfirmedOrder(null);
                  navigate('/orders');
                }}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-2.5 py-1 rounded-md border border-zinc-700 transition-colors"
              >
                View Order
              </button>
              <button
                type="button"
                id="confirmed-banner-dismiss"
                onClick={() => setConfirmedOrder(null)}
                className="text-xs text-zinc-400 hover:text-white font-medium ml-1 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            products={products}
            categories={categories}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onViewProduct={id => navigate(`/products/${id}`)}
            onOpenAIWithPrompt={handleOpenAIWithPrompt}
            navigate={navigate}
            onToggleCompare={handleToggleCompare}
            compareProductIds={compareProductIds}
          />
        )}

        {currentRoute === '/products' && (
          <ProductsPage
            products={products}
            categories={categories}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onViewProduct={id => navigate(`/products/${id}`)}
            onToggleCompare={handleToggleCompare}
            compareProductIds={compareProductIds}
            onOpenCompareModal={handleOpenCompareModal}
          />
        )}

        {currentRoute === '/products/:id' && (
          <ProductDetailPage
            productId={routeParam}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onViewProduct={id => navigate(`/products/${id}`)}
            onOpenAIWithPrompt={handleOpenAIWithPrompt}
            navigate={navigate}
            onToggleCompare={handleToggleCompare}
            compareProductIds={compareProductIds}
          />
        )}

        {currentRoute === '/cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => navigate('/checkout')}
            onViewProduct={id => navigate(`/products/${id}`)}
            onOpenAIWithPrompt={handleOpenAIWithPrompt}
            navigate={navigate}
          />
        )}

        {currentRoute === '/checkout' && (
          <CheckoutPage
            user={user}
            cart={cart}
            onPaymentCompleted={handlePaymentCompleted}
            onLoginSuccess={handleLoginSuccess}
            navigate={navigate}
          />
        )}

        {currentRoute === '/orders' && (
          <OrdersPage
            user={user}
            navigate={navigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentRoute === '/account' && (
          <AccountPage
            user={user}
            onLogout={handleLogout}
            onSwitchRole={handleSwitchDemoRole}
            navigate={navigate}
          />
        )}

        {currentRoute === '/login' && (
          <AuthPage
            onLoginSuccess={loggedInUser => {
              setUser(loggedInUser);
              loadCart();
            }}
            navigate={navigate}
          />
        )}

        {currentRoute === '/seller' && <SellerPage user={user} navigate={navigate} />}

        {currentRoute === '/admin' && <AdminPage user={user} navigate={navigate} />}
      </main>

      {/* Global Floating AI Shopping Assistant Bubble */}
      <button
        id="floating-ai-assistant-bubble"
        onClick={() => {
          setAiInitialPrompt('');
          setIsAIOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-zinc-900 hover:bg-black text-white shadow-xl hover:shadow-2xl border border-zinc-800 transition-all flex items-center gap-2.5 group"
        title="Open AI Shopping Assistant"
      >
        <Sparkles className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
        <span className="text-xs font-semibold pr-0.5 hidden sm:inline">Ask AI Agent</span>
      </button>

      {/* AI Assistant Drawer Component */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onAddToCart={handleAddToCart}
        onViewProduct={id => navigate(`/products/${id}`)}
        onGoToCart={() => navigate('/cart')}
        onGoToOrders={() => navigate('/orders')}
        onCartUpdated={loadCart}
        initialPrompt={aiInitialPrompt}
      />

      {/* Comparison Modal Component */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={products.filter(p => compareProductIds.includes(p.id))}
        matrix={compareMatrix}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
