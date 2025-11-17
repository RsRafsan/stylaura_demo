
        

export interface CategorySummaryModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  linkPath: string;
  isFeatured: boolean;
}

export const CATEGORIES_DATA: CategorySummaryModel[] = [
  {
    id: "cat_lehengas",
    name: "Lehengas",
    slug: "lehengas",
    description: "Premium imported lehengas for weddings and festive occasions.",
    thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/68cb07eb-eea8-4be8-95de-d40eba4df835.png",
    linkPath: "/category/lehengas",
    isFeatured: true,
  },
  {
    id: "cat_bags",
    name: "Stylish Bags",
    slug: "bags",
    description: "Curated collection of stylish and functional bags.",
    thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/adb21e90-9a62-463b-948d-f8377d3be3f8.png",
    linkPath: "/category/bags",
    isFeatured: true,
  },
  {
    id: "cat_indo_western",
    name: "Indo-Western Wear",
    slug: "indo-western",
    description: "Modern fusion outfits for parties and casual events.",
    thumbnailUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/b367f1d9-9b4e-4190-8018-b4692bc0343e.png",
    linkPath: "/category/indo-western",
    isFeatured: false,
  },
    {
    id: "cat_new_arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest additions to our Stylaura collection.",
    thumbnailUrl: "", // No dedicated thumbnail needed as it's often a feed
    linkPath: "/category/new-arrivals",
    isFeatured: true,
  },
];

export const getFeaturedCategories = () => CATEGORIES_DATA.filter(c => c.isFeatured && c.slug !== 'new-arrivals');
export const getCategoryBySlug = (slug: string) => CATEGORIES_DATA.find(c => c.slug === slug);
        
      