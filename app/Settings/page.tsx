"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FaVideo, 
  FaCrown, 
  FaMoon, 
  FaSun, 
  FaGoogle, 
  FaEnvelope, 
  FaCreditCard, 
  FaInfoCircle, 
  FaHeadset, 
  FaCheck, 
  FaTimes,
  FaLock
} from "react-icons/fa";
import { Theme } from "@/components/Theme";

export default function SettingsPage() {
  // State for Settings
  const [quality, setQuality] = useState<string>("1080p");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  // Modals state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  
  // Linked Accounts State
  const [googleLinked, setGoogleLinked] = useState<boolean>(true);
  const [emailLinked, setEmailLinked] = useState<boolean>(true);

  // Load saved preferences and apply global theme class
  useEffect(() => {
    const savedQuality = localStorage.getItem("smartflix_quality");
    const savedTheme = localStorage.getItem("smartflix_theme") as "dark" | "light";
    const savedPremium = localStorage.getItem("smartflix_premium");
    
    if (savedQuality) setQuality(savedQuality);
    
    if (savedTheme) {
      setThemeMode(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to dark mode class if not set
      document.documentElement.classList.add("dark");
    }

    if (savedPremium === "true") setIsPremium(true);
  }, []);

  const handleQualityChange = (val: string) => {
    setQuality(val);
    localStorage.setItem("smartflix_quality", val);
  };

  const handleThemeChange = (mode: "dark" | "light") => {
    setThemeMode(mode);
    localStorage.setItem("smartflix_theme", mode);
    
    // Toggle dark class on root html document for global style changes across pages
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setIsPremium(true);
      localStorage.setItem("smartflix_premium", "true");
      setPaymentSuccess(false);
      setShowPaymentModal(false);
    }, 1500);
  };

  const isDark = themeMode === "dark";

  return (
    <main
      style={{ backgroundColor: isDark ? Theme.primary : "#F8FAFC" }}
      className={`min-h-screen ${isDark ? "text-white" : "text-slate-900"} font-sans pb-20 transition-colors duration-300`}
    >
      {/* HEADER BAR */}
      <div className={`px-5 md:px-12 py-6 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">Account & Settings</h1>
            <p className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Manage playback options, subscription plan, and login preferences.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            &larr; Back to App
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-12 pt-8 flex flex-col gap-8">
        
        {/* 1. STREAMING QUALITY SECTION */}
        <section className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaVideo style={{ color: Theme.secondary }} className="text-xl" />
            <h2 className="text-lg font-bold">Streaming Quality</h2>
          </div>
          <p className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Adjust default video resolution based on your data plan. Higher quality uses more bandwidth.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "480p", label: "Data Saver", res: "480p" },
              { id: "720p", label: "Standard", res: "720p HD" },
              { id: "1080p", label: "High Def", res: "1080p Full HD" },
              { id: "4k", label: "Ultra HD", res: "4K + HDR" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleQualityChange(item.id)}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  quality === item.id
                    ? "border-red-600 bg-red-600/10"
                    : isDark
                    ? "border-white/10 bg-black/40 hover:border-white/30"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase">{item.label}</span>
                  {quality === item.id && <FaCheck className="text-xs text-red-600" />}
                </div>
                <span className="text-sm font-black mt-2">{item.res}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. PREMIUM SUBSCRIPTION SECTION */}
        <section className={`p-6 rounded-xl border relative overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaCrown className="text-amber-400 text-xl" />
              <h2 className="text-lg font-bold">Subscription & Premium</h2>
            </div>
            {isPremium ? (
              <span className="bg-amber-400/20 text-amber-400 border border-amber-400/40 text-xs px-3 py-1 rounded-full font-bold uppercase">
                Active VIP Member
              </span>
            ) : (
              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${isDark ? "bg-white/10 text-gray-300" : "bg-slate-100 text-slate-600"}`}>
                Free Tier
              </span>
            )}
          </div>

          <div className={`p-5 rounded-lg border mb-4 flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"}`}>
            <div>
              <h3 className="font-extrabold text-base">SMARTFLIX Premium Pass</h3>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                Unlimited 4K playback, offline downloads, ad-free streaming, and early access titles.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xl font-black">₦3,500 <span className="text-xs font-normal text-gray-400">/mo</span></span>
              {isPremium ? (
                <button
                  onClick={() => {
                    setIsPremium(false);
                    localStorage.setItem("smartflix_premium", "false");
                  }}
                  className="px-4 py-2 text-xs font-bold border border-red-600/40 text-red-500 rounded-md hover:bg-red-600/10 cursor-pointer"
                >
                  Cancel Plan
                </button>
              ) : (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  style={{ backgroundColor: Theme.secondary }}
                  className="px-5 py-2.5 text-xs font-bold text-white rounded-md hover:opacity-90 transition-all cursor-pointer shadow-lg whitespace-nowrap"
                >
                  Upgrade Now
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 3. THEME MODE SWITCHER */}
        <section className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-4">
            {isDark ? <FaMoon className="text-indigo-400 text-xl" /> : <FaSun className="text-amber-500 text-xl" />}
            <h2 className="text-lg font-bold">Interface Theme</h2>
          </div>
          <p className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Customize the overall color palette mode for your display preferences across all pages.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-4 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                isDark
                  ? "border-red-600 bg-red-600/10"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaMoon className="text-indigo-400" />
                <span className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Dark Mode</span>
              </div>
              {isDark && <FaCheck className="text-xs text-red-600" />}
            </button>

            <button
              onClick={() => handleThemeChange("light")}
              className={`p-4 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                !isDark
                  ? "border-red-600 bg-red-600/10 text-slate-900"
                  : "border-white/10 bg-black/40 text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaSun className="text-amber-500" />
                <span className="text-sm font-bold">Light Mode</span>
              </div>
              {!isDark && <FaCheck className="text-xs text-red-600" />}
            </button>
          </div>
        </section>

        {/* 4. LINK ACCOUNTS & AUTH */}
        <section className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaLock style={{ color: Theme.secondary }} className="text-xl" />
            <h2 className="text-lg font-bold">Linked Authentication Accounts</h2>
          </div>
          <p className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Manage linked sign-in providers connected to your SMARTFLIX profile.
          </p>

          <div className="flex flex-col gap-3">
            {/* GOOGLE LINK */}
            <div className={`p-4 rounded-lg border flex items-center justify-between ${isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <div className="flex items-center gap-3">
                <FaGoogle className="text-red-500 text-lg" />
                <div>
                  <h4 className="text-sm font-bold">Google Account</h4>
                  <p className={`text-[10px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    {googleLinked ? "Connected for single sign-on" : "Not connected"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setGoogleLinked(!googleLinked)}
                className={`text-xs px-4 py-2 rounded-md font-bold transition-all cursor-pointer ${
                  googleLinked
                    ? isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {googleLinked ? "Disconnect" : "Link Account"}
              </button>
            </div>

            {/* EMAIL LINK */}
            <div className={`p-4 rounded-lg border flex items-center justify-between ${isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 text-lg" />
                <div>
                  <h4 className="text-sm font-bold">Email & Password</h4>
                  <p className={`text-[10px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    {emailLinked ? "Primary login method active" : "Not configured"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmailLinked(!emailLinked)}
                className={`text-xs px-4 py-2 rounded-md font-bold transition-all cursor-pointer ${
                  emailLinked
                    ? isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {emailLinked ? "Manage Email" : "Link Email"}
              </button>
            </div>
          </div>
        </section>

        {/* 5. ABOUT & SUPPORT */}
        <section className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaInfoCircle className="text-sky-400 text-xl" />
            <h2 className="text-lg font-bold">About & Customer Support</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <h4 className="text-sm font-bold mb-1">SMARTFLIX Platform Info</h4>
              <div className={`text-xs flex flex-col gap-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                <span>Version: <strong className="text-white">v2.4.0 (Build 2026)</strong></span>
                <span>TMDb API Engine: <strong className="text-green-400">Connected</strong></span>
                <span>Region: <strong className="text-white">Nigeria (WAT)</strong></span>
              </div>
            </div>

            <div className={`p-4 rounded-lg border flex flex-col justify-between ${isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <div>
                <h4 className="text-sm font-bold mb-1">Need Assistance?</h4>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  Submit a ticket or chat with our 24/7 technical helpdesk team.
                </p>
              </div>
              <button
                onClick={() => setShowSupportModal(true)}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-md transition-all cursor-pointer"
              >
                <FaHeadset /> Contact Support
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* --- BANK CARD PAYMENT MODAL --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`border p-6 rounded-xl max-w-md w-full relative ${isDark ? "bg-[#121620] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"}`}>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <FaCreditCard style={{ color: Theme.secondary }} /> Bank Card Checkout
            </h3>
            <p className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Pay <strong>₦3,500/month</strong> securely via Debit or Credit Card.
            </p>

            {paymentSuccess ? (
              <div className="py-8 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 border border-green-500 rounded-full flex items-center justify-center text-xl">
                  <FaCheck />
                </div>
                <h4 className="font-bold text-base">Payment Verified!</h4>
                <p className="text-xs text-gray-400">Upgrading your account to Premium...</p>
              </div>
            ) : (
              <form onSubmit={handleSimulatePayment} className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-red-600 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="5399 •••• •••• ••••"
                    className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-red-600 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-red-600 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">CVV Security</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-red-600 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: Theme.secondary }}
                  className="mt-2 text-white font-bold py-3 rounded-md hover:opacity-90 transition-all text-sm cursor-pointer"
                >
                  Confirm & Pay ₦3,500
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- SUPPORT MODAL --- */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`border p-6 rounded-xl max-w-md w-full relative ${isDark ? "bg-[#121620] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"}`}>
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <FaHeadset className="text-sky-400" /> SMARTFLIX Help Desk
            </h3>
            <p className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Describe your problem below and our support team will respond to your email.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Support request sent!"); setShowSupportModal(false); }} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Video Buffering issue"
                  className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-sky-500 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide details about your query..."
                  className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:border-sky-500 ${isDark ? "bg-black/60 border-white/20 text-white" : "bg-slate-50 border-slate-300"}`}
                />
              </div>
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-md transition-all text-sm cursor-pointer"
              >
                Send Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}