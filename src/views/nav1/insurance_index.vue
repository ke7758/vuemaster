<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formInline.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="formInline.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-form-item prop="start_date">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="formInline.start_date" :picker-options="pickerBeginDateBefore"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="form-time-line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="end_date">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="formInline.end_date" :picker-options="pickerBeginDateAfter"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="formInline.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--内容区-->
    <el-col :span="24" class="table_top_bar">
      <el-button type="primary" icon="el-icon-upload">上传</el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="danger" icon="el-icon-check">保存修改</el-button>
    </el-col>
    <el-table
      border
      highlight-current-row
      ref="multipleTable"
      v-loading="listLoading"
      :data="users"
      tooltip-effect="dark">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="img" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.img">
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.sex === 0 ? "女" : "男"}}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birth" label="生日" show-overflow-tooltip></el-table-column>
      <el-table-column prop="product" label="保险产品" show-overflow-tooltip></el-table-column>
      <el-table-column prop="addr" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>

    <!--底部工具-->
    <el-col :span="24" class="table_foot_bar">
      <el-button @click="toggleSelection([users[1], users[2]])">切换第二、第三行的选中状态</el-button>
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
        age: '',
        name: '',
        region: '',
        start_date: '',
        end_date: '',
        daterange: ''
      },
      total: 0,
      page: 1,
      pagesize: 10,
      users: [], // 初始化数据
      listLoading: false, // 列表loading
      isloading: false, // 页面loading
      editLoading: false, // 修改提交loading
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      currentPage: 1, // 前往页数
      pickerBeginDateBefore: { // 开始日期选择判断
        disabledDate: (time) => {
          let beginDateVal = this.formInline.end_date
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      pickerBeginDateAfter: { // 结束日期选择判断
        disabledDate: (time) => {
          let beginDateVal = this.formInline.start_date
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      rules: {
        age: [
          {required: true, message: '年龄不能为空'},
          {type: 'number', message: '年龄必须为数字值'}
        ],
        name: [
          {required: true, message: '请输入活动名称'}, // , trigger: 'blur'
          {min: 3, max: 5, message: '长度在 3 到 5 个字符'}
        ],
        region: [
          {required: true, message: '请选择活动区域'} // , trigger: 'change'
        ],
        start_date: [
          {type: 'date', required: true, message: '请选择开始日期'}
        ],
        end_date: [
          {type: 'date', required: true, message: '请选择结束日期'}
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        name: this.formInline.name,
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
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
    // // 显示编辑界面
    // handleEdit: function (index, row) {
    //   this.editFormVisible = true
    //   this.editForm = Object.assign({}, row)
    // }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
