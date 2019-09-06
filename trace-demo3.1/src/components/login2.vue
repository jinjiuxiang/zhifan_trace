<template>
  <div class="login">
    <div class="login-min">
      <div class="login-box">
        <div class="left">
          <p class="leftA">
            <span class="left1">CHAINDIGG</span>
            <span class="left2">数字货币追踪查证系统</span>
          </p>
          <span class="leftB"><img src="./../assets/img/leftB.png" alt=""></span>
        </div>
        <div class="right">
          <!--登陆界面-->
          <div class="right1" v-show="loginStep==1">
            <span class="label">登录</span>
            <div class="input">
              <span class="inputImg"><img src="./../assets/img/user.svg" alt=""></span>
              <input class="inputText" type="text" v-model="userName">
            </div>
            <div class="input"  v-show="minShow">
              <span class="inputImg"><img src="./../assets/img/pwd.svg" alt=""></span>
              <input class="inputText" type="password" v-model="passWord" @keyup.enter="starLogin">
            </div>
            <div class="input"  v-show="!minShow">
              <span class="inputImg"><img src="./../assets/img/pwd.svg" alt=""></span>
              <input class="inputText" type="password" v-model="passWord">
            </div>
            <span class="forGet1">
              <el-tooltip class="item" effect="dark" content="请联系Chaindigg重置密码，联系电话：13120302630" placement="top-end">
                <span>忘记密码？</span>
              </el-tooltip>
            </span>
            <div class="login1" @click="starLogin" v-show="minShow">登录</div>
            <div class="login1" v-show="!minShow">登录</div>
            <span class="register1">
            </span>
            <!--添加提醒弹窗-->
            <div class="alWin" v-show="alertShow">
              <span class="alwin1"><img src="./../assets/img/error.png" alt="" @click="alerHide"></span>
              <span class="alwin2"><img src="./../assets/img/tishi.png" alt="">&nbsp;用户名密码错误</span>
            </div>
          </div>
          <!---->
          <!--修改密码-->
          <div class="right1" v-show="loginStep==2">
            <span class="label">修改密码</span>
            <span class="xt1"><img src="./../assets/img/tishi.png" alt="">&nbsp;首次登录请修改密码</span>
            <div class="input2" style="background: #ffffff">
              <input class="inputText2" type="password" v-model="newPwd" placeholder="新密码 (8~16位)">
            </div>
            <span class="pwdS" v-show="pwdSShow1">密码需要8～16位</span>
            <div class="input2" style="background: #ffffff">
              <input class="inputText2" type="password" v-model="newPwd2" placeholder="确认新密码 (8~16位)">
            </div>
            <span class="pwdS" v-show="pwdSShow2">两次密码不一致</span>
            <div class="login2" @click="changeLogin" v-show="minShow2">登录</div>
            <div class="login2" v-show="!minShow2">登录</div>
            <span class="register1">
            </span>
            <!--添加提醒弹窗-->
            <div class="alWin" v-show="alertShow">
              <span class="alwin1"><img src="./../assets/img/error.png" alt="" @click="alerHide"></span>
              <span class="alwin2"><img src="./../assets/img/tishi.png" alt="">&nbsp;用户名密码错误</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>Copyright 2019 北京知帆科技有限公司 版权所有 京ICP备17074962号</span>
      <span style="cursor: pointer;" @click="linkClick"><img src="./../assets/img/min.jpg" alt="">京公网安备 11010802028427号</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login2",
    data(){
      return {
        loginStep:1,
        userName:'',
        passWord:'',
        minShow:true,
        minShow2:true,
        alertShow:false,
        newPwd:"",
        newPwd2:"",
        pwdSShow1:false,
        pwdSShow2:false,
      }
    },
    methods:{
      //登录名密码提交
      starLogin(){
        let that=  this;
        let data = {
          name:that.userName,
          password:that.$md5('chaindigg'+that.$md5(that.passWord))
        }
        if(that.userName != "" && that.passWord != ""){
          that.minShow = false;
          that.ajax({
            method:"post",
            url:that.Config.baseUrl+"/login",
            data:that.qs.stringify(data)
          }).then(res =>{
            if(res.data.code == "0000"){
              that.Cookies.set("username",that.userName);
              that.Cookies.set("token",res.data.data["token"]);
              that.Cookies.set("cl",res.data.data["level"]);
              that.$router.push({name:"search"})
            }else if(res.data.code == '1012'){
              that.loginStep = 2;
              that.Cookies.set("username",that.userName);
              that.Cookies.set("token",res.data.data["token"]);
            }else {
              that.alertShow = true;
              that.minShow = true;
            }
          }).catch(res=>{
            that.minShow = true;
          })
        }
      },
      alerHide(){
        this.alertShow = false;
      },
      //点击公安局备案
      linkClick(){
        window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
      },
      //新旧密码错误飙红
      borderColorRed(){
        $('.inputText2').css('border','1px solid #E02020')
      },
      //修改密码请求
      changePwd(){
        let that = this;
        that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
        let data = {
          oldPassword:that.$md5('chaindigg'+that.$md5(that.passWord)),
          newPassword1:that.$md5('chaindigg'+that.$md5(that.newPwd)),
          newPassword2:that.$md5('chaindigg'+that.$md5(that.newPwd2))
        }
        that.ajax({
          method:"post",
          url:that.Config.baseUrl2 + "/member/modify",
          data:that.qs.stringify(data)
        }).then(res=>{
          console.log(res);
          if(res.data.code == "0000"){
            that.passWord = that.newPwd;
            that.starLogin();
          }else {
            that.$message.error(res.data.message);
          }
        }).catch(()=>{
          that.minShow2 = true;
        })
      },
      //修改密码页面登录
      changeLogin(){
        let that = this;
        if(that.newPwd == '' || that.newPwd2 == ''){
          return false;
          that.minShow2 = false;
        }else {
          if(that.newPwd.length < 8){
            that.pwdSShow1 = true;
            that.pwdSShow2 = false;
            that.borderColorRed()
          }else if(that.newPwd != that.newPwd2){
            that.pwdSShow1 = false;
            that.pwdSShow2 = true;
            that.borderColorRed()
          }else {
            that.changePwd();
          }
        }
      }
    },
    mounted(){
      $(".login").width(document.documentElement.clientWidth);
      $(".login").height(document.documentElement.clientHeight);
      window.addEventListener("resize", () => {
        $(".login").css('width',$(window).width() + 'px');
        $(".login").css('height',$(window).height()+ 'px');
      });
    }
  }
</script>

<style scoped>
  .login{
    background:url("./../assets/img/back.png") no-repeat;
    background-size: cover;
    min-width: 80rem;
    min-height: 50rem;
    display: flex;
    flex-direction: column;
  }
  .login-min{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(255,255,255,0.1);
    height: 2.5rem;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #999999;
  }
  .footer span:nth-child(1){
    display: flex;
    align-items: center;
    margin-right: 5.5rem;
  }
  .footer span:nth-child(2){
    display: flex;
    align-items: center;
  }
  .footer span:nth-child(2) img{
    margin-right: 0.5rem;
  }
  .login-box{
    width: 74.0625rem;
    height: 40.125rem;
    display: flex;
  }
  .left{
    width: 40.8125rem;
    height: 100%;
    background: #24262C;
    border-radius: 2px 0px 0px 2px;
    box-sizing: border-box;
    padding: 9.125rem 3.6875rem 2.9375rem 3.6875rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .leftA{
    display: flex;
    flex-direction: column;
  }
  .left1{
    font-family: Arial-Black;
    font-size: 2.875rem;
    color: #FFFFFF;
  }
  .left2{
    font-family: PingFangSC-Semibold;
    font-size: 2.25rem;
    color: #FFFFFF;
    letter-spacing: 3px;
    margin-top: 1rem;
  }
  .right{
    flex: 1;
    box-sizing: border-box;
    padding-left: 58px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 0px 2px 2px 0px;
    position: relative;
  }
  /**/
  .right1{
    display: flex;
    flex-direction: column;
  }
  .label{
    font-family: PingFangSC-Semibold;
    font-size: 2rem;
    color: #333333;
    letter-spacing: 2.67px;
    margin-bottom: 1rem;
  }
  .input{
    width: 21.25rem;
    height: 2.5rem;
    box-sizing: border-box;
    background: #F1F1F2;
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    margin-top: 1.5rem;
    display: flex;
  }
  .input2{
    width: 21.25rem;
    height: 2.5rem;
    box-sizing: border-box;
    margin-top: 1.5rem;
    display: flex;
  }
  .inputImg{
    display: flex;
    width: 2.8125rem;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .inputText{
    flex: 1;
    border: none;
    box-sizing: border-box;
    padding: 0 8px;
    outline: none;
    font-family: PingFangSC-Regular;
    background: #F1F1F2;
    font-size: 1rem;
    color: #333333;
  }
  .forGet1{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #333333;
    margin-top: 1.5rem;
  }
  .forGet1 span{
    cursor: pointer;
  }
  .login1{
    width: 21.25rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    background: #00A0E9;
    border-radius: 2px;
    margin-top: 1.5rem;
    cursor: pointer;
  }
  .login2{
    width: 21.25rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    background: #00A0E9;
    border-radius: 2px;
    margin-top: 68px;
    cursor: pointer;
  }
  .register1{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    margin-top: 5rem;
  }
  .register1 span{
    cursor: pointer;
    color: #00A0E9;
  }
  .alWin{
    width: 340px;
    height: 100px;
    position: absolute;
    top: 220px;
    left: 58px;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0 0 9px 0 rgba(193,210,215,0.50);
    border-radius: 4px;
  }
  .alwin1{
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 10px;
  }
  .alwin1 img{
    cursor: pointer;
  }
  .alwin2{
    display: flex;
    align-items: center;
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    line-height: 22px;
    box-sizing: border-box;
    padding-left: 27px;
  }
  .alwin2 img{
    width: 1rem;
    height: 1rem;
  }
  .xt1{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #E02020;
    display: flex;
    align-items: center;
  }
  .inputText2{
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0 1rem;
    outline: none;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    opacity: 0.5;
  }
  .pwdS{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #E02020;
    margin-top: 6px;
  }
</style>
