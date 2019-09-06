<template>
  <div id="app" @click="contantUSClick2">
    <router-view v-on:alertEvent="alertEvent" ref="detail"/>
    <div @click.stop>
      <div class="contectUS" @click="contantUSClick"><img src="./../src/assets/img/concant.png" alt="">&nbsp;联系我们</div>
        <div class="contectUS2" @click="contantUSClick2">
          <div class="contectUS2Min">
            <span class="tm1"><span class="tfff"></span>&nbsp;&nbsp;联系电话：</span>
            <span class="tm2">131 2030 2630</span>
            <span class="tm1" style="margin-top: 32px"><span class="tfff"></span>&nbsp;&nbsp;客服微信：</span>
            <img style="width: 150px;height: 150px;margin-top: 12px" src="./../src/assets/img/er.png" alt="">
            <div class="ctn">
              <img src="./../src/assets/img/error2.png" alt="">
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
  name: 'App',
    data(){
      return {
        minHeight:0,
        contantShow:true
      }
    },
  methods:{
    langChange(value){
      let that = this;
      Cookies.set("lang",value)
      that.$i18n.locale = value;
    },
    langFirst(){
      let that = this;
      let JsSrc =(navigator.language || navigator.browserLanguage).toLowerCase();
      console.log(JsSrc);
      Cookies.set("firstLang",JsSrc)
      if(JsSrc.indexOf('en') != -1){
        that.langChange('en')
      }else {
        that.langChange('zh')
      }
    },
    alertEvent(){
      this.$refs.detail.detailClick2()
    },
    //联系客服点击
    contantUSClick(){$('.contectUS2').fadeIn(1000)
      let that = this;
      // that.contantShow = false;
      $('.contectUS2').fadeIn(300)
      $('.contectUS').fadeOut(300)
    },
    contantUSClick2(){
      let that = this;
      // that.contantShow = true;
      $('.contectUS2').fadeOut(300)
      $('.contectUS').fadeIn(300)
    }
  },
  mounted(){
    let that = this;
    if(Cookies.get("firstLang") == undefined){
      that.langFirst();
    }
    if($(window).height() > 500){
      that.minHeight = $(window).height()
    }else {
      that.minHeight = 500;
    }
    window.onresize = () => {
      return (() => {
        if($(window).height() > 500){
          that.minHeight = $(window).height()
        }else {
          that.minHeight = 500;
        }
      })()
    };
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
#app {
  font-family: PingFangSC-Regular,黑体, Arial,'Avenir', Helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1280px;
  min-height: 500px;
}
  .contectUS{
    width: 128px;
    height: 48px;
    background: #00A0E9;
    border-radius: 24px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
  }
  .contectUS2{
    width: 234px;
    height: 320px;
    background: #FFFFFF;
    box-shadow: 0 0 7px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    position: fixed;
    right: 40px;
    bottom: 60px;
    display: none;
    flex-direction: column;
    box-sizing: border-box;
    padding: 32px 35px;
  }
  .tfff{
    display: inline-flex;
    width: 6px;
    height: 6px;
    background: #00A0E9;
  }
  .tm1{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    display: flex;
    align-items: center;
  }
  .tm2{
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
    margin-top: 12px;
  }
  .contectUS2Min{
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .ctn{
    width: 48px;
    height: 48px;
    background: #00A0E9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    position: absolute;
    right: -58px;
    bottom: -51px;
    cursor: pointer;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
