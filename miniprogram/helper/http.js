module.exports = function (url, method = 'GET', params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: Object.assign({}, params),
      method,
      header: {'Content-Type': 'json'},
      success: resolve,
      fail: reject
    })
  })
}
