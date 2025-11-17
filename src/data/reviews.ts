
        

/** Interface for a single detailed customer review */
export interface ReviewModel {
  id: string;
  productId: string;
  productName: string;
  authorName: string;
  rating: number; // 1 to 5
  date: string; // ISO date string
  title: string;
  body: string;
  isVerified: boolean;
}

/** Interface for basic review statistics */
export interface ReviewSummaryModel {
  averageRating: number;
  totalReviews: number;
  byRating: { [key: number]: number }; // Count of reviews per rating (1-5)
  productId?: string; // Optional, if global summary
}

export const MOCK_REVIEWS: ReviewModel[] = [
  {
    id: "rev1",
    productId: "prod_lehenga_01",
    productName: "Regal Beige Lehenga Set",
    authorName: "Ayesha K.",
    rating: 5,
    date: "2025-11-01",
    title: "Absolutely stunning!",
    body: "The quality of the fabric and the embroidery work is far superior to anything I've found locally. It fit perfectly and I received so many compliments.",
    isVerified: true,
  },
  {
    id: "rev2",
    productId: "prod_lehenga_01",
    productName: "Regal Beige Lehenga Set",
    authorName: "Nusrat J.",
    rating: 4,
    date: "2025-10-25",
    title: "Gorgeous outfit, minor delay in shipping",
    body: "Love the elegant design. The color is exactly like the picture. Shipping took a few extra days than quoted, but worth the wait.",
    isVerified: true,
  },
  {
    id: "rev3",
    productId: "prod_bag_02",
    productName: "Golden Clutch Bag",
    authorName: "Sadia A.",
    rating: 5,
    date: "2025-11-10",
    title: "Perfect accessory!",
    body: "This clutch is the epitome of soft luxury. It matches all my festive outfits and the size is just right for essentials.",
    isVerified: true,
  },
  {
    id: "rev4",
    productId: "prod_dress_03",
    productName: "Midnight Blue Velvet Dress",
    authorName: "Fariha M.",
    rating: 5,
    date: "2025-09-15",
    title: "Elegant and comfortable",
    body: "The velvet is incredibly soft. I wore it for a formal dinner and felt absolutely amazing. Stylaura never disappoints!",
    isVerified: false, // Not verified initially, perhaps purchase wasn't tracked fully
  },
];

export const MOCK_TESTIMONIALS: ReviewSummaryModel[] = [
    {
      averageRating: 5.0,
      totalReviews: 125,
      byRating: { 5: 110, 4: 15, 3: 0, 2: 0, 1: 0 },
      productId: undefined, // Global summary
    },
];

export const getReviewsByProductId = (productId: string): ReviewModel[] => {
    return MOCK_REVIEWS.filter(r => r.productId === productId);
}

export const getReviewSummaryByProductId = (productId: string): ReviewSummaryModel => {
    const reviews = getReviewsByProductId(productId);
    const totalReviews = reviews.length;
    let totalRating = 0;
    const byRating: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(r => {
        totalRating += r.rating;
        byRating[r.rating] = (byRating[r.rating] || 0) + 1;
    });

    const averageRating = totalReviews > 0 ? (totalRating / totalReviews) : 0;

    return {
        productId,
        averageRating: parseFloat(averageRating.toFixed(2)),
        totalReviews,
        byRating
    };
}
        
      