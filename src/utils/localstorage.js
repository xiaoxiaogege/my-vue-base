const localPrefix = process.env.VUE_APP_STORAGE_PREFIX
console.log('localPrefix', localPrefix)
const ls = window.localStorage

// 设置
const setItem = (key, val, expired) => {
  // expired参数为毫秒数
  try {
    const data = {
      [key]: val
    }
    if (expired) {
      data[`__${key}__expired`] = Date.now() + expired
    }
    ls.setItem(localPrefix + key, JSON.stringify(data))
  } catch (e) {
    console.log('setItem error', e)
  }
}
// 获取
const getItem = key => {
  try {
    const data = JSON.parse(ls.getItem(localPrefix + key))
    if (!data) return
    if (Object.prototype.hasOwnProperty.call(data, `__${key}__expired`)) {
      if (data[`__${key}__expired`] >= Date.now()) {
        return data[key]
      }
      removeItem(key)
      return
    }
    return data[key]
  } catch (e) {
    console.log('getItem error', e)
  }
}
// 移除
const removeItem = key => {
  ls.removeItem(localPrefix + key)
}
// 清空
const clear = () => {
  ls.clear()
}

export default { setItem, getItem, removeItem, clear }
