
const layout = ({children} : {children :React.ReactNode}) => {
  return (
    <div className="h-full bg-[#111827] overflow-auto" >
        {children}
    </div>
  )
}

export default layout