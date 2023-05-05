export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 支持深层次的对象取值
export function getValueByKey(key: string, row: any) {
  return key.split('.').reduce((obj, cur) => {
    if (obj) {
      return obj[cur]
    }
  }, row)
}

// 深拷贝
export function cloneDeep<T>(source: T): T {
  return Array.isArray(source)
    ? source.map(item => cloneDeep(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(
          o,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)!
        )
        o[prop] = cloneDeep((source as { [key: string]: any })[prop])
        return o
      }, Object.create(Object.getPrototypeOf(source)))
    : (source as T)
}
