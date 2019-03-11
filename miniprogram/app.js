//app.js

App({
  data: {
    currentCity: '北京',
    version: '1.0.0',
    userInfo: ''
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
  }
})
