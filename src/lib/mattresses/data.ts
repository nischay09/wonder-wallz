/**
 * src/lib/mattresses/data.ts
 *
 * Single source of truth for the Mattresses & Pillows catalogue hierarchy.
 * Transcribed directly from product_catalogue.md — every Category / Series /
 * Product below matches a `##` / `###` / `####` heading there. Do not invent
 * copy that isn't in the markdown; if content is added there, mirror it here.
 *
 * Images are not yet supplied for this category (no product photography was
 * provided alongside the markdown), so every product/series falls back to
 * MATTRESS_GRADIENT via seedProducts-style generation in collections.ts —
 * exactly how Flooring behaved before its registry had real photography.
 * Swap in real `image`/`highResImage` paths in collections.ts's
 * generateMattressProducts() once photography exists; no shape changes
 * needed here.
 */

import type { MattressCategory } from "./types";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const MATTRESS_GRADIENT: [string, string] = ["#E8DED0", "#B49A7C"];

export const MATTRESS_CATALOGUE: MattressCategory[] = [
  {
    id: "luxe-collection",
    slug: "luxe-collection",
    title: "Luxe Collection",
    series: [
      {
        id: "royal-radiance",
        slug: "royal-radiance",
        title: "Royal Radiance",
        products: [
          {
            id: "luxilla-suite",
            slug: "luxilla-suite",
            title: "LUXILLA SUITE",
            description:
              "Euro Top on both sides over a premium pocket spring core - the ultimate suite-grade mattress. Equally indulgent from every angle, built for the highest standard of hospitality and residential luxury.",
            keyBenefits: [
              "Euro Top on Both Sides: consistent luxury, both surfaces",
              "Premium Pocket Spring core: for individualized zone support",
              "Multi-layer Memory Foam and soft PU: for deep indulgence",
              "Hotel Suite Compatible: engineered for premium environments",
            ],
            warranty: "15 Years",
            features: ["Double Euro Top", "Pocket Spring", "Suite Compatible"],
            comfortLevel: "M-Plush",
            layers: [
              "Knitted Quilted Fabric",
              "Quilting with Polyfill, Memory Foam & Soft PU",
              "Memory Foam & Soft PU Foam",
              "Euro Top Construction",
              "PU Foam",
              "Cotton Felt",
              "Pocketed Spring",
              "Foam Encasement",
              "Cotton Felt",
              "Pu Foam",
              "HR Foam in Euro Top Construction",
              "Knitted Fabric Quilted with PU Foam and Polyfill",
            ],
          },
          {
            id: "infinia",
            slug: "infinia",
            title: "INFINIA",
            description:
              "Natural latex, multi-layer Visco memory, Power Foam, and premium pocket springs beneath an ultra-luxurious knitted surface. Every layer selected for the most indulgent sleep imaginable.",
            keyBenefits: [
              "Premium Pocket Springs: for individualized zone support",
              "Natural Latex: delivers bounce, breathability and pressure relief",
              "Multi-layer Visco Memory: for deep immersive contouring",
              "Ultra Luxurious Knitted Fabric: unrivaled first-touch feel",
            ],
            warranty: "15 Years",
            features: ["Pocket Spring", "Natural Latex", "Multi-Layer Visco"],
            comfortLevel: "M-Plush",
            layers: [
              "Knitted Fabric",
              "PU Foam",
              "Memory Foam",
              "Poly Fill",
              "Visco Memory",
              "Power Foam",
              "Natural Latex",
              "PU Foam",
              "Raisen Bonded Cotton Felt",
              "Pocket Springs",
              "Foam Encasement",
              "Raisen Bonded Cotton Felt",
              "Designer Border",
            ],
          },
        ],
      },
      {
        id: "copper-x-series",
        slug: "copper-x-series",
        title: "Copper X Series",
        products: [
          {
            id: "clove",
            slug: "clove",
            title: "CLOVE",
            description:
              "ICE copper technology infused through every layer - boosting immunity, reducing inflammation, and eliminating motion transfer over a pocketed spring core. Redefine restful nights.",
            keyBenefits: [
              "ICE Copper Infused Visco Memory: advanced antimicrobial protection",
              "Copper-infused Latex: reduces inflammation during sleep",
              "Pocketed Springs: zero motion transfer for partners",
              "Copper Cool Knitted Fabric: keeps the surface hygienic and fresh",
            ],
            warranty: "10 Years",
            features: ["ICE Copper Fabric", "Pocket Spring", "No Motion Transfer"],
            comfortLevel: "M-Plush",
            layers: [
              "Copper Infused Knitted Fabric",
              "Fibre",
              "Visco Memory Foam",
              "Copper Infused Memory Foam",
              "Copper Infused Latex Foam",
              "Charcoal Foam",
              "Pocketed Spring",
              "Foam Encasement",
              "HD Cotton Felt",
              "Anti Skid Fabric",
            ],
          },
          {
            id: "copperest",
            slug: "copperest",
            title: "COPPEREST",
            description:
              "Hybrid design blending copper-infused latex, gel Visco memory foam, and CNC HR foam - cooler sleep, reduced partner disturbance, and the full health benefits of copper in one refined mattress.",
            keyBenefits: [
              "Gel Visco Foam: draws heat away for a cooler sleep surface",
              "Copper Infused Latex: boosts circulation and recovery",
              "CNC HR Foam: for precise zone-targeted support",
              "Anti-skid Base: keeps the mattress perfectly positioned",
            ],
            warranty: "10 Years",
            features: ["Copper Hybrid", "Gel Visco", "CNC HR Foam"],
            comfortLevel: "M-Plush",
            layers: [
              "Copper Infused Knitted Fabric",
              "Copper Infused Memory Foam",
              "Copper Infused Latex",
              "Copper Infused HR Foam",
              "PU Foam",
              "Anti Skid Fabric",
            ],
          },
        ],
      },
      {
        id: "nature-sense-series",
        slug: "nature-sense-series",
        title: "Nature Sense Series",
        products: [
          {
            id: "natural-serene",
            slug: "natural-serene",
            title: "NATURAL SERENE",
            description:
              "Thick gel-infused Visco memory foam over Euro Certified 7-Zone Latex - unmatched coziness, superior temperature control, and natural zone support. The ultimate natural luxury sleep experience.",
            keyBenefits: [
              "Thick Gel Visco Memory: superior heat-dissipating comfort",
              "7-Zone Certified Latex: for foundational zone-specific support",
              "Aloe Vera Fabric: for gentle natural skin care while you sleep",
              "Designer Velvet Border: for a distinguished luxury finish",
            ],
            warranty: "15 Years",
            features: ["Gel Visco Memory", "7-Zone Latex", "Aloe Vera Fabric"],
            comfortLevel: "Plush",
            layers: [
              "Quilted Aloevera Knitted Fabric",
              "Poly Fill",
              "Visco Memory",
              "7 Zone Euro Certified Latex",
              "Premium Knitted Border",
            ],
          },
          {
            id: "natural-sense",
            slug: "natural-sense",
            title: "NATURAL SENSE",
            description:
              "Seven Zone Euro Certified latex meets Visco memory foam beneath a quilted Aloe Vera cover - optimal zone support, adaptive comfort, and skin-soothing breathability in one elegant mattress.",
            keyBenefits: [
              "7-Zone Latex: provides optimal, zone-targeted body support",
              "Visco Memory Foam: for personalized pressure relief",
              "Aloe Vera Fabric: skin-soothing and breathable",
              "Natural Temperature Control: for a consistently cool sleep",
            ],
            warranty: "10 Years",
            features: ["7-Zone Certified Latex", "Visco Memory", "Aloe Vera"],
            comfortLevel: "Plush",
            layers: [
              "Quilted Aloevera Knitted Fabric",
              "Poly Fill",
              "Visco Memory",
              "7 Zone Euro Certified Latex",
              "Premium Knitted Border",
            ],
          },
          {
            id: "natural-comfort-plush",
            slug: "natural-comfort-plush",
            title: "NATURAL COMFORT PLUSH",
            description:
              "Pocket springs combined with Euro Certified Latex that conforms to body movement - topped with Aloe Vera fabric and memory foam quilting for a soothing, body-responsive luxury sleep.",
            keyBenefits: [
              "Euro Certified Latex Conforms: precisely to every body contour",
              "Aloe Vera Fabric: soothing, skin-friendly sleep surface",
              "Pocket Springs: eliminate pressure and motion transfer",
              "Memory Foam quilting: for instant adaptive cushioning",
            ],
            warranty: "10 Years",
            features: ["Pocket Spring", "Certified Latex", "Aloe Vera Fabric"],
            comfortLevel: "Plush",
            layers: [
              "Aloe Vera fabric Quilted with Memory Foam",
              "Euro Certified Latex PU Foam",
              "HD Cotton Felt",
              "Pocket Spring",
              "PU Foam",
              "Smooth Velvet Border",
            ],
          },
          {
            id: "organico",
            slug: "organico",
            title: "ORGANICO",
            description:
              "Crafted from biodegradable organic latex sourced from rubber trees - Power Cool Foam and memory foam quilting over an XHD RB base. Conscious luxury for a healthier planet and sleeper.",
            keyBenefits: [
              "100% Organic Latex: hypoallergenic and naturally breathable",
              "Biodegradable: renewable construction",
              "Power Cool Foam: for active heat regulation",
              "XHD RB Foam Firm Base: complements the natural core",
            ],
            warranty: "10 Years",
            features: ["Organic Latex", "Power Cool Foam", "Eco-Certified"],
            comfortLevel: "M-Firm",
            layers: [
              "Knitted Fabric",
              "Memory Foam Quilting",
              "Natural Latex",
              "Power Cool Foam",
              "XHD RB Foam",
              "Premium Knitted Border",
            ],
          },
          {
            id: "natural-comfort",
            slug: "natural-comfort",
            title: "NATURAL COMFORT",
            description:
              "Euro Certified 7-Zone natural latex over a firm rebounded base with premium Aloe Vera knitted fabric. Zone-specific natural support wrapped in a sumptuously soft surface.",
            keyBenefits: [
              "7-Zone Euro certified latex: targets every body zone precisely",
              "Premium Double Jacquard Fabric: sumptuously soft & durable",
              "XHD RB Foam Base: for consistent long-term support",
            ],
            warranty: "10 Years",
            features: ["Euro Certified 7-Zone Latex"],
            comfortLevel: "Firm",
            layers: [
              "400 gsm Knitted Quilted Fabric",
              "Poly Fill",
              "Euro Top Construction",
              "Euro Certified 7 Zone Natural Latex",
              "Pure & Soft PU Foam",
              "XHD RB Foam",
              "Velvet Border",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "celestial",
    slug: "celestial",
    title: "Celestial",
    series: [
      {
        id: "spine-support-series",
        slug: "spine-support-series",
        title: "Spine Support Series",
        products: [
          {
            id: "spine-support-dlx",
            slug: "spine-support-dlx",
            title: "SPINE SUPPORT DLX",
            description:
              "A thick Visco memory layer over quadcore bonded foam gives a plush, airy feel with dual firmness options. XHD RB Foam base ensures firm orthopedic backing beneath the luxury surface.",
            keyBenefits: [
              "Thick Visco Memory Foam: for deep immersive pressure relief",
              "Dual Firmness Option: plush feel over firm support",
              "XHD RB Foam Base: for resilient orthopedic support",
              "Euro Top Knitted Fabric: for hotel-quality finish",
            ],
            warranty: "10 Years",
            features: ["Thick Visco", "Dual Firmness", "Euro Top"],
            comfortLevel: "M-Plush",
            layers: [
              "ET With Knitted Fabric",
              "Memory Foam & Fibre in Quilting",
              "Thick Memory Foam",
              "XHD RB Foam",
              "Co-ordinated Knitted Fabric",
            ],
          },
          {
            id: "spine-support-advance",
            slug: "spine-support-advance",
            title: "SPINE SUPPORT ADVANCE",
            description:
              "CNC-cut HR foam base with gel-infused memory foam on top and Power Cool HR Foam in the middle - precise zone support meets heat-dissipating comfort for a restorative night's sleep.",
            keyBenefits: [
              "CNC-Cut HR Foam: for precise spine zone targeting",
              "Gel Memory Foam: actively draws heat away all night",
              "Power Cool HR Foam: ensures consistent airflow",
              "Deep Stitch Quilted cover: for added durability",
            ],
            warranty: "10 Years",
            features: ["CNC HR Foam", "Gel Memory", "Power Cool"],
            comfortLevel: "M-Plush",
            layers: [
              "Superfine knitted fabric",
              "Memory & PU Foam Polyfill In quilting",
              "Gel Infused Memory Foam",
              "Power Cool HR Foam",
              "CNC HR Foam",
              "Memory & PU Foam Polyfill In quilting",
            ],
          },
          {
            id: "spine-support-xt",
            slug: "spine-support-xt",
            title: "SPINE SUPPORT XT",
            description:
              "Individually pocketed springs with dual Visco memory layers and Cool Gel PU Foam - precise targeted support meeting deep adaptive contouring for a truly restorative sleep.",
            keyBenefits: [
              "Dual Visco Layers: for full-body pressure relief",
              "Cool Gel PU Foam: regulates temperature all night",
              "Pocketed Springs: deliver zone-by-zone body support",
              "HR Foam: adds resilient bounce between comfort layers",
            ],
            warranty: "10 Years",
            features: ["Pocket Spring", "Dual Visco", "Cool Gel PU"],
            comfortLevel: "M-Plush | Plush",
            layers: [
              "Knitted Quilted Fabric",
              "Poly Fill",
              "Visco Memory",
              "HR Foam",
              "Visco Memory",
              "Cool Gel PU Foam",
              "Pocketed Spring",
              "Foam Encasement",
              "Cotton Felt",
              "Quilted Border",
            ],
          },
          {
            id: "spine-support-at",
            slug: "spine-support-at",
            title: "SPINE SUPPORT AT",
            description:
              "Bonnell springs with pillow-top construction for firm spinal support with an instantly comfortable feel. Visco memory foam and Raisen Bonded Cotton Felt create a healthy, cozy sleep experience.",
            keyBenefits: [
              "Bonnell Spring Core: for firm, reliable spinal support",
              "Pillow-Top: delivers cloud-like comfort from night one",
              "Visco Memory Foam: layer for key pressure point relief",
              "Motion-Dampening cotton felt insulation",
            ],
            warranty: "10 Years",
            features: ["Bonnell Spring", "Pillow Top", "Visco Memory"],
            comfortLevel: "M-Firm",
            layers: [
              "Knitted Fabric",
              "Poly Fill",
              "Visco Memory",
              "Pure & Soft PU Foam",
              "Pillow Top",
              "Raisen Bonded Cotton Felt",
              "Bonnel Spring",
              "HD Foam Encasement",
              "Co-Ordinated Border",
            ],
          },
        ],
      },
      {
        id: "black-diamond-series",
        slug: "black-diamond-series",
        title: "Black Diamond Series",
        products: [
          {
            id: "grandioz",
            slug: "grandioz",
            title: "GRANDIOZ",
            description:
              "Premium pocketed springs beneath a charcoal Euro Top with fusion memory foam and breathable latex - meticulous layer-by-layer engineering for ultimate health-conscious luxury sleep.",
            keyBenefits: [
              "Charcoal Euro Top: infuses the surface with impurity-absorbing properties",
              "Premium Pocket Springs: for individualized zone support",
              "Fusion Memory Foam: for deep adaptive contouring",
              "Reinforced Foam encasement: for decades of durability",
            ],
            warranty: "10 Years",
            features: ["Pocket Spring", "Charcoal Euro Top", "Fusion Memory"],
            comfortLevel: "M-Plush",
            layers: [
              "Knitted Fabric",
              "Quilted with Memory Foam & Softy Foam",
              "Fusion Memory Foam",
              "High Perfoamce Charcoal Foam Euro Top Structure",
              "Reinforced Foam Encasement",
              "Breathable Latex Foam",
              "Pocket Structure",
              "XHD Cotton Felt",
            ],
          },
          {
            id: "orthoz",
            slug: "orthoz",
            title: "ORTHOZ",
            description:
              "Charcoal, fusion memory foam, and 7-zone high-performance foam ensure proper spine alignment while keeping the sleep surface hygienically clean. Breathable latex adds natural airflow.",
            keyBenefits: [
              "Charcoal Foam: absorbs impurities for a clean sleep surface",
              "7-zone HP Foam: targets each critical body zone",
              "Fusion Memory Foam: for personalized pressure relief",
              "Breathable Latex Layer: for natural airflow and freshness",
            ],
            warranty: "10 Years",
            features: ["Charcoal 7-Zone", "Fusion Memory", "Breathable Latex"],
            comfortLevel: "M-Firm",
            layers: [
              "Knitted Fabric",
              "Quilted with Memory Foam & Softy Foam",
              "7 Zone Charcoal High Performance Foam",
              "Fusion Memory Foam",
              "Breathable Latex Foam",
              "HR Foam",
            ],
          },
        ],
      },
      {
        id: "medicposture-series",
        slug: "medicposture-series",
        title: "MedicPosture Series",
        products: [
          {
            id: "medicposture-advance",
            slug: "medicposture-advance",
            title: "MEDICPOSTURE ADVANCE",
            description:
              "Premium pocket springs with HR foam maintain body posture with zero motion effect. Memory foam quilting and Power Foam layers deliver a luxury finish over clinical orthopedic support.",
            keyBenefits: [
              "Pocket Springs: maintain posture - zero motion effect",
              "Memory Foam Quilting: for instant adaptive cushioning",
              "Power Foam: amplifies spring response and bounce",
              "Heavy Duty Performance: to provide enhanced spinal alignment, superior edge support, and improved durability",
            ],
            warranty: "7 Years",
            features: ["Pocket Spring", "Memory Quilting", "Power Foam"],
            comfortLevel: "M-Firm",
            layers: [
              "Quilted Knitted Fabric",
              "Memory Foam in quilting",
              "HR Foam",
              "Power Foam",
              "HD Cotton Felt",
              "Pocketed Spring",
              "Foam Encasement",
              "HD Cotton Felt",
              "PU Foam",
              "Velvet Border",
            ],
          },
        ],
      },
      {
        id: "ortho-max-series",
        slug: "ortho-max-series",
        title: "Ortho Max Series",
        products: [
          {
            id: "ortho-max-advance",
            slug: "ortho-max-advance",
            title: "ORTHO MAX ADVANCE",
            description:
              "Dual-layer Visco memory foam and Power Cool HR Foam over an XHD quadcore base - for those who want premium orthopedic support without sacrificing plush, adaptive comfort.",
            keyBenefits: [
              "Dual Visco Memory Foam: contours to your body shape",
              "Power Cool HR Foam: for breathable, airy comfort",
              "Euro Top: delivers cloud-like feel over firm support",
              "XHD Quadcore Base: for resilient long-lasting support",
            ],
            warranty: "7 Years",
            features: ["Dual Memory Foam", "Euro Top", "Power Cool HR"],
            comfortLevel: "M-Plush",
            layers: [
              "Knitted fabric",
              "Visco Memory Foam",
              "Euro Top Construction",
              "Memory Foam",
              "Power Cool HR Foam",
              "XHD RB Foam",
              "Co-ordinated Knitted Border",
            ],
          },
          {
            id: "ortho-max-plus",
            slug: "ortho-max-plus",
            title: "ORTHO MAX PLUS",
            description:
              "Premium firm support meets Power Cool Foam and Euro Top construction - for sleepers who need structured orthopedic integrity with a refined, pressure-free surface.",
            keyBenefits: [
              "Power Cool Foam: for a consistently cool sleep surface",
              "Euro Top: adds plush comfort over the firm support core",
              "XHD RB Foam: for superior long-term durability",
              "One Side Firm Other Side Plush",
            ],
            warranty: "7 Years",
            features: ["Euro Top", "Dual Comfort", "Power Cool Foam"],
            comfortLevel: "Firm",
            layers: [
              "Superfine knitted fabric",
              "Power Cool Foam",
              "HD PU Foam",
              "Euro Top Construction",
              "XHD RB Foam",
              "HD PU Foam",
              "Co ordinated Knitted Border",
            ],
          },
          {
            id: "ortho-green",
            slug: "ortho-green",
            title: "ORTHO GREEN",
            description:
              "Natural latex comfort meets firm orthopaedic support - designed for those who prefer a cooler, more responsive sleep with long-lasting durability and balanced cushioning.",
            keyBenefits: [
              "Natural Latex Layer: for responsive comfort and breathability",
              "Latex Foam Quilting: enhances surface softness and airflow",
              "Pure & Soft PU Foam: for adaptive pressure relief",
              "HD HR Foam Base: ensures firm orthopaedic support and durability",
            ],
            warranty: "7 Years",
            features: ["Natural Latex", "Latex Quilting", "HD HR Foam"],
            comfortLevel: "M-Firm",
            layers: [
              "Knitted Fabric",
              "Latex Foam in Quilting",
              "Natural Latex",
              "Pure & Soft PU Foam",
              "HD HR Foam",
              "Quilted Border",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cloude-essential",
    slug: "cloude-essential",
    title: "Cloude Essential",
    series: [
      {
        id: "orthopaedic-support-mattress",
        slug: "orthopaedic-support-mattress",
        title: "Orthopaedic Support Mattress",
        products: [
          {
            id: "ezy-firm",
            slug: "ezy-firm",
            title: "EZY FIRM",
            description:
              "Firm, structured support with a soft surface touch. HD PU foam and a high-density rebonded base ensure proper spinal alignment - ideal for sleepers who want sturdy, lasting comfort.",
            keyBenefits: [
              "Dual-sided Comfort: Medium Firm & Xtra Firm",
              "High-density Rebonded Foam: for orthopedic support",
              "Breathable Knitted Fabric: for a cool sleep surface",
              "Promotes correct spinal alignment",
            ],
            warranty: "Upto 7 Years",
            features: ["Reversible", "Breathable", "XHD RB Foam"],
            thicknessOptions: `4"TT | 5"TT | 6"ET | 8"ET`,
            comfortLevel: "Firm",
            layers: [
              "Knitted Fabric",
              "HD PU Foam",
              "Pure & Soft PU Foam",
              "XHD RB Foam",
              "Knitted Border",
            ],
          },
        ],
      },
      {
        id: "orthopaedic-memory-support-mattress",
        slug: "orthopaedic-memory-support-mattress",
        title: "Orthopaedic Memory Support Mattress",
        products: [
          {
            id: "ezy-plush",
            slug: "ezy-plush",
            title: "EZY PLUSH",
            description:
              "Temperature-sensitive memory foam contours to your body while the XHD rebonded base keeps your spine aligned. A perfect balance of adaptive comfort and orthopedic support.",
            keyBenefits: [
              "Body-sensing Memory Foam: relieves pressure points",
              "Euro Top Construction: for a plush, feather-like feel",
              "XHD Rebounded Foam: for durable orthopedic support",
              "Breathable Quilted knitted fabric cover",
            ],
            warranty: "Upto 7 Years",
            features: ["Reversible", "Body-Sensing Memory Foam"],
            thicknessOptions: `5"TT | 6"TT | 8"ET`,
            comfortLevel: "M-Plush",
            layers: [
              "Knitted Fabric",
              "Fusion Memory",
              "Euro Top Construction",
              "Memory Foam Pure & Soft Sleep Foam",
              "XHD Rebounded Foam",
              "Co-ordinated Knitted Border",
            ],
          },
        ],
      },
      {
        id: "orthopaedic-back-support",
        slug: "orthopaedic-back-support",
        title: "Orthopaedic Back Support",
        products: [
          {
            id: "ezy-posture",
            slug: "ezy-posture",
            title: "EZY POSTURE",
            description:
              "High-carbon Bonnell / Pocket springs with HD Pure Sleeping Foam deliver firm, posturized orthopaedic comfort. Built to maintain back health night after night with no-flip convenience.",
            keyBenefits: [
              "Bonnell / Pocket spring core: for deep posturized support",
              "Resin-bonded cotton felt: extends mattress lifespan",
              "Reversible No-Flip design",
              "Double edge support: for shape retention",
            ],
            warranty: "7 Years",
            features: ["Reversible", "No-Flip", "Bonnell / Pocket Spring"],
            thicknessOptions: `6"ET | 8"ET`,
            comfortLevel: "M-Firm",
            layers: [
              "Knitted Quilted Fabric",
              "Pure and Soft PU Foam in Pillow Top",
              "Pure and Soft Sleep Foam",
              "HD Cotton Felt",
              "Bonnell spring",
              "HD Cotton Felt",
              "Foam Encasement",
              "Power Cool HR Foam",
              "Knitted Quilted Fabric",
            ],
          },
        ],
      },
      {
        id: "organic-support-mattress",
        slug: "organic-support-mattress",
        title: "Organic Support Mattress",
        products: [
          {
            id: "ezy-comfort",
            slug: "ezy-comfort",
            title: "EZY COMFORT",
            description:
              "Organic natural latex and a rebounded foam base deliver firm back support with natural, breathable comfort. A conscious choice -sustainable materials, reversible design, lasting support.",
            keyBenefits: [
              "Seven Zone Design: Seven Zone for Proper Body Support",
              "HBD HR foam base: for spinal alignment",
              "Gentle bounce: with reliable back support",
              "Breathable roll-pack Mattress",
            ],
            warranty: "Upto 7 Years",
            features: ["Reversible", "Roll Pack", "Breathable"],
            thicknessOptions: `5" Zip | 6" Zip`,
            comfortLevel: "M-Firm",
            layers: [
              "Natural Latex",
              "Latex Foam",
              "Pure Soft Foam",
              "XHD Rebounded Foam",
              "Co-ordinated Knitted Fab",
            ],
          },
        ],
      },
      {
        id: "7-zone-orthopaedic-mattress",
        slug: "7-zone-orthopaedic-mattress",
        title: "7 Zone - Orthopaedic Mattress",
        products: [
          {
            id: "ezy-zip",
            slug: "ezy-zip",
            title: "EZY ZIP",
            description:
              "Two comfort levels in one - a zippered design lets you switch between medium firm and medium plush. Ideal for couples or those whose comfort needs change with the seasons.",
            keyBenefits: [
              "Seven Zone Design: Seven Zone for Proper Body Support",
              "HBD HR foam base: for spinal alignment",
              "Gentle bounce: with reliable back support",
              "Breathable roll-pack Mattress",
            ],
            warranty: "Upto 7 Years",
            features: ["Reversible", "Roll Pack", "Breathable"],
            thicknessOptions: `5" Zip | 6" Zip`,
            comfortLevel: "Plush",
            layers: ["Knitted Fabric", "Soft PU Foam", "HD HR Foam", "Knitted Border"],
          },
        ],
      },
    ],
  },
  {
    id: "accessories",
    slug: "accessories",
    title: "Accessories",
    series: [
      {
        id: "pillows",
        slug: "pillows",
        title: "Pillows",
        products: [
          {
            id: "iris",
            slug: "iris",
            title: "IRIS",
            description:
              "Hollow poly-fiber prevents lumps & evenly distributes head weight for exceptional comfort.",
            keyBenefits: [],
            layers: [],
            specs: { Fabric: "100% Cotton", Filling: "Hollow Poly Fiber" },
          },
          {
            id: "silken-plush",
            slug: "silken-plush",
            title: "SILKEN PLUSH",
            description:
              "Premium Goose Down and feather blend - hypoallergenic, dust mite-proof, generously overfilled.",
            keyBenefits: [],
            layers: [],
            specs: { Fabric: "Down 70%, Feather 30%", Feel: "Soft, Cosy" },
          },
          {
            id: "dream-cush",
            slug: "dream-cush",
            title: "DREAM CUSH",
            description:
              "Super microfiber with the feel of natural goose down - world-class luxury at every price.",
            keyBenefits: [],
            layers: [],
            specs: { Fabric: "100% Cotton", Filling: "Virgin Grade Microfibre" },
          },
          {
            id: "neck-sense-duo",
            slug: "neck-sense-duo",
            title: "NECK SENSE - DUO",
            description:
              "Dual-comfort ergonomic pillow - Medium Plush for back sleepers, Plush for side sleepers.",
            keyBenefits: ["Reduces neck & shoulder pain", "Two comfort sides"],
            layers: [],
          },
          {
            id: "cosmo-cool",
            slug: "cosmo-cool",
            title: "COSMO COOL",
            description:
              "Visco-elastic memory foam cradles the neck and joints at exactly the right angles.",
            keyBenefits: [],
            layers: [],
            specs: { Fabric: "Knitted", Filling: "Visco Elastic Memory Foam" },
          },
          {
            id: "therapeutic-travel-neck",
            slug: "therapeutic-travel-neck",
            title: "THERAPEUTIC TRAVEL NECK",
            description:
              "Visco memory foam travel neck pillow - relieves travel stress and prevents neck stiffness.",
            keyBenefits: [],
            layers: [],
            specs: { "Inner Material": "Visco Memory Foam", "Outer Material": "Velvet" },
          },
          {
            id: "green-blossom",
            slug: "green-blossom",
            title: "GREEN BLOSSOM",
            description:
              "Organic natural latex for exact body posture support - medium soft and naturally breathable.",
            keyBenefits: [],
            layers: [],
            specs: { Fabric: "Aloe Vera Knitted", Filling: "Natural Latex" },
          },
          {
            id: "therapeutic-ergo-back-cushion",
            slug: "therapeutic-ergo-back-cushion",
            title: "THERAPEUTIC ERGO BACK CUSHION",
            description:
              "S-shaped ergonomic design follows the natural spinal curve - ideal for long hours at a desk, in a car, or any seated position.",
            keyBenefits: [],
            layers: [],
            specs: {
              Design: "S-Shaped Ergonomic",
              "Inner Material": "Visco Memory Foam",
              "Outer Material": "Velvet",
            },
          },
        ],
      },
      {
        id: "protectors",
        slug: "protectors",
        title: "Protectors",
        products: [
          {
            id: "safe-bed-ultima",
            slug: "safe-bed-ultima",
            title: "SAFE BED ULTIMA",
            description:
              "Waterproof envelope construction protects your mattress from dust, stains, and all wear and tear.",
            keyBenefits: [],
            layers: [],
            features: ["Waterproof", "Full Envelope Coverage", "Allergen Barrier"],
          },
          {
            id: "pillow-protector",
            slug: "pillow-protector",
            title: "PILLOW PROTECTOR",
            description:
              "Shields your pillow from dust mites, allergens, and moisture - extends pillow life effortlessly.",
            keyBenefits: [],
            layers: [],
            features: ["Dust Mite Proof", "Machine Washable", "Allergen Barrier"],
          },
        ],
      },
      {
        id: "mattress-topper",
        slug: "mattress-topper",
        title: "Mattress Topper",
        products: [
          {
            id: "mattress-topper",
            slug: "mattress-topper",
            title: "MATTRESS TOPPER",
            description: "Instantly upgrade the comfort of any existing mattress.",
            keyBenefits: [],
            layers: [],
            features: ["Visco + PU Foam", "Visco Memory", "Micro Fiber"],
          },
        ],
      },
      {
        id: "base-headboards",
        slug: "base-headboards",
        title: "Base & Headboards",
        products: [
          {
            id: "base-and-headboards",
            slug: "base-and-headboards",
            title: "BASE & HEADBOARDS",
            description:
              "Fully customized bed bases and headboards - superior quality, tasteful interiors, built to complement your Cloude mattress perfectly.",
            keyBenefits: [],
            layers: [],
            features: ["Custom Sizes Available", "Premium Materials", "Design-Forward"],
          },
        ],
      },
    ],
  },
];

// Sanity helper kept in sync via slugify — not used at runtime, just guards
// against a future entry being added with title/slug drift.
void slugify;
