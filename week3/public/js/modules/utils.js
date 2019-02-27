/* Alternative way to handle promise error handling

  By: Steve Banton
  Source: https://stackoverflow.com/a/49311904 
*/
export const errorHandling = promise => {
  return promise
    .then(data => [null, data])
    .catch(err => [err])
}

/* Clear the children of parent element */
export const removeChildren = (element) => {
  while (element.firstChild) element.removeChild(element.firstChild)
}

/* Sort data based on select value */
export const sortData = (data, selectValue) => {
  switch(selectValue) {
    case "1": 
      data = data.sort((a, b) => a.id - b.id)
      break
    case "2": 
      data = data.sort((a, b) => b.id - a.id)
      break
    case "3": 
      data = data.sort((a, b) => { if (a.name < b.name) return -1 })
      break
    case "4": 
      data = data.sort((a, b) => { if (b.name < a.name) return -1 })
      break
    default:
      data = data.sort((a, b) => a.id - b.id)
  }

  return data
}