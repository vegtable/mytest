<template>
  <div class="bg">
    <el-row>
      <el-col :offset="9" :span="7">
        <el-form :model="loginUser" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <h2>选课系统登录</h2>
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginUser.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div id="slider">
              <slide-verify :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            :slider-text="text"
              ></slide-verify>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doReg">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      var checkUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        }
      };
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        }
      };

      return {
        validate: false,
        text: '滑动滑块验证',
        loginUser: {
          username: '',
          password: '',
        },
        loginSuccessful: {},
        rules: {
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ],

        }
      };
    },
    mounted(){

    },
    methods: {

      onSuccess() {
        this.validate = true;
        this.$message({
          message: '验证成功',
          type: 'success'

        })
      },
      onFail() {
        this.validate = false;
        this.$message({
          message: '验证失败',
          type: 'warning'

        })
      },
      onRefresh() {
        this.validate = false;
      },
      doLogin: function () {
        if (!this.validate) {

          this.$message({
            message: '请滑动滑块验证',
            type: 'error',

          })
        } else {

          console.log('发送登录请求')
          let url = this.websiteUrl+'/webapp/Login/LoginUser';
          let that = this;
          this.$axios.get(url, {
            params: {
              username: that.loginUser.username,
              password: that.loginUser.password
            }
          })
            .then(function (response) {
              if (response.data.code == 200) {
                console.log("登录成功" + response.data.data);
                that.loginSuccessful=response.data.data;
                localStorage.setItem("47.105.83.179:8080",JSON.stringify(that.loginSuccessful));
                window.location.href="/pIndex";
              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
              }
            }).catch(function (error) {
              that.$message({
              message:"登录出错",
              type: 'error'
            });
          })
        }
      },
      doReg:function () {
        this.$router.push('/pRegister')
      }


    }

  }
</script>

<style scoped>
  .el-form {
    height: 500px;
    margin: 0 auto;
    text-align: center;
    margin-top: 180px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.6) !important;
  }

  .el-form-item {
    width: 360px;
  }

  .bg {
    width: 1500px;
    height: 800px;
    overflow: hidden;
    position: relative;
    background-image: url("../../assets/images/timg.jpg");

  }

  #slider {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
