import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PokemonList from "../components/pokedex/PokemonList"
import HearderPokeball from "../components/layouts/HearderPokeball"
import { paginateData } from "../utils/pagination"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const trainerName = useSelector((store) => store.trainerName)

    const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(pokemonName))

    const {itemsInCurrentPage, lastPage, pagesInCurrentBlock} = paginateData(pokemonsByName, currentPage)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value.toLowerCase().trim())
    }

    const handleChangeType = (e) => {
        setCurrentType(e.target.value)
    }

    const handlePreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
        }

    }

    const handleNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage) setCurrentPage(newCurrentPage)
    }

    //? Trae todos los pokemons
  useEffect(() =>{
    if(currentType === ""){
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({data}) => setPokemons(data.results))
        .catch((err) => console.log(err))
    }
  },[currentType])

  //? Trae todos los types disponibles para los pokemons
  useEffect(() =>{
    axios
        .get("https://pokeapi.co/api/v2/type")
        .then(({data}) => setTypes(data.results))
        .catch((err) => console.log(err))
  }, [])

  //? Traer todos los pokemons con base a un tipo
  useEffect(() =>{
    if(currentType !== ""){
        axios
            .get(`https://pokeapi.co/api/v2/type/${currentType}`)
            .then(({data}) => {
                setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
            })
            .catch((err) => console.log(err))
    }
  }, [currentType])

  //? Reseteo de pagina actual al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1)
  },[currentType])

  return (
    <main>
        <HearderPokeball />
        <section>
            <p className="text-zinc-800 text-2xl font-bold text-center mt-10">
                <span className="text-rose-600 text-2xl font-bold">Welcome {trainerName}, </span>
                here you can find your favorite pokemon
            </p>
            <form onSubmit={handleSubmit} className="flex gap-4  items-center justify-center mt-10">
                <div>
                    <input name="pokemonName" type="text" className="text-black outline-none bg-white shadow sm:w-[300px] sm:h-[35px]" />
                    <button className=" text-base text-white font-semibold bg-red-500 w-20 active:scale-[.98] active:duration-75 hover:scale-[1.06] ease-out transition-all sm:w-20 sm:py-[6px]">Search</button>
                </div>
                
                <select onChange={handleChangeType} className="capitalize bg-white shadow md:w-[300px] md:h-[35px]">
                    <option value="">All pokemons</option>
                    {
                        types.map((type) => <option value={type.name} key={type.url}>{type.name}</option>)
                    }
                </select>
            </form>
        </section>
        <PokemonList pokemons={itemsInCurrentPage} />
    
        <ul className="flex justify-center gap-4 flex-wrap">
            {currentPage !== 1 && (
                <li>
                 <button onClick={handlePreviusPage} className="text-center font-bold px-5 py-2 mb-4 text-2xl">{"<"}</button>
                </li>
            )}
            {pagesInCurrentBlock.map((page) => (
            <li key ={page}>
                <button onClick={() => setCurrentPage(page)} className={` text-white font-bold px-5 py-2 mb-4 text-2xl  ${currentPage === page ? "bg-red-500" : "bg-red-400"}`}>{page}</button>
            </li>
            ))}
            {currentPage !== lastPage && (
                <li>
                 <button onClick={handleNextPage} className="text-center font-bold px-5 py-2 mb-4 text-2xl">{">"}</button>
                </li>
                )}
        </ul>
    </main>
  )
}

export default Pokedex