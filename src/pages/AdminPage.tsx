import React, { useState, useEffect } from 'react';
import { Shield, Users, ShoppingBag, DollarSign, Mail, CheckCircle2, Eye, X } from 'lucide-react';
import { User } from '../types';
import { api } from '../lib/api';

interface AdminPageProps {
  user: User | null;
  navigate: (route: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ user, navigate }) => {
  const [dashboard, setDashboard] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders' | 'emails'>('overview');
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashRes, usersRes, emailsRes] = await Promise.all([
        api.getAdminDashboard(),
        api.getAdminUsers(),
        api.getAdminEmails(),
      ]);
      setDashboard(dashRes);
      setUsers(usersRes.users);
      setEmails(emailsRes.emailLogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-xs font-medium text-zinc-600">Loading admin operations panel...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Administration & Auditing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Admin Control Center
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-zinc-100 p-1 rounded-md text-xs font-medium text-zinc-600 border border-zinc-200/60">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-[5px] transition-colors ${
              activeTab === 'overview' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-[5px] transition-colors ${
              activeTab === 'users' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-[5px] transition-colors ${
              activeTab === 'orders' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Orders & Payments
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`px-3 py-1.5 rounded-[5px] transition-colors ${
              activeTab === 'emails' ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'hover:text-zinc-900'
            }`}
          >
            Email Logs ({emails.length})
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      {dashboard && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-medium">Total Platform Users</span>
              <Users className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-xl font-bold text-zinc-900 tracking-tight">{dashboard.metrics.totalUsers}</div>
            <div className="text-[11px] text-zinc-400 mt-1">
              {dashboard.metrics.totalCustomers} Customers • {dashboard.metrics.totalSellers} Sellers
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-medium">Catalog Products</span>
              <ShoppingBag className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-xl font-bold text-zinc-900 tracking-tight">{dashboard.metrics.totalProducts}</div>
            <div className="text-[11px] text-zinc-400 mt-1">Active inventory items</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-medium">Orders Processed</span>
              <CheckCircle2 className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-xl font-bold text-zinc-900 tracking-tight">{dashboard.metrics.totalOrders}</div>
            <div className="text-[11px] text-zinc-400 mt-1">With atomic stock decrements</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-medium">Total Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-xl font-bold text-zinc-900 tracking-tight">
              ₹{dashboard.metrics.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">Razorpay HMAC-verified volume</div>
          </div>
        </div>
      )}

      {/* Tab: Overview / Recent Transactions */}
      {activeTab === 'overview' && dashboard && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
            <h2 className="font-semibold text-xs sm:text-sm text-zinc-900">Recent Completed Orders</h2>
            <div className="divide-y divide-zinc-100 text-xs">
              {dashboard.recentOrders.map((ord: any) => (
                <div key={ord.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-semibold text-zinc-900 block text-xs">{ord.orderNumber}</span>
                    <span className="text-zinc-500 text-[11px]">{ord.userName} • {ord.items.length} item(s)</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-zinc-900 block text-xs font-semibold">₹{ord.totalAmount.toLocaleString('en-IN')}</strong>
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {ord.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4 shadow-2xs">
            <h2 className="font-semibold text-xs sm:text-sm text-zinc-900">Recent Automated Email Dispatches</h2>
            <div className="divide-y divide-zinc-100 text-xs">
              {dashboard.recentEmails.map((em: any) => (
                <div key={em.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-zinc-900 block text-xs">{em.subject}</span>
                    <span className="text-zinc-500 text-[11px]">To: {em.recipientEmail}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium text-[10px]">
                    {em.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Users Management */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-medium text-[10px]">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Store / Phone</th>
                <th className="p-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="p-3 font-medium text-zinc-900">{u.name}</td>
                  <td className="p-3 text-zinc-600">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                        u.role === 'ADMIN'
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : u.role === 'SELLER'
                          ? 'bg-zinc-100 text-zinc-800 border-zinc-200'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-500">{u.storeName || u.phone || '—'}</td>
                  <td className="p-3 text-zinc-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Orders & Payments */}
      {activeTab === 'orders' && dashboard && (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-medium text-[10px]">
              <tr>
                <th className="p-3">Order #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Razorpay Order ID</th>
                <th className="p-3">Payment ID</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {dashboard.recentOrders.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="p-3 font-mono font-semibold text-zinc-900">{ord.orderNumber}</td>
                  <td className="p-3 text-zinc-700">{ord.userName} ({ord.userEmail})</td>
                  <td className="p-3 font-semibold text-zinc-900">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-zinc-500">{ord.razorpayOrderId || '—'}</td>
                  <td className="p-3 font-mono text-zinc-500">{ord.razorpayPaymentId || '—'}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {ord.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Email Notification Dispatch Logs */}
      {activeTab === 'emails' && (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-medium text-[10px]">
              <tr>
                <th className="p-3">Recipient</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Status</th>
                <th className="p-3">Sent Timestamp</th>
                <th className="p-3 text-right">Rendered HTML</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {emails.map(em => (
                <tr key={em.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="p-3 font-medium text-zinc-900">{em.recipientEmail}</td>
                  <td className="p-3 text-zinc-700">{em.subject}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {em.status}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400">{new Date(em.sentAt).toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedEmail(em)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-zinc-50 text-zinc-800 font-medium text-xs border border-zinc-200 shadow-2xs inline-flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inspect Rendered Email Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl border border-zinc-200">
            <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
              <h3 className="font-semibold text-xs sm:text-sm">Dispatched Email Audit Preview</h3>
              <button onClick={() => setSelectedEmail(null)} className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-600 flex justify-between">
              <span>To: <strong className="text-zinc-900 font-medium">{selectedEmail.recipientEmail}</strong></span>
              <span>Subject: <strong className="text-zinc-900 font-medium">{selectedEmail.subject}</strong></span>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-zinc-100">
              <div
                dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }}
                className="bg-white rounded-lg shadow-2xs border border-zinc-200 p-4"
              />
            </div>
            <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium shadow-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
