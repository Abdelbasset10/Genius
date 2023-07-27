import { Settings } from "lucide-react";

import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/dashboard/settings/SubscriptionButton";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div className="w-full py-4" >
      <div className="w-11/12 mx-auto" >
        <div className="flex items-center gap-2" >
          <div className="p-2 rounded-lg bg-zinc-500/10" >
            <Settings className="w-10 h-10 text-zinc-500" />
          </div>
          <div className="flex flex-col" >
            <h1 className="text-2xl font-bold" >Conversation</h1>
            <p className="text-neutral-500" >Our mose advanced conversation model</p>
          </div>
        </div>
        <div className="mt-4">
            <div className="text-muted-foreground text-sm mb-2">
                {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
            </div>
                <SubscriptionButton isPro={isPro} />
        </div>
      </div>

    </div>
   );
}
 
export default SettingsPage;