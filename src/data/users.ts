
        
import { ProductSummaryModel, PRODUCT_CATALOG_SUMMARIES } from "./products";

/** Interface for a saved address */
export interface AddressModel {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

/** Interface for an item saved in the wishlist */
export interface WishlistItemModel {
  wishlistId: string;
  productId: string;
  productSummary: ProductSummaryModel;
  addedDate: string; // ISO date string
}

/** Interface for the main user account profile */
export interface UserAccountModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  totalOrders: number;
}

// --- MOCK DATA ---

export const MOCK_USER_ACCOUNT: UserAccountModel = {
  id: "user_001",
  firstName: "Tanzila",
  lastName: "Islam",
  email: "tanzila.i@example.com",
  phone: "+880 1XXXXXXXXX",
  avatarUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/e7b4ec31-8367-4271-8ccd-1dc0f712a869.png",
  totalOrders: 3,
};

export const MOCK_ADDRESSES: AddressModel[] = [
  {
    id: "addr_home",
    label: "Home (Default)",
    recipientName: "Tanzila Islam",
    phone: MOCK_USER_ACCOUNT.phone,
    streetAddress: "Flat 4A, Road 10, Gulshan 1",
    city: "Dhaka",
    postCode: "1212",
    country: "Bangladesh",
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr_work",
    label: "Office Address",
    recipientName: "Tanzila Islam",
    phone: MOCK_USER_ACCOUNT.phone,
    streetAddress: "Level 8, Tower B, Kawran Bazar",
    city: "Dhaka",
    postCode: "1215",
    country: "Bangladesh",
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

const product1 = PRODUCT_CATALOG_SUMMARIES.find(p => p.id === 'prod_dress_03')!;
const product2 = PRODUCT_CATALOG_SUMMARIES.find(p => p.id === 'prod_indo_05')!;

export const MOCK_WISHLIST: WishlistItemModel[] = [
  {
    wishlistId: "wish_001",
    productId: product1.id,
    productSummary: product1,
    addedDate: "2025-10-15",
  },
  {
    wishlistId: "wish_002",
    productId: product2.id,
    productSummary: product2,
    addedDate: "2025-11-01",
  },
];
        
      