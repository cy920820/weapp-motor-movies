// pages/userConsole/userConsole.js
let app = getApp()

Page({

  data: {
    userinfo: {},
    email: 'cy920820@gmail.com',
    version: 'v1.0.0'
  },

  onLoad: function (options) {
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
  },

  onGotUserInfo(e) {
    let userinfo = e.detail.userInfo
    this.setData({
      userinfo
    })
  }
})
