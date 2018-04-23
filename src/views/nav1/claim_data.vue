<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="批次号:" prop="value">
          <el-input v-model="formInline.name" placeholder="批次号"></el-input>
        </el-form-item>
        <el-form-item label="证件号:" prop="value">
          <el-input v-model="formInline.name" placeholder="证件号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 功能 -->
    <el-col :span="24" class="table_top_bar">
      <el-button icon="el-icon-download">医疗数据导出</el-button>
    </el-col>
    <!--内容区-->
    <el-table border stripe highlight-current-row ref="multipleTable" v-loading="listLoading" :data="users" tooltip-effect="dark">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="product" label="被保险人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="保险公司" show-overflow-tooltip></el-table-column>
      <el-table-column prop="money" label="就诊医院" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="证件号码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birth" label="提交时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">查看</el-button>
        </template>
      </el-table-column>
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