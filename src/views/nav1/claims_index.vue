<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="企业名称:" prop="value">
          <el-input v-model="formInline.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="流水号:" prop="value">
          <el-input v-model="formInline.name" placeholder="流水号"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="value">
          <el-form-item prop="start_date">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="formInline.start_date" :picker-options="pickerBeginDateBefore"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="结束时间:" prop="value">
          <el-form-item prop="end_date">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="formInline.end_date" :picker-options="pickerBeginDateAfter"></el-date-picker>
          </el-form-item>
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
      <el-table-column prop="product" label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="企业名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="理赔金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="理赔人数" show-overflow-tooltip></el-table-column>      
      <el-table-column prop="birth" label="系统时间" show-overflow-tooltip></el-table-column>
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
          start_date: '',
          end_date: '',
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