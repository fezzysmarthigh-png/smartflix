import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import {
  FiArrowLeft,
  FiShield,
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { FaFilm } from "react-icons/fa";
import { Theme } from "@/components/Theme";

export default async function SignUpPage(): Promise<React.JSX.Element> {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main 
      style={{ backgroundColor: Theme.primary }}
      className="min-h-dvh flex items-center justify-center p-4 relative font-sans text-white overflow-hidden"
    >
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.15), transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-[#121620] rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="text-center space-y-2 flex flex-col items-center">
          <div
            style={{ backgroundColor: Theme.secondary }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white mb-1 shadow-lg"
          >
            <FaFilm />
          </div>
          <span 
            className="text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-white inline-block"
            style={{ backgroundColor: Theme.secondary }}
          >
            SMARTFLIX
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Create Account
          </h1>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            Join thousands of movie lovers streaming unlimited HD movies, series, and exclusive content.
          </p>
        </div>

        <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-red-500 shrink-0" />
            <span>Unlimited 4K Ultra HD and HDR streaming</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-red-500 shrink-0" />
            <span>Offline downloads on any supported device</span>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button 
            type="submit"
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-white text-slate-900 hover:bg-slate-100 hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Sign Up with Google
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#121620] px-3 text-[11px] uppercase font-semibold text-gray-500 absolute">
            Or with email
          </span>
        </div>

        <form
          action={async () => {
            "use server";
            redirect("/sign-in");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs uppercase text-gray-400 font-semibold mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Alex Johnson"
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-400 font-semibold mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-400 font-semibold mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: Theme.secondary }}
            className="w-full py-3.5 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer shadow-md mt-2"
          >
            Create Free Account <FiArrowRight />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold underline hover:text-white"
              style={{ color: Theme.secondary }}
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <FiShield className="text-red-500" />
          <span>Encrypted 256-bit SSL authentication</span>
        </div>

        <p className="text-[11px] text-center text-gray-500 leading-tight">
          By registering, you accept SMARTFLIX's{" "}
          <Link href="/Settings" className="underline hover:text-gray-300">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/Settings" className="underline hover:text-gray-300">Privacy Policy</Link>.
        </p>

      </div>
    </main>
  );
}