/* Alternative way to handle promise error handling

  By: Steve Banton
  Source: https://stackoverflow.com/a/49311904 
*/
const errorHandling = promise => {
  return promise
    .then(data => [null, data])
    .catch(err => [err])
}

export { errorHandling }