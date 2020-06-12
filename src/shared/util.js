// 不能被修改的空对象
export const emptyObject = Object.freeze({})
// undefined或者null
export function isUndef(v) {
  return v === undefined || v === null
}
// 非undefined、非null
export function isDef(v) {
  return v !== undefined && v !== null
}
// true
export function isTrue(v) {
  return v === true
}
// false
export function isFalse(v) {
  return v === false
}
// 除null和undefined之外的基本数据类型
export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
// 非null的object，包括{}、[]、Promise等等
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
// {}返回[object Object]，[]返回[object Array]，null返回[object Null]，undefined返回[object Undefined]，1返回[object Number]……
const _toString = Object.prototype.toString
// {}返回Object，[]返回Array，null返回Null，undefined返回Undefined，1返回Number……
export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}
// 严格的对象检查，包括{}、new自定义对象
export function isPlainObject(obj) {
  return _toString.call(obj) == '[object Object]'
}
// 正则表达式
export function isRegExp() {
  return _toString.call(v) == '[object RegExp]'
}
// 非无穷大的正整数
export function isValidArrayIndex(val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
// 判断是否是Promise
export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}
// 对数组和没有重写toString方法的对象进行json转换
export function toString(val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
// 字符串转换为数字，若不能转换，则原样返回
export function toNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
// 根据字符串创建一个对象，且返回一个方法用来判断这个对象中是否有某个key
export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for(let i=0; i<list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}
// slot、component
export const isBuiltInTag = makeMap('slot,component', true)
// key、ref、slot、slot-scope、is
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
// 移除数组元素
export function remove(arr, item) {
  if(arr.length) {
    const index = arr.indexOf(item)
    if(index > -1) {
      return arr.splice(index, 1)
    }
  }
}
const hasOwnProperty = Object.prototype.hasOwnProperty
// 检查对象是否有某个key
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}
// 方法缓存，即对于相同参数，不必再次执行方法
export function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}
// 正则匹配`-一个字母`
const camelizeRE = /-(\w)/g
// 将连字符-后面的首字母转换为大写
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
// 首字母大写
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
// 正则匹配`一个大写字母`，\B表示非单词边界
const hyphenateRE = /\B([A-Z])/g
// 将驼峰字符串转换为连字符-连接
export const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
// polyfill bind函数
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}
// 原生bind函数
function nativeBind(fn, ctx) {
  return fn.bind(ctx)
}
// 自定义bind函数
export const bind = Function.prototype.bind ? nativeBind : polyfillBind
// 将类array对象转换成Array，可以从start处开始截取
export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while(i--) {
    ret[i] = list[i + start]
  }
  return ret
}
// 将一个对象的属性浅拷贝到另一个对象
export function extend(to, _from) {
  for(const key in _from) {
    to[key] = _from[key]
  }
  return to
}
// 将Array中的所有对象的属性浅拷贝到一个对象
export function toObject(arr) {
  const res = {}
  for(let i=0; i< arr.length; i++) {
    if(arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
// 空方法
export function noop(a, b, c) {}
// 始终返回false的方法
export const no = (a, b, c) => false
// 返回参数自己的方法
export const identity = (_) => _
// 将参数modules数组中对象的staticKeys属性合并成一个数组，然后通过逗号,拼接成字符串
export function genStaticKeys(modules) {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}
// 判断两个对象是否相等，比较的是每个key的值相等
export function looseEqual(a, b) {
  if(a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if(isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if(isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      }else if(a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      }else if(!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      }else {
        return false
      }
    }catch(e) {
      return false
    }
  }else if(!isObjectA && !isObjectB) {
    return String(a) === String(b)
  }else {
    return false
  }
}
// 查找数组中第一个被匹配到的值的索引
export function looseIndexOf(arr, val) {
  for(let i=0; i< arr.length; i++) {
    if(looseEqual(arr[i], val)) return i
  }
  return -1
}
// 方法只能执行一次
export function once(fn) {
  let called = false
  return function() {
    if(!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}