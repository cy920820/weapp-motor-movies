import { getMovieDetail } from '../../services/services'
const app = getApp()

Page({

  data: {
    detail: {}
  },

  watchTrailer() {
    console.log('watch')
  },

  onLoad(options) {
    // let id = options.id
    let detail = wx.getStorageSync('detail')
    this.setData({
      detail
    })
    // wx.showLoading({
    //   title: '加载中'
    // })

    // getMovieDetail(id).then(res => {
    //   wx.hideLoading()
    //   let detail = res.data
    //   this.setData({
    //     detail
    //   })
    // })
    // .catch(err => {
    //   wx.hideLoading()
    //   console.error(err)
    // })
  }
})
