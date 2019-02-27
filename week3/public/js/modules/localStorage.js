/* Add data to LocalStorage (if it's not in there) */
export const setLocalStorage = (data) => {
  data.map(pokemon => {
    if (localStorage.getItem(pokemon.name) === null) {
      localStorage.setItem(pokemon.name, JSON.stringify(pokemon))
    }
  })
}