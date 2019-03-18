import { getStorageSync, setStorageSync } from '../../helper/wechat'
let app = getApp()

Page({

  data: {
    userInfo: {},
    email: 'cy920820@gmail.com',
    version: 'v1.1.1',
    libVersion: 'v2.6.2'
  },

  onLoad: function (options) {
    let userInfo = getStorageSync('userInfo')
    if (userInfo.nickName) {
      this.setData({
        userInfo
      })
    } else {
      // 查看是否授权
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                this.setData({
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
    }
  },

  onGotUserInfo(e) {
    let userInfo = e.detail.userInfo
    setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo
    })
  }
})
