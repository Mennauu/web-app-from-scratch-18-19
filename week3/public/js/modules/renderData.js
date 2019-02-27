import { sortData, filterByType, removeChildren, getUniqueTypes } from './utils.js'

export const setDataToHTML = (data) => {
  const firstSection = document.querySelector('main > section')
  
  let types = getUniqueTypes(data)

  const allTypes = types.map(type => {
    return `<option value="${type}">${type}</option>`
  }).join(" ")

  /* This is the HTML Markup for the Homepage */
  const HomeHTML =
    `<div class="filters"><div class="select">
       <select class="sort-pokemons">
         <option value="1">Laagste nummer (eerst)</option>
         <option value="2">Hoogste nummer (eerst)</option>
         <option value="3">Van A tot Z</option>
         <option value="4">Van Z tot A</option>
       </select>
     </div>
     <div class="select">
       <select class="filter-pokemons">
         <option selected disabled>Filter pokemon by type</option>
         ${allTypes}
       </select>
     </div>
     </div>
     <ul class="list-container"></ul>`

  /* inject the HTML markup */
  firstSection.insertAdjacentHTML('afterbegin', HomeHTML)

  /* We define these elements after the HTML has been set */
  const sortSelect = document.querySelector('.sort-pokemons')
  const filterSelect = document.querySelector('.filter-pokemons')

  /* Everytime we change the value of sortSelect, sort (render) 
     the pokemon based on chosen value  */
  sortSelect.addEventListener('change', () => {
    const selectValue = sortSelect.options[sortSelect.selectedIndex].value;
    const sortedData = sortData(data, selectValue)

    renderPokemon(sortedData)
  })

  /* Everytime we change the value of filterSelect, filter (render) 
     the pokemon based on chosen value  */
  filterSelect.addEventListener('change', () => {
    const selectValue = filterSelect.options[filterSelect.selectedIndex].value;
    const filteredDataByType = filterByType(data, selectValue)

    renderPokemon(filteredDataByType)
  })

  renderPokemon(data)
}




const renderPokemon = (data) => {
  const container = document.querySelector('.container')
  const listContainer = document.querySelector('.list-container')

  /* check if container element exists, and if so, remove children */
  if(container !== null) removeChildren(container)
  /* Remove children of parent before we set it again */
  removeChildren(listContainer)

  data.map(pokemon => {
    /* Some pokemon have multiple types, so we map over 
       them to return each as its own element */
    const allTypes = pokemon.types.map(value => {
      return `<small class="type ${value.type.name}">${value.type.name}</small>`
    }).join(" ")

    /* This is the HTML Markup per pokemon that will be inserted */
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

    /* Insert markup to HTML section */
    listContainer.insertAdjacentHTML('beforeend', HTMLMarkup)
  })
}





export const setDetailedDataToHTML = (pokemon) => {
  const firstSection = document.querySelector('main > section')

  /* Remove children of parent before we set it again */
  removeChildren(firstSection)

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
          <p>De Pokemon ${pokemon.name} is een prachtige Pokemon uit de Pokemon wereld. Hij leeft in een van de zeven regio's.</p>
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

  /* Insert markup to HTML section */
  firstSection.insertAdjacentHTML('beforeend', HTMLMarkup)
}