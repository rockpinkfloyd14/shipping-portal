"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  Anchor,
  Globe2,
  TrendingUp,
  Factory,
  BarChart3,
  Navigation,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home", icon: Ship },
  { href: "/vessels", label: "Vessels", icon: Anchor },
  { href: "/ports", label: "Ports & Routes", icon: Globe2 },
  { href: "/market", label: "Market", icon: TrendingUp },
  { href: "/freight", label: "Freight", icon: Navigation },
  { href: "/shipbuilding", label: "Shipbuilding", icon: Factory },
  { href: "/forecasts", label: "Forecasts", icon: BarChart3 },
];

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Orange gradient accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #E8943A 0%, #F4B76E 50%, #E8943A 100%)",
        }}
      />

      {/* Main footer */}
      <div
        className="w-full"
        style={{ backgroundColor: "#F1F5F9", borderTop: "1px solid #E2E8F0" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* ── Brand column ── */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/synergy_logo.png"
                  alt="Synergy Capital"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#0F172A" }}
              >
                Shipping Industry Portal
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569" }}
              >
                Comprehensive shipping market data, vessel tracking, freight
                analytics, and industry forecasts — all in one place.
              </p>
              <p className="text-sm font-medium" style={{ color: "#475569" }}>
                Powered by{" "}
                <a
                  href="https://synergycapital.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-[#D47D2A]"
                  style={{ color: "#E8943A" }}
                >
                  Synergy Capital
                </a>
              </p>
            </div>

            {/* ── Quick Links column ── */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "#0F172A" }}
              >
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2">
                {quickLinks.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#E8943A]"
                      style={{ color: "#475569" }}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                        className="transition-colors duration-200 group-hover:text-[#E8943A]"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── About column ── */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "#0F172A" }}
              >
                About
              </h4>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#475569" }}
              >
                Synergy Capital delivers institutional-grade shipping market
                intelligence and analytics to industry professionals worldwide.
              </p>
              <a
                href="https://synergycapital.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[#D47D2A]"
                style={{ color: "#E8943A" }}
              >
                synergycapital.co.uk
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid #E2E8F0" }}
          >
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              &copy; 2025 Synergy Capital. All rights reserved.
            </p>
            <a
              href="https://synergycapital.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200 hover:text-[#E8943A]"
              style={{ color: "#94A3B8" }}
            >
              synergycapital.co.uk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
