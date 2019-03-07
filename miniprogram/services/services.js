// 封装接口 services
import apis from './api'
import http from '../helper/http'

// 获取热映电影
exports.getInTheaters = function(params) {
  return http(apis.in_theaters, 'GET', params)
}

// 获取将要上映电影
exports.getUpcomings = function(params) {
  return http(apis.coming_soon, 'GET', params)
}

// 获取具体id电影条目

exports.getMovieDetail = function(params) {
  return http(`${apis.coming_soon}/${params}`, 'GET')
}
