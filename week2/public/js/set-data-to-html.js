import { errorHandling } from './await-error-handling.js'
import { getSinglePokemonData } from './get-data.js'
import { filteredPokemonData, filteredSinglePokemonData } from './filter-data.js'
import { allDataHTMLMarkUp } from './html-markup.js'

const setDataToHTML = async () => {
  const listContainer = document.querySelector('.list-container')

  const [err, data] = await errorHandling(allDataHTMLMarkUp())
  if(!data) throw err

  console.log(data)

  data.map(pokemon => {

    /* Some pokemon have multiple types, so we map over 
    them to return each as its own element */
    const allTypes = pokemon.types.map(value => {
      return `<small class="type ${value.type.name}">${value.type.name}</small>`
    }).join(" ")

    /* This is the HTML Markup that will be inserted */
    const HTMLMarkup = 
    `<a href="#${pokemon.name}" class="result">
      <li>
        <div class="result-image">
          <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>
        <div class="result-info">
          <small class="pokemon-id">#${pokemon.id}</small>
          <span>${pokemon.name}</span>
          ${allTypes}
        </div>
      </li>
    </a>`

    /* We use insertAdjacentHTML because it's the fastest way
      to insert all the HTML. It might not be the "cleanest" way */
    listContainer.insertAdjacentHTML('beforeend', HTMLMarkup)

    /* If one of the pokemons isn't in localStorage, reset
       localStorage */
    if (localStorage.getItem(pokemon.name) === null) {
      localStorage.setItem(pokemon.name, JSON.stringify(pokemon))
    } 
  })
}

const setDetailedDataToHTML = async (name) => {
  const firstSection = document.querySelector('main > section')
  const [err, data] = await errorHandling(getSinglePokemonData(name))
  if(!data) throw err

  const pokemon = filteredSinglePokemonData(data)

  /* Some pokemon have multiple types, so we map over 
    them to return each as its own element */
  const allTypes = pokemon.types.map(value => {
    return `<small class="type ${value.type.name}">${value.type.name}</small>`
  }).join(" ")

  /* Pokemon have multiple stats, so we map over 
    them to return each as its own element */
  const allStats = pokemon.stats.map(value => {
    return `<li class="detail"><small>${value.stat.name}</small><span>${value.base_stat}</span></li>`
  }).join("")

  /* This is the HTML Markup that will be inserted */
  const HTMLMarkup = 
    `<div class="container">
      <h1 class="text-center">${pokemon.name} <span>#${pokemon.id}</span></h1>
      <div class="d-flex">
        <div class="result-image">
          <img src="${pokemon.image}" alt="${pokemon.name}" class="big-image">
        </div>
        <div class="result-info">
          <p>Hier komt de beschrijving van ${pokemon.name}. Deze beschrijving is er nu nog niet omdat dit een omslachtig proces is.</p>
          <div class="pokemon-details">
            <ul class="pokemon-weight ${pokemon.types[0].type.name}">
              <li class="detail">
                <small>Gewicht</small> 
                <span>${pokemon.weight / 10} kg</span>
              </li>
              <li class="detail">
                <small>Hoogte</small>
                <span>${pokemon.height / 10} m</span>
              </li>
            </ul>
            <ul>
              ${allStats}
            </ul>
          </div>
          <div class="pokemon-types">
            <span>Type</span>
            ${allTypes}
          </div>
        </div>
      </div>
    </div>`
  /* We use insertAdjacentHTML because it's the fastest way
    to insert all the HTML. It might not be the "cleanest" way */
  firstSection.insertAdjacentHTML('beforeend', HTMLMarkup)
}

export { setDataToHTML, setDetailedDataToHTML }