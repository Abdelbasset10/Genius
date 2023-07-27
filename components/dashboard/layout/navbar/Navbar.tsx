import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "../sidebar/MobileSidebar";
import { getCount } from "@/actions/userApiLimits";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {

    const counter = await getCount()
    const isPro = await checkSubscription();

    return (
        <nav className="relative w-full flex items-center justify-end px-4 py-2" >
            <div className="absolute top-4 left-4 md:hidden" >
                <MobileSidebar isPro={isPro} counter={counter} />
            </div>
            <UserButton afterSignOutUrl="/" />
        </nav>
    )
}

export default Navbar