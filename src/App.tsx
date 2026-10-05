import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveSimulator } from './components/LiveSimulator';
import { PackagesSection } from './components/PackagesSection';
import { PaymentDetailsSection } from './components/PaymentDetailsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { OrderStatusTracker } from './components/OrderStatusTracker';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { OrderModal } from './components/OrderModal';
import { PaymentModal } from './components/PaymentModal';
import { OrderRecord, OrderStatus, PackageTier } from './types';
import { INITIAL_DEMO_ORDERS } from './data/agencyData';

export default function App() {
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem('agentify360_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed reading stored orders:', e);
    }
    return INITIAL_DEMO_ORDERS;
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PackageTier>('standard');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Sync orders to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('agentify360_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed writing orders to localStorage:', e);
    }
  }, [orders]);

  const handleAddOrder = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev.filter((o) => o.orderNumber !== newOrder.orderNumber)]);
  };

  const handleUpdateOrderStatus = (orderNumber: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderNumber.toUpperCase() === orderNumber.toUpperCase()) {
          return {
            ...ord,
            status,
            lastUpdated: 'Just now',
            paymentConfirmationNote: note || ord.paymentConfirmationNote,
          };
        }
        return ord;
      })
    );
  };

  const handleOpenOrder = (tier?: PackageTier) => {
    if (tier) setSelectedTier(tier);
    setIsOrderModalOpen(true);
  };

  const handleScrollToTracker = () => {
    const el = document.getElementById('tracker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F3F4F6] font-sans antialiased relative selection:bg-pink-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenOrder={(tier) => handleOpenOrder(tier)}
        onOpenTracker={handleScrollToTracker}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
      />

      <main>
        {/* 2. Full-bleed Hero with Live Instagram Mockup */}
        <Hero
          onOpenOrder={(tier) => handleOpenOrder(tier)}
          onOpenSimulator={() => {
            const el = document.getElementById('simulator');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenPayment={() => setIsPaymentModalOpen(true)}
        />

        {/* 3. Interactive DM Simulator Showcase */}
        <LiveSimulator />

        {/* 4. Pricing & Tiers (Starter $150 / Standard $350 / Pro $600) */}
        <PackagesSection onSelectTier={(tier) => handleOpenOrder(tier)} />

        {/* 5. Official Payment Information (Meezan Bank / SAIF UR REHMAN AKHTAR) */}
        <PaymentDetailsSection
          onOpenOrder={() => handleOpenOrder()}
          onOpenTracker={handleScrollToTracker}
        />

        {/* 6. Agency Capabilities & Architecture */}
        <FeaturesSection />

        {/* 7. Real-Time Order & Payment Status Tracker */}
        <OrderStatusTracker
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onOpenOrder={() => handleOpenOrder()}
          onOpenPayment={() => setIsPaymentModalOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenOrder={() => handleOpenOrder()}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
        onOpenTracker={handleScrollToTracker}
      />

      {/* 9. Connected Official Instagram DM Assistant Widget */}
      <ChatbotWidget
        onOpenOrder={(tier) => handleOpenOrder(tier)}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
        onOpenTracker={handleScrollToTracker}
        orders={orders}
        onAddOrder={handleAddOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Order Booking Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedTier={selectedTier}
        onCreateOrder={handleAddOrder}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
      />

      {/* Official Payment Account Details Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onOpenOrder={() => handleOpenOrder()}
      />
    </div>
  );
}
