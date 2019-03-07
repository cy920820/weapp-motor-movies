// 封装接口 services
import apis from './api'
import http from '../helper/http'

exports.getInTheaters = function(params) {
  return http(apis.in_theaters, 'GET', params)
}

exports.getUpcomings = function(params) {
  return http(apis.coming_soon, 'GET', params)
}
