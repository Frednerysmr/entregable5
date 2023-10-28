import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"


const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setTrainerName(e.target.trainerName.value))
        navigate("/pokedex")
        
    }
  return (
    <main className="h-screen grid grid-rows-[1fr_auto] font-[TheGoodMonolith]">
        <section className="max-w-[650px] m-auto grid place-content-center text-center">
            <div>
                <div>
                    <img src="/images/logo.png" alt="Logo" className="max-w-[500px]"/>
                </div>
                <h3 className="text-rose-600 text-4xl font-semibold">Hi Coach!</h3>
                <p className="text-zinc-800 font-medium text-lg">To start give me your name:</p>
                <form onSubmit={handleSubmit}>
                    <input name="trainerName" type="text" placeholder="Your name..." className="mt-5text-black outline-none bg-white shadow w-[300px] h-[35px]" />
                    <button className=" text-base text-white font-semibold bg-red-500 w-20 active:scale-[.98] active:duration-75 hover:scale-[1.06] ease-out transition-all w-20 py-[6px]">Start!</button>
                </form>
            </div>
        </section>
        <footer>
            <div className="bg-red-500 h-16"></div>
            <div className="bg-black h-12 relavive">
                <div className="h-[70px] w-[70px] bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
                    <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
                </div>
            </div>
        </footer>
    </main>
  )
}

export default Home