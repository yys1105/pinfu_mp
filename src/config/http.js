import wepy from 'wepy';
const BASE_URL = 'http://192.168.0.250/pinfu/frontend/web/api/'
const TOKEN = 'access-token'

export function httpGet(url,params) {
  let userInfo = wx.getStorageSync('user-info')
  let token = userInfo.access_token
  !params[TOKEN] && token && Object.assign(params,{[TOKEN]:token})
  return new Promise(function (resolve, reject) {
    wepy.request({
      url: BASE_URL+url,
      data:params,
      method:'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (data) {
        switch (data.data.status) {
          case 200:
            resolve(data.data)
          default:
            reject(data.data)
        }
      },
      fail:function (data) {
        wx.showToast({
          icon:'none',
          title: data.data.errors[0].message
        })
      }
    })
  })
}

export function httpPost(url,params) {
  let userInfo = wx.getStorageSync('user-info')
  let token = userInfo.access_token
  !params[TOKEN] && token && Object.assign(params,{[TOKEN]:token})
  return new Promise(function (resolve, reject) {
    wepy.request({
      url: BASE_URL+url,
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'POST',
      success: function (data) {
        switch (data.data.status) {
          case 422:
            wx.showToast({
              icon:'none',
              duration:3000,
              title: data.data.errors[0].message
            })
            break;
          case 200:
            resolve(data.data)
            break;
          default:
            reject(data.data)
        }
      },
      fail:function (data) {
        wx.showToast({
          icon:'none',
          title: data.data.errors[0].message
        })
      }
    })
  })
}
