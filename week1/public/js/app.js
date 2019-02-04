'use strict'

const listContainer = document.querySelector('.list-container')

async function showPokemonData() {
  // Get data in JSON
  let response = await fetch('https://pokeapi.co/api/v2/pokemon/')
  let data = await response.json()

  // Add data to html
  data.results.forEach(function(results) {
    listContainer.innerHTML += `<li>${results.name}</li>`
  })
}

showPokemonData()