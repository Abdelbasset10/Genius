import Image from "next/image"

interface Props {
    label:string
}

const Empty = ({label} : Props) => {
  return (
    <div className="flex flex-col items-center justify-center" >
        <div className="w-72 h-72 relative" >
            <Image src="/empty.png" fill alt="empty image" />
        </div>
        <p className="text-zinc-500" >{label}</p>

    </div>
  )
}

export default Empty