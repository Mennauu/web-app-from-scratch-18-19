import { errorHandling } from './await-error-handling.js'
import { getPokemonData } from './get-data.js'

const filteredPokemonData = async () => {
  const [err, data] = await errorHandling(getPokemonData())
  if (!data) throw err

  return data.map(filteredSinglePokemonData)
}

const filteredSinglePokemonData = ({ id, name, sprites, height, weight, types, stats }) => {
  return {
    id,
    name,
    image: sprites.front_default,
    height,
    weight,
    types,
    stats
  }
}

export { filteredPokemonData, filteredSinglePokemonData }