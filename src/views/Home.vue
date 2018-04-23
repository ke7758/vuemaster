<template>
  <el-container>
    <el-header style="height: 73px;">
      <div class="header">
        <h1 class="logo"><a href="#">保险信息化服务平台-运营端</a></h1>
        <el-menu class="el-menu-demo head-menu" mode="horizontal" @select="handleselect">
          <template v-for="(item,index) of menuList">
            <el-menu-item :index="index+''" v-on:click="change(item.leftnav)" :key="index">
              <i :class="item.iconCls"></i>{{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 210px;">
        <div class="aside-menu">
          <el-menu class="el-menu-vertical-demo" @open="handleopen"
                   @close="handleclose" @select="handleselect" unique-opened>
            <template v-for="(item,index) of leftdb" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child of item.children" :index="child.to" :key="child.id" v-if="!child.hidden">
                  <router-link v-bind:to="child.to" ><i :class="child.iconCls"></i>{{child.name}}</router-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&!item.children" :index="item.to" :key="item.name">
                <router-link :to="item.to" ><i :class="item.iconCls"></i>{{item.name}}</router-link>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <template v-if="$route.name != '首页'">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item of $route.matched" :key="item.name">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </el-main>
        <el-footer>
          重庆海盛保信 信息科技有限公司 © 2017-2019
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { menuDatas } from "../assets/datas/jsondata.js";
export default {
  data() {
    return {
      name: "menus",
      activeIndex: "1",
      menuList: menuDatas,
      leftdb: menuDatas.nav01.leftnav
    };
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    handleopen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleclose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleselect(key, keyPath) {
      console.log(key, keyPath);
      // console.log(this.$route)
    },
    change(db) {
      this.leftdb = db;
      console.log(db);
    }
  }
};
</script>
<style lang="scss" src="../assets/scss/_home.scss" scoped></style>
