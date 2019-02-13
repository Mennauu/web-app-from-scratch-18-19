import { errorHandling } from './await-error-handling.js'
import { getPokemonData, getSinglePokemonData } from './get-data.js'


const setDataToHTML = async () => {
  const listContainer = document.querySelector('.list-container')
  const [err, data] = await errorHandling(getPokemonData())
  if(!data) throw err

  data.map(data => {
    /* Some pokemon have multiple types, so we map over 
      them to return each as its own element */
    const allTypes = data.types.map(value => {
      return `<small class="type ${value.type.name}">${value.type.name}</small>`
    }).join(" ")

    /* This is the HTML Markup that will be inserted */
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

    /* We use insertAdjacentHTML because it's the fastest way
      to insert all the HTML. It might not be the "cleanest" way */
    listContainer.insertAdjacentHTML('beforeend', HTMLMarkup)
  })  
}

const setDetailedDataToHTML = async (name) => {
  const firstSection = document.querySelector('main > section')
  const [err, data] = await errorHandling(getSinglePokemonData(name))
  if(!data) throw err

  /* Some pokemon have multiple types, so we map over 
    them to return each as its own element */
  const allTypes = data.types.map(value => {
    return `<small class="type ${value.type.name}">${value.type.name}</small>`
  }).join(" ")

  /* Pokemon have multiple stats, so we map over 
    them to return each as its own element */
  const allStats = data.stats.map(value => {
    return `<li class="detail"><small>${value.stat.name}</small><span>${value.base_stat}</span></li>`
  }).join("")

  /* This is the HTML Markup that will be inserted */
  const HTMLMarkup = 
    `<div class="container">
      <h1 class="text-center">${data.name} <span>#${data.id}</span></h1>
      <div class="d-flex">
        <div class="result-image">
          <img src="${data.sprites.front_default}" alt="${data.name}" class="big-image">
        </div>
        <div class="result-info">
          <p>Hier komt de beschrijving van ${data.name}. Deze beschrijving is er nu nog niet omdat dit een omslachtig proces is.</p>
          <div class="pokemon-details">
            <ul class="pokemon-weight ${data.types[0].type.name}">
              <li class="detail">
                <small>Gewicht</small> 
                <span>${data.weight / 10} kg</span>
              </li>
              <li class="detail">
                <small>Hoogte</small>
                <span>${data.height / 10} m</span>
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