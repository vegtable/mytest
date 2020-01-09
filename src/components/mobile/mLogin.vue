<template>
<div>
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  ></van-nav-bar>
  <van-cell-group>
    <van-field
      v-model="loginUser.username"
      required
      clearable
      label="用户名"
      right-icon="question-o"
      placeholder="请输入用户名"
    ></van-field>

    <van-field
      v-model="loginUser.password"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
    ></van-field>

  </van-cell-group>

  <van-row type="flex" justify="center">
    <van-col span="6"><van-button type="primary" size="normal" @click="doLogin">登录</van-button></van-col>
    <van-col span="6"><van-button type="primary" size="normal" @click="goReg">注册</van-button></van-col>
  </van-row>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item replace to="/mindex" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/oneCourseTable" icon="orders-o">我的</van-tabbar-item>
    <van-tabbar-item replace to="/mLogin" icon="user-o">登录</van-tabbar-item>
  </van-tabbar>
</div>

</template>

<script>
    export default {
        name: "mLogin",
      data(){
          return{
            active:2,
            loginUser:{
              username:'',
              password:''
            }
          }
      },
      methods:{
        onClickLeft() {
          this.$router.push("/mIndex")
        },
        onChange(index) {
          console.log(index)
        },
        doLogin(){
          let url =this.websiteUrl+ '/webapp/Login/LoginUser';
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
                that.$router.replace("/mIndex")
              }
            }).catch(function (error) {
            console.log("登录出错")
          })
        },
        goReg(){
          this.$router.replace("/mRegister")
        }
      }
    }
</script>

<style scoped>
.van-row{
  margin-top: 40px;
}
</style>
