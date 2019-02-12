import { getPokemonData, getSinglePokemonData } from './get-data.js'

const setDataToHTML = async () => {
  const data = await getPokemonData()
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
}

const setDetailedDataToHTML = async () => {
  const data = await getSinglePokemonData()
  const firstSection = document.querySelector('main > section')
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
           </div>
         </div>
       </div>
     </div>`

  firstSection.insertAdjacentHTML('beforeend', HTMLMarkup)
}

export { setDataToHTML, setDetailedDataToHTML }

/*  
    innerHTML VS insertAdjacentHTML

    innerHTML: 1380ms
    insertAdjacentHTML: 34ms      
*/

