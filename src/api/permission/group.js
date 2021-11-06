import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `api/admin/group${params || ''}`,
    method: 'get'
  })
}

export function update(params, id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'put',
    data: params
  })
}

export function add(params) {
  return request({
    url: 'api/admin/group',
    method: 'post',
    data: params
  })
}

export function del(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'DELETE'
  })
}

export function detail(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'get'
  })
}

export function groupSelectMenus(title) {
  return request({
    url: 'api/admin/group/select-menus',
    method: 'get',
    params: { title }
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
