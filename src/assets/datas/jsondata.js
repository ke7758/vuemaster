const menuDatas = {
  nav01: {
    to: '/nav1/insurance_index',
    name: '保险管理',
    iconCls: 'al-icon-baoxian',
    leftnav: [
      {
        to: '/nav1/insurance_index',
        name: '保险公司',
        iconCls: 'el-icon-tickets',
        leaf: true // 只有一个节点
      },
      {
        to: '/nav1/insurance_product',
        name: '保险产品',
        iconCls: 'el-icon-tickets',
        leaf: true
      },
      {
        to: '/',
        name: '保单信息',
        iconCls: 'el-icon-tickets',
        children: [
          { to: '/nav1/policy_source', name: '保单导入' },
          { to: '/nav1/policy_group', name: '团单列表' },
          { to: '/nav1/policy_person', name: '个单列表' }
        ]
      },
      {
        to: '/nav1/claims_index',
        name: '直付理赔',
        iconCls: 'el-icon-tickets',
        leaf: true
      },
      {
        to: '/',
        name: '数据理赔',
        iconCls: 'el-icon-tickets',
        children: [
          { to: '/nav1/medical_data', name: '医疗数据' },
          { to: '/nav1/application_info', name: '数据理赔申请信息' },
          { to: '/nav1/claim_data', name: '数据理赔医疗数据' }
        ]
      },
      {
        to: '/nav1/query_data',
        name: '数据查询管理',
        iconCls: 'el-icon-tickets',
        leaf: true
      }
    ]
  },
  nav02: {
    to: '/',
    name: '用户管理',
    iconCls: 'al-icon-yonghu',
    leftnav: [
      {
        to: '/nav1',
        name: '保险信息2',
        iconCls: 'el-icon-message',
        children: [
          { to: '/nav1/list03_1', name: '保单导入' },
          { to: '/nav1/list03_2', name: '团单列表' },
          { to: '/nav1/list03_3', name: '个单列表' }
        ]
      },
      {
        to: '/about',
        name: '关于',
        iconCls: 'el-icon-message',
        leaf: true // 只有一个节点
      },
      {
        to: '/',
        name: '保单信息',
        iconCls: 'el-icon-message',
        children: [
          { to: 'list01', name: '保单导入' },
          { to: 'list02', name: '团单列表' },
          { to: 'list03', name: '个单列表' }
        ]
      }
    ]
  },
  nav03: {
    to: '/',
    name: '商户管理',
    iconCls: 'al-icon-shangjia',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  },
  nav04: {
    to: '/',
    name: '开发维护',
    iconCls: 'al-icon-kaifa-xianxing',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  },
  nav05: {
    to: '/',
    name: '公众号维护',
    iconCls: 'al-icon-gongzhonghao',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  },
  nav06: {
    to: '/',
    name: '财务管理',
    iconCls: 'al-icon-caiwu',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  },
  nav07: {
    to: '/',
    name: '金融管理',
    iconCls: 'al-icon-xiangao',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  },
  nav08: {
    to: '/',
    name: '系统管理',
    iconCls: 'al-icon-xitong',
    leftnav: [
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      },
      {
        to: '/',
        name: '首页'
      }
    ]
  }
}

export {
  menuDatas
}
