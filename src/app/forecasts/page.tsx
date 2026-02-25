"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industryForecasts } from "@/data/shipping";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Leaf,
  Globe,
  Shield,
  Cpu,
  Ship,
  Wind,
  Recycle,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  HELPER: impact colour mapping                                      */
/* ------------------------------------------------------------------ */
function impactColor(impact: "positive" | "negative" | "neutral") {
  switch (impact) {
    case "positive":
      return {
        border: "border-l-green-500",
        dot: "bg-green-500",
        label: "Positive",
      };
    case "negative":
      return {
        border: "border-l-[#E85D5D]",
        dot: "bg-[#E85D5D]",
        label: "Negative",
      };
    case "neutral":
      return {
        border: "border-l-amber-400",
        dot: "bg-amber-400",
        label: "Neutral",
      };
  }
}

function impactIcon(impact: "positive" | "negative" | "neutral") {
  switch (impact) {
    case "positive":
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    case "negative":
      return <TrendingDown className="w-4 h-4 text-[#E85D5D]" />;
    case "neutral":
      return <Minus className="w-4 h-4 text-amber-400" />;
  }
}

function confidenceBadge(confidence: string) {
  const styles: Record<string, string> = {
    High: "bg-green-500/15 text-green-400 border border-green-500/30",
    Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    Low: "bg-[#E85D5D]/15 text-[#E85D5D] border border-[#E85D5D]/30",
  };
  return styles[confidence] ?? styles.Medium;
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ForecastsPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-[#F8FAFC]">
      <Navbar />

      {/* ========== PAGE HEADING ========== */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#152952] via-[#0F1F3D] to-[#0A1628]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8943A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2980B9]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8943A]/10 border border-[#E8943A]/20 text-[#E8943A] text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Industry Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Shipping Industry{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8943A] to-[#E85D5D]">
                Forecasts &amp; Outlook
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#94A3B8] leading-relaxed">
              Comprehensive forward-looking analysis of the global maritime
              industry, covering trade growth, fleet dynamics, regulations, and
              emerging opportunities through 2030 and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ========== A) INDUSTRY OUTLOOK HERO ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Industry Outlook 2025&ndash;2030
        </h2>
        <p className="text-[#94A3B8] mb-8 max-w-3xl">
          Key macro takeaways shaping the maritime sector over the next five
          years.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Takeaway 1 */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Trade Growth
              </span>
            </div>
            <p className="text-2xl font-bold text-[#F8FAFC] mb-1">
              2&ndash;2.5% CAGR
            </p>
            <p className="text-sm text-[#94A3B8]">
              Seaborne trade volumes projected to grow steadily, driven by
              emerging market demand and shifting trade patterns.
            </p>
          </div>

          {/* Takeaway 2 */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E8943A]/15 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#E8943A]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Decarbonization
              </span>
            </div>
            <p className="text-2xl font-bold text-[#F8FAFC] mb-1">
              $1&ndash;1.5T
            </p>
            <p className="text-sm text-[#94A3B8]">
              Investment needed for fleet decarbonization to meet IMO 2030 and
              2050 greenhouse gas targets.
            </p>
          </div>

          {/* Takeaway 3 */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2980B9]/15 flex items-center justify-center">
                <Ship className="w-5 h-5 text-[#2980B9]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Shipbuilding
              </span>
            </div>
            <p className="text-2xl font-bold text-[#F8FAFC] mb-1">
              Record Orderbooks
            </p>
            <p className="text-sm text-[#94A3B8]">
              Shipyard orderbooks at multi-year highs with delivery slots booked
              through 2029 across all major vessel segments.
            </p>
          </div>

          {/* Takeaway 4 */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E85D5D]/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                LNG Fleet
              </span>
            </div>
            <p className="text-2xl font-bold text-[#F8FAFC] mb-1">
              40%+ Growth
            </p>
            <p className="text-sm text-[#94A3B8]">
              LNG carrier fleet set to expand over 40% by 2030, driven by Qatar
              North Field expansion and global energy security.
            </p>
          </div>
        </div>
      </section>

      {/* ========== B) FORECAST CARDS ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Sector Forecasts
        </h2>
        <p className="text-[#94A3B8] mb-8 max-w-3xl">
          Detailed outlooks across major shipping segments, with confidence
          ratings and impact assessments.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industryForecasts.map((forecast) => {
            const colors = impactColor(forecast.impact);
            return (
              <div
                key={forecast.title}
                className={`rounded-xl bg-[#0F1F3D] border border-white/10 border-l-4 ${colors.border} p-6 hover:border-white/20 transition-colors`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {forecast.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Timeframe badge */}
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#2980B9]/15 text-[#2980B9] border border-[#2980B9]/30">
                      {forecast.timeframe}
                    </span>
                  </div>
                </div>

                {/* Impact & Confidence indicators */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                    />
                    {impactIcon(forecast.impact)}
                    <span className="text-[#94A3B8]">{colors.label}</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${confidenceBadge(forecast.confidence)}`}
                  >
                    {forecast.confidence} Confidence
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                  {forecast.description}
                </p>

                {/* Details bullet list */}
                <ul className="space-y-2">
                  {forecast.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[#94A3B8]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8943A] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== C) MEGATRENDS SHAPING SHIPPING ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Megatrends Shaping Shipping
        </h2>
        <p className="text-[#94A3B8] mb-8 max-w-3xl">
          Four structural forces reshaping global maritime trade and fleet
          strategy for decades to come.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Decarbonization */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6 hover:border-green-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center mb-4 group-hover:bg-green-500/25 transition-colors">
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold mb-1 text-green-400">
              Decarbonization
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
              Green Transition
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              IMO 2030/2050 targets are forcing a fleet-wide transition to
              alternative fuels including LNG, methanol, ammonia, and green
              hydrogen. Carbon levies, EU ETS inclusion, and CII ratings are
              accelerating adoption.
            </p>
          </div>

          {/* Digitalization */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6 hover:border-[#2980B9]/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-[#2980B9]/15 flex items-center justify-center mb-4 group-hover:bg-[#2980B9]/25 transition-colors">
              <Cpu className="w-6 h-6 text-[#2980B9]" />
            </div>
            <h3 className="text-lg font-bold mb-1 text-[#2980B9]">
              Digitalization
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
              Smart Shipping
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              AI-driven route optimization, IoT sensor networks, digital twins,
              and autonomous vessel development are transforming maritime
              operations. Smart ports and blockchain documentation reducing
              friction across the value chain.
            </p>
          </div>

          {/* Geopolitical Shifts */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6 hover:border-[#E85D5D]/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-[#E85D5D]/15 flex items-center justify-center mb-4 group-hover:bg-[#E85D5D]/25 transition-colors">
              <Globe className="w-6 h-6 text-[#E85D5D]" />
            </div>
            <h3 className="text-lg font-bold mb-1 text-[#E85D5D]">
              Geopolitical Shifts
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
              New World Order
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Sanctions regimes, trade wars, and regional conflicts are
              redrawing trade lanes. Arctic shipping routes via the Northern Sea
              Route are becoming viable, while Red Sea disruptions push traffic
              around the Cape.
            </p>
          </div>

          {/* Supply Chain Resilience */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-[#E8943A]/15 flex items-center justify-center mb-4 group-hover:bg-[#E8943A]/25 transition-colors">
              <Shield className="w-6 h-6 text-[#E8943A]" />
            </div>
            <h3 className="text-lg font-bold mb-1 text-[#E8943A]">
              Supply Chain Resilience
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
              Diversification
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Post-pandemic lessons driving nearshoring, friend-shoring, and
              supply chain diversification. Multi-sourcing strategies and
              regional hub models replacing just-in-time lean networks.
            </p>
          </div>
        </div>
      </section>

      {/* ========== D) KEY RISKS & UNCERTAINTIES ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-7 h-7 text-[#E85D5D]" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            Key Risks &amp; Uncertainties
          </h2>
        </div>
        <p className="text-[#94A3B8] mb-8 max-w-3xl">
          Critical risk factors that could materially alter the shipping
          industry outlook.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Geopolitical */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E85D5D]/15 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">Geopolitical</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Houthi disruptions in the Red Sea are rerouting traffic around the
              Cape of Good Hope, adding 10-14 days to voyages. Sanctions on
              Russia and Iran create shadow fleet risks, while US-China trade
              tensions threaten container volumes.
            </p>
          </div>

          {/* Regulatory */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">Regulatory</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              A potential IMO carbon levy could add $50-100/tonne of fuel cost.
              EU ETS inclusion from 2024 hits European routes. CII ratings may
              force slow-steaming or early scrapping of non-compliant tonnage,
              tightening supply.
            </p>
          </div>

          {/* Economic */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E8943A]/15 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">Economic</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Global recession risk remains elevated with persistent inflation
              and high interest rates. China&apos;s property downturn could dent
              dry bulk demand. Consumer spending softness in the West weighs on
              container trade forecasts.
            </p>
          </div>

          {/* Climate */}
          <div className="rounded-xl bg-[#0F1F3D] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2980B9]/15 flex items-center justify-center">
                <Wind className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">Climate</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Panama Canal drought restrictions slashed daily transits by 40% in
              2023-2024. Extreme weather events are increasing port downtime and
              disrupting schedules. Rising sea levels threaten low-lying port
              infrastructure globally.
            </p>
          </div>
        </div>
      </section>

      {/* ========== E) EMERGING OPPORTUNITIES ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Emerging Opportunities
        </h2>
        <p className="text-[#94A3B8] mb-8 max-w-3xl">
          Growth areas and investment themes creating new value across the
          maritime sector.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Arctic Shipping Routes */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#2980B9]/40 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2980B9]/15 flex items-center justify-center group-hover:bg-[#2980B9]/25 transition-colors">
                <Globe className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">
                Arctic Shipping Routes
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              The Northern Sea Route cuts Asia-Europe transit by 10-15 days.
              Melting Arctic ice is expanding the navigable season to 4-6
              months. Russia investing heavily in icebreaker fleet and port
              infrastructure. Cargo volumes hit 36M tonnes in 2023.
            </p>
          </div>

          {/* Green Corridors */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-green-500/40 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
                <Leaf className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">Green Corridors</h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Zero-emission shipping routes being established between willing
              ports. Singapore-Rotterdam and Shanghai-LA among first candidates.
              Supported by Clydebank Declaration signatories. Requires
              coordinated fuel supply and regulatory alignment.
            </p>
          </div>

          {/* Ship Recycling Modernization */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E8943A]/40 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E8943A]/15 flex items-center justify-center group-hover:bg-[#E8943A]/25 transition-colors">
                <Recycle className="w-5 h-5 text-[#E8943A]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">
                Ship Recycling Modernization
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Hong Kong Convention entry into force is raising recycling
              standards globally. Green recycling yards in Turkey and EU
              commanding premium prices. Steel recovery and hazardous material
              management creating investment opportunities.
            </p>
          </div>

          {/* Digital Freight Platforms */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#2980B9]/40 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2980B9]/15 flex items-center justify-center group-hover:bg-[#2980B9]/25 transition-colors">
                <Cpu className="w-5 h-5 text-[#2980B9]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">
                Digital Freight Platforms
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Online freight marketplaces are digitizing cargo booking, pricing,
              and documentation. Platforms like Freightos, Flexport, and Xeneta
              attracting billions in venture capital. Real-time pricing
              transparency disrupting traditional brokerage models.
            </p>
          </div>

          {/* Offshore Wind Vessel Demand */}
          <div className="rounded-xl bg-gradient-to-br from-[#152952] to-[#0F1F3D] border border-white/10 p-6 hover:border-[#E85D5D]/40 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E85D5D]/15 flex items-center justify-center group-hover:bg-[#E85D5D]/25 transition-colors">
                <Wind className="w-5 h-5 text-[#E85D5D]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC]">
                Offshore Wind Vessel Demand
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Global offshore wind capacity targets require 100+ new
              installation vessels and hundreds of service operation vessels by
              2030. Jones Act-compliant vessels needed in the US. Specialized
              heavy-lift and cable-lay vessel demand surging.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
