'use strict'

import { errorHandling } from './modules/utils.js'
import { setDataToHTML, setDetailedDataToHTML } from './modules/renderData.js'
import { sortData } from './modules/sortData.js'
import { dataDecider } from './modules/dataDecider.js'
import './modules/routie.js'

routie({
  // Homepage
  '': async () => {

    // const select = document.querySelector('.sort-pokemons')

    // select.addEventListener('change', async () => {
    //   const selectValue = select.options[select.selectedIndex].value;
    //   const [err, data] = await errorHandling(sortData(selectValue))
    //   if (!data) throw err

    //   setDataToHTML(data)
    // })

    const [err, data] = await errorHandling(dataDecider())
    if (!data) throw err

    setDataToHTML(data)
  },
  // Detail page
  ':name': (name) => {
    setDetailedDataToHTML(name)
  }
})
