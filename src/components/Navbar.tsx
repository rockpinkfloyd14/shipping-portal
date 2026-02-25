"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Ship,
  Anchor,
  Globe2,
  TrendingUp,
  Factory,
  BarChart3,
  Navigation,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Ship },
  { href: "/vessels", label: "Vessels", icon: Anchor },
  { href: "/ports", label: "Ports & Routes", icon: Globe2 },
  { href: "/market", label: "Market", icon: TrendingUp },
  { href: "/freight", label: "Freight", icon: Navigation },
  { href: "/shipbuilding", label: "Shipbuilding", icon: Factory },
  { href: "/forecasts", label: "Forecasts", icon: BarChart3 },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/synergy_logo.png"
              alt="Synergy Capital"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    active
                      ? "text-[#E8943A]"
                      : "text-[#0F172A] hover:text-[#E8943A] hover:bg-[#FFF7ED]"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  {label}
                  {/* Active underline */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#E8943A]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-md text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer (slides from right) ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #E2E8F0" }}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/synergy_logo.png"
              alt="Synergy Capital"
              width={100}
              height={34}
              className="h-[34px] w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col px-3 py-4 gap-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-[#FFF7ED] text-[#E8943A] border-l-[3px] border-[#E8943A]"
                    : "text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#E8943A]"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{ borderTop: "1px solid #E2E8F0" }}
        >
          <p className="text-xs text-[#94A3B8]">Powered by Synergy Capital</p>
        </div>
      </div>
    </>
  );
}
