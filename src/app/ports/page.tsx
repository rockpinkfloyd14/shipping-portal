"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { majorPorts, shippingRoutes, chokePoints } from "@/data/shipping";

const regions = [
  "All",
  "East Asia",
  "Southeast Asia",
  "Europe",
  "Middle East",
  "Americas",
  "Oceania",
];

const countryFlags: Record<string, string> = {
  China: "\u{1F1E8}\u{1F1F3}",
  "China SAR": "\u{1F1ED}\u{1F1F0}",
  Singapore: "\u{1F1F8}\u{1F1EC}",
  "South Korea": "\u{1F1F0}\u{1F1F7}",
  Netherlands: "\u{1F1F3}\u{1F1F1}",
  UAE: "\u{1F1E6}\u{1F1EA}",
  Australia: "\u{1F1E6}\u{1F1FA}",
  Belgium: "\u{1F1E7}\u{1F1EA}",
  Brazil: "\u{1F1E7}\u{1F1F7}",
  USA: "\u{1F1FA}\u{1F1F8}",
};

function getCargoColor(cargoType: string) {
  if (cargoType.includes("Container")) return { bg: "bg-[#2980B9]/15", text: "text-[#2980B9]", border: "border-[#2980B9]/30", accent: "#2980B9" };
  if (cargoType.includes("Bulk") || cargoType.includes("Grain")) return { bg: "bg-[#E8943A]/15", text: "text-[#E8943A]", border: "border-[#E8943A]/30", accent: "#E8943A" };
  if (cargoType.includes("Oil") || cargoType.includes("Crude")) return { bg: "bg-[#E85D5D]/15", text: "text-[#E85D5D]", border: "border-[#E85D5D]/30", accent: "#E85D5D" };
  if (cargoType.includes("LNG")) return { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30", accent: "#10B981" };
  return { bg: "bg-[#94A3B8]/15", text: "text-[#94A3B8]", border: "border-[#94A3B8]/30", accent: "#94A3B8" };
}

function matchRegionFilter(portRegion: string, filter: string): boolean {
  if (filter === "All") return true;
  if (filter === "Americas") return portRegion === "South America" || portRegion === "North America";
  return portRegion === filter;
}

type TabKey = "ports" | "routes" | "choke";

export default function PortsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ports");
  const [regionFilter, setRegionFilter] = useState("All");

  const filteredPorts = majorPorts
    .filter((port) => matchRegionFilter(port.region, regionFilter))
    .sort((a, b) => a.rank - b.rank);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "ports", label: "Major Ports" },
    { key: "routes", label: "Trade Routes" },
    { key: "choke", label: "Choke Points" },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F3D] via-[#0A1628] to-[#152952]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,148,58,0.08),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-3">
            Major Ports &{" "}
            <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
              Global Shipping Routes
            </span>
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-3xl">
            Explore the world&apos;s busiest ports, critical trade lanes, and
            strategic maritime choke points that connect the global economy.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-1 bg-[#0F1F3D] p-1 rounded-xl border border-white/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[#E8943A] text-white shadow-lg shadow-[#E8943A]/20"
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ============ MAJOR PORTS TAB ============ */}
        {activeTab === "ports" && (
          <div>
            {/* Region Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setRegionFilter(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    regionFilter === region
                      ? "bg-[#2980B9]/20 text-[#2980B9] border-[#2980B9]/40"
                      : "bg-[#0F1F3D] text-[#94A3B8] border-white/5 hover:text-[#F8FAFC] hover:border-white/10"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Port Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPorts.map((port) => (
                <div
                  key={port.name}
                  className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 hover:border-[#E8943A]/30 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#E8943A]/10 border border-[#E8943A]/30 flex items-center justify-center">
                    <span className="text-[#E8943A] font-bold text-sm">
                      #{port.rank}
                    </span>
                  </div>

                  {/* Port Name + Country */}
                  <div className="mb-4 pr-12">
                    <h3 className="text-[#F8FAFC] text-xl font-bold group-hover:text-[#E8943A] transition-colors">
                      {countryFlags[port.country] || ""} {port.name}
                    </h3>
                    <p className="text-[#94A3B8] text-sm">{port.country}</p>
                  </div>

                  {/* Volume Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        TEU Volume
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {port.volumeTEU}
                      </p>
                    </div>
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        Tonnage
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {port.volumeTons}
                      </p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2980B9]/15 text-[#2980B9] text-xs font-medium border border-[#2980B9]/20">
                      {port.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                    {port.description}
                  </p>

                  {/* Key Trades */}
                  <div className="flex flex-wrap gap-1.5">
                    {port.keyTrades.map((trade) => (
                      <span
                        key={trade}
                        className="px-2.5 py-1 rounded-full bg-[#E8943A]/10 text-[#E8943A] text-xs font-medium border border-[#E8943A]/15"
                      >
                        {trade}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ TRADE ROUTES TAB ============ */}
        {activeTab === "routes" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {shippingRoutes.map((route) => {
              const color = getCargoColor(route.cargoType);
              return (
                <div
                  key={route.name}
                  className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Colored accent bar */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                    style={{ backgroundColor: color.accent }}
                  />

                  {/* Route Name */}
                  <h3 className="text-[#F8FAFC] text-lg font-bold mb-3">
                    {route.name}
                  </h3>

                  {/* From -> To */}
                  <div className="flex items-center gap-3 mb-4 bg-[#0A1628] rounded-lg p-3">
                    <div className="flex-1">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                        Origin
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {route.from}
                      </p>
                    </div>
                    <div className="flex items-center text-[#E8943A]">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                        Destination
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {route.to}
                      </p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                        Distance
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {route.distance}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                        Transit
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {route.transitTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                        Volume
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {route.volume}
                      </p>
                    </div>
                  </div>

                  {/* Cargo Type Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${color.bg} ${color.text} ${color.border}`}
                    >
                      {route.cargoType}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                    {route.description}
                  </p>

                  {/* Choke Points */}
                  {route.chokePoints.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {route.chokePoints.map((cp) => (
                        <span
                          key={cp}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E85D5D]/10 text-[#E85D5D] text-xs font-medium border border-[#E85D5D]/20"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {cp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ============ CHOKE POINTS TAB ============ */}
        {activeTab === "choke" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chokePoints.map((cp) => (
              <div
                key={cp.name}
                className="relative bg-[#0F1F3D] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E85D5D]/30 transition-all duration-300 group"
              >
                {/* Red/Warning Gradient Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E85D5D] via-[#E8943A] to-[#E85D5D]" />
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#E85D5D]/5 to-transparent pointer-events-none" />

                <div className="relative p-6">
                  {/* Name + Location */}
                  <div className="mb-4">
                    <h3 className="text-[#F8FAFC] text-xl font-bold group-hover:text-[#E85D5D] transition-colors mb-1">
                      {cp.name}
                    </h3>
                    <p className="text-[#94A3B8] text-sm">{cp.location}</p>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        Daily Transits
                      </p>
                      <p className="text-[#F8FAFC] font-bold text-lg">
                        {cp.dailyTransits}
                      </p>
                    </div>
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        Oil Flow
                      </p>
                      <p className="text-[#E8943A] font-bold text-lg">
                        {cp.oilFlow}
                      </p>
                    </div>
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        Trade Value
                      </p>
                      <p className="text-[#2980B9] font-bold text-lg">
                        {cp.tradeValue}
                      </p>
                    </div>
                    <div className="bg-[#0A1628] rounded-lg p-3">
                      <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                        Width / Depth
                      </p>
                      <p className="text-[#F8FAFC] font-semibold text-sm">
                        {cp.width}
                      </p>
                      <p className="text-[#94A3B8] text-xs">{cp.depth} depth</p>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className="bg-[#E85D5D]/10 border border-[#E85D5D]/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#E85D5D] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M10.29 3.86l-8.4 14.31A1 1 0 002.76 20h18.48a1 1 0 00.87-1.49l-8.4-14.31a1.998 1.998 0 00-3.42 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-[#E85D5D] text-xs uppercase tracking-wider font-semibold mb-0.5">
                          Risk Factors
                        </p>
                        <p className="text-[#F8FAFC] text-sm">{cp.risk}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
