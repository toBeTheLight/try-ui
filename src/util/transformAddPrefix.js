let transformAddPrefix = function (str) {
  let prefixArr = [
    'transform',
    '-ms-transform',
    '-moz-transform',
    '-webkit-transform',
    '-o-transform'
  ]
  // transform: rotate(3deg)
  let $1 = str.match(/^transform(.*)$/)[1]
  let semicolon = ''
  if ($1.indexOf(';') === -1) {
    semicolon = ';'
  }
  let transformAddPrefix = ''
  prefixArr.forEach((val) => {
    transformAddPrefix += `${val}${$1}${semicolon}`
  })
  return transformAddPrefix
}
export default transformAddPrefix
