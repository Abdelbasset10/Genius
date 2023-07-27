import { getCount } from "@/actions/userApiLimits"
import Navbar from "@/components/dashboard/layout/navbar/Navbar"
import Sidebar from "@/components/dashboard/layout/sidebar/Sidebar"
import { checkSubscription } from "@/lib/subscription"

const DashboardLayout = async ({children}:{children:React.ReactNode}) => {

  const counter = await getCount()
  const isPro = await checkSubscription();


  return (
    <div className=" w-full relative" >
      <div className="hidden md:flex fixed top-0 w-72 h-screen bg bg-gray-900 overflow-y-auto" >
        <Sidebar isPro={isPro} counter={counter} />
      </div>
      <main className="w-full md:pl-72" >
        <Navbar />
        {children}
      </main>
      
    </div>
  )
}

export default DashboardLayout