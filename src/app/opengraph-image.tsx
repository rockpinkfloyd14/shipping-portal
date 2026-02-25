import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Shipping Industry Portal | Synergy Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Read images as base64
  const logoData = readFileSync(
    join(process.cwd(), "public", "synergy_logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  const shipData = readFileSync(
    join(process.cwd(), "public", "images", "vessels", "container-ship-1.jpg")
  );
  const shipBase64 = `data:image/jpeg;base64,${shipData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0B1426",
        }}
      >
        {/* Ship background image */}
        <img
          src={shipBase64}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.45,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(135deg, rgba(11,20,38,0.92) 0%, rgba(11,20,38,0.6) 50%, rgba(11,20,38,0.85) 100%)",
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "6px",
            display: "flex",
            background: "linear-gradient(90deg, #E8943A 0%, #E85D5D 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "52px 60px",
          }}
        >
          {/* Top: Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoBase64}
              alt="Synergy Capital"
              style={{ height: "90px", width: "auto" }}
            />
          </div>

          {/* Bottom: Text content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "56px",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-1px",
              }}
            >
              Shipping Industry Portal
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "24px",
                fontWeight: 400,
                color: "#CBD5E1",
                lineHeight: 1.4,
              }}
            >
              Vessels  |  Ports & Routes  |  Freight Rates  |  Market Data  |  Forecasts
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(90deg, #E8943A, #E85D5D)",
                  display: "flex",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  fontSize: "16px",
                  color: "#E8943A",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase" as const,
                  display: "flex",
                }}
              >
                synergycapital.co.uk
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
