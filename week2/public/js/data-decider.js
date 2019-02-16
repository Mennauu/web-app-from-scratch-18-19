import { errorHandling } from './await-error-handling.js'
import { filteredPokemonData } from './filter-data.js'
import { getLocalStorageData, getSinglePokemonData } from './get-data.js'

const dataDecider = async (name) => {

  if(localStorage.getItem('bulbasaur' || name)) {
    return getLocalStorageData()
  } else if(window.location.hash) {
    const [err, data] = await errorHandling(getSinglePokemonData(name))
    if(!data) throw err

    return data
  } else {
    const [err, data] = await errorHandling(filteredPokemonData())
    if(!data) throw err

    return data
  }
}

export { dataDecider }