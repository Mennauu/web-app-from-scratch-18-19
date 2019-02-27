import { errorHandling } from './utils.js'
import { filterSingleData, filterAllData } from './filterData.js'
import { setAllPokemon, getAllPokemon, isAllPokemonEmpty, getSinglePokemon, addSinglePokemon } from './cache.js';

/* If the data is available from the 
   localStorage, retrieve it from there */
export const getLocalStorageData = () => {
  const pokemons = []

  /* Loop through all the items in LocalStorage */
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      /* Push all data from localStorage to array */
      pokemons.push(JSON.parse(localStorage.getItem(key)))
    }
  }
  /* return array with LocalStorage data and sort it on id */
  return pokemons.sort((a, b) => a.id - b.id)
}

/* Fetch all Pokemon URL's (max is 897) */
const getPokemonURL = async () => {
  const [err, data] = await errorHandling((await fetch('https://pokeapi.co/api/v2/pokemon/?limit=24&offset=0')).json())
  if (!data) throw err

  return data.results
}

/* Fetch all details per Pokemon based 
   on retrieved URL and return it filtered */
export const getPokemonData = async () => {
  try {

    if(isAllPokemonEmpty()) {
      /* Retrieve all the pokemon URLS */
      const pokemonURL = await getPokemonURL()

      /* Fetch all data based on url */
      const data = pokemonURL.map(async result => {
        return await (await fetch(`${result.url}`)).json()
      })

      /* Resolve all promises */
      const dataObjects = await Promise.all(data)

      /* Filter all data objects */
      const filteredData = await filterAllData(dataObjects)

      setAllPokemon(filteredData)

      /* Return filtered data objects */
      return filteredData
    }

    return getAllPokemon()

  } catch (err) {
    throw err
  }
}

/* Fetch data from one Pokemon based on the 
   window location hash and return it filtered */
export const getSinglePokemonData = async (name) => {

  const singlePokemon = getSinglePokemon(name)

  if(singlePokemon === undefined) {
    const [err, data] = await errorHandling((await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json())
    if (!data) throw err

    const filteredData = filterSingleData(data)

    addSinglePokemon(filteredData)

    return filteredData
  }

  return singlePokemon
}