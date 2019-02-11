'use strict'

/* Fetch all Pokemon names */
const getPokemonNames = async () => {
  try {
    const data = await (await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800')).json()

    return data.results
  } catch (err) {
    err
  }
}

/* Fetch all details per Pokemon based on given name */
const getDetailedPokemonData = async () => {
  try {
    const pokemonNames = await getPokemonNames()

    const data = pokemonNames.map(async result => {
      return await (await fetch(`https://pokeapi.co/api/v2/pokemon/${result.name}/`)).json()
    })

    return await Promise.all(data)
  } catch (err) {
    err
  }
}

/* Set fetched data in a stylish manner to HTML */
const setDataToHTML = async () => {
  try {
    const data = await getDetailedPokemonData()
    const listContainer = document.querySelector('.list-container')

    data.map(data => {
      /* Some pokemon have multiple types, so we map over 
        them to return each as its own element */
      const allTypes = data.types.map(value => {
        return `<small class="type ${value.type.name}">${value.type.name}</small>`
      }).join(" ")

      const HTMLMarkup =
        `<a href="#${data.name}" class="result">
          <li>
            <div class="result-image">
              <img src="${data.sprites.front_default}" alt="${data.name}">
            </div>
            <div class="result-info">
              <small class="pokemon-id">#${data.id}</small>
              <span>${data.name}</span>
              ${allTypes}
            </div>
          </li>
       </a>`

      listContainer.insertAdjacentHTML('beforeend', HTMLMarkup)
    })
  } catch (err) {
    err
  }
}

setDataToHTML()


/* innerHTML VS insertAdjacentHTML

Average amount of time setDataToHTML takes to finish

innerHTML: 1380ms
insertAdjacentHTML: 34ms

console.time("concatenation")
console.timeEnd("concatenation")

*/



// routie({
//   '': function() {
//     listContainer.style.display = "flex"
//   },
//   ':name': function(name) {
//     listContainer.style.display = "none"
//     main.innerHTML = name
//   }
// })
