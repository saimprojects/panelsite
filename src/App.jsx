import { useState, useEffect, useRef } from "react";

const PAYMENT_LINK = "https://checkout.freemius.com/product/26722/plan/50607/";
const IMAGE_URL = "https://res.cloudinary.com/dxommxt6d/image/upload/v1780135584/1_iojtst.png";

// Updated TOOLS with actual database items
const TOOLS = [
  { icon: "🤖", name: "ChatGPT Plus & Business", desc: "ChatGPT Plus, Business Plan & Go Plan TRIO accounts", count: 4, premium: true },
  { icon: "🎬", name: "AI Video Generators", desc: "VEO 3 Ultra Official Account, Capcut Pro, Picsart Premium", count: 3, premium: true },
  { icon: "🧠", name: "AI Assistant Suite", desc: "Claude AI Pro, Perplexity AI, Gemini Pro, Manus AI, Blackbox AI", count: 6, premium: true },
  { icon: "🎨", name: "Design & Creative", desc: "Canva Pro, Figma Premium, Beautiful.ai, Adobe Premium", count: 4, premium: true },
  { icon: "🔍", name: "SEO & Marketing Tools", desc: "Semrush Premium, Erank Expert, QuickAds AI, Ocoya", count: 4, premium: true },
  { icon: "🛡️", name: "VPN & Security", desc: "ExpressVPN, Surfshark VPN, Proton Unlimited, Opera VPN, Avira Phantom", count: 5, premium: true },
  { icon: "🎮", name: "Gaming & Entertainment", desc: "GTA V, Minecraft, Netflix Premium, Spotify, Duolingo", count: 5, premium: true },
  { icon: "💼", name: "Business & Productivity", desc: "Microsoft 365, Make.com, ClickUp Pro, Linear, Miro", count: 5, premium: true },
];

// Detailed tools list from your database
const ALL_TOOLS = [
  { name: "Anything AI", credits: "20K Credits", status: "Active", type: "AI" },
  { name: "VEO 3 Ultra", guarantee: "25 days replacement", status: "Active", type: "AI Video" },
  { name: "ChatGPT Business Plan", type: "AI", status: "Monthly" },
  { name: "ChatGPT Plus", type: "AI", status: "Subscription" },
  { name: "ChatGPT Go Plan TRIO", type: "AI", status: "Available" },
  { name: "Claude AI Pro", type: "AI", status: "Subscription" },
  { name: "Perplexity AI", type: "AI", status: "Premium" },
  { name: "Gemini Pro", type: "AI", status: "Private Account" },
  { name: "Manus AI", credits: "8000 Credits Weekly", status: "Active" },
  { name: "Blackbox AI", type: "AI", status: "Premium" },
  { name: "Kiro AI Pro", type: "AI", status: "Subscription" },
  { name: "Cosine AI", type: "AI", status: "Premium" },
  { name: "Onton AI", type: "AI", status: "Premium" },
  { name: "Fluig AI Pro", type: "AI", status: "Active" },
  { name: "Superflex AI", type: "AI", status: "Premium" },
  { name: "Lamatic AI", type: "AI", status: "Premium" },
  { name: "IASK AI", type: "AI", status: "Premium" },
  { name: "Cramly AI", type: "AI", status: "Premium" },
  { name: "Canva Pro", type: "Design", status: "Unlimited Designs" },
  { name: "Capcut Pro", type: "Design", status: "Subscription" },
  { name: "Figma Premium", type: "Design", status: "Subscription" },
  { name: "Picsart Premium", type: "Design", status: "Subscription" },
  { name: "Beautiful.ai", type: "Design", status: "Premium" },
  { name: "Adobe Premium", type: "Design", status: "Subscription" },
  { name: "Semrush Premium", type: "SEO", status: "Subscription" },
  { name: "Erank Expert Plan", type: "SEO", status: "Available" },
  { name: "QuickAds AI", type: "Marketing", status: "Premium" },
  { name: "Ocoya", type: "Marketing", status: "Premium" },
  { name: "ExpressVPN", type: "VPN", status: "Premium" },
  { name: "Surfshark VPN", type: "VPN", status: "Premium" },
  { name: "Proton Unlimited", type: "VPN", status: "Subscription" },
  { name: "Opera VPN Pro", type: "VPN", status: "Subscription" },
  { name: "Avira Phantom VPN Pro", type: "VPN", status: "Active" },
  { name: "Microsoft 365", type: "Productivity", status: "Subscription" },
  { name: "Make.com", type: "Automation", status: "Premium" },
  { name: "ClickUp Pro", type: "Productivity", status: "Subscription" },
  { name: "Linear Premium", type: "Productivity", status: "Subscription" },
  { name: "Miro Business Plan", type: "Productivity", status: "Subscription" },
  { name: "Replit Core", type: "Coding", status: "Premium" },
  { name: "GTA V Enhanced", type: "Gaming", status: "Global Key" },
  { name: "Minecraft", type: "Gaming", status: "Official" },
  { name: "Netflix Premium", type: "Entertainment", status: "Premium Screen" },
  { name: "Spotify", type: "Entertainment", status: "Subscription" },
  { name: "Duolingo Premium", type: "Learning", status: "Subscription" },
  { name: "Skillshare Premium", type: "Learning", status: "Subscription" },
  { name: "Brilliant.org", type: "Learning", status: "Premium" },
  { name: "EdX Premium", type: "Learning", status: "Subscription" },
  { name: "Framer Pro", type: "Web", status: "Subscription" },
  { name: "Loveable Lite Plan", type: "Web", status: "Subscription" },
  { name: "Linktree Pro", type: "Web", status: "Subscription" },
  { name: "B12.io", type: "Web", status: "AI Website Builder" },
  { name: "Anima App", type: "Design", status: "Premium" },
  { name: "AI Fiesta", type: "AI", status: "Premium" },
  { name: "Wisprflow.ai", type: "AI", status: "Pro" },
  { name: "Joonbot", type: "AI", status: "Premium" },
  { name: "CamScanner", type: "Productivity", status: "Premium" },
  { name: "Pdf2Go", type: "Productivity", status: "Premium" },
  { name: "Craft.do", type: "Productivity", status: "Pro" },
  { name: "ICE.BIO", type: "Web", status: "Premium" },
  { name: "Reforge.com", type: "Learning", status: "Professional" },
];

const REVIEWS = [
  { name: "Hamza Malik", city: "Lahore", country: "Pakistan", stars: 5, text: "60+ premium tools ek jagah! ChatGPT Plus, Canva Pro, ExpressVPN sab mil gaya. Best investment ever!", date: "May 2025" },
  { name: "Fatima Noor", city: "Karachi", country: "Pakistan", stars: 5, text: "Mujhe laga tha scam hai lekin sach mein sab kuch mila. VEO 3 Ultra aur Capcut Pro ne mere edits next level kar diye!", date: "April 2025" },
  { name: "Usman Tariq", city: "Islamabad", country: "Pakistan", stars: 5, text: "Semrush aur Erank expert plan mil gaya. SEO tools ke liye akela yeh panel kafi hai!", date: "May 2025" },
  { name: "Michael Chen", city: "Singapore", country: "Singapore", stars: 5, text: "The variety is insane! From ChatGPT Business to Surfshark VPN to GTA V - all in one place.", date: "May 2025" },
  { name: "Sarah Johnson", city: "London", country: "UK", stars: 5, text: "Saved over $500/month on subscriptions. Claude AI Pro + Perplexity AI alone worth the price.", date: "April 2025" },
  { name: "David Kim", city: "Seoul", country: "South Korea", stars: 5, text: "Manus AI with 8000 weekly credits is a game changer. Best panel I've ever used.", date: "March 2025" },
  { name: "Priya Sharma", city: "Mumbai", country: "India", stars: 5, text: "Microsoft 365, Make.com, ClickUp Pro - all premium tools for one time payment. Amazing!", date: "May 2025" },
  { name: "James Wilson", city: "Sydney", country: "Australia", stars: 5, text: "Netflix Premium + Spotify + Minecraft - entertainment covered! Plus all AI tools.", date: "April 2025" },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        else if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        else if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        else if (days > 0) return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        else { setIsActive(false); return { days: 0, hours: 0, minutes: 0, seconds: 0 }; }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive]);

  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="flex gap-2 md:gap-4 justify-center mt-4">
      {[["days", "Days"], ["hours", "Hrs"], ["minutes", "Min"], ["seconds", "Sec"]].map(([key, label]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="bg-black text-yellow-400 font-mono text-2xl md:text-4xl font-black px-3 md:px-5 py-2 md:py-3 rounded-xl border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 min-w-[56px] md:min-w-[72px] text-center">
            {pad(timeLeft[key])}
          </div>
          <span className="text-yellow-300 text-xs mt-1 font-semibold tracking-widest uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}

function StarRating({ stars }) {
  return <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-600"}>★</span>)}</div>;
}

function ReviewCard({ review }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 hover:border-emerald-500/60 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start"><StarRating stars={review.stars} /><span className="text-gray-600 text-xs">{review.date}</span></div>
      <p className="text-gray-300 text-sm mt-3 leading-relaxed italic">"{review.text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">{review.name[0]}</div>
        <div><p className="text-white font-semibold text-sm">{review.name}</p><p className="text-gray-500 text-xs">📍 {review.city}, {review.country}</p></div>
        <div className="ml-auto"><span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">✓ Verified</span></div>
      </div>
    </div>
  );
}

export default function App() {
  const [visibleSections, setVisibleSections] = useState({});
  const [showAllTools, setShowAllTools] = useState(false);
  const displayedTools = showAllTools ? ALL_TOOLS : ALL_TOOLS.slice(0, 24);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setVisibleSections(prev => ({ ...prev, [entry.target.id]: true })); });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-animate]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-600 to-teal-600 text-black text-center py-3 px-4 text-sm font-extrabold tracking-wide animate-pulse">
        🎉 62+ PREMIUM TOOLS ACCESS — ChatGPT Plus, Canva Pro, ExpressVPN, Netflix & MORE! 🎉
      </div>

      {/* Header */}
      <header className="border-b border-gray-800/60 bg-gray-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-lg animate-float">🔧</div>
            <div><span className="text-white font-black text-lg">Tools Methods</span><span className="text-emerald-400 font-black text-lg"> Panel</span></div>
          </div>
          <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/40 hover:scale-105">
            Buy Now — $165
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section data-animate id="hero" className={`max-w-6xl mx-auto px-4 pt-14 pb-10 text-center transition-all duration-700 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />⚡ 62+ Premium Tools — One Time Payment!
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Tools Methods</span><br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent shimmer-text">62+ Premium Tools Access</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Access <span className="text-white font-bold">ChatGPT Plus, Canva Pro, ExpressVPN, Netflix, Semrush, Capcut Pro</span> and <span className="text-emerald-400 font-bold">60+ other premium tools</span> for a single one-time payment!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "🔧", val: "62+", label: "Premium Tools", change: "All subscriptions" },
              { icon: "⭐", val: "4.92/5", label: "Rating", change: "from 2400+ reviews" },
              { icon: "💰", val: "$500+", label: "Monthly Value", change: "you're saving" },
              { icon: "🌍", val: "32", label: "Countries", change: "worldwide" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-2 hover:border-emerald-500/50 transition-all hover:scale-105">
                <span className="text-xl">{s.icon}</span>
                <div><p className="text-white font-black text-base">{s.val}</p><p className="text-gray-500 text-xs">{s.label}</p></div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-emerald-500/40 rounded-3xl p-7 shadow-2xl mb-6 glow-animate">
            <div className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/40 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold mb-5">🎁 Eid Special — Only 3 Days Left!</div>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-gray-500 text-3xl font-black line-through">$250</span>
              <span className="text-5xl md:text-6xl font-black text-emerald-400">$165</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">One-time payment • Lifetime Access • 62+ Tools</p>
            <div className="inline-block bg-red-500/15 text-red-400 border border-red-500/30 text-xs px-3 py-1 rounded-full font-bold mb-5">🔥 Save $85 — Get 62+ Premium Subscriptions!</div>
            <div className="mb-6"><p className="text-gray-400 text-sm mb-1 font-semibold">⏳ Offer ends in:</p><CountdownTimer /></div>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-lg py-4 rounded-2xl transition-all shadow-xl text-center">🚀 Get Access to 62+ Tools — $165</a>
            <p className="text-gray-600 text-xs mt-3">✅ Secure Payment &nbsp;|&nbsp; 🔒 SSL Encrypted &nbsp;|&nbsp; 📧 2-3 Day Delivery</p>
          </div>
        </section>

        {/* Product Image */}
        <section data-animate id="image" className={`max-w-6xl mx-auto px-4 mb-14 transition-all duration-700 delay-100 ${visibleSections.image ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"><img src={IMAGE_URL} alt="Panel Preview" className="w-full object-cover" /></div>
        </section>

        {/* Full Tools List from Database */}
        <section data-animate id="tools" className={`max-w-6xl mx-auto px-4 mb-16 transition-all duration-700 delay-200 ${visibleSections.tools ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Complete Database</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 mb-3">All <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">62+ Premium Tools</span> You Get</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">ChatGPT Plus • Canva Pro • ExpressVPN • Netflix • Semrush • Capcut Pro • and 56 more!</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">🤖 AI Tools: 18+</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">🎨 Design: 7+</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">🛡️ VPN: 5+</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">📊 SEO: 4+</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">🎮 Gaming: 4+</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">💼 Productivity: 12+</span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/60 rounded-2xl p-5 hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-base mb-1">{tool.name}</h3>
                <p className="text-gray-400 text-xs mb-2">{tool.desc}</p>
                <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full">{tool.count} tools</div>
              </div>
            ))}
          </div>

          {/* Detailed Tools Table */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="bg-gray-800/80 px-6 py-4 border-b border-gray-700">
              <h3 className="text-white font-bold text-lg">📋 Complete Tools List — Access Everything</h3>
              <p className="text-gray-400 text-sm">All premium subscriptions, software access, and accounts included</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
              {displayedTools.map((tool, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-xl hover:bg-gray-800/60 transition-all">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{tool.name}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-emerald-400 text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full">{tool.type}</span>
                      {tool.credits && <span className="text-yellow-400 text-[10px] bg-yellow-400/10 px-2 py-0.5 rounded-full">{tool.credits}</span>}
                      {tool.guarantee && <span className="text-blue-400 text-[10px] bg-blue-400/10 px-2 py-0.5 rounded-full">{tool.guarantee}</span>}
                      <span className="text-gray-500 text-[10px]">{tool.status}</span>
                    </div>
                  </div>
                  <div className="text-emerald-400 text-xs bg-emerald-400/10 px-2 py-1 rounded-full">✓ Access</div>
                </div>
              ))}
            </div>
            {!showAllTools && ALL_TOOLS.length > 24 && (
              <div className="text-center p-4 border-t border-gray-700">
                <button onClick={() => setShowAllTools(true)} className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold">+ Show All {ALL_TOOLS.length} Tools →</button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
              <span className="text-green-400">✓</span>
              <span className="text-gray-300 text-sm">Every tool is accessible through the panel — no extra payments!</span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section data-animate id="howitworks" className={`max-w-5xl mx-auto px-4 mb-16 transition-all duration-700 delay-300 ${visibleSections.howitworks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">How You Get Access to All Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "💳", title: "Pay Once", desc: "Pay $165 securely. One-time payment, no monthly fees.", details: "You get lifetime access to 62+ tools" },
              { step: "02", icon: "📧", title: "Receive Credentials", desc: "Within 2-3 days, get Username & Password via email.", details: "Panel link + login credentials" },
              { step: "03", icon: "🚀", title: "Access All Tools", desc: "Login and start using ChatGPT Plus, Canva Pro, ExpressVPN & more!", details: "No extra payments ever" },
            ].map((item) => (
              <div key={item.step} className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/60 rounded-2xl p-7 text-center pt-10 hover:shadow-2xl transition-all">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-sm px-4 py-1 rounded-full">Step {item.step}</div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-white font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">{item.desc}</p>
                <p className="text-gray-600 text-xs">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition */}
        <section data-animate id="value" className={`max-w-6xl mx-auto px-4 mb-16 transition-all duration-700 delay-400 ${visibleSections.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-emerald-900/40 border border-emerald-500/30 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black">What's Included — <span className="text-emerald-400">Complete Breakdown</span></h2>
              <div className="inline-block mt-3 bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">💰 Actual value: $500+/month → You pay $165 once!</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><h3 className="text-white font-bold mb-3">🤖 AI & Automation</h3><ul className="space-y-1">{["ChatGPT Plus/Business", "Claude AI Pro", "Perplexity AI", "Gemini Pro", "Manus AI (8000 credits)", "Blackbox AI", "Kiro AI Pro", "Cosine AI", "Onton AI", "Make.com"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
              <div><h3 className="text-white font-bold mb-3">🎨 Design & Creative</h3><ul className="space-y-1">{["Canva Pro", "Capcut Pro", "Figma Premium", "Picsart Premium", "Adobe Premium", "Beautiful.ai", "Anima App"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
              <div><h3 className="text-white font-bold mb-3">🛡️ VPN & Security</h3><ul className="space-y-1">{["ExpressVPN", "Surfshark VPN", "Proton Unlimited", "Opera VPN Pro", "Avira Phantom VPN"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
              <div><h3 className="text-white font-bold mb-3">📊 SEO & Marketing</h3><ul className="space-y-1">{["Semrush Premium", "Erank Expert", "QuickAds AI", "Ocoya"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
              <div><h3 className="text-white font-bold mb-3">🎮 Gaming & Entertainment</h3><ul className="space-y-1">{["GTA V Enhanced", "Minecraft", "Netflix Premium", "Spotify", "Duolingo Premium", "Skillshare"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
              <div><h3 className="text-white font-bold mb-3">💼 Productivity & Business</h3><ul className="space-y-1">{["Microsoft 365", "ClickUp Pro", "Linear Premium", "Miro Business", "Replit Core", "Framer Pro", "Linktree Pro", "B12.io", "CamScanner", "Craft.do"].map(i => <li key={i} className="text-gray-400 text-sm flex items-center gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}</ul></div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section data-animate id="reviews" className={`max-w-6xl mx-auto px-4 mb-16 transition-all duration-700 delay-500 ${visibleSections.reviews ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">⭐ Trusted Worldwide</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">What Members Say About Our Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => <ReviewCard key={i} review={review} />)}
          </div>
        </section>

        {/* Final CTA */}
        <section data-animate id="finalcta" className={`max-w-4xl mx-auto px-4 mb-16 transition-all duration-700 delay-600 ${visibleSections.finalcta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-gray-900 to-emerald-950/40 border-2 border-emerald-500/50 rounded-3xl p-10 md:p-14 text-center">
            <div className="text-5xl mb-5 animate-bounce">🚀</div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Get Access to 62+ Premium Tools</h2>
            <p className="text-gray-400 text-lg mb-3">ChatGPT Plus • Canva Pro • ExpressVPN • Netflix • Semrush • and 57 more!</p>
            <div className="mb-8"><CountdownTimer /></div>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xl px-12 py-5 rounded-2xl transition-all shadow-2xl hover:scale-105 mb-4">🎯 Get Lifetime Access — $165</a>
            <p className="text-gray-500 text-sm">💳 Secure Checkout &nbsp;·&nbsp; 🔒 SSL Protected &nbsp;·&nbsp; 📧 2-3 Day Delivery</p>
          </div>
        </section>

        {/* FAQ */}
        <section data-animate id="faq" className={`max-w-3xl mx-auto px-4 mb-20 transition-all duration-700 delay-700 ${visibleSections.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10"><h2 className="text-3xl font-black">Frequently Asked Questions 🤔</h2></div>
          <div className="space-y-4">
            {[
              { q: "How do I access all 62+ tools?", a: "After payment, you receive panel login credentials. Inside the panel, you'll find direct access links, accounts, and methods for every tool listed." },
              { q: "Is this really a one-time payment?", a: "Yes! Pay $165 once and get lifetime access to all 62+ premium tools. No monthly fees, no renewals." },
              { q: "Are these official subscriptions?", a: "You get shared access, official accounts, and methods to use these premium tools at no extra cost. All are tested and working." },
              { q: "When will I receive access?", a: "Within 2-3 business days after payment, you'll receive an email with your Username, Password, and Panel Link." },
              { q: "Can I use ChatGPT Plus immediately?", a: "Yes! Once you receive panel access, ChatGPT Plus and all other AI tools are ready to use." },
              { q: "Is Netflix and Spotify included?", a: "Yes! Netflix Premium screen access and Spotify Premium subscription are included in the panel." },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-900/60 border border-gray-700/60 rounded-2xl">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white list-none">{faq.q}<span className="text-emerald-400 text-xl">+</span></summary>
                <p className="px-5 pb-5 text-gray-400 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 py-8 text-center">
        <p className="text-gray-600 text-sm">© 2025 Tools Methods Panel. All rights reserved.</p>
        <p className="text-gray-700 text-xs mt-1">62+ Premium Tools • Lifetime Access • 2-3 Day Delivery • 24/7 Support</p>
      </footer>

      {/* Mobile Sticky */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-950/95 backdrop-blur-md border-t border-gray-800 px-4 py-3">
        <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-base py-3.5 rounded-xl text-center">🚀 Get 62+ Tools — $165</a>
      </div>

      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
        @keyframes glow-pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .glow-animate { animation: glow-pulse 2s infinite; }
        .shimmer-text { background: linear-gradient(90deg, #10b981, #34d399, #10b981); background-size: 200% auto; background-clip: text; -webkit-background-clip: text; color: transparent; animation: shimmer 3s linear infinite; }
      `}</style>
    </div>
  );
}