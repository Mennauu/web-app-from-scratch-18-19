'use strict'

const listContainer = document.querySelector('.list-container')
const main = document.querySelector('main')

async function getName() {

  // Get data in JSON
  let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
  let data = await response.json()

  // Add data to html
  data.results.forEach(results => {

    async function getData() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${results.name}/`)
      let data = await response.json()

      let allTypes = data.types.map(value => {
        return `<small class="type ${value.type.name}">${value.type.name}</small>`
      }).join(" ")

    listContainer.innerHTML += 
      `<a href="#${results.name}" class="result">
        <li>
          <div class="result-image">
            <img src="${data.sprites.front_default}" alt="${results.name}">
          </div>
          <div class="result-info">
            <small class="pokemon-id">#${data.id}</small>
            <span>${results.name}</span>
            ${allTypes}
          </div>
        </li>
       </a>`
    }

    getData()
  })
}

getName()

// routie({
//   '': function() {
//     listContainer.style.display = "flex"
//   },
//   ':name': function(name) {
//     listContainer.style.display = "none"
//     main.innerHTML = name
//   }
// })
