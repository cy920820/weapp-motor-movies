// pages/chooseLib/chooseLib.js
import { getNewMovies, getTop250 } from '../../services/services'

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
    getTop250().then(res => {
      let toplist = res.data.subjects
      let top3 = toplist.slice(0, 3)
      this.setData({
        top250: top3
      })
    })
    .catch(err => {
      console.error(err)
    })

    getNewMovies().then(res => {
      let newlist = res.data.subjects
      let new3 = newlist.slice(0, 3)
      this.setData({
        new: new3
      })
    })
    .catch(err => {
      console.error(err)
    })
  },

  onFocus() {
    console.log('跳转搜索页面')
  }
})
