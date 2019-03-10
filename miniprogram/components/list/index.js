Component({
  properties: {
    list: Array,
    title: String
  },

  data: {
  },

  // component作用域下使用methods
  methods: {
    viewDetail(event) {
      let id = event.currentTarget.id
      wx.navigateTo({
        url: `../../pages/detail/index?id=${id}`
      })
    }
  }
})
