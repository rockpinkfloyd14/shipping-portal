"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  shipbuildingCountries,
  shipBreakingCountries,
} from "@/data/shipping";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  Factory,
  Hammer,
  Wrench,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Shield,
  Recycle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CHART DATA                                                         */
/* ------------------------------------------------------------------ */
const buildingPieData = shipbuildingCountries.map((c) => ({
  name: c.country,
  value: c.marketShareGT,
}));

const buildingPieColors: Record<string, string> = {
  China: "#E8943A",
  "South Korea": "#2980B9",
  Japan: "#E85D5D",
  Italy: "#10B981",
  Germany: "#8B5CF6",
  Others: "#94A3B8",
};

const breakingPieData = shipBreakingCountries.map((c) => ({
  name: c.country.split(" (")[0],
  fullName: c.country,
  value: c.marketShareLDT,
}));

const breakingPieColors: Record<string, string> = {
  Bangladesh: "#E85D5D",
  India: "#E8943A",
  Pakistan: "#94A3B8",
  Turkey: "#2980B9",
  China: "#10B981",
  Others: "#8B5CF6",
};

const buildingBarData = shipbuildingCountries
  .filter((c) => c.country !== "Others")
  .map((c) => ({
    name: c.country === "South Korea" ? "S. Korea" : c.country,
    GT: c.marketShareGT,
    Orders: c.marketShareOrders,
  }));

/* ------------------------------------------------------------------ */
/*  STATIC DATA                                                        */
/* ------------------------------------------------------------------ */
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
    icon: <Recycle className="w-5 h-5" />,
    color: "#10B981",
  },
  {
    title: "Price Inflation",
    description:
      "Newbuild prices have surged 30-40% since 2020 across all vessel types. Steel prices, labor costs, equipment bottlenecks, and high demand are driving up costs for shipowners.",
    icon: <AlertTriangle className="w-5 h-5" />,
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

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  CUSTOM TOOLTIP                                                     */
/* ------------------------------------------------------------------ */
function CustomPieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-[#0F172A]">
        {payload[0].name}
      </p>
      <p className="text-sm text-[#475569]">{payload[0].value}%</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
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

  const maxBuildingGT = Math.max(
    ...shipbuildingCountries.map((c) => c.marketShareGT)
  );
  const maxBreakingLDT = Math.max(
    ...shipBreakingCountries.map((c) => c.marketShareLDT)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* ========== HERO HEADER ========== */}
      <section className="relative overflow-hidden bg-white border-b border-[#E2E8F0]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#E8943A] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#E85D5D] rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
              Ship Building & Ship Breaking
            </h1>
            <p className="text-lg text-[#475569] max-w-3xl">
              From construction to recycling -- the full lifecycle of the global
              fleet. Explore shipyard capacity, orderbooks, market share, and the
              evolving ship recycling industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== TAB NAVIGATION ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-[#E2E8F0]">
          <button
            onClick={() => setActiveTab("building")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[1px] ${
              activeTab === "building"
                ? "text-[#E8943A] border-[#E8943A]"
                : "text-[#94A3B8] border-transparent hover:text-[#0F172A] hover:border-[#94A3B8]/30"
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
                : "text-[#94A3B8] border-transparent hover:text-[#0F172A] hover:border-[#94A3B8]/30"
            }`}
          >
            <Recycle className="w-4 h-4" />
            Ship Recycling
          </button>
        </div>
      </div>

      {/* =================== SHIPBUILDING TAB =================== */}
      {activeTab === "building" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Pie Chart + Bar Chart Row */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-xl font-bold text-[#0F172A] mb-6"
            >
              Global Shipbuilding Market Share (by Gross Tonnage)
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pie Chart */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6"
              >
                <h3 className="text-sm font-semibold text-[#475569] uppercase tracking-wider mb-4">
                  Market Share by Country (GT%)
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={buildingPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {buildingPieData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={buildingPieColors[entry.name] || "#94A3B8"}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend
                      formatter={(value: string) => (
                        <span className="text-sm text-[#475569]">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6"
              >
                <h3 className="text-sm font-semibold text-[#475569] uppercase tracking-wider mb-4">
                  GT% vs Orders% by Country
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={buildingBarData} barGap={4}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#475569", fontSize: 12 }}
                      axisLine={{ stroke: "#E2E8F0" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#94A3B8", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar
                      dataKey="GT"
                      name="GT Share %"
                      fill="#E8943A"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    />
                    <Bar
                      dataKey="Orders"
                      name="Orders %"
                      fill="#2980B9"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Expandable Country Cards */}
            <div className="space-y-4">
              {shipbuildingCountries.map((country, index) => {
                const isExpanded = expandedBuildingCountry === index;
                const barWidthGT =
                  (country.marketShareGT / maxBuildingGT) * 100;
                const barWidthOrders =
                  (country.marketShareOrders / maxBuildingGT) * 100;
                const barColor =
                  buildingPieColors[country.country] || "#94A3B8";

                return (
                  <motion.div
                    key={country.country}
                    variants={fadeUp}
                    custom={index + 3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-md hover:border-[#94A3B8]/40 transition-all duration-200"
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
                            <h3 className="text-base font-bold text-[#0F172A]">
                              {country.country}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-[#0F172A]">
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
                              <ChevronDown
                                className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </div>
                          </div>

                          {/* GT Bar */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-[#94A3B8] w-10 shrink-0">
                              GT%
                            </span>
                            <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: barColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${barWidthGT}%` }}
                                transition={{
                                  duration: 0.8,
                                  delay: index * 0.1,
                                  ease: "easeOut" as const,
                                }}
                              />
                            </div>
                          </div>

                          {/* Orders Bar */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#94A3B8] w-10 shrink-0">
                              Ord%
                            </span>
                            <div className="flex-1 h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor: `${barColor}99`,
                                }}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${barWidthOrders}%`,
                                }}
                                transition={{
                                  duration: 0.8,
                                  delay: index * 0.1 + 0.15,
                                  ease: "easeOut" as const,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                      >
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
                                <span className="text-sm text-[#0F172A]">
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
                          <p className="text-lg font-bold text-[#0F172A]">
                            {country.orderbook}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Active Yards
                          </p>
                          <p className="text-lg font-bold text-[#0F172A]">
                            {country.activeYards}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ========== GLOBAL TRENDS ========== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-16"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
                <TrendingUp className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Global Shipbuilding Trends
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildingTrends.map((trend, i) => (
                <motion.div
                  key={trend.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 relative overflow-hidden hover:shadow-md transition-shadow duration-200"
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
                      <h3 className="text-base font-bold text-[#0F172A]">
                        {trend.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {trend.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* =================== SHIP RECYCLING TAB =================== */}
      {activeTab === "breaking" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Market Share PieChart */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-xl font-bold text-[#0F172A] mb-6"
            >
              Global Ship Recycling Market Share (by LDT)
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-8"
            >
              <ResponsiveContainer width="100%" height={360}>
                <PieChart>
                  <Pie
                    data={breakingPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={130}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    animationBegin={0}
                    animationDuration={1200}
                  >
                    {breakingPieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={breakingPieColors[entry.name] || "#94A3B8"}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    formatter={(value: string) => (
                      <span className="text-sm text-[#475569]">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Expandable Country Cards */}
            <div className="space-y-4">
              {shipBreakingCountries.map((country, index) => {
                const isExpanded = expandedBreakingCountry === index;
                const barWidth =
                  (country.marketShareLDT / maxBreakingLDT) * 100;
                const shortName = country.country.split(" (")[0];
                const barColor =
                  breakingPieColors[shortName] || "#94A3B8";

                return (
                  <motion.div
                    key={country.country}
                    variants={fadeUp}
                    custom={index + 2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-5 hover:shadow-md hover:border-[#94A3B8]/40 transition-all duration-200"
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
                            <h3 className="text-base font-bold text-[#0F172A]">
                              {country.country}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-[#0F172A]">
                                {country.marketShareLDT}%{" "}
                                <span className="text-xs text-[#94A3B8] font-normal">
                                  LDT
                                </span>
                              </span>
                              <span className="text-sm text-[#94A3B8]">
                                {country.annualCapacity}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </div>
                          </div>

                          {/* LDT Bar */}
                          <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: barColor }}
                              initial={{ width: 0 }}
                              animate={{ width: `${barWidth}%` }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "easeOut" as const,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
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
                            <Wrench className="w-3.5 h-3.5" />
                            {country.method}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                            Regulations
                          </p>
                          <p className="text-sm text-[#0F172A] leading-relaxed">
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
                                <span className="text-sm text-[#0F172A]">
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
                          <p className="text-sm text-[#475569] leading-relaxed">
                            {country.controversies}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ========== HONG KONG CONVENTION ========== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-16 mb-12"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2980B9]/10 border border-[#2980B9]/20">
                <Shield className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Hong Kong Convention (HKC)
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">
                    The Hong Kong International Convention for the Safe and
                    Environmentally Sound Recycling of Ships
                  </h3>
                  <div className="space-y-3 text-sm text-[#475569] leading-relaxed">
                    <p>
                      Adopted by the International Maritime Organization (IMO)
                      in 2009, the Hong Kong Convention entered into force on{" "}
                      <strong className="text-[#0F172A]">
                        June 26, 2025
                      </strong>
                      , after Bangladesh&apos;s ratification met the required
                      thresholds. The convention addresses all issues around
                      ship recycling, including the use of hazardous materials
                      in shipbuilding, operations, and recycling.
                    </p>
                    <p>
                      Ships will be required to carry an{" "}
                      <strong className="text-[#0F172A]">
                        Inventory of Hazardous Materials (IHM)
                      </strong>{" "}
                      throughout their life. Recycling facilities must provide
                      a{" "}
                      <strong className="text-[#0F172A]">
                        Ship Recycling Facility Plan (SRFP)
                      </strong>{" "}
                      documenting procedures for worker safety, environmental
                      protection, and emergency response.
                    </p>
                    <p>
                      The convention creates a level playing field by setting
                      minimum safety and environmental standards globally,
                      while allowing the ship recycling industry to continue
                      operating in countries where it provides vital employment
                      and economic activity.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span className="text-sm font-semibold text-[#0F172A]">
                        Key Requirements
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#475569]">
                      {[
                        "Inventory of Hazardous Materials (IHM)",
                        "Ship Recycling Plan for each vessel",
                        "Facility certification and auditing",
                        "Worker safety training standards",
                        "Environmental management protocols",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-1.5"
                        >
                          <ChevronRight className="w-3 h-3 mt-0.5 text-[#2980B9] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#E8943A]" />
                      <span className="text-sm font-semibold text-[#0F172A]">
                        Entry Into Force
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Required ratification by 15 states representing 40% of
                      world merchant shipping tonnage and 3% of recycling
                      volume. India&apos;s 2023 ratification and
                      Bangladesh&apos;s subsequent ratification met these
                      thresholds.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ========== ENVIRONMENTAL CONCERNS ========== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E85D5D]/10 border border-[#E85D5D]/20">
                <AlertTriangle className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Environmental Concerns
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-[#E85D5D] mb-3">
                    Hazardous Materials
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">
                    End-of-life ships contain significant quantities of
                    hazardous materials accumulated during their 25-30 year
                    operational lives. These include:
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
                        className="flex items-start gap-2 text-sm text-[#475569]"
                      >
                        <XCircle className="w-3.5 h-3.5 mt-0.5 text-[#E85D5D] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#10B981] mb-3">
                    Industry Improvements
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">
                    The ship recycling industry has made significant progress
                    in recent years, driven by regulatory pressure, buyer
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
                        className="flex items-start gap-2 text-sm text-[#475569]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[#10B981] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ========== METHODS COMPARISON ========== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
                <Wrench className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Recycling Methods Comparison
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breakingMethods.map((method, i) => (
                <motion.div
                  key={method.method}
                  variants={fadeUp}
                  custom={i + 1}
                  className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Header */}
                  <div
                    className="px-6 py-4"
                    style={{
                      background: `linear-gradient(135deg, ${method.color}12, ${method.color}05)`,
                      borderBottom: `1px solid ${method.color}25`,
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
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {method.description}
                    </p>

                    {/* Pros */}
                    <div>
                      <p className="text-xs font-semibold text-[#10B981] uppercase tracking-wider mb-2">
                        Advantages
                      </p>
                      <ul className="space-y-1.5">
                        {method.pros.map((pro) => (
                          <li
                            key={pro}
                            className="flex items-start gap-1.5 text-xs text-[#475569]"
                          >
                            <CheckCircle2 className="w-3 h-3 mt-0.5 text-[#10B981] shrink-0" />
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
                            className="flex items-start gap-1.5 text-xs text-[#475569]"
                          >
                            <XCircle className="w-3 h-3 mt-0.5 text-[#E85D5D] shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
