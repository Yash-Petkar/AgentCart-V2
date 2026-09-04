import { db, Order, EmailNotificationLog } from './db';

export function sendOrderConfirmationEmail(order: Order): EmailNotificationLog {
  const itemsHtml = order.items
    .map(
      item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; vertical-align: top;">
          <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 54px; object-fit: cover; border-radius: 6px; border: 1px solid #e5e7eb;" />
        </td>
        <td style="padding: 12px 8px; vertical-align: top;">
          <div style="font-weight: 600; color: #111827; font-size: 14px;">${item.name}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Brand: ${item.brand} | Qty: ${item.quantity}</div>
        </td>
        <td style="padding: 12px 8px; vertical-align: top; text-align: right; font-weight: 600; color: #111827; font-size: 14px;">
          ₹${item.subtotal.toLocaleString('en-IN')}
        </td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - AgentCart</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <div style="background: #0f172a; padding: 24px 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: -0.5px; font-weight: 700;">
            Agent<span style="color: #38bdf8;">Cart</span>
          </h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">AI-Powered Intelligent Commerce</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: #dcfce7; color: #15803d; padding: 6px 16px; border-radius: 9999px; font-weight: 600; font-size: 13px;">
              ✓ Payment Verified & Order Confirmed
            </div>
            <h2 style="font-size: 20px; color: #0f172a; margin: 16px 0 6px 0;">Thank you, ${order.userName}!</h2>
            <p style="color: #4b5563; font-size: 14px; margin: 0;">We've received your order and our automated fulfillment line has begun processing it.</p>
          </div>

          <!-- Order Summary Details -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #64748b;">Order Number:</span>
              <strong style="color: #0f172a; font-family: monospace;">${order.orderNumber}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #64748b;">Payment Method:</span>
              <strong style="color: #0f172a;">Razorpay Secure (${order.paymentStatus})</strong>
            </div>
            ${
              order.razorpayPaymentId
                ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #64748b;">Razorpay Payment ID:</span>
                    <strong style="color: #0f172a; font-family: monospace;">${order.razorpayPaymentId}</strong>
                  </div>`
                : ''
            }
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Order Date:</span>
              <span style="color: #0f172a;">${new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</span>
            </div>
          </div>

          <!-- Items Table -->
          <h3 style="font-size: 15px; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Purchased Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${itemsHtml}
          </table>

          <!-- Price Calculation Breakdown -->
          <div style="border-top: 2px solid #e5e7eb; padding-top: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: #4b5563;">
              <span>Subtotal</span>
              <span>₹${order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: #4b5563;">
              <span>Shipping Fee</span>
              <span>${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            ${
              order.discount > 0
                ? `<div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: #16a34a;">
                    <span>Discount Savings</span>
                    <span>-₹${order.discount.toLocaleString('en-IN')}</span>
                  </div>`
                : ''
            }
            <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 18px; font-weight: 700; color: #0f172a;">
              <span>Total Paid</span>
              <span style="color: #0284c7;">₹${order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <!-- Shipping Destination -->
          <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; font-size: 13px; color: #334155;">
            <div style="font-weight: 700; margin-bottom: 4px; color: #0f172a;">Shipping Address:</div>
            <div>${order.shippingAddress.fullName}</div>
            <div>${order.shippingAddress.street}</div>
            <div>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}</div>
            <div style="margin-top: 4px; color: #64748b;">Contact: ${order.shippingAddress.phone}</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; border-top: 1px solid #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 6px 0;">AgentCart Automated Notification Engine</p>
          <p style="margin: 0;">This email was automatically generated and logged upon cryptographic payment signature verification.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const log: EmailNotificationLog = {
    id: `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    orderId: order.id,
    recipientEmail: order.userEmail,
    subject: `Order Confirmed: ${order.orderNumber} - AgentCart`,
    status: 'SENT',
    sentAt: new Date().toISOString(),
    htmlContent,
  };

  db.addEmailLog(log);
  db.updateOrder(order.id, { emailNotificationSent: true });
  console.log(`[Email Engine] Order confirmation email dispatched to ${order.userEmail} for order ${order.orderNumber}`);
  return log;
}
