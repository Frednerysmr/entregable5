const HearderPokeball = () => {
  return (
    <header>
     <div className="bg-red-500 h-16">
        <div className="h-full pl-4">
            <img className="h-[36px] xxs:h-full w-auto translate-y-4 relative z-10" src="/images/logo.png" alt="Logo" />
        </div>
     </div>
        <div className="bg-black h-12 relavive">
         <div className="h-[70px] w-[70px] bg-white border-8 border-black rounded-full absolute right-0 -translate-x-1/2 -translate-y-[20%] grid place-content-center">
         <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
        </div>
        </div>
    </header>

  )
}

export default HearderPokeball