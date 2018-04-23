<template>
  <el-aside style="width: 210px;">
    <div class="aside-menu">
      <router-link to="/">
        <i class="menu_divi2 menu_divi icon iconfont icon-shouye"></i>
        <p class="menu_divp2 menu_divp">首页</p>
      </router-link>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen"
               @close="handleclose" @select="handleselect" unique-opened router>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                          v-if="!child.hidden">{{child.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
            :class="item.iconCls"></i>{{item.children[0].name}}
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleopen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleclose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleselect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" src="../assets/scss/_menus.scss" scoped></style>
