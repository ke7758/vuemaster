import Mock from 'mockjs'

const data = []

for (let i = 0; i < 86; i++) {
  data.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    product: Mock.mock('@ctitle(7, 17)'),
    company: Mock.mock('@ctitle(10, 17)'),
    type: Mock.mock('@cword(2)'),
    money: Mock.mock('@integer(120, 1000)'),
    minage: Mock.mock('@integer(10, 40)'),
    maxage: Mock.mock('@integer(60, 90)'),
    minnum: Mock.mock('@integer(1, 5)'),
    img: Mock.Random.dataImage('30x30', 'mock的图片'),
    sex: Mock.Random.integer(0, 1)
  }))
}

export { data }
