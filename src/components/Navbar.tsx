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
  Globe,
  TrendingUp,
  Factory,
  BarChart3,
  Navigation,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: <Navigation className="w-4 h-4" /> },
  { label: "Vessels", href: "/vessels", icon: <Ship className="w-4 h-4" /> },
  {
    label: "Ports & Routes",
    href: "/ports-routes",
    icon: <Anchor className="w-4 h-4" />,
  },
  { label: "Market", href: "/market", icon: <Globe className="w-4 h-4" /> },
  {
    label: "Freight",
    href: "/freight",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: "Shipbuilding",
    href: "/shipbuilding",
    icon: <Factory className="w-4 h-4" />,
  },
  {
    label: "Forecasts",
    href: "/forecasts",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F1F3D]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-[#0F1F3D]/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/synergy_logo.png"
                alt="Synergy Capital"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <span className="text-[#F8FAFC] font-semibold text-lg hidden sm:block">
                Synergy Capital
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#E8943A] bg-[#E8943A]/10"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
                  }`}
                >
                  <span
                    className={
                      isActive(link.href) ? "text-[#E8943A]" : "text-[#94A3B8]"
                    }
                  >
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Active link indicator bar */}
        <div className="hidden lg:block h-0.5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                  isActive(link.href) ? "bg-[#E8943A]" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0A1628] shadow-2xl shadow-black/50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/synergy_logo.png"
              alt="Synergy Capital"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-[#F8FAFC] font-semibold">
              Synergy Capital
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="py-4 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-[#E8943A] bg-[#E8943A]/10 border-l-2 border-[#E8943A]"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
              }`}
            >
              <span
                className={
                  isActive(link.href) ? "text-[#E8943A]" : "text-[#94A3B8]"
                }
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind sticky navbar */}
      <div className="h-16" />
    </>
  );
}
