<template>

</template>

<script>
    export default {
        name: "Welcome",
      data(){
          return{

          }
      },
      created(){

      },
      mounted(){
          if(this._isMobile()){
            this.$router.replace("/mIndex");
          }
          else{
            this.$router.replace("/pIndex")
          }
      },
      methods:{
        _isMobile(){
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
        }
      }
    }
</script>

<style scoped>

</style>
