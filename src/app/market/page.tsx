"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { commodityVolumes, majorCompanies } from "@/data/shipping";
import {
  BarChart3,
  Building2,
  Globe,
  TrendingUp,
  TrendingDown,
  Activity,
  Ship,
  Boxes,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Country flag emoji helper
const countryFlags: Record<string, string> = {
  "Saudi Arabia": "SA",
  Russia: "RU",
  Iraq: "IQ",
  USA: "US",
  UAE: "AE",
  China: "CN",
  India: "IN",
  Japan: "JP",
  "South Korea": "KR",
  Europe: "EU",
  EU: "EU",
  Australia: "AU",
  Brazil: "BR",
  "South Africa": "ZA",
  Indonesia: "ID",
  Colombia: "CO",
  Vietnam: "VN",
  Qatar: "QA",
  Malaysia: "MY",
  Argentina: "AR",
  Ukraine: "UA",
  Canada: "CA",
  Mexico: "MX",
  Egypt: "EG",
  Germany: "DE",
  "Southeast Asia": "ASEAN",
  Africa: "AF",
  "Latin America": "LATAM",
  Netherlands: "NL",
  "Middle East": "ME",
};

// Market indices data
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
      "Measures spot freight rates from Shanghai to 15 major global destinations. Published weekly by the Shanghai Shipping Exchange. The most watched index for container spot market trends, especially Asia-outbound trade.",
    measures: "Container Spot Freight Rates",
    range: "400 (2020 low) - 5,100 (2022 high)",
    color: "#27AE60",
  },
];

// Shipping alliances data
const shippingAlliances = [
  {
    name: "Ocean Alliance",
    members: ["CMA CGM", "COSCO", "Evergreen", "OOCL"],
    capacityShare: "~29%",
    description:
      "Active since 2017, renewed through 2032. Members operate joint services across Asia-Europe, Transpacific, and Transatlantic trades. COSCO acquired OOCL in 2018, keeping it as a separate brand within the alliance.",
    color: "#2980B9",
  },
  {
    name: "Gemini Cooperation",
    members: ["Maersk", "Hapag-Lloyd"],
    capacityShare: "~22%",
    description:
      "Launched in February 2025, replacing the dissolved 2M alliance (Maersk + MSC). Focuses on a hub-and-spoke network model with fewer direct port calls but higher reliability. Aims for 90%+ schedule reliability.",
    color: "#E8943A",
  },
  {
    name: "MSC (Independent)",
    members: ["MSC"],
    capacityShare: "~20%",
    description:
      "After leaving the 2M alliance, MSC now operates independently as the world's largest container line by capacity. Has aggressively expanded fleet through secondhand acquisitions and massive newbuild orders. Pursuing a standalone global network strategy.",
    color: "#E85D5D",
  },
];

// Sort companies by parsing market cap
function parseMarketCap(cap: string): number {
  const cleaned = cap.replace(/[~$B(est.)]/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

const sortedCompanies = [...majorCompanies].sort(
  (a, b) => parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)
);

// Find max volume for bar scaling
const maxVolume = Math.max(...commodityVolumes.map((c) => c.volumeNumber));

export default function MarketPage() {
  const [expandedCommodity, setExpandedCommodity] = useState<number | null>(
    null
  );
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#152952] via-[#0F1F3D] to-[#0A1628]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2980B9] rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#E8943A] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8943A]/10 border border-[#E8943A]/20">
              <Globe className="w-6 h-6 text-[#E8943A]" />
            </div>
            <div>
              <p className="text-[#E8943A] text-sm font-semibold uppercase tracking-wider">
                Market Intelligence
              </p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F8FAFC] mb-4">
            Shipping Market Overview
          </h1>
          <p className="text-lg text-[#94A3B8] max-w-3xl">
            Comprehensive data on global commodity flows, major shipping
            companies, alliance structures, and key market indices that drive the
            maritime industry.
          </p>
        </div>
      </section>

      {/* Section A: Commodities Shipped by Volume */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2980B9]/10 border border-[#2980B9]/20">
            <Boxes className="w-5 h-5 text-[#2980B9]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Commodities Shipped by Volume
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {commodityVolumes.map((commodity, index) => {
            const isPositive = commodity.growth.startsWith("+");
            const barWidth = (commodity.volumeNumber / maxVolume) * 100;
            const isExpanded = expandedCommodity === index;

            return (
              <div
                key={commodity.commodity}
                className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 hover:border-[#2980B9]/30 transition-all duration-300"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">
                      {commodity.commodity}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">
                      {commodity.vesselType}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#F8FAFC]">
                      {commodity.annualVolume}
                    </div>
                    <div className="text-sm text-[#94A3B8]">
                      {commodity.unit}/year
                    </div>
                  </div>
                </div>

                {/* Volume Bar */}
                <div className="mb-4">
                  <div className="w-full h-3 bg-[#0A1628] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${barWidth}%`,
                        background: `linear-gradient(90deg, #2980B9, ${isPositive ? "#27AE60" : "#E85D5D"})`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-[#94A3B8]">
                      {barWidth.toFixed(0)}% of max volume
                    </span>
                    <span
                      className={`text-sm font-semibold flex items-center gap-1 ${
                        isPositive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {commodity.growth} growth
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() =>
                    setExpandedCommodity(isExpanded ? null : index)
                  }
                  className="flex items-center gap-1 text-sm text-[#2980B9] hover:text-[#E8943A] transition-colors mb-2"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" /> Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" /> Show trade flows
                    </>
                  )}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-3 animate-in fade-in duration-200">
                    {/* Top Exporters */}
                    <div>
                      <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                        Top Exporters
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {commodity.topExporters.map((country) => (
                          <span
                            key={country}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#152952] border border-[#2980B9]/20 rounded-full text-xs font-medium text-[#F8FAFC]"
                          >
                            <span className="text-[#94A3B8]">
                              {countryFlags[country] || ""}
                            </span>
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top Importers */}
                    <div>
                      <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2">
                        Top Importers
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {commodity.topImporters.map((country) => (
                          <span
                            key={country}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#152952] border border-[#E8943A]/20 rounded-full text-xs font-medium text-[#F8FAFC]"
                          >
                            <span className="text-[#94A3B8]">
                              {countryFlags[country] || ""}
                            </span>
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section B: Major Shipping Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8943A]/10 border border-[#E8943A]/20">
            <Building2 className="w-5 h-5 text-[#E8943A]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Major Shipping Companies
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  #
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Ticker
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Fleet
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  HQ
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Segment
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((company, index) => (
                <tr
                  key={company.name}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-[#94A3B8]">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-[#F8FAFC]">
                      {company.name}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-[#2980B9] font-mono">
                      {company.ticker}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-[#E8943A]">
                      {company.marketCap}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-[#F8FAFC]">
                      {company.revenue}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-[#94A3B8]">
                      {company.fleet}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-[#94A3B8]">
                      {company.headquarters}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2.5 py-1 bg-[#152952] border border-white/5 rounded-full text-xs font-medium text-[#F8FAFC]">
                      {company.segment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {(showAllCompanies
            ? sortedCompanies
            : sortedCompanies.slice(0, 5)
          ).map((company, index) => (
            <div
              key={company.name}
              className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#94A3B8] bg-[#0A1628] px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-mono text-[#2980B9]">
                      {company.ticker}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">
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

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <div>
                  <p className="text-xs text-[#94A3B8]">Revenue</p>
                  <p className="text-sm font-semibold text-[#F8FAFC]">
                    {company.revenue}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Fleet Size</p>
                  <p className="text-sm font-semibold text-[#F8FAFC]">
                    {company.fleet}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Headquarters</p>
                  <p className="text-sm text-[#F8FAFC]">
                    {company.headquarters}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Segment</p>
                  <span className="inline-flex px-2.5 py-1 bg-[#152952] border border-white/5 rounded-full text-xs font-medium text-[#F8FAFC]">
                    {company.segment}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {sortedCompanies.length > 5 && (
            <button
              onClick={() => setShowAllCompanies(!showAllCompanies)}
              className="w-full py-3 text-sm font-medium text-[#2980B9] hover:text-[#E8943A] transition-colors"
            >
              {showAllCompanies
                ? "Show fewer companies"
                : `Show all ${sortedCompanies.length} companies`}
            </button>
          )}
        </div>
      </section>

      {/* Section C: Shipping Alliances */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E85D5D]/10 border border-[#E85D5D]/20">
            <Users className="w-5 h-5 text-[#E85D5D]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Shipping Alliances
          </h2>
        </div>

        <p className="text-[#94A3B8] mb-8 max-w-3xl text-sm leading-relaxed">
          Shipping alliances are agreements between container carriers to share
          vessel capacity on major trade routes. By pooling ships and
          coordinating schedules, alliance members can offer broader network
          coverage, more frequent sailings, and better port coverage than any
          single carrier could achieve alone. Alliances collectively control over
          70% of global container capacity, significantly influencing freight
          rates, service availability, and supply chain reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shippingAlliances.map((alliance) => (
            <div
              key={alliance.name}
              className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: alliance.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xl font-bold"
                  style={{ color: alliance.color }}
                >
                  {alliance.name}
                </h3>
                <span className="text-sm font-bold text-[#F8FAFC] bg-[#0A1628] px-3 py-1 rounded-full">
                  {alliance.capacityShare}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {alliance.members.map((member) => (
                  <span
                    key={member}
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-[#F8FAFC] border"
                    style={{
                      borderColor: `${alliance.color}40`,
                      backgroundColor: `${alliance.color}15`,
                    }}
                  >
                    {member}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {alliance.description}
              </p>
            </div>
          ))}
        </div>

        {/* Capacity Distribution Bar */}
        <div className="mt-8 bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">
            Global Container Capacity Distribution
          </h3>
          <div className="flex h-8 rounded-full overflow-hidden">
            {shippingAlliances.map((alliance) => {
              const share = parseInt(
                alliance.capacityShare.replace(/[~%]/g, "")
              );
              return (
                <div
                  key={alliance.name}
                  className="flex items-center justify-center transition-all duration-300 hover:opacity-80"
                  style={{
                    width: `${share}%`,
                    backgroundColor: alliance.color,
                  }}
                >
                  <span className="text-xs font-bold text-white truncate px-2">
                    {alliance.name.split(" ")[0]} {alliance.capacityShare}
                  </span>
                </div>
              );
            })}
            <div
              className="flex items-center justify-center bg-[#94A3B8]/30"
              style={{ width: "29%" }}
            >
              <span className="text-xs font-bold text-[#F8FAFC] truncate px-2">
                Others ~29%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {shippingAlliances.map((alliance) => (
              <div key={alliance.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: alliance.color }}
                />
                <span className="text-xs text-[#94A3B8]">{alliance.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#94A3B8]/30" />
              <span className="text-xs text-[#94A3B8]">
                Non-Alliance / Regional Carriers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Key Market Indices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Key Market Indices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketIndices.map((indexData) => (
            <div
              key={indexData.name}
              className="bg-[#0F1F3D] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Left accent border */}
              <div
                className="absolute top-0 left-0 bottom-0 w-1"
                style={{ backgroundColor: indexData.color }}
              />

              <div className="pl-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">
                      {indexData.name}
                    </h3>
                    <span
                      className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        color: indexData.color,
                        backgroundColor: `${indexData.color}15`,
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
                    <div className="text-xs text-[#94A3B8]">Current (approx.)</div>
                  </div>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
                  {indexData.description}
                </p>

                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8]">
                      Historical Range
                    </span>
                    <span className="text-xs font-mono text-[#F8FAFC]">
                      {indexData.range}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-8 bg-[#0F1F3D] border border-white/5 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-[#E8943A] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">
                How to Read These Indices
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Shipping indices are critical barometers for the global economy.
                The <strong className="text-[#F8FAFC]">Baltic Dry Index</strong>{" "}
                is often called a &ldquo;leading economic indicator&rdquo;
                because it reflects real-time demand for raw materials shipped by
                sea. The{" "}
                <strong className="text-[#F8FAFC]">ClarkSea Index</strong>{" "}
                provides the broadest view across all segments. Container
                indices like{" "}
                <strong className="text-[#F8FAFC]">Harpex</strong> and{" "}
                <strong className="text-[#F8FAFC]">SCFI</strong> focus
                specifically on the consumer goods supply chain. Together, they
                paint a comprehensive picture of maritime trade health and
                direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
