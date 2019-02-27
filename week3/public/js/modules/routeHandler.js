import { errorHandling } from './utils.js'
import { setDataToHTML, setDetailedDataToHTML } from './renderData.js'
import { getPokemonData, getSinglePokemonData } from './getData.js'

export const home = async () => {
  const [err, data] = await errorHandling(getPokemonData())
  if (!data) throw err

  setDataToHTML(data)
}

export const detail = async (name) => {
  const [err, data] = await errorHandling(getSinglePokemonData(name))
  if (!data) throw err

  setDetailedDataToHTML(data)
}