"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Ship,
  Anchor,
  Globe,
  TrendingUp,
  Package,
  Droplets,
  Flame,
  Container,
  Box,
  BarChart3,
  Users,
  Leaf,
  ArrowRight,
} from "lucide-react";
import {
  industryStats,
  fleetCategories,
  shippingRoutes,
  commodityVolumes,
  majorCompanies,
} from "@/data/shipping";
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

/* ------------------------------------------------------------------ */
/*  Icon map for fleet categories                                      */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, React.ReactNode> = {
  box: <Box className="w-8 h-8" />,
  droplet: <Droplets className="w-8 h-8" />,
  container: <Container className="w-8 h-8" />,
  flame: <Flame className="w-8 h-8" />,
  flask: <Package className="w-8 h-8" />,
  car: <TrendingUp className="w-8 h-8" />,
  package: <Package className="w-8 h-8" />,
  anchor: <Anchor className="w-8 h-8" />,
};

/* ------------------------------------------------------------------ */
/*  Stats to display in the hero section                               */
/* ------------------------------------------------------------------ */
const statsDisplay = [
  {
    label: "Total Fleet",
    value: "105,500+",
    icon: <Ship className="w-6 h-6" />,
  },
  {
    label: "Total DWT",
    value: "2.3B",
    icon: <Anchor className="w-6 h-6" />,
  },
  {
    label: "Seaborne Trade",
    value: "12.3B tonnes",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    label: "Trade Value",
    value: "$14T",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    label: "Seafarers",
    value: "1.89M",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "CO2",
    value: "2.89%",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    label: "Container Capacity",
    value: "28.4M TEU",
    icon: <Container className="w-6 h-6" />,
  },
  {
    label: "Orderbook",
    value: "320M DWT",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Recharts data — top 8 commodities by volume                        */
/* ------------------------------------------------------------------ */
const chartData = commodityVolumes
  .slice(0, 8)
  .sort((a, b) => b.volumeNumber - a.volumeNumber)
  .map((c) => ({
    name: c.commodity,
    volume: c.volumeNumber,
    unit: c.unit,
  }));

const BAR_COLORS = [
  "#E8943A",
  "#EA9E4E",
  "#EC8547",
  "#E85D5D",
  "#D4763B",
  "#C4693A",
  "#E87A4A",
  "#D96858",
];

/* ------------------------------------------------------------------ */
/*  Cargo‑type badge colour helper                                     */
/* ------------------------------------------------------------------ */
function cargoColor(cargoType: string): string {
  if (cargoType.toLowerCase().includes("container")) return "bg-[#2980B9]/10 text-[#2980B9]";
  if (cargoType.toLowerCase().includes("iron")) return "bg-[#94A3B8]/15 text-[#475569]";
  if (cargoType.toLowerCase().includes("crude") || cargoType.toLowerCase().includes("oil"))
    return "bg-[#E85D5D]/10 text-[#E85D5D]";
  if (cargoType.toLowerCase().includes("lng")) return "bg-[#2980B9]/10 text-[#2980B9]";
  if (cargoType.toLowerCase().includes("grain")) return "bg-[#E8943A]/10 text-[#E8943A]";
  return "bg-[#94A3B8]/10 text-[#475569]";
}

/* ------------------------------------------------------------------ */
/*  Custom tooltip for the recharts bar chart                          */
/* ------------------------------------------------------------------ */
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { name: string; volume: number; unit: string } }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white rounded-lg shadow-lg border border-[#E2E8F0] px-4 py-3">
        <p className="text-sm font-semibold text-[#0F172A]">{d.name}</p>
        <p className="text-sm text-[#475569]">
          {d.volume.toLocaleString()} {d.unit}
        </p>
      </div>
    );
  }
  return null;
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] py-20 sm:py-28 lg:py-36">
        {/* Subtle geometric wave SVG background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,224C672,235,768,213,864,186.7C960,160,1056,128,1152,133.3C1248,139,1344,181,1392,202.7L1440,224V320H0Z"
              fill="#E2E8F0"
              fillOpacity="0.35"
            />
            <path
              d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160V320H0Z"
              fill="#E2E8F0"
              fillOpacity="0.25"
            />
          </svg>

          {/* Decorative blurred circles */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E8943A]/[0.06] blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#2980B9]/[0.06] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#0F172A] mb-6"
          >
            Global{" "}
            <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
              Shipping Industry
            </span>{" "}
            Portal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-[#475569] leading-relaxed mb-14"
          >
            Over{" "}
            <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent font-semibold">
              90% of world trade
            </span>{" "}
            moves by sea. Explore the vast network of vessels, routes, and
            commodities that power the global economy — from massive crude
            carriers crossing oceans to container ships connecting continents.
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  KEY STATS                                                    */}
      {/* ============================================================ */}
      <section className="relative z-10 -mt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 stagger-children"
          >
            {statsDisplay.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-l-[#E8943A]"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 rounded-lg bg-[#E8943A]/10">
                    <span className="text-[#E8943A]">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-1 text-center">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-[#94A3B8] text-center">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FLEET OVERVIEW                                               */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
              Fleet{" "}
              <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
                Overview
              </span>
            </h2>
            <p className="text-[#475569] mb-10 max-w-2xl">
              The world merchant fleet comprises over 105,500 vessels across
              multiple specialized segments, each serving critical roles in
              global trade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fleetCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-hover bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#E8943A]/10 to-[#E85D5D]/10 text-[#E8943A] group-hover:from-[#E8943A]/20 group-hover:to-[#E85D5D]/20 transition-all duration-300">
                    {iconMap[cat.icon] || <Box className="w-8 h-8" />}
                  </div>
                  <span className="text-xs font-semibold text-[#E8943A] bg-[#E8943A]/10 px-3 py-1 rounded-full">
                    {cat.marketShare}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                  {cat.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Fleet Size</span>
                    <span className="text-[#0F172A] font-medium">
                      {cat.fleetSize.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Market Share</span>
                    <span className="text-[#0F172A] font-medium">
                      {cat.marketShare}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Avg Age</span>
                    <span className="text-[#0F172A] font-medium">
                      {cat.avgAge} years
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COMMODITY VOLUMES CHART                                      */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
              Global Seaborne Trade by{" "}
              <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
                Commodity
              </span>
            </h2>
            <p className="text-[#475569] mb-8 max-w-2xl">
              Annual seaborne trade volumes for the world&apos;s most
              transported commodities (million tonnes / TEU).
            </p>

            <div className="w-full h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                >
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
                    tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#F1F5F9" }}
                  />
                  <Bar
                    dataKey="volume"
                    radius={[0, 6, 6, 0]}
                    barSize={28}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={BAR_COLORS[index % BAR_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOP TRADE ROUTES                                             */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
              Major{" "}
              <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
                Trade Routes
              </span>
            </h2>
            <p className="text-[#475569] mb-10 max-w-2xl">
              The arteries of global commerce, connecting producers and
              consumers across every ocean.
            </p>
          </motion.div>

          {/* Desktop: table-like layout */}
          <div className="hidden sm:block">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] border-b border-[#E2E8F0]">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Route</div>
              <div className="col-span-3">From / To</div>
              <div className="col-span-2">Cargo Type</div>
              <div className="col-span-2 text-right">Volume</div>
              <div className="col-span-1 text-right">Distance</div>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {shippingRoutes.map((route, index) => (
                <motion.div
                  key={route.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white rounded-lg transition-colors duration-200"
                >
                  <div className="col-span-1">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8943A] to-[#E85D5D] text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {route.name}
                    </p>
                  </div>
                  <div className="col-span-3 text-sm">
                    <span className="text-[#E8943A] font-medium">
                      {route.from}
                    </span>
                    <ArrowRight className="inline w-4 h-4 mx-1 text-[#94A3B8]" />
                    <span className="text-[#E85D5D] font-medium">
                      {route.to}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${cargoColor(
                        route.cargoType
                      )}`}
                    >
                      {route.cargoType}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-bold text-[#0F172A]">
                      {route.volume}
                    </p>
                  </div>
                  <div className="col-span-1 text-right">
                    <p className="text-xs text-[#94A3B8]">{route.distance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: card layout */}
          <div className="sm:hidden space-y-4">
            {shippingRoutes.map((route, index) => (
              <motion.div
                key={route.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8943A] to-[#E85D5D] text-white font-bold text-sm shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[#0F172A] mb-1">
                      {route.name}
                    </h3>
                    <div className="text-sm">
                      <span className="text-[#E8943A] font-medium">
                        {route.from}
                      </span>
                      <ArrowRight className="inline w-4 h-4 mx-1 text-[#94A3B8]" />
                      <span className="text-[#E85D5D] font-medium">
                        {route.to}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${cargoColor(
                      route.cargoType
                    )}`}
                  >
                    {route.cargoType}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0F172A]">
                      {route.volume}
                    </p>
                    <p className="text-xs text-[#94A3B8]">{route.distance}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MAJOR COMPANIES                                              */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
              Top{" "}
              <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent">
                Shipping Companies
              </span>
            </h2>
            <p className="text-[#475569] mb-10 max-w-2xl">
              The leading players shaping the global maritime industry across
              container, bulk, tanker, and LNG segments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {majorCompanies.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#0F172A] leading-tight pr-3">
                    {company.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#2980B9] bg-[#2980B9]/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {company.segment}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Fleet</span>
                    <span className="text-[#0F172A] font-medium">
                      {company.fleet}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Market Cap</span>
                    <span className="text-[#0F172A] font-medium">
                      {company.marketCap}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Revenue</span>
                    <span className="text-[#0F172A] font-medium">
                      {company.revenue}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">HQ</span>
                    <span className="text-[#0F172A] font-medium text-right">
                      {company.headquarters}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
