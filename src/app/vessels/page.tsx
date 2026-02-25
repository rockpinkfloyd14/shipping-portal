"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { vesselTypes } from "@/data/shipping";
import { motion } from "framer-motion";
import { Ship } from "lucide-react";

const categories = [
  "All",
  "Bulk Carrier",
  "Oil Tanker",
  "Container Ship",
  "Gas Tanker",
  "Vehicle Carrier",
];

function VesselImage({
  src,
  alt,
  label,
  vesselName,
}: {
  src: string;
  alt: string;
  label: string;
  vesselName: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {hasError ? (
        <div className="w-full h-[220px] bg-gradient-to-br from-[#E8943A]/20 to-[#2980B9]/20 flex flex-col items-center justify-center gap-3">
          <Ship className="w-12 h-12 text-[#94A3B8]" />
          <span className="text-[#475569] text-sm font-medium text-center px-4">
            {vesselName}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-[220px] object-cover rounded-xl"
          onError={() => setHasError(true)}
        />
      )}
      <span className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
        {label}
      </span>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function VesselsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVessels =
    activeCategory === "All"
      ? vesselTypes
      : vesselTypes.filter((v) => v.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Page Header */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">
            Vessel Types &{" "}
            <span className="bg-gradient-to-r from-[#E8943A] via-[#E85D5D] to-[#2980B9] bg-clip-text text-transparent">
              Classifications
            </span>
          </h1>
          <p className="text-[#475569] max-w-3xl text-lg mb-10">
            Explore the diverse range of commercial vessels that form the
            backbone of global maritime trade, from massive bulk carriers to
            highly specialized LNG tankers.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#E8943A] text-white shadow-lg shadow-[#E8943A]/25"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:text-[#0F172A] hover:border-[#E8943A]/40 hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vessel Cards */}
          <div className="space-y-10">
            {filteredVessels.map((vessel, index) => (
              <motion.div
                key={vessel.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image Row */}
                <div className="p-5 pb-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <VesselImage
                      src={vessel.imageUrl}
                      alt={`${vessel.name} - Profile View`}
                      label="Profile View"
                      vesselName={vessel.name}
                    />
                    <VesselImage
                      src={vessel.sideViewUrl}
                      alt={`${vessel.name} - Side View`}
                      label="Side View"
                      vesselName={vessel.name}
                    />
                    <VesselImage
                      src={vessel.aerialViewUrl}
                      alt={`${vessel.name} - Aerial View`}
                      label="Aerial View"
                      vesselName={vessel.name}
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  {/* Name & Category */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      {vessel.name}
                    </h2>
                    <span className="text-xs font-semibold bg-[#E8943A] text-white px-3 py-1 rounded-full">
                      {vessel.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
                    {vessel.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        DWT
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.dwt}
                      </p>
                    </div>
                    {vessel.teu && (
                      <div className="bg-[#F1F5F9] rounded-lg p-4">
                        <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                          TEU
                        </p>
                        <p className="text-[#0F172A] text-sm font-semibold">
                          {vessel.teu}
                        </p>
                      </div>
                    )}
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Length
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.length}
                      </p>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Beam
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.beam}
                      </p>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Draft
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.draft}
                      </p>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Speed
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.speed}
                      </p>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Crew
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.crew}
                      </p>
                    </div>
                    <div className="bg-[#F1F5F9] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Build Cost
                      </p>
                      <p className="text-[#0F172A] text-sm font-semibold">
                        {vessel.buildCost}
                      </p>
                    </div>
                  </div>

                  {/* Typical Cargo */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                      Typical Cargo
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {vessel.typicalCargo.map((cargo) => (
                        <span
                          key={cargo}
                          className="text-xs font-medium text-[#E8943A] border border-[#E8943A]/30 bg-[#E8943A]/5 px-3 py-1.5 rounded-full"
                        >
                          {cargo}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Routes */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                      Key Routes
                    </h3>
                    <ul className="space-y-1.5">
                      {vessel.keyRoutes.map((route) => (
                        <li
                          key={route}
                          className="flex items-center gap-2 text-sm text-[#0F172A]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E8943A] to-[#E85D5D] shrink-0" />
                          {route}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fun Facts */}
                  <div className="bg-[#FFF7ED] rounded-xl p-5 border border-[#E8943A]/15">
                    <h3 className="text-sm font-semibold text-[#E8943A] uppercase tracking-wider mb-3">
                      Fun Facts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {vessel.facts.map((fact, i) => (
                        <div
                          key={i}
                          className="text-sm text-[#475569] leading-relaxed"
                        >
                          <span className="bg-gradient-to-r from-[#E8943A] to-[#E85D5D] bg-clip-text text-transparent font-bold mr-1.5">
                            #{i + 1}
                          </span>
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredVessels.length === 0 && (
            <div className="text-center py-20">
              <Ship className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <p className="text-[#475569] text-lg font-medium">
                No vessels found for the selected category.
              </p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Try selecting a different category filter above.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
