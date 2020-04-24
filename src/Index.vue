<template>
  <div id="Index">
  </div>
</template>

<script>
  export default {
  name: 'Index',

  mounted(){
      //首次延迟加载
      setTimeout(() => {
          this.$router.push({
            name:'Home',
          });
      },2000);
  }
}
</script>

<style>
  @import 'css/common.css';
  body{
    background:url(./assets/gif/login4.gif) no-repeat center #fff;
    background-size:1.2rem 1.2rem;
    height:100%;
    width:100%;
    line-height:1;
  }
  .mint-toast{
  	  border-radius: 0.1rem !important;
   }
  .mint-toast-text{
  	 font-size:0.48rem !important;
  	 padding:0.1rem !important;
  }
</style>
