import { errorHandling } from '../utilities/errorHandling.js'
import { filterData } from './filterData.js'

/* If the data is available from the localStorage, 
   retrieve it from there */
const getLocalStorageData = () => {
  const pokemons = []

  for (const key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
      pokemons.push(JSON.parse(localStorage.getItem(key)))
    }
  }

  return pokemons.sort((a, b) => a.id - b.id)
}

/* Fetch all Pokemon URL's (max is 897) */
const getPokemonURL = async () => {
  const [err, data]  = await errorHandling((await fetch('https://pokeapi.co/api/v2/pokemon/?limit=24&offset=0')).json())
  if(!data) throw err
  
  return data.results
}

/* Fetch all details per Pokemon based on retrieved URL */
const getPokemonData = async () => {
  try {
    const pokemonURL = await getPokemonURL()

    const data = pokemonURL.map(async result => {
      return await (await fetch(`${result.url}`)).json()
    })
    console.log(await Promise.all(data))

    return await Promise.all(filterData(data))
  } catch (err) {
    throw err
  }
}

/* Fetch data from one Pokemon based on the 
   window location hash and return filtered data */
const getSinglePokemonData = async (name) => {
  const [err, data] = await errorHandling((await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json())
  if(!data) throw err

  return filterData(data)
}

export { getLocalStorageData, getPokemonData, getSinglePokemonData }