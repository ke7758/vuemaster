<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="保险公司:" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="(item,index) of selectDate"
              :key="index"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保险产品名称:" prop="product">
          <el-input v-model="formInline.product" placeholder="保险产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--内容区-->
    <el-col :span="24" class="table_top_bar">
      <router-link to="addproduct_form"><el-button icon="el-icon-plus">添加</el-button></router-link>
      <el-button icon="el-icon-date">产品版本</el-button>
      <el-button icon="el-icon-edit-outline">修改</el-button>
      <el-button icon="el-icon-sort">启用/禁用</el-button>
    </el-col>
    <el-table
      border
      stripe
      highlight-current-row
      ref="multipleTable"
      v-loading="listLoading"
      :data="users"
      tooltip-effect="dark">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="product" label="产品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="保险公司" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="产品类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="基础价格" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="有效期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minage" label="最小适用年龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="maxage" label="最大适用年龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="适用性别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="最小保险人数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="保险有效份数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minage" label="产品等待期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="适用环境" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="是否税优" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.sex === 0 ? "是" : "否"}}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="是否需要核保" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.sex === 0 ? "是" : "否"}}
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="状态" show-overflow-tooltip width="70">
        <template slot-scope="scope">
          <!--scope.row.sex-->
          <el-tag v-if="scope.row.sex" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!--底部工具-->
    <el-col :span="24" class="table_foot_bar">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-col>

    <!--翻页-->
    <el-col :span="24">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>

  </section>
</template>

<script>
import { getUserListPage } from '../../api/api'
export default {
  data () {
    return {
      formInline: {
        product: '',
        value: ''
      },
      selectDate: [
        { name: '太平养老股份有限公司重庆分公司1', val: 'option1' },
        { name: '太平养老股份有限公司重庆分公司2', val: 'option2' },
        { name: '太平养老股份有限公司重庆分公司3', val: 'option3' }
      ],
      total: 0,
      page: 1,
      pagesize: 10,
      users: [], // 初始化数据
      listLoading: false, // 列表loading
      currentPage: 1 // 前往页数
    }
  },
  methods: {
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        product: this.formInline.product,
        pagesize: this.pagesize
      }
      this.listLoading = true
      getUserListPage(para).then((res) => {
        console.log(res.data)
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
      })
    },
    // 重置功能条
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.getUsers()
    },
    // 翻页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUsers()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getUsers()
    },
    // 表格
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
