"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaFilter, FaPlay, FaInfoCircle, FaTimes, FaKey } from "react-icons/fa";
import { Theme } from "@/components/Theme"; // Adjust path to your Theme file if needed

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  match: string;
  description: string;
  poster: string;
  backdrop: string;
  videoUrl: string;
}

// Built-in catalog with diverse genres (Horror, Romance, K-Drama, Sci-Fi, Action)
const STATIC_CATALOG: Movie[] = [
  {
    id: 1,
    title: "Midnight Whispers",
    genre: "Horror",
    rating: "18+",
    year: "2026",
    match: "95% Match",
    description: "An isolated mountain cabin holds dark, blood-curdling secrets that awaken at midnight.",
    poster: "https://images.unsplash.com/photo-1511497584788-8767611136f6?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1511497584788-8767611136f6?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
  {
    id: 2,
    title: "Seoul Heartbeat",
    genre: "K-Drama",
    rating: "13+",
    year: "2025",
    match: "98% Match",
    description: "Two rival music producers in downtown Seoul find unexpected harmony amidst corporate chaos.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
  {
    id: 3,
    title: "Sunset Promises",
    genre: "Romance",
    rating: "13+",
    year: "2024",
    match: "92% Match",
    description: "A summer vacation in coastal Italy turns into a lifelong journey of love and self-discovery.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
  {
    id: 4,
    title: "Cyber City 2077",
    genre: "Sci-Fi",
    rating: "18+",
    year: "2026",
    match: "96% Match",
    description: "A rogue hacker uncovers an AI conspiracy deep within a neon-drenched metropolis.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
  {
    id: 5,
    title: "Shadow Protocol",
    genre: "Action",
    rating: "16+",
    year: "2025",
    match: "94% Match",
    description: "An elite operative goes off-grid to protect global security from a syndicate.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
  {
    id: 6,
    title: "Busan Express",
    genre: "Horror",
    rating: "18+",
    year: "2025",
    match: "99% Match",
    description: "Passengers fight for their lives on a high-speed train during a sudden outbreak.",
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L3oOldVi8ac?autoplay=1",
  },
];

const GENRES = ["All Genres", "Horror", "Romance", "K-Drama", "Sci-Fi", "Action"];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");
  const [movies, setMovies] = useState<Movie[]>(STATIC_CATALOG);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  // Optional: Filter movies live based on search query and genre dropdown
  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All Genres" || movie.genre === selectedGenre;
    return matchesQuery && matchesGenre;
  });

  return (
    <main
      style={{ backgroundColor: Theme.primary }}
      className="min-h-screen text-white font-sans px-5 md:px-12 py-8 relative"
    >
      {/* HEADER & SEARCH CONTROLS */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Search Room</h1>
            <p className="text-xs text-gray-400 mt-1">
              Explore titles instantly by keyword or genre filter.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all"
          >
            &larr; Back Home
          </Link>
        </div>

        {/* Search Bar & Dropdown Container */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, series, or keywords..."
              className="w-full pl-11 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 shadow-inner"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="relative w-full sm:w-56">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              <FaFilter />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#121620] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 appearance-none cursor-pointer shadow-md"
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre} className="bg-[#121620] text-white">
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            Results ({filteredMovies.length})
          </h2>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <p className="text-gray-400 text-sm">No titles match your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedGenre("All Genres"); }}
              style={{ backgroundColor: Theme.secondary }}
              className="px-4 py-2 text-xs font-bold text-white rounded-md hover:opacity-90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setActiveMovie(movie)}
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
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
                      <span className="bg-red-600/80 px-1.5 py-0.5 rounded font-bold">{movie.genre}</span>
                      <span>•</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MOVIE DETAILS MODAL --- */}
      {activeMovie && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#121620] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-white">
            <button
              onClick={() => setActiveMovie(null)}
              className="absolute top-4 right-4 z-50 text-white bg-black/60 hover:bg-black p-2 rounded-full cursor-pointer transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="relative h-64 w-full">
              <img
                src={activeMovie.backdrop}
                alt={activeMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col gap-3 -mt-12 relative z-10">
              <h3 className="text-2xl font-bold">{activeMovie.title}</h3>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-green-400">{activeMovie.match}</span>
                <span className="bg-red-600 px-2 py-0.5 rounded text-white font-bold">
                  {activeMovie.genre}
                </span>
                <span className="border border-white/40 px-1.5 py-0.5 rounded text-white/80">
                  {activeMovie.rating}
                </span>
                <span className="text-gray-400">{activeMovie.year}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeMovie.description}
              </p>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    const url = activeMovie.videoUrl;
                    setActiveMovie(null);
                    setActiveTrailer(url);
                  }}
                  style={{ backgroundColor: Theme.secondary }}
                  className="flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-md hover:opacity-90 transition-all cursor-pointer"
                >
                  <FaPlay className="text-xs" /> Watch Trailer
                </button>
              </div>
            </div>
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
    </main>
  );
}