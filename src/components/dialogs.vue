<template>
    <el-dialog
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show">
      <span slot="title" class="dialog-footer">{{dialogTitle}}</span>
      <div class="dialogCont">
        {{dialogCont}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{cancelBtnText}}</el-button>
        <el-button type="primary" @click="visible = false">{{confirmBtnText}}</el-button>
      </span>
    </el-dialog>
</template>

<script>
    export default {
      data () {
          return {
              visible: this.show
          };
      },
      props: {
        show: {
            type: Boolean,
            default: false
        },
        dialogTitle: {
          type: String,
          default: '标题'
        },
        dialogCont: {
          type: String,
          default: '内容'
        },
        confirmBtnText:{
            type:String,
            default:"确定"
        },
        //取消按钮文字，需传入
        cancelBtnText:{
            type:String,
            default:"取消"
        }
      },
      watch: {
        show () {
            this.visible = this.show;
        },
        hide(){
            this.showFlag = false;
        }
      }
    };
</script>