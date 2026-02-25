"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industryForecasts } from "@/data/shipping";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Leaf,
  Globe2,
  Shield,
  Cpu,
  Ship,
  Wind,
  Recycle,
  Zap,
} from "lucide-react";

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
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
function impactColor(impact: "positive" | "negative" | "neutral") {
  switch (impact) {
    case "positive":
      return {
        border: "border-l-[#10B981]",
        dot: "bg-[#10B981]",
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
      return <TrendingUp className="w-4 h-4 text-[#10B981]" />;
    case "negative":
      return <TrendingDown className="w-4 h-4 text-[#E85D5D]" />;
    case "neutral":
      return <Minus className="w-4 h-4 text-amber-400" />;
  }
}

function confidenceBadge(confidence: string) {
  const styles: Record<string, string> = {
    High: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25",
    Medium: "bg-amber-500/10 text-amber-600 border border-amber-500/25",
    Low: "bg-[#E85D5D]/10 text-[#E85D5D] border border-[#E85D5D]/25",
  };
  return styles[confidence] ?? styles.Medium;
}

/* ------------------------------------------------------------------ */
/*  STATIC DATA                                                        */
/* ------------------------------------------------------------------ */
const keyOutlook = [
  {
    label: "Trade Growth",
    value: "2-2.5% CAGR",
    description:
      "Seaborne trade volumes projected to grow steadily, driven by emerging market demand and shifting trade patterns.",
    icon: <TrendingUp className="w-5 h-5 text-[#10B981]" />,
    borderColor: "#10B981",
    bgColor: "#10B981",
  },
  {
    label: "Decarbonization",
    value: "$1-1.5T",
    description:
      "Investment needed for fleet decarbonization to meet IMO 2030 and 2050 greenhouse gas targets.",
    icon: <Leaf className="w-5 h-5 text-[#E8943A]" />,
    borderColor: "#E8943A",
    bgColor: "#E8943A",
  },
  {
    label: "Orderbook",
    value: "Record Highs",
    description:
      "Shipyard orderbooks at multi-year highs with delivery slots booked through 2029 across all major vessel segments.",
    icon: <Ship className="w-5 h-5 text-[#2980B9]" />,
    borderColor: "#2980B9",
    bgColor: "#2980B9",
  },
  {
    label: "LNG Fleet",
    value: "40%+ Growth",
    description:
      "LNG carrier fleet set to expand over 40% by 2030, driven by Qatar North Field expansion and global energy security.",
    icon: <Zap className="w-5 h-5 text-[#E85D5D]" />,
    borderColor: "#E85D5D",
    bgColor: "#E85D5D",
  },
];

const megatrends = [
  {
    title: "Decarbonization",
    subtitle: "Green Transition",
    icon: <Leaf className="w-6 h-6" />,
    color: "#10B981",
    points: [
      "IMO 2030/2050 targets forcing fleet-wide fuel transition",
      "LNG, methanol, and ammonia as leading alternative fuels",
      "EU ETS inclusion and CII ratings accelerating adoption",
      "Carbon levies under active debate at IMO level",
    ],
  },
  {
    title: "Digitalization",
    subtitle: "Smart Shipping",
    icon: <Cpu className="w-6 h-6" />,
    color: "#2980B9",
    points: [
      "AI-driven route optimization saving 5-10% fuel costs",
      "IoT sensor networks and digital twins transforming operations",
      "Smart ports and blockchain documentation reducing friction",
      "Autonomous vessel trials progressing in Norway",
    ],
  },
  {
    title: "Geopolitical Shifts",
    subtitle: "New World Order",
    icon: <Globe2 className="w-6 h-6" />,
    color: "#E85D5D",
    points: [
      "Sanctions and conflicts redrawing global trade lanes",
      "Arctic Northern Sea Route cutting Asia-Europe by 10-15 days",
      "Red Sea disruptions pushing traffic around Cape of Good Hope",
      "US-China tensions reshaping container trade patterns",
    ],
  },
  {
    title: "Supply Chain Resilience",
    subtitle: "Diversification",
    icon: <Shield className="w-6 h-6" />,
    color: "#E8943A",
    points: [
      "Post-pandemic nearshoring and friend-shoring trends",
      "Multi-sourcing replacing just-in-time lean networks",
      "Regional hub models gaining traction globally",
      "Inventory buffer strategies increasing cargo volumes",
    ],
  },
];

const risks = [
  {
    title: "Geopolitical",
    icon: <Globe2 className="w-5 h-5 text-[#E85D5D]" />,
    description:
      "Houthi disruptions in the Red Sea rerouting traffic around the Cape of Good Hope, adding 10-14 days to voyages. Sanctions on Russia and Iran create shadow fleet risks, while US-China trade tensions threaten container volumes.",
  },
  {
    title: "Regulatory",
    icon: <Shield className="w-5 h-5 text-[#E85D5D]" />,
    description:
      "A potential IMO carbon levy could add $50-100/tonne of fuel cost. EU ETS inclusion from 2024 hits European routes. CII ratings may force slow-steaming or early scrapping of non-compliant tonnage, tightening supply.",
  },
  {
    title: "Economic",
    icon: <TrendingDown className="w-5 h-5 text-[#E85D5D]" />,
    description:
      "Global recession risk remains elevated with persistent inflation and high interest rates. China's property downturn could dent dry bulk demand. Consumer spending softness in the West weighs on container trade forecasts.",
  },
  {
    title: "Climate",
    icon: <Wind className="w-5 h-5 text-[#E85D5D]" />,
    description:
      "Panama Canal drought restrictions slashed daily transits by 40% in 2023-2024. Extreme weather events are increasing port downtime and disrupting schedules. Rising sea levels threaten low-lying port infrastructure globally.",
  },
];

const opportunities = [
  {
    title: "Arctic Shipping Routes",
    icon: <Globe2 className="w-5 h-5 text-[#2980B9]" />,
    color: "#2980B9",
    description:
      "The Northern Sea Route cuts Asia-Europe transit by 10-15 days. Melting Arctic ice expanding the navigable season to 4-6 months. Russia investing heavily in icebreaker fleet and port infrastructure.",
  },
  {
    title: "Green Corridors",
    icon: <Leaf className="w-5 h-5 text-[#10B981]" />,
    color: "#10B981",
    description:
      "Zero-emission shipping routes being established between willing ports. Singapore-Rotterdam and Shanghai-LA among first candidates. Supported by Clydebank Declaration signatories.",
  },
  {
    title: "Ship Recycling Modernization",
    icon: <Recycle className="w-5 h-5 text-[#E8943A]" />,
    color: "#E8943A",
    description:
      "Hong Kong Convention raising recycling standards globally. Green recycling yards in Turkey and EU commanding premium prices. Steel recovery creating new investment opportunities.",
  },
  {
    title: "Digital Freight Platforms",
    icon: <Cpu className="w-5 h-5 text-[#2980B9]" />,
    color: "#2980B9",
    description:
      "Online freight marketplaces digitizing cargo booking, pricing, and documentation. Platforms like Freightos and Flexport attracting billions in venture capital and disrupting traditional brokerage.",
  },
  {
    title: "Offshore Wind Vessel Demand",
    icon: <Wind className="w-5 h-5 text-[#E85D5D]" />,
    color: "#E85D5D",
    description:
      "Global offshore wind capacity targets require 100+ new installation vessels and hundreds of service operation vessels by 2030. Specialized heavy-lift and cable-lay vessel demand surging.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ForecastsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* ========== HERO HEADER ========== */}
      <section className="relative overflow-hidden bg-white border-b border-[#E2E8F0]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8943A] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2980B9] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8943A]/10 border border-[#E8943A]/20 text-[#E8943A] text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Industry Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] mb-4">
              Shipping Industry{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8943A] to-[#E85D5D]">
                Forecasts &amp; Outlook
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#475569] leading-relaxed">
              Comprehensive forward-looking analysis of the global maritime
              industry, covering trade growth, fleet dynamics, regulations, and
              emerging opportunities through 2030 and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== A) KEY OUTLOOK ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2"
        >
          Industry Outlook 2025&ndash;2030
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-[#475569] mb-8 max-w-3xl"
        >
          Key macro takeaways shaping the maritime sector over the next five
          years.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {keyOutlook.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 border-l-4 hover:shadow-md transition-shadow duration-200"
              style={{ borderLeftColor: item.borderColor }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.bgColor}12` }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                  {item.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A] mb-1">
                {item.value}
              </p>
              <p className="text-sm text-[#475569]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== B) FORECAST CARDS ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2"
        >
          Sector Forecasts
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-[#475569] mb-8 max-w-3xl"
        >
          Detailed outlooks across major shipping segments, with confidence
          ratings and impact assessments.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industryForecasts.map((forecast, i) => {
            const colors = impactColor(forecast.impact);
            return (
              <motion.div
                key={forecast.title}
                variants={fadeUp}
                custom={i + 2}
                className={`bg-white border border-[#E2E8F0] rounded-xl border-l-4 ${colors.border} p-6 hover:shadow-md transition-shadow duration-200`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    {forecast.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#2980B9]/10 text-[#2980B9] border border-[#2980B9]/25">
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
                <p className="text-[#475569] text-sm leading-relaxed mb-4">
                  {forecast.description}
                </p>

                {/* Details bullet list */}
                <ul className="space-y-2">
                  {forecast.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[#475569]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8943A] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ========== C) MEGATRENDS ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2"
        >
          Megatrends Shaping Shipping
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-[#475569] mb-8 max-w-3xl"
        >
          Four structural forces reshaping global maritime trade and fleet
          strategy for decades to come.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {megatrends.map((trend, i) => (
            <motion.div
              key={trend.title}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-shadow duration-200 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                style={{
                  backgroundColor: `${trend.color}12`,
                  color: trend.color,
                }}
              >
                {trend.icon}
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: trend.color }}
              >
                {trend.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                {trend.subtitle}
              </p>
              <ul className="space-y-2">
                {trend.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-[#475569]"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: trend.color }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== D) RISKS & UNCERTAINTIES ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="flex items-center gap-3 mb-2"
        >
          <AlertTriangle className="w-7 h-7 text-[#E85D5D]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Key Risks &amp; Uncertainties
          </h2>
        </motion.div>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-[#475569] mb-8 max-w-3xl"
        >
          Critical risk factors that could materially alter the shipping
          industry outlook.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {risks.map((risk, i) => (
            <motion.div
              key={risk.title}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 border-t-2 border-t-[#E85D5D] hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#E85D5D]/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#E85D5D]" />
                </div>
                <h3 className="font-bold text-[#0F172A]">{risk.title}</h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                {risk.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== E) EMERGING OPPORTUNITIES ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2"
        >
          Emerging Opportunities
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-[#475569] mb-8 max-w-3xl"
        >
          Growth areas and investment themes creating new value across the
          maritime sector.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.title}
              variants={fadeUp}
              custom={i + 2}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-shadow duration-200 group"
              style={{ borderTop: `3px solid ${opp.color}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${opp.color}12` }}
                >
                  {opp.icon}
                </div>
                <h3 className="font-bold text-[#0F172A]">{opp.title}</h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                {opp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
