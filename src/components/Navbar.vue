<template>
  <div id="Navbar">
    <mt-navbar v-model="selected" :fixed='true'>
      <mt-tab-item ref="click" :class="{'is-selected':!this.$route.query.tab}" id="1">全部</mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'good'}" id="2">精华</mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'share'}" id="3">分享</mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'ask'}" id="4">问答</mt-tab-item>
      <mt-tab-item :class="{'is-selected':this.$route.query.tab === 'job'}" id="5">招聘</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
  export default{
      name:'Navbar',
    data(){
          return{
            selected:1,
            value:'',
          }
    },
    components:{
    },
	activated(){
		
	},
	deactivated(){
		//$destroy
		
	},
    methods:{
		select(num){
			if(num){
				switch(num){
				  case '1':this.$router.push({'Home':'home'});
				  break;
				  case '2':this.$router.push({'Home':'home',query:{tab:'good'}});
					break;
				  case '3':this.$router.push({'Home':'home',query:{tab:'share'}});
					break;
				  case '4':this.$router.push({'Home':'home',query:{tab:'ask'}});
					break;
				  case '5':this.$router.push({'Home':'home',query:{tab:'job'}});
					break;
				}
			}
		}
    },
    watch:{
	selected:function(num){
         this.select(num);
	},
	'$route' (to,from){	
		if(to.name === 'Home' && from.name ==='Home'){
			this.select(this.selected);
		}
		//底部导航返回首页重置数据
		if(to.name === 'Home' && (!(from.name === 'Home'))){
			this.selected = 1;
		}
	}
    }
  }
</script>
<style scoped>
  #Navbar{
    width:100%;
    background:#fff;
  }
  #Navbar a{
    font-size:0.32rem !important;
  }
  .mint-navbar .mint-tab-item{
	  padding:0.24rem 0;
  }
  .mint-navbar .mint-tab-item.is-selected{
    color:#FDDF6D !important;
    border-color:#FDDF6D !important;
  }
  .mint-cell{
    width:100%;
  }
  .mint-cell:first-child{
    margin-top:0.48rem;
    border-color:#fff !important;
  }

</style>
