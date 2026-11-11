"use client";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import type { Session } from "next-auth";

interface NavProps {
  session: Session | null;
  signOutAction: () => Promise<void>;
}

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export default function Nav({ session, signOutAction }: NavProps) {
  const [navOpen, setNavOpen] = useState(false);

  const navStuff: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Search", href: "/Search" },
    { label: "Profile", href: "/Profile"}, 
    { label: "Settings", href: "/Settings"} 
  ];

  return (
    <nav className="flex items-center justify-between px-5 md:px-10 py-3 shadow-sm sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10">
      <Link href="/" className="flex items-center gap-1 z-50">
        <Image
          src="/favicon.ico"
          alt="smart-flix"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <p className="text-lg font-semibold max-md:hidden">Smart Flix</p>
      </Link>

      {/* desktop links */}
      <div className="flex items-center text-lg gap-5 max-md:hidden">
        {navStuff.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* desktop auth buttons / user profile */}
      <div className="flex items-center gap-3 max-md:hidden">
        {session?.user ? (
          <div className="flex items-center gap-3 bg-black/10 px-3 py-1.5 rounded-full border border-black/20 text-black">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full object-cover border border-black"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black text-amber-300 font-bold text-xs flex items-center justify-center font-mono">
                {getInitials(session.user.name)}
              </div>
            )}
            
            <span className="text-xs font-mono font-bold truncate max-w-[120px]">
              {session.user.name}
            </span>

            <form action={signOutAction}>
              <button
                type="submit"
                title="Sign Out"
                className="text-black hover:text-red-700 transition-colors p-1 cursor-pointer ml-1"
              >
                <FaSignOutAlt className="text-sm" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-white flex gap-3">
            <Link href="/sign-in">
              <button className="bg-black py-3 px-5 rounded-sm">Sign In</button>
            </Link>
          </div>
        )}
      </div>

      {/* mobile toggle */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="text-2xl md:hidden z-50 cursor-pointer"
        aria-label="Toggle menu"
      >
        {navOpen ? <IoMdClose /> : <RiMenu3Fill />}
      </button>

      {/* mobile menu */}
      {navOpen ? (
        <div className="bg-white h-dvh absolute w-full top-0 left-0 flex justify-center md:hidden z-40 overflow-y-auto">
          <div className="flex flex-col items-center text-lg gap-8 pt-24 pb-12 w-full px-6">
            {navStuff.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Menu Auth Buttons / User Profile */}
            <div className="flex flex-col gap-4 mt-4 w-full max-w-xs">
              {session?.user ? (
                <div className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-3">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-black"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-black text-amber-300 font-bold text-xs flex items-center justify-center font-mono">
                        {getInitials(session.user.name)}
                      </div>
                    )}
                    <span className="font-bold text-sm text-black truncate">{session.user.name}</span>
                  </div>

                  <form action={signOutAction} className="w-full">
                    <button
                      type="submit"
                      className="bg-red-600 text-white py-2.5 px-4 rounded-sm w-full font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-white w-full">
                  <Link href="/sign-in" onClick={() => setNavOpen(false)}>
                    <button className="bg-black py-3 px-8 rounded-sm w-full">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/sign-in" onClick={() => setNavOpen(false)}>
                    <button className="bg-black py-3 px-8 rounded-sm w-full">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : null}
    </nav>
  );
}