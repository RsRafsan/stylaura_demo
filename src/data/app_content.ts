
        
/*import { LucideIcon } from "lucide-react";*/

/** Basic structure for standard navigation links and actions */
export interface LinkItemModel {
  title: string;
  url: string;
  iconName?: string;
}

/** Interface for featured content like Hero Banners on the homepage */
export interface HeroBannerModel {
  id: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

/** Interface for a size guide table row */
export interface SizeGuideRowModel {
  sizeLabel: string; // e.g., 'S', 'M', 'Free Size'
  bust: string; // e.g., '34-36 inches'
  waist: string; // e.g., '28-30 inches'
  length: string; // e.g., '40 inches'
}

/** Interface for the complete size guide */
export interface SizeGuideModel {
  productId: string; // Specific product ID or 'default'
  title: string;
  description: string;
  measurementGuideImageUrl: string;
  tableData: SizeGuideRowModel[];
}


// --- 1. Branding and General Content ---

export const SITE_BRANDING = {
  name: "Stylaura",
  tagline: "Premium Women's Fashion",
  logoText: "Stylaura",
  email: "support@stylaura.com",
  phone: "+880 1XXXXXXXXX",
};

// --- 2. Navigation and Social Links ---

export const MAIN_NAVIGATION: LinkItemModel[] = [
  { title: "Home", url: "/", iconName: "Home" },
  { title: "Shop All", url: "/shop-all", iconName: "LayoutGrid" },
  { title: "Lehengas", url: "/category/lehengas", iconName: "Tag" },
  { title: "Bags", url: "/category/bags", iconName: "ShoppingBag" },
  { title: "New Arrivals", url: "/category/new-arrivals", iconName: "Sparkles" },
  { title: "About Us", url: "/about", iconName: "Info" },
  { title: "Contact", url: "/contact", iconName: "MessageCircle" },
];

export const SOCIAL_LINKS: LinkItemModel[] = [
  { title: "Facebook", url: "https://facebook.com/stylaura", iconName: "Facebook" },
  { title: "Instagram", url: "https://instagram.com/stylaura", iconName: "Instagram" },
  { title: "TikTok", url: "https://tiktok.com/@stylaura", iconName: "Tiktok" },
];

export const FOOTER_NAVIGATION: { title: string; links: LinkItemModel[] }[] = [
    {
        title: "Information",
        links: [
            { title: "About Stylaura", url: "/about" },
            { title: "Customer Reviews", url: "/reviews" },
            { title: "FAQs", url: "/faqs" },
            { title: "Contact Us", url: "/contact" },
        ]
    },
    {
        title: "Legal & Policy",
        links: [
            { title: "Return & Shipping Policy", url: "/policy/return-shipping" },
            { title: "Privacy Policy", url: "/policy/privacy" },
            { title: "Terms & Conditions", url: "/policy/terms" },
        ]
    }
];

// --- 3. Homepage Specific Content ---

export const HOME_HERO_BANNER: HeroBannerModel = {
  id: "hero-1",
  heading: "South Asian Elegance Meets Modern Trend",
  subheading: "Discover our curated collection of premium imported lehengas and festive wear. Shop the New Arrivals.",
  imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/ae6c3793-6c60-4f13-bf6e-71866f01985e.png",
  ctaText: "Shop New Arrivals",
  ctaLink: "/category/new-arrivals",
};


// --- 4. Size Guide Data ---

const DEFAULT_SIZE_GUIDE_TABLE: SizeGuideRowModel[] = [
    { sizeLabel: 'Free Size', bust: '34-38 inches', waist: 'Adjustable', length: '40-42 inches (variable)' },
    { sizeLabel: 'S (UK 8)', bust: '32 inches', waist: '26 inches', length: '38 inches' },
    { sizeLabel: 'M (UK 10)', bust: '34 inches', waist: '28 inches', length: '40 inches' },
    { sizeLabel: 'L (UK 12)', bust: '36 inches', waist: '30 inches', length: '42 inches' },
];

export const DEFAULT_SIZE_GUIDE: SizeGuideModel = {
    productId: 'default',
    title: 'Standard Size Guide (Clothing)',
    description: 'Please measure your body carefully against the chart below. Note that measurements are garment size; allow 1-2 inches for comfort. Items marked "Free Size" are adjustable or designed for a broad fit.',
    measurementGuideImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/e353689c-6fa0-4c50-a3f5-f5f8bfd2558e.png",
    tableData: DEFAULT_SIZE_GUIDE_TABLE,
};
        
      