import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/personnel/list',
    method: 'get',
    params: query
  })
}

export function fetchPersonnel(id) {
  return request({
    url: '/vue-element-admin/personnel/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/personnel/pv',
    method: 'get',
    params: { pv }
  })
}

export function createPersonnel(data) {
  return request({
    url: '/vue-element-admin/personnel/create',
    method: 'post',
    data
  })
}

export function updatePersonnel(data) {
  return request({
    url: '/vue-element-admin/personnel/update',
    method: 'post',
    data
  })
}

export function deletePersonnel(id) {
  return request({
    url: '/vue-element-admin/personnel/delete',
    method: 'post',
    data: { id }
  })
}
