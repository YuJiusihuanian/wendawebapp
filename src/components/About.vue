<template>
  <div id="About">
    <ul class="btn">
      <li @click="popup">
        <div class="about">
          <div class="imgabout"><img src="../assets/svg/about.svg" alt=""></div>
          <div class="textabout">关于</div>
          <div class="imgright"><img src="../assets/svg/right.svg" alt=""></div>
        </div>
      </li>
    </ul>
    <mt-popup class="popup" modal=true v-model="popupVisible"
      position="right" closeOnClickModal=true>
      <div class="content">
        <h3>关于</h3>
        <ul>
          <Li>	
            <h4>广东技术师范大学</h4>
            <p>方伟俊毕业设计作品</p>
			 <p>基于Vue前后端分离单页面应用WebApp设计与实现</p>			
          </Li>
          <Li>
            <h4>功能</h4>
            <p>无限滚动 登录 发表帖子 帖子回复 消息回复 查看消息 最新回复 最近发布</p>
            <p>其他功能正在完善</p>
          </Li>
          <Li>
            <h4>技术栈</h4>
            <p>基于Vue/Vue Router/Vuex/axios/Mint-ui/Vue CLI</p>
          </Li>
          <Li>
            <h4>意见反馈</h4>
            <p><a href="#">请直接联系本人</a></p>
          </Li>
          <Li>
            <h4>版本</h4>
            <p>v1.3</p>
          </Li>
          <Li>
            <h4>登录</h4>
            <p>登录功能暂不开放</p>
          </Li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
    export default{
        name: 'About',
      data(){
          return{
            popupVisible:false
          }
      },
      methods:{
        popup(){
          this.popupVisible = !this.popupVisible
        }
      }
    }
</script>
<style>
  #About{
    width:100%;
    height:100%;
    background-color:#fff;
  }
  #About .btn li{
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    height:0.8rem;
    position:relative;
  }
  #About .about{
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  #About .about .imgabout{
    position:absolute;
    top:30%;
    left:5%;
    margin-top:-0.5rem;
    width:0.6rem;
    height:0.6rem;
  }
  #About .about .imgabout img{
    width:0.4rem;
    height:0.4rem;
    /*vertical-align:middle*/
  }
  #About .about .textabout{
    font-size:0.3rem;
    position:absolute;
    left:17%;
    top:50%;
    margin-top:-0.15rem;
    color:#1e1e1e;
    /*vertical-align:middle*/
  }
  #About .about .imgright img{
    width:0.4rem;
    height:0.4rem;
  }
  #About .about .imgright{
    position:absolute;
    width:0.6rem;
    height:0.6rem;
    top:30%;
    right:0;
    margin-top:-0.5rem;
  }
  #About .popup{
    width:80%;
    height:100%;
    color:#1e1e1e;
  }
  #About .content{
    height:100%;
    width:100%;
    font-size:0.32rem;
  }
  #About .content h3{
    text-align:center;
    padding-top:0.2rem;
    font-size:0.42rem;
    padding-bottom:0.2rem;
    width:95%;
    margin:0 auto;
    color:#FDDF6D;
    border-bottom:1px solid #ccc;
  }
  #About .content ul li{
    font-size:0.28rem;
    width:95%;
    margin:0 auto;
    border-bottom:1px solid #ccc;
    padding-top:0.2rem;
    text-align:center;
    padding-bottom:0.2rem;
  }
  #About .content ul li h4{
    padding-bottom:0.2rem;
    text-align:center;
    font-size:0.32rem;
  }
  #About .content ul li p{
    line-height:0.32rem;
  }
  #About .content ul li a{
    color:#FDDF6D;
  }
</style>
