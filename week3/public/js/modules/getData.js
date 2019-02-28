import { filterSingleData, filterAllData } from './filterData.js'
import { setAllPokemon, getAllPokemon, isAllPokemonEmpty, getSinglePokemon, addSinglePokemon } from './cache.js';

/* Fetch all Pokemon URL's (max is 897) */
const getPokemonURL = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800')
  /* If we get no response from the API throw an error */
  if(res.status === 404){
    throw Error("Het ziet er naar uit dat we op het moment geen Pokemon op kunnen halen. Probeer het later nog eens.");
  }
  /* Convert response to JSON */
  const data = await res.json()

  return data.results;
}

/* Fetch all details per Pokemon based 
   on retrieved URL and return it filtered */
export const getPokemonData = async () => {
  /* Check if allPokemon array is empty */
  if (isAllPokemonEmpty()) {
    /* Retrieve all the pokemon URLS */
    const pokemonURL = await getPokemonURL()
    /* Fetch all data based on url */
    const data = pokemonURL.map(async result => {
      return await (await fetch(`${result.url}`)).json()
    })
    /* Resolve all promises */
    const dataObjects = await Promise.all(data)
    /* Filter all data objects */
    const filteredData = filterAllData(dataObjects)
    /* Set all data to allPokemon array */
    setAllPokemon(filteredData)
    /* Return filtered data objects */
    return filteredData
  }
  /* Return data from allPokemon array */
  return getAllPokemon()
}

/* Fetch data from one Pokemon based on the 
   name and return it filtered */
export const getSinglePokemonData = async (name) => {
    /* Get data off concerning pokemon from allPokemon array */
    const singlePokemon = getSinglePokemon(name)
    /* If there is no data (pokemon is undefined), we make an api
      call to retrieve the data from the single pokemon */
    if (singlePokemon === undefined) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      /* If we get no response from the API throw an error */
      if(res.status === 404) {
         throw Error("Het ziet er naar uit dat we de pokemon waar je naar op zoek bent niet kunnen vinden. Heb je wellicht een typefout gemaakt? Probeer het anders later nog eens.");
      }
      /* Convert response to JSON */
      const data = await res.json()
      /* Filter data */
      const filteredData = filterSingleData(data)
      /* Push data from single pokemon to allPokemon array */
      addSinglePokemon(filteredData)

      return filteredData
    }

    return singlePokemon
}