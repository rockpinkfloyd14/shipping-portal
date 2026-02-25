"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { commodityVolumes, majorCompanies } from "@/data/shipping";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Globe2,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

// Market indices
const marketIndices = [
  {
    name: "Baltic Dry Index (BDI)",
    value: "~1,750",
    description:
      "Measures the cost of shipping raw materials (iron ore, coal, grain) on major dry bulk routes. Composed of Capesize, Panamax, and Supramax assessments. A leading indicator of global economic activity.",
    measures: "Dry Bulk Freight Rates",
    range: "300 (2016 low) - 11,793 (2008 high)",
    color: "#2980B9",
  },
  {
    name: "ClarkSea Index",
    value: "~$32,000/day",
    description:
      "A weighted average of earnings across all major vessel segments (tankers, bulkers, containers, gas carriers). Published weekly by Clarksons Research, it provides the broadest measure of shipping market health.",
    measures: "Cross-Sector Vessel Earnings",
    range: "$5,000/day - $50,000+/day",
    color: "#E8943A",
  },
  {
    name: "Harpex (Container)",
    value: "~1,200",
    description:
      "Tracks charter rates for container ships across 8 vessel classes (700 TEU to 8,500 TEU). Published weekly by Harper Petersen. Reflects the container shipping charter market dynamics.",
    measures: "Container Ship Charter Rates",
    range: "200 (2009 low) - 4,600 (2021 high)",
    color: "#E85D5D",
  },
  {
    name: "Shanghai Containerized Freight Index (SCFI)",
    value: "~1,050",
    description:
      "Measures spot freight rates from Shanghai to 15 major global destinations. Published weekly by the Shanghai Shipping Exchange. The most watched index for container spot market trends.",
    measures: "Container Spot Freight Rates",
    range: "400 (2020 low) - 5,100 (2022 high)",
    color: "#27AE60",
  },
];

// Shipping alliances
const shippingAlliances = [
  {
    name: "Ocean Alliance",
    members: ["CMA CGM", "COSCO", "Evergreen", "OOCL"],
    capacityShare: 29,
    description:
      "Active since 2017, renewed through 2032. Members operate joint services across Asia-Europe, Transpacific, and Transatlantic trades. COSCO acquired OOCL in 2018, keeping it as a separate brand within the alliance.",
    color: "#2980B9",
  },
  {
    name: "Gemini Cooperation",
    members: ["Maersk", "Hapag-Lloyd"],
    capacityShare: 22,
    description:
      "Launched in February 2025, replacing the dissolved 2M alliance (Maersk + MSC). Focuses on a hub-and-spoke network model with fewer direct port calls but higher reliability. Aims for 90%+ schedule reliability.",
    color: "#E8943A",
  },
  {
    name: "MSC (Independent)",
    members: ["MSC"],
    capacityShare: 20,
    description:
      "After leaving the 2M alliance, MSC now operates independently as the world's largest container line by capacity. Has aggressively expanded fleet through secondhand acquisitions and massive newbuild orders.",
    color: "#E85D5D",
  },
];

const alliancePieData = [
  { name: "Ocean Alliance", value: 29, color: "#2980B9" },
  { name: "Gemini Cooperation", value: 22, color: "#E8943A" },
  { name: "MSC Independent", value: 20, color: "#E85D5D" },
  { name: "Others", value: 29, color: "#94A3B8" },
];

// Sort companies by market cap
function parseMarketCap(cap: string): number {
  const cleaned = cap.replace(/[~$B(est.)]/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

const sortedCompanies = [...majorCompanies].sort(
  (a, b) => parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)
);

// Commodity chart data (sorted by volume descending)
const commodityChartData = [...commodityVolumes]
  .sort((a, b) => b.volumeNumber - a.volumeNumber)
  .map((c) => ({
    name: c.commodity,
    volume: c.volumeNumber,
    unit: c.unit,
  }));

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
/*  Custom tooltip for the commodity chart                             */
/* ------------------------------------------------------------------ */

function CommodityTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-[#0F172A]">{d.name}</p>
      <p className="text-sm text-[#475569]">
        {d.volume.toLocaleString()} {d.unit}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function MarketPage() {
  const [expandedCommodity, setExpandedCommodity] = useState<number | null>(
    null
  );
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      <Navbar />

      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#E8943A] blur-[120px]" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-[#2980B9] blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8943A]/10 border border-[#E8943A]/20">
                <Globe2 className="w-6 h-6 text-[#E8943A]" />
              </div>
              <p className="text-[#E8943A] text-sm font-semibold uppercase tracking-wider">
                Market Intelligence
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
              Shipping Market Overview
            </h1>
            <p className="text-lg text-[#475569] max-w-3xl">
              Comprehensive data on global commodity flows, major shipping
              companies, alliance structures, and key market indices that drive
              the maritime industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section A: Commodities Chart ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
          Commodities Shipped by Volume
        </h2>
        <p className="text-[#475569] mb-8 text-sm">
          Annual seaborne trade volumes across major commodity categories.
        </p>

        {/* Horizontal Bar Chart */}
        <div
          className="rounded-2xl border p-6 mb-8"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
        >
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={commodityChartData}
              layout="vertical"
              margin={{ top: 4, right: 30, left: 10, bottom: 4 }}
            >
              <defs>
                <linearGradient id="orangeBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E8943A" />
                  <stop offset="100%" stopColor="#F4B76E" />
                </linearGradient>
              </defs>
              <XAxis
                type="number"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CommodityTooltip />} cursor={{ fill: "#F1F5F9" }} />
              <Bar
                dataKey="volume"
                fill="url(#orangeBar)"
                radius={[0, 6, 6, 0]}
                barSize={26}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expandable commodity cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {commodityVolumes.map((commodity, index) => {
            const isPositive = commodity.growth.startsWith("+");
            const isExpanded = expandedCommodity === index;

            return (
              <motion.div
                key={commodity.commodity}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-md"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {commodity.commodity}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">
                      {commodity.vesselType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#0F172A]">
                      {commodity.annualVolume}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      {commodity.unit}/year
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      isPositive ? "text-emerald-600" : "text-[#E85D5D]"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {commodity.growth} growth
                  </span>

                  <button
                    onClick={() =>
                      setExpandedCommodity(isExpanded ? null : index)
                    }
                    className="flex items-center gap-1 text-sm text-[#2980B9] hover:text-[#E8943A] transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> Trade flows
                      </>
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid #E2E8F0" }}>
                    <div>
                      <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                        Top Exporters
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {commodity.topExporters.map((country) => (
                          <span
                            key={country}
                            className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-[#0F172A] border"
                            style={{ borderColor: "#E2E8F0", backgroundColor: "#F1F5F9" }}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                        Top Importers
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {commodity.topImporters.map((country) => (
                          <span
                            key={country}
                            className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-[#0F172A] border"
                            style={{ borderColor: "#E8943A40", backgroundColor: "#FFF7ED" }}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Section B: Major Shipping Companies ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
            <Building2 className="w-5 h-5 text-[#E8943A]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Major Shipping Companies
          </h2>
        </div>

        {/* Desktop Table */}
        <div
          className="hidden lg:block rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                {["Rank", "Company", "Ticker", "Market Cap", "Revenue", "Fleet", "HQ", "Segment"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company, index) => (
                <tr
                  key={company.name}
                  className="transition-colors hover:bg-[#F8FAFC]"
                  style={{
                    borderBottom: "1px solid #E2E8F0",
                    backgroundColor: index % 2 === 1 ? "#F8FAFC" : "#FFFFFF",
                  }}
                >
                  <td className="py-4 px-5 text-sm font-medium text-[#94A3B8]">
                    {index + 1}
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-[#0F172A]">
                    {company.name}
                  </td>
                  <td className="py-4 px-5 text-sm font-mono text-[#2980B9]">
                    {company.ticker}
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-[#E8943A]">
                    {company.marketCap}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#0F172A]">
                    {company.revenue}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#475569]">
                    {company.fleet}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#475569]">
                    {company.headquarters}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-[#0F172A]"
                      style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0" }}
                    >
                      {company.segment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(showAllCompanies
            ? sortedCompanies
            : sortedCompanies.slice(0, 5)
          ).map((company, index) => (
            <motion.div
              key={company.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-5"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-[#475569]"
                      style={{ backgroundColor: "#F1F5F9" }}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-sm font-mono text-[#2980B9]">
                      {company.ticker}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {company.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#E8943A]">
                    {company.marketCap}
                  </div>
                  <div className="text-xs text-[#94A3B8]">Market Cap</div>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-3 pt-3"
                style={{ borderTop: "1px solid #E2E8F0" }}
              >
                <div>
                  <p className="text-xs text-[#94A3B8]">Revenue</p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {company.revenue}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Fleet Size</p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {company.fleet}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Headquarters</p>
                  <p className="text-sm text-[#475569]">
                    {company.headquarters}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Segment</p>
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-[#0F172A]"
                    style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0" }}
                  >
                    {company.segment}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {sortedCompanies.length > 5 && (
            <button
              onClick={() => setShowAllCompanies(!showAllCompanies)}
              className="col-span-full py-3 text-sm font-medium text-[#2980B9] hover:text-[#E8943A] transition-colors"
            >
              {showAllCompanies
                ? "Show fewer companies"
                : `Show all ${sortedCompanies.length} companies`}
            </button>
          )}
        </div>
      </motion.section>

      {/* ── Section C: Shipping Alliances ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E85D5D]/10 border border-[#E85D5D]/20">
            <Users className="w-5 h-5 text-[#E85D5D]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Shipping Alliances
          </h2>
        </div>

        <p className="text-[#475569] mb-8 max-w-3xl text-sm leading-relaxed">
          Shipping alliances are agreements between container carriers to share
          vessel capacity on major trade routes. By pooling ships and
          coordinating schedules, alliance members can offer broader network
          coverage and more frequent sailings. Alliances collectively control
          over 70% of global container capacity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {shippingAlliances.map((alliance, i) => (
            <motion.div
              key={alliance.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 relative overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: alliance.color }}
              />

              <div className="flex items-center justify-between mb-4 mt-1">
                <h3
                  className="text-xl font-bold"
                  style={{ color: alliance.color }}
                >
                  {alliance.name}
                </h3>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                >
                  ~{alliance.capacityShare}%
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {alliance.members.map((member) => (
                  <span
                    key={member}
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{
                      color: alliance.color,
                      borderColor: `${alliance.color}40`,
                      backgroundColor: `${alliance.color}10`,
                    }}
                  >
                    {member}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#475569] leading-relaxed">
                {alliance.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Alliance PieChart */}
        <div
          className="rounded-2xl border p-6"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
        >
          <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">
            Global Container Capacity Distribution
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={alliancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {alliancePieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Share"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#0F172A",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                  formatter={(value: string) => (
                    <span style={{ color: "#475569", fontSize: "13px" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.section>

      {/* ── Section D: Key Market Indices ── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2980B9]/10 border border-[#2980B9]/20">
            <TrendingUp className="w-5 h-5 text-[#2980B9]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Key Market Indices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketIndices.map((indexData, i) => (
            <motion.div
              key={indexData.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border p-6 relative overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              {/* Left accent border */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: indexData.color }}
              />

              <div className="pl-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                      {indexData.name}
                    </h3>
                    <span
                      className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        color: indexData.color,
                        backgroundColor: `${indexData.color}12`,
                        border: `1px solid ${indexData.color}30`,
                      }}
                    >
                      {indexData.measures}
                    </span>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: indexData.color }}
                    >
                      {indexData.value}
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      Current (approx.)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed mb-3">
                  {indexData.description}
                </p>

                <div
                  className="pt-3"
                  style={{ borderTop: "1px solid #E2E8F0" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">
                      Historical Range
                    </span>
                    <span className="text-xs font-mono text-[#0F172A]">
                      {indexData.range}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
