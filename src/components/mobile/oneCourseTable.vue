<template>
  <div>
    <van-nav-bar
      title="我的课表"
      style="background-color: lightskyblue"
    ></van-nav-bar>
  <div v-for="(course,index) in oneCourseList" :key="index"
  >
    <van-swipe-cell>

      <van-cell :border="false">{{course.courseId}}</van-cell>

      <template slot="right">
        <van-button square type="primary" text="内容" @click="showPopup(index)"/>
        <van-button square type="danger" text="删除" @click="dCourse(index)"/>
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
        name: "oneCourseTable",
      data(){
          return{
            active:1,
            loginUser:{},
            oneCourseList:[],
          }
      },
      mounted(){
        if (localStorage.getItem("47.105.83.179:8080") != null) {
          this.loginUser = JSON.parse(localStorage.getItem("47.105.83.179:8080"));
        }
          this.getOneTable();
      }
      ,
      methods:{
        showPopup(index) {
          this.oneCourseList[index].show = true;
        },
        closePopup(index) {
          this.oneCourseList[index].show = false;
        },
        getOneTable(){
          let that=this;
          let url=this.websiteUrl+"/webapp/TimeTable/FindTimeTable"
          this.$axios.get(url,
            {
              params:{
                username:this.loginUser.username
              }
            })
            .then(function (response) {
              if (response.data.code==200){
                let tempList=response.data.data;
                for(let i=0;i<tempList.length;i++){
                  tempList[i].show=false;
                }
                that.oneCourseList=tempList;
              }

            }).catch(function (error) {
              this.$notify("获取失败")
          })
        }
        ,
        dCourse(index){
          let that=this;
          let url=this.websiteUrl+"/webapp/TimeTable/DeleteTimeTable";
          this.$axios.get(url,
            {
              params:{
                username:that.oneCourseList[index].username,
                courseId:that.oneCourseList[index].courseId
              }
            }
          )
            .then(function (response) {
              if (response.data.code==200){
                that.$notify(
                  {
                    message:"退课成功"
                  }
                )
                that.$axios.get(that.websiteUrl+"/webapp/TimeTable/FindTimeTable",
                  {
                    params:{
                      username:that.loginUser.username
                    }
                  })
                  .then(function (resp) {
                    if (resp.data.code==200){
                      let tempList=resp.data.data;
                      for(let i=0;i<tempList.length;i++){
                        tempList[i].show=false;
                      }
                      that.oneCourseList=tempList;
                    }

                  }).catch(function (error) {

                })
              }
            }).catch(function (error) {

          });
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
