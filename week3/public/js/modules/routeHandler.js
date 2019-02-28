import { showLoadingAnimation, removeLoadingAnimation } from './utils.js'
import { setDataToHTML, setDetailedDataToHTML, renderError } from './renderData.js'
import { getPokemonData, getSinglePokemonData } from './getData.js'

export const home = async () => {
  try {
    showLoadingAnimation()
    const data = await getPokemonData()
    setDataToHTML(data)
  } catch (err) {
    renderError(err)
  } finally {
    removeLoadingAnimation()
  }
}

export const detail = async (name) => {
  try {
    showLoadingAnimation()
    const data = await getSinglePokemonData(name)
    setDetailedDataToHTML(data, name)
  } catch (err) {
    renderError(err)
  } finally {
    removeLoadingAnimation()
  }
}