Component({
  properties: {
    summary: String
  },

  data: {
    isClose: true
  },

  methods: {
    collapse() {
      let isClose = this.data.isClose
      this.setData({
        isClose: !this.data.isClose
      })
    }
  }
})
