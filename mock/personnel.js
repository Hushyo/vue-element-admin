
const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p>'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    content_short: 'mock data',
    content: baseContent,
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    'role|1': ['admin', 'user'],
    display_time: '@datetime',
    comment_disabled: true
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/personnel/list',
    type: 'get',
    response: config => {
      const { role, type, name, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (role && item.role !== role) return false
        if (type && item.type !== type) return false
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/personnel/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/personnel/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/personnel/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/personnel/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/personnel/delete',
    type: 'post',
    response: config => {
      const { id } = config.body
      const index = List.findIndex(item => item.id === +id)
      if (index > -1) {
        List.splice(index, 1)
        return {
          code: 20000,
          data: 'success'
        }
      } else {
        return {
          code: 50000,
          message: '删除失败，数据不存在'
        }
      }
    }
  }
]
