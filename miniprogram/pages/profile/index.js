// pages/userConsole/userConsole.js
let app = getApp()

Page({

  data: {
    avatarUrl: '',
    username: '',
    numbers: 0,
    email: 'cy920820@gmail.com',
    version: 'v1.0.0'
  },

  onLoad: function (options) {
    // 设置用户头像
    let userInfo = app.globalData.userInfo
    console.log(userInfo)
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      username: userInfo.nickName
    })
  }
})
