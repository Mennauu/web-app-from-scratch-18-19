export const filterAllData = async (data) => {
  return data.map(filterSingleData)
}

export const filterSingleData = ({ id, name, sprites, height, weight, types, stats }) => {
  return {
    id,
    name,
    image: sprites.front_default,
    height,
    weight,
    types,
    stats
  }
}