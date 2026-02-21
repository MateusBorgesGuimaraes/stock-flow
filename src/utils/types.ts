export type PricingPlan = {
  name: string;
  price: {
    currency?: string;
    amount: string;
    period?: string;
  };
  limit: string;
  features: string[];
  cta: string;
  note: string;
  featured?: boolean;
  variant: "primary" | "secondary";
};
