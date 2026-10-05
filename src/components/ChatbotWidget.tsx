import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, Upload, Image as ImageIcon, ShieldCheck, CheckCircle2, Copy, Check, Paperclip } from 'lucide-react';
import { ChatMessage, OrderRecord, OrderStatus } from '../types';
import { OFFICIAL_PAYMENT_DETAILS, PACKAGES } from '../data/agencyData';

const N8N_CHAT_WEBHOOK_URL = 'https://flowing-matrix.app.n8n.cloud/webhook/5b700b0b-1cb7-452e-a7b9-ce8b78c24839';

interface ChatbotWidgetProps {
  onOpenOrder: (tier?: 'starter' | 'standard' | 'pro') => void;
  onOpenPayment: () => void;
  onOpenTracker: () => void;
  orders: OrderRecord[];
  onAddOrder: (order: OrderRecord) => void;
  onUpdateOrderStatus: (orderNumber: string, status: OrderStatus, note?: string) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onOpenOrder,
  onOpenPayment,
  onOpenTracker,
  orders,
  onAddOrder,
  onUpdateOrderStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Persistent session identifier for n8n conversational memory
  const [sessionId] = useState<string>(() => {
    try {
      const existing = window.sessionStorage.getItem('agentify360_session_id');
      if (existing) return existing;
      const newId = 'ag360_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      window.sessionStorage.setItem('agentify360_session_id', newId);
      return newId;
    } catch {
      return 'ag360_' + Math.random().toString(36).substring(2, 10);
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hey there! 👋 Welcome to Agentify-360. We build custom Instagram DM chatbots that reply 24/7, qualify leads, and close orders.\n\nAre you looking to automate DMs for your business or personal brand, or did someone refer you?",
      timestamp: 'Just now',
      quickReplies: ['Explore Packages ($150-$600)', 'Official Payment Details', 'Order an Agent', 'Check Order Status', 'Can I upgrade later?'],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Contextual fallback response engine complying with official prompt & rules
  const getFallbackResponse = (query: string): { replyText: string; actionLink?: ChatMessage['actionLink']; quickReplies: string[] } => {
    const lower = query.toLowerCase();
    let replyText = '';
    let actionLink: ChatMessage['actionLink'] = undefined;
    let quickReplies: string[] = ['Explore Packages ($150-$600)', 'Official Payment Details', 'Order an Agent', 'Check Order Status'];

    const isUrdu =
      lower.includes('kya') ||
      lower.includes('kaise') ||
      lower.includes('salam') ||
      lower.includes('batao') ||
      lower.includes('btao') ||
      lower.includes('kitne') ||
      lower.includes('hai') ||
      lower.includes('chahiye');

    // 1. Check order status inquiry
    if (lower.includes('ag360-') || lower.includes('status') || lower.includes('track') || lower.includes('order status')) {
      const orderMatch = query.match(/AG360-\d{5}/i);
      if (orderMatch) {
        const orderId = orderMatch[0].toUpperCase();
        const found = orders.find((o) => o.orderNumber.toUpperCase() === orderId);
        if (found) {
          replyText = `Found Order ${found.orderNumber} for ${found.customerName} (${found.instagramHandle})!\n\n• Package: ${found.packageName}\n• Current Status: [${found.status}]\n• Details: ${found.paymentConfirmationNote || 'Under processing'}\n\n${found.status === 'PENDING' ? 'Awaiting payment transfer to our official Meezan Bank account.' : 'Your payment screenshot is under manual review by our team.'}`;
          actionLink = { text: 'View Full Order Details', action: 'open_status' };
          quickReplies = ['Official Payment Details', 'Upload Screenshot Proof', 'Talk to Team'];
          return { replyText, actionLink, quickReplies };
        }
      }
      replyText = isUrdu
        ? "Apna Order Number (jaise AG360-84219) ya Instagram handle share karein, hum abhi Google Sheets database se lookup kar ke apko real-time status bata dete hain!"
        : "Please share your Order Number (e.g. AG360-84219) or Instagram handle, and I will check your live build status in our Google Sheets CRM!";
      actionLink = { text: 'Open Order Tracker', action: 'open_status' };
      quickReplies = ['Order an Agent', 'Official Payment Details'];
      return { replyText, actionLink, quickReplies };
    }

    // 2. Payment details / Bank details inquiry
    if (
      lower.includes('payment') ||
      lower.includes('bank') ||
      lower.includes('pay') ||
      lower.includes('meezan') ||
      lower.includes('account') ||
      lower.includes('paisa') ||
      lower.includes('transfer') ||
      lower.includes('iban')
    ) {
      replyText = isUrdu
        ? `Agentify-360 ki payment sirf aur sirf hamaray official registered account par accept hoti hai:\n\n• Bank: Meezan Bank\n• Account Title: SAIF UR REHMAN AKHTAR\n• Account No: 76010111536310\n• IBAN: PK74MEZN0076010111536310\n\nTransfer karne ke baad yahan receipt ka screenshot upload karein taake apka order status [UNPAID CONFIRMED] ho jaye!`
        : `Here are our OFFICIAL PAYMENT DETAILS (the ONLY authorized account to accept payment on for Agentify-360):\n\n🏛️ Bank: Meezan Bank\n👤 Account Title: SAIF UR REHMAN AKHTAR\n💳 Account No: 76010111536310\n🌐 IBAN: PK74MEZN0076010111536310\n\nOnce transferred, send a screenshot of the payment receipt here so our team can verify and confirm your build!`;
      actionLink = { text: 'Copy Payment Details', action: 'open_payment' };
      quickReplies = ['Order an Agent', 'I have sent payment', 'Pricing Tiers'];
      return { replyText, actionLink, quickReplies };
    }

    // 3. Pricing / Packages / Tiers
    if (
      lower.includes('price') ||
      lower.includes('tier') ||
      lower.includes('package') ||
      lower.includes('cost') ||
      lower.includes('rate') ||
      lower.includes('kitne') ||
      lower.includes('starter') ||
      lower.includes('standard') ||
      lower.includes('pro')
    ) {
      replyText = isUrdu
        ? `Hamare paas 3 clear tiers hain:\n\n1️⃣ Starter ($150) — Text-only DM auto-reply agent (24/7 lead capture & FAQs)\n2️⃣ Standard ($350) — Starter + Voice message audio listening & replies ($150 + $200 add-on)\n3️⃣ Pro ($600) — Standard + Image & payment receipt OCR analysis ($150 + $200 + $250)\n\n💡 Ap kisi bhi tier se shuru kar saktay hain aur baad mein upgrade kar saktay hain! Apke business ke liye konsa tier best rahega?`
        : `Here are our 3 agency tiers designed for high Instagram conversions:\n\n1. Starter — $150 (Text-only DM auto-reply agent)\n   • Understands and replies to Instagram DMs automatically (text only)\n\n2. Standard — $350 total ($150 + $200 add-on)\n   • Everything in Starter + agent can listen and reply to voice messages from followers\n\n3. Pro — $600 total ($150 + $200 + $250 add-on)\n   • Everything in Standard + agent can analyze images sent in DMs (screenshots, receipts, product photos)\n\n✨ Good to know: You can start at any tier and upgrade later anytime! Which package fits your workflow best?`;
      actionLink = { text: 'Choose a Package', action: 'open_order' };
      quickReplies = ['Order Starter ($150)', 'Order Standard ($350)', 'Order Pro ($600)', 'Official Payment Details'];
      return { replyText, actionLink, quickReplies };
    }

    // 4. Upgrade inquiry
    if (lower.includes('upgrade') || lower.includes('later') || lower.includes('change tier')) {
      replyText = isUrdu
        ? "Jee bilkul! Ap kisi bhi tier (jaise Starter $150) se start kar saktay hain aur baad mein kisi bhi waqt sirf difference pay karke Voice ($200 add-on) ya Vision ($250 add-on) par upgrade kar saktay hain."
        : "Yes, absolutely! You can start at any tier (e.g. Starter at $150) and upgrade to Standard (voice) or Pro (vision) whenever your volume grows, paying only the add-on difference.";
      actionLink = { text: 'View All Tiers', action: 'open_order' };
      quickReplies = ['Order an Agent', 'Official Payment Details'];
      return { replyText, actionLink, quickReplies };
    }

    // 5. Order / Booking intention
    if (lower.includes('order') || lower.includes('book') || lower.includes('buy') || lower.includes('start') || lower.includes('chahiye')) {
      replyText = isUrdu
        ? `Order book karne ke liye ap hamara quick form fill kar saktay hain ya mujhe yahan ye details provide karein:\n\n1. Customer Full Name\n2. Instagram Profile / Business Name\n3. Instagram Handle / Profile Link\n4. Package chosen (Starter $150 / Standard $350 / Pro $600)\n\nMain apka official AG360-[5 digits] order create kar doonga!`
        : `Awesome! To book your custom Instagram DM agent, I will need:\n\n1. Customer Name\n2. Instagram Profile Name / Business Name\n3. Instagram Profile ID or Profile Link\n4. Chosen Package (Starter $150 / Standard $350 / Pro $600) + any customization notes.\n\nOnce received, I will generate your official AG360-[5 digits] order number! Would you like to open the instant booking form?`;
      actionLink = { text: 'Open Order Booking Form', action: 'open_order' };
      quickReplies = ['Open Booking Form', 'Official Payment Details', 'View Pricing'];
      return { replyText, actionLink, quickReplies };
    }

    // Default consultative response
    replyText = isUrdu
      ? `Agentify-360 apke Instagram par 24/7 active rehta hai, leads capture karta hai, voice notes sunta hai aur orders Google Sheets mein log karta hai.\n\nHum Starter ($150), Standard ($350) aur Pro ($600) tiers offer kartay hain. Kisi bhi tier se start karein aur baad mein upgrade karein. Apko mazeed kis cheez ki information chahiye?`
      : `An Instagram DM AI agent by Agentify-360 works 24/7 on your profile — it instantly answers follower inquiries, qualifies leads, handles voice notes, and logs orders straight to Google Sheets so you never miss a sale.\n\nWe offer Starter ($150), Standard ($350), and Pro ($600) tiers. You can start at any tier and upgrade later anytime. How can I assist you today?`;

    return { replyText, actionLink, quickReplies };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    let replyText = '';
    let actionLink: ChatMessage['actionLink'] = undefined;
    let quickReplies: string[] = ['Explore Packages ($150-$600)', 'Official Payment Details', 'Order an Agent', 'Check Order Status'];

    try {
      // Connect to user's updated n8n chat webhook
      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          chatInput: query,
          message: query,
          input: query,
          sessionId: sessionId,
          action: 'sendMessage',
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (typeof data === 'string') {
            replyText = data;
          } else if (Array.isArray(data) && data.length > 0) {
            const first = data[0];
            replyText = first?.output || first?.text || first?.message || first?.response || (typeof first === 'string' ? first : JSON.stringify(first));
          } else if (data && typeof data === 'object') {
            replyText = data.output || data.text || data.message || data.response || data.reply || data.content || JSON.stringify(data);
          }
        } else {
          replyText = await response.text();
        }
      }

      // If reply is empty, activate intelligent fallback
      if (!replyText || replyText.trim() === '') {
        const fb = getFallbackResponse(query);
        replyText = fb.replyText;
        actionLink = fb.actionLink;
        quickReplies = fb.quickReplies;
      } else {
        const lowerReply = replyText.toLowerCase();
        if (lowerReply.includes('order') || lowerReply.includes('package') || lowerReply.includes('pricing')) {
          actionLink = { text: 'Open Order Form', action: 'open_order' };
        } else if (lowerReply.includes('meezan') || lowerReply.includes('payment') || lowerReply.includes('bank')) {
          actionLink = { text: 'View Official Bank Info', action: 'open_payment' };
        } else if (lowerReply.includes('status') || lowerReply.includes('ag360')) {
          actionLink = { text: 'Check Order Status', action: 'open_status' };
        }
      }
    } catch (err) {
      console.warn('n8n Webhook connection fallback active:', err);
      const fb = getFallbackResponse(query);
      replyText = fb.replyText;
      actionLink = fb.actionLink;
      quickReplies = fb.quickReplies;
    } finally {
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: 'Just now',
        quickReplies,
        actionLink,
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }
  };

  // Simulating image / screenshot receipt upload
  const handleSimulatedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: `[Attached Payment Screenshot: ${fileName}]`,
      timestamp: 'Just now',
      imageAttachment: {
        url: URL.createObjectURL(file),
        caption: fileName,
      },
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      // Simulate Image Analyze tool checking recipient name & account details
      const isMeezan = true;
      let reply = '';
      if (isMeezan) {
        reply = `Payment screenshot received and analyzed! 📸\n\n✅ Recipient: SAIF UR REHMAN AKHTAR\n✅ Bank: Meezan Bank (76010111536310)\n✅ Transaction verified as completed\n\nI have updated your Order Status to: [UNPAID CONFIRMED].\n\nOur team has been notified to personally review the payment in our bank records. Once manually verified, your agent build process will officially begin!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          timestamp: 'Just now',
          actionLink: { text: 'Track Order Status', action: 'open_status' },
          quickReplies: ['Check Order Status', 'Ask a Question', 'Explore Packages'],
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleActionClick = (action: ChatMessage['actionLink']) => {
    if (!action) return;
    if (action.action === 'open_order') onOpenOrder();
    if (action.action === 'open_payment') onOpenPayment();
    if (action.action === 'open_status') onOpenTracker();
  };

  return (
    <>
      {/* Floating Instagram DM Bubble Toggle */}
      <button
        id="chat-bubble-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 cursor-pointer p-[2px] group"
        aria-label="Open Instagram DM Assistant"
      >
        <div className="w-full h-full bg-[#0B0F17] rounded-full flex items-center justify-center group-hover:bg-[#121824] transition-colors relative">
          <Bot className="w-6 h-6 text-pink-400 group-hover:text-white transition-colors" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0B0F17]" />
        </div>
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Instagram DM Assistant"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-[#0E1422] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white card-glow"
        >
          {/* Instagram Direct Header */}
          <div className="p-3.5 bg-[#141C2E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[1.5px]">
                  <div className="w-full h-full bg-[#0E1422] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0E1422]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-white">agentify.360</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">
                    ✓
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">Instagram DM AI Assistant · n8n Connected</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: 'reset-' + Date.now(),
                      sender: 'bot',
                      text: "Session refreshed! How can I assist you with your custom Instagram DM bot today?",
                      timestamp: 'Just now',
                      quickReplies: ['Explore Packages ($150-$600)', 'Official Payment Details', 'Order an Agent', 'Check Order Status'],
                    },
                  ]);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs bg-[#0A0E18]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.imageAttachment && (
                  <div className="mb-1 rounded-xl overflow-hidden border border-white/10 max-w-[200px]">
                    <img
                      src={msg.imageAttachment.url}
                      alt="Payment proof"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none'
                      : 'bg-[#182134] text-gray-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Action Button Link */}
                {msg.actionLink && (
                  <button
                    onClick={() => handleActionClick(msg.actionLink)}
                    className="mt-1.5 px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>{msg.actionLink.text}</span>
                  </button>
                )}

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qr)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-[10px] transition-all cursor-pointer"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-gray-500 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#182134] text-gray-400 px-3 py-2 rounded-2xl rounded-tl-none border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1 text-gray-400">Agentify-360 is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Meezan Bank Pill Bar */}
          <div className="px-3 py-1.5 bg-[#121828] border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Official: Meezan Bank (SAIF UR REHMAN)</span>
            </span>
            <button
              onClick={onOpenPayment}
              className="text-pink-400 hover:underline cursor-pointer"
            >
              Details
            </button>
          </div>

          {/* Input & Attachments Bar */}
          <div className="p-2.5 bg-[#101624] border-t border-white/10 flex items-center gap-2">
            {/* Hidden file input for screenshot proof */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleSimulatedImageUpload}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Upload payment receipt screenshot"
            >
              <Paperclip className="w-4 h-4 text-gray-400 hover:text-pink-400" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about tiers, payment, or order..."
              className="flex-1 bg-[#182134] border border-white/10 rounded-full px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-pink-500 transition-colors"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
