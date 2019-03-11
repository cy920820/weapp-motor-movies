// pages/chooseLib/chooseLib.js
import { getMovieList } from '../../services/services'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
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
    let {type, page} = this.data
    this.getList(type, page)

    // 更改title
    wx.setNavigationBarTitle({
      title: type === 'new_movies' ? '新片榜' : 'Top250'
    })
  },

  getList(type, page) {
    if (!this.data.hasMore) return
    wx.showLoading({
      title: '加载中'
    })
    getMovieList(type, page).then(res => {
      wx.hideLoading()
      let list = res.subjects
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
  },

  onReachBottom() {
    // 到底之后执行loadmore
    let {type, page} = this.data
    this.getList(type, ++page)
  },
})
