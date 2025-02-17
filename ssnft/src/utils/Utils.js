import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

// 获取当前时间戳
export function curTimeSe () {
  return parseInt((new Date()).valueOf() / 1000)
}

/**
 * 缓存格式是个JSON，前面是data，后面是过期时间
 * @param {integer} key
 * @param {string} value
 * @param {integer} sec 过期时间，秒为单位
 */
export function addLocalStorage (key, value, sec) {
  // console.log('[Utils] addLocalStorage', key, value, sec)
  if (sec === undefined) {
    sec = 60 * 60
  }
  localStorage.setItem(key, JSON.stringify({ data: value, expire: curTimeSe() + sec }))
}

export function getLocalStorage (key) {
  let data = localStorage.getItem(key)
  data = JSON.parse(data)
  // console.log('[Utils] getLocalStorage', key, data)
  if (data === null || data.expire < curTimeSe()) {
    return null
  } else {
    return data.data
  }
}

// 隐藏太长的钱包地址
export function hiddenAddress (address) {
  if (address === '') return address
  if (address === 0) return address
  if (typeof (address) === 'string') {
    const reg = /^(\w{4})\w+(\w{4})$/
    return address.replace(reg, '$1****$2')
  }

  return address
}

export function hiddenName (name) {
  if (name.length > 8) {
    const len = name.length
    return name.substring(0, 4) + '...' + name.substring(len - 4)
  }
  return name
}

export function popupMessage (message, gravity = 'top', position = 'center', status = 's') {
  const colorInfo = {
    s: 'linear-gradient(to right, #00b09b, #96c93d)',
    f: 'linear-gradient(to right, #e91717, #cb3327)',
    w: 'linear-gradient(to right, #b2a50b, #efde1d)',
    t: 'linear-gradient(to right, #6c6b62, #3d3a21)'
  }
  Toastify({
    text: message,
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: gravity, // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: colorInfo[status]
    }
  }).showToast()
}
