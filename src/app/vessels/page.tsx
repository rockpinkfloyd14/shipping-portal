"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { vesselTypes } from "@/data/shipping";

const categories = [
  "All",
  "Bulk Carrier",
  "Oil Tanker",
  "Container Ship",
  "Gas Tanker",
  "Vehicle Carrier",
];

export default function VesselsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVessels =
    activeCategory === "All"
      ? vesselTypes
      : vesselTypes.filter((v) => v.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Navbar />

      {/* Page Header */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
            Vessel Types &{" "}
            <span className="gradient-text">Classifications</span>
          </h1>
          <p className="text-[#94A3B8] max-w-3xl text-lg mb-10">
            Explore the diverse range of commercial vessels that form the backbone of global maritime trade,
            from massive bulk carriers to highly specialized LNG tankers.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#E8943A] text-white shadow-lg shadow-[#E8943A]/25"
                    : "bg-[#0F1F3D] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC] hover:border-[#E8943A]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vessel Cards */}
          <div className="space-y-8">
            {filteredVessels.map((vessel) => (
              <div
                key={vessel.name}
                className="card-hover bg-[#0F1F3D] rounded-2xl border border-white/5 overflow-hidden"
              >
                {/* Image Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[#152952]">
                  {/* Profile View */}
                  <div className="relative">
                    <img
                      src={vessel.imageUrl}
                      alt={`${vessel.name} - Profile View`}
                      className="w-full h-[200px] object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      Profile View
                    </span>
                  </div>
                  {/* Side View */}
                  <div className="relative">
                    <img
                      src={vessel.sideViewUrl}
                      alt={`${vessel.name} - Side View`}
                      className="w-full h-[200px] object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      Side View
                    </span>
                  </div>
                  {/* Aerial View */}
                  <div className="relative">
                    <img
                      src={vessel.aerialViewUrl}
                      alt={`${vessel.name} - Aerial View`}
                      className="w-full h-[200px] object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      Aerial View
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  {/* Name & Category */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                      {vessel.name}
                    </h2>
                    <span className="text-xs font-semibold bg-[#E8943A] text-white px-3 py-1 rounded-full">
                      {vessel.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
                    {vessel.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        DWT
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.dwt}</p>
                    </div>
                    {vessel.teu && (
                      <div className="bg-[#152952] rounded-lg p-4">
                        <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                          TEU
                        </p>
                        <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.teu}</p>
                      </div>
                    )}
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Length
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.length}</p>
                    </div>
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Beam
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.beam}</p>
                    </div>
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Draft
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.draft}</p>
                    </div>
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Speed
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.speed}</p>
                    </div>
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Crew
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.crew}</p>
                    </div>
                    <div className="bg-[#152952] rounded-lg p-4">
                      <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider mb-1">
                        Build Cost
                      </p>
                      <p className="text-[#F8FAFC] text-sm font-semibold">{vessel.buildCost}</p>
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
                          className="text-xs font-medium bg-[#E8943A]/10 text-[#E8943A] border border-[#E8943A]/20 px-3 py-1.5 rounded-full"
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
                          className="flex items-center gap-2 text-sm text-[#F8FAFC]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E8943A] to-[#E85D5D] shrink-0" />
                          {route}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fun Facts */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                      Fun Facts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {vessel.facts.map((fact, i) => (
                        <div
                          key={i}
                          className="bg-[#152952] rounded-lg p-3 text-sm text-[#F8FAFC] border border-white/5"
                        >
                          <span className="gradient-text font-bold mr-1.5">#{i + 1}</span>
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredVessels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#94A3B8] text-lg">
                No vessels found for the selected category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
