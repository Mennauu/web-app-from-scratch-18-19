/* Alternative way to handle promise error handling
   Source: https://stackoverflow.com/a/49311904 By: Steve Banton */
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

export const filterByType = (data, selectValue) => {
  const types = getUniqueTypes(data)

  if(selectValue === "fire") { 
    return data.types.find(type => { console.log(type) })
  }
}

export const showLoadingAnimation = () => {
  document.querySelector('.loader').classList.add('show')
}

export const removeLoadingAnimation = () => {
  document.querySelector('.loader').classList.remove('show')
}

/* Get all the unique pokemon Types */
export const getUniqueTypes = (data) => {

  let values = []
  let types

  data.map(result => {
    result.types.map(value => {
      values.push(value.type.name)
      types = [...new Set(values)]
    })
  })

  return types
}