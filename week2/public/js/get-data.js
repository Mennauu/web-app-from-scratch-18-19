/* Fetch all Pokemon URL's */
const getPokemonURL = async () => {
  try {
    const data = await (await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')).json()
    return data.results
  } catch (err) { 
    alert( err) 
  }
}

/* Fetch all details per Pokemon based on given name */
const getPokemonData = async () => {
  try {
    const pokemonURL = await getPokemonURL()

    const data = pokemonURL.map(async result => {
      return await (await fetch(`${result.url}`)).json()
    })

    return await Promise.all(data)
  } catch (err) {
    alert(err)
  }
}

/* Fetch data from one Pokemon (detail page) */
const getSinglePokemonData = async () => {
  try {
    const pokemonURL = await getPokemonURL()
    const data = pokemonURL.filter(result => { return `#${result.name}` == window.location.hash })
    
    return await (await fetch(data[0].url)).json()
  } catch (err) {
    alert(err)
  }
}

// /* Fetch single pokemon description */
// const getSinglePokemonDescription = async () => {
//   try {
//     const data = await getSinglePokemonData()
//     const descriptionURL = data.species.url

//     console.log(descriptionURL)

//   } catch (err) {
//     alert(err)
//   }
// }

export { getPokemonData, getSinglePokemonData}