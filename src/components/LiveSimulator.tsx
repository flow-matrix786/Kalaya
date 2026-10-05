import React, { useState } from 'react';
import { Bot, Sparkles, Send, Mic, Play, Pause, Image as ImageIcon, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

export const LiveSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'text' | 'voice' | 'vision'>('text');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [conversation, setConversation] = useState<
    Array<{
      id: string;
      from: 'user' | 'bot';
      text?: string;
      audio?: { duration: string; transcript: string };
      image?: { name: string; status: string; amount: string };
      time: string;
    }>
  >([
    {
      id: '1',
      from: 'user',
      text: 'Salam! What is the price of an Instagram DM AI agent for my coaching business?',
      time: '11:42 AM',
    },
    {
      id: '2',
      from: 'bot',
      text: 'Walaikum Assalam! 🚀 We build custom Instagram DM agents for creators & businesses at Agentify-360. Here are our 3 clear packages:\n\n1️⃣ Starter ($150) — Text-only 24/7 DM auto-reply agent\n2️⃣ Standard ($350) — Starter + Voice message audio reply\n3️⃣ Pro ($600) — Standard + Image & payment receipt OCR analysis\n\nYou can start at any tier and upgrade later anytime! Which features are you most interested in?',
      time: '11:42 AM',
    },
  ]);

  const handleScenarioChange = (scenario: 'text' | 'voice' | 'vision') => {
    setActiveScenario(scenario);
    if (scenario === 'text') {
      setConversation([
        {
          id: '1',
          from: 'user',
          text: 'Hi, I run an e-commerce clothing store. How will the Starter tier help me?',
          time: '2:14 PM',
        },
        {
          id: '2',
          from: 'bot',
          text: 'Hey! The Starter Tier ($150) instantly answers product questions, size guides, shipping queries 24/7, and collects customer names & phone numbers straight into Google Sheets so you never miss a sale!',
          time: '2:14 PM',
        },
      ]);
    } else if (scenario === 'voice') {
      setConversation([
        {
          id: '1',
          from: 'user',
          audio: {
            duration: '0:18',
            transcript: 'Aoa, can your AI agent listen to voice notes and reply back in Urdu or English voice?',
          },
          time: '3:05 PM',
        },
        {
          id: '2',
          from: 'bot',
          text: 'Voice note transcribed in 0.8 seconds! 🎙️ Yes! In our Standard ($350) and Pro ($600) tiers, the agent listens to follower voice notes, understands English and Roman Urdu, and replies back with natural synthesized voice notes!',
          time: '3:05 PM',
        },
      ]);
    } else if (scenario === 'vision') {
      setConversation([
        {
          id: '1',
          from: 'user',
          image: {
            name: 'Meezan_App_Receipt_9841.jpg',
            status: 'Transfer Receipt Attached ($600)',
            amount: '$600 (Meezan Bank)',
          },
          text: 'Here is the payment screenshot for my Pro package order AG360-84219. Please verify!',
          time: '4:20 PM',
        },
        {
          id: '2',
          from: 'bot',
          text: 'Payment screenshot analyzed via Computer Vision! 📸\n\n✅ Recipient: SAIF UR REHMAN AKHTAR\n✅ Account: 76010111536310 (Meezan Bank)\n✅ Amount: $600 (Pro Tier)\n\nYour Order Status is updated to: [UNPAID CONFIRMED]. Our team will perform final verification in the bank account and start your build!',
          time: '4:21 PM',
        },
      ]);
    }
  };

  const handleSendCustom = (customText?: string) => {
    const txt = customText || inputVal.trim();
    if (!txt) return;

    const userEntry = {
      id: Date.now().toString(),
      from: 'user' as const,
      text: txt,
      time: 'Just now',
    };

    let botResponse =
      "Thanks for your message! At Agentify-360, we build custom Instagram DM bots tailored to your brand voice. Starter is $150, Standard with Voice is $350, and Pro with Image Vision is $600. All official payments go to Meezan Bank (SAIF UR REHMAN AKHTAR). You can upgrade anytime!";

    const lower = txt.toLowerCase();
    if (lower.includes('bank') || lower.includes('payment') || lower.includes('pay') || lower.includes('meezan')) {
      botResponse = `Here are our official Meezan Bank payment details:\n• Bank: Meezan Bank\n• Title: SAIF UR REHMAN AKHTAR\n• Account No: 76010111536310\n• IBAN: PK74MEZN0076010111536310\n\nPlease transfer only to this authorized account and send the screenshot proof to mark status as UNPAID CONFIRMED.`;
    } else if (lower.includes('tier') || lower.includes('package') || lower.includes('price') || lower.includes('cost')) {
      botResponse = `Our 3 agency packages:\n• Starter: $150 (Text-only 24/7 DM bot)\n• Standard: $350 (Starter + Voice note replies)\n• Pro: $600 (Standard + Image/Receipt OCR)\n\nYou can start at Starter and upgrade anytime later!`;
    } else if (lower.includes('voice') || lower.includes('audio')) {
      botResponse = `Our Voice feature is included in the Standard ($350) and Pro ($600) tiers! The bot transcribes incoming audio notes from your followers and can reply back in custom audio voice notes.`;
    } else if (lower.includes('image') || lower.includes('receipt') || lower.includes('screenshot')) {
      botResponse = `Image analysis is available on the Pro Tier ($600). It reads payment slips, product screenshots, and checks recipient name (SAIF UR REHMAN AKHTAR) and amount automatically!`;
    }

    setConversation((prev) => [
      ...prev,
      userEntry,
      {
        id: (Date.now() + 1).toString(),
        from: 'bot' as const,
        text: botResponse,
        time: 'Just now',
      },
    ]);
    setInputVal('');
  };

  return (
    <section id="simulator" className="py-24 bg-[#0B0F17] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-semibold text-pink-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Instagram DM Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See How Your Followers <span className="ig-gradient-text">Experience Your Bot</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Select a capability below to watch our custom AI agent handle text inquiries, audio voice messages, and payment receipt screenshots in real time.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="bg-[#121824] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="bg-[#172030] p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Select Demo Mode:</span>
              <div className="flex items-center gap-1.5 bg-[#0B0F17] p-1 rounded-xl">
                <button
                  onClick={() => handleScenarioChange('text')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeScenario === 'text'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Starter ($150 Text)
                </button>
                <button
                  onClick={() => handleScenarioChange('voice')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeScenario === 'voice'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Standard ($350 Voice)
                </button>
                <button
                  onClick={() => handleScenarioChange('vision')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeScenario === 'vision'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pro ($600 Vision)
                </button>
              </div>
            </div>

            <button
              onClick={() => handleScenarioChange(activeScenario)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Chat</span>
            </button>
          </div>

          {/* Instagram Chat Shell */}
          <div className="p-4 sm:p-6 bg-[#0E131F]">
            {/* Direct Message Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px]">
                    <div className="w-full h-full bg-[#121824] rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121824]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm">agentify.360</span>
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Instagram DM Automation Agent · Active Now</p>
                </div>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="space-y-4 min-h-[320px] max-h-[440px] overflow-y-auto pr-2">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.from === 'user' ? (
                    <div className="max-w-[85%] sm:max-w-[70%]">
                      {/* Audio Note User Bubble */}
                      {msg.audio && (
                        <div className="p-3 rounded-2xl rounded-tr-none bg-[#374151] text-white space-y-2">
                          <div className="flex items-center gap-3">
                            <Mic className="w-5 h-5 text-pink-400" />
                            <div className="flex items-center gap-1">
                              {[12, 24, 16, 28, 14, 20, 10, 22, 18, 30, 16].map((h, i) => (
                                <span
                                  key={i}
                                  style={{ height: `${h}px` }}
                                  className="w-1 bg-pink-400 rounded-full"
                                />
                              ))}
                              <span className="text-xs font-mono ml-2 text-gray-300">{msg.audio.duration}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 italic border-t border-white/10 pt-1">
                            "{msg.audio.transcript}"
                          </p>
                        </div>
                      )}

                      {/* Image User Bubble */}
                      {msg.image && (
                        <div className="p-3 rounded-2xl rounded-tr-none bg-[#374151] text-white space-y-2 mb-2">
                          <div className="flex items-center gap-2 p-2 bg-black/40 rounded-xl">
                            <ImageIcon className="w-5 h-5 text-emerald-400" />
                            <div>
                              <p className="text-xs font-semibold text-white">{msg.image.name}</p>
                              <p className="text-[10px] text-emerald-300">{msg.image.status}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Text message */}
                      {msg.text && (
                        <div className="p-3.5 rounded-2xl rounded-tr-none bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm shadow-md leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </div>
                      )}
                      <span className="text-[10px] text-gray-500 mt-1 block text-right">{msg.time}</span>
                    </div>
                  ) : (
                    <div className="max-w-[85%] sm:max-w-[75%] space-y-1">
                      <div className="p-4 rounded-2xl rounded-tl-none bg-[#1C2538] border border-white/10 text-gray-200 text-sm shadow-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-500 ml-1">{msg.time} · Sent by AI Agent</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Test Prompt Chips */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Click a prompt to simulate client response:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendCustom('What are the official Meezan Bank details to pay?')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-emerald-300 border border-emerald-500/20 transition-colors cursor-pointer"
                >
                  💳 Official Meezan Bank Details
                </button>
                <button
                  onClick={() => handleSendCustom('What is the difference between Starter and Pro?')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-pink-300 border border-pink-500/20 transition-colors cursor-pointer"
                >
                  ⚡ Starter ($150) vs Pro ($600)
                </button>
                <button
                  onClick={() => handleSendCustom('Can I upgrade from Starter to Standard later?')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-amber-300 border border-amber-500/20 transition-colors cursor-pointer"
                >
                  🔄 Can I upgrade later?
                </button>
                <button
                  onClick={() => handleSendCustom('How do you connect to Google Sheets CRM?')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-blue-300 border border-blue-500/20 transition-colors cursor-pointer"
                >
                  📊 Google Sheets CRM Sync
                </button>
              </div>
            </div>

            {/* Custom Input Bar */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCustom()}
                placeholder="Type your own question as a potential client..."
                className="flex-1 bg-[#151C2C] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-pink-500 transition-colors"
              />
              <button
                onClick={() => handleSendCustom()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
