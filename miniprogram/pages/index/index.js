//index.js
import { getMovieList } from '../../services/services'
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

    this.getHitList(this.data.hitPage)
    this.getUpcomings(this.data.upcomingPage)
  },

  viewDetail(event) {
    let id = event.currentTarget.id
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },

  // 获取热映列表
  getHitList(page) {
    if (!this.data.hitHasMore) return
    wx.showLoading({
      title: '加载中'
    })
    return getMovieList('in_theaters', page)
    .then(res => {
      wx.hideLoading()
      let list = res.subjects
      if (list.length) {
        this.setData({
          hit: this.data.hit.concat(list),
          hitPage: page
        })
        // wx.setStorage({
        //   key: 'hits',
        //   data: this.data.hit
        // })
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
  getUpcomings(page) {
    if (!this.data.upcomingHasMore) return
    wx.showLoading({
      title: '加载中'
    })
    return getMovieList('coming_soon', page)
    .then(res => {
      wx.hideLoading()
      let list = res.subjects
      if (list.length) {
        this.setData({
          upcoming: this.data.upcoming.concat(list),
          upcomingPage: page
        })
        // wx.setStorage({
        //   key: 'upcomings',
        //   data: this.data.upcoming
        // })
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
      this.getHitList(++this.data.hitPage)
    } else {
      this.getUpcomings(++this.data.upcomingPage)
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

    this.getHitList(this.data.hitPage).then(() => {
      this.getUpcomings(this.data.upcomingPage).then(() => {
        wx.stopPullDownRefresh()
      })
    })
  }
})
