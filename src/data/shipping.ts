// ============================================================
// COMPREHENSIVE SHIPPING INDUSTRY DATA
// ============================================================

// --- VESSEL TYPES ---
export interface VesselType {
  name: string;
  category: string;
  description: string;
  dwt: string;
  teu?: string;
  length: string;
  beam: string;
  draft: string;
  speed: string;
  crew: string;
  buildCost: string;
  typicalCargo: string[];
  keyRoutes: string[];
  imageUrl: string;
  sideViewUrl: string;
  aerialViewUrl: string;
  facts: string[];
}

export const vesselTypes: VesselType[] = [
  {
    name: "Capesize",
    category: "Bulk Carrier",
    description: "The largest bulk carriers, too large for both the Panama and Suez Canals (pre-expansion). Named because they must navigate via the Cape of Good Hope or Cape Horn. Primarily transport iron ore and coal on long-haul routes.",
    dwt: "150,000 - 400,000 DWT",
    length: "270 - 360m",
    beam: "43 - 65m",
    draft: "17 - 23m",
    speed: "14 - 15 knots",
    crew: "20 - 25",
    buildCost: "$55 - 65 million",
    typicalCargo: ["Iron Ore", "Coal", "Bauxite"],
    keyRoutes: ["Brazil to China", "Australia to China", "South Africa to Europe"],
    imageUrl: "/images/vessels/cargo-tug-aerial.jpg",
    sideViewUrl: "/images/vessels/cargo-ship-sea.jpg",
    aerialViewUrl: "/images/vessels/cargo-aerial-1.jpg",
    facts: [
      "Can carry enough iron ore to build 4 Eiffel Towers",
      "The Valemax class can carry up to 400,000 DWT",
      "Takes approximately 3 weeks to sail from Brazil to China"
    ]
  },
  {
    name: "Panamax",
    category: "Bulk Carrier / Container",
    description: "Maximum size vessel that can transit the original Panama Canal locks. These vessels are workhorses of global trade, carrying grains, coal, and containers across major ocean routes.",
    dwt: "65,000 - 80,000 DWT",
    teu: "4,000 - 5,000 TEU",
    length: "225 - 290m",
    beam: "32.3m (max for canal)",
    draft: "12 - 12.5m",
    speed: "14 - 15 knots",
    crew: "20 - 25",
    buildCost: "$30 - 35 million",
    typicalCargo: ["Grain", "Coal", "Containers", "Minerals"],
    keyRoutes: ["US Gulf to Asia", "US East Coast to Asia via Panama", "South America to Europe"],
    imageUrl: "/images/vessels/tanker-at-sea.jpg",
    sideViewUrl: "/images/vessels/cargo-sunset.jpg",
    aerialViewUrl: "/images/vessels/cargo-topdown.jpg",
    facts: [
      "Beam limited to 32.31m to fit Panama Canal locks",
      "Most common vessel for grain transport",
      "~2,500 Panamax bulk carriers currently in service"
    ]
  },
  {
    name: "New Panamax / Neopanamax",
    category: "Container Ship",
    description: "Designed to fit through the expanded Panama Canal locks (opened 2016). Significantly larger than traditional Panamax, these container ships dominate Trans-Pacific and Asia-Europe routes.",
    dwt: "120,000 - 145,000 DWT",
    teu: "12,000 - 14,500 TEU",
    length: "330 - 366m",
    beam: "49 - 51.25m",
    draft: "15 - 15.2m",
    speed: "22 - 24 knots",
    crew: "22 - 26",
    buildCost: "$100 - 120 million",
    typicalCargo: ["Containers", "Mixed Consumer Goods"],
    keyRoutes: ["Asia to US East Coast via Panama", "Asia to Europe", "Transatlantic"],
    imageUrl: "/images/vessels/container-maersk.jpg",
    sideViewUrl: "/images/vessels/container-ship-2.jpg",
    aerialViewUrl: "/images/vessels/container-aerial-1.jpg",
    facts: [
      "The expanded Panama Canal cost $5.25 billion",
      "Can stack containers 10-wide on deck",
      "The expansion doubled the canal's cargo capacity"
    ]
  },
  {
    name: "Supramax / Ultramax",
    category: "Bulk Carrier",
    description: "Versatile mid-size bulk carriers equipped with their own cargo cranes, allowing them to load and discharge at ports without shore-based cranes. The go-to 'handyman' of the seas.",
    dwt: "50,000 - 65,000 DWT (Supramax) / 60,000 - 65,000 DWT (Ultramax)",
    length: "190 - 200m",
    beam: "32m",
    draft: "11 - 13m",
    speed: "14 - 14.5 knots",
    crew: "20 - 25",
    buildCost: "$28 - 33 million",
    typicalCargo: ["Grain", "Sugar", "Cement", "Fertilizer", "Steel Products", "Logs"],
    keyRoutes: ["Intra-Asia", "Indian Ocean", "Africa to Asia", "South America coastal"],
    imageUrl: "/images/vessels/cargo-aerial-2.jpg",
    sideViewUrl: "/images/vessels/cargo-ship-aerial.jpg",
    aerialViewUrl: "/images/vessels/cargo-dock-aerial.jpg",
    facts: [
      "Self-geared with 4 cranes (30-35 tonnes capacity)",
      "Most versatile bulk carrier class",
      "Can access most ports worldwide including smaller ones"
    ]
  },
  {
    name: "Handysize",
    category: "Bulk Carrier",
    description: "The smallest common bulk carrier class. Their small size allows access to shallow-draft ports and minor harbors. Often self-geared, making them extremely flexible for developing regions.",
    dwt: "15,000 - 40,000 DWT",
    length: "150 - 180m",
    beam: "25 - 28m",
    draft: "9 - 10m",
    speed: "12 - 14 knots",
    crew: "18 - 22",
    buildCost: "$22 - 27 million",
    typicalCargo: ["Steel Products", "Forest Products", "Fertilizer", "Grain", "Scrap Metal"],
    keyRoutes: ["Mediterranean", "Black Sea", "Southeast Asia coastal", "West Africa"],
    imageUrl: "/images/vessels/industrial-ship-sea.jpg",
    sideViewUrl: "/images/vessels/cargo-sunset.jpg",
    aerialViewUrl: "/images/vessels/cargo-ship-aerial.jpg",
    facts: [
      "Most numerous class of bulk carriers",
      "Can access ports larger vessels cannot reach",
      "Often used in developing country trade routes"
    ]
  },
  {
    name: "VLCC (Very Large Crude Carrier)",
    category: "Oil Tanker",
    description: "One of the largest tanker classes, VLCCs are the backbone of global crude oil transportation. They carry approximately 2 million barrels of oil per voyage, primarily from the Middle East.",
    dwt: "200,000 - 320,000 DWT",
    length: "300 - 340m",
    beam: "55 - 60m",
    draft: "20 - 22m",
    speed: "15 - 16 knots",
    crew: "25 - 30",
    buildCost: "$90 - 120 million",
    typicalCargo: ["Crude Oil"],
    keyRoutes: ["Middle East to Asia", "Middle East to Europe", "West Africa to Asia"],
    imageUrl: "/images/vessels/oil-tanker-1.jpg",
    sideViewUrl: "/images/vessels/tanker-sailing.jpg",
    aerialViewUrl: "/images/vessels/ship-aerial-water.jpg",
    facts: [
      "Carries ~2 million barrels of crude oil",
      "Length of 3 football fields",
      "Takes 2+ miles to come to a full stop"
    ]
  },
  {
    name: "ULCC (Ultra Large Crude Carrier)",
    category: "Oil Tanker",
    description: "The largest tankers ever built, ULCCs can carry over 320,000 DWT of crude oil. Few remain in active service today due to port draft restrictions and operational challenges.",
    dwt: "320,000 - 550,000 DWT",
    length: "340 - 415m",
    beam: "60 - 70m",
    draft: "22 - 24.5m",
    speed: "14 - 15 knots",
    crew: "30 - 35",
    buildCost: "$120 - 150 million",
    typicalCargo: ["Crude Oil"],
    keyRoutes: ["Middle East to Asia (deep water ports only)"],
    imageUrl: "/images/vessels/oil-tanker-2.jpg",
    sideViewUrl: "/images/vessels/oil-tanker-1.jpg",
    aerialViewUrl: "/images/vessels/cargo-dock-view.jpg",
    facts: [
      "The TI class were the largest tankers ever at 441m",
      "Can carry 3+ million barrels of crude oil",
      "Very few ports can accommodate these giants"
    ]
  },
  {
    name: "Suezmax",
    category: "Oil Tanker",
    description: "Maximum-size tanker that can transit the Suez Canal fully laden. Named after the canal, they are the second-largest common tanker class and vital for oil trade between the Middle East, Europe, and the US.",
    dwt: "120,000 - 200,000 DWT",
    length: "250 - 300m",
    beam: "44 - 50m",
    draft: "16 - 17m",
    speed: "15 - 16 knots",
    crew: "22 - 28",
    buildCost: "$60 - 75 million",
    typicalCargo: ["Crude Oil", "Fuel Oil"],
    keyRoutes: ["West Africa to Europe", "Middle East to Mediterranean", "Black Sea to Asia"],
    imageUrl: "/images/vessels/cargo-dock-view.jpg",
    sideViewUrl: "/images/vessels/oil-tanker-2.jpg",
    aerialViewUrl: "/images/vessels/ship-aerial-water.jpg",
    facts: [
      "Can carry approximately 1 million barrels of oil",
      "Named after the Suez Canal draft restrictions",
      "Popular for transatlantic oil trade"
    ]
  },
  {
    name: "Aframax",
    category: "Oil Tanker",
    description: "Medium-sized tankers named after the Average Freight Rate Assessment (AFRA) system. Flexible enough to access most ports, they handle regional oil transport and shorter trade routes.",
    dwt: "80,000 - 120,000 DWT",
    length: "230 - 250m",
    beam: "40 - 44m",
    draft: "14 - 15m",
    speed: "15 knots",
    crew: "22 - 25",
    buildCost: "$50 - 60 million",
    typicalCargo: ["Crude Oil", "Refined Products"],
    keyRoutes: ["North Sea to Europe", "Caribbean", "Mediterranean", "Southeast Asia"],
    imageUrl: "/images/vessels/tanker-sailing.jpg",
    sideViewUrl: "/images/vessels/oil-tanker-1.jpg",
    aerialViewUrl: "/images/vessels/cargo-dock-view.jpg",
    facts: [
      "Most common tanker size in the world",
      "AFRA stands for Average Freight Rate Assessment",
      "Can access virtually all major oil terminals"
    ]
  },
  {
    name: "LNG Carrier",
    category: "Gas Tanker",
    description: "Highly specialized vessels that transport liquefied natural gas at -162°C. Among the most expensive and technologically complex ships, with advanced containment systems (Membrane or Moss-type spherical tanks).",
    dwt: "70,000 - 90,000 DWT",
    length: "280 - 345m",
    beam: "43 - 55m",
    draft: "11 - 12m",
    speed: "19 - 21 knots",
    crew: "25 - 30",
    buildCost: "$180 - 250 million",
    typicalCargo: ["Liquefied Natural Gas (LNG)"],
    keyRoutes: ["Qatar to Asia", "US Gulf to Europe", "Australia to Japan/Korea", "Nigeria to Europe"],
    imageUrl: "/images/vessels/ship-aerial-water.jpg",
    sideViewUrl: "/images/vessels/tanker-sailing.jpg",
    aerialViewUrl: "/images/vessels/cargo-tug-aerial.jpg",
    facts: [
      "Cargo is cooled to -162°C (-260°F)",
      "Modern Q-Flex/Q-Max carry 210,000-266,000 m³",
      "Most expensive commercial vessels to build",
      "Can use boil-off gas as fuel"
    ]
  },
  {
    name: "Ultra Large Container Vessel (ULCV)",
    category: "Container Ship",
    description: "The titans of container shipping, ULCVs can carry over 20,000 TEU. Operated by the largest shipping lines on Asia-Europe routes, they achieve unmatched economies of scale.",
    dwt: "190,000 - 230,000 DWT",
    teu: "20,000 - 24,000+ TEU",
    length: "380 - 400m",
    beam: "58 - 62m",
    draft: "16 - 17m",
    speed: "22 - 25 knots",
    crew: "22 - 26",
    buildCost: "$150 - 200 million",
    typicalCargo: ["Containers", "Consumer Goods", "Electronics", "Auto Parts"],
    keyRoutes: ["Asia to North Europe", "Asia to Mediterranean"],
    imageUrl: "/images/vessels/container-ship-1.jpg",
    sideViewUrl: "/images/vessels/container-rotterdam.jpg",
    aerialViewUrl: "/images/vessels/cargo-loaded-above.jpg",
    facts: [
      "The Ever Alot holds the record at 24,004 TEU",
      "If all containers were placed end-to-end, they'd stretch 144km",
      "Engine can produce 80,000+ horsepower"
    ]
  },
  {
    name: "Ro-Ro / Car Carrier (PCTC)",
    category: "Vehicle Carrier",
    description: "Roll-on/Roll-off vessels designed to transport wheeled cargo that is driven on and off the ship. Pure Car and Truck Carriers (PCTCs) have up to 13 internal decks for vehicles.",
    dwt: "15,000 - 30,000 DWT",
    length: "180 - 230m",
    beam: "32m",
    draft: "10 - 11m",
    speed: "18 - 20 knots",
    crew: "20 - 25",
    buildCost: "$60 - 80 million",
    typicalCargo: ["Automobiles", "Trucks", "Heavy Machinery", "Rolling Stock"],
    keyRoutes: ["Japan/Korea to Europe", "Japan/Korea to US", "Europe to Africa", "Germany to US"],
    imageUrl: "/images/vessels/bulk-harbor.jpg",
    sideViewUrl: "/images/vessels/container-drone.jpg",
    aerialViewUrl: "/images/vessels/container-port-deck.jpg",
    facts: [
      "A large PCTC can carry 7,000+ vehicles",
      "Vehicles are driven onboard by specialist crews",
      "Internal ramps connect up to 13 decks"
    ]
  }
];

// --- FLEET CATEGORIES ---
export interface FleetCategory {
  name: string;
  description: string;
  fleetSize: number;
  totalDWT: string;
  avgAge: number;
  marketShare: string;
  icon: string;
  subTypes: string[];
  keyFacts: string[];
}

export const fleetCategories: FleetCategory[] = [
  {
    name: "Bulk Carriers",
    description: "Transport unpackaged bulk commodities like iron ore, coal, grain, and bauxite in large cargo holds.",
    fleetSize: 12800,
    totalDWT: "960 million DWT",
    avgAge: 11.2,
    marketShare: "42%",
    icon: "box",
    subTypes: ["Capesize", "Panamax", "Supramax/Ultramax", "Handysize", "Handymax"],
    keyFacts: [
      "Largest segment of world merchant fleet by DWT",
      "Iron ore and coal account for ~60% of all dry bulk trade",
      "China imports ~70% of global seaborne iron ore"
    ]
  },
  {
    name: "Oil Tankers",
    description: "Transport crude oil and refined petroleum products. Double-hulled by regulation since 2010 for environmental safety.",
    fleetSize: 8500,
    totalDWT: "620 million DWT",
    avgAge: 11.8,
    marketShare: "29%",
    icon: "droplet",
    subTypes: ["ULCC", "VLCC", "Suezmax", "Aframax", "Panamax", "Product Tankers"],
    keyFacts: [
      "~60% of global oil is transported by sea",
      "VLCC is the most common large tanker class",
      "Tanker rates are highly cyclical and volatile"
    ]
  },
  {
    name: "Container Ships",
    description: "Carry intermodal containers (TEU) in a cellular structure. The backbone of global consumer trade.",
    fleetSize: 5600,
    totalDWT: "310 million DWT",
    avgAge: 13.5,
    marketShare: "13%",
    icon: "container",
    subTypes: ["ULCV (20,000+ TEU)", "New Panamax (12-14,500 TEU)", "Panamax (4-5,000 TEU)", "Feeder (1-3,000 TEU)"],
    keyFacts: [
      "~90% of non-bulk goods travel in containers",
      "Top 10 carriers control ~85% of capacity",
      "Average container makes 5-6 trips per year"
    ]
  },
  {
    name: "LNG Carriers",
    description: "Specialized double-hulled vessels with cryogenic containment systems to transport liquefied natural gas at -162°C.",
    fleetSize: 700,
    totalDWT: "55 million DWT",
    avgAge: 9.5,
    marketShare: "3%",
    icon: "flame",
    subTypes: ["Q-Max (266,000 m³)", "Q-Flex (210,000 m³)", "Conventional (145-175,000 m³)", "Small-Scale LNG"],
    keyFacts: [
      "Fleet growing at ~8% annually driven by energy transition",
      "Most expensive commercial vessels to build ($180-250M)",
      "Qatar and Australia are top LNG exporters"
    ]
  },
  {
    name: "Chemical Tankers",
    description: "Transport liquid chemicals in specialized coated or stainless steel tanks. Carry hundreds of different cargo types.",
    fleetSize: 5400,
    totalDWT: "55 million DWT",
    avgAge: 12.1,
    marketShare: "4%",
    icon: "flask",
    subTypes: ["Stainless Steel", "Coated (Epoxy/Zinc)", "Parcel Tankers"],
    keyFacts: [
      "Can carry multiple cargo types simultaneously",
      "Highly regulated due to hazardous cargo",
      "Growing demand from petrochemical industry"
    ]
  },
  {
    name: "Vehicle Carriers (Ro-Ro/PCTC)",
    description: "Roll-on/Roll-off vessels with internal ramps and multiple car decks for wheeled cargo transport.",
    fleetSize: 850,
    totalDWT: "15 million DWT",
    avgAge: 14.2,
    marketShare: "2%",
    icon: "car",
    subTypes: ["PCTC (Pure Car Truck Carrier)", "PCC (Pure Car Carrier)", "Ro-Ro Cargo"],
    keyFacts: [
      "Demand driven by global auto production (~80M vehicles/year)",
      "Japan, South Korea, and Germany are top exporters",
      "Fleet shortage has driven record newbuilding orders"
    ]
  },
  {
    name: "General Cargo / Multi-Purpose",
    description: "Versatile vessels with their own cargo gear, capable of carrying breakbulk, project cargo, and containers.",
    fleetSize: 15000,
    totalDWT: "80 million DWT",
    avgAge: 18.5,
    marketShare: "5%",
    icon: "package",
    subTypes: ["Multi-Purpose", "Heavy Lift", "Breakbulk", "Tweendecker"],
    keyFacts: [
      "Oldest average age of any fleet segment",
      "Essential for project cargo and wind turbine components",
      "Declining as containerization increases"
    ]
  },
  {
    name: "Offshore Vessels",
    description: "Specialized fleet supporting oil & gas exploration, wind farm installation, and subsea operations.",
    fleetSize: 7500,
    totalDWT: "20 million DWT",
    avgAge: 15.0,
    marketShare: "2%",
    icon: "anchor",
    subTypes: ["PSV (Platform Supply)", "AHTS (Anchor Handling)", "FPSO", "Jack-up", "Wind Installation"],
    keyFacts: [
      "Rapidly pivoting to offshore wind support",
      "FPSOs can cost $2-4 billion each",
      "Growing demand from renewable energy sector"
    ]
  }
];

// --- MAJOR PORTS ---
export interface Port {
  name: string;
  country: string;
  region: string;
  volumeTEU: string;
  volumeTons: string;
  rank: number;
  type: string;
  description: string;
  keyTrades: string[];
  lat: number;
  lng: number;
}

export const majorPorts: Port[] = [
  { name: "Shanghai", country: "China", region: "East Asia", volumeTEU: "49.7M TEU", volumeTons: "776M tonnes", rank: 1, type: "Container & Bulk", description: "World's busiest container port since 2010. Gateway to the Yangtze River economic zone.", keyTrades: ["Electronics", "Machinery", "Textiles", "Auto Parts"], lat: 31.23, lng: 121.47 },
  { name: "Singapore", country: "Singapore", region: "Southeast Asia", volumeTEU: "39.0M TEU", volumeTons: "590M tonnes", rank: 2, type: "Container & Transshipment", description: "World's premier transshipment hub at the crossroads of East-West trade. Handles over 130,000 vessel calls per year.", keyTrades: ["Transshipment", "Oil & Petroleum", "Electronics", "Chemicals"], lat: 1.26, lng: 103.84 },
  { name: "Ningbo-Zhoushan", country: "China", region: "East Asia", volumeTEU: "35.3M TEU", volumeTons: "1,260M tonnes", rank: 3, type: "Container & Bulk", description: "World's largest port by cargo tonnage. Handles massive volumes of iron ore, crude oil, and containers.", keyTrades: ["Iron Ore", "Crude Oil", "Containers", "Coal"], lat: 29.87, lng: 121.55 },
  { name: "Shenzhen", country: "China", region: "East Asia", volumeTEU: "30.2M TEU", volumeTons: "280M tonnes", rank: 4, type: "Container", description: "Key port of South China's manufacturing hub. Major gateway for electronics and consumer goods exports.", keyTrades: ["Electronics", "Consumer Goods", "Components"], lat: 22.54, lng: 114.06 },
  { name: "Guangzhou", country: "China", region: "East Asia", volumeTEU: "25.2M TEU", volumeTons: "650M tonnes", rank: 5, type: "Container & Bulk", description: "Located on the Pearl River Delta. One of China's oldest ports with over 2,000 years of trading history.", keyTrades: ["Automobiles", "Machinery", "Raw Materials", "Containers"], lat: 23.13, lng: 113.27 },
  { name: "Busan", country: "South Korea", region: "East Asia", volumeTEU: "22.7M TEU", volumeTons: "450M tonnes", rank: 6, type: "Container & Transshipment", description: "South Korea's largest port and Northeast Asia's transshipment hub.", keyTrades: ["Automobiles", "Electronics", "Transshipment", "Petrochemicals"], lat: 35.10, lng: 129.04 },
  { name: "Qingdao", country: "China", region: "East Asia", volumeTEU: "27.0M TEU", volumeTons: "650M tonnes", rank: 7, type: "Container & Bulk", description: "Major iron ore and crude oil import terminal. Automated container terminal at Qianwan.", keyTrades: ["Iron Ore", "Crude Oil", "Containers", "Rubber"], lat: 36.07, lng: 120.38 },
  { name: "Hong Kong", country: "China SAR", region: "East Asia", volumeTEU: "16.2M TEU", volumeTons: "250M tonnes", rank: 8, type: "Container", description: "Historic free port and major container hub of the Pearl River Delta. Gateway to southern China.", keyTrades: ["Transshipment", "Consumer Goods", "Textiles"], lat: 22.29, lng: 114.17 },
  { name: "Rotterdam", country: "Netherlands", region: "Europe", volumeTEU: "14.5M TEU", volumeTons: "470M tonnes", rank: 9, type: "Full Service", description: "Europe's largest port and the gateway to the EU. Major oil refining and petrochemical hub.", keyTrades: ["Crude Oil", "Petroleum Products", "Containers", "Iron Ore", "Coal"], lat: 51.90, lng: 4.50 },
  { name: "Dubai / Jebel Ali", country: "UAE", region: "Middle East", volumeTEU: "14.0M TEU", volumeTons: "180M tonnes", rank: 10, type: "Container & Transshipment", description: "Middle East's largest container port. Key transshipment hub connecting Asia, Africa, and Europe.", keyTrades: ["Transshipment", "Oil", "Consumer Goods", "Construction Materials"], lat: 25.0, lng: 55.06 },
  { name: "Port Hedland", country: "Australia", region: "Oceania", volumeTEU: "N/A", volumeTons: "580M tonnes", rank: 11, type: "Bulk Export", description: "World's largest bulk export port. Almost exclusively handles iron ore exports to Asia.", keyTrades: ["Iron Ore"], lat: -20.31, lng: 118.58 },
  { name: "Antwerp-Bruges", country: "Belgium", region: "Europe", volumeTEU: "13.5M TEU", volumeTons: "290M tonnes", rank: 12, type: "Full Service", description: "Europe's second-largest port. Major chemicals hub and deep-sea access via the Scheldt estuary.", keyTrades: ["Chemicals", "Containers", "Vehicles", "Petroleum"], lat: 51.23, lng: 4.40 },
  { name: "Fujairah", country: "UAE", region: "Middle East", volumeTEU: "N/A", volumeTons: "190M tonnes", rank: 13, type: "Oil & Bunkering", description: "World's second-largest bunkering hub. Strategic location outside the Strait of Hormuz.", keyTrades: ["Bunker Fuel", "Crude Oil", "Refined Products"], lat: 25.12, lng: 56.33 },
  { name: "Santos", country: "Brazil", region: "South America", volumeTEU: "5.2M TEU", volumeTons: "155M tonnes", rank: 14, type: "Full Service", description: "Latin America's largest port. Major exporter of soybeans, sugar, coffee, and iron ore.", keyTrades: ["Soybeans", "Sugar", "Iron Ore", "Coffee", "Containers"], lat: -23.96, lng: -46.31 },
  { name: "Houston", country: "USA", region: "North America", volumeTEU: "4.1M TEU", volumeTons: "280M tonnes", rank: 15, type: "Full Service", description: "America's largest port by tonnage. Center of US petrochemical industry and major crude oil export hub.", keyTrades: ["Crude Oil", "Petroleum Products", "Chemicals", "LNG"], lat: 29.76, lng: -95.36 },
];

// --- SHIPPING ROUTES ---
export interface ShippingRoute {
  name: string;
  from: string;
  to: string;
  distance: string;
  transitTime: string;
  cargoType: string;
  volume: string;
  description: string;
  chokePoints: string[];
}

export const shippingRoutes: ShippingRoute[] = [
  { name: "Asia - North Europe", from: "Shanghai/Singapore", to: "Rotterdam/Hamburg", distance: "10,500 nm", transitTime: "28-35 days", cargoType: "Containers", volume: "25M TEU/year", description: "The world's busiest container trade lane. Dominated by mega-vessels (18,000+ TEU) operated by major alliances.", chokePoints: ["Strait of Malacca", "Suez Canal", "Strait of Gibraltar"] },
  { name: "Transpacific (Asia - US West Coast)", from: "Shanghai/Busan", to: "Los Angeles/Long Beach", distance: "6,500 nm", transitTime: "12-16 days", cargoType: "Containers", volume: "22M TEU/year", description: "The second-busiest trade lane. Critical for US consumer goods imports from Asia.", chokePoints: ["Open Pacific"] },
  { name: "Brazil - China Iron Ore", from: "Tubarão/Santos", to: "Qingdao/Ningbo", distance: "11,500 nm", transitTime: "35-42 days", cargoType: "Iron Ore (Bulk)", volume: "350M tonnes/year", description: "The longest major dry bulk route. Dominated by Capesize and Valemax vessels carrying Brazilian iron ore.", chokePoints: ["Cape of Good Hope"] },
  { name: "Australia - China Iron Ore", from: "Port Hedland/Dampier", to: "Qingdao/Ningbo", distance: "3,800 nm", transitTime: "10-14 days", cargoType: "Iron Ore (Bulk)", volume: "800M tonnes/year", description: "The largest single commodity trade route by volume. Australia supplies ~60% of China's iron ore imports.", chokePoints: ["Indonesian Straits"] },
  { name: "Middle East - Asia Crude Oil", from: "Ras Tanura/Fujairah", to: "Ningbo/Ulsan", distance: "6,500 nm", transitTime: "18-22 days", cargoType: "Crude Oil", volume: "900M tonnes/year", description: "The dominant crude oil trade route. VLCCs carry Saudi, Iraqi, and Emirati oil to Asian refineries.", chokePoints: ["Strait of Hormuz", "Strait of Malacca"] },
  { name: "US Gulf - Europe LNG", from: "Sabine Pass/Corpus Christi", to: "Gate/Zeebrugge", distance: "5,000 nm", transitTime: "10-14 days", cargoType: "LNG", volume: "85M tonnes/year", description: "Rapidly growing route as US shale gas exports to energy-hungry Europe. Surged post-2022.", chokePoints: ["Strait of Gibraltar"] },
  { name: "Qatar - Asia LNG", from: "Ras Laffan", to: "Incheon/Sodegaura", distance: "6,800 nm", transitTime: "16-20 days", cargoType: "LNG", volume: "80M tonnes/year", description: "Qatar's massive North Field supplies LNG to Japan, South Korea, and China on long-term contracts.", chokePoints: ["Strait of Hormuz", "Strait of Malacca"] },
  { name: "Transatlantic (Europe - US East Coast)", from: "Rotterdam/Antwerp", to: "New York/Savannah", distance: "3,500 nm", transitTime: "9-12 days", cargoType: "Containers", volume: "8M TEU/year", description: "Established trade route carrying European and US consumer goods, machinery, and chemicals.", chokePoints: ["English Channel"] },
  { name: "US Gulf - Asia Grain", from: "New Orleans/Houston", to: "Shanghai/Tokyo", distance: "9,500 nm", transitTime: "25-30 days", cargoType: "Grain (Bulk)", volume: "120M tonnes/year", description: "Major agricultural trade route carrying US corn, soybeans, and wheat to Asian markets.", chokePoints: ["Panama Canal"] },
  { name: "West Africa - Europe Crude Oil", from: "Bonny/Escravos", to: "Rotterdam/Marseille", distance: "4,500 nm", transitTime: "12-16 days", cargoType: "Crude Oil", volume: "150M tonnes/year", description: "Nigerian and Angolan light sweet crude bound for European refineries. Suezmax and Aframax dominated.", chokePoints: ["Strait of Gibraltar"] },
];

// --- FREIGHT RATES ---
export interface FreightRate {
  vessel: string;
  route: string;
  currentRate: string;
  unit: string;
  yearAgoRate: string;
  fiveYearAvg: string;
  trend: "up" | "down" | "stable";
  percentChange: string;
}

export const freightRates: FreightRate[] = [
  { vessel: "Capesize", route: "Brazil-China", currentRate: "$25,500", unit: "/day", yearAgoRate: "$12,000", fiveYearAvg: "$17,000", trend: "up", percentChange: "+112.5%" },
  { vessel: "Capesize", route: "Tubarao-Qingdao", currentRate: "$25.00", unit: "/tonne", yearAgoRate: "$17.40", fiveYearAvg: "$21.00", trend: "up", percentChange: "+43.7%" },
  { vessel: "Panamax", route: "US Gulf-Japan", currentRate: "$16,800", unit: "/day", yearAgoRate: "$10,200", fiveYearAvg: "$13,000", trend: "up", percentChange: "+64.7%" },
  { vessel: "Supramax", route: "SE Asia RV", currentRate: "$12,500", unit: "/day", yearAgoRate: "$8,600", fiveYearAvg: "$10,800", trend: "up", percentChange: "+45.3%" },
  { vessel: "Handysize", route: "ECSA-Continent", currentRate: "$13,000", unit: "/day", yearAgoRate: "$9,900", fiveYearAvg: "$10,500", trend: "up", percentChange: "+31.3%" },
  { vessel: "VLCC", route: "MEG-China", currentRate: "$42,000", unit: "/day", yearAgoRate: "$55,000", fiveYearAvg: "$38,000", trend: "down", percentChange: "-23.6%" },
  { vessel: "Suezmax", route: "WAF-UKC", currentRate: "$35,000", unit: "/day", yearAgoRate: "$45,000", fiveYearAvg: "$30,000", trend: "down", percentChange: "-22.2%" },
  { vessel: "Aframax", route: "Cross-Med", currentRate: "$28,000", unit: "/day", yearAgoRate: "$38,000", fiveYearAvg: "$25,000", trend: "down", percentChange: "-26.3%" },
  { vessel: "Container (SCFI)", route: "Shanghai-Europe", currentRate: "$2,150", unit: "/TEU", yearAgoRate: "$1,850", fiveYearAvg: "$2,800", trend: "up", percentChange: "+16.2%" },
  { vessel: "Container (SCFI)", route: "Shanghai-USWC", currentRate: "$2,800", unit: "/FEU", yearAgoRate: "$2,400", fiveYearAvg: "$3,200", trend: "up", percentChange: "+16.7%" },
  { vessel: "LNG Spot", route: "Atlantic", currentRate: "$55,000", unit: "/day", yearAgoRate: "$75,000", fiveYearAvg: "$65,000", trend: "down", percentChange: "-26.7%" },
  { vessel: "LNG Spot", route: "Pacific", currentRate: "$62,000", unit: "/day", yearAgoRate: "$80,000", fiveYearAvg: "$70,000", trend: "down", percentChange: "-22.5%" },
];

// --- COMMODITY VOLUMES ---
export interface CommodityVolume {
  commodity: string;
  annualVolume: string;
  volumeNumber: number;
  unit: string;
  vesselType: string;
  topExporters: string[];
  topImporters: string[];
  growth: string;
}

export const commodityVolumes: CommodityVolume[] = [
  { commodity: "Crude Oil", annualVolume: "2,000", volumeNumber: 2000, unit: "M tonnes", vesselType: "VLCC / Suezmax / Aframax", topExporters: ["Saudi Arabia", "Russia", "Iraq", "USA", "UAE"], topImporters: ["China", "India", "Japan", "South Korea", "Europe"], growth: "+1.2%" },
  { commodity: "Iron Ore", annualVolume: "1,550", volumeNumber: 1550, unit: "M tonnes", vesselType: "Capesize / Valemax", topExporters: ["Australia", "Brazil", "South Africa", "India"], topImporters: ["China", "Japan", "South Korea", "Europe"], growth: "+0.8%" },
  { commodity: "Coal", annualVolume: "1,250", volumeNumber: 1250, unit: "M tonnes", vesselType: "Capesize / Panamax", topExporters: ["Indonesia", "Australia", "Russia", "South Africa", "Colombia"], topImporters: ["China", "India", "Japan", "South Korea", "Vietnam"], growth: "-1.5%" },
  { commodity: "LNG", annualVolume: "420", volumeNumber: 420, unit: "M tonnes", vesselType: "LNG Carrier", topExporters: ["Qatar", "Australia", "USA", "Russia", "Malaysia"], topImporters: ["China", "Japan", "South Korea", "India", "Europe"], growth: "+7.5%" },
  { commodity: "Grain & Soybeans", annualVolume: "580", volumeNumber: 580, unit: "M tonnes", vesselType: "Panamax / Supramax", topExporters: ["USA", "Brazil", "Argentina", "Ukraine", "Canada"], topImporters: ["China", "EU", "Japan", "Mexico", "Egypt"], growth: "+2.1%" },
  { commodity: "Containers", annualVolume: "210", volumeNumber: 210, unit: "M TEU", vesselType: "Container Ships", topExporters: ["China", "South Korea", "Japan", "Germany", "USA"], topImporters: ["USA", "Europe", "Japan", "Southeast Asia"], growth: "+3.5%" },
  { commodity: "Petroleum Products", annualVolume: "1,100", volumeNumber: 1100, unit: "M tonnes", vesselType: "Product Tanker / Aframax", topExporters: ["USA", "Russia", "India", "South Korea", "Saudi Arabia"], topImporters: ["Europe", "Africa", "Southeast Asia", "Latin America"], growth: "+2.0%" },
  { commodity: "Chemicals", annualVolume: "350", volumeNumber: 350, unit: "M tonnes", vesselType: "Chemical Tanker", topExporters: ["Saudi Arabia", "USA", "South Korea", "China", "Netherlands"], topImporters: ["China", "India", "Southeast Asia", "Europe"], growth: "+3.8%" },
  { commodity: "LPG", annualVolume: "130", volumeNumber: 130, unit: "M tonnes", vesselType: "VLGC / LPG Carrier", topExporters: ["USA", "Qatar", "Saudi Arabia", "UAE"], topImporters: ["China", "Japan", "India", "South Korea"], growth: "+4.2%" },
  { commodity: "Vehicles", annualVolume: "25", volumeNumber: 25, unit: "M units", vesselType: "PCTC / Ro-Ro", topExporters: ["Japan", "South Korea", "Germany", "China", "USA"], topImporters: ["USA", "Europe", "Africa", "Middle East", "Australia"], growth: "+5.0%" },
];

// --- SHIPBUILDING ---
export interface ShipbuildingCountry {
  country: string;
  marketShareGT: number;
  marketShareOrders: number;
  keyYards: string[];
  specialization: string[];
  orderbook: string;
  activeYards: number;
}

export const shipbuildingCountries: ShipbuildingCountry[] = [
  { country: "China", marketShareGT: 49.2, marketShareOrders: 55.3, keyYards: ["CSSC", "Yangzijiang", "New Times Shipbuilding", "Dalian Shipbuilding"], specialization: ["Bulk Carriers", "Container Ships", "Tankers", "LNG Carriers"], orderbook: "3,200+ vessels", activeYards: 45 },
  { country: "South Korea", marketShareGT: 28.5, marketShareOrders: 25.8, keyYards: ["HD Hyundai Heavy Industries", "Samsung Heavy Industries", "Hanwha Ocean (Daewoo)"], specialization: ["LNG Carriers", "Ultra-Large Container Ships", "VLCCs", "Offshore"], orderbook: "680+ vessels", activeYards: 7 },
  { country: "Japan", marketShareGT: 16.8, marketShareOrders: 14.2, keyYards: ["Imabari Shipbuilding", "Japan Marine United", "Oshima Shipbuilding", "Tsuneishi"], specialization: ["Bulk Carriers", "Car Carriers", "Chemical Tankers"], orderbook: "480+ vessels", activeYards: 25 },
  { country: "Italy", marketShareGT: 1.5, marketShareOrders: 1.8, keyYards: ["Fincantieri"], specialization: ["Cruise Ships", "Naval Vessels", "Mega Yachts"], orderbook: "85+ vessels", activeYards: 8 },
  { country: "Germany", marketShareGT: 0.8, marketShareOrders: 0.6, keyYards: ["Meyer Werft", "ThyssenKrupp Marine Systems"], specialization: ["Cruise Ships", "Naval Submarines", "RoRo Ferries"], orderbook: "25+ vessels", activeYards: 4 },
  { country: "Others", marketShareGT: 3.2, marketShareOrders: 2.3, keyYards: ["Turkey", "Vietnam", "Philippines", "India", "Bangladesh"], specialization: ["Small Vessels", "Chemical Tankers", "Offshore Support"], orderbook: "800+ vessels", activeYards: 100 },
];

// --- SHIP BREAKING ---
export interface ShipBreakingCountry {
  country: string;
  marketShareLDT: number;
  annualCapacity: string;
  method: string;
  regulations: string;
  keyYards: string[];
  controversies: string;
}

export const shipBreakingCountries: ShipBreakingCountry[] = [
  { country: "Bangladesh (Chittagong)", marketShareLDT: 35, annualCapacity: "7M LDT", method: "Beaching", regulations: "Basel Convention signatory, Hong Kong Convention not yet", keyYards: ["PHP Ship Breaking", "Ziri Subedar", "Kabir Steel"], controversies: "Worker safety concerns, environmental pollution, improving through HKC compliance" },
  { country: "India (Alang)", marketShareLDT: 30, annualCapacity: "6M LDT", method: "Beaching (improving to landing)", regulations: "Hong Kong Convention ratified 2023", keyYards: ["Shree Ram Group", "Priya Blue Industries", "Leela Ship Recycling"], controversies: "Largest yard in the world at Alang-Sosiya. Significant improvements in safety standards" },
  { country: "Pakistan (Gadani)", marketShareLDT: 12, annualCapacity: "2.5M LDT", method: "Beaching", regulations: "Limited regulatory framework", keyYards: ["Gadani Ship Breaking Yard"], controversies: "Safety and environmental challenges. Lower capacity than peers" },
  { country: "Turkey (Aliaga)", marketShareLDT: 15, annualCapacity: "3M LDT", method: "Pier/Landing", regulations: "EU Ship Recycling Regulation compliant", keyYards: ["Isiksan", "Simsekler", "Leyal Ship Recycling"], controversies: "Highest environmental and safety standards among major recyclers. EU-approved facility" },
  { country: "China", marketShareLDT: 5, annualCapacity: "1M LDT", method: "Drydock/Pier", regulations: "Hong Kong Convention ratified", keyYards: ["Jiangyin Changjiang", "Zhoushan Changhong"], controversies: "Mostly processes domestic fleet. Strict environmental controls" },
  { country: "Others (EU/Misc)", marketShareLDT: 3, annualCapacity: "0.5M LDT", method: "Drydock", regulations: "Full EU/IMO compliance", keyYards: ["Able UK", "Galloo (Belgium)", "Scheepssloperij Nederland"], controversies: "Highest standards but limited capacity and higher costs" },
];

// --- MARKET DATA ---
export interface ShippingCompany {
  name: string;
  ticker: string;
  marketCap: string;
  fleet: string;
  headquarters: string;
  segment: string;
  revenue: string;
}

export const majorCompanies: ShippingCompany[] = [
  { name: "MSC (Mediterranean Shipping Co.)", ticker: "Private", marketCap: "~$80B (est.)", fleet: "800+ vessels", headquarters: "Geneva, Switzerland", segment: "Container", revenue: "$70B+" },
  { name: "CMA CGM", ticker: "Private", marketCap: "~$45B (est.)", fleet: "600+ vessels", headquarters: "Marseille, France", segment: "Container / Logistics", revenue: "$47B" },
  { name: "Hapag-Lloyd", ticker: "HLAG.DE", marketCap: "$32B", fleet: "260+ vessels", headquarters: "Hamburg, Germany", segment: "Container", revenue: "$36B" },
  { name: "A.P. Moller-Maersk", ticker: "MAERSK-B.CO", marketCap: "$26B", fleet: "700+ vessels", headquarters: "Copenhagen, Denmark", segment: "Container / Logistics", revenue: "$51B" },
  { name: "Evergreen Marine", ticker: "2603.TW", marketCap: "$22B", fleet: "200+ vessels", headquarters: "Taipei, Taiwan", segment: "Container", revenue: "$18B" },
  { name: "COSCO Shipping", ticker: "1919.HK", marketCap: "$18B", fleet: "1,400+ vessels", headquarters: "Shanghai, China", segment: "Container / Bulk / Tanker", revenue: "$38B" },
  { name: "Frontline", ticker: "FRO", marketCap: "$4.5B", fleet: "80+ tankers", headquarters: "Hamilton, Bermuda", segment: "Oil Tanker", revenue: "$2.5B" },
  { name: "Golden Ocean Group", ticker: "GOGL", marketCap: "$3.0B", fleet: "85+ vessels", headquarters: "Hamilton, Bermuda", segment: "Dry Bulk", revenue: "$1.5B" },
  { name: "Star Bulk Carriers", ticker: "SBLK", marketCap: "$2.8B", fleet: "130+ vessels", headquarters: "Athens, Greece", segment: "Dry Bulk", revenue: "$1.8B" },
  { name: "Qatar Energy LNG", ticker: "State-owned", marketCap: "N/A", fleet: "70+ LNG carriers", headquarters: "Doha, Qatar", segment: "LNG", revenue: "$40B+" },
];

// --- INDUSTRY FORECASTS ---
export interface Forecast {
  title: string;
  timeframe: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  confidence: string;
  details: string[];
}

export const industryForecasts: Forecast[] = [
  {
    title: "Global Seaborne Trade Growth",
    timeframe: "2025-2030",
    description: "Global seaborne trade volumes expected to grow at 2.0-2.5% CAGR, driven by emerging market demand and shifting trade patterns.",
    impact: "positive",
    confidence: "High",
    details: [
      "Total seaborne trade projected to reach 13.5 billion tonnes by 2030",
      "Asia-Pacific remains the engine of growth",
      "Nearshoring trends may reshape trade lane dynamics",
      "Africa and South Asia emerging as new demand centers"
    ]
  },
  {
    title: "Decarbonization & Green Shipping",
    timeframe: "2025-2050",
    description: "IMO targets 50% GHG reduction by 2030 (vs 2008) and net-zero by 2050. Massive fleet transformation required with alternative fuels.",
    impact: "neutral",
    confidence: "High",
    details: [
      "LNG as transition fuel (15% of newbuilds now LNG-ready)",
      "Methanol and ammonia gaining traction for deep-sea",
      "Green hydrogen corridors being established",
      "$1-1.5 trillion investment needed for fleet decarbonization",
      "Carbon levy/ETS mechanisms being debated at IMO"
    ]
  },
  {
    title: "Container Shipping Consolidation",
    timeframe: "2025-2028",
    description: "Top 10 carriers control 85%+ of capacity. Further consolidation expected through M&A and alliance restructuring.",
    impact: "neutral",
    confidence: "Medium",
    details: [
      "2M alliance dissolved, new Gemini Cooperation formed",
      "Ocean Alliance renewed through 2032",
      "MSC pursuing independent mega-network strategy",
      "Vertical integration into logistics accelerating"
    ]
  },
  {
    title: "LNG Carrier Fleet Expansion",
    timeframe: "2025-2030",
    description: "LNG fleet to grow 40%+ driven by Qatar North Field expansion, US export projects, and energy security concerns.",
    impact: "positive",
    confidence: "High",
    details: [
      "~300 LNG carriers on order (record orderbook)",
      "Qatar ordering 100+ vessels for North Field East/South",
      "US LNG export capacity to nearly double by 2028",
      "European LNG import terminals tripling post-2022"
    ]
  },
  {
    title: "Dry Bulk Market Outlook",
    timeframe: "2025-2027",
    description: "Moderate growth driven by Indian infrastructure spending and global re-industrialization. China demand plateauing but India filling the gap.",
    impact: "positive",
    confidence: "Medium",
    details: [
      "India steel production growing 6-8% annually",
      "China shifting from quantity to quality in commodity imports",
      "Brazil iron ore production recovering",
      "Capesize fleet growth moderate at 2-3% per year",
      "Minor bulk (bauxite, nickel ore, lithium) demand surging"
    ]
  },
  {
    title: "Tanker Market Cycle",
    timeframe: "2025-2028",
    description: "Tanker market in mid-cycle with aging fleet. Orderbook historically low. Geopolitical disruptions and refinery shifts reshaping trade lanes.",
    impact: "positive",
    confidence: "Medium",
    details: [
      "Average VLCC age approaching 12 years",
      "Tanker orderbook-to-fleet ratio at multi-decade low (~5%)",
      "New Asian mega-refineries increasing long-haul crude demand",
      "Sanctions and geopolitics extending ton-mile demand",
      "VLCC earnings expected to average $40-50k/day through 2027"
    ]
  },
  {
    title: "Autonomous Shipping & Digitalization",
    timeframe: "2025-2035",
    description: "Maritime autonomy progressing from shore-based monitoring to fully autonomous vessels. Digital twins and AI optimizing operations.",
    impact: "positive",
    confidence: "Low",
    details: [
      "MASS (Maritime Autonomous Surface Ships) codes being developed at IMO",
      "Norway leading with autonomous ferry trials",
      "AI-based route optimization saving 5-10% fuel",
      "Digital port operations reducing turnaround times",
      "Full autonomy for deep-sea still decades away"
    ]
  },
  {
    title: "Shipbuilding Supercycle",
    timeframe: "2025-2030",
    description: "Record orderbooks driven by fleet renewal for green compliance. Yard capacity constrained. Newbuild prices at 15-year highs.",
    impact: "positive",
    confidence: "High",
    details: [
      "Global orderbook exceeds 300M DWT",
      "Chinese yards dominate with 55% market share",
      "Delivery slots booked through 2028-2029",
      "Newbuild prices up 30-40% since 2020",
      "South Korean yards focusing on high-value LNG and container orders"
    ]
  },
];

// --- KEY INDUSTRY STATISTICS ---
export const industryStats = {
  totalFleet: "105,500+",
  totalDWT: "2.3 billion DWT",
  seaborneTrade: "12.3 billion tonnes",
  tradeValue: "$14 trillion",
  percentWorldTrade: "90%",
  seafarers: "1.89 million",
  co2Emissions: "2.89% of global",
  avgVesselAge: "12.3 years",
  containerTEU: "28.4 million TEU capacity",
  orderbook: "320 million DWT",
  annualFreightRevenue: "$380 billion",
  topFlag: "Panama (8,500+ vessels)",
};

// --- CHOKE POINTS ---
export interface ChokePoint {
  name: string;
  location: string;
  dailyTransits: string;
  oilFlow: string;
  tradeValue: string;
  width: string;
  depth: string;
  risk: string;
}

export const chokePoints: ChokePoint[] = [
  { name: "Strait of Malacca", location: "Singapore/Malaysia/Indonesia", dailyTransits: "~100 vessels", oilFlow: "16M bbl/day", tradeValue: "$5.3 trillion/year", width: "2.8 km (narrowest)", depth: "25m", risk: "Piracy, congestion, shallow draft" },
  { name: "Strait of Hormuz", location: "Iran/Oman/UAE", dailyTransits: "~60 vessels", oilFlow: "21M bbl/day", tradeValue: "$1.2 trillion/year", width: "3.2 km (shipping lane)", depth: "60m+", risk: "Geopolitical tensions, military activity" },
  { name: "Suez Canal", location: "Egypt", dailyTransits: "~70 vessels", oilFlow: "5.5M bbl/day", tradeValue: "$1 trillion/year", width: "205m (New Suez)", depth: "24m", risk: "Blockage (Ever Given 2021), Houthi attacks" },
  { name: "Panama Canal", location: "Panama", dailyTransits: "~40 vessels", oilFlow: "0.9M bbl/day", tradeValue: "$270B/year", width: "55m (new locks)", depth: "15.2m", risk: "Drought reducing draft, capacity constraints" },
  { name: "Bab el-Mandeb", location: "Yemen/Djibouti", dailyTransits: "~30 vessels", oilFlow: "6.2M bbl/day", tradeValue: "$700B/year", width: "26 km", depth: "100m+", risk: "Houthi attacks, piracy, conflict zone" },
  { name: "Turkish Straits (Bosphorus)", location: "Turkey", dailyTransits: "~130 vessels", oilFlow: "3.0M bbl/day", tradeValue: "$350B/year", width: "0.7 km (narrowest)", depth: "36m", risk: "Heavy traffic, sharp turns, fog" },
];
