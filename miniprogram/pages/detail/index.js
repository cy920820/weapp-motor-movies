import { findMovieById } from '../../services/services'
const app = getApp()

Page({

  data: {
    detail: {}
  },

  watchTrailer() {
    console.log('watch')
  },

  onLoad(options) {
    let id = options.id
    // let detail = wx.getStorageSync('detail')
    // this.setData({
    //   detail
    // })

    wx.showLoading({
      title: '加载中'
    })

    findMovieById(id).then(res => {
      wx.hideLoading()
      this.setData({
        detail: res
      })
    })
    .catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  preview(e) {
    let photos = this.data.detail.photos
    let urls = photos.map(photo => {
      return photo.thumb
    })

    wx.previewImage({
      current: urls[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }
})
