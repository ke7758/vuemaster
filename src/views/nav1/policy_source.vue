<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="保险公司:" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
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

    <!--内容区-->
    <el-col :span="24" class="table_top_bar">
      <el-button icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
      <el-button icon="el-icon-refresh">重新解析</el-button>
    </el-col>
    <el-table border stripe highlight-current-row ref="multipleTable" v-loading="listLoading" :data="users" tooltip-effect="dark">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="product" label="文件名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="保险公司" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="企业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="产品" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex" type="success">已确认</el-tag>
          <el-tag v-else type="danger">未确认</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="时间" show-overflow-tooltip></el-table-column>
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

    <!-- 功能弹窗 -->
    <template>
      <el-dialog :visible.sync="dialogVisible" width="40%">
        <span slot="title">导入数据</span>
        <div class="dialogCont">
          <el-form label-width="80px">
          <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form-item label="保险公司:">
                      <el-select v-model="formInline.value" placeholder="请选择">
                        <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="投保企业:">
                      <el-select v-model="formInline.value" placeholder="请选择">
                        <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="保险产品:">
                      <el-select v-model="formInline.value" placeholder="请选择">
                        <el-option v-for="(item,index) of selectDate" :key="index" :label="item.name" :value="item.val">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上传保单:">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :on-exceed="handleExceed">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                      </el-upload>
                    </el-form-item>
                    
                </div>
              </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="下载模版:">
                  <el-button size="small" type="primary">点击下载</el-button>
                </el-form-item>
              </div>
              </el-col>
          </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </template>
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
      },
      // 上传文件
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    mounted() {
      this.getUsers();
    }
  };

</script>
