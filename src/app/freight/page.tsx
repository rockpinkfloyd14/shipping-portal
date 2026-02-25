"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { freightRates } from "@/data/shipping";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, Ship, Anchor } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static data & helpers                                              */
/* ------------------------------------------------------------------ */

const segments = ["All", "Dry Bulk", "Tanker", "Container", "LNG"];

function getSegment(vessel: string): string {
  if (vessel.includes("Container") || vessel.includes("SCFI"))
    return "Container";
  if (
    vessel.includes("VLCC") ||
    vessel.includes("Suezmax") ||
    vessel.includes("Aframax")
  )
    return "Tanker";
  if (vessel.includes("LNG")) return "LNG";
  return "Dry Bulk";
}

// Build chart data: dry bulk vessels, current vs year-ago
const dryBulkRates = freightRates.filter(
  (r) => getSegment(r.vessel) === "Dry Bulk"
);

const freightChartData = dryBulkRates.map((r) => {
  const parseCurrency = (s: string) =>
    parseFloat(s.replace(/[$,]/g, "")) || 0;
  return {
    name: `${r.vessel} (${r.route})`,
    current: parseCurrency(r.currentRate),
    yearAgo: parseCurrency(r.yearAgoRate),
    unit: r.unit,
  };
});

// Key indices
const keyIndices = [
  {
    name: "Baltic Dry Index (BDI)",
    value: "~1,750",
    color: "#E8943A",
    description:
      "The most-watched shipping index, published daily by the Baltic Exchange. Tracks rates for Capesize, Panamax, and Supramax dry bulk vessels across key routes. Often viewed as a leading indicator for global economic activity.",
  },
  {
    name: "Shanghai Containerized Freight Index (SCFI)",
    value: "~1,050",
    color: "#2980B9",
    description:
      "Published weekly by the Shanghai Shipping Exchange, the SCFI tracks spot container freight rates from Shanghai to 15 major global destinations. The primary benchmark for container shipping pricing.",
  },
  {
    name: "Baltic Dirty Tanker Index (BDTI)",
    value: "~1,100",
    color: "#E85D5D",
    description:
      "Tracks freight rates for crude oil tankers (VLCCs, Suezmaxes, Aframaxes) on major routes. Quoted in Worldscale points. Highly sensitive to geopolitical events and OPEC decisions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Framer-motion variants                                             */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Custom tooltip                                                     */
/* ------------------------------------------------------------------ */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-[#0F172A] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-sm text-[#475569]">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full mr-2"
            style={{ backgroundColor: p.fill || p.color }}
          />
          {p.name === "current" ? "Current" : "Year Ago"}:{" "}
          <span className="font-medium text-[#0F172A]">
            ${p.value.toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function FreightPage() {
  const [segmentFilter, setSegmentFilter] = useState("All");

  const filteredRates = freightRates.filter((rate) =>
    segmentFilter === "All" ? true : getSegment(rate.vessel) === segmentFilter
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      <Navbar />

      {/* ── Hero Header ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-[#E85D5D] blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#E8943A] blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8943A]/10 border border-[#E8943A]/20">
                <Ship className="w-6 h-6 text-[#E8943A]" />
              </div>
              <p className="text-[#E8943A] text-sm font-semibold uppercase tracking-wider">
                Freight Analytics
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
              Freight Rates &amp;{" "}
              <span className="text-[#E8943A]">Market Indices</span>
            </h1>
            <p className="text-lg text-[#475569] max-w-3xl">
              Track current freight rates across dry bulk, tanker, container,
              and LNG markets with historical comparisons and trend analysis.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ── Section A: How Freight Rates Work ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="py-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6">
            How Freight Rates Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Time Charter */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#2980B910", border: "1px solid #2980B920" }}
              >
                <Anchor className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">
                Time Charter (TC)
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                The charterer hires the vessel for a set period (months to
                years). The owner provides the crewed vessel; the charterer pays
                for fuel and port costs. Rates are quoted in $/day. Provides
                revenue visibility for both parties.
              </p>
            </motion.div>

            {/* Voyage Charter */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#E8943A10", border: "1px solid #E8943A20" }}
              >
                <TrendingUp className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">
                Voyage Charter
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                The owner carries cargo from port A to port B for a fixed price.
                The owner bears all costs including fuel and port charges. Rates
                are quoted in $/tonne. Common for bulk commodities like iron ore
                and coal.
              </p>
            </motion.div>

            {/* Spot Market */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#E85D5D10", border: "1px solid #E85D5D20" }}
              >
                <Ship className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">
                Spot Market
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Single voyage bookings at current market rates. Highly volatile
                and responsive to supply/demand imbalances. Container spot rates
                (SCFI) can swing 50%+ in weeks. The benchmark for market
                sentiment and pricing.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Section B: Key Market Indices ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6">
            Key Market Indices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyIndices.map((idx, i) => (
              <motion.div
                key={idx.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border p-6 relative overflow-hidden transition-shadow hover:shadow-md"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                {/* Left accent border */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ backgroundColor: idx.color }}
                />
                <div className="pl-3">
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: idx.color }}
                  >
                    {idx.name}
                  </h3>
                  <p
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#0F172A" }}
                  >
                    {idx.value}
                  </p>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {idx.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section C: Freight Rates Table ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
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
                      ? "bg-[#E8943A]/10 text-[#E8943A] border-[#E8943A]/40"
                      : "bg-white text-[#475569] border-[#E2E8F0] hover:text-[#0F172A] hover:border-[#94A3B8]"
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div
            className="hidden lg:block rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  {[
                    "Vessel Type",
                    "Route",
                    "Current Rate",
                    "Year Ago",
                    "5-Year Avg",
                    "Trend",
                    "Change",
                  ].map((col) => (
                    <th
                      key={col}
                      className={`py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] ${
                        col === "Vessel Type" || col === "Route"
                          ? "text-left"
                          : "text-right"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((rate, i) => (
                  <tr
                    key={`${rate.vessel}-${rate.route}`}
                    className="transition-colors hover:bg-[#F8FAFC]"
                    style={{
                      borderBottom: "1px solid #E2E8F0",
                      backgroundColor:
                        i % 2 === 1 ? "#F8FAFC" : "#FFFFFF",
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#0F172A] font-medium text-sm">
                        {rate.vessel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#475569] text-sm">
                        {rate.route}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#0F172A] font-bold text-sm">
                        {rate.currentRate}
                      </span>
                      <span className="text-[#94A3B8] text-xs ml-1">
                        {rate.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#475569] text-sm">
                        {rate.yearAgoRate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[#475569] text-sm">
                        {rate.fiveYearAvg}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {rate.trend === "up" ? (
                        <ArrowUp className="w-5 h-5 text-emerald-600 inline-block" />
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
                            ? "text-emerald-600"
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
            {filteredRates.map((rate, i) => (
              <motion.div
                key={`mobile-${rate.vessel}-${rate.route}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#0F172A] font-bold text-sm">
                      {rate.vessel}
                    </h3>
                    <p className="text-[#94A3B8] text-xs">{rate.route}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {rate.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-emerald-600" />
                    ) : rate.trend === "down" ? (
                      <ArrowDown className="w-4 h-4 text-[#E85D5D]" />
                    ) : null}
                    <span
                      className={`font-bold text-sm ${
                        rate.percentChange.startsWith("+")
                          ? "text-emerald-600"
                          : "text-[#E85D5D]"
                      }`}
                    >
                      {rate.percentChange}
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-lg p-3 mb-3"
                  style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
                >
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">
                    Current Rate
                  </p>
                  <p className="text-[#0F172A] font-bold text-xl">
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
                    <p className="text-[#0F172A] text-sm font-medium">
                      {rate.yearAgoRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-0.5">
                      5-Year Avg
                    </p>
                    <p className="text-[#0F172A] text-sm font-medium">
                      {rate.fiveYearAvg}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section D: Freight Rates Chart ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Dry Bulk Freight Rates Comparison
          </h2>
          <p className="text-[#475569] text-sm mb-6">
            Current rates vs. year-ago rates for dry bulk vessel segments.
          </p>

          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "#E8943A" }}
                />
                <span className="text-sm text-[#475569]">Current Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "#CBD5E1" }}
                />
                <span className="text-sm text-[#475569]">Year Ago</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={freightChartData}
                margin={{ top: 8, right: 20, left: 10, bottom: 8 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={{ stroke: "#E2E8F0" }}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  axisLine={{ stroke: "#E2E8F0" }}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                  }
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "#F1F5F9" }} />
                <Bar dataKey="current" fill="#E8943A" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar dataKey="yearAgo" fill="#CBD5E1" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* ── Section E: Understanding Freight Economics ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6">
            Understanding Freight Economics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TCE */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#E8943A10", border: "1px solid #E8943A20" }}
                >
                  <span className="text-[#E8943A] font-bold text-sm">TCE</span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-lg">
                  Time Charter Equivalent
                </h3>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">
                TCE is the standard measure for comparing earnings across
                different charter types. It converts voyage charter revenue into
                a daily rate by deducting voyage costs (fuel, port charges, canal
                tolls) from gross revenue, then dividing by voyage duration in
                days. This allows apples-to-apples comparison between time
                charters and voyage charters. A VLCC earning $26/tonne on a
                MEG-China voyage might yield a TCE of $42,000/day.
              </p>
            </motion.div>

            {/* Worldscale */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#2980B910", border: "1px solid #2980B920" }}
                >
                  <span className="text-[#2980B9] font-bold text-sm">WS</span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-lg">
                  Worldscale
                </h3>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">
                Worldscale is the pricing system used for tanker voyage charters.
                A base &quot;flat rate&quot; (WS100) is published annually for
                every possible route, representing the cost for a standard vessel
                to break even. Actual market rates are expressed as a percentage:
                WS50 means half the flat rate (weak market), WS150 means 1.5x
                (strong market). Updated yearly by the Worldscale Association in
                London and New York.
              </p>
            </motion.div>

            {/* $/tonne */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#27AE6010", border: "1px solid #27AE6020" }}
                >
                  <span className="text-emerald-600 font-bold text-sm">
                    $/t
                  </span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-lg">
                  Dollars per Tonne
                </h3>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">
                The simplest freight measure -- the cost to ship one metric tonne
                of cargo from origin to destination. Widely used in dry bulk
                markets, especially for iron ore, coal, and grain. The rate
                varies by distance, vessel size, and market conditions. For
                example, shipping iron ore from Brazil to China (~$26/tonne)
                costs more than from Australia (~$9/tonne) due to 3x the
                distance. Shippers compare $/tonne rates when sourcing from
                alternative origins.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
