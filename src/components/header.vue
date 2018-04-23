<template>
  <div class="header">
    <h1 class="logo"><a href="#">保险信息化服务平台-运营端</a></h1>
    <el-menu class="el-menu-demo head-menu" mode="horizontal" @select="handleSelect">
      <template v-for="(item,index) in menuList">
        <el-menu-item :index="index+''" :to="item.to" :from="item.to" v-on:click="change(item.leftnav)"><i class="el-icon-date"></i>{{item.text}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {menuDatas} from '../assets/datas/jsondata.js'
export default {
  data () {
    return {
      leftdb: [],
      activeIndex: '1',
      menuList: menuDatas
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    change (db) {
      this.leftdb = db;
      console.log(db)
    }
  }
}
</script>
<style lang="scss" src="../assets/scss/_header.scss" scoped></style>
