'use strict'

import { errorHandling } from './utilities/errorHandling.js'
import { setDataToHTML, setDetailedDataToHTML } from './modules/renderData.js'
import { sortData } from './modules/sortData.js'
import { dataDecider } from './modules/dataDecider.js'
import './modules/routie.js'

routie({
  // Homepage
  '': async () => { 
    const firstSection = document.querySelector('main > section')
    const HTMLMarkup = 
      `<select class="sort-pokemons">
         <option value="1">Laagste nummer (eerst)</option>
         <option value="2">Hoogste nummer (eerst)</option>
         <option value="3">van A tot Z</option>
         <option value="4">van Z tot A</option>
       </select>
       <ul class="list-container"></ul>`
    
    while (firstSection.firstChild) firstSection.removeChild(firstSection.firstChild)
    firstSection.insertAdjacentHTML('afterbegin', HTMLMarkup)

    const select = document.querySelector('.sort-pokemons')

    select.addEventListener('change', async () => {
      const selectValue = select.options[select.selectedIndex].value;
      const [err, data] = await errorHandling(sortData(selectValue))
      if(!data) throw err
      
      setDataToHTML(data)
    })

    const [err, data] = await errorHandling(dataDecider())
    if(!data) throw err

    setDataToHTML(data)
  },
   // Detail page
  ':name': (name) => {
    const firstSection = document.querySelector('main > section')
    while (firstSection.firstChild) firstSection.removeChild(firstSection.firstChild)

    setDetailedDataToHTML(name)
  }
})
