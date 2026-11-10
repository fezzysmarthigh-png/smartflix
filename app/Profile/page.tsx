"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { 
  FaUser, 
  FaCamera, 
  FaCrown, 
  FaCheck, 
  FaSave, 
  FaArrowLeft,
  FaVenusMars,
  FaUpload,
  FaImages
} from "react-icons/fa";
import { Theme } from "@/components/Theme"; // Adjust path to your Theme file if needed

// Pre-designed default avatars for SMARTFLIX users
const PRESET_AVATARS = [
  { id: 1, label: "Hero", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { id: 2, label: "Cyberpunk", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 3, label: "Anime", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
  { id: 4, label: "Sci-Fi", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop" },
  { id: 5, label: "Detective", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { id: 6, label: "Retro", url: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" },
];

export default function ProfilePage() {
  const [name, setName] = useState<string>("Alex Johnson");
  const [nickname, setNickname] = useState<string>("AlexStreamz");
  const [gender, setGender] = useState<string>("Male");
  const [avatar, setAvatar] = useState<string>(PRESET_AVATARS[0].url);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const savedName = localStorage.getItem("smartflix_profile_name");
    const savedNickname = localStorage.getItem("smartflix_profile_nickname");
    const savedGender = localStorage.getItem("smartflix_profile_gender");
    const savedAvatar = localStorage.getItem("smartflix_profile_avatar");
    const savedPremium = localStorage.getItem("smartflix_premium");

    if (savedName) setName(savedName);
    if (savedNickname) setNickname(savedNickname);
    if (savedGender) setGender(savedGender);
    if (savedAvatar) setAvatar(savedAvatar);
    if (savedPremium === "true") setIsPremium(true);
  }, []);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("smartflix_profile_name", name);
    localStorage.setItem("smartflix_profile_nickname", nickname);
    localStorage.setItem("smartflix_profile_gender", gender);
    localStorage.setItem("smartflix_profile_avatar", avatar);

    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleTogglePlan = () => {
    const newStatus = !isPremium;
    setIsPremium(newStatus);
    localStorage.setItem("smartflix_premium", newStatus ? "true" : "false");
  };

  return (
    <main
      style={{ backgroundColor: Theme.primary }}
      className="min-h-screen text-white font-sans px-5 md:px-12 py-8 relative"
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">User Profile</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Customize your personal information, avatar, and streaming tier.
          </p>
        </div>
        <Link className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all cursor-pointer" href="/">
          <FaArrowLeft /> Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-[#121620] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold flex items-center gap-2">
            <FaCheck /> {successMessage}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-5 pb-6 border-b border-white/10">
            <label className="text-xs uppercase font-bold text-gray-300 tracking-wider flex items-center gap-2">
              <FaCamera className="text-red-500" /> Choose Profile Avatar
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt="Selected Profile Avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-red-600 shadow-xl"
                />
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label className="cursor-pointer px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
                  <FaUpload className="text-red-500" /> Upload from Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-gray-400 text-center sm:text-left">
                  Upload any JPG or PNG image directly from your local storage.
                </span>
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <span className="text-[11px] uppercase font-bold text-gray-400 flex items-center gap-1.5">
                <FaImages /> Or Select a Built-in Avatar:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAvatar(preset.url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-square ${
                      avatar === preset.url
                        ? "border-red-600 scale-105 shadow-lg shadow-red-600/30"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Nickname / Handle
              </label>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Cinephile99"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Other"].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setGender(option)}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    gender === option
                      ? "border-red-600 bg-red-600/20 text-white shadow-md"
                      : "border-white/10 bg-black/40 text-gray-400 hover:border-white/30"
                  }`}
                >
                  <FaVenusMars className={gender === option ? "text-red-500" : "text-gray-500"} />
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isPremium ? "bg-amber-400/20 text-amber-400 border border-amber-400/40" : "bg-white/10 text-gray-400"}`}>
                <FaCrown />
              </div>
              <div>
                <h4 className="text-sm font-bold">
                  {isPremium ? "SMARTFLIX VIP Premium Pass" : "Free Tier Plan"}
                </h4>
                <p className="text-xs text-gray-400">
                  {isPremium ? "Active 4K Ultra HD & Ad-Free streaming." : "Standard catalog access with ads."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTogglePlan}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isPremium
                  ? "border border-red-600/50 text-red-400 hover:bg-red-600/10"
                  : "text-white hover:opacity-90 shadow-md"
              }`}
              style={{ backgroundColor: isPremium ? "transparent" : Theme.secondary }}
            >
              {isPremium ? "Downgrade Plan" : "Upgrade to VIP"}
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: Theme.secondary }}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95"
            >
              <FaSave /> Save Profile Changes
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}