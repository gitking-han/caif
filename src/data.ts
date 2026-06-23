import { ServiceItem, ServiceGig, PortfolioProject, ClientTestimonial } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "wams",
    title: "Web Application Management System",
    description: "End-to-end orchestration, cloud hosting deployment, continuous DevOps monitoring, security hardening, and real-time scaling of modern SaaS dashboards and web structures.",
    iconName: "AppWindow",
    details: [
      "Custom Server Orchestration & Cloud Deployment (GCP, AWS)",
      "24/7 Server Monitoring & Automated Failover Clusters",
      "Robust Database Scaling, Backups & Migration Operations",
      "API Performance Optimization & Cache Tuning"
    ]
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Stunning iOS and Android native and cross-platform (React Native/Flutter) systems designed with fluid gestures, offline-first architectures, and strict standard-compliant styling.",
    iconName: "Smartphone",
    details: [
      "Cross-Platform Native Experience (iOS & Android)",
      "Pristine Touch-Target Densities & High FPS Transitions",
      "Smart Local State Persistent Caching",
      "Push Notification Routing & Secure Biometric Login Hooks"
    ]
  },
  {
    id: "graphics",
    title: "Graphic Designing",
    description: "Expert typography pairings, cohesive branding manuals, sleek high-contrast marketing collateral, and professional layout designs that build premium trust metrics.",
    iconName: "Palette",
    details: [
      "High-Fidelity Vectors & Print-Ready Collaterals",
      "UX/UI Visual Archetype Systems & Layout Grids",
      "Custom Typography & Iconographies",
      "Social Media Visual Templates & Vector Illusions"
    ]
  },
  {
    id: "editing",
    title: "Professional Video Editing",
    description: "Premium dynamic storytelling, meticulous sound engineering, balanced color gradings, and clean motion overlays that capture user interest from the opening frames.",
    iconName: "Film",
    details: [
      "Dynamic B-Roll Selection & Rhythmic Cutting",
      "Precision S-Log Color Grading & Corrective Balancing",
      "Immersive Sound Design & Ambient SFX Balancing",
      "Subtle Typography Superimposition & Motion Accents"
    ]
  },
  {
    id: "logo",
    title: "Premium Logo Making",
    description: "Minimalist, symbolic, and high-impact custom vector marks designed on grids. Engineered to resonate immediately and withstand extreme scaling across physical and digital mediums.",
    iconName: "Compass",
    details: [
      "Original Concepts Designed on Golden Ratio Grids",
      "Comprehensive Vector Assets (.SVG, .EPS, .AI, .PNG)",
      "Color Variation Maps (Light, Dark, Monochromatic)",
      "Intellectual Property Sign-Off & Corporate Styleguides"
    ]
  },
  {
    id: "seo",
    title: "Digital Marketing & SEO",
    description: "Search visibility maximization, strict performance audit-compliant on-page optimization, content blueprints, and multi-channel performance advertising campaigns that drive conversion rates.",
    iconName: "TrendingUp",
    details: [
      "Lighthouse Audited Speed and On-Page Schema Optimization",
      "High-Intent Organic Keyword Map Deployments",
      "Continuous Analytics Tagging & Interactive Sales Funnels",
      "White-Hat Backlink Development & Domain Authority Boosting"
    ]
  }
];

export const SERVICE_GIGS_DATA: ServiceGig[] = [
  {
    serviceId: "wams",
    serviceTitle: "Web App Management",
    gigTitle: "I will deploy, secure, and manage your complete Enterprise Web Application Master System",
    packages: {
      basic: {
        title: "Standard Setup Server Node",
        price: "$195",
        deliveryTime: "3 Days Delivery",
        revisions: "3 Revisions",
        specs: [
          "Single cloud node setup",
          "SSL Certificate Configuration",
          "Docker Containerization",
          "Basic database backups setup",
          "Nginx Reverse Proxy Config"
        ],
        popular: false
      },
      standard: {
        title: "SaaS Scaling Tier",
        price: "$450",
        deliveryTime: "5 Days Delivery",
        revisions: "5 Revisions",
        specs: [
          "Dual cluster cloud nodes load balancer",
          "Continuous DevOps pipeline (GitHub Actions)",
          "Real-time database replication",
          "24/7 automatic alert monitors Setup",
          "Gzip & Brotli bundle cache optimizations"
        ],
        popular: true
      },
      premium: {
        title: "Corporate Autopilot Cloud",
        price: "$890",
        deliveryTime: "10 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "Multiregion Autoscaling Cluster",
          "Zero-Downtime Blue/Green Deployments",
          "Extreme Web Security suite setup (WAF)",
          "Dedicated system administrator routing Support",
          "Monthly detailed system diagnostic logs"
        ]
      }
    }
  },
  {
    serviceId: "mobile",
    serviceTitle: "Mobile Apps",
    gigTitle: "I will design and build a high-performance cross-platform iOS and Android Mobile App",
    packages: {
      basic: {
        title: "Figma UI Prototyping",
        price: "$250",
        deliveryTime: "4 Days Delivery",
        revisions: "4 Revisions",
        specs: [
          "Complete UI Visual Design",
          "Clickable Figma interactive mock",
          "All CSS styles & assets exports",
          "User flow maps & diagram blocks"
        ],
        popular: false
      },
      standard: {
        title: "Full MVP App Core",
        price: "$1,250",
        deliveryTime: "15 Days Delivery",
        revisions: "6 Revisions",
        specs: [
          "Cross-Platform Flutter/React Native build",
          "3 Core screens with smooth transitions",
          "Complete client local persistence state",
          "Safe integration of standard Auth systems",
          "Source code submission with docs"
        ],
        popular: true
      },
      premium: {
        title: "Enterprise Custom Built App",
        price: "$2,800",
        deliveryTime: "25 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "Advanced custom features (Biometrics, Push)",
          "Up to 8 meticulously stylized pages",
          "Complete offline database sync pipelines",
          "Apple App Store & Play Store publishing",
          "60 Days dedicated technical support SLA"
        ]
      }
    }
  },
  {
    serviceId: "graphics",
    serviceTitle: "Graphic Design",
    gigTitle: "I will create a comprehensive corporate brand identity and visual assets system",
    packages: {
      basic: {
        title: "Essential Cover Suite",
        price: "$85",
        deliveryTime: "2 Days Delivery",
        revisions: "2 Revisions",
        specs: [
          "2 Social media cover sheets",
          "3 Customized visual templates",
          "All stock vectors and asset credits",
          "Raw source file formats (.PSD / .AI)"
        ]
      },
      standard: {
        title: "Corporate Visual Manual",
        price: "$220",
        deliveryTime: "4 Days Delivery",
        revisions: "5 Revisions",
        specs: [
          "Unique corporate marketing collateral",
          "Unified company stationery files",
          "Cohesive brand color scheme map",
          "Typography pairings & guidelines book",
          "Express delivery available"
        ],
        popular: true
      },
      premium: {
        title: "The Ultimate Brand Archetype",
        price: "$550",
        deliveryTime: "7 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "Complete visual identity redesigns",
          "15 Comprehensive post templates set",
          "Prismatic UI/UX custom iconography set",
          "Exclusive copywriter collaboration guidance",
          "Official brand licensing documentation"
        ]
      }
    }
  },
  {
    serviceId: "editing",
    serviceTitle: "Video Editing",
    gigTitle: "I will edit high-converting viral videos or commercials with cinema color grades",
    packages: {
      basic: {
        title: "Social Fast Edit",
        price: "$95",
        deliveryTime: "2 Days Delivery",
        revisions: "3 Revisions",
        specs: [
          "Up to 60 seconds duration video",
          "Custom dynamic captions overlay",
          "Rhythmic pacing and speed ramps",
          "Licensed audio sound sync"
        ]
      },
      standard: {
        title: "Cinematic Brand Commercial",
        price: "$290",
        deliveryTime: "4 Days Delivery",
        revisions: "5 Revisions",
        specs: [
          "Up to 3 minutes duration commercial",
          "Professional S-log color grades",
          "Advanced custom ambient soundscapes",
          "Text animations & overlay subtitles",
          "Full 4K output file package"
        ],
        popular: true
      },
      premium: {
        title: "Full Documentary Package",
        price: "$750",
        deliveryTime: "10 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "Up to 15 minutes filmic timeline edit",
          "Bespoke sound sweeps & atmospheric FX",
          "Advanced motion tracking graphics",
          "Unlimited color iterations & balancing",
          "Clean source file architecture handover"
        ]
      }
    }
  },
  {
    serviceId: "logo",
    serviceTitle: "Logo Design",
    gigTitle: "I will craft an iconic Golden Ratio minimalist logo mark with guideline rules",
    packages: {
      basic: {
        title: "Primary Vector Mark",
        price: "$110",
        deliveryTime: "2 Days Delivery",
        revisions: "3 Revisions",
        specs: [
          "2 Original concept designs",
          "High fidelity transparent PNGs",
          "Vector .SVG formats",
          "Color code specification cards"
        ]
      },
      standard: {
        title: "The Standard System",
        price: "$240",
        deliveryTime: "3 Days Delivery",
        revisions: "6 Revisions",
        specs: [
          "4 Distinct concept drafts",
          "Full source files (.AI, .EPS, .SVG, .PDF)",
          "All system variants (vertical, badges)",
          "Social media kit logo dimensions",
          "Includes golden-ratio construction map"
        ],
        popular: true
      },
      premium: {
        title: "The Absolute Signature Pack",
        price: "$490",
        deliveryTime: "5 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "6 Avant-garde hand-sketched layouts",
          "Full trademark-ready vector locks",
          "Exclusive animated logo intro video (1080p)",
          "Sleek corporate brand guidebook PDF",
          "Lifetime file retrieval warranty support"
        ]
      }
    }
  },
  {
    serviceId: "seo",
    serviceTitle: "SEO & Marketing",
    gigTitle: "I will design an aggressive on-page SEO schema and target search visibility funnel",
    packages: {
      basic: {
        title: "SEO Health Audit",
        price: "$120",
        deliveryTime: "3 Days Delivery",
        revisions: "1 Revision",
        specs: [
          "Complete 100-point speed audit sheet",
          "Full list of toxic backlink scans",
          "Keyword mapping priority table",
          "Detailed competitor difficulty review"
        ]
      },
      standard: {
        title: "Rank Accelerator",
        price: "$380",
        deliveryTime: "7 Days Delivery",
        revisions: "4 Revisions",
        specs: [
          "On-page meta & schema markup injections",
          "Image compressions & title alignments",
          "Execution of Sitemap XML & Robots.txt",
          "SEO configuration of 15 core web pages",
          "Google Search Console & Tag Manager Setup"
        ],
        popular: true
      },
      premium: {
        title: "Organic Scale Authority",
        price: "$850",
        deliveryTime: "14 Days Delivery",
        revisions: "Unlimited Revisions",
        specs: [
          "30 Days of holistic organic campaigns",
          "High authority white-hat outreach setup",
          "Full conversion tracking analytics goals",
          "2 Bespoke technical blog blueprint drafts",
          "Weekly real-time SEO ranking updates"
        ]
      }
    }
  }
];

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: "proj1",
    title: "VeloSaaS: Cloud Infrastructure",
    category: "Web",
    description: "Built the unified control dashboard and elastic server management pipeline that reduced backend delays by 40%.",
    imageName: "web_dashboard_screenshot",
    techUsed: ["React", "Express", "Docker", "Nginx", "Redis"],
    client: "Velocity Cloud Corp",
    year: "2025",
    keyOutcome: "40% latency reduction & autoscaling to 25k concurrent users"
  },
  {
    id: "proj2",
    title: "EcoTransit: GPS Transit App",
    category: "Mobile",
    description: "Designed and developed an offline-first public transit routing application with seamless route sync sequences.",
    imageName: "mobile_app_eco",
    techUsed: ["React Native", "Mapbox", "SQLite", "Node.js"],
    client: "EcoTransit Municipal Inc",
    year: "2024",
    keyOutcome: "Active community of 110,000 monthly transit users"
  },
  {
    id: "proj3",
    title: "Sunder: Fine Art Branding",
    category: "Design",
    description: "Executed a holistic corporate visual design system expressing premium minimalism for an international fine art house.",
    imageName: "brand_identity_sunder",
    techUsed: ["Adobe Illustrator", "Golden Ratio Grid", "Figma"],
    client: "Sunder Galleries NYC",
    year: "2025",
    keyOutcome: "Clean guidelines document defining color, spacing and typography"
  },
  {
    id: "proj4",
    title: "NeoCity Documentary Short",
    category: "Editing",
    description: "Engineered color, dynamic sound overlays, and typography edits for a 10-minute urban renewal mini-feature.",
    imageName: "video_editor_timeline",
    techUsed: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    client: "NeoCity Architecture Group",
    year: "2024",
    keyOutcome: "Aired across 3 independent film festivals"
  },
  {
    id: "proj5",
    title: "LUMEN: Biotech Brand Identity",
    category: "Design",
    description: "Synthesized a modern minimal vector logo system capturing cell mitosis structures on a modern visual matrix.",
    imageName: "logo_grid_lumen",
    techUsed: ["Vector Grid System", "Symmetrical CAD", "InDesign"],
    client: "Lumen Therapeutics Group",
    year: "2025",
    keyOutcome: "Clean corporate mark registered in EU intellectual registries"
  },
  {
    id: "proj6",
    title: "Storefront SEO Optimization",
    category: "SEO",
    description: "Engineered rich structured schema, semantic HTML tags, and optimized asset Delivery that boosted organic leads by 180%.",
    imageName: "seo_chart_dashboard",
    techUsed: ["Structured JSON-LD", "Varnishes", "Web Core Vitals"],
    client: "StoreFront Retailers",
    year: "2025",
    keyOutcome: "180% organic keyword growth hitting page 1 on Google"
  },
  {
    id: "proj7",
    title: "Midas: Digital Trading System",
    category: "Web",
    description: "Programmed a secure high-speed ledger backend and WebSocket event dispatcher handling raw transactions.",
    imageName: "stock_trading_broker",
    techUsed: ["Express", "TypeScript", "WebSocket", "PostgreSQL"],
    client: "Midas Asset Arbitrage",
    year: "2026",
    keyOutcome: "Executed over 2 million secure micro-transactions without issue"
  },
  {
    id: "proj8",
    title: "ZenFit: Home Workout App",
    category: "Mobile",
    description: "Programmed an offline-first mobile companion syncing workout telemetry with motion sensor metrics.",
    imageName: "workout_app_mockup",
    techUsed: ["Flutter", "Google Fit API", "RealmDB"],
    client: "ZenFit Global Studio",
    year: "2025",
    keyOutcome: "Maintained 4.8 star average across Apple and Android stores"
  }
];

export const TESTIMONIALS_DATA: ClientTestimonial[] = [
  {
    id: "t1",
    name: "Aris Thorne",
    role: "Chief Technical Officer",
    company: "Velocity Cloud Corp",
    comment: "This team didn't just deploy our node nodes; they engineered a Web Autopilot ecosystem that handles huge transaction bursts seamlessly. Absolute masters of the full-stack crafts.",
    imageLetter: "A"
  },
  {
    id: "t2",
    name: "Genevieve Vance",
    role: "Creative Director",
    company: "Sunder Galleries",
    comment: "The logo construction process was extremely therapeutic. They design with meticulous ratios and grid frameworks. Truly a premium studio with an eye for high-contrast minimalism.",
    imageLetter: "G"
  },
  {
    id: "t3",
    name: "Marcus Lin",
    role: "VP of Product Scale",
    company: "ZenFit Global",
    comment: "Our offline mobile app performs brilliantly. The screen transitions are slick, gestures are highly fluid, and their AI Troubleshooting Console is a developer lifesaver.",
    imageLetter: "M"
  },
  {
    id: "t4",
    name: "Elena Rostova",
    role: "Marketing Director",
    company: "StoreFront International",
    comment: "Our organic traffic skyrocketed within twelve weeks of deploying their schemas and SEO funnels. Elegant execution and crystal-clear data metrics reporting throughout.",
    imageLetter: "E"
  }
];

export const TECH_PROBLEM_PRESETS = [
  {
    label: "Hydration Mismatch Error",
    query: "React hydration error with mismatching html elements between server and client",
    tech: "Next.js / React"
  },
  {
    label: "CORS Blockage on API fetch",
    query: "Express API endpoints throwing Access-Control-Allow-Origin header missing",
    tech: "Express / Node"
  },
  {
    label: "Nginx SSL Certificate Mismatch",
    query: "Let's Encrypt certificate not working or certificate expired on Nginx port 443",
    tech: "Nginx / Linux"
  },
  {
    label: "Vite dev server blank screen",
    query: "Vite HMR disconnects or page is blank on browser refresh after editing",
    tech: "Vite / React"
  },
  {
    label: "React Infinite Render Loop",
    query: "useEffect triggering infinite fetch updates when state is set inside dependencies",
    tech: "React 19 Hooks"
  },
  {
    label: "Express server memory leak",
    query: "Express backend crashing under high request load with heap out of memory",
    tech: "Node.js Runtime"
  }
];
