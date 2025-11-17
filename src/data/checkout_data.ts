
        

/** Defines a geographic area for delivery calculation */
export type DeliveryZone = "Inside City" | "Outside City";

/** Interface for Delivery charge structure */
export interface DeliveryChargeModel {
  id: string;
  zone: DeliveryZone;
  description: string;
  rate: number; // in BDT
  estimatedDays: string;
}

/** Interface for Payment Method information */
export interface PaymentMethodModel {
  id: string;
  name: string;
  type: "COD" | "Mobile_Banking" | "Bank_Transfer";
  iconName: string;
  details?: string; // Instructions or account info
}

// --- MOCK DATA ---

export const DELIVERY_OPTIONS: DeliveryChargeModel[] = [
  {
    id: "del_inside",
    zone: "Inside City",
    description: "Dhaka Metro area delivery",
    rate: 80, // BDT
    estimatedDays: "2-3 business days",
  },
  {
    id: "del_outside",
    zone: "Outside City",
    description: "Nationwide delivery (outside Dhaka)",
    rate: 150, // BDT
    estimatedDays: "4-7 business days",
  },
];

export const PAYMENT_METHODS: PaymentMethodModel[] = [
  {
    id: "pay_cod",
    name: "Cash on Delivery (COD)",
    type: "COD",
    iconName: "DollarSign",
    details: "Pay in cash upon receiving your order. Only available for select zones.",
  },
  {
    id: "pay_bkash",
    name: "bKash (Mobile Banking)",
    type: "Mobile_Banking",
    iconName: "CreditCard",
    details: "Pay via bKash. Instructions will be provided on the next screen.",
  },
  {
    id: "pay_nagad",
    name: "Nagad (Mobile Banking)",
    type: "Mobile_Banking",
    iconName: "CreditCard",
    details: "Pay via Nagad. Instructions will be provided on the next screen.",
  },
  {
    id: "pay_bank",
    name: "Bank Transfer",
    type: "Bank_Transfer",
    iconName: "Banknote",
    details: "Transfer payment directly to our bank account. Details provided on confirmation page.",
  },
];
        
      