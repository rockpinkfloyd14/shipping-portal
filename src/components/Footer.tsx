import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  Anchor,
  Globe,
  TrendingUp,
  Factory,
  BarChart3,
  Navigation,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/", icon: <Navigation className="w-4 h-4" /> },
  { label: "Vessels", href: "/vessels", icon: <Ship className="w-4 h-4" /> },
  {
    label: "Ports & Routes",
    href: "/ports-routes",
    icon: <Anchor className="w-4 h-4" />,
  },
  { label: "Market", href: "/market", icon: <Globe className="w-4 h-4" /> },
  {
    label: "Freight",
    href: "/freight",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: "Shipbuilding",
    href: "/shipbuilding",
    icon: <Factory className="w-4 h-4" />,
  },
  {
    label: "Forecasts",
    href: "/forecasts",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: "Twitter",
    href: "#",
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    label: "Email",
    href: "#",
    icon: <Mail className="w-5 h-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1628]">
      {/* Orange gradient accent line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E8943A] via-[#E85D5D] to-[#E8943A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/synergy_logo.png"
                alt="Synergy Capital"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="text-[#F8FAFC] font-semibold text-lg">
                Synergy Capital
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              Comprehensive shipping intelligence and market analytics for the
              global maritime industry. Real-time data, forecasts, and insights
              to drive informed decisions.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-[#94A3B8] hover:text-[#E8943A] hover:bg-[#E8943A]/10 transition-all duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200 group"
                  >
                    <span className="text-[#94A3B8] group-hover:text-[#E8943A] transition-colors duration-200">
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/market"
                  className="text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200"
                >
                  Market Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/freight"
                  className="text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200"
                >
                  Freight Rates
                </Link>
              </li>
              <li>
                <Link
                  href="/forecasts"
                  className="text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200"
                >
                  Industry Forecasts
                </Link>
              </li>
              <li>
                <Link
                  href="/vessels"
                  className="text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200"
                >
                  Vessel Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/shipbuilding"
                  className="text-[#94A3B8] hover:text-[#E8943A] text-sm transition-colors duration-200"
                >
                  Shipbuilding Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Powered By Column */}
          <div className="lg:col-span-1">
            <h3 className="text-[#F8FAFC] font-semibold text-sm uppercase tracking-wider mb-4">
              About
            </h3>
            <div className="space-y-4">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Powered by{" "}
                <a
                  href="https://synergycapital.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8943A] hover:text-[#E85D5D] font-medium transition-colors duration-200 underline underline-offset-2"
                >
                  Synergy Capital
                </a>
              </p>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Delivering cutting-edge analytics and intelligence for the
                global shipping and maritime sector.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#94A3B8] text-xs">
              &copy; 2025 Synergy Capital. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-[#94A3B8] hover:text-[#F8FAFC] text-xs transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#94A3B8] hover:text-[#F8FAFC] text-xs transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="https://synergycapital.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#E8943A] text-xs transition-colors duration-200"
              >
                synergycapital.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
