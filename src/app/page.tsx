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
} from "lucide-react";
import {
  industryStats,
  fleetCategories,
  shippingRoutes,
  commodityVolumes,
  majorCompanies,
} from "@/data/shipping";

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

const statsDisplay = [
  { label: "Total Fleet", value: industryStats.totalFleet, icon: <Ship className="w-6 h-6" /> },
  { label: "Total DWT", value: industryStats.totalDWT, icon: <Anchor className="w-6 h-6" /> },
  { label: "Seaborne Trade", value: industryStats.seaborneTrade, icon: <Globe className="w-6 h-6" /> },
  { label: "Trade Value", value: industryStats.tradeValue, icon: <TrendingUp className="w-6 h-6" /> },
  { label: "Seafarers", value: industryStats.seafarers, icon: <Package className="w-6 h-6" /> },
  { label: "CO2 Emissions", value: industryStats.co2Emissions, icon: <Flame className="w-6 h-6" /> },
  { label: "Container Capacity", value: industryStats.containerTEU, icon: <Container className="w-6 h-6" /> },
  { label: "Orderbook", value: industryStats.orderbook, icon: <BarChart3 className="w-6 h-6" /> },
];

export default function Home() {
  const maxVolume = Math.max(...commodityVolumes.map((c) => c.volumeNumber));

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E8943A]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#E85D5D]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] mb-6">
            Global{" "}
            <span className="gradient-text">Shipping Industry</span>{" "}
            Portal
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[#94A3B8] leading-relaxed mb-12">
            Over <span className="gradient-text font-semibold">90% of world trade</span> moves by sea.
            Explore the vast network of vessels, routes, and commodities that power the global economy
            — from massive crude carriers crossing oceans to container ships connecting continents.
          </p>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {statsDisplay.map((stat) => (
              <div
                key={stat.label}
                className="stat-glow card-hover bg-[#0F1F3D] rounded-xl p-5 border border-white/5"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#E8943A]/20 to-[#E85D5D]/20">
                    <span className="text-[#E8943A]">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-[#94A3B8]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Overview Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-3">
            Fleet <span className="gradient-text">Overview</span>
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            The world merchant fleet comprises over 105,500 vessels across multiple specialized segments,
            each serving critical roles in global trade.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fleetCategories.map((cat) => (
              <div
                key={cat.name}
                className="card-hover bg-[#0F1F3D] rounded-xl p-6 border border-white/5 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#E8943A]/20 to-[#E85D5D]/20 text-[#E8943A] group-hover:from-[#E8943A]/30 group-hover:to-[#E85D5D]/30 transition-all duration-300">
                    {iconMap[cat.icon] || <Box className="w-8 h-8" />}
                  </div>
                  <span className="text-xs font-semibold text-[#E8943A] bg-[#E8943A]/10 px-3 py-1 rounded-full">
                    {cat.marketShare}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">
                  {cat.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Fleet Size</span>
                    <span className="text-[#F8FAFC] font-medium">
                      {cat.fleetSize.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Market Share</span>
                    <span className="text-[#F8FAFC] font-medium">{cat.marketShare}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Avg Age</span>
                    <span className="text-[#F8FAFC] font-medium">{cat.avgAge} years</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Trade Routes Section */}
      <section className="py-16 sm:py-20 bg-[#0F1F3D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-3">
            Major <span className="gradient-text">Trade Routes</span>
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            The arteries of global commerce, connecting producers and consumers across every ocean.
          </p>

          <div className="space-y-4">
            {shippingRoutes.map((route, index) => (
              <div
                key={route.name}
                className="card-hover bg-[#0F1F3D] rounded-xl p-5 sm:p-6 border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8943A] to-[#E85D5D] text-white font-bold text-sm shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-[#F8FAFC] mb-1">
                    {route.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="text-[#94A3B8]">
                      <span className="text-[#E8943A] font-medium">{route.from}</span>
                      {" → "}
                      <span className="text-[#E85D5D] font-medium">{route.to}</span>
                    </span>
                    <span className="text-[#94A3B8]">|</span>
                    <span className="text-[#94A3B8]">{route.cargoType}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-[#F8FAFC]">{route.volume}</p>
                  <p className="text-xs text-[#94A3B8]">{route.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commodity Volumes Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-3">
            Commodity <span className="gradient-text">Volumes</span>
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            Annual seaborne trade volumes for the world&apos;s most transported commodities.
          </p>

          <div className="space-y-4">
            {commodityVolumes.map((commodity) => {
              const widthPercent = (commodity.volumeNumber / maxVolume) * 100;
              return (
                <div
                  key={commodity.commodity}
                  className="bg-[#0F1F3D] rounded-xl p-5 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-[#F8FAFC]">
                        {commodity.commodity}
                      </h3>
                      <p className="text-xs text-[#94A3B8]">{commodity.vesselType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#F8FAFC]">
                        {commodity.annualVolume}{" "}
                        <span className="text-sm font-normal text-[#94A3B8]">
                          {commodity.unit}
                        </span>
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          commodity.growth.startsWith("+")
                            ? "text-green-400"
                            : commodity.growth.startsWith("-")
                            ? "text-[#E85D5D]"
                            : "text-[#94A3B8]"
                        }`}
                      >
                        {commodity.growth} YoY
                      </p>
                    </div>
                  </div>
                  {/* Bar visualization */}
                  <div className="w-full h-3 bg-[#152952] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#E8943A] to-[#E85D5D] transition-all duration-700"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Shipping Companies Section */}
      <section className="py-16 sm:py-20 bg-[#0F1F3D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-3">
            Top <span className="gradient-text">Shipping Companies</span>
          </h2>
          <p className="text-[#94A3B8] mb-10 max-w-2xl">
            The leading players shaping the global maritime industry across container, bulk, tanker, and LNG segments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {majorCompanies.map((company) => (
              <div
                key={company.name}
                className="card-hover bg-[#0F1F3D] rounded-xl p-6 border border-white/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#F8FAFC] leading-tight pr-3">
                    {company.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#E8943A] bg-[#E8943A]/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {company.segment}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Fleet</span>
                    <span className="text-[#F8FAFC] font-medium">{company.fleet}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Market Cap</span>
                    <span className="text-[#F8FAFC] font-medium">{company.marketCap}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Revenue</span>
                    <span className="text-[#F8FAFC] font-medium">{company.revenue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">HQ</span>
                    <span className="text-[#F8FAFC] font-medium text-right">{company.headquarters}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
