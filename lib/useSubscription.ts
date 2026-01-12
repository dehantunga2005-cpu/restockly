import { useEffect, useState } from "react";

export type PlanType = "FREE" | "PRO" | "FOUNDER";

export function useSubscription() {
  const [plan, setPlan] = useState<PlanType>("FREE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Şimdilik mock – RevenueCat bağlanınca değişecek
    setPlan("FREE");
  }, []);

  return {
    plan,
    loading,
    isFree: plan === "FREE",
    isPro: plan === "PRO",
    isFounder: plan === "FOUNDER",
    maxProducts: plan === "FREE" ? 1 : Infinity,
  };
}

