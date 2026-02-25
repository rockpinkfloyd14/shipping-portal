"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { majorPorts, shippingRoutes, chokePoints } from "@/data/shipping";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { Anchor, AlertTriangle, ArrowRight, Ship } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type TabKey = "map" | "routes" | "choke";

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
  if (cargoType.includes("Container"))
    return {
      bg: "bg-[#2980B9]/10",
      text: "text-[#2980B9]",
      border: "border-[#2980B9]/30",
      accent: "#2980B9",
    };
  if (cargoType.includes("Bulk") || cargoType.includes("Grain"))
    return {
      bg: "bg-[#E8943A]/10",
      text: "text-[#E8943A]",
      border: "border-[#E8943A]/30",
      accent: "#E8943A",
    };
  if (cargoType.includes("Oil") || cargoType.includes("Crude"))
    return {
      bg: "bg-[#E85D5D]/10",
      text: "text-[#E85D5D]",
      border: "border-[#E85D5D]/30",
      accent: "#E85D5D",
    };
  if (cargoType.includes("LNG"))
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      border: "border-emerald-500/30",
      accent: "#10B981",
    };
  return {
    bg: "bg-[#94A3B8]/10",
    text: "text-[#94A3B8]",
    border: "border-[#94A3B8]/30",
    accent: "#94A3B8",
  };
}

/* Approximate route lines between key port pairs */
const routeLines: { from: [number, number]; to: [number, number] }[] = [
  { from: [121.47, 31.23], to: [4.5, 51.9] }, // Shanghai -> Rotterdam
  { from: [121.47, 31.23], to: [-118.25, 33.73] }, // Shanghai -> LA
  { from: [103.84, 1.26], to: [4.5, 51.9] }, // Singapore -> Rotterdam
  { from: [-46.31, -23.96], to: [120.38, 36.07] }, // Santos -> Qingdao
  { from: [118.58, -20.31], to: [120.38, 36.07] }, // Port Hedland -> Qingdao
  { from: [56.33, 25.12], to: [121.55, 29.87] }, // Fujairah -> Ningbo
  { from: [-95.36, 29.76], to: [4.5, 51.9] }, // Houston -> Rotterdam
  { from: [4.5, 51.9], to: [-74.0, 40.71] }, // Rotterdam -> New York
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" as const },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PortsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("map");
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const hoveredPortData = majorPorts.find((p) => p.name === hoveredPort);

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "map",
      label: "World Map",
      icon: <Anchor size={16} />,
    },
    {
      key: "routes",
      label: "Trade Routes",
      icon: <Ship size={16} />,
    },
    {
      key: "choke",
      label: "Choke Points",
      icon: <AlertTriangle size={16} />,
    },
  ];

  function getMarkerSize(rank: number) {
    if (rank <= 2) return 8;
    if (rank <= 5) return 6.5;
    if (rank <= 10) return 5;
    return 4;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* ====== Page Header ====== */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden border-b border-[#E2E8F0]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,148,58,0.06),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3">
            Major Ports &{" "}
            <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
              Global Shipping Routes
            </span>
          </h1>
          <p className="text-[#475569] text-lg max-w-3xl">
            Explore the world&apos;s busiest ports, critical trade lanes, and
            strategic maritime choke points that connect the global economy.
          </p>
        </div>
      </motion.section>

      {/* ====== Tabs ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <div className="flex gap-1 bg-white p-1.5 rounded-xl border border-[#E2E8F0] shadow-sm w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[#E8943A] text-white shadow-md shadow-[#E8943A]/20"
                  : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ====== Tab Content ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ============ WORLD MAP TAB ============ */}
        {activeTab === "map" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            {/* Map Container */}
            <div
              className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-10"
              suppressHydrationWarning
            >
              <div className="relative w-full" style={{ minHeight: 420 }}>
                <ComposableMap
                  projection="geoEqualEarth"
                  projectionConfig={{ scale: 160, center: [20, 10] }}
                  style={{ width: "100%", height: "auto" }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey ?? String(geo.properties?.name ?? geo.id ?? Math.random())}
                          geography={geo}
                          fill="#E2E8F0"
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#CBD5E1", outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* Route Lines */}
                  {routeLines.map((route, idx) => (
                    <Line
                      key={`route-line-${idx}`}
                      from={route.from}
                      to={route.to}
                      stroke="#E8943A"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeDasharray="4 3"
                      strokeOpacity={0.45}
                    />
                  ))}

                  {/* Port Markers */}
                  {majorPorts.map((port) => {
                    const isTop5 = port.rank <= 5;
                    const isSelected = selectedPort === port.name;
                    const isHovered = hoveredPort === port.name;
                    const markerSize = getMarkerSize(port.rank);
                    const fillColor = isTop5 ? "#E8943A" : "#2980B9";

                    return (
                      <Marker
                        key={port.name}
                        coordinates={[port.lng, port.lat]}
                        onMouseEnter={(e) => {
                          setHoveredPort(port.name);
                          const target = e.currentTarget ?? e.target;
                          if (target) {
                            const rect = (
                              target as SVGElement
                            ).closest("svg")?.getBoundingClientRect();
                            if (rect) {
                              setTooltipPos({
                                x: e.clientX - rect.left,
                                y: e.clientY - rect.top,
                              });
                            }
                          }
                        }}
                        onMouseLeave={() => setHoveredPort(null)}
                        onClick={() =>
                          setSelectedPort(
                            selectedPort === port.name ? null : port.name
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {/* Pulse ring for selected */}
                        {isSelected && (
                          <circle
                            r={markerSize + 5}
                            fill="none"
                            stroke={fillColor}
                            strokeWidth={1.5}
                            opacity={0.4}
                          >
                            <animate
                              attributeName="r"
                              from={String(markerSize + 2)}
                              to={String(markerSize + 10)}
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.5"
                              to="0"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        <circle
                          r={isHovered || isSelected ? markerSize + 2 : markerSize}
                          fill={fillColor}
                          stroke="#FFFFFF"
                          strokeWidth={2}
                          opacity={isHovered || isSelected ? 1 : 0.85}
                        />
                        {/* Small inner dot */}
                        <circle r={markerSize * 0.35} fill="#FFFFFF" opacity={0.7} />
                      </Marker>
                    );
                  })}
                </ComposableMap>

                {/* Tooltip */}
                {hoveredPort && hoveredPortData && (
                  <div
                    className="absolute z-20 pointer-events-none bg-white rounded-xl border border-[#E2E8F0] shadow-lg px-4 py-3 text-sm"
                    style={{
                      left: tooltipPos.x + 12,
                      top: tooltipPos.y - 10,
                      transform: "translateY(-100%)",
                      minWidth: 200,
                    }}
                  >
                    <p className="font-bold text-[#0F172A] text-base">
                      {countryFlags[hoveredPortData.country] || ""}{" "}
                      {hoveredPortData.name}
                    </p>
                    <p className="text-[#475569] text-xs mt-0.5">
                      {hoveredPortData.country}
                    </p>
                    <div className="flex gap-4 mt-2 pt-2 border-t border-[#E2E8F0]">
                      <div>
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider">
                          TEU
                        </p>
                        <p className="text-[#0F172A] font-semibold">
                          {hoveredPortData.volumeTEU}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider">
                          Tonnage
                        </p>
                        <p className="text-[#0F172A] font-semibold">
                          {hoveredPortData.volumeTons}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Legend */}
              <div className="flex flex-wrap items-center gap-6 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                  <span className="w-3 h-3 rounded-full bg-[#E8943A] inline-block" />
                  Top 5 Ports
                </div>
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                  <span className="w-3 h-3 rounded-full bg-[#2980B9] inline-block" />
                  Other Major Ports
                </div>
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                  <span className="w-8 border-t-2 border-dashed border-[#E8943A] inline-block" />
                  Shipping Routes
                </div>
              </div>
            </div>

            {/* Port Cards Grid */}
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              All Major Ports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {majorPorts
                .slice()
                .sort((a, b) => a.rank - b.rank)
                .map((port, i) => {
                  const isSelected = selectedPort === port.name;
                  return (
                    <motion.div
                      key={port.name}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      onClick={() =>
                        setSelectedPort(
                          selectedPort === port.name ? null : port.name
                        )
                      }
                      className={`bg-white border rounded-2xl p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                        isSelected
                          ? "border-[#E8943A] shadow-lg shadow-[#E8943A]/10 ring-1 ring-[#E8943A]/20"
                          : "border-[#E2E8F0] hover:border-[#E8943A]/40 hover:shadow-md"
                      }`}
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                          port.rank <= 5
                            ? "bg-[#E8943A]/10 border border-[#E8943A]/30"
                            : "bg-[#2980B9]/10 border border-[#2980B9]/30"
                        }`}
                      >
                        <span
                          className={`font-bold text-sm ${
                            port.rank <= 5
                              ? "text-[#E8943A]"
                              : "text-[#2980B9]"
                          }`}
                        >
                          #{port.rank}
                        </span>
                      </div>

                      {/* Port Name + Country */}
                      <div className="mb-4 pr-12">
                        <h3 className="text-[#0F172A] text-xl font-bold group-hover:text-[#E8943A] transition-colors">
                          {countryFlags[port.country] || ""} {port.name}
                        </h3>
                        <p className="text-[#94A3B8] text-sm">{port.country}</p>
                      </div>

                      {/* Volume Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                          <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                            TEU Volume
                          </p>
                          <p className="text-[#0F172A] font-semibold text-sm">
                            {port.volumeTEU}
                          </p>
                        </div>
                        <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                          <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                            Tonnage
                          </p>
                          <p className="text-[#0F172A] font-semibold text-sm">
                            {port.volumeTons}
                          </p>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#2980B9]/10 text-[#2980B9] text-xs font-medium border border-[#2980B9]/20">
                          {port.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[#475569] text-sm leading-relaxed mb-4">
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
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* ============ TRADE ROUTES TAB ============ */}
        {activeTab === "routes" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {shippingRoutes.map((route, i) => {
                const color = getCargoColor(route.cargoType);
                return (
                  <motion.div
                    key={route.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Colored accent bar */}
                    <div
                      className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                      style={{ backgroundColor: color.accent }}
                    />

                    {/* Route Name */}
                    <h3 className="text-[#0F172A] text-lg font-bold mb-3 mt-1">
                      {route.name}
                    </h3>

                    {/* From -> To */}
                    <div className="flex items-center gap-3 mb-4 bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                      <div className="flex-1">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                          Origin
                        </p>
                        <p className="text-[#0F172A] font-semibold text-sm">
                          {route.from}
                        </p>
                      </div>
                      <div className="flex items-center text-[#E8943A]">
                        <ArrowRight size={20} />
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                          Destination
                        </p>
                        <p className="text-[#0F172A] font-semibold text-sm">
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
                        <p className="text-[#0F172A] font-semibold text-sm">
                          {route.distance}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                          Transit
                        </p>
                        <p className="text-[#0F172A] font-semibold text-sm">
                          {route.transitTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                          Volume
                        </p>
                        <p className="text-[#0F172A] font-semibold text-sm">
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
                    <p className="text-[#475569] text-sm leading-relaxed mb-4">
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
                            <AlertTriangle size={12} />
                            {cp}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ============ CHOKE POINTS TAB ============ */}
        {activeTab === "choke" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chokePoints.map((cp, i) => (
                <motion.div
                  key={cp.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="relative bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 group"
                >
                  {/* Coral left border accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E85D5D] via-[#E8943A] to-[#E85D5D]" />

                  <div className="relative pl-6 pr-6 py-6">
                    {/* Name + Location */}
                    <div className="mb-4">
                      <h3 className="text-[#0F172A] text-xl font-bold group-hover:text-[#E85D5D] transition-colors mb-1">
                        {cp.name}
                      </h3>
                      <p className="text-[#94A3B8] text-sm">{cp.location}</p>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                          Daily Transits
                        </p>
                        <p className="text-[#0F172A] font-bold text-lg">
                          {cp.dailyTransits}
                        </p>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                          Oil Flow
                        </p>
                        <p className="text-[#E8943A] font-bold text-lg">
                          {cp.oilFlow}
                        </p>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                          Trade Value
                        </p>
                        <p className="text-[#2980B9] font-bold text-lg">
                          {cp.tradeValue}
                        </p>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                        <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                          Width / Depth
                        </p>
                        <p className="text-[#0F172A] font-semibold text-sm">
                          {cp.width}
                        </p>
                        <p className="text-[#94A3B8] text-xs">
                          {cp.depth} depth
                        </p>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="bg-[#E85D5D]/5 border border-[#E85D5D]/15 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          size={18}
                          className="text-[#E85D5D] shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-[#E85D5D] text-xs uppercase tracking-wider font-semibold mb-0.5">
                            Risk Factors
                          </p>
                          <p className="text-[#0F172A] text-sm">{cp.risk}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
