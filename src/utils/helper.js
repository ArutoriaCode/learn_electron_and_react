export const flattenArr = (arr, key) => {
  return arr.reduce((map, item) => {
    map[item[key]] = item
    return map
  }, {})
}

export const objToArr = (obj) => {
  console.log(Object.keys(obj).map(item => obj[item]))
  return Object.keys(obj).map(item => obj[item])
}
