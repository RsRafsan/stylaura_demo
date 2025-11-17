
        
import { ProductOptionModel, ReviewSummaryModel, getReviewSummaryByProductId } from "./reviews";

/** Defines possible product stock statuses */
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

/** Interface for a product image */
export interface ProductImageModel {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  size: "small" | "medium" | "large";
}

/** Interface for variable options like size or color (in this context, size is most common) */
export interface ProductOptionValueModel {
  id: string;
  label: string;
  value: string;
  inStock: boolean;
}

export interface ProductOptionModel {
  name: string; // e.g., "Size", "Color"
  type: "select" | "color-swatch";
  values: ProductOptionValueModel[];
}


/** Interface for a product summary (used in grids, lists, carousels) */
export interface ProductSummaryModel {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  mainImageUrl: string;
  price: number;
  currency: string;
  stockStatus: StockStatus;
  isNewArrival: boolean;
  isOnSale: boolean;
  rating?: number; // average rating
}

/** Interface for detailed product information (used on PDP) */
export interface ProductDetailModel extends Omit<ProductSummaryModel, 'rating'> {
  description: string;
  fabricDetails: string;
  sizeInfo: string;
  deliveryTime: string;
  highlights: string[];
  images: ProductImageModel[];
  options: ProductOptionModel[];
  relatedProductIds: string[];
  reviewSummary?: ReviewSummaryModel;
}

// --- Mock Product Data ---

const MOCK_PRODUCTS_DETAILS: ProductDetailModel[] = [
  {
    id: "prod_lehenga_01",
    name: "Regal Beige Zari Lehenga Set",
    slug: "regal-beige-lehenga",
    categoryId: "cat_lehengas",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/f3ac01bc-9905-49e8-9bf4-d26623fa9522.png",
    price: 18500,
    currency: "BDT",
    stockStatus: "In Stock",
    isNewArrival: true,
    isOnSale: false,
    description: "A breathtaking, imported lehenga set featuring intricate zari work and mirror embroidery on luxurious silk blend fabric. Perfect for weddings and grand festive celebrations.",
    fabricDetails: "Art Silk Blend, Zari Embroidery, Net Dupatta.",
    sizeInfo: "See size guide for detailed measurements. Available in fixed sizes. Custom tailoring not offered.",
    deliveryTime: "5-7 business days Nationwide.",
    highlights: ["Imported Premium Quality", "Intricate Zari Work", "Soft Luxury Vibe", "Full Length Skirt"],
    images: [
      { id: "img1a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/9da6e8e6-b44a-420d-8cf7-7ea278eb0f1b.png", alt: "Full view of Regal Beige Lehenga", isPrimary: true, size: "large" },
      { id: "img1b", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/5daad313-42b4-4c0c-b41c-12030eebed15.png", alt: "Embroidery detail", isPrimary: false, size: "large" },
      { id: "img1c", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/9055ae44-0b63-4061-b505-5e798f014e95.png", alt: "Back view", isPrimary: false, size: "large" },
    ],
    options: [
      {
        name: "Size",
        type: "select",
        values: [
          { id: "s1", label: "S (UK 8)", value: "S", inStock: true },
          { id: "m1", label: "M (UK 10)", value: "M", inStock: true },
          { id: "l1", label: "L (UK 12)", value: "L", inStock: false },
        ],
      },
    ],
    relatedProductIds: ["prod_bag_02", "prod_dress_04", "prod_indo_05"],
  },
  {
    id: "prod_bag_02",
    name: "Golden Clutch Bag",
    slug: "golden-structured-clutch",
    categoryId: "cat_bags",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/229a37dc-baa0-411c-9008-70072988eea7.png",
    price: 3800,
    currency: "BDT",
    stockStatus: "Low Stock",
    isNewArrival: true,
    isOnSale: false,
    description: "An elegant, structured clutch bag crafted from premium materials with gold-tone hardware. The ideal accessory for festive outfits and evening wear.",
    fabricDetails: "Faux Leather, Metal accents.",
    sizeInfo: "Compact size: 7.5 x 4.5 x 2 inches.",
    deliveryTime: "3-5 business days Nationwide.",
    highlights: ["Soft Luxury Finish", "Perfect Evening Size", "Detachable Chain Strap"],
    images: [
      { id: "img2a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/c6070a66-e4b4-43c6-94ee-d59cf0ad072b.png", alt: "Front view of Golden Clutch", isPrimary: true, size: "large" },
      { id: "img2b", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/0e3c02f6-4698-4074-ba85-45d0556c1de6.png", alt: "Clutch held by hand", isPrimary: false, size: "large" },
      { id: "img2c", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/23c093d0-65bd-4c73-ac5b-3b48900590e2.png", alt: "Interior view", isPrimary: false, size: "large" },
    ],
    options: [],
    relatedProductIds: ["prod_lehenga_01", "prod_bag_06", "prod_dress_04"],
  },
  {
    id: "prod_dress_03",
    name: "Midnight Blue Velvet Dress",
    slug: "midnight-blue-dress",
    categoryId: "cat_indo_western",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/fa6de539-72d6-4741-8206-96237bf0d281.png",
    price: 9200,
    currency: "BDT",
    stockStatus: "In Stock",
    isNewArrival: false,
    isOnSale: true,
    description: "A luxurious party dress made from soft velvet, perfect for evening wear. Features a delicate, modern cut and comfortable fit.",
    fabricDetails: "Premium imported velvet, polyester lining.",
    sizeInfo: "Standard UK/US sizing. True to size.",
    deliveryTime: "3-5 business days Nationwide.",
    highlights: ["Elegant Velvet Texture", "Exclusive Designer Item", "Flattering Silhouette"],
    images: [
        { id: "img3a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/0f3d0a7f-d518-4924-92c1-3d08d8324a84.png", alt: "Full view of velvet dress", isPrimary: true, size: "large" },
        { id: "img3b", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/c1f2f72a-deb8-4ba9-a749-eacd72162c59.png", alt: "Cuff detail", isPrimary: false, size: "large" },
    ],
    options: [
      {
        name: "Size",
        type: "select",
        values: [
          { id: "s3", label: "S", value: "S", inStock: true },
          { id: "m3", label: "M", value: "M", inStock: true },
          { id: "l3", label: "L", value: "L", inStock: true },
        ],
      },
    ],
    relatedProductIds: ["prod_bag_02", "prod_dress_04"],
  },
  {
    id: "prod_dress_04",
    name: "Cranberry Festive Kurta Set",
    slug: "cranberry-festive-kurta",
    categoryId: "cat_indo_western",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/a62777a4-53be-45b7-933e-f26e01fd9b0c.png",
    price: 6500,
    currency: "BDT",
    stockStatus: "In Stock",
    isNewArrival: false,
    isOnSale: false,
    description: "A beautifully tailored kurta set in a rich cranberry hue, featuring intricate embroidery on the neckline and cuffs. Ideal for semi-formal gatherings.",
    fabricDetails: "Cotton Linen Blend.",
    sizeInfo: "Free Size (comes with adjustable ties/elastic waist).",
    deliveryTime: "5-7 business days Nationwide.",
    highlights: ["Breathable Fabric", "Adjustable Fit", "Rich Festive Color"],
    images: [
        { id: "img4a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/b5452dc5-a842-44fd-80a2-d8b42b37e995.png", alt: "Full view of Kurta set", isPrimary: true, size: "large" },
    ],
    options: [
      {
        name: "Size",
        type: "select",
        values: [
          { id: "f1", label: "Free Size", value: "FS", inStock: true },
        ],
      },
    ],
    relatedProductIds: ["prod_lehenga_01", "prod_indo_05"],
  },
  {
    id: "prod_indo_05",
    name: "Emerald Green Pant Suit",
    slug: "emerald-pant-suit",
    categoryId: "cat_indo_western",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/94786b15-bf6b-4a99-9b1d-4974f6418bcb.png",
    price: 11000,
    currency: "BDT",
    stockStatus: "In Stock",
    isNewArrival: true,
    isOnSale: false,
    description: "A sharp and sophisticated Indo-western pant suit in a striking emerald green, designed for power meetings and upscale events.",
    fabricDetails: "Silk Crepe, Georgette Dupatta.",
    sizeInfo: "Standard Sizes S, M, L.",
    deliveryTime: "5-7 business days Nationwide.",
    highlights: ["Jewel Tone Color", "Modern Cut", "Easy Maintenance"],
    images: [
        { id: "img5a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/e26cbbb9-b89e-4e07-bedf-87abee0ac56e.png", alt: "Emerald Suit", isPrimary: true, size: "large" },
    ],
    options: [
      {
        name: "Size",
        type: "select",
        values: [
          { id: "s5", label: "S", value: "S", inStock: true },
          { id: "m5", label: "M", value: "M", inStock: true },
        ],
      },
    ],
    relatedProductIds: ["prod_lehenga_01", "prod_bag_02"],
  },
  {
    id: "prod_bag_06",
    name: "Moonlit White Potli Bag",
    slug: "moonlit-potli-bag",
    categoryId: "cat_bags",
    mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/1c83d3d9-2b13-40fd-97b2-26c907e32d0d.png",
    price: 4500,
    currency: "BDT",
    stockStatus: "In Stock",
    isNewArrival: true,
    isOnSale: false,
    description: "A delicate Potli bag adorned with pearl and bead embellishments, featuring a soft moonlit white color palette. A quintessential festive accessory.",
    fabricDetails: "Silk blend exterior, satin lining.",
    sizeInfo: "9 x 8 inches (drawstring closure).",
    deliveryTime: "3-5 business days Nationwide.",
    highlights: ["Hand-Embroidered", "Elegant Drawstring Design", "Matches all Lehenga colors"],
    images: [
        { id: "img6a", url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/afb9dee3-7c0f-49dd-9a7b-a4a49776b491.png", alt: "Moonlit Potli Bag detail", isPrimary: true, size: "large" },
    ],
    options: [],
    relatedProductIds: ["prod_lehenga_01", "prod_bag_02"],
  },
];


// --- Helper Functions and Catalog Generation ---

export const getProductDetails = (id: string): ProductDetailModel | undefined => {
  const detail = MOCK_PRODUCTS_DETAILS.find(p => p.id === id);
  if (detail) {
      // Inject review summary dynamically
      return {
          ...detail,
          reviewSummary: getReviewSummaryByProductId(id)
      };
  }
  return undefined;
};

export const getProductSummary = (detail: ProductDetailModel): ProductSummaryModel => {
    // Only fetch rating if reviews exist for the product
    const rating = detail.reviewSummary?.averageRating;
    
    return {
        id: detail.id,
        name: detail.name,
        slug: detail.slug,
        categoryId: detail.categoryId,
        mainImageUrl: detail.mainImageUrl,
        price: detail.price,
        currency: detail.currency,
        stockStatus: detail.stockStatus,
        isNewArrival: detail.isNewArrival,
        isOnSale: detail.isOnSale,
        rating: rating && rating > 0 ? rating : undefined,
    };
};

// Map details to summaries for the overall catalog view
export const PRODUCT_CATALOG_SUMMARIES: ProductSummaryModel[] = MOCK_PRODUCTS_DETAILS.map(p => {
    // Inject review summary before creating summary model
    const detailWithReviews = getProductDetails(p.id)!;
    return getProductSummary(detailWithReviews);
});


export const getNewArrivals = (count: number = 4): ProductSummaryModel[] => {
  return PRODUCT_CATALOG_SUMMARIES
    .filter(p => p.isNewArrival)
    .slice(0, count);
};

export const getProductsBySlug = (slug: string): ProductSummaryModel[] => {
    if (slug === 'shop-all') {
        return PRODUCT_CATALOG_SUMMARIES;
    }
    if (slug === 'new-arrivals') {
        return PRODUCT_CATALOG_SUMMARIES.filter(p => p.isNewArrival);
    }
    const categoryMap: { [key: string]: string } = {
        'lehengas': 'cat_lehengas',
        'bags': 'cat_bags',
        'indo-western': 'cat_indo_western',
    };
    const categoryId = categoryMap[slug];

    if (!categoryId) return [];

    return PRODUCT_CATALOG_SUMMARIES.filter(p => p.categoryId === categoryId);
}

export const getRelatedProducts = (currentProductId: string, count: number = 4): ProductSummaryModel[] => {
    const currentDetail = MOCK_PRODUCTS_DETAILS.find(p => p.id === currentProductId);
    if (!currentDetail) return [];

    return currentDetail.relatedProductIds
        .map(id => PRODUCT_CATALOG_SUMMARIES.find(p => p.id === id))
        .filter((p): p is ProductSummaryModel => p !== undefined)
        .slice(0, count);
}


// Filter Configuration (Reusable across shop pages)

export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterConfig {
    key: string;
    label: string;
    type: 'select' | 'checkbox' | 'range' | 'radio';
    options?: FilterOption[];
    minMax?: { min: number, max: number, step: number };
}

export const PRODUCT_FILTERS: FilterConfig[] = [
    {
        key: 'category',
        label: 'Category',
        type: 'checkbox',
        options: [
            { value: 'cat_lehengas', label: 'Lehengas' },
            { value: 'cat_bags', label: 'Bags' },
            { value: 'cat_indo_western', label: 'Indo-Western Wear' },
        ],
    },
    {
        key: 'price',
        label: 'Price Range (BDT)',
        type: 'range',
        minMax: { min: 3000, max: 20000, step: 500 },
    },
    {
        key: 'status',
        label: 'Availability',
        type: 'radio',
        options: [
            { value: 'in_stock', label: 'In Stock Only' },
            { value: 'all', label: 'Show All' },
        ],
    },
];
        
      