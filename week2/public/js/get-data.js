import { errorHandling } from './await-error-handling.js'

/* If the data is available from the localStorage, retrieve
   it from there */
const getLocalStorageData = () => {
  const pokemons = []

  for (const key in localStorage) {
    if(localStorage.hasOwnProperty(key)) {
      pokemons.push(JSON.parse(localStorage.getItem(key)))
    }
  }

  return pokemons.sort((a, b) => a.id - b.id)
}

/* Fetch all Pokemon URL's and covert to JSON (max is 897) */
const getPokemonURL = async () => {
  const [err, data]  = await errorHandling((await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800')).json())
  if(!data) throw err
  
  return data.results
}

/* Fetch all details per Pokemon based on retrieved URL,
   convert to JSON */
const getPokemonData = async () => { 
  try {
    const pokemonURL = await getPokemonURL()

    const data = pokemonURL.map(async result => {
      return await (await fetch(`${result.url}`)).json()
    })

    return await Promise.all(data)
  } catch (err) {
    throw err
  }
}

/* Fetch data from one Pokemon based on the 
   window location hash (by Routie), convert to JSON */
const getSinglePokemonData = async (name) => {
  const [err, data] = await errorHandling((await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json())
  if(!data) throw err

  return data
}

export { getLocalStorageData, getPokemonData, getSinglePokemonData }