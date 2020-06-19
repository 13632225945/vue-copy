import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import { def, warn, hasOwn, hasProto, isObject, isPlainObject, isPrimitive, isUndef, isValidArrayIndex, isServerRendering } from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export let shouldObserve = true
// 切换shouldObserve
export function toggleObserving(value) {
  shouldObserve = value
}
export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if(Array.isArray(value)) {
      if(hasProto) {
        protoAugment(value, arrayMethods)
      }else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    }else {
      this.walk(value)
    }
  }
}