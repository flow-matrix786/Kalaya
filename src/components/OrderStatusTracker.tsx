import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, FileCheck2, ArrowRight, ShieldCheck, Building2, Upload } from 'lucide-react';
import { OrderRecord, OrderStatus } from '../types';
import { OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface OrderStatusTrackerProps {
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderNumber: string, status: OrderStatus, note?: string) => void;
  onOpenOrder: () => void;
  onOpenPayment: () => void;
}

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenOrder,
  onOpenPayment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [uploadSimulated, setUploadSimulated] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === term ||
        o.instagramHandle.toLowerCase().includes(term) ||
        o.customerName.toLowerCase().includes(term)
    );

    setSelectedOrder(found || null);
    setHasSearched(true);
    setUploadSimulated(false);
  };

  const handleSimulateScreenshotUpload = (orderNumber: string) => {
    onUpdateOrderStatus(
      orderNumber,
      'UNPAID CONFIRMED',
      'Payment screenshot received (matched to SAIF UR REHMAN AKHTAR / Meezan Bank). Manual team verification in progress.'
    );
    setUploadSimulated(true);

    // Refresh selected order
    setSelectedOrder((prev) =>
      prev
        ? {
            ...prev,
            status: 'UNPAID CONFIRMED',
            lastUpdated: 'Just now',
            paymentConfirmationNote:
              'Payment screenshot received (matched to SAIF UR REHMAN AKHTAR / Meezan Bank). Manual team verification in progress.',
          }
        : null
    );
  };

  return (
    <section id="tracker" className="py-24 bg-[#0B0F17] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400">
            <Search className="w-3.5 h-3.5" />
            <span>Real-Time Order Lookup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Track Your <span className="ig-gradient-text">Agent Build & Payment</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Check the status of your custom DM agent. Enter your <strong>AG360-XXXXX</strong> order number or Instagram handle below.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 p-2 bg-[#121824] border border-white/15 rounded-2xl shadow-xl focus-within:border-pink-500 transition-colors">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Order # (e.g. AG360-84219) or IG handle..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Quick sample chips */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
            <span>Try sample orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.orderNumber}
                type="button"
                onClick={() => {
                  setSearchTerm(o.orderNumber);
                  setSelectedOrder(o);
                  setHasSearched(true);
                  setUploadSimulated(false);
                }}
                className="text-pink-400 hover:text-pink-300 underline font-mono text-[11px] cursor-pointer"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        </form>

        {/* Results Card */}
        {hasSearched && (
          <div className="max-w-3xl mx-auto">
            {selectedOrder ? (
              <div className="bg-[#121824] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                      Official Order ID
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-mono">{selectedOrder.orderNumber}</h3>
                  </div>
                  <div>
                    {selectedOrder.status === 'PENDING' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-gray-500/20 text-gray-300 border border-gray-500/30 text-xs font-bold font-mono inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        STATUS: PENDING PAYMENT
                      </span>
                    )}
                    {selectedOrder.status === 'UNPAID CONFIRMED' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        STATUS: UNPAID CONFIRMED
                      </span>
                    )}
                    {selectedOrder.status === 'CANCELLED' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono inline-flex items-center gap-1.5">
                        STATUS: CANCELLED
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#192233] border border-white/5">
                    <p className="text-gray-400">Customer Name</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{selectedOrder.customerName}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#192233] border border-white/5">
                    <p className="text-gray-400">Instagram Profile</p>
                    <p className="text-sm font-semibold text-pink-400 mt-0.5 font-mono">
                      {selectedOrder.instagramHandle} ({selectedOrder.instagramName})
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#192233] border border-white/5">
                    <p className="text-gray-400">Package Tier</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{selectedOrder.packageName}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#192233] border border-white/5">
                    <p className="text-gray-400">Total Investment</p>
                    <p className="text-sm font-extrabold text-emerald-400 mt-0.5 font-mono">${selectedOrder.amount} USD</p>
                  </div>
                </div>

                {/* Customization notes */}
                {selectedOrder.notes && (
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs text-gray-300">
                    <p className="font-semibold text-gray-200 mb-1">Configuration / Niche Notes:</p>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status explanation */}
                <div className="p-4 rounded-2xl bg-[#162030] border border-white/10 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Workflow & Payment Status:
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedOrder.paymentConfirmationNote ||
                      'Awaiting transfer to our official Meezan Bank account. Please submit payment proof screenshot to update status.'}
                  </p>
                  <p className="text-[11px] text-gray-400 border-t border-white/10 pt-2">
                    <strong className="text-gray-200">Note:</strong> Final "Payment Confirmation" is manually authenticated by our finance controllers directly from the bank statement before initiating final deployment.
                  </p>
                </div>

                {/* If order is PENDING, show payment instructions and simulated proof upload */}
                {selectedOrder.status === 'PENDING' && (
                  <div className="pt-2 space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Payment Needed to Proceed:</p>
                        <p className="mt-0.5">
                          Please transfer <strong>${selectedOrder.amount}</strong> to Meezan Bank (Account Title: <strong>SAIF UR REHMAN AKHTAR</strong>, Acc: <strong>76010111536310</strong>).
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleSimulateScreenshotUpload(selectedOrder.orderNumber)}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Submit Payment Screenshot (Simulate Proof)</span>
                      </button>
                      <button
                        onClick={onOpenPayment}
                        className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span>View Bank Details</span>
                      </button>
                    </div>
                  </div>
                )}

                {uploadSimulated && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Screenshot successfully submitted! Status set to <strong>UNPAID CONFIRMED</strong>. Our team will verify and begin development.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#121824] border border-white/10 rounded-3xl p-8 text-center space-y-4">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Order Not Found</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  We could not find an order matching "{searchTerm}". Please verify your order number (e.g. AG360-84219) or place a new order below.
                </p>
                <button
                  onClick={onOpenOrder}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs cursor-pointer"
                >
                  Create New Agent Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
