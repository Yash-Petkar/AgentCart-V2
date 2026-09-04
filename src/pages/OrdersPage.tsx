import React, { useState, useEffect } from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Mail,
  ChevronRight,
  X,
  ArrowLeft,
  Truck,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  Ban,
  MapPin,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Order, User, OrderTrackingInfo, OrderStatus } from '../types';
import { api } from '../lib/api';

interface OrdersPageProps {
  user: User | null;
  navigate: (route: string) => void;
  onLoginSuccess?: (user: User) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ user, navigate, onLoginSuccess }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewingEmailModal, setViewingEmailModal] = useState<boolean>(false);

  // Track Order Modal State
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [trackingData, setTrackingData] = useState<OrderTrackingInfo | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingRefreshing, setTrackingRefreshing] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Cancel Order State
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('Changed mind / Found alternative');
  const [customReason, setCustomReason] = useState('');
  const [cancelSubmitting, setCancelSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders();
      setOrders(res.orders);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  // Open Track Order modal & fetch real-time tracking data from backend
  const handleOpenTracking = async (order: Order) => {
    setTrackingModalOrder(order);
    setTrackingLoading(true);
    try {
      const res = await api.getOrderTracking(order.id);
      setTrackingData(res.tracking);
      if (res.order) {
        setTrackingModalOrder(res.order);
        // Sync local order state
        setOrders(prev => prev.map(o => (o.id === res.order.id ? res.order : o)));
      }
    } catch (err) {
      console.error('Failed to fetch tracking details', err);
    } finally {
      setTrackingLoading(false);
    }
  };

  // Refresh tracking data from backend
  const handleRefreshTracking = async () => {
    if (!trackingModalOrder) return;
    setTrackingRefreshing(true);
    try {
      const res = await api.getOrderTracking(trackingModalOrder.id);
      setTrackingData(res.tracking);
      if (res.order) {
        setTrackingModalOrder(res.order);
        setOrders(prev => prev.map(o => (o.id === res.order.id ? res.order : o)));
      }
    } catch (err) {
      console.error('Failed to refresh tracking details', err);
    } finally {
      setTrackingRefreshing(false);
    }
  };

  // Handle Order Cancellation
  const handleConfirmCancel = async () => {
    if (!cancelModalOrder) return;
    setCancelSubmitting(true);
    setActionMessage(null);
    try {
      const selectedReason = cancelReason === 'Other' && customReason.trim() ? customReason.trim() : cancelReason;
      const res = await api.cancelOrder(cancelModalOrder.id, selectedReason);

      // Update state
      setOrders(prev => prev.map(o => (o.id === res.order.id ? res.order : o)));
      if (trackingModalOrder && trackingModalOrder.id === res.order.id) {
        setTrackingModalOrder(res.order);
        setTrackingData(res.tracking);
      }

      setActionMessage({
        type: 'success',
        text: res.message || 'Order successfully cancelled. Refund and inventory have been updated.',
      });
      setCancelModalOrder(null);
    } catch (err: any) {
      setActionMessage({
        type: 'error',
        text: err.message || 'Failed to cancel order. Please try again.',
      });
    } finally {
      setCancelSubmitting(false);
    }
  };

  // Quick simulation helper to test shipment advancement in preview
  const handleSimulateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => (o.id === res.order.id ? res.order : o)));
      if (trackingModalOrder && trackingModalOrder.id === res.order.id) {
        setTrackingModalOrder(res.order);
        setTrackingData(res.tracking);
      }
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">Confirmed</span>;
      case 'PROCESSING':
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-sky-50 text-sky-800 border border-sky-200">Processing</span>;
      case 'SHIPPED':
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200">Shipped</span>;
      case 'DELIVERED':
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-900 text-white border border-zinc-900">Delivered</span>;
      case 'CANCELLED':
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-rose-50 text-rose-700 border border-rose-200">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-xs font-medium text-zinc-600">Retrieving your order records...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Your Orders</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time dispatch tracking, verified payment records, and order fulfillment management
          </p>
        </div>
      </div>

      {actionMessage && (
        <div
          className={`p-3.5 rounded-lg border text-xs flex items-center justify-between gap-3 ${
            actionMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="p-1 hover:opacity-75 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-zinc-200 p-10 text-center max-w-md mx-auto space-y-3.5 shadow-2xs">
          <Package className="w-10 h-10 text-zinc-400 mx-auto" />
          <h3 className="text-sm font-semibold text-zinc-900">
            {!user ? 'Sign in to View Your Orders' : 'No Orders Placed Yet'}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {!user
              ? 'Sign in with your customer account to view your past orders, active shipments, and invoices.'
              : 'When you complete checkout using Razorpay, your confirmed order and real-time shipment tracking will appear here.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
            {!user ? (
              <>
                <button
                  type="button"
                  id="orders-quick-login-customer"
                  onClick={async () => {
                    try {
                      const res = await api.login('customer@agentcart.com', 'Customer@123');
                      onLoginSuccess?.(res.user);
                    } catch (_) {}
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
                >
                  1-Click Customer Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition-colors"
                >
                  All Accounts
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-black text-white text-xs font-medium transition-colors"
              >
                Start Shopping
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const isCancelled = order.status === 'CANCELLED';
            const isDelivered = order.status === 'DELIVERED';
            const canCancel = !isCancelled && !isDelivered;
            const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

            // Concise status summary text
            let statusSummary = 'Order received & confirmed. Processing at fulfillment center.';
            if (order.status === 'DELIVERED') {
              statusSummary = `Package delivered to ${order.shippingAddress.fullName} (${order.shippingAddress.city})`;
            } else if (order.status === 'SHIPPED') {
              statusSummary = 'In transit with BlueDart Logistics • On track for delivery';
            } else if (order.status === 'PROCESSING') {
              statusSummary = 'Package is being packed and prepared for dispatch';
            } else if (order.status === 'CANCELLED') {
              statusSummary = 'Order cancelled • Full refund credited to source account';
            }

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-zinc-200 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all p-4 sm:p-5 space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-100 text-xs">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {getStatusBadge(order.status)}
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <span className="text-zinc-500">
                      Placed{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <span className="font-mono text-[11px] text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">
                      {order.orderNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-zinc-900 text-sm sm:text-base">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                    {order.paymentStatus === 'REFUNDED' ? (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
                        Refunded
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                        Paid
                      </span>
                    )}
                  </div>
                </div>

                {/* Body: Status Summary + Items Strip + Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Product Images Strip & Information */}
                  <div className="flex items-center gap-3.5">
                    {/* Compact Image Strip */}
                    <div className="flex items-center -space-x-2 shrink-0">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-contain bg-zinc-50 border border-zinc-200 p-1 shadow-2xs hover:scale-105 transition-transform"
                          title={item.name}
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[11px] font-bold text-zinc-600 shadow-2xs">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Order Status Summary & Details */}
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-semibold text-zinc-900 truncate max-w-sm sm:max-w-md">
                        {order.items[0]?.name}
                        {order.items.length > 1 && (
                          <span className="font-normal text-zinc-500"> +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            order.status === 'DELIVERED'
                              ? 'bg-zinc-900'
                              : order.status === 'SHIPPED'
                              ? 'bg-amber-500'
                              : order.status === 'CANCELLED'
                              ? 'bg-rose-500'
                              : 'bg-sky-500'
                          }`}
                        />
                        <span className="truncate">{statusSummary}</span>
                      </p>
                      <div className="text-[10px] text-zinc-400">
                        {totalUnits} {totalUnits === 1 ? 'item' : 'items'} • Shipping to {order.shippingAddress.fullName} ({order.shippingAddress.city})
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100">
                    {/* View Details Link that leads to order tracking timeline */}
                    <button
                      onClick={() => handleOpenTracking(order)}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-medium inline-flex items-center gap-1.5 transition-all shadow-2xs group"
                    >
                      <Truck className="w-3.5 h-3.5 text-zinc-300 group-hover:text-white transition-colors" />
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Secondary Actions */}
                    {canCancel && (
                      <button
                        onClick={() => {
                          setCancelModalOrder(order);
                          setCancelReason('Changed mind / Found alternative');
                          setCustomReason('');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200 inline-flex items-center gap-1 transition-colors"
                        title="Cancel Order"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setViewingEmailModal(true);
                      }}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium border border-zinc-200 inline-flex items-center gap-1 transition-colors"
                      title="View Email Receipt"
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="hidden sm:inline">Receipt</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* REAL-TIME TRACK ORDER STATUS TIMELINE MODAL */}
      {/* ========================================== */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-xl border border-zinc-200">
            {/* Modal Header */}
            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-zinc-800 rounded-md">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xs sm:text-sm">
                      Track Shipment • {trackingModalOrder.orderNumber}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Real-time status updates from AgentCart logistics hub
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRefreshTracking}
                  disabled={trackingRefreshing || trackingLoading}
                  title="Refresh Live Status"
                  className="p-1.5 text-zinc-400 hover:text-white rounded-md transition-colors border border-zinc-700/60 hover:border-zinc-600 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${trackingRefreshing ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    setTrackingModalOrder(null);
                    setTrackingData(null);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-6 bg-zinc-50/50">
              {trackingLoading ? (
                <div className="py-16 text-center space-y-2">
                  <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="text-xs text-zinc-600 font-medium">Fetching real-time shipment status...</div>
                </div>
              ) : (
                <>
                  {/* Status Banner */}
                  <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-zinc-500 text-[11px] block">Carrier</span>
                        <strong className="text-zinc-900 font-medium">
                          {trackingData?.carrier || 'AgentCart Express (BlueDart Logistics)'}
                        </strong>
                      </div>

                      <div>
                        <span className="text-zinc-500 text-[11px] block">Waybill / Tracking No.</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="font-mono text-zinc-900 font-medium">
                            {trackingData?.trackingNumber || `AC-EXP-${trackingModalOrder.orderNumber.replace(/[^A-Za-z0-9]/g, '')}`}
                          </strong>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                trackingData?.trackingNumber ||
                                  `AC-EXP-${trackingModalOrder.orderNumber.replace(/[^A-Za-z0-9]/g, '')}`
                              )
                            }
                            className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                            title="Copy Tracking ID"
                          >
                            {copiedTracking ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-zinc-500 text-[11px] block">Estimated Delivery</span>
                        <strong className="text-zinc-900 font-medium">
                          {trackingData?.estimatedDelivery || 'Within 3 business days'}
                        </strong>
                      </div>

                      <div>
                        <span className="text-zinc-500 text-[11px] block">Current Status</span>
                        <div className="mt-0.5">{getStatusBadge(trackingModalOrder.status)}</div>
                      </div>
                    </div>

                    {/* Cancellation Notice if Cancelled */}
                    {trackingModalOrder.status === 'CANCELLED' && (
                      <div className="p-3 bg-rose-50 rounded-md border border-rose-200 text-xs text-rose-800 space-y-1">
                        <div className="font-semibold flex items-center gap-1.5">
                          <Ban className="w-3.5 h-3.5 text-rose-600" />
                          <span>Order Cancelled</span>
                        </div>
                        <p className="text-rose-700 text-[11px] leading-relaxed">
                          This order was cancelled. Product inventory has been restored to the catalog and a full refund
                          {trackingModalOrder.paymentStatus === 'REFUNDED' ? ' has been credited' : ''} to your original payment method.
                        </p>
                        {trackingData?.cancelReason && (
                          <div className="text-[11px] text-rose-600 pt-1 border-t border-rose-200/60">
                            Reason: <span className="italic">{trackingData.cancelReason}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* SHIPMENT PROGRESS TIMELINE */}
                  <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-2xs space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <h4 className="font-semibold text-xs text-zinc-900 uppercase tracking-wider">
                        Shipment Milestones
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        {trackingModalOrder.status === 'CANCELLED'
                          ? 'Shipment Terminated'
                          : `Status: ${trackingModalOrder.status}`}
                      </span>
                    </div>

                    {/* Timeline Steps */}
                    <div className="relative space-y-6 sm:space-y-8 pl-4 sm:pl-6 before:absolute before:left-[19px] sm:before:left-[27px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200">
                      {trackingData?.timeline.map((step, idx) => {
                        const isStepDone = step.completed;
                        const isStepCurrent = step.current;

                        return (
                          <div key={step.key} className="relative flex items-start gap-4">
                            {/* Step Node Icon */}
                            <div
                              className={`relative z-10 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                                isStepDone
                                  ? 'bg-zinc-900 text-white shadow-2xs'
                                  : isStepCurrent
                                  ? 'bg-white border-2 border-zinc-900 text-zinc-900 ring-4 ring-zinc-100'
                                  : 'bg-zinc-100 border border-zinc-300 text-zinc-400'
                              }`}
                            >
                              {isStepDone ? (
                                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                              ) : isStepCurrent ? (
                                <span className="w-2 h-2 rounded-full bg-zinc-900 animate-ping" />
                              ) : (
                                <span className="text-[10px]">{idx + 1}</span>
                              )}
                            </div>

                            {/* Step Text Details */}
                            <div className="flex-1 text-xs space-y-0.5">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h5
                                  className={`font-semibold ${
                                    isStepDone || isStepCurrent ? 'text-zinc-900' : 'text-zinc-400'
                                  }`}
                                >
                                  {step.label}
                                </h5>
                                {step.time && (
                                  <span className="text-[11px] text-zinc-400">
                                    {new Date(step.time).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-[11px] leading-relaxed ${
                                  isStepDone || isStepCurrent ? 'text-zinc-600' : 'text-zinc-400'
                                }`}
                              >
                                {step.description}
                              </p>
                              {step.location && (
                                <div className="flex items-center gap-1 text-[10px] text-zinc-400 pt-0.5">
                                  <MapPin className="w-3 h-3 text-zinc-400" />
                                  <span>{step.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery Destination & Quick Item Recap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs space-y-1.5">
                      <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Delivery Address</span>
                      </div>
                      <div className="text-zinc-600 text-[11px] leading-relaxed">
                        <div className="font-medium text-zinc-900">
                          {trackingModalOrder.shippingAddress.fullName}
                        </div>
                        <div>{trackingModalOrder.shippingAddress.street}</div>
                        <div>
                          {trackingModalOrder.shippingAddress.city}, {trackingModalOrder.shippingAddress.state} -{' '}
                          {trackingModalOrder.shippingAddress.postalCode}
                        </div>
                        <div className="text-zinc-500 pt-0.5">Phone: {trackingModalOrder.shippingAddress.phone}</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs space-y-1.5">
                      <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Package Contents</span>
                      </div>
                      <div className="text-zinc-600 text-[11px] space-y-1">
                        {trackingModalOrder.items.map(i => (
                          <div key={i.productId} className="flex justify-between items-center">
                            <span className="truncate max-w-[180px]">{i.name}</span>
                            <span className="text-zinc-400 shrink-0">x{i.quantity}</span>
                          </div>
                        ))}
                        <div className="pt-1 border-t border-zinc-100 flex justify-between font-medium text-zinc-900">
                          <span>Total Amount:</span>
                          <span>₹{trackingModalOrder.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Status Simulation Tools (Developer & Preview Testing) */}
                  <div className="bg-zinc-100/80 p-3.5 rounded-lg border border-zinc-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                        Simulate Real-Time Shipment Progress:
                      </span>
                      <span className="text-[10px] text-zinc-500">Live preview testing</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'] as OrderStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => handleSimulateStatus(trackingModalOrder.id, st)}
                          disabled={trackingModalOrder.status === 'CANCELLED'}
                          className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                            trackingModalOrder.status === st
                              ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                              : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 disabled:opacity-40'
                          }`}
                        >
                          Mark as {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                {trackingModalOrder.status !== 'DELIVERED' && trackingModalOrder.status !== 'CANCELLED' && (
                  <button
                    onClick={() => {
                      setCancelModalOrder(trackingModalOrder);
                      setCancelReason('Changed mind / Found alternative');
                      setCustomReason('');
                    }}
                    className="px-3 py-1.5 rounded-md text-rose-700 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Cancel This Order</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedOrder(trackingModalOrder);
                    setViewingEmailModal(true);
                  }}
                  className="px-3 py-1.5 rounded-md bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Email Confirmation</span>
                </button>
                <button
                  onClick={() => {
                    setTrackingModalOrder(null);
                    setTrackingData(null);
                  }}
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* ORDER CANCELLATION CONFIRMATION MODAL */}
      {/* ========================================== */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl border border-zinc-200 space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Cancel Order #{cancelModalOrder.orderNumber}?</h3>
                  <p className="text-xs text-zinc-500">This action cannot be undone once confirmed</p>
                </div>
              </div>
              <button
                onClick={() => setCancelModalOrder(null)}
                disabled={cancelSubmitting}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-medium text-zinc-900">{cancelModalOrder.items.length} product(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Total to be refunded:</span>
                <span className="font-semibold text-zinc-900">
                  ₹{cancelModalOrder.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="pt-1 border-t border-zinc-200 text-[11px] text-zinc-500">
                ✓ Inventory stock will be automatically restored to the store catalog.
                <br />
                ✓ Full refund will be initiated to your original payment method.
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Reason for cancellation
              </label>
              <select
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full text-xs p-2 rounded-md bg-white border border-zinc-300 focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Changed mind / Found alternative">Changed mind / Found alternative</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Delivery time is too long">Delivery time is too long</option>
                <option value="Found better pricing elsewhere">Found better pricing elsewhere</option>
                <option value="Need to change delivery address">Need to change delivery address</option>
                <option value="Other">Other</option>
              </select>

              {cancelReason === 'Other' && (
                <input
                  type="text"
                  placeholder="Please specify reason..."
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  className="w-full mt-2 text-xs p-2 rounded-md bg-white border border-zinc-300 focus:outline-hidden focus:ring-1 focus:ring-zinc-900"
                />
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                disabled={cancelSubmitting}
                className="px-3.5 py-1.5 rounded-md border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelSubmitting}
                className="px-4 py-1.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {cancelSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Ban className="w-3.5 h-3.5" />
                    <span>Confirm Cancellation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Automated Purchase Email Modal */}
      {viewingEmailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl border border-zinc-200">
            <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-300" />
                <h3 className="font-semibold text-xs sm:text-sm">Automated Email Notification Log</h3>
              </div>
              <button
                onClick={() => setViewingEmailModal(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-600 flex justify-between items-center">
              <div>
                <span>Recipient: </span>
                <strong className="text-zinc-900 font-medium">{selectedOrder.userEmail}</strong>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium text-[11px]">
                Status: DELIVERED
              </span>
            </div>

            <div className="flex-1 overflow-auto p-5 bg-zinc-100">
              {/* Rendered Email Template */}
              <div className="bg-white rounded-lg shadow-2xs border border-zinc-200 p-5 max-w-md mx-auto space-y-3.5 text-xs">
                <div className="text-center pb-3 border-b border-zinc-200">
                  <div className="font-bold text-base text-zinc-900 tracking-tight">
                    AgentCart
                  </div>
                  <div className="text-zinc-500 text-[11px]">AI-Native E-Commerce Platform</div>
                  <div className="mt-2.5 inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium text-[11px]">
                    {selectedOrder.status === 'CANCELLED' ? '✓ Cancellation Confirmed' : '✓ Payment Verified & Order Confirmed'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {selectedOrder.status === 'CANCELLED'
                      ? `Order #${selectedOrder.orderNumber} Cancelled`
                      : `Thank you, ${selectedOrder.userName}!`}
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">
                    {selectedOrder.status === 'CANCELLED'
                      ? `Your order has been cancelled and a full refund has been initiated.`
                      : `Your order #${selectedOrder.orderNumber} has been verified cryptographically and sent for dispatch.`}
                  </p>
                </div>

                <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Razorpay Payment ID:</span>
                    <span className="font-mono font-semibold text-zinc-900">
                      {selectedOrder.razorpayPaymentId || 'pay_test_verified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">
                      {selectedOrder.paymentStatus === 'REFUNDED' ? 'Refund Initiated:' : 'Total Paid:'}
                    </span>
                    <span className="font-semibold text-zinc-900">
                      ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-zinc-100">
                  {selectedOrder.items.map(item => (
                    <div key={item.productId} className="py-2 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-700">
                        {item.name} (x{item.quantity})
                      </span>
                      <span className="font-semibold text-zinc-900">₹{item.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[10px] text-zinc-400 text-center border-t border-zinc-100">
                  This email was automatically generated and logged upon payment signature verification.
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setViewingEmailModal(false)}
                className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

