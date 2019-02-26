'use strict'

import { setDataToHTML, setDetailedDataToHTML } from './set-data-to-html.js'
import { sortData } from './sort-data.js'
import { dataDecider } from './data-decider.js'

routie({
  // Homepage
  '': async () => { 
    const firstSection = document.querySelector('main > section')

    // https://developer.mozilla.org/nl/docs/Web/API/MutationObserver
    // Credits: Dennis
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
      const data = await sortData(selectValue)
      setDataToHTML(data)
    })

    const data = await dataDecider()
    setDataToHTML(data)
  },
   // Detail page
  ':name': (name) => {
    const firstSection = document.querySelector('main > section')
    while (firstSection.firstChild) firstSection.removeChild(firstSection.firstChild)

    setDetailedDataToHTML(name)
  }
})
