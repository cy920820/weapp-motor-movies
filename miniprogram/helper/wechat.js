function getStorageSync (key) {
  return wx.getStorageSync(key)
}

function setStorageSync (key, value) {
  wx.setStorageSync(key, value)
}

module.exports = {
  getStorageSync,
  setStorageSync
}
