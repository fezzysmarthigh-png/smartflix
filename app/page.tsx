"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaInfoCircle, FaTimes, FaKey } from "react-icons/fa";
import {Theme} from "@/components/Theme"

interface Movie {
  id: number;
  title: string;
  rating?: string;
  year: string;
  duration?: string;
  match: string;
  description: string;
  backdrop: string;
  poster: string;
  videoUrl: string;
}

export default function LandingPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredHero, setFeaturedHero] = useState<Movie | null>(null);
  const [activeModalMovie, setActiveModalMovie] = useState<Movie | null>(null);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

  // Fallback demo content using pure theme artwork & high quality unbranded imagery
  const FALLBACK_HERO: Movie = {
    id: 101,
    title: "SMARTFLIX ORIGINALS",
    rating: "18+",
    year: "2026",
    duration: "2h 15m",
    match: "99% Match",
    description:
      "Welcome to SMARTFLIX. Connect your TMDb API Key to unlock thousands of real-time movies, TV series, and trending cinema feeds instantly.",
    backdrop:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  };

  const FALLBACK_CATALOG: Movie[] = [
    {
      id: 201,
      title: "Cyber Horizon",
      rating: "16+",
      year: "2026",
      duration: "2h 04m",
      match: "96% Match",
      description: "A rogue operative navigates neon alleyways to secure an encrypted file containing digital power.",
      backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
    },
    {
      id: 202,
      title: "Deep Cosmos",
      rating: "13+",
      year: "2025",
      duration: "2h 30m",
      match: "98% Match",
      description: "Explorers cross deep planetary bounds in search of alternative energy reserves for earth.",
      backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
    },
    {
      id: 203,
      title: "Echoes of Silence",
      rating: "16+",
      year: "2024",
      duration: "1h 52m",
      match: "92% Match",
      description: "An environmental research post discovers hidden signals buried under centuries of deep ice.",
      backdrop: "https://images.unsplash.com/photo-1511497584788-8767611136f6?q=80&w=1200&auto=format&fit=crop",
      poster: "https://images.unsplash.com/photo-1511497584788-8767611136f6?q=80&w=600&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
    },
  ];

  // Load saved TMDb API key or fetch trending movies
  useEffect(() => {
    const savedKey = localStorage.getItem("smartflix_tmdb_key");
    if (savedKey) {
      setApiKey(savedKey);
      fetchTrendingFromTMDb(savedKey);
    } else {
      setFeaturedHero(FALLBACK_HERO);
      setMovies(FALLBACK_CATALOG);
    }
  }, []);

  const fetchTrendingFromTMDb = async (key: string) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const formatted: Movie[] = data.results.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          rating: item.adult ? "18+" : "13+",
          year: (item.release_date || "2026").split("-")[0],
          duration: `${Math.floor(item.vote_average * 10)}% Popularity`,
          match: `${Math.round(item.vote_average * 10)}% Match`,
          description: item.overview,
          backdrop: item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : FALLBACK_HERO.backdrop,
          poster: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : FALLBACK_HERO.poster,
          videoUrl: `https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1`,
        }));

        setFeaturedHero(formatted[0]);
        setMovies(formatted.slice(1));
      }
    } catch (err) {
      console.error("Failed to fetch TMDb movies:", err);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("smartflix_tmdb_key", apiKey.trim());
      fetchTrendingFromTMDb(apiKey.trim());
      setShowApiKeyModal(false);
    }
  };

  const hero = featuredHero || FALLBACK_HERO;

  return (
    <main
      style={{ backgroundColor: Theme.primary }}
      className="min-h-screen text-white font-sans overflow-x-hidden relative"
    >
      {/* API KEY FLOATING BUTTON */}
      <button
        onClick={() => setShowApiKeyModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-xl flex items-center gap-2 text-xs font-semibold"
        title="Configure TMDb API Key"
      >
        <FaKey style={{ color: Theme.secondary }} />
        <span className="hidden sm:inline">API Settings</span>
      </button>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[85vh] md:h-[90vh] flex items-end">
        {/* Theme-colored Ambient Background Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={hero.backdrop}
            alt={hero.title}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          {/* Main Palette Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.15), transparent 60%), linear-gradient(to top, ${Theme.primary} 10%, transparent 70%), linear-gradient(to right, ${Theme.primary} 30%, transparent 80%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 md:px-12 pb-16 max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wide">
            <span
              style={{ backgroundColor: Theme.secondary }}
              className="text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider"
            >
              SMARTFLIX FEATURED
            </span>
            <span className="text-green-400 font-bold">{hero.match}</span>
            <span className="border border-white/40 px-1.5 py-0.2 rounded text-white/80">
              {hero.rating || "16+"}
            </span>
            <span className="text-gray-300">{hero.year}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-md uppercase">
            {hero.title}
          </h1>

          <p className="text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow-sm">
            {hero.description}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTrailer(hero.videoUrl)}
              style={{ backgroundColor: Theme.secondary }}
              className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-md hover:opacity-90 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <FaPlay className="text-sm" /> Watch Now
            </button>
            <button
              onClick={() => setActiveModalMovie(hero)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all cursor-pointer backdrop-blur-md border border-white/10"
            >
              <FaInfoCircle className="text-lg" /> Details
            </button>
          </div>
        </div>
      </section>

      {/* --- MOVIE CATALOG SECTION --- */}
      <section className="px-5 md:px-12 py-10 relative z-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Trending Titles</h2>
            <p className="text-xs text-gray-400">Curated specifically for your screen</p>
          </div>
          <Link
            href="/Search"
            className="text-sm font-semibold hover:underline"
            style={{ color: Theme.secondary }}
          >
            Explore Catalog &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setActiveModalMovie(movie)}
              className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 hover:shadow-2xl"
            >
              <div className="aspect-[2/3] w-full relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-green-400 font-bold text-xs">{movie.match}</span>
                  <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-300 mt-1">
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION BAR --- */}
      <section className="px-5 md:px-12 py-16 text-center bg-white/5 border-y border-white/10 my-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Stream Smarter, Watch Better.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Ready to experience next-generation content streaming? Sign in to launch your library.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mt-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-black/60 border border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-red-600 flex-1 text-white placeholder-gray-500"
            />
            <Link href="/get-started">
              <button
                style={{ backgroundColor: Theme.secondary }}
                className="w-full sm:w-auto text-white font-bold px-6 py-3 rounded-md hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
              >
                Get Started &gt;
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="px-5 md:px-12 py-8 text-gray-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} SMARTFLIX Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/Settings" className="hover:underline">Privacy Policy</Link>
          <Link href="/Settings" className="hover:underline">Terms of Use</Link>
        </div>
      </footer>

      {/* --- API KEY CONFIGURATION MODAL --- */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#121620] border border-white/10 p-6 rounded-xl max-w-md w-full flex flex-col gap-4 text-white relative">
            <button
              onClick={() => setShowApiKeyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FaKey style={{ color: Theme.secondary }} /> Connect TMDb API Key
            </h3>
            <p className="text-xs text-gray-400">
              Input your TMDb v3 API key below to fetch live movies, TV shows, backdrops, and descriptions.
            </p>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your TMDb API Key"
              className="bg-black/60 border border-white/20 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-red-600"
            />
            <button
              onClick={handleSaveApiKey}
              style={{ backgroundColor: Theme.secondary }}
              className="w-full text-white font-bold py-2.5 rounded-md hover:opacity-90 transition-all text-sm"
            >
              Save Key & Load Movies
            </button>
          </div>
        </div>
      )}

      {/* --- VIDEO PLAYER MODAL --- */}
      {activeTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveTrailer(null)}
              className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black p-2 rounded-full cursor-pointer transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
            <iframe
              src={activeTrailer}
              title="Trailer Player"
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* --- MOVIE DETAILS MODAL --- */}
      {activeModalMovie && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#121620] border border-white/10 rounded-xl overflow-hidden shadow-2xl text-white">
            <button
              onClick={() => setActiveModalMovie(null)}
              className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black p-2 rounded-full cursor-pointer transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="relative h-64 w-full">
              <img
                src={activeModalMovie.backdrop}
                alt={activeModalMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col gap-3 -mt-12 relative z-10">
              <h3 className="text-2xl font-bold">{activeModalMovie.title}</h3>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-green-400">{activeModalMovie.match}</span>
                <span className="border border-white/40 px-1.5 py-0.5 rounded text-white/80">
                  {activeModalMovie.rating || "16+"}
                </span>
                <span className="text-gray-400">{activeModalMovie.year}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeModalMovie.description}
              </p>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    const url = activeModalMovie.videoUrl;
                    setActiveModalMovie(null);
                    setActiveTrailer(url);
                  }}
                  style={{ backgroundColor: Theme.secondary }}
                  className="flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-md hover:opacity-90 transition-all cursor-pointer"
                >
                  <FaPlay className="text-xs" /> Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}