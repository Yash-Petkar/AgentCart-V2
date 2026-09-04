import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { Order } from '../types';
import { api } from '../lib/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    orderNumber: string;
    amount: number;
    amountInPaise: number;
    currency: string;
    razorpayOrderId: string;
    keyId: string;
    user: { name: string; email: string; phone: string };
    testSignature?: string;
  } | null;
  onPaymentSuccess: (confirmedOrder: Order) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  orderData,
  onPaymentSuccess,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !orderData) return null;

  // 1. Launch standard Razorpay Checkout popup
  const handleLaunchRazorpay = () => {
    setErrorMessage(null);

    if (typeof window.Razorpay === 'undefined') {
      setErrorMessage('Razorpay SDK is initializing or blocked by browser. You can use the Sandbox Test Mode below.');
      return;
    }

    try {
      const options = {
        key: orderData.keyId,
        amount: orderData.amountInPaise,
        currency: orderData.currency,
        name: 'AgentCart Inc.',
        description: `Order ${orderData.orderNumber}`,
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=128&auto=format&fit=crop&q=80',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
          contact: orderData.user.phone,
        },
        theme: {
          color: '#0284c7',
        },
        handler: async (response: any) => {
          console.log('[Razorpay Client] Received payment response:', response);
          await verifyPaymentOnServer(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
        },
        modal: {
          ondismiss: () => {
            console.log('[Razorpay Client] Checkout modal dismissed');
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', (failResponse: any) => {
        setErrorMessage(`Payment failed: ${failResponse.error?.description || 'Declined'}`);
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error('[Razorpay Launch Error]', err);
      setErrorMessage(err.message || 'Failed to initialize payment window');
    }
  };

  // 2. Verified Server Signature Verification call
  const verifyPaymentOnServer = async (orderIdRzp: string, paymentIdRzp: string, signatureRzp: string) => {
    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const result = await api.verifyPayment({
        orderId: orderData.orderId,
        razorpay_order_id: orderIdRzp,
        razorpay_payment_id: paymentIdRzp,
        razorpay_signature: signatureRzp,
      });

      console.log('[Razorpay Security] Verified on server successfully:', result.order);
      onPaymentSuccess(result.order);
    } catch (err: any) {
      console.error('[Razorpay Verify Error]', err);
      setErrorMessage(err.message || 'Cryptographic payment verification failed on server');
    } finally {
      setIsVerifying(false);
    }
  };

  // 3. One-click verified sandbox payment execution (uses real backend cryptographic verification)
  const handleSandboxSimulatedPayment = async () => {
    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const mockPayId = `pay_${Date.now().toString().slice(-8)}_${Math.random().toString(36).substring(2, 6)}`;
      const signature = orderData.testSignature || 'valid_test_signature';

      await verifyPaymentOnServer(orderData.razorpayOrderId, mockPayId, signature);
    } catch (err: any) {
      setErrorMessage(err.message || 'Sandbox verification failed');
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        id="razorpay-checkout-modal"
        className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl border border-zinc-200"
      >
        {/* Header */}
        <div className="bg-white text-zinc-900 p-5 flex items-center justify-between border-b border-zinc-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-900">Razorpay Secure Checkout</h3>
              <p className="text-xs text-zinc-500">256-bit Encrypted Transaction</p>
            </div>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
            Test Mode
          </span>
        </div>

        {/* Order Details Body */}
        <div className="p-6">
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-4 mb-5">
            <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
              <span>Order Number</span>
              <span className="font-mono font-medium text-zinc-800">{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
              <span>Razorpay Order ID</span>
              <span className="font-mono text-zinc-600 truncate max-w-[180px]">{orderData.razorpayOrderId}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
              <span>Customer</span>
              <span className="font-medium text-zinc-800">{orderData.user.name}</span>
            </div>
            <div className="pt-2.5 border-t border-zinc-200 flex justify-between items-baseline">
              <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Amount Due</span>
              <span className="text-xl font-bold text-zinc-900">
                ₹{orderData.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isVerifying ? (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-zinc-900 animate-spin mx-auto" />
              <div className="text-sm font-semibold text-zinc-900">Verifying Cryptographic Signature...</div>
              <p className="text-xs text-zinc-500">
                Executing HMAC-SHA256 signature check & updating inventory atomically on server.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* Button 1: Launch official Razorpay standard popup */}
              <button
                id="razorpay-launch-standard-btn"
                onClick={handleLaunchRazorpay}
                className="w-full py-2.5 px-4 rounded-md bg-zinc-900 hover:bg-black text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Pay ₹{orderData.amount.toLocaleString('en-IN')} via Razorpay Popup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Direct Sandbox Test Payment with Verified Signature */}
              <button
                id="razorpay-sandbox-test-btn"
                onClick={handleSandboxSimulatedPayment}
                className="w-full py-2.5 px-4 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium text-xs transition-colors border border-zinc-200 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One-Click Test Payment (Verified)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Cancel and return to cart
              </button>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              HMAC Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-zinc-700" />
              Instant Email Notification
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
