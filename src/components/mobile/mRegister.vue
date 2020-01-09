<template>
  <div id="notify">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-cell-group :model="userForm">
      <van-field
        v-model="userForm.username"
        required
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
      ></van-field>
      <van-field
        v-model="userForm.sname"
        required
        label="姓名"
        right-icon="question-o"
        placeholder="请输入姓名"
      ></van-field>
      <van-field
        v-model="userForm.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      ></van-field>
      <van-field
        v-model="userForm.checkPass"
        type="password"
        label="确认密码"
        placeholder="请输入密码"
        required
      ></van-field>
    </van-cell-group>
    <van-row type="flex" justify="center">
      <van-col span="8">
        <van-button type="primary" size="normal" @click="doReg">注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "mRegister",
    data() {

      return {
        userForm: {
          username: '',
          sname: '',
          password: '',
          checkPass: '',
        },

      }

    },
    mounted() {

    },
    methods: {
      onClickLeft() {
        this.$router.replace("/mLogin")
      },
      doReg() {
        let that=this;
        if (this.userForm.username === '') {
          this.$notify({
            message: '用户名不能为空',
            duration: 1000,
          })
        }
        else if (this.userForm.password === '') {
          this.$notify({
            message: '密码不能为空',
            background:'red',
            duration: 1000,
          })
        } else if (this.userForm.password !== this.userForm.checkPass) {
          this.$notify({
            message: '两次密码不一致',
            background:'red',
            duration: 1000,
          })
        } else {
          let url = this.websiteUrl+"/webapp/Login/RegUser"
          let that = this;
          this.$axios.post(url, this.userForm)
            .then(function (response) {
              if (response.data.code == 200) {
                that.$router.replace("/mLogin");
              }
              else {
                that.$notify(response.data.msg);
              }
            })
            .catch(function (error) {
              console.log("注册出错")
            })
        }
      }
    }
  }
</script>

<style scoped>
  .van-row {
    margin-top: 40px;
  }
</style>
