import { getMovieList } from '../../services/services'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMovie: '',
    movies: [],
    page: 1,
    size: 20,
    hasMore: true
  },

  loadmore() {
    if (!this.data.hasMore) return
    wx.showLoading({
      title: '加载中'
    })

    let page = this.data.page
    let size = this.data.size
    let search = this.data.searchMovie
    getMovieList('search', page++, size, search).then(res => {
      wx.hideLoading()
      let movies = res.subjects
      if (movies.length) {
        this.setData({
          movies: [
            ...this.data.movies,
            ...movies
          ],
          page
        })
      } else {
        this.setData({
          hasMore: false
        })
      }
      console.log(res)
    })
    .catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  onSearch(event) {
    this.setData({
      searchMovie: event.detail,
      movies: [],
      page: 1,
      hasMore: true
    })
    this.loadmore()
  },

  onCancel() {
    console.log('cancel')
  },

  // loadmore
  onReachBottom() {
    this.loadmore()
  },

  viewDetail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  }
})
