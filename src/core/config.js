import { no, noop, identity } from 'shared/util'
import { LIFECYCLE_HOOKS } from 'shared/constants'

/**
 * 定义配置对象
 */
export default ({
  optionMergeStrategies: Object.create(null),
  silent: false,
  productionTip: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
})