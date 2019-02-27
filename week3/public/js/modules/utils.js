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
