import { errorHandling} from '../utilities/errorHandling.js'
import { getLocalStorageData, getPokemonData, getSinglePokemonData } from './getData.js'

const dataDecider = async (name) => {

  if (localStorage.getItem(name)) {
    return getLocalStorageData()
  } else if (window.location.hash) {
    const [err, data] = await errorHandling(getSinglePokemonData(name))
    if (!data) throw err

    return data
  } else {
    const [err, data] = await errorHandling(getPokemonData())
    if (!data) throw err

    return data
  }
}

export { dataDecider }