import { errorHandling } from './await-error-handling.js'
import { filteredPokemonData } from './filter-data.js'
import { getLocalStorageData } from './get-data.js'

const allDataHTMLMarkUp = async () => {
  if (localStorage.getItem('bulbasaur')) {
    return getLocalStorageData()
  } else {
    const [err, data] = await errorHandling(filteredPokemonData())
    if(!data) throw err
  
    return data
  }
}

export { allDataHTMLMarkUp }