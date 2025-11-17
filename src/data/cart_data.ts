
        
import { ProductSummaryModel } from "./products";

/** Interface for an item placed in the cart */
export interface CartItemModel {
  cartItemId: string;
  product: ProductSummaryModel;
  quantity: number;
  selectedOptionValue?: string; // e.g., "M" for size
  unitPrice: number;
  itemTotal: number;
}

/** Interface for the overall cart summary */
export interface CartSummaryModel {
  items: CartItemModel[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
}


// --- MOCK DATA ---
import { PRODUCT_CATALOG_SUMMARIES }  from "./products";

const sampleProduct1 = PRODUCT_CATALOG_SUMMARIES[0]!; // Regal Beige Lehenga
const sampleProduct2 = PRODUCT_CATALOG_SUMMARIES[1]!; // Golden Clutch Bag

export const MOCK_CART_ITEMS: CartItemModel[] = [
  {
    cartItemId: "cart_001",
    product: sampleProduct1,
    quantity: 1,
    selectedOptionValue: "M",
    unitPrice: sampleProduct1.price,
    itemTotal: sampleProduct1.price,
  },
  {
    cartItemId: "cart_002",
    product: sampleProduct2,
    quantity: 2,
    unitPrice: sampleProduct2.price,
    itemTotal: sampleProduct2.price * 2,
  },
];

// Calculate basic subtotal
const calculatedSubtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.itemTotal, 0);

export const getCartSummary = (deliveryCharge: number = 0): CartSummaryModel => {
    const subtotal = calculatedSubtotal;
    return {
        items: MOCK_CART_ITEMS,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        total: subtotal + deliveryCharge,
    };
};
        
      