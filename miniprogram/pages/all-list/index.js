// pages/chooseLib/chooseLib.js
import { getNewMovies, getTop250 } from '../../services/services'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    size: 20,
    hasMore: true,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    let {type, size, page} = this.data
    this.getList(type, page, size)
    // 更改title
    console.log(type)
    wx.setNavigationBarTitle({
      title: type === 'new' ? '新片榜' : 'Top250'
    })
  },

  getList(type, page, size) {
    if (!this.data.hasMore) return
    wx.showLoading({
      title: '加载中'
    })
    if (type === 'new') {
      getNewMovies({
        start: (page - 1) * size,
        count: size,
        city: app.data.currentCity
      }).then(res => {
        wx.hideLoading()
        let list = res.data.subjects
        if (list.length) {
          this.setData({
            list: this.data.list.concat(list),
            page
          })
        } else {
          this.data.hasMore = false
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    } else {
      getTop250({
        start: (page - 1) * size,
        count: size,
        city: app.data.currentCity
      }).then(res => {
        wx.hideLoading()
        let list = res.data.subjects
        if (list.length) {
          this.setData({
            list: this.data.list.concat(list),
            page
          })
        } else {
          this.data.hasMore = false
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    }
  },

  onReachBottom() {
    // 到底之后执行loadmore
    let {type, size, page} = this.data
    this.getList(type, ++page, size)
  },
})
