/* Array where we save all the pokemon data */
let allPokemon = []

export const setAllPokemon = (data) => {
  allPokemon = data;
}

export const getAllPokemon = () => {
  return allPokemon;
}

export const getSinglePokemon = (name) => {
  return allPokemon.find(object => object.name === name)
}

export const isAllPokemonEmpty = () => {
  return allPokemon.length === 0;
}

export const addSinglePokemon = (pokemon) => {
  allPokemon.push(pokemon)
}