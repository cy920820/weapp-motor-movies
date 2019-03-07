//app.js

App({
  data: {
    currentCity: '北京',
    version: '1.0.0'
  },
  onLaunch: function () {

    if (!wx.cloud) {
      // 异常抛出
      wx.showToast({
        title: '系统服务异常',
        icon: 'none',
        duration: 2000
      })
    } else {
      // 云服务初始化
      wx.cloud.init({
        traceUser: true
      })
    }

    // 查看是否授权，授权后方可获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData = {
                userInfo: res.userInfo
              }
            }
          })
        }
      }
    })
  }
})
