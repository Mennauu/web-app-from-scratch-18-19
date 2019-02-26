const filterData = ({ id, name, sprites, height, weight, types, stats }) => {
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

export { filterData }