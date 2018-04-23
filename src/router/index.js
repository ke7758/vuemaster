import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/Home'
import indexPage from '@/components/pages'
import InsuranceIndex from '@/views/nav1/insurance_index.vue' // 保险公司
import InsuranceProduct from '@/views/nav1/insurance_product.vue' // 保险产品
import PolicySource from '@/views/nav1/policy_source.vue' // 保单导入
import PolicyGroup from '@/views/nav1/policy_group.vue' // 团单列表
import PolicyPperson from '@/views/nav1/policy_person.vue' // 个单列表
import ClaimsIndex from '@/views/nav1/claims_index.vue' // 直付理赔
import MedicalData from '@/views/nav1/medical_data.vue' // 医疗数据
import ApplicationInfo from '@/views/nav1/application_info.vue' // 数据理赔申请信息
import ClaimData from '@/views/nav1/claim_data.vue' // 数据理赔医疗数据
import QueryData from '@/views/nav1/query_data.vue' // 数据查询管理

// form
import Addproduct from '@/views/nav1/form/addproduct_form.vue' // 数据查询管理

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
      children: [
        { path: '', component: indexPage, name: '首页' }
      ]
    },
    {
      path: '/nav1',
      name: '保险管理',
      component: HomePage,
      children: [
        { path: 'insurance_index', component: InsuranceIndex, name: '保险公司' },
        { path: 'insurance_product', component: InsuranceProduct, name: '保险产品' },
        { path: 'policy_source', component: PolicySource, name: '保单导入' },
        { path: 'policy_group', component: PolicyGroup, name: '团单列表' },
        { path: 'policy_person', component: PolicyPperson, name: '个单列表' },
        { path: 'claims_index', component: ClaimsIndex, name: '直付理赔' },
        { path: 'medical_data', component: MedicalData, name: '医疗数据' },
        { path: 'application_info', component: ApplicationInfo, name: '数据理赔申请信息' },
        { path: 'claim_data', component: ClaimData, name: '数据理赔医疗数据' },
        { path: 'query_data', component: QueryData, name: '数据查询管理' },

        // form
        { path: 'addproduct_form', component: Addproduct, name: '保险产品' }
      ]
    },
    { path: '*', redirect: '/' }
  ]

})
