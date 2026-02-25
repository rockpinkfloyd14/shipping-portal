"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { shipbuildingCountries, shipBreakingCountries } from "@/data/shipping";
import {
  Factory,
  Hammer,
  Recycle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Wrench,
  Globe,
  Shield,
  Anchor,
  ChevronRight,
  Info,
} from "lucide-react";

// Color assignments for countries
const buildingColors: Record<string, string> = {
  China: "#E85D5D",
  "South Korea": "#2980B9",
  Japan: "#E8943A",
  Italy: "#27AE60",
  Germany: "#8B5CF6",
  Others: "#94A3B8",
};

const breakingColors: Record<string, string> = {
  "Bangladesh (Chittagong)": "#E85D5D",
  "India (Alang)": "#E8943A",
  "Pakistan (Gadani)": "#8B5CF6",
  "Turkey (Aliaga)": "#2980B9",
  China: "#27AE60",
  "Others (EU/Misc)": "#94A3B8",
};

// Shipbuilding trends
const buildingTrends = [
  {
    title: "Record Orderbooks",
    description:
      "Global orderbook exceeds 300 million DWT, the highest level in over a decade. Delivery slots at major yards are booked through 2028-2029, creating a multi-year construction backlog.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#E8943A",
  },
  {
    title: "Green Fuel Vessels",
    description:
      "Over 50% of new orders are for dual-fuel or alternative-fuel-ready vessels. LNG, methanol, and ammonia-ready ships command premium prices but are essential for future compliance.",
    icon: <Globe className="w-5 h-5" />,
    color: "#27AE60",
  },
  {
    title: "Price Inflation",
    description:
      "Newbuild prices have surged 30-40% since 2020 across all vessel types. Steel prices, labor costs, equipment bottlenecks, and high demand are driving up costs for shipowners.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#E85D5D",
  },
  {
    title: "Capacity Constraints",
    description:
      "Major yards in China and South Korea are operating near full capacity. New yard capacity expansion is limited, creating a structural supply bottleneck for the next 3-5 years.",
    icon: <Factory className="w-5 h-5" />,
    color: "#2980B9",
  },
];

// Ship breaking methods comparison
const breakingMethods = [
  {
    method: "Beaching",
    description:
      "Vessels are run aground at high tide on tidal flats, then dismantled in the intertidal zone as the tide recedes. The primary method in Bangladesh, India, and Pakistan.",
    pros: [
      "Low infrastructure cost",
      "High capacity",
      "Labor-intensive (provides jobs)",
      "No need for heavy equipment",
    ],
    cons: [
      "Environmental contamination of beach and water",
      "Worker safety risks (falls, fires, toxic exposure)",
      "Difficult containment of hazardous materials",
      "Tidal dependency limits working hours",
    ],
    color: "#E85D5D",
  },
  {
    method: "Landing (Slipway/Pier)",
    description:
      "Vessels are pulled alongside a concrete slipway or pier using winches, then dismantled on a prepared surface. Used primarily in Turkey (Aliaga) and increasingly in India.",
    pros: [
      "Better environmental containment",
      "Improved worker safety",
      "More controlled dismantling process",
      "Can operate regardless of tide",
    ],
    cons: [
      "Higher infrastructure investment needed",
      "Lower throughput than beaching",
      "Requires prepared facilities",
      "Moderately higher operating cost",
    ],
    color: "#E8943A",
  },
  {
    method: "Drydock/Alongside",
    description:
      "Vessels are dismantled in enclosed drydocks or alongside equipped quays with full environmental containment. The standard in EU countries, China, and Japan.",
    pros: [
      "Full environmental containment",
      "Highest worker safety standards",
      "Complete hazmat management",
      "Weather-independent operations",
    ],
    cons: [
      "Significantly higher cost",
      "Limited capacity globally",
      "Requires major capital investment",
      "Not economically viable for all ships",
    ],
    color: "#2980B9",
  },
];

export default function ShipbuildingPage() {
  const [activeTab, setActiveTab] = useState<"building" | "breaking">(
    "building"
  );
  const [expandedBuildingCountry, setExpandedBuildingCountry] = useState<
    number | null
  >(null);
  const [expandedBreakingCountry, setExpandedBreakingCountry] = useState<
    number | null
  >(null);

  // Calculate max values for bar scaling
  const maxBuildingGT = Math.max(
    ...shipbuildingCountries.map((c) => c.marketShareGT)
  );
  const maxBreakingLDT = Math.max(
    ...shipBreakingCountries.map((c) => c.marketShareLDT)
  );

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#152952] via-[#0F1F3D] to-[#0A1628]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#E8943A] rounded-full blur-[128px]" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#E85D5D] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8943A]/10 border border-[#E8943A]/20">
              <Factory className="w-6 h-6 text-[#E8943A]" />
            </div>
            <div>
              <p className="text-[#E8943A] text-sm font-semibold uppercase tracking-wider">
                Industry Analysis
              </p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F8FAFC] mb-4">
            Ship Building & Ship Breaking
          </h1>
          <p className="text-lg text-[#94A3B8] max-w-3xl">
            From construction to recycling -- the full lifecycle of the global
            fleet. Explore shipyard capacity, orderbooks, market share, and the
            evolving ship recycling industry.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("building")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[1px] ${
              activeTab === "building"
                ? "text-[#E8943A] border-[#E8943A]"
                : "text-[#94A3B8] border-transparent hover:text-[#F8FAFC] hover:border-white/20"
            }`}
          >
            <Hammer className="w-4 h-4" />
            Shipbuilding
          </button>
          <button
            onClick={() => setActiveTab("breaking")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[1px] ${
              activeTab === "breaking"
                ? "text-[#E85D5D] border-[#E85D5D]"
                : "text-[#94A3B8] border-transparent hover:text-[#F8FAFC] hover:border-white/20"
            }`}
          >
            <Recycle className="w-4 h-4" />
            Ship Recycling / Breaking
          </button>
        </div>
      </div>

      {/* =================== SHIPBUILDING TAB =================== */}
      {activeTab === "building" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Market Share Visualization - Stacked Bar */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
              Global Shipbuilding Market Share (by Gross Tonnage)
            </h2>

            {/* Stacked Horizontal Bar */}
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex h-12 rounded-xl overflow-hidden mb-4">
                {shipbuildingCountries.map((country) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-center transition-all duration-300 hover:opacity-80 cursor-default"
                    style={{
                      width: `${country.marketShareGT}%`,
                      backgroundColor:
                        buildingColors[country.country] || "#94A3B8",
                    }}
                    title={`${country.country}: ${country.marketShareGT}% GT`}
                  >
                    {country.marketShareGT > 5 && (
                      <span className="text-xs font-bold text-white truncate px-1">
                        {country.country} {country.marketShareGT}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4">
                {shipbuildingCountries.map((country) => (
                  <div
                    key={country.country}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          buildingColors[country.country] || "#94A3B8",
                      }}
                    />
                    <span className="text-xs text-[#94A3B8]">
                      {country.country} ({country.marketShareGT}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Country Bars */}
            <div className="space-y-4">
              {shipbuildingCountries.map((country, index) => {
                const isExpanded = expandedBuildingCountry === index;
                const barWidthGT =
                  (country.marketShareGT / maxBuildingGT) * 100;
                const barWidthOrders =
                  (country.marketShareOrders / maxBuildingGT) * 100;
                const barColor =
                  buildingColors[country.country] || "#94A3B8";

                return (
                  <div
                    key={country.country}
                    className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-200"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setExpandedBuildingCountry(
                          isExpanded ? null : index
                        )
                      }
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-1.5 h-10 rounded-full"
                          style={{ backgroundColor: barColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-bold text-[#F8FAFC]">
                              {country.country}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-[#F8FAFC]">
                                {country.marketShareGT}%{" "}
                                <span className="text-xs text-[#94A3B8] font-normal">
                                  GT
                                </span>
                              </span>
                              <span className="text-sm font-semibold text-[#E8943A]">
                                {country.marketShareOrders}%{" "}
                                <span className="text-xs text-[#94A3B8] font-normal">
                                  Orders
                                </span>
                              </span>
                              <ChevronRight
                                className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                              />
                            </div>
                          </div>

                          {/* GT Bar */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-[#94A3B8] w-10 shrink-0">
                              GT%
                            </span>
                            <div className="flex-1 h-2.5 bg-[#0A1628] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${barWidthGT}%`,
                                  backgroundColor: barColor,
                                }}
                              />
                            </div>
                          </div>

                          {/* Orders Bar */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#94A3B8] w-10 shrink-0">
                              Ord%
                            </span>
                            <div className="flex-1 h-2.5 bg-[#0A1628] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${barWidthOrders}%`,
                                  backgroundColor: `${barColor}99`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Key Yards
                          </p>
                          <div className="space-y-1">
                            {country.keyYards.map((yard) => (
                              <div
                                key={yard}
                                className="flex items-center gap-1.5"
                              >
                                <Wrench className="w-3 h-3 text-[#94A3B8]" />
                                <span className="text-sm text-[#F8FAFC]">
                                  {yard}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Specialization
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {country.specialization.map((spec) => (
                              <span
                                key={spec}
                                className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border"
                                style={{
                                  color: barColor,
                                  borderColor: `${barColor}30`,
                                  backgroundColor: `${barColor}10`,
                                }}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Orderbook
                          </p>
                          <p className="text-lg font-bold text-[#F8FAFC]">
                            {country.orderbook}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Active Yards
                          </p>
                          <p className="text-lg font-bold text-[#F8FAFC]">
                            {country.activeYards}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Global Shipbuilding Trends */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
                <TrendingUp className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">
                Global Shipbuilding Trends
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildingTrends.map((trend) => (
                <div
                  key={trend.title}
                  className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1"
                    style={{ backgroundColor: trend.color }}
                  />
                  <div className="pl-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{
                          backgroundColor: `${trend.color}15`,
                          color: trend.color,
                        }}
                      >
                        {trend.icon}
                      </div>
                      <h3 className="text-base font-bold text-[#F8FAFC]">
                        {trend.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {trend.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================== SHIP BREAKING TAB =================== */}
      {activeTab === "breaking" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Market Share Visualization - Stacked Bar */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
              Global Ship Recycling Market Share (by LDT)
            </h2>

            {/* Stacked Horizontal Bar */}
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 mb-6">
              <div className="flex h-12 rounded-xl overflow-hidden mb-4">
                {shipBreakingCountries.map((country) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-center transition-all duration-300 hover:opacity-80 cursor-default"
                    style={{
                      width: `${country.marketShareLDT}%`,
                      backgroundColor:
                        breakingColors[country.country] || "#94A3B8",
                    }}
                    title={`${country.country}: ${country.marketShareLDT}% LDT`}
                  >
                    {country.marketShareLDT > 5 && (
                      <span className="text-xs font-bold text-white truncate px-1">
                        {country.country.split(" (")[0]}{" "}
                        {country.marketShareLDT}%
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4">
                {shipBreakingCountries.map((country) => (
                  <div
                    key={country.country}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          breakingColors[country.country] || "#94A3B8",
                      }}
                    />
                    <span className="text-xs text-[#94A3B8]">
                      {country.country} ({country.marketShareLDT}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Country Cards */}
            <div className="space-y-4">
              {shipBreakingCountries.map((country, index) => {
                const isExpanded = expandedBreakingCountry === index;
                const barWidth =
                  (country.marketShareLDT / maxBreakingLDT) * 100;
                const barColor =
                  breakingColors[country.country] || "#94A3B8";

                return (
                  <div
                    key={country.country}
                    className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-200"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setExpandedBreakingCountry(
                          isExpanded ? null : index
                        )
                      }
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-1.5 h-10 rounded-full"
                          style={{ backgroundColor: barColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-bold text-[#F8FAFC]">
                              {country.country}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-[#F8FAFC]">
                                {country.marketShareLDT}%{" "}
                                <span className="text-xs text-[#94A3B8] font-normal">
                                  LDT
                                </span>
                              </span>
                              <span className="text-sm text-[#94A3B8]">
                                {country.annualCapacity}
                              </span>
                              <ChevronRight
                                className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                              />
                            </div>
                          </div>

                          {/* LDT Bar */}
                          <div className="w-full h-3 bg-[#0A1628] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: barColor,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Method
                          </p>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{
                              backgroundColor: `${barColor}15`,
                              color: barColor,
                              border: `1px solid ${barColor}30`,
                            }}
                          >
                            <Anchor className="w-3.5 h-3.5" />
                            {country.method}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Regulations
                          </p>
                          <p className="text-sm text-[#F8FAFC] leading-relaxed">
                            {country.regulations}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Key Yards
                          </p>
                          <div className="space-y-1">
                            {country.keyYards.map((yard) => (
                              <div
                                key={yard}
                                className="flex items-center gap-1.5"
                              >
                                <Wrench className="w-3 h-3 text-[#94A3B8]" />
                                <span className="text-sm text-[#F8FAFC]">
                                  {yard}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Notes & Controversies
                          </p>
                          <p className="text-sm text-[#94A3B8] leading-relaxed">
                            {country.controversies}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hong Kong Convention Section */}
          <div className="mt-16 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2980B9]/10 border border-[#2980B9]/20">
                <Shield className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">
                Hong Kong Convention (HKC)
              </h2>
            </div>

            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-3">
                    The Hong Kong International Convention for the Safe and
                    Environmentally Sound Recycling of Ships
                  </h3>
                  <div className="space-y-3 text-sm text-[#94A3B8] leading-relaxed">
                    <p>
                      Adopted by the International Maritime Organization (IMO) in
                      2009, the Hong Kong Convention entered into force on{" "}
                      <strong className="text-[#F8FAFC]">
                        June 26, 2025
                      </strong>
                      , after Bangladesh&apos;s ratification met the required
                      thresholds. The convention addresses all issues around ship
                      recycling, including the use of hazardous materials in
                      shipbuilding, operations, and recycling.
                    </p>
                    <p>
                      Ships will be required to carry an{" "}
                      <strong className="text-[#F8FAFC]">
                        Inventory of Hazardous Materials (IHM)
                      </strong>{" "}
                      throughout their life. Recycling facilities must provide a{" "}
                      <strong className="text-[#F8FAFC]">
                        Ship Recycling Facility Plan (SRFP)
                      </strong>{" "}
                      documenting procedures for worker safety, environmental
                      protection, and emergency response.
                    </p>
                    <p>
                      The convention creates a level playing field by setting
                      minimum safety and environmental standards globally, while
                      allowing the ship recycling industry to continue operating
                      in countries where it provides vital employment and economic
                      activity.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#0A1628] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-[#F8FAFC]">
                        Key Requirements
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                      <li className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                        Inventory of Hazardous Materials (IHM)
                      </li>
                      <li className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                        Ship Recycling Plan for each vessel
                      </li>
                      <li className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                        Facility certification and auditing
                      </li>
                      <li className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                        Worker safety training standards
                      </li>
                      <li className="flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                        Environmental management protocols
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#0A1628] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-[#E8943A]" />
                      <span className="text-sm font-semibold text-[#F8FAFC]">
                        Entry Into Force
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">
                      Required ratification by 15 states representing 40% of
                      world merchant shipping tonnage and 3% of recycling
                      volume. India&apos;s 2023 ratification and
                      Bangladesh&apos;s subsequent ratification met these
                      thresholds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Concerns Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E85D5D]/10 border border-[#E85D5D]/20">
                <AlertTriangle className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">
                Environmental Concerns
              </h2>
            </div>

            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-[#E85D5D] mb-3">
                    Hazardous Materials
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                    End-of-life ships contain significant quantities of hazardous
                    materials accumulated during their 25-30 year operational
                    lives. These include:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Asbestos in insulation and fireproofing",
                      "Heavy metals (lead, mercury, cadmium) in paints and equipment",
                      "PCBs in older electrical systems",
                      "Tributyltin (TBT) in anti-fouling coatings",
                      "Oil sludge and fuel residues in tanks",
                      "Ozone-depleting substances in refrigeration",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#94A3B8]"
                      >
                        <XCircle className="w-3.5 h-3.5 mt-0.5 text-[#E85D5D] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-emerald-400 mb-3">
                    Industry Improvements
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                    The ship recycling industry has made significant progress in
                    recent years, driven by regulatory pressure, buyer
                    requirements, and economic incentives:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "India ratified HKC in 2023, upgrading Alang yards",
                      "Turkey's Aliaga yards fully EU-approved",
                      "Increasing adoption of landing/pier methods",
                      "Ship Recycling Transparency Initiative (SRTI) adopted by major owners",
                      "Green passport / IHM requirements for all ships",
                      "Major shipping companies (Maersk, MSC) committing to responsible recycling",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#94A3B8]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Methods Comparison */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
                <Wrench className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">
                Recycling Methods Comparison
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breakingMethods.map((method) => (
                <div
                  key={method.method}
                  className="bg-[#0F1F3D] border border-white/5 rounded-2xl overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className="px-6 py-4"
                    style={{
                      background: `linear-gradient(135deg, ${method.color}20, ${method.color}05)`,
                      borderBottom: `1px solid ${method.color}30`,
                    }}
                  >
                    <h3
                      className="text-lg font-bold"
                      style={{ color: method.color }}
                    >
                      {method.method}
                    </h3>
                  </div>

                  <div className="px-6 py-5 space-y-4">
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {method.description}
                    </p>

                    {/* Pros */}
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                        Advantages
                      </p>
                      <ul className="space-y-1.5">
                        {method.pros.map((pro) => (
                          <li
                            key={pro}
                            className="flex items-start gap-1.5 text-xs text-[#94A3B8]"
                          >
                            <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-400 shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <p className="text-xs font-semibold text-[#E85D5D] uppercase tracking-wider mb-2">
                        Disadvantages
                      </p>
                      <ul className="space-y-1.5">
                        {method.cons.map((con) => (
                          <li
                            key={con}
                            className="flex items-start gap-1.5 text-xs text-[#94A3B8]"
                          >
                            <XCircle className="w-3 h-3 mt-0.5 text-[#E85D5D] shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
