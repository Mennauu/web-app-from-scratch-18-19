'use strict'

import { setDataToHTML, setDetailedDataToHTML } from './set-data-to-html.js'

routie({
  '': function() {
    const firstSection = document.querySelector('main > section')
    const HTMLMarkup = '<ul class="list-container"></ul>'
    
    while (firstSection.firstChild) firstSection.removeChild(firstSection.firstChild)
    firstSection.insertAdjacentHTML('afterbegin', HTMLMarkup)

    setDataToHTML()
  },
  ':name': function() {
    const firstSection = document.querySelector('main > section')
    while (firstSection.firstChild) firstSection.removeChild(firstSection.firstChild)

    scroll(0,0)
    setDetailedDataToHTML()
  }
})
