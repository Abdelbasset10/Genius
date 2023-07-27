import Image from "next/image"

const Loader = () => {
  return (
    <div className="w-full py-4 bg-neutral-100 flex flex-col gap-4 mt-4 rounded-lg items-center justify-center" >
        <div className=" w-10 h-10 relative" >
            <Image src="/logo.png" fill alt="loder img" className="animate-spin" />
        </div>
        <p className="text-zinc-500" >Genius is thinking...</p>

    </div>
  )
}

export default Loader