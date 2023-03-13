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
