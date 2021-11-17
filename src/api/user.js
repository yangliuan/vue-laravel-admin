import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'api/admin/info',
    method: 'get'
  })
}

export function getSysinfo() {
  return request({
    url: 'api/admin/sysinfo',
    method: 'get'
  })
}

export function syslog(query) {
  return request({
    url: 'api/admin/syslogs',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: 'api/admin/logout',
    method: 'post'
  })
}

