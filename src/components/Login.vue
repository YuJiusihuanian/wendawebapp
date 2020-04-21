<template>
  <div id="Login">
    <div class="login">
      <mt-field class="loginname" placeholder="5d1e4de6-91be-42bf-b22b-9d55baaa60ce" v-model="token" maxlength="36"></mt-field>
      <mt-button @click="login" size="normal" class="loginbtn" type="default">登录</mt-button>
    <div class="test">
		<p>测试账号（点击登录马上体验吧！）</p>
	</div>
	</div>

    <a-bout class="about"></a-bout>
  </div>
</template>
<script>
  var qs = require('qs');
  import { Toast } from 'mint-ui';
  import About from './About.vue';
    import { mapGetters , mapMutations} from 'vuex'// eslint-disable-line no-unused-vars
  export default{
    name:'Login',
    data(){
      return{
        username:'',
        token:'5d1e4de6-91be-42bf-b22b-9d55baaa60ce'
      }
    },
    components:{
        'a-bout':About
    },
    computed:{
      ...mapGetters({
        userInfo:'getUserInfo'
      })
    },
    mounted(){
      if(this.userInfo.loginname){
        this.$router.push({
          name:'User',
          params:{
            loginname:this.userInfo.loginname
          }
        });
      }
    },

    methods:{
      //
      login(){
        if(this.token === ''){
          Toast({
            message:'请输入正确的36位Access Token',
            className:'toast',
            position:'top'
          })
          return false;
        }
        let data ={
          accesstoken:this.token
        }
        let tokendata = qs.stringify(data);
        this.$ajax({
          method:'post',
          data:tokendata,
          url:'https://gpnubbs.fangweijun.top/api/v1/accesstoken',
        }).then(function(response){
          let user = {
            loginname:response.data.loginname,
            avatar_url:response.data.avatar_url,
            token:this.token,
            userId:response.data.id
          };
          //存储用户信息
          window.window.sessionStorage.user = JSON.stringify(user);
          //vuex载荷方式分发
          this.$store.dispatch('setUserInfo',user);
          this.$router.push({
            name:'User',
            params:{
                loginname:user.loginname
            }
          });


        }.bind(this)).catch(function(error){
          if(error.data.response){
            Toast({
              message:error.data.response.data.error_msg,
              className:'toast',
            })
          }
        }.bind(this))
      },
    },

  }
</script>
<style>
  #Login{
    width:100%;
    background-color:#fff;
    margin:0 auto;
  }	
	#Login .login .test{
		margin-top:0.5rem;
	}
  #Login .login .test p{
	  font-size:0.24rem;
	  line-height:0.24rem;
	  color:#888;
  }
  #Login .login{
    margin:0 auto;
    width:90%;
    padding-top:1.5rem;
    padding-bottom:1.5rem;
  }
  #Login .loginbtn{
    width:100%;
    background-color:#FDDF6D;
    font-size:0.32rem;
    height:1rem;
    margin:0 auto;
	border-radius:100px 100px 100px 100px;
  }
  #Login .loginname{
    margin:0 auto;
    border:1px solid #FDDF6D;
    font-size:0.62rem !important;
    width:100%;
    height:1rem;
    color:#FDDF6D;
  }
  #Login .loginname .mint-field-core{
    font-size:0.32rem !important;
  }
  #Login .toast span{
    font-size:0.32rem !important;
  }
  #Login .loginname .mintui-field-error{
    font-size:0.32rem;
    color:#888;
  }
  #Login .mint-toast-text{
    font-size:0.32rem !important;
  }
</style>


