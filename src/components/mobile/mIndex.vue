<template>
  <div>
    <van-image
      fit="contain"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    ></van-image>
    <van-notice-bar
      mode="closeable"
      left-icon="volume-o"
    >
      欢迎登录在线选课系统，请同学们根据需要自行选择、替换课程，祝同学们期末考试全过！！！！！！！
    </van-notice-bar>
    <div v-for="(course,index) in courseList" :key="index"
    >
      <van-swipe-cell>

        <van-cell :border="false">{{course.courseId}}</van-cell>

        <template slot="right">
          <van-button square type="primary" text="内容" @click="showPopup(index)"/>
          <van-button square type="primary" text="选课" @click="sCourse(index)"/>
        </template>
      </van-swipe-cell>

      <van-overlay :show="course.show">
        <div class="wrapper" @click="closePopup(index)">
          <div class="block">
            {{course.courseId}};{{course.courseName}};{{course.teacherName}};{{course.time}};{{course.address}};{{course.duration}}学时
          </div>
        </div>
      </van-overlay>
    </div>

    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item replace to="/mindex" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/oneCourseTable" icon="orders-o">我的</van-tabbar-item>
      <van-tabbar-item replace to="/mLogin" icon="user-o">登录</van-tabbar-item>
    </van-tabbar>
  </div>

</template>


<script>
  export default {
    name: "mIndex",

    data() {
      return {
        active: 0,
        courseList: [],
        loginUser: {}
      }
    },
    mounted() {
      if (localStorage.getItem("47.105.83.179:8080") != null) {
        this.loginUser = JSON.parse(localStorage.getItem("47.105.83.179:8080"));
      }
      this.getCourses()
    },
    methods: {
      showPopup(index) {
        this.courseList[index].show = true;
        console.log(this.courseList[index])
      },
      closePopup(index) {
        this.courseList[index].show = false;
      },
      sCourse(index) {
        let that = this;
        let url = this.websiteUrl+"/webapp/TimeTable/InsertTimeTable";
        this.courseList[index].username = this.loginUser.username;
        this.$axios.post(url, this.courseList[index])
          .then(function (response) {
            if (response.data.code == 200) {
              that.$notify({
                message: '添加成功',
                background: 'red',
                duration: 1000,
              })
            } else if (response.data.code == 400) {
              that.$notify({
                message: response.data.msg,
              })
            }
          }).catch(function (error) {
          that.$notify({
            message: "添加错误"
          })
        })
      },
      getCourses() {
        let that = this;
        let url = this.websiteUrl+"/webapp/Courses/AllCourses"
        this.$axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              let tempList= response.data.data;
              for (let i=0;i<tempList.length;i++){
                tempList[i].show=false;
              }
              that.courseList = tempList;
                } else {
              that.$notify({
                message: "获取失败"
              });
            }
          }).catch(function (error) {
          that.$notify({
            message: "课表出错"
          });
        })
      },
      onChange(index) {
        console.log(index)
      }
    }
  }
</script>

<style scoped>

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 40%;
    height: 40%;
    background-color: #fff;
  }


</style>
