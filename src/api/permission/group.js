import request from '@/utils/request'

export function indexGroup(query) {
  return request({
    url: 'api/admin/group',
    method: 'get',
    params: query
  })
}

export function storeGroup(params) {
  return request({
    url: 'api/admin/group',
    method: 'post',
    data: params
  })
}

export function getGroup(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'get'
  })
}

export function updateGroup(params, id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'put',
    data: params
  })
}

export function destroyGroup(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'DELETE'
  })
}

export function switchGroupStatus(id) {
  return request({
    url: `api/admin/group/status/${id}`,
    method: 'put'
  })
}

export function groupSelectMenus(title) {
  return request({
    url: 'api/admin/group/select-menus',
    method: 'get',
    params: { title }
  })
}

export function getAllRules(query) {
  return request({
    url: 'api/admin/group/rules',
    method: 'get',
    params: query
  })
}

export function setRules(params, id) {
  return request({
    url: `api/admin/group/set/${id}`,
    method: 'put',
    data: params
  })
}

