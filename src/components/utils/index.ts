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

export function omit<
  T extends Record<string, any>,
  K extends string,
  K2 extends keyof T
>(obj: T, keys: (K | K2)[]) {
  const result = { ...obj }

  keys.forEach(key => {
    delete result[key]
  })

  return result as Omit<T, K>
}

export function omitBy<T extends Record<string, any>, K extends keyof T>(
  object: T,
  callback: (value: T[K], key: K) => boolean
) {
  const result = { ...object }

  Object.entries(result).forEach(([key, value]) => {
    const isDrop = callback(value, key as K)

    if (isDrop) delete result[key]
  })

  return result as Partial<T>
}
