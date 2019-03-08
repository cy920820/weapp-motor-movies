//index.js
import { getInTheaters, getUpcomings } from '../../services/services'
const app = getApp()

Page({
  data: {
    // 热映列表
    hit: [],
    upcoming: [],
    hitPage: 1,
    upcomingPage: 1,
    size: 20,
    tabNum: 0, // 代表热映
    hitHasMore: true,
    upcomingHasMore: true
  },

  onLoad() {
    // this.setData({
    //   hit: wx.getStorageSync('hits'),
    //   upcoming: wx.getStorageSync('upcomings')
    // })

    this.getHitList(this.data.hitPage, this.data.size)
    this.getUpcomings(this.data.upcomingPage, this.data.size)
  },

  viewDetail(event) {
    let id = event.currentTarget.id
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },

  // 获取热映列表
  getHitList(page, size) {
    if (!this.data.hitHasMore) return
    wx.showLoading({
      title: '加载中'
    })
    return getInTheaters({
      start: (page - 1) * size,
      count: size,
      city: app.data.currentCity
    })
    .then(res => {
      wx.hideLoading()
      let list = res.data.subjects
      if (list.length) {
        this.setData({
          hit: this.data.hit.concat(list),
          hitPage: page
        })
        wx.setStorage({
          key: 'hits',
          data: this.data.hit
        })
      } else {
        this.setData({
          hitHasMore: false
        })
      }
    })
    .catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  // 获取即将上映的电影列表
  getUpcomings(page, size) {
    if (!this.data.upcomingHasMore) return
    wx.showLoading({
      title: '加载中'
    })
    return getUpcomings({
      start: (page - 1) * size,
      count: size
    })
    .then(res => {
      wx.hideLoading()
      let list = res.data.subjects
      if (list.length) {
        this.setData({
          upcoming: this.data.upcoming.concat(list),
          upcomingPage: page
        })
        wx.setStorage({
          key: 'upcomings',
          data: this.data.upcoming
        })
      } else {
        this.setData({
          upcomingHasMore: false
        })
      }
    })
    .catch(err => {
      wx.hideLoading()
    })
  },

  changTab(e) {
    let index = e.detail.index
    this.setData({
      tabNum: index
    })
  },

  onReachBottom() {
    // 到底之后执行loadmore
    if (this.data.tabNum === 0) {
      this.getHitList(++this.data.hitPage, this.data.size)
    } else {
      this.getUpcomings(++this.data.upcomingPage, this.data.size)
    }
  },

  onPullDownRefresh() {
    this.setData({
      hit: [],
      upcoming: [],
      hitPage: 1,
      upcomingPage: 1,
      hitHasMore: true,
      upcomingHasMore: true
    })

    this.getHitList(this.data.hitPage, this.data.size).then(() => {
      this.getUpcomings(this.data.upcomingPage, this.data.size).then(() => {
        wx.stopPullDownRefresh()
      })
    })
  }
})
