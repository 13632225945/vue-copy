// 是否有__proto__
export const hasProto = '__proto__' in {}
// 浏览器环境
export const inBrowser = typeof window !== 'undefined'
// 微信环境
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
// 微信平台名称
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
// 浏览器userAgent
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
// IE
export const isIE = UA && /msie|trident/.test(UA)
// IE9
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
// Edge
export const isEdge = UA && UA.indexOf('edge/') > 0
// Android
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
// IOS
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
// Chrome
export const isChrome = UA && /chrome\/d+/.test(UA) && !isEdge
// phantomjs
export const isPhantomJS = UA && /phantomjs/.test(UA)
// firefox
export const isFF = UA && UA.match(/firefox\/(\d+)/)
// firefox有自带的watch方法
export const nativeWatch = ({}).watch
// 事件监听（addEventListener）支持passive属性
export let supportsPassive = true
if(inBrowser) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', ({
      get() {
        supportsPassive = true
      }
    }))
    window.addEventListener('test-passive', null, opts)
  }catch(e) {}
}
// 服务端渲染
let _isServer
export const isServerRendering = () => {
  if(_isServer === undefined) {
    if(!inBrowser && !inWeex && typeof global !== 'undefined') {
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    }else {
      _isServer = false
    }
  }
  return _isServer
}
// 开发者工具
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
// 原生方法
export function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
// 有Symbol类型
export const hasSymbol = 
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys)
// Polyfill Set
let _Set
if(typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
}else {
  _Set = class Set {
    constructor() {
      this.set = Object.create(null)
    }
    has(key) {
      return this.set[key] === true
    }
    add(key) {
      this.set[key] = true
    }
    clear() {
      this.set = Object.create(null)
    }
  }
}
export { _Set }