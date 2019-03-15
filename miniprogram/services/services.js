// 封装接口 services
import apis from './api'
import http from '../helper/http'

/**
 * @param {type} 类型
 * @param {page} 页码
 * @param {count} 分页数量
 * @param {search} 搜索关键词
 * @returns {Promise} 返回抓取的列表数据
 */

// 获取列表类电影
exports.getMovieList = function(type, page = 1, count = 20, search = '') {
  let params = {
    start: (page - 1) * count,
    count,
    city: getApp().data.currentCity
  }

  params = search ? Object.assign(params, { tag: search }) : params

  return http(apis[type], 'GET', params).then(res => res.data)
}

// 查询具体id电影条目
exports.findMovieById = function(id) {
  return http(`${apis.subject}/${id}`, 'GET').then(res => res.data)
}
