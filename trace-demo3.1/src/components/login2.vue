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
              <el-tooltip class="item" effect="dark" content="请联系Chaindigg重置密码，联系电话：400-6988-698" placement="top-end">
                <span>忘记密码？</span>
              </el-tooltip>
            </span>
            <div class="login1" @click="starLogin" v-show="minShow">登录</div>
            <div class="login1" v-show="!minShow">登录</div>
            <span class="register1">
              没有账号？点击<span @click="sqClick">申请试用</span>
            </span>
          </div>
          <!--图形验证码-->
          <div class="right2" v-show="loginStep==2">
            <div id="captcha"></div>
            <div id="msg"></div>
          </div>
          <!--手机验证码-->
          <div class="right3" v-show="loginStep==3">
            <span class="label">手机验证</span>
            <div class="mobMin">
              <input type="text" class="mobNumber" v-model="code" @keyup.enter="checkCode">
              <span class="code" @click="sendCodeS" v-show="codeSend">发送验证码</span>
              <span class="code" style="background: #8E8E93 "  v-show="codeland">已发送({{num}})</span>
              <span class="code" @click="sendCodeS" v-show="codeRe">重新发送</span>
            </div>
            <span class="forGet1">
              <el-tooltip class="item" effect="dark" content="请联系Chaindigg修改手机号，联系电话：400-6988-698" placement="top-end">
                 <span>手机号不可用？</span>
              </el-tooltip>
            </span>
            <div class="login1" @click="checkCode">登录</div>
          </div>
          <!--登陆界面-->
          <div class="right1" v-show="loginStep==4">
            <span class="register2">
              <span @click="backLogin">< 返回登录</span>
            </span>
            <span class="label" style="margin-top: 12px;margin-bottom: 0rem">申请试用</span>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="姓名" v-model="sqName" autocomplete="off">
            </div>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="电话" v-model="sqTel" autocomplete="off">
            </div>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="邮箱" v-model="email" autocomplete="off">
            </div>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="警号" v-model="sqNumber" autocomplete="off">
            </div>
            <div class="radio" style="margin-top: 14px">
              <span class="mct">部门：</span>
              <el-radio-group v-model="radio2">
                <el-radio :label=1>网安</el-radio>
                <el-radio :label=4>经侦</el-radio>
                <el-radio :label=5>刑侦</el-radio>
                <el-radio :label=2>司法</el-radio>
              </el-radio-group>
              <div style="box-sizing: border-box;padding-left: 53px">
                <el-radio-group v-model="radio2">
                  <el-radio :label=3>其他</el-radio>
                </el-radio-group>
                <input style="margin-left: 1rem" v-show="radio2 == 3" type="text" v-model="part">
              </div>
            </div>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="地区" v-model="addressT" autocomplete="off">
            </div>
            <span style="background: #fff;font-size: 12px;margin-top: 0.25rem">示例： XX省 XX市 XX县</span>
            <div class="input" style="margin-top: 14px">
              <input class="inputText" type="text" placeholder="推荐人(选填)" autocomplete="off" v-model="sqPeople">
            </div>
            <div class="login2" @click="qrClick">提交</div>
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
  import './../../static/js/jigsaw.min'
  import city from './../../static/city'
  export default {
      name: "login2",
      data(){
        return {
          loginStep:1,
          userName:'',
          passWord:'',
          code:'',
          codeSend:true,
          codeland:false,
          codeRe:false,
          num:60,
          timer:null,
          radio2:0,
          options:CityInfo,
          selectedOptions: [],
          sqName:"",
          sqTel:"",
          sqNumber:"",
          sqPeople:"",
          minShow:true,

          part:"",
          addressT:"",
          email:""
        }
      },
      methods:{
        startChart(){
          let that = this;
          jigsaw.init({
            el: document.getElementById('captcha'),
            onSuccess: function() {
              that.loginStep = 3;
            },
            onFail: cleanMsg,
            onRefresh: cleanMsg
          })
          that.minShow = true;
          function cleanMsg() {
            document.getElementById('msg').innerHTML = ''
          }
        },
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
                // that.Cookies.set("password",that.password);
                that.Cookies.set("token",res.data.data["token"]);
                that.Cookies.set("cl",res.data.data["level"]);
                that.loginStep = 2;
                that.startChart();
              }else {
                that.$message.error("用户名或密码错误");
                that.minShow = true;
              }
            }).catch(res=>{
              that.minShow = true;
            })
          }
        },
        //发送验证码
        //
        numT(){
          let that = this;
          that.num--;
          if(that.num <= 0){
            that.num = 60;
            clearInterval(that.timer);
            that.codeSend = false;
            that.codeland = false;
            that.codeRe = true;
          }
        },
        sendCodeS(){
          let that = this;
          that.codeSend = false;
          that.codeland = true;
          that.codeRe = false;
          that.sendCode();
          that.timer = setInterval(that.numT,1000)
        },
        sendCode(){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:'get',
            url:that.Config.baseUrl2+"/member/sms",
            params:{
              randNum:Math.random() * (100000000 - 0) + 0
            }
          }).then(res=>{
            if(res.data.code == '0000'){
              // that.$message.success("验证码发送成功")
            }
          })
        },
        //校验验证码
        checkCode(){
          let that = this;
          if(that.code != ''){
            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:'get',
              url:that.Config.baseUrl2+"/member/sms/check",
              params:{
                code:that.code
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == '0000'){
                that.Cookies.set("token",res.data.data);
                that.$router.push({name:"search"})
              }else {
                that.$message.error(res.data.message)
              }
            })
          }else {

          }
        },
        linkClick(){
          window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
        },
        handleChange(value) {
          console.log(value);
        },
        backLogin(){
          let that = this;
          that.loginStep = 1;
          that.selectedOptions = [];
          that.sqName = "";
          that.sqTel = "";
          that.sqNumber = "";
          that.sqPeople = "";
          that.radio2 = 0;
          that.addressT = "";
          that.part = "";
          that.email = "";
        },
        qrClick(){
          let that = this;
          console.log(that.radio2);
          if(that.addressT == "" || that.sqName == "" || that.sqTel == "" || that.sqNumber == "" || that.radio2 == 0){
            that.$message.error('请将信息填写完整')
          }else {
            let department = '';

            if(that.radio2 == 3){
              if(that.part == ""){
                that.$message.error('请将信息填写完整')
              }else {
                department = that.part;
                console.log(that.email);
                let data = {
                  name:that.sqName,
                  contactWay:that.sqTel,
                  workNo:that.sqNumber,
                  department:department,
                  area:that.addressT,
                  referrer:that.sqPeople,
                  email:that.email
                }
                that.ajax({
                  method:'post',
                  url:that.Config.baseUrl2+"/member/apply",
                  data:that.qs.stringify(data)
                }).then(res=>{
                  if(res.data.code == '0000'){
                    that.open();
                  }
                })
              }
            }else {
              if(that.radio2 == 1){
                department = '网安'
              }else if(that.radio2 == 2){
                department = '司法'
              }else if(that.radio2 == 4){
                department = '经侦'
              }else if(that.radio2 == 5){
                department = '刑侦'
              }
              let data = {
                name:that.sqName,
                contactWay:that.sqTel,
                workNo:that.sqNumber,
                department:department,
                area:that.addressT,
                referrer:that.sqPeople,
                email:that.email
              }
              that.ajax({
                method:'post',
                url:that.Config.baseUrl2+"/member/apply",
                data:that.qs.stringify(data)
              }).then(res=>{
                if(res.data.code == '0000'){
                  that.open();
                }
              })
            }

          }
        },
        sqClick(){
          let that = this;
          that.loginStep = 4;
          that.radio2 = 0;
        },
        open() {
          let that = this;
          this.$alert('我们将在1个工作日内与您联系，请您耐心等待', '提交成功', {
            confirmButtonText: '确定',
            callback: action => {
              that.backLogin();
            }
          });
        }
      },
      mounted(){
        $(".login").width(document.documentElement.clientWidth);
        $(".login").height(document.documentElement.clientHeight);
        window.addEventListener("resize", () => {
          $(".login").css('width',$(window).width() + 'px');
          $(".login").css('height',$(window).height()+ 'px');
          // $("#chart").css('height',$(window).height()-113 +'px');
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
    margin-top: 2.5rem;
    cursor: pointer;
  }
  .register1{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    margin-top: 5rem;
  }
  .register2{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    /*margin-top: 5rem;*/
    text-align: left;
  }
  .register2 span{
    cursor: pointer;
    color: #00A0E9;
  }
  .register1 span{
    cursor: pointer;
    color: #00A0E9;
  }
  /**/
  .right2{
    display: flex;
    justify-content: flex-start;
  }
  /**/
  .right3{
    display: flex;
    flex-direction: column;
  }
  .mobMin{
    display: flex;
    margin-top: 30px;
  }
  .mobNumber{
    background: #F1F1F2;
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    width: 12.25rem;
    height: 2.5rem;
    padding: 0 0.75rem;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    margin-right: 1rem;
  }
  .code{
    width: 8rem;
    height: 2.5rem;
    background: #00A0E9;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    letter-spacing: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .radio{
    margin-top: 24px;
  }
  .mct{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
  }
  .addressT{
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
  }
</style>
