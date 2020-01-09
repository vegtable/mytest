<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <div class="logo">
              <span>欢迎登陆在线选课系统</span>
            </div>
          </el-col>

          <el-col :offset="10" :span="4">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">{{loginUser.sname}}</template>
                <el-menu-item index="1-1" @click="hrefLogin">登录</el-menu-item>
                <el-menu-item index="1-2" @click="hrefReg">注册</el-menu-item>
                <el-menu-item index="1-3" @click="doLogout">注销</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs :tab-position="tabPosition" style="height: 700px;">
          <el-tab-pane label="选课公告"></el-tab-pane>
          <el-tab-pane label="选课" >
            <template >
              <el-table
                :data="tableData"
                border
              >
                <el-table-column
                  prop="courseId"
                  label="课程号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="courseName"
                  label="课程名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="teacherName"
                  label="任课教师"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="上课时间"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="上课地点"
                  width="350">
                </el-table-column>
                <el-table-column
                  prop="duration"
                  label="课时"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="cHandleClick(scope.row)" type="text" size="small">选课</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>

          </el-tab-pane>
          <el-tab-pane label="选课结果">
            <template>
              <el-table
                :data="oneTable"
                border
              >
                <el-table-column
                  prop="courseId"
                  label="课程号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="courseName"
                  label="课程名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="teacherName"
                  label="任课教师"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="上课时间"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="上课地点"
                  width="350">
                </el-table-column>
                <el-table-column
                  prop="duration"
                  label="课时"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="tHandleClick(scope.row)" type="text" size="small">退课</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        loginUser: {},
        activeIndex: '1',
        activeIndex2: '1',
        tabPosition: 'left',
        tableData: [ ],
        oneTable:[ ],
      };
    },
    created() {

    },
    mounted() {
      this.loginUser.sname="登录或注册";
      if (localStorage.getItem("47.105.83.179:8080") != null) {
        this.loginUser = JSON.parse(localStorage.getItem("47.105.83.179:8080"));
      }
      this.findAllCourse();
      this.oneTimeTable();
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      cHandleClick(row){
        let that=this;
        let url=this.websiteUrl+"/webapp/TimeTable/InsertTimeTable";
        row.username=this.loginUser.username;
        this.$axios.post(url,row)
          .then(function (response) {
            if (response.data.code==200){
              that.$message({
                message:response.data.msg,
                type:'success'
              })
              that.$axios.get(that.websiteUrl+"/webapp/TimeTable/FindTimeTable",
                {
                  params:{
                    username:that.loginUser.username
                  }
                })
                .then(function (resp) {
                  if (resp.data.code==200){
                    that.oneTable=resp.data.data;
                  }

                }).catch(function (error) {
                  console.log("获取出错")
              })
            }
            else if (response.data.code==400) {
              that.$message({
                message:response.data.msg,
                type:'warning'
              })
            }
          }).catch(function (error) {
          that.$message({
            message:"添加出错",
            type:'error'
          })
        });

      },
      tHandleClick(row){
        let that=this;
        let url=this.websiteUrl+"/webapp/TimeTable/DeleteTimeTable";
        this.$axios.get(url,
          {
            params:{
              username:row.username,
              courseId:row.courseId
            }
          }
          )
          .then(function (response) {
            if (response.data.code==200){
              that.$message({
                message:response.data.msg,
                type:'success'
              });

              that.$axios.get(that.websiteUrl+"/webapp/TimeTable/FindTimeTable",
                {
                  params:{
                    username:that.loginUser.username
                  }
                })
                .then(function (resp) {
                  if (resp.data.code==200){
                    that.oneTable=resp.data.data;
                  }

                }).catch(function (error) {
                that.$message({
                  message:"二次获取出错",
                  type:'error'
                })
              })
            }
          }).catch(function (error) {
          that.$message({
            message:"退课出错",
            type:'error'
          })
        });

      },
      hrefLogin:function(){
        window.location.href="/pLogin"
      },
      hrefReg:function () {
        window.location.href="/pRegister"
      },
      doLogout: function () {
        localStorage.removeItem("47.105.83.179:8080");
        sessionStorage.removeItem("47.105.83.179:8080");
        this.$router.go(0)
      },
      findAllCourse:function () {
        let that=this;
        let url=this.websiteUrl+"/webapp/Courses/AllCourses"
        this.$axios.get(url)
          .then(function (response) {
            if (response.data.code==200){
              that.tableData=response.data.data;
            } else {
              that.$message({
                message:'课表出错',
                type:'error'
              })
            }
          }).catch(function (error) {
          that.$message({
            message:'课表出错',
            type:'error'
          })
        })
      },
      oneTimeTable:function(){
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
              that.oneTable=response.data.data;
            }

          }).catch(function (error) {

        })
      },
    }
  }
</script>


<style scoped>
  .el-header, .el-footer {
    background-image: linear-gradient(45deg, green, skyblue);
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-menu{
  background-color: transparent;
}

  .logo {
    display: block;
    font-size: 30px;
    color: white;
  }

</style>

