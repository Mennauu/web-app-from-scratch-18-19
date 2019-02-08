'use strict'

async function getData() {
  const listContainer = document.querySelector('.list-container')

  // Get data in JSON
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
  const data = await response.json()

  data.results.forEach(results => {

    async function getDetailedData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${results.name}/`)
      const data = await response.json()

      const allTypes = data.types.map(value => {
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

    getDetailedData()
  })
}

getData()

// routie({
//   '': function() {
//     listContainer.style.display = "flex"
//   },
//   ':name': function(name) {
//     listContainer.style.display = "none"
//     main.innerHTML = name
//   }
// })
