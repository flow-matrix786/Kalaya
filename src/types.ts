export type PackageTier = 'starter' | 'standard' | 'pro';

export interface PackageInfo {
  id: PackageTier;
  name: string;
  price: number;
  priceFormatted: string;
  breakdown: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
}

export type OrderStatus = 'PENDING' | 'UNPAID CONFIRMED' | 'CANCELLED';

export interface OrderRecord {
  orderNumber: string;
  customerName: string;
  instagramName: string;
  instagramHandle: string;
  packageTier: PackageTier;
  packageName: string;
  amount: number;
  notes: string;
  status: OrderStatus;
  createdAt: string;
  lastUpdated: string;
  paymentProofUrl?: string;
  paymentConfirmationNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    text: string;
    action: 'open_order' | 'open_payment' | 'open_status' | 'open_pricing';
  };
  audioNote?: {
    duration: string;
    transcription: string;
  };
  imageAttachment?: {
    url: string;
    caption?: string;
  };
}
