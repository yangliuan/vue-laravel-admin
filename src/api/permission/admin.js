import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `api/admin/admin${params || ''}`,
    method: 'get'
  })
}

export function update(params, id) {
  return request({
    url: `api/admin/admin/${id}`,
    method: 'put',
    data: params
  })
}

export function add(params) {
  return request({
    url: 'api/admin/admin',
    method: 'post',
    data: params
  })
}

export function del(id) {
  return request({
    url: `api/admin/admin/${id}`,
    method: 'DELETE'
  })
}

export function detail(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'get'
  })
}

export function getRules(params) {
  return request({
    url: `api/admin/group/rules${params || ''}`,
    method: 'get'
  })
}

export function updateRules(params, id) {
  return request({
    url: `api/admin/group/set/${id}`,
    method: 'put',
    data: params
  })
}

export function getGroup(params) {
  return request({
    url: `api/admin/group${params || ''}`,
    method: 'get'
  })
}
