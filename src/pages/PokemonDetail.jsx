import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HearderPokeball from "../components/layouts/HearderPokeball"
import { bgByType } from "../components/constants/pokemon"

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)
  console.log(pokemon)

  const {pokemonId} = useParams()

  const firstType = pokemon?.types[0].type.name

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255
    const percentSatat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
    return `${percentSatat}%`
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({data}) => setPokemon(data))
      .catch((err) => console.log(err))
  }, [])

  return (
   <main className="text-center capitalize font-[TheGoodMonolith]">
    <HearderPokeball  />
    <article className="max-w-[500px] mx-auto py-10 px-2 relative pt-14 border-2 mt-[200px]">
      <header className={`absolute w-full top-0 right-0 -translate-y-2/3 rounded-md ${bgByType[firstType]}`}>
        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" className="max-w-[180px] mx-auto"/>
      </header>
      <h3 className="mt-4 text-lg">#{pokemon?.id}</h3>
      <h2 className="font-bold text-xl">{pokemon?.name}</h2>
      <ul className="text-sm p-2">
        <li className="grid grid-cols-2 gap-1">
          <h3 className="text-xs text-slate-700">Weight</h3>
          <h3 className="text-xs text-slate-700">Height</h3>
          <span className="text-lg font-bold">{pokemon?.weight}</span>
          <span className="text-lg font-bold">{pokemon?.height}</span>
        </li>
      </ul>
      <div className="grid grid-cols-2">
      <ul className="grid grid-cols-2 gap-2">
      <h3 className="col-span-2 text-lg font-bold">Type</h3>
        {pokemon?.types.map((type) => ((<li key={type.type.name} >
          <h3 className={`border-2 font-mono ${bgByType[type.type.name]}`}>{type.type.name}</h3>
          </li>)))}
    </ul>
    <ul className="grid grid-cols-2 gap-2">
    <h3 className="col-span-2 text-lg font-bold">Habilidades</h3>
    {pokemon?.abilities.slice(0,2).map((abi) => ((<li key={abi.ability.name} >
            <h3 className="border-2 font-mono">{abi.ability.name}</h3>
          </li>)))}
    </ul>
    </div>

      {/* Stats */}
      <section className="mt-5">
        <h3 className="text-start font-semibold text-3xl">stats</h3>
        <ul className="grid gap-4">
          {
            pokemon?.stats.map((stat) => (
            <li className="capitalize" key={stat.stat.name}>
              <div className="flex justify-between items-center text-base">
                <h5>{stat.stat.name}</h5>
                <span>{stat.base_stat}/255</span>
              </div>
              {/* Total Bar */}
              <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                {/* Bar Progress stat */}
                <div style={{width: getPercentStat(stat.base_stat)}} className="bg-gradient-to-r from-amber-200 to-amber-500 h-full"></div>
              </div>
            </li>
          ))}
        </ul>
        </section>
    </article>
    <article className="max-w-[500px] mx-auto py-10 px-2 pt-14  border-2 mt-10 mb-10 bg-white rounded shadow">
      <div className="text-center ">
      <h2 className="text-3xl font-semibold">Movements</h2>
      </div>
      <ul className="grid grid-cols-4 gap-2 mt-7">
        {
          pokemon?.moves.slice(0,30).map((move) => (
            <li key={move.move.url} className="border-2 rounded-lg border-black">{move.move.name}

            </li>
          ))

        }
      </ul>

    </article>

   </main>
  )
}

export default PokemonDetail