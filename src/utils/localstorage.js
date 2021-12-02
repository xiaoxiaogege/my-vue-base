const localPrefix = process.env.VUE_APP_STORAGE_PREFIX || '' //配置统一的前缀
const ls = window.localStorage

const CryptoJS = require('crypto-js')
// const secretKey = 'secret key 123'
const secretKey = CryptoJS.enc.Utf8.parse('cmp_security_key')
const options = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}

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
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
      options
    ).toString()
    ls.setItem(localPrefix + key, ciphertext)
  } catch (e) {
    console.log('setItem error', e)
  }
}
// 获取
const getItem = key => {
  try {
    // Decrypt
    const data = ls.getItem(localPrefix + key)
    if (!data) return
    var bytes = CryptoJS.AES.decrypt(data, secretKey,options)
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    if (
      Object.prototype.hasOwnProperty.call(decryptedData, `__${key}__expired`)
    ) {
      if (decryptedData[`__${key}__expired`] >= Date.now()) {
        return decryptedData[key]
      }
      removeItem(key)
      return
    }
    return decryptedData[key]
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
