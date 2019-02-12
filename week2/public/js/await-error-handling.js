/*  By:     Steve Banton
    Source: https://stackoverflow.com/a/49311904   */

export function catchError(promise) {
  return promise.then(data => [null, data])
    .catch(err => [err])
}