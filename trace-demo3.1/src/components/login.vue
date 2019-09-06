<template>
  <div class="login-box">
    <div class="login-min login-text">
      <span>数字货币追踪查证系统</span>
    </div>
    <div v-show="loginStep==0" class="login-min login-input">
      <div class="login-input-min">
        <div>
          <img src="./../assets/user.svg" alt="">
        </div>
        <input type="text" v-model="username" placeholder="请输入账号">
      </div>
    </div>
    <div v-show="loginStep==0" class="login-min login-input">
      <div class="login-input-min">
        <div>
          <img src="./../assets/pwd.svg" alt="">
        </div>
        <input type="password" v-model="password" @keyup.enter="startLoad" placeholder="请输入密码">
      </div>
    </div>
    <div v-show="loginStep==0" class="login-min login-btn">
      <div @click="startLoad">登录</div>
    </div>

    <div v-show="loginStep==1" id="captcha"></div>
    <div v-show="loginStep==1" id="msg"></div>
    <div class="login-min login-desc">
      技术支持：北京知帆科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：400-6988-698
    </div>
    <span class="fot">Copyright © 2017-2018 北京知帆科技有限公司&nbsp;&nbsp;&nbsp;京ICP备17074962号-1 <span></span></span>
  </div>
</template>

<script>
  //import {configData} from  './../../static/config'
  import './../../static/js/jigsaw.min'
  export default {
    name: "login",
    data(){
      return {
        username:"13810810334",
        password:"123456",
        loginStep:0
      }
    },
    methods:{
      //点击登陆
      startLoad(){
        let that = this;
        // that.Cookies.set("username",that.username);
        // that.Cookies.set("password",that.password);
        // that.$router.push({name:"search"})
        let data = {
          name:that.username,
          password:that.$md5(that.password)
        }
        if(that.username != "" && that.password != ""){
          that.ajax({
            method:"post",
            url:that.Config.baseUrl+"/login",
            data:that.qs.stringify(data)
          }).then(res =>{
            if(res.data.code == "0000"){
              that.Cookies.set("username",that.username);
              that.Cookies.set("password",that.password);
              that.Cookies.set("token",res.data.data["token"]);
              that.Cookies.set("cl",res.data.data["level"]);
              that.loginStep = 2;
              that.startChart();
              //that.$router.push({name:"search"})
            }else {
              that.$message.error("用户名或密码错误")
            }
          })
        }
      },
      startChart(){
        jigsaw.init({
          el: document.getElementById('captcha'),
          onSuccess: function() {
          },
          onFail: cleanMsg,
          onRefresh: cleanMsg
        })
        function cleanMsg() {
          document.getElementById('msg').innerHTML = ''
        }
      },
      linkClick(){
        window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
      }
    },
    mounted(){

      //console.log(configData);
    }
  }
</script>

<style scoped>
  .login-box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:#191a1d;
    min-width: 1280px;
    min-height: 900px;
  }
  .login-image{
    width: 100%;
    display: flex;
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left: 2rem;
  }
  .login-min{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .login-text{
    font-family: PingFangSC-Regular;
    font-size: 1.5rem;
    color: #FFFFFF;
    line-height: 1.5rem;
    margin-top: 12.9375rem;
    margin-bottom: 3.25rem;
  }
  .login-text img{
    position: relative;
    left: 2rem;
  }
  .login-input{
    margin-top: 1.5rem;
  }
  .login-input-min{
    display: flex;
    justify-content: flex-start;
    width: 21.25rem;
    height: 2.5rem;
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 2px;
  }
  .login-input-min div{
    width: 2.8125rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-input-min input{
    flex: 1;
    box-sizing: border-box;
    border: none;
    outline:none;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #999999;
  }
  .login-btn{
    margin-top: 2.5rem;
  }
  .login-btn div{
    width: 21.25rem;
    height: 2.5rem;
    background: #00A0E9;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    cursor: pointer;
  }
  .login-text span{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
  }
  .login-desc{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 5rem;
  }
  .fot{
    width: 100%;
    text-align: center;
    font-size: 0.875rem;
    color: #ffffff;
    opacity: 0.3;
    position: absolute;
    left: 0;
    bottom: 1rem;
  }
</style>
