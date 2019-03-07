let origin = 'https://douban.uieee.com'

let apis = {
  // 正在热映
  'in_theaters': '/v2/movie/in_theaters',
  // 即将上映
  'coming_soon': '/v2/movie/coming_soon'
}

Object.keys(apis).forEach(key => {
  apis[key] = `${origin}${apis[key]}`
})

module.exports = apis
