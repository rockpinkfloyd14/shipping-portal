"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { freightRates } from "@/data/shipping";
import { ArrowUp, ArrowDown } from "lucide-react";

const segments = ["All", "Dry Bulk", "Tanker", "Container", "LNG"];

function getSegment(vessel: string): string {
  if (vessel.includes("Container") || vessel.includes("SCFI")) return "Container";
  if (vessel.includes("VLCC") || vessel.includes("Suezmax") || vessel.includes("Aframax")) return "Tanker";
  if (vessel.includes("LNG")) return "LNG";
  return "Dry Bulk";
}

export default function FreightPage() {
  const [segmentFilter, setSegmentFilter] = useState("All");

  const filteredRates = freightRates.filter((rate) =>
    segmentFilter === "All" ? true : getSegment(rate.vessel) === segmentFilter
  );

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F3D] via-[#0A1628] to-[#152952]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(232,93,93,0.08),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-3">
            Freight Rates &{" "}
            <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
              Market Indices
            </span>
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-3xl">
            Track current freight rates across dry bulk, tanker, container, and
            LNG markets with historical comparisons and trend analysis.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* How Freight Rates Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">
            How Freight Rates Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#2980B9]/15 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-[#2980B9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-[#F8FAFC] font-bold text-lg mb-2">
                Time Charter (TC)
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                The charterer hires the vessel for a set period (months to
                years). The owner provides the crewed vessel; the charterer pays
                for fuel and port costs. Rates are quoted in $/day. Provides
                revenue visibility for both parties.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#E8943A]/15 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-[#E8943A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-[#F8FAFC] font-bold text-lg mb-2">
                Voyage Charter
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                The owner carries cargo from port A to port B for a fixed price.
                The owner bears all costs including fuel and port charges. Rates
                are quoted in $/tonne. Common for bulk commodities like iron ore
                and coal.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#E85D5D]/15 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-[#E85D5D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-[#F8FAFC] font-bold text-lg mb-2">
                Spot Market
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Single voyage bookings at current market rates. Highly volatile
                and responsive to supply/demand imbalances. Container spot rates
                (SCFI) can swing 50%+ in weeks. The benchmark for market
                sentiment and pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Key Market Indices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">
            Key Market Indices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E8943A] to-[#E8943A]/50" />
              <h3 className="text-[#E8943A] font-bold text-lg mb-2">
                Baltic Dry Index (BDI)
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                The most-watched shipping index, published daily by the Baltic
                Exchange. Tracks rates for Capesize, Panamax, and Supramax dry
                bulk vessels across key routes. Often viewed as a leading
                indicator for global economic activity since it reflects demand
                for raw materials. Not directly investable, but derivatives
                (FFAs) are actively traded.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2980B9] to-[#2980B9]/50" />
              <h3 className="text-[#2980B9] font-bold text-lg mb-2">
                Shanghai Containerized Freight Index (SCFI)
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Published weekly by the Shanghai Shipping Exchange, the SCFI
                tracks spot container freight rates from Shanghai to major global
                destinations. The primary benchmark for container shipping
                pricing. Covers 15 routes including Europe, US West Coast, and
                US East Coast. Surged 10x during the 2021-2022 supply chain
                crisis.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E85D5D] to-[#E85D5D]/50" />
              <h3 className="text-[#E85D5D] font-bold text-lg mb-2">
                Baltic Dirty Tanker Index (BDTI)
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Tracks freight rates for crude oil tankers (VLCCs, Suezmaxes,
                Aframaxes) on major routes. Quoted in Worldscale points --
                a percentage of a standard flat rate. Highly sensitive to
                geopolitical events, OPEC decisions, and refinery maintenance
                schedules. The &quot;clean&quot; equivalent (BCTI) tracks
                refined product tankers.
              </p>
            </div>
          </div>
        </section>

        {/* Freight Rates Table / Cards */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F8FAFC]">
              Current Freight Rates
            </h2>
            {/* Segment Filter */}
            <div className="flex flex-wrap gap-2">
              {segments.map((seg) => (
                <button
                  key={seg}
                  onClick={() => setSegmentFilter(seg)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    segmentFilter === seg
                      ? "bg-[#E8943A]/20 text-[#E8943A] border-[#E8943A]/40"
                      : "bg-[#0F1F3D] text-[#94A3B8] border-white/5 hover:text-[#F8FAFC] hover:border-white/10"
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-[#0F1F3D] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Vessel Type
                  </th>
                  <th className="text-left px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Route
                  </th>
                  <th className="text-right px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Current Rate
                  </th>
                  <th className="text-right px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Year Ago
                  </th>
                  <th className="text-right px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    5-Year Avg
                  </th>
                  <th className="text-right px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Trend
                  </th>
                  <th className="text-right px-6 py-4 text-[#94A3B8] text-xs uppercase tracking-wider font-semibold">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((rate, i) => (
                  <tr
                    key={`${rate.vessel}-${rate.route}`}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                      i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#F8FAFC] font-medium text-sm">
                        {rate.vessel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#94A3B8] text-sm">
                        {rate.route}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#F8FAFC] font-bold text-sm">
                        {rate.currentRate}
                      </span>
                      <span className="text-[#94A3B8] text-xs ml-1">
                        {rate.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#94A3B8] text-sm">
                        {rate.yearAgoRate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#94A3B8] text-sm">
                        {rate.fiveYearAvg}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {rate.trend === "up" ? (
                        <ArrowUp className="w-5 h-5 text-emerald-400 inline-block" />
                      ) : rate.trend === "down" ? (
                        <ArrowDown className="w-5 h-5 text-[#E85D5D] inline-block" />
                      ) : (
                        <span className="text-[#94A3B8] text-sm">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-semibold text-sm ${
                          rate.percentChange.startsWith("+")
                            ? "text-emerald-400"
                            : "text-[#E85D5D]"
                        }`}
                      >
                        {rate.percentChange}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRates.map((rate) => (
              <div
                key={`mobile-${rate.vessel}-${rate.route}`}
                className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#F8FAFC] font-bold text-sm">
                      {rate.vessel}
                    </h3>
                    <p className="text-[#94A3B8] text-xs">{rate.route}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {rate.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-emerald-400" />
                    ) : rate.trend === "down" ? (
                      <ArrowDown className="w-4 h-4 text-[#E85D5D]" />
                    ) : null}
                    <span
                      className={`font-bold text-sm ${
                        rate.percentChange.startsWith("+")
                          ? "text-emerald-400"
                          : "text-[#E85D5D]"
                      }`}
                    >
                      {rate.percentChange}
                    </span>
                  </div>
                </div>
                <div className="bg-[#0A1628] rounded-lg p-3 mb-3">
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                    Current Rate
                  </p>
                  <p className="text-[#F8FAFC] font-bold text-xl">
                    {rate.currentRate}
                    <span className="text-[#94A3B8] text-sm font-normal ml-1">
                      {rate.unit}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                      Year Ago
                    </p>
                    <p className="text-[#F8FAFC] text-sm font-medium">
                      {rate.yearAgoRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                      5-Year Avg
                    </p>
                    <p className="text-[#F8FAFC] text-sm font-medium">
                      {rate.fiveYearAvg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Understanding Freight Economics */}
        <section>
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">
            Understanding Freight Economics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8943A]/10 border border-[#E8943A]/20 flex items-center justify-center">
                  <span className="text-[#E8943A] font-bold text-sm">TCE</span>
                </div>
                <h3 className="text-[#F8FAFC] font-bold text-lg">
                  Time Charter Equivalent
                </h3>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                TCE is the standard measure for comparing earnings across
                different charter types. It converts voyage charter revenue into
                a daily rate by deducting voyage costs (fuel, port charges,
                canal tolls) from gross revenue, then dividing by voyage
                duration in days. This allows apples-to-apples comparison
                between time charters and voyage charters. A VLCC earning $26/tonne
                on a MEG-China voyage might yield a TCE of $42,000/day.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#2980B9]/10 border border-[#2980B9]/20 flex items-center justify-center">
                  <span className="text-[#2980B9] font-bold text-sm">WS</span>
                </div>
                <h3 className="text-[#F8FAFC] font-bold text-lg">
                  Worldscale
                </h3>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Worldscale is the pricing system used for tanker voyage
                charters. A base &quot;flat rate&quot; (WS100) is published
                annually for every possible route, representing the cost for a
                standard vessel to break even. Actual market rates are expressed
                as a percentage: WS50 means half the flat rate (weak market),
                WS150 means 1.5x (strong market). Updated yearly by the
                Worldscale Association in London and New York.
              </p>
            </div>
            <div className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold text-sm">$/t</span>
                </div>
                <h3 className="text-[#F8FAFC] font-bold text-lg">
                  Dollars per Tonne
                </h3>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                The simplest freight measure -- the cost to ship one metric
                tonne of cargo from origin to destination. Widely used in dry
                bulk markets, especially for iron ore, coal, and grain. The rate
                varies by distance, vessel size, and market conditions. For
                example, shipping iron ore from Brazil to China (~$26/tonne)
                costs more than from Australia (~$9/tonne) due to 3x the
                distance. Shippers compare $/tonne rates when sourcing from
                alternative origins.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
