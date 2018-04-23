<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="保险公司名称:" prop="value">
          <el-input v-model="formInline.name" placeholder="保险公司名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 功能 -->
    <el-col :span="24" class="table_top_bar">
      <el-button icon="el-icon-circle-check-outline">同意</el-button>
      <el-button icon="el-icon-circle-close-outline">驳回</el-button>
      <el-button icon="el-icon-edit-outline">申请文件</el-button>
      <el-button icon="el-icon-search">查询结果</el-button>
    </el-col>
    <!--内容区-->
    <el-table
    border
    stripe
    highlight-current-row
    ref="multipleTable"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    v-loading="listLoading"
    :data="users"
    tooltip-effect="dark">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="product" label="编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="保险公司" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birth" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <!--scope.row.sex-->
          <el-tag v-if="scope.row.minnum == '1'">待确认</el-tag>
          <el-tag v-if="scope.row.minnum == '2'">待查询</el-tag>
          <el-tag v-if="scope.row.minnum == '3'" type="success">已查询</el-tag>
          <el-tag v-if="scope.row.minnum == '4'" type="info">驳回</el-tag>
          <el-tag v-if="scope.row.minnum == '5'" type="danger">处理异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="minnum" label="申请人数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="查询人数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="minnum" label="查询次数" show-overflow-tooltip></el-table-column>

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
            name: "待确认",
            val: "option1"
          },
          {
            name: "待查询",
            val: "option2"
          },
          {
            name: "已查询",
            val: "option3"
          },
          {
            name: "驳回",
            val: "option4"
          },
          {
            name: "处理异常",
            val: "option5"
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
      // 表格筛选
      filterHandler(value, row, column) {
        console.log(value, row, column)
        // const property = column['property'];
        // return row[property] === value;
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