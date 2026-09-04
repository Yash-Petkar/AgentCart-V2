import { Order, OrderStatus, PaymentStatus } from './db';

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

export function buildOrderTracking(order: any): OrderTrackingInfo {
  const createdDate = new Date(order.createdAt);
  const estDate = new Date(createdDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  const isCancelled = order.status === 'CANCELLED';
  const status = order.status;

  const stepCompleted = {
    PENDING: true,
    PROCESSING: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(status),
    SHIPPED: ['SHIPPED', 'DELIVERED'].includes(status),
    DELIVERED: status === 'DELIVERED',
  };

  const timeline: TrackingTimelineEvent[] = [
    {
      key: 'PENDING',
      label: 'Order Placed & Confirmed',
      description:
        order.paymentStatus === 'PAID'
          ? 'Payment verified via Razorpay HMAC cryptographic signature'
          : 'Order registered in fulfillment system',
      location: 'AgentCart Central Order Hub',
      time: order.createdAt,
      completed: true,
      current: (status === 'PENDING' || status === 'CONFIRMED') && !isCancelled,
    },
    {
      key: 'PROCESSING',
      label: 'Processing & Quality Inspection',
      description: 'Items picked from warehouse, serial numbers logged, and packed securely',
      location: 'Bangalore Automated Fulfillment Center',
      time: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(status)
        ? new Date(createdDate.getTime() + 4 * 60 * 60 * 1000).toISOString()
        : undefined,
      completed: stepCompleted.PROCESSING,
      current: status === 'PROCESSING' && !isCancelled,
    },
    {
      key: 'SHIPPED',
      label: 'Shipped & In Transit',
      description: 'Dispatched via AgentCart Express / BlueDart surface network',
      location: 'Surface Transit Hub - En Route',
      time: ['SHIPPED', 'DELIVERED'].includes(status)
        ? new Date(createdDate.getTime() + 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      completed: stepCompleted.SHIPPED,
      current: status === 'SHIPPED' && !isCancelled,
    },
    {
      key: 'DELIVERED',
      label: 'Delivered',
      description: `Delivered safely to ${order.shippingAddress?.fullName || 'recipient'} (${order.shippingAddress?.city || 'destination'})`,
      location: `${order.shippingAddress?.city || 'Destination City'}, ${order.shippingAddress?.state || 'India'} - ${order.shippingAddress?.postalCode || ''}`,
      time:
        status === 'DELIVERED'
          ? order.updatedAt || new Date(createdDate.getTime() + 48 * 60 * 60 * 1000).toISOString()
          : undefined,
      completed: stepCompleted.DELIVERED,
      current: status === 'DELIVERED',
    },
  ];

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    canCancel: !isCancelled && order.status !== 'DELIVERED',
    carrier: 'AgentCart Express (BlueDart Logistics)',
    trackingNumber: `AC-EXP-${order.orderNumber.replace(/[^A-Za-z0-9]/g, '')}`,
    estimatedDelivery: estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    timeline,
    isCancelled,
    cancelledAt: isCancelled ? order.updatedAt : undefined,
    cancelReason: order.notes,
  };
}
