"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe");
      const response = await res.json()
      window.location.href = response.url;
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      router.refresh()
    }
  };

  return (
    <Button variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick} >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
};