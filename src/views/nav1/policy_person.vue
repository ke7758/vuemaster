<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="员工名称:" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码:" prop="value">
          <el-input v-model="formInline.name" placeholder="身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="保单号:" prop="value">
          <el-input v-model="formInline.name" placeholder="保单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--内容区-->
    
    <el-table border stripe highlight-current-row ref="multipleTable" v-loading="listLoading" :data="users" tooltip-effect="dark">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="product" label="文件名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="企业名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="保险公司" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="产品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="保障保额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="个人基金保额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="剩余保障保额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="剩余个人基金保额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birth" label="生效期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birth" label="失效期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="投保人数" show-overflow-tooltip></el-table-column>
    </el-table>

    <!--底部工具-->
    <el-col :span="24" class="table_foot_bar">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-col>

    <!--翻页-->
    <el-col :span="24">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>

    
  </section>
</template>

<script>
  
  import { getUserListPage } from "../../api/api";
  
  export default {
    data() {
      return {
        dialogVisible: false,
        formInline: {
          name: "",
          value: ""
        },
        selectDate: [{
            name: "太平养老股份有限公司重庆分公司1",
            val: "option1"
          },
          {
            name: "太平养老股份有限公司重庆分公司2",
            val: "option2"
          },
          {
            name: "太平养老股份有限公司重庆分公司3",
            val: "option3"
          }
        ],
        total: 0,
        page: 1,
        pagesize: 10,
        users: [], // 初始化数据
        listLoading: false, // 列表loading
        currentPage: 1 // 前往页数
      };
    },
    methods: {
      open() {
          this.show = true;
      },
      // 获取用户列表
      getUsers() {
        let para = {
          page: this.page,
          name: this.formInline.name,
          pagesize: this.pagesize
        };
        this.listLoading = true;
        getUserListPage(para).then(res => {
          console.log(res.data);
          this.total = res.data.total;
          this.users = res.data.users;
          this.listLoading = false;
        });
      },
      // 重置功能条
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 提交查询
      submitForm() {
        console.log(this.formInline.name, this.formInline.value);
      },
      // 翻页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getUsers();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getUsers();
      },
      // 表格
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      }
    },
    mounted() {
      this.getUsers();
    }
  };

</script>
