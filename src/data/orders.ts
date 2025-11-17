
        
import { OrderStatus } from "src/utils/types";
import { CartItemModel } from "./cart_data";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

/** Interface for a simple summary line used in Order History */
export interface OrderSummaryItemModel {
  orderId: string;
  date: string; // ISO Date String
  totalAmount: number;
  status: OrderStatus;
  itemCount: number;
}

/** Interface for a detailed order record (used in confirmation and detail pages) */
export interface OrderDetailModel {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  status: OrderStatus;
  items: Omit<CartItemModel, 'cartItemId'>[]; // Cart items without the cart-specific ID
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  trackingNumber?: string;
}

// --- MOCK DATA ---

// Helper function to simulate a detailed item list from order history perspective
const MOCK_ORDER_ITEMS: Omit<CartItemModel, 'cartItemId'>[] = [
    {
        product: {
            id: 'prod_lehenga_01',
            name: "Regal Beige Zari Lehenga Set",
            slug: "regal-beige-lehenga",
            categoryId: "cat_lehengas",
            mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/07ea19a5-e953-4bb6-a81e-a1492d82f552.png",
            price: 18500,
            currency: "BDT",
            stockStatus: "In Stock",
            isNewArrival: true,
            isOnSale: false,
        },
        quantity: 1,
        selectedOptionValue: "M",
        unitPrice: 18500,
        itemTotal: 18500,
    },
    {
        product: {
            id: 'prod_bag_02',
            name: "Golden Clutch Bag",
            slug: "golden-structured-clutch",
            categoryId: "cat_bags",
            mainImageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/17/da994858-0212-4f46-8a40-bbdec0c9990f.png",
            price: 3800,
            currency: "BDT",
            stockStatus: "Low Stock",
            isNewArrival: true,
            isOnSale: false,
        },
        quantity: 2,
        unitPrice: 3800,
        itemTotal: 7600,
    },
];

const DELIVERY_CHARGE = 150;
const SUBTOTAL_AMOUNT = 26100; // 18500 + 7600

export const MOCK_ORDER_CONFIRMATION: OrderDetailModel = {
  orderId: "STYL-20251117-0045",
  date: "2025-11-17",
  customerName: "Tanzila Islam",
  customerEmail: "tanzila.i@example.com",
  shippingAddress: "Flat 4A, Road 10, Gulshan 1, Dhaka 1212, Bangladesh",
  status: "Pending",
  items: MOCK_ORDER_ITEMS,
  paymentMethod: "bKash (Mobile Banking)",
  subtotal: SUBTOTAL_AMOUNT,
  deliveryCharge: DELIVERY_CHARGE,
  total: SUBTOTAL_AMOUNT + DELIVERY_CHARGE, // 26250
  trackingNumber: undefined,
};

export const MOCK_ORDER_HISTORY: OrderSummaryItemModel[] = [
    {
        orderId: MOCK_ORDER_CONFIRMATION.orderId,
        date: "2025-11-17",
        totalAmount: MOCK_ORDER_CONFIRMATION.total,
        status: "Pending",
        itemCount: 3,
    },
    {
        orderId: "STYL-20251020-0044",
        date: "2025-10-20",
        totalAmount: 9280, // Dress 03 + inside city delivery
        status: "Delivered",
        itemCount: 1,
    },
    {
        orderId: "STYL-20250905-0043",
        date: "2025-09-05",
        totalAmount: 6650, // Kurta 04 + inside city delivery
        status: "Delivered",
        itemCount: 1,
    },
];

export const getOrderDetailById = (id: string): OrderDetailModel | undefined => {
    if (id === MOCK_ORDER_CONFIRMATION.orderId) {
        return MOCK_ORDER_CONFIRMATION;
    }
    // Simple lookup simulation for history items
    const historyItem = MOCK_ORDER_HISTORY.find(o => o.orderId === id);
    if (historyItem) {
        // Generate placeholder detail based on summary
        return {
            ...MOCK_ORDER_CONFIRMATION,
            orderId: historyItem.orderId,
            date: historyItem.date,
            total: historyItem.totalAmount,
            status: historyItem.status,
            customerName: "Tanzila Islam",
            customerEmail: "tanzila.i@example.com",
            shippingAddress: "Flat 4A, Road 10, Gulshan 1, Dhaka 1212, Bangladesh",
            items: historyItem.itemCount === 1 ? MOCK_ORDER_ITEMS.slice(0, 1) : MOCK_ORDER_ITEMS,
            deliveryCharge: historyItem.totalAmount > 10000 ? 150 : 80, // Guessing delivery charge
            subtotal: historyItem.totalAmount - (historyItem.totalAmount > 10000 ? 150 : 80),
            paymentMethod: "Cash on Delivery (COD)",
            trackingNumber: historyItem.status === 'Delivered' ? `TN${id.split('-').pop()}` : undefined

        }
    }
    return undefined;
}
        
      