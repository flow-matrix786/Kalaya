import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { ChatMessage } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

const N8N_CHAT_WEBHOOK_URL = 'https://flowing-matrix.app.n8n.cloud/webhook/5393ab60-563c-4961-b100-3f53e58957e1/chat';

interface ChatbotWidgetProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenAbout: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenAbout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Sawasdee! 🌶️ Welcome to Kalaya Southern Thai Kitchen. I am your connected n8n AI concierge. How may I assist your dining plans today?',
      timestamp: 'Just now',
      quickReplies: ['Reservations', 'Menu Highlights', 'Hours & Location', 'Spice & Dietary', 'Chef Nok’s Story'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persistent session identifier for n8n conversational memory
  const [sessionId] = useState<string>(() => {
    try {
      const existing = window.sessionStorage.getItem('kalaya_n8n_session_id');
      if (existing) return existing;
      const newId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      window.sessionStorage.setItem('kalaya_n8n_session_id', newId);
      return newId;
    } catch {
      return 'session_' + Math.random().toString(36).substring(2, 11);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Contextual fallback response in case of network issue
  const getFallbackResponse = (query: string): { replyText: string; actionLink?: ChatMessage['actionLink']; quickReplies: string[] } => {
    const lower = query.toLowerCase();
    let replyText = '';
    let actionLink: ChatMessage['actionLink'] = undefined;
    let quickReplies: string[] = ['Reservations', 'Menu Highlights', 'Hours & Location'];

    if (lower.includes('reserv') || lower.includes('book') || lower.includes('table') || lower.includes('resy')) {
      replyText =
        'Reservations open daily at 10:00 AM EST on Resy for dates 30 days in advance. We also welcome walk-ins at our cocktail bar & Chef’s Counter every evening! Would you like to book now?';
      actionLink = { text: 'Book Table Online', action: 'open_reservations' };
      quickReplies = ['Menu Highlights', 'Hours & Location', 'Parking'];
    } else if (
      lower.includes('menu') ||
      lower.includes('dish') ||
      lower.includes('food') ||
      lower.includes('curry') ||
      lower.includes('crab') ||
      lower.includes('prawn')
    ) {
      replyText =
        'Our menu showcases royal flower dumplings (Shaw Muang), jumbo lump blue crab yellow curry (Phoo Pad Pong Karee), fiery sour barramundi curry (Kang Som), and charcoal-grilled giant river prawns.';
      actionLink = { text: 'Explore Full Menu', action: 'open_menu' };
      quickReplies = ['Spice & Dietary', 'Reservations', 'Desserts'];
    } else if (
      lower.includes('hour') ||
      lower.includes('time') ||
      lower.includes('open') ||
      lower.includes('close') ||
      lower.includes('lunch')
    ) {
      replyText =
        'Dinner is served Sun–Thu 5:00 PM – 10:00 PM and Fri–Sat 5:00 PM – 11:00 PM. Weekend Lunch is served Saturday & Sunday 11:00 AM – 2:30 PM.';
      quickReplies = ['Reservations', 'Location', 'Menu Highlights'];
    } else if (
      lower.includes('location') ||
      lower.includes('where') ||
      lower.includes('address') ||
      lower.includes('park') ||
      lower.includes('fishtown')
    ) {
      replyText =
        'We are located at 4 W. Palmer Street in Fishtown, Philadelphia (19125), at Palmer & Front Street. Street parking is accessible along Front St and Palmer St.';
      quickReplies = ['Reservations', 'Hours', 'Menu Highlights'];
    } else if (
      lower.includes('spice') ||
      lower.includes('spicy') ||
      lower.includes('heat') ||
      lower.includes('diet') ||
      lower.includes('gluten') ||
      lower.includes('vegan') ||
      lower.includes('allergy')
    ) {
      replyText =
        'Southern Thai cuisine embraces unapologetic spice with fresh turmeric and bird’s eye chilies. We offer mild and balanced dishes as well as fiery traditional curries. Many items are naturally Gluten-Free and Dairy-Free!';
      actionLink = { text: 'View Dietary Menu Options', action: 'open_menu' };
      quickReplies = ['Menu Highlights', 'Reservations', 'Chef Story'];
    } else if (
      lower.includes('chef') ||
      lower.includes('nok') ||
      lower.includes('award') ||
      lower.includes('james beard') ||
      lower.includes('story') ||
      lower.includes('cookbook')
    ) {
      replyText =
        'Chef Chutatip “Nok” Suntaranon is the 2023 James Beard Award Winner for Best Chef: Mid-Atlantic. Raised in Trang, Thailand, she created Kalaya in loving tribute to her mother, earning global praise on Netflix’s Chef’s Table.';
      actionLink = { text: 'Read Chef’s Full Biography', action: 'open_chef' };
      quickReplies = ['Reservations', 'Menu Highlights', 'Hours'];
    } else {
      replyText =
        'Thank you for reaching out! Our team is delighted to assist you with reservations, dietary questions, or dining inquiries. You can also call us directly at ' +
        RESTAURANT_INFO.phone +
        ' or book on Resy.';
      quickReplies = ['Reservations', 'Menu Highlights', 'Hours & Location', 'Spice & Dietary'];
    }

    return { replyText, actionLink, quickReplies };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    let replyText = '';
    let actionLink: ChatMessage['actionLink'] = undefined;
    let quickReplies: string[] = ['Reservations', 'Menu Highlights', 'Hours & Location'];

    try {
      // Send message payload to user's n8n webhook
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

      // If replyText is still empty after fetch, use fallback
      if (!replyText || replyText.trim() === '') {
        const fb = getFallbackResponse(query);
        replyText = fb.replyText;
        actionLink = fb.actionLink;
        quickReplies = fb.quickReplies;
      } else {
        // Evaluate if n8n returned keywords that could benefit from contextual shortcut buttons
        const lowerReply = replyText.toLowerCase();
        if (lowerReply.includes('reserv') || lowerReply.includes('book') || lowerReply.includes('table')) {
          actionLink = { text: 'Book Table Online', action: 'open_reservations' };
        } else if (lowerReply.includes('menu') || lowerReply.includes('dishes') || lowerReply.includes('curry')) {
          actionLink = { text: 'Explore Full Menu', action: 'open_menu' };
        } else if (lowerReply.includes('chef nok') || lowerReply.includes('james beard')) {
          actionLink = { text: 'Chef Nok Biography', action: 'open_chef' };
        }
      }
    } catch (err) {
      console.warn('n8n Webhook request error, using concierge fallback:', err);
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

  const handleActionClick = (action: ChatMessage['actionLink']) => {
    if (!action) return;
    if (action.action === 'open_reservations') onOpenReservation();
    if (action.action === 'open_menu') onOpenMenu();
    if (action.action === 'open_chef') onOpenAbout();
  };

  const handleResetSession = () => {
    try {
      const newId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      window.sessionStorage.setItem('kalaya_n8n_session_id', newId);
    } catch (e) {
      // ignore
    }
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: 'Sawasdee! Session refreshed. I am your connected n8n AI concierge. How may I assist you?',
        timestamp: 'Just now',
        quickReplies: ['Reservations', 'Menu Highlights', 'Hours & Location', 'Spice & Dietary', 'Chef Nok’s Story'],
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Bubble Icon Button (Bottom-Right) */}
      <button
        id="chat-bubble-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#B5502D] hover:bg-[#943F22] text-[#F5EFE3] border-2 border-[#C9A44C] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#C9A44C] group"
        aria-label={isOpen ? 'Close concierge assistant' : 'Open Kalaya AI Concierge'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#F5EFE3]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#F5EFE3] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C9A44C] rounded-full ring-2 ring-[#1C1710]" />
          </div>
        )}
      </button>

      {/* Chat Panel Window */}
      {isOpen && (
        <div
          id="chat-panel-container"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[78vh] bg-[#1C1710] border border-[#C9A44C]/40 rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#F5EFE3] animate-in fade-in slide-in-from-bottom-5 duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-widget-header"
        >
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-[#B5502D] to-[#943F22] text-[#F5EFE3] flex items-center justify-between border-b border-[#C9A44C]/30 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1710] border border-[#C9A44C] flex items-center justify-center text-[#C9A44C]">
                <BotanicalMotif variant="lotus" className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 id="chat-widget-header" className="font-display italic font-semibold text-sm leading-tight text-[#F5EFE3]">
                    Kalaya AI Concierge
                  </h4>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-[#1C1710]/60 text-[#C9A44C] border border-[#C9A44C]/30 font-mono font-medium">
                    <Zap className="w-2.5 h-2.5" />
                    n8n
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#E3CAA0] mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Webhook · Southern Thai Assistant</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetSession}
                title="Reset conversation session"
                className="p-1.5 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
                aria-label="Reset chat session"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
                aria-label="Minimize chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#241D13]/90 bg-botanical-pattern">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#C9A44C] text-[#1C1710] font-medium rounded-br-none'
                      : 'bg-[#1C1710] text-[#F5EFE3] border border-[#C9A44C]/25 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Action Link Button inside bot message */}
                  {msg.actionLink && (
                    <button
                      onClick={() => handleActionClick(msg.actionLink)}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-[#B5502D] hover:bg-[#943F22] text-white transition-colors shadow"
                    >
                      <Sparkles className="w-3 h-3 text-[#E3CAA0]" />
                      {msg.actionLink.text}
                    </button>
                  )}
                </div>

                {/* Quick replies for this message if present */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qr)}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-[#C9A44C]/40 bg-[#1C1710]/80 text-[#E3CAA0] hover:bg-[#C9A44C] hover:text-[#1C1710] transition-all font-medium"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-lg bg-[#1C1710] border border-[#C9A44C]/20 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-[#1C1710] border-t border-[#C9A44C]/25 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about booking, curries, parking..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 bg-[#241D13] border border-[#C9A44C]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-[#C9A44C] text-[#1C1710] hover:bg-[#E3CAA0] disabled:opacity-40 disabled:hover:bg-[#C9A44C] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
