import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  CreditCard,
  Award,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

type TabType = 'orders' | 'profile' | 'addresses' | 'rewards';

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onExploreProducts,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [userName, setUserName] = useState('Tanisha');
  const [userEmail, setUserEmail] = useState('gtanisha162@gmail.com');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Mock orders history
  const [orders] = useState([
    {
      id: 'LUM-94821',
      date: 'Sep 18, 2026',
      status: 'In Transit',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      total: 54.98,
      items: [
        { name: 'Floral Off Shoulder Dress', qty: 1, size: 'S', price: 34.99 },
        { name: 'White Summer Tank Top', qty: 1, size: 'M', price: 19.99 },
      ],
      trackingNumber: 'TRK-US-892184910',
    },
    {
      id: 'LUM-89204',
      date: 'Aug 29, 2026',
      status: 'Delivered',
      statusColor: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      total: 29.89,
      items: [
        { name: 'Boho Beach Dress', qty: 1, size: 'M', price: 29.89 },
      ],
      trackingNumber: 'TRK-US-772199201',
    },
  ]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Main Modal Panel */}
      <div className="relative bg-[#FAF8F5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E7DFD4] z-10 flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-lg font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-semibold">
                  Hello, {userName}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#F3ECE3] text-[#785E48] px-2 py-0.5 rounded-full border border-[#E2D6C7]">
                  <Sparkles className="w-3 h-3 text-[#B85D3B]" /> Silver Muse
                </span>
              </div>
              <p className="text-xs text-[#7A6F64]">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E645A] hover:text-[#1C1917] hover:bg-[#F2ECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 bg-white border-b border-[#EAE3D8] flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                : 'border-transparent text-[#786E63] hover:text-[#1C1917]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'rewards'
                ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                : 'border-transparent text-[#786E63] hover:text-[#1C1917]'
            }`}
          >
            <Award className="w-4 h-4 text-[#B85D3B]" />
            <span>Luméa Club Rewards</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                : 'border-transparent text-[#786E63] hover:text-[#1C1917]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                : 'border-transparent text-[#786E63] hover:text-[#1C1917]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {saveToast && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile information updated successfully!</span>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#6A6054]">
                  Track past deliveries, view receipts, or initiate returns.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="text-xs text-[#B85D3B] font-semibold hover:underline flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Continue Shopping
                </button>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-white rounded-xl border border-[#E9E2D8] shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#1C1917]">
                        Order #{order.id}
                      </span>
                      <span className="text-xs text-[#8A7E73] ml-2">Placed on {order.date}</span>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items in order */}
                  <div className="space-y-2">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-[#3E342B]">
                        <span>
                          {it.name} <span className="text-[#8C8074]">(Size {it.size}, Qty: {it.qty})</span>
                        </span>
                        <span className="font-medium">${it.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                    <span className="text-[#7A6E63] font-mono text-[11px]">
                      Tracking: <strong className="text-[#1C1917]">{order.trackingNumber}</strong>
                    </span>
                    <span className="font-semibold text-sm text-[#1C1917]">
                      Total: ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REWARDS TAB */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-[#241F1A] to-[#3D332A] text-white rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-[#D4C3B3]">
                    Luméa Membership Circle
                  </span>
                  <Award className="w-5 h-5 text-[#E5A93C]" />
                </div>
                <div className="text-3xl font-serif font-bold text-[#FAF8F5]">320 Points</div>
                <p className="text-xs text-[#C5B7AA] mt-1">
                  You are $80 away from unlocking <strong>Gold Muse</strong> tier perks.
                </p>
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                  <span>Available Coupon: <strong>$15 Off ($100+ order)</strong></span>
                  <span className="bg-[#FAF8F5]/20 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    MUSE15
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-[#E9E2D8]">
                  <h4 className="text-xs font-bold text-[#1C1917] mb-1">Free Express Shipping</h4>
                  <p className="text-[11px] text-[#7A6F64]">
                    Enjoy complimentary expedited shipping on all future seasonal drops.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#E9E2D8]">
                  <h4 className="text-xs font-bold text-[#1C1917] mb-1">Early Access Drops</h4>
                  <p className="text-[11px] text-[#7A6F64]">
                    Shop new collection releases 24 hours before public drop time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {!isEditingProfile ? (
                <div className="p-4 bg-white rounded-xl border border-[#E9E2D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#8A7E73] font-semibold">
                        Full Name
                      </span>
                      <p className="text-sm font-medium text-[#1C1917]">{userName}</p>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-xs text-[#B85D3B] hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#F0EAE1]">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7E73] font-semibold">
                      Email Address
                    </span>
                    <p className="text-sm font-medium text-[#1C1917]">{userEmail}</p>
                  </div>

                  <div className="pt-2 border-t border-[#F0EAE1]">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7E73] font-semibold">
                      Password
                    </span>
                    <p className="text-sm font-medium text-[#1C1917]">••••••••••••</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="p-4 bg-white rounded-xl border border-[#E9E2D8] space-y-3">
                  <div>
                    <label className="text-xs font-medium text-[#3A332C]">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#FAF8F5] border border-[#DCD1C4] rounded-lg text-sm focus:outline-none focus:border-[#1C1917]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#3A332C]">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full mt-1 p-2 bg-[#FAF8F5] border border-[#DCD1C4] rounded-lg text-sm focus:outline-none focus:border-[#1C1917]"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1.5 text-xs text-[#6A6054] hover:text-[#1C1917]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#383129]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-xl border border-[#E9E2D8] relative">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B85D3B] bg-[#F7EFE9] px-2 py-0.5 rounded-sm">
                  Default Shipping Address
                </span>
                <h4 className="font-semibold text-sm text-[#1C1917] mt-2">{userName}</h4>
                <p className="text-xs text-[#6E6357] mt-1 leading-relaxed">
                  742 Evergreen Fashion Way, Suite 400<br />
                  Los Angeles, CA 90014<br />
                  United States
                </p>
                <div className="mt-3 pt-2 border-t border-[#F0EAE1] flex gap-3 text-xs text-[#B85D3B]">
                  <button className="hover:underline font-medium">Edit Address</button>
                  <span className="text-[#D6CBC0]">|</span>
                  <button className="hover:underline font-medium">Deliver here</button>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-dashed border-[#D5CBC0] rounded-xl flex items-center justify-center text-xs text-[#7A6F64] hover:bg-[#F2ECE3] cursor-pointer transition-colors">
                + Add A New Delivery Address
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E1D7] flex items-center justify-between text-xs text-[#786E63]">
          <span>Need help with an order? Contact <strong>support@lumeafashion.com</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C1917] text-white rounded-lg hover:bg-[#3E342B] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
