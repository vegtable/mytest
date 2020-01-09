<template>
  <div>
    <el-row>
      <el-col :offset="9" :span="7">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" placeholder="请输入手机号" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="sname">
            <el-input type="text" v-model="ruleForm.sname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="validatecode">
            <div class="jc-component__range">
              <div class="jc-range" :class="rangeStatus?'success':''">
                <i @mousedown="rangeMove" :class="rangeStatus?successIcon:startIcon"></i>
                {{rangeStatus?successText:startText}}
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doReg">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Register",
    props: {
      // 成功之后的函数
      successFun: {
        type: Function
      },
      //成功图标
      successIcon: {
        type: String,
        default: 'el-icon-success'
      },
      //成功文字
      successText: {
        type: String,
        default: '验证成功'
      },
      //开始的图标
      startIcon: {
        type: String,
        default: 'el-icon-d-arrow-right'
      },
      //开始的文字
      startText: {
        type: String,
        default: '拖动滑块到最右边'
      },
      //失败之后的函数
      errorFun: {
        type: Function
      },
      //或者用值来进行监听
      status: {
        type: String
      }
    },
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var checkSname = (rule, value, callback) => {
        if (!value)
          return callback(new Error('姓名不能为空'));
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        disX: 0,
        rangeStatus: false,
        ruleForm: {
          username: '',
          sname: '',
          password: '',
          checkPass: '',
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          sname: [
            {validator: checkSname, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      doReg() {
        if (this.rangeStatus) {
          let url = this.websiteUrl+"/webapp/Login/RegUser"
          let that = this;
          this.$axios.post(url, this.ruleForm)
            .then(function (response) {
              if (response.data.code == 200) {
                that.$router.replace("/pLogin");
              }
              else {
                that.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }
            })
            .catch(function (error) {
            that.$message({
              message: "注册失败",
              type: 'error'
            });
          })
        } else {
          this.$message({
            message: '请滑动验证',
            type: 'warning'
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
//滑块移动
      rangeMove(e) {
        let ele = e.target;
        let startX = e.clientX;
        let eleWidth = ele.offsetWidth;
        let parentWidth = ele.parentElement.offsetWidth;
        let MaxX = parentWidth - eleWidth;
        if (this.rangeStatus) {//不运行
          return false;
        }
        document.onmousemove = (e) => {
          let endX = e.clientX;
          this.disX = endX - startX;
          if (this.disX <= 0) {
            this.disX = 0;
          }
          if (this.disX >= MaxX - eleWidth) {//减去滑块的宽度,体验效果更好
            this.disX = MaxX;
          }
          ele.style.transition = '.1s all';
          ele.style.transform = 'translateX(' + this.disX + 'px)';
          e.preventDefault();
        }
        document.onmouseup = () => {
          if (this.disX !== MaxX) {
            ele.style.transition = '.5s all';
            ele.style.transform = 'translateX(0)';
            //执行失败的函数
            this.errorFun && this.errorFun();
          } else {
            this.rangeStatus = true;
            if (this.status) {
              this.$parent[this.status] = true;
            }
            //执行成功的函数
            this.successFun && this.successFun();
          }
          document.onmousemove = null;
          document.onmouseup = null;
        }
      },

    }

  }
</script>

<style lang="scss" scoped>
  @mixin jc-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .jc-component__range {
    .jc-range {
      background-color: #FFCCCC;
      position: relative;
      transition: 1s all;
      user-select: none;
      color: #333;
      @include jc-flex;
      height: 45px;
      /*no*/
      &.success {
        background-color: #7AC23C;
        color: #fff;
        i {
          color: #7AC23C;
        }
      }
      i {
        position: absolute;
        left: 0;
        width: 60px;
        height: 100%;
        color: #919191;
        background-color: #fff;
        border: 1px solid #bbb;
        cursor: pointer;
        @include jc-flex;
      }
    }
  }

</style>
