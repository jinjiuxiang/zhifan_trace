<template>
    <div class="container" @click="closeAll">
      <headerVue v-on:getSearch="getSearch" ref="headerVue" v-on:changePwdShow="changePwdShow"></headerVue>
      <span class="space"></span>
      <div class="detail">
        <div class="tab">
          <span @click="tabChange($event,3)" class="tabSel utf">区块浏览器</span>
          <span @click="tabChange($event,1)" class="utf">用户画像</span>
          <span @click="tabChange($event,0)" >智能追踪</span>
          <span @click="tabChange($event,2)" >手动追踪</span>
        </div>
        <div style="position: relative;box-sizing: border-box">
          <browser v-show="tabShow==3"></browser>
          <photo  v-show="tabShow==1" ref="photo"></photo>
          <trace v-if="level !=0" v-show="tabShow==0" ref="trace"></trace>
          <handelTRace v-if="level==2" v-show="tabShow==2" v-on:walletClick="walletClick" ref="handelTRace" v-on:stavePhoto="stavePhoto" v-on:successClick="successClick" v-on:failClick="failClick"></handelTRace>
          <!--<div class="noKt" v-if="level ==0" v-show="tabShow==1">用户画像没有开通</div>-->
          <div class="noKt" v-if="level ==0" v-show="tabShow==0">
            <span class="oo">暂无使用权限，请联系Chaindigg开通，联系电话：<span>400-6988-698</span></span>
            <el-carousel :interval="3000" arrow="always" height="580px" :initial-index=0 :autoplay="autoplay">
              <el-carousel-item>
                <img class="dd" src="./../assets/img/group1.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img class="dd" src="./../assets/img/group2.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img class="dd" src="./../assets/img/group3.png" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="noKt" v-if="level !=2" v-show="tabShow==2">
            <span class="oo">暂无使用权限，请联系Chaindigg开通，联系电话：<span>400-6988-698</span></span>

            <img style="width: auto;height: 580px;display: flex;margin: 0 auto" src="./../assets/img/tp.png" alt="">
          </div>
        </div>
      </div>
      <div class="changePwd" v-show="changePwd">
        <div class="pwdBox">
          <span class="label">请输入原密码</span>
          <input type="password" class="pwdInput" v-model="oldPwd" @blur="oldPwdCheck" @focus="oldPwdCheck2">
          <span class="newText" v-show="tS1">该字段不能为空</span>
          <span class="label">请输入新密码</span>
          <input type="password" class="pwdInput" v-model="newPwd" @blur="newPwdCheck" @focus="newPwdCheck2">
          <span class="newText" v-show="tS2">该字段不能为空</span>
          <span class="newText" v-show="tS3">至少8个字符，至少包含数字和英文字母两种</span>
          <!--<span class="newText" v-show="tS6">修改的密码两次输入不一致</span>-->
          <span class="label">确认新密码</span>
          <input type="password" class="pwdInput" v-model="checkPwd" @blur="checkPwdCheck" @focus="checkPwdCheck2">
          <span class="newText" v-show="tS4">该字段不能为空</span>
          <span class="newText" v-show="tS5">至少8个字符，至少包含数字和英文字母两种</span>
          <span class="newText" v-show="tS6">修改的密码两次输入不一致</span>
          <div class="btns">
            <span class="true" @click="changePwdClick">确定</span>
            <span class="false" @click="cancelClick">取消</span>
          </div>
          <img class="tf" @click="cancelClick" src="./../assets/img/hold.png" alt="">
        </div>
      </div>
      <div class="saveChart" @click="stavePhoto" v-if="level !=0" v-show="tabShow==0">保存图谱</div>
      <div class="saveChart" @click="stavePhoto2" v-if="level ==2" v-show="tabShow==2">保存图谱</div>
      <div class="newTime" v-if="level !=0" v-show="tabShow==0">
        数据更新时间：{{newTime}}
      </div>
      <div class="newTime" v-if="level ==2" v-show="tabShow==2">
        数据更新时间：{{newTime}}
      </div>
      <div class="saveHide" v-show="saveHide">
        <div class="saveMin">
          <span class="title">保存图谱</span>
          <span class="desc">由于区块链上的数据在不断变化，下次打开次图谱时，可能会发生变化。</span>
          <span class="label">请输入图谱名称</span>
          <input type="text" class="saveText" v-model="chartName" @keyup.enter="trueClick">
          <div class="btns">
            <span class="true" @click="trueClick">确定</span>
            <span class="false" @click="falseClick">取消</span>
          </div>
        </div>
      </div>
      <div class="saveHide" v-show="saveHide2">
        <div class="saveMin">
          <span class="title">保存图谱</span>
          <span class="desc">由于区块链上的数据在不断变化，下次打开次图谱时，可能会发生变化。</span>
          <span class="label">请输入图谱名称</span>
          <input type="text" class="saveText" v-model="chartName2" @keyup.enter="trueClick2">
          <div class="btns">
            <span class="true" @click="trueClick2">确定</span>
            <span class="false" @click="falseClick2">取消</span>
          </div>
        </div>
      </div>
      <!---->
    </div>
</template>

<script>
    import headerVue from './detail/header';
    import photo from './detail/photo2';
    import trace from './detail/trace';
    import handelTRace from './detail/trace2'
    import browser from './detail/browser'
    import bus from './../assets/eventBus'
    var vm;
    export default {
      name: "detail",
      components:{
        headerVue,photo,trace,handelTRace,browser
      },
      data(){
        vm = this;
        return {
          tabShow:3,
          level:null,
          changePwd:false,
          oldPwd:'',
          newPwd:'',
          checkPwd:'',
          saveHide:false,
          saveHide2:false,
          chartName:'',
          chartName2:'',
          newTime:'',
          autoplay:false,
          tS1:false,
          tS2:false,
          tS3:false,
          tS4:false,
          tS5:false,
          tS6:false,
        }
      },
      methods:{
        //tab切换
        tabChange($event,num){
          let that = this;
          that.tabShow = num;
          that.autoplay = true;
          $($event.currentTarget).addClass('tabSel');
          $($event.currentTarget).siblings().removeClass('tabSel');
          if(that.level == 2){
            that.$refs.trace.closeAll();
            that.$refs.handelTRace.closeAll();
          }else if(that.level == 2){
            that.$refs.trace.closeAll();
          }
        },
        //搜索
        getSearch(key){
          let that = this;
          that.returnBack();
          that.Cookies.set("key",key);
          that.$refs.photo.getSearch(key);
          that.$refs.trace.getSearch(key);
          console.log(key)
        },
        returnBack(){
          let that = this;
          that.tabShow = 1;
          $('.utf').addClass('tabSel');
          $('.utf').siblings().removeClass('tabSel');
        },
        closeAll(){
          this.$refs.headerVue.xClick()
        },
        walletClick(id){
          this.$refs.trace.walSH()
          this.$refs.trace.walletClick(id)
        },
        changePwdShow(){
          let that = this;
          that.changePwd = true;
        },
        changePwdClick(){
          let that = this;
          let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
          if(that.oldPwd == '' || that.newPwd == '' || that.checkPwd == ''){
            // that.$message.error('输入内容不能为空')
            if(that.oldPwd == ''){
              that.tS1 = true;
              $('.pwdInput').eq(0).css('borderColor','red')

            }
            if(that.newPwd == ''){
              that.tS2 = true;
              $('.pwdInput').eq(1).css('borderColor','red')

            }
            if(that.checkPwd == ''){
              that.tS4 = true;
              $('.pwdInput').eq(2).css('borderColor','red')

            }
          }else if(that.newPwd != that.checkPwd){
            that.tS3 = false;
            that.tS5 = false;
            that.tS6 = true;
            $('.pwdInput').eq(1).css('borderColor','red')
            $('.pwdInput').eq(2).css('borderColor','red')
            // that.$message.error('修改的密码两次输入不一致')
          }else if(reg.test(that.newPwd) == false || reg.test(that.checkPwd) == false){
            // that.tS3 = false;
            // that.tS5 = false;
            // that.tS6 = true;
            // $('.pwdInput').eq(1).css('borderColor','red')
            // $('.pwdInput').eq(2).css('borderColor','red')
            // $('.pwdInput').eq(1).css('borderColor','red')
            // $('.pwdInput').eq(2).css('borderColor','red')
          }
          else {
            that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
            let data = {
              oldPassword:that.$md5('chaindigg'+that.$md5(that.oldPwd)),
              newPassword1:that.$md5('chaindigg'+that.$md5(that.newPwd)),
              newPassword2:that.$md5('chaindigg'+that.$md5(that.checkPwd))
            }
            that.ajax({
              method:"post",
              url:that.Config.baseUrl2 + "/member/modify",
              data:that.qs.stringify(data)
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                that.$message.success('修改成功');
                that.cancelClick();
                that.Cookies.remove("username");
                that.Cookies.remove("password");
                that.Cookies.remove("key");
                that.Cookies.remove("token");
                that.$router.push({name:"login"})
              }else {
                that.$message.error(res.data.message);
                that.cancelClick();
              }
            })
          }
        },
        cancelClick(){
          let that = this;
          that.oldPwd = '';
          that.newPwd = '';
          that.checkPwd = '';
          that.changePwd = false;
          that.tS1 = false;
          that.tS2 = false;
          that.tS3 = false;
          that.tS4 = false;
          that.tS5 = false;
          that.tS6 = false;
          $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
          $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
          $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
        },
        trueClick(){
          let that = this;
          console.log(that.chartName);
          if(that.chartName == ''){
            that.$message.error('输入内容不能为空')

          }else {
            let that = this;
            let graphId = '';
            if(that.Cookies.get('graphId') != null && that.Cookies.get('graphId') != undefined){
              graphId = that.Cookies.get('graphId')
            }else {
              graphId = ''
            }
            let data={
              address:that.Cookies.get('key'),
              // nonce:that.nonce,
              nodes:'',
              edges:'',
              name:that.chartName,
              type:1,
              graphId:graphId
            }
            that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
            that.ajax({
              method: 'post',
              url: that.Config.baseUrl2+'/member/save/graph',
              data:that.qs.stringify(data)
            }).then(res => {
              console.log(res);
              if(res.data.code=='0000'){
                that.$message.success('保存成功');
                that.Cookies.set('graphId',res.data.data);
                that.saveHide = false;
              }else {
                that.open(res.data.message)
              }
            })

          }
        },
        //
        falseClick(){
          let that = this;
          that.saveHide = false;
          that.chartName = '';
        },
        falseClick2(){
          let that = this;
          that.saveHide2 = false;
          that.chartName2 = '';
        },
        trueClick2(){
          let that = this;
          console.log(that.chartName2);

          if(that.chartName2 == ''){
            that.$message.error('输入内容不能为空')

          }
          else {
            that.$refs.handelTRace.getSave(that.chartName2)
            // that.$message.success('保存成功')
            that.saveHide2 = false;

          }
        },
        stavePhoto(){
          let that = this;
          that.saveHide = true;
          that.chartName = '';
        },
        stavePhoto2(){
          let that = this;
          that.saveHide2 = true;
          that.chartName2 = '';
        },
        successClick(){
          let that = this;
          that.$message.success('保存成功')
        },
        failClick(message){
          let that = this;
          that.open(message)
        },
        detailClick2(){
          alert('qqqq')

        },
        open(mm) {
          let that = this;
          this.$alert(mm, '', {
            confirmButtonText: '确定',
            callback: action => {
              // that.backLogin();
            }
          });
        },
        //////////
        oldPwdCheck(){
          let that = this;
          console.log(that.oldPwd);
          if(that.oldPwd == ''){
            that.tS1 = true;
            $('.pwdInput').eq(0).css('borderColor','red')
          }else {
            that.tS1 = false;
            $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
          }
        },
        oldPwdCheck2(){
          let that = this;
          that.tS1 = false;
          $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
        },
        newPwdCheck(){
          let that = this;
          let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
          if(that.newPwd == ""){
            that.tS2 = true;
            $('.pwdInput').eq(1).css('borderColor','red')
          }else {
            that.tS2 = false;
            $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
            if(reg.test(that.newPwd)){
              that.tS3 = false;
              $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
              // if(that.checkPwd == that.newPwd){
              //   that.tS6 = false;
              //   $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
              //
              // }else {
              //   that.tS6 = true;
              //   $('.pwdInput').eq(1).css('borderColor','red')
              // }
            }else {
              that.tS3 = true;
              $('.pwdInput').eq(1).css('borderColor','red')
            }
          }
        },
        newPwdCheck2(){
          let that = this;
          that.tS3 = false;
          that.tS2 = false;
          that.tS6 = false;
          $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
        },
        checkPwdCheck(){
          let that = this;
          let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
          if(that.checkPwd == ""){
            that.tS4 = true;
            $('.pwdInput').eq(2).css('borderColor','red')
          }else {
            that.tS4 = false;
            $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
            if(that.checkPwd == that.newPwd){
              that.tS6 = false;
              $('.pwdInput').eq(2).css('borderColor','#C8C8C8')

            }else {
              that.tS6 = true;
              $('.pwdInput').eq(2).css('borderColor','red')
            }
            // if(reg.test(that.checkPwd)){
            //   that.tS5 = false;
            //   $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
            //
            // }else {
            //   that.tS5 = true;
            //   $('.pwdInput').eq(2).css('borderColor','red')
            // }
          }
        },
        checkPwdCheck2(){
          let that = this;
          that.tS4 = false;
          that.tS5 = false;
          that.tS6 = false;
          $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
        },
      },
      beforeCreate(){

      },
      beforeMount(){
        let that = this;

      },
      mounted(){
        let that = this;
        that.Cookies.set('exchangeTag','');
        that.Cookies.set('exchangeTag2','');
        that.level = that.Cookies.get('cl');
        console.log(that.level);
        if(that.Cookies.get('topoClick') == 2){
          that.tabShow = that.Cookies.get('topoClick')
          $('.tab span').eq(3).addClass('tabSel').siblings().removeClass('tabSel')
        }else if(that.Cookies.get('topoClick') == 1){
          that.tabShow = 0
          $('.tab span').eq(2).addClass('tabSel').siblings().removeClass('tabSel');
          // that.$refs.photo.getSearch(key);
          // that.$refs.trace.getSearch(key);
          that.Cookies.remove('topoClick')
        }
        that.newTime = that.Cookies.get('dataExpiration')
      }
    }
</script>

<style scoped>
  .container{
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    background: #131518;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    min-width: 1400px;
    min-height: 900px;
  }
  .detail{
    flex: 1;
    background: #191a1d;
  }
  .space{
    height: 9px;
    width: 100%;
    background:  #131518;
  }
  .tab{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 56px;
    height: 40px;
    background: #24262C;
    border-bottom: 1px solid #131518;
  }
  .tab span{
    padding: 0 8px;
    height: 100%;
    border-top: 2px solid  #24262C;
    border-bottom: 2px solid  #24262C;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .tab span:nth-child(2){
    margin-left: 24px;
    margin-right: 24px;
  }
  .tab span:nth-child(3){
    margin-right: 24px;
  }
  .tabSel{
    color: #00A0E9 !important;
    border-top: 2px solid  #24262C;
    border-bottom: 2px solid  #00A0E9 !important;
  }
  .noKt{
    color: #ffffff;
    position: relative;
    width: auto;
    margin: 0 auto;
    height: 480px;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  /**/
  .changePwd{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(25,26,29,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
.pwdBox{
  width: 22.5rem;
  min-height: 27.125rem;
  background: #FFFFFF;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
}
  .title{
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 1rem;
    color: #333333;
  }
  .label{
    width: 100%;
    text-align: left;
    border-radius: 2px;
    margin-top: 1.5rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
  }
  .pwdInput{
    width: 20.5rem;
    height: 2.5rem;
    outline: none;
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 1rem;
    margin-top: 1rem;
  }
  .btns{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }
  .btns span{
    width: 5rem;
    height: 2.5rem;
    border-radius: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .true{
    background: #00A0E9;
    margin-right: 1.5rem;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
  }
  .false{
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #999999;
  }
  .el-carousel__item{
     height: 580px;
   }
  .tf{
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }
  .saveChart{
    background: #1A1C20;
    border: 1px solid #00A0E9;
    border-radius: 2px;
    width: 5rem;
    height: 2rem;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 176px;
    right: 40px;
    cursor: pointer;
  }
  .newTime{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    position: absolute;
    top: 136px;
    right: 40px;
    cursor: pointer;
  }
  .saveHide{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(25,26,29,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .saveMin{
    width: 30rem;
    height: 17.25rem;
    background: #FFFFFF;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1.5rem 1rem;
  }
  .title{
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 1rem;
    color: #333333;
  }
  .desc{
    font-family: PingFangSC-Regular;
    font-size:0.75rem;
    color: #D0021B;
    margin-top: 0.5rem;
    width: 100%;
    text-align: center;
  }
  .label{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #333333;
    margin-top: 1.5rem;
  }
  .saveText{
    width: 28rem;
    height: 2.5rem;
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 2px;
    outline: none;
    margin-top: 1rem;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .btns{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  }
  .btns span{
    width: 5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .true{
    background: #00A0E9;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    margin-right: 1.5rem;
  }
  .false{
    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #999999;
  }
  .dd{
    height: 580px !important;
    width: auto;
    display: flex;
    margin: 0 auto;
  }
  .oo{
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #ffffff;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 48px;
  }
  .oo span{
    color: #FFCC00;
  }
  .newText{
    font-size: 10px;
    color: red;
  }
</style>
