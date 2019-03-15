import { getMovieList } from '../../services/services'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    new: [],
    top250: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    // 新片榜
    getMovieList('top250').then(res => {
      let toplist = res.subjects
      let top3 = toplist.slice(0, 3)
      this.setData({
        top250: top3
      })
    })
    .then(() => {
      // top250
      getMovieList('new_movies').then(res => {
        wx.hideLoading()
        let newlist = res.subjects
        let new3 = newlist.slice(0, 3)
        this.setData({
          new: new3
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    })
    .catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  onFocus() {
    // 跳转搜索首页
    wx.navigateTo({
      url: '../search/index'
    })
  },

  viewAllList(options) {
    // type判断排行榜类型
    let type = options.currentTarget.dataset.type
    wx.navigateTo({
      url: `../all-list/index?type=${type}`
    })
  }
})
