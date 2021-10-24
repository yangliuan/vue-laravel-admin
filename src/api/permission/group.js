import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `/admin/group${params || ''}`,
    method: 'get'
  })
}

export function update(params, id) {
  return request({
    url: `/admin/group/${id}`,
    method: 'put',
    data: params
  })
}

export function add(params) {
  return request({
    url: '/admin/group',
    method: 'post',
    data: params
  })
}

export function del(id) {
  return request({
    url: `/admin/group/${id}`,
    method: 'DELETE'
  })
}

export function detail(id) {
  return request({
    url: `/admin/group/${id}`,
    method: 'get'
  })
}

export function getRules(params) {
  return request({
    url: `/admin/group/rules${params || ''}`,
    method: 'get'
  })
}

export function updateRules(params, id) {
  return request({
    url: `/admin/group/set/${id}`,
    method: 'put',
    data: params
  })
}
