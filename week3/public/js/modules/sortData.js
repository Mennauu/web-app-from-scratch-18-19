import { errorHandling } from './utils.js'
import { dataDecider } from './dataDecider.js'

export const sortData = async (selectValue) => {
  let [err, data] = await errorHandling(dataDecider())
  if (!data) throw err

  if (selectValue === "1") {
    data = data.sort((a, b) => a.id - b.id)
  } else if (selectValue === "2") {
    data = data.sort((a, b) => b.id - a.id)
  } else if (selectValue === "3") {
    data = data.sort((a, b) => {
      if (a.name < b.name) return -1
    })
  } else {
    data = data.sort((a, b) => {
      if (b.name < a.name) return -1
    })
  }

  return data;
}