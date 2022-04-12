import axios from 'axios'
import qs from 'qs'

// 服务器地址
// const apiServer = 'http://127.0.0.1:9950'
// const wsServer = 'ws://127.0.0.1:9950/ws'
const wsServer = 'wss://iamxmm.xyz/ws'
const apiServer = 'https://iamxmm.xyz'

// 共享服务
export function wsServerUrl () {
  return wsServer
}

export function apiServerUrl () {
  return apiServer
}

// 添加关注地址
export async function ajaxAddFollowerPeople (from, to) {
  console.log('[AjaxData] call ajaxAddFollowerPeople:', from, to)

  const url = apiServer + '/followerpeople/add'
  const params = {
    from: from,
    to: to
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    // TODO not support more then 100 nft
    console.log('[AjaxData] ajaxAddFollowerPeople response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxAddFollowerToken (address, tokenId) {
  console.log('[AjaxData] call ajaxAddFollowerToken:', address, tokenId)

  const url = apiServer + '/followertoken/add'
  const params = {
    address: address,
    tokenId: tokenId
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxAddFollowerToken response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxGetHotToken (signature) {
  console.log('[AjaxData] call ajaxGetHotToken:', signature)
  const url = apiServer + '/followertoken/hot?signature=' + signature
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[AjaxData][ajaxGetHotToken][Response] is ', [response])
      const data = response.data
      let result = {}
      console.log('[AjaxData] ajaxGetHotToken response:', data)
      if (data.Code === 0) {
        result = data.Data
        console.log('[AjaxData] ajaxGetHotToken result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 添加楼层留言
export async function ajaxAddTokenInfo (tokenId, address, remark) {
  console.log('[AjaxData] call ajaxAddTokenInfo:', tokenId, remark)

  const url = apiServer + '/token/add'
  const params = {
    tokenId: tokenId,
    address: address,
    remark: remark
  }

  const resCode = await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxAddTokenInfo response-2:', data)
    return data.Code
  })

  return resCode
}

// 获取我的关注列表
export async function ajaxGetMyFollower (type, address) {
  console.log('[AjaxData] call ajaxGetMyFollower:', type, address)
  const url = apiServer + '/followerpeople/' + type + '?from=' + address
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[AjaxData][ajaxGetMyFollower][Response] is ', [response])
      const data = response.data
      let result = {}
      console.log('[AjaxData] ajaxGetMyFollower response:', data)
      if (data.Code === 0) {
        result = data.Data
        console.log('[AjaxData] ajaxGetMyFollower result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 获取个人nft列表
export async function ajaxGetAllNfts (address) {
  // console.log('[Web][Ajax] ajaxGetAllNfts start ', address)
  const url = apiServer + '/user/getallnft?address=' + address
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[Web][Ajax][Response] is ', [response])
      const data = response.data.Data
      const result = []
      // TODO not support more then 100 nft
      // console.log('[Web][Ajax] ajaxGetAllNfts response data ', [data])
      if (data.code === 200 && data.data) {
        const contents = data.data.content
        if (contents && contents.length > 0) {
          console.log('[Web][Ajax] ajaxGetAllNfts content ', contents)
          for (const item of contents) {
            // console.log('[Web][Ajax] ajaxGetAllNfts nft_json ', item)
            let nftJsonStr = item.nft_json
            nftJsonStr = nftJsonStr.replace(' ', '')
            nftJsonStr = nftJsonStr.replace('\n', '')
            let nftJson = null
            // if empty string
            if (nftJsonStr) {
              try {
                nftJson = JSON.parse(nftJsonStr)
              } catch (error) {
                // parse json string error
              }
            }
            let image = ''
            if (nftJson && 'image' in nftJson) {
              image = nftJson.image // erc721
              if ('image_url' in nftJson && (image === undefined || image === '')) {
                image = nftJson.image_url // ens
              }
            }
            if (image !== undefined) {
              image = image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            }
            if (image) {
              // console.log('[AjaxData][ajaxGetAllNfts] nftList image', image)
              result.push({
                token_id: item.token_id,
                nft_name: item.nft_name,
                // ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
                // https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
                image: image
              })
            }
          }
        }
        console.log('[Ajax][ajaxGetAllNfts] nftList', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 获取token的留言
export async function ajaxGetTokenInfo (tokenIds) {
  const url = apiServer + '/token/listbytokenids?tokenIds=' + tokenIds.join(',')
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[Web][Ajax][Response] is ', [response])
      const data = response.data
      const result = {}
      console.log('[AjaxData] ajaxGetTokenInfo response:', data)
      if (data.Code === 0) {
        const items = data.Data
        for (const i in items) {
          const oneToken = { from: items[i].Address, msg: items[i].Remark }
          result[items[i].TokenId] = oneToken
        }
        console.log('[AjaxData] ajaxGetTokenInfo result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 获取楼层热度
export async function ajaxGetTokenHotNum (tokenIds) {
  console.log('[AjaxData] call ajaxGetTokenHotNum start')
  const url = apiServer + '/followertoken/listbytokenids?tokenIds=' + tokenIds.join(',')
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[AjaxData][ajaxGetTokenHotNum][Response] is ', [response])
      const data = response.data
      const result = {}
      console.log('[AjaxData] ajaxGetTokenHotNum response:', data)
      if (data.Code === 0) {
        const items = data.Data
        for (const i in items) {
          const oneToken = { tokenId: items[i].TokenId, num: items[i].Num }
          result[items[i].TokenId] = oneToken
        }
        console.log('[AjaxData] ajaxGetTokenHotNum result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 读取玩家个人信息
export async function ajaxGetProfile (address) {
  console.log('[AjaxData] call ajaxGetProfile ', address)
  const url = apiServer + '/user/get?address=' + address
  return new Promise(
    (resolve, reject) => axios.post(url).then(response => {
      console.log('[AjaxData][ajaxGetProfile][Response] is ', [response])
      const data = response.data
      let result = {}
      console.log('[AjaxData] ajaxGetProfile response:', data)
      if (data.Code === 0) {
        result = data.Data
        console.log('[AjaxData] ajaxGetProfile result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}

// 读取玩家个人信息
export async function ajaxUpdateProfile (address, name, loveNum) {
  console.log('[AjaxData] call ajaxUpdateProfile:')

  let result = 200
  const url = apiServer + '/user/update'
  const params = {
    address: address,
    name: name,
    loveNum: loveNum
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxUpdateProfile response-2:', data)
    result = data.Code
  })

  return result
}

// 获取用户表
export async function ajaxGetUserInfo (allAddress) {
  console.log('[AjaxData] ajaxGetUserInfo allAddress ', allAddress)
  if (allAddress === '') {
    return {}
  }
  const url = apiServer + '/user/listbyaddress'
  const params = {
    address: allAddress.join(',')
  }
  return new Promise(
    (resolve, reject) => axios.post(url, qs.stringify(params)).then(response => {
      console.log('[AjaxData][ajaxGetUserInfo][Response] is ', [response])
      const result = {}
      const data = response.data
      console.log('[AjaxData] ajaxGetUserInfo response:', data)
      if (data.Code === 0) {
        const items = data.Data
        for (var i in items) {
          result[items[i].Address] = { address: items[i].Address, name: items[i].Name }
        }
        console.log('[AjaxData] ajaxGetUserInfo result:', result)
        resolve(result)
      } else {
        reject(new Error('return empty'))
      }
    })
  )
}
