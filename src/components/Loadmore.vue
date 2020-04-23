<template>
  <div id="Loadmore">
      <ul class="topicsMen" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check=true>
        <li class="topic" v-for="item in topics" :key="item.id">
          <router-link :to="{name:'Topic',params:{id:item.id}}">
            <div class="img">
				<img class="head" :src="item.author.avatar_url" alt="">
            </div>
            <div class="content">
              <div class="info">
                <h3 v-text="item.title"></h3>
                <p class="tabinfo">
                  <span class="status">
                    {{item.reply_count}}
                    /{{item.visit_count}}
                  </span>
                  <span class="tabtopgood">
                    <span v-if="item.tab" :class="getTabInfoTab(item.tab,true)" v-text="getTabInfoTab(item.tab,false)"></span>
                    <span v-if="item.top" :class="getTabInfoTop(item.top,true)" v-text="getTabInfoTop(item.top,false)"></span>
                    <span v-if="item.good" :class="getTabInfoGood(item.good,true)" v-text="getTabInfoGood(item.good,false)"></span>
                  </span>
                  <time class="time">{{item.last_reply_at | getLastTimeStr(true)}}</time>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
	  <p class="bottomText">我是有底线的~</p>
   </div>
</template>
<script>
  import utils from '../lib/utils.js'
  export default {
	name: "Loadmore",
    data() {
      return {
        topStatus: '',
        topics: [],
        index: {},
        hide:'hide',
        loading:false,
        loginimg:true,
        topicarg:{
          page:1,
          tab:'all',
          limit:10,
          mdrender:true
        },
		key:'scroll',
		cacheData:0
      };
    },
    created(){
		this.getTopics();
    },
    mounted(){
		//详情返回确保是同一分类
      if(this.$route.query && this.$route.query.tab){
        this.topicarg.tab = this.$route.query.tab;
      }	  
    },
	activated(){
		/* if(this.$route.query && this.$route.query.tab){
		  this.topicarg.tab = this.$route.query.tab;
		} */
		//设置滚动条
		this.cacheData = window.localStorage.getItem(this.key) ?JSON.parse(window.localStorage.getItem(this.key)) : null
		document.body.scrollTop = this.cacheData;
	},
	deactivated () {
		//获取滚动条
		 window.localStorage.setItem(this.key, JSON.stringify(document.body.scrollTop))
	},
    methods: {
		arrToStr(arr){
			for(var i =0;i<arr.length;i++){
				var a =this.topics.options[i].value; 
				arr[i] = a;
			}
			new_str= arr.join(",");
		},
      loadMore() {
		  console.log('无限滚动')
		if(this.loginimg){
			this.loading = true;
			setTimeout(() => {
			  this.topicarg.page += 1;
			  this.getTopics();
			  this.loading = false;
			}, 1000);
		}  		 // console.log(this.topicarg.page)
      },
      getTopics(){
        this.$ajax({
          method: 'get',
          responseType: 'json',//https://gpnubbs.fangweijun.top/
          url: 'https://gpnubbs.fangweijun.top/api/v1/topics',//https://cnodejs.org/api/v1
          data: {},
          //请求参数
          params: {
            //页数
            page: this.topicarg.page,
            //主题分类
            tab: this.topicarg.tab,
            //每一页主题数量
            limit: this.topicarg.limit,
            //是否支持markdown格式文本
            mdrender: this.topicarg.mdrender
          }

        }).then(function (response) {
          let topics = {// eslint-disable-line no-unused-vars
            /* date: response.data.data[0].content, */
            length: response.data.data.length,
          }
		  console.log(response.data.data.length)
		  if(response.data.data.length === 0){
			  this.loginimg = false;
		  }else{
			  this.loginimg = true;
		  }
          if ( response.data && response.data.data) {
            response.data.data.forEach(this.mergeTopics);
          }
        }.bind(this))
      },
      mergeTopics(topic) {
        this.index[topic.id] = this.topics.length;
		/* this.topics = topic; */
        this.topics.push(topic);
      },
      getTitles(tab){
          let str = '';// eslint-disable-line no-unused-vars
          switch(tab){
            case 'share' : str = '分享';
            break;
            case 'ask' : str = '问答';
            break;
            case 'job' : str = "招聘";
            break;
            case 'good' : str ='精华';
            break;
            default: str = '全部';
            break;
          }
      },
      getTabInfo(tab, good = true, top, isClass) {
        return utils.getTabInfo(tab, good, top, isClass);
      },
      getLastTimeStr(time, ago) {
        return utils.getLastTimeStr(time, ago);
      },
      getTabInfoTab(tab,isClass){
        return utils.getTabInfoTab(tab, isClass);
      },
      getTabInfoGood(good,isClass){
          return utils.getTabInfoGood(good,isClass);
      },
      getTabInfoTop(top,isClass){
          return utils.getTabInfoTop(top,isClass);
      }
    },
    watch:{
		//主题分类导航切换
      '$route' (to,from){// eslint-disable-line no-unused-vars
	  //导航分类中的切换数据绑定
         if(to.name === 'Home' && from.name != 'Topic'){//当路由是去home 并且 是从topic过来的则不从新请求数据
			 if(to.query.tab){
			     this.topicarg.tab = to.query.tab;
			     this.topics = [];
			     this.index = {};
			 }else{
			   this.topicarg.tab = 'all';
			   this.topics = [];
			   this.index = {};
			 }
			 //切换后重新请求数据
			 this.topicarg.page = 1;
			 this.getTopics();
		 }
      }
    }

  };
</script>
<style scoped>
  #Loadmore{
    background:#fff;
    width:100%;
    height:100%;
    padding-bottom:2rem;
    font-size:0.24rem;
    padding-top:0.8rem;
	background:#ebebeb;
  }
  #Loadmore .bottomText{
	  text-align:center;
	  font-size:0.24rem;
	  color:#999;
  }
  #Loadmore .topicsMen{
	  padding-bottom:0.01rem;
  }
  #Loadmore .topic{
    height:1.4rem;
    position:relative;
    margin-bottom:0.1rem;
    border-bottom:1px solid #ccc;
    width:96%;
	margin:0.2rem auto;
	border-radius:15px;
	background:#fff;
  }
  #Loadmore ul .topic:first-child{
	  
  }
  #Loadmore .topic a{
    width:100%;
    height:1rem;
  }
  #Loadmore h3{
    font-size:28px;
    color: #1e1e1e;
    /*color: #d6bf5f;*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #Loadmore .topic .img{
    width:20%;
    height:100%;
    position:absolute;
  }
  #Loadmore .topic img.head{
    position:absolute;
    left:50%;
    margin-left:-0.4rem;
    border-radius:50%;
    height:0.8rem;
    width:0.8rem;
    top:50%;
    margin-top:-0.4rem;
  }
  #Loadmore .topic .content{
    left:23%;
    top:50%;
    position:absolute;
    margin-top:-0.4rem;
    width:72%;
    height:0.8rem;
  }
  #Loadmore .mint-loadmore-top span{
    font-size:0.2rem;
    color:#666;
  }
  #Loadmore .ask,#Loadmore .job,#Loadmore .share{
    font-size:0.18rem;
  }

  #Loadmore .tabinfo{
    padding-top:0.1rem;
    display: inline-flex;
    width:100%;
    justify-content:space-between;
  }
  #Loadmore .status{
    box-flex:1;
  }
  #Loadmore .rabtopgood{
    box-flex:1;
  }
  #Loadmore .time{
    box-flex:1;
    box-flex:1;

  }
  #Loadmore .loginimg{
    width:1rem;
    height:1rem;
    position:absolute;
    left:50%;
    margin-left:-0.5rem;
  }

</style>
