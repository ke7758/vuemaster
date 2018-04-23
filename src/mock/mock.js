import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { data } from './data/user'
let _Users = data

// axios.defaults.baseURL = 'https://manager.bxin99.com/'

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)
    // mock.defaults.baseURL = 'https://manager.bxin99.com/'
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }])
        }, 1000)
      })
    })

    // 获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, product, pagesize} = config.params
      let mockUsers = _Users.filter(user => {
        if (product && user.product.indexOf(product) === -1) return false
        return true
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }])
        }, 1000)
      })
    })
  }
}
