<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>保险产品信息</el-breadcrumb-item>
            <el-breadcrumb-item>添加产品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline" label-width="120px">
            <el-col :span="24" class="toolbar">
                <el-col :span="8" class="toolbar">
                    <el-form-item label="产品名称:" prop="name">
                        <el-input placeholder="产品名称" v-model="formInline.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="toolbar">
                    <el-form-item label="保险公司:" prop="region">
                        <el-select v-model="formInline.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="保险公司:">
                        <el-select v-model="formInline.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="第三方产品ID:">
                        <el-input placeholder="第三方产品ID"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="渠道ID:">
                        <el-input placeholder="渠道ID"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="活动ID:">
                        <el-input placeholder="活动ID"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="推广ID:">
                        <el-input placeholder="推广ID"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="推广位ID:">
                        <el-input placeholder="推广位ID"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8" class="toolbar">
                    <el-form-item label="推广地址:">
                        <el-input placeholder="推广地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="toolbar">
                    <el-form-item label="有效期:">
                        <el-col :span="10">
                            <el-input placeholder="有效期" v-bind:disabled="radicodisabled"></el-input>
                        </el-col>
                        <el-col :span="13" :offset="1">
                            <el-radio-group v-model="formInline.radio" @change="radioChange">
                                <el-radio class="radio" :label="false">月</el-radio>
                                <el-radio class="radio" :label="true">终身</el-radio> 
                            </el-radio-group>
                        </el-col>
                    </el-form-item>
                </el-col>

            </el-col>
            <el-col :span="24" style="text-align: center">
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            radicodisabled: false,
            formInline: {
                user: '',
                radio: false,
                region: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择保险公司', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        radioChange(value){
            // console.log(value)
            this.radicodisabled = value
            
        }
    }
}
</script>