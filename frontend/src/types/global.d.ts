export {};

// Ambient declaration for CSS file imports
declare module "*.css";
declare module "*.module.css";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Client-Side Public Variables (Exposed to Browser)
      NEXT_PUBLIC_API_BASE_URL?: string;
      NEXT_PUBLIC_RAZORPAY_KEY_ID?: string;
      NEXT_PUBLIC_APP_NAME?: string;
      NEXT_PUBLIC_APP_URL?: string;

      // Server-Side Private Variables (Server & API Routes Only)
      RAZORPAY_KEY_SECRET?: string;
      JWT_SECRET?: string;
      MONGODB_URI?: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }

  /**
   * Razorpay Web Checkout JS SDK Configuration Options
   */
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id?: string;
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    }) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
      backdrop_color?: string;
    };
    modal?: {
      ondismiss?: () => void;
      escape?: boolean;
      backdropclose?: boolean;
    };
  }

  /**
   * Razorpay Checkout Instance Methods
   */
  interface RazorpayInstance {
    open: () => void;
    on: (
      event: "payment.failed",
      callback: (response: {
        error: {
          code: string;
          description: string;
          source: string;
          step: string;
          reason: string;
          metadata: Record<string, unknown>;
        };
      }) => void
    ) => void;
  }

  /**
   * Global Window Extensions for External SDKs
   */
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}