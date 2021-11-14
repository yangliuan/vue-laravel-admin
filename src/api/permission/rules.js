import request from '@/utils/request'

export function indexRules(query) {
  return request({
    url: 'api/admin/rules',
    method: 'get',
    params: query
  })
}

export function storeRules(params) {
  return request({
    url: 'api/admin/rules',
    method: 'post',
    data: params
  })
}

export function getRules(id) {
  return request({
    url: `api/admin/rules/${id}`,
    method: 'get'
  })
}

export function updateRules(params, id) {
  return request({
    url: `api/admin/rules/${id}`,
    method: 'put',
    data: params
  })
}

export function destroyRules(id) {
  return request({
    url: `api/admin/rules/${id}`,
    method: 'DELETE'
  })
}

export function switchRulesStatus(id) {
  return request({
    url: `api/admin/rules/status/${id}`,
    method: 'put'
  })
}

export function switchRulesLogStatus(id) {
  return request({
    url: `api/admin/rules/log-status/${id}`,
    method: 'put'
  })
}

