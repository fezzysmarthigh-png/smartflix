"use client";

import Link from "next/link";
import { 
  FaFilm, 
  FaTv, 
  FaCloudDownloadAlt, 
  FaUserShield, 
  FaGlobe, 
  FaArrowLeft, 
  FaRocket,
  FaPlayCircle
} from "react-icons/fa";
import { Theme } from "@/components/Theme"; // Adjust path to your Theme file if needed

export default function AboutPage() {
  const stats = [
    { label: "Active Streamers", value: "2M+" },
    { label: "4K & HDR Titles", value: "10,000+" },
    { label: "Supported Countries", value: "120+" },
    { label: "Streaming Uptime", value: "99.9%" },
  ];

  const features = [
    {
      icon: <FaTv className="text-2xl text-red-500" />,
      title: "Cross-Device Sync",
      description: "Start watching on your Smart TV, pause, and pick up right where you left off on your phone or laptop.",
    },
    {
      icon: <FaCloudDownloadAlt className="text-2xl text-red-500" />,
      title: "Offline Downloads",
      description: "Save your favorite blockbusters, K-Dramas, and shows to watch on the go without consuming data.",
    },
    {
      icon: <FaUserShield className="text-2xl text-red-500" />,
      title: "Secure Profiles",
      description: "Personalized recommendations and encrypted NextAuth authentication keep your watchlist and data safe.",
    },
    {
      icon: <FaGlobe className="text-2xl text-red-500" />,
      title: "Global Cinema",
      description: "Curated catalogs spanning Hollywood blockbusters, Asian entertainment, Nollywood hits, and indies.",
    },
  ];

  return (
    <main
      style={{ backgroundColor: Theme.primary }}
      className="min-h-screen text-white font-sans px-5 md:px-12 py-10 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, rgba(229, 9, 20, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: Theme.secondary }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-white shadow-lg"
            >
              <FaFilm />
            </div>
            <span className="text-xl font-black uppercase tracking-wider">
              SMARTFLIX
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <FaArrowLeft /> Home
          </Link>
        </div>

        <div className="text-center space-y-6 max-w-3xl mx-auto pt-4">
          <span 
            className="text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-white inline-block border border-red-600/40"
            style={{ backgroundColor: `${Theme.secondary}20` }}
          >
            Reinventing Streaming Media
          </span>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Cinematic Magic. <br />
            <span style={{ color: Theme.secondary }}>Anytime, Anywhere.</span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            SMARTFLIX is built for film lovers who demand crystal-clear 4K Ultra HD resolution, lightning-fast streaming speeds, and seamless content discovery without restrictive limits.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#121620] border border-white/10 rounded-2xl shadow-2xl text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-2">
              <h3 className="text-2xl md:text-3xl font-black text-white" style={{ color: Theme.secondary }}>
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/40 border border-white/10 p-8 rounded-3xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
              <FaRocket /> Our Mission
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Connecting audiences to world-class storytelling.
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              We believe great stories belong to everyone. By pairing high-definition video rendering with real-time TMDb database API integration, SMARTFLIX serves up tailored movie feeds, customized watchlists, and effortless browsing.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=800&auto=format&fit=crop" 
              alt="SMARTFLIX Cinema Experience"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-center justify-center">
              <FaPlayCircle className="text-5xl text-red-600 drop-shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black tracking-tight">Why Choose SMARTFLIX?</h2>
            <p className="text-xs text-gray-400">Engineering entertainment for seamless viewing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="bg-[#121620] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-red-600/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-red-950/40 via-[#121620] to-red-950/40 border border-white/10 p-10 rounded-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">Ready to Start Watching?</h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto">
            Create your account today or jump right into our search room to discover trending movies across all your favorite genres.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              style={{ backgroundColor: Theme.secondary }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all shadow-lg cursor-pointer"
            >
              Get Started Free
            </Link>
            <Link
              href="/search"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10"
            >
              Browse Search Room
            </Link>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SMARTFLIX Prototype. All rights reserved.</p>
        </div>

      </div>
    </main>
  );
}