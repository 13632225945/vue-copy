// TO-READ
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
// 检查字符串以$或者_开头
export function isReserved(str) {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
// 定义对象的一个属性
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
// TO-READ
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
// TO-READ
export function parsePath(path) {
  if(bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function(obj) {
    for(let i=0; i<segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}