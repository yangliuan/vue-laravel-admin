import request from '@/utils/request'

export function indexAdmin(query) {
  return request({
    url: 'api/admin/admin',
    method: 'get',
    params: query
  })
}

export function storeAdmin(params) {
  return request({
    url: 'api/admin/admin',
    method: 'post',
    data: params
  })
}

export function getAdmin(id) {
  return request({
    url: `api/admin/group/${id}`,
    method: 'get'
  })
}

export function updateAdmin(params, id) {
  return request({
    url: `api/admin/admin/${id}`,
    method: 'put',
    data: params
  })
}

export function destroyAdmin(id) {
  return request({
    url: `api/admin/admin/${id}`,
    method: 'DELETE'
  })
}

export function switchStatus(id) {
  return request({
    url: `api/admin/admin/status/${id}`,
    method: 'put',
  })
}
