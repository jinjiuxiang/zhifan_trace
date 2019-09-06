<template>
    <div class="header">
      <div class="left">
        <img style="cursor: pointer" src="./../../assets/logo2.svg" @click="logoClick" alt="">
        <span class="text">数字货币追踪查证系统</span>
        <div class="search">
          <input type="password" style="display: none">
          <input class="input" v-model="key"  onfocus="this.type='text'" type="text" autocomplete="off" placeholder="请输入要追踪的地址" @keyup.enter="getSearch(key)">
          <span class="btn" @click="getSearch(key)"><img src="./../../assets/search1.svg" alt=""></span>
        </div>
      </div>
      <div class="right" @click.stop>
          <span class="user" @click="userClick">{{user}}&nbsp; <img src="./../../../static/img/down.png" alt=""></span>
          <!--<span class="edit" @click="open2">退出</span>-->
          <div class="rightHide" v-show="rightHide">
              <span @click="changePwd($event)">修改密码</span>
              <span @click="open2($event)">退出登录</span>
          </div>
      </div>
      <div class="alet" v-show="aletShow">
        <img class="close" src="./../../assets/close.png" alt="">
        <span class="aletText">{{aletText}}</span>
        <img class="cancel" @click="xClick" src="./../../assets/cancel.png" alt="">
      </div>
    </div>
</template>

<script>
    export default {
      name: "headerVue",
      data(){
        return {
          user:"",
          key:'',
          aletShow:false,
          aletText:'',
          rightHide:false
        }
      },
      methods:{
        //退出
        open2($event) {
          this.rightHide = false;
          this.$confirm('是否确定退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            this.$router.push({name:'login'})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        },
        //开始搜索
        getSearch(key){
          if(key != ""){
            this.checkKey(key)
          }
        },
        //搜索核实
        checkKey(key){
          let that = this;
          $('.input').blur();
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl + "/check",
            params:{
              address:key
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              if(res.data.data.status == 0){
                  that.Cookies.remove('graphId');
                  that.Cookies.remove('graphId2');
                that.Cookies.set("key",that.key);
                that.Cookies.set("checkpoint",res.data.data.checkpoint);
                that.Cookies.set('exchangeTag','');
                that.Cookies.set('exchangeTag2','');
                window.location.reload()
              }else if(res.data.data.status == 1){
                that.aletText = '暂无此地址信息，请尝试搜索其他地址';
                that.aletShow = true;
              }else {
                that.aletText = '请输入正确的数字货币地址';
                that.aletShow = true;
              }
            }
          })
        },
        //点击logo
        logoClick(){
          this.$router.push({name:"search"});
          // window.location.reload()
        },
        //点击X
        xClick(){
          this.rightHide = false;
          this.aletShow = false;
        },
        userClick(){
          let that = this;
          that.rightHide = !that.rightHide;
        },
        //修改密码w
        changePwd($event){
          // $($event.currentTarget).addClass('click').siblings().removeClass('click');
          this.rightHide = false;
          this.$emit('changePwdShow');
        }
      },
      beforeMount(){
        let that = this;
        that.user = that.Cookies.get('username');
      }
    }
</script>

<style scoped>
  .header{
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #24262C;
    position: relative;
  }
  .left{
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left: 48px;
    align-items: center;
  }
  .text{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #FFFFFF;
    margin-left: 40px;
  }
  .search{
    width: 600px;
    display: flex;
    background: #24262C;
    border: 1px solid #00A0E9;
    border-radius: 2px;
    height: 34px;
    margin-left: 63px;
  }
  .input{
    flex: 1;
    outline: none;
    border: none;
    background: #24262C;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    box-sizing: border-box;
    padding: 0 24px;
  }
  .btn{
    width: 64px;
    height: 34px;
    background: #00A0E9;
    border-radius: 0px 2px 2px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn img{
    width: 20px;
    height: 20px;
  }
  .right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding-right: 48px;
    position: relative;
  }
  .user{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    margin-right: 24px;
    cursor: pointer;
  }
  .edit{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .alet{
    width: 376px;
    height: 48px;
    background:#3A3C41;
    border-radius: 2px;
    position: absolute;
    bottom: -65px;
    left: calc(50% - 188px);
    display: flex;
    align-items: center;
    z-index: 9;

  }
  .close{
    margin-left: 22px;
  }
  .aletText{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    margin-left: 18px;
    flex: 1;
  }
  .cancel{
    margin-right: 24px;
    cursor: pointer;
  }
  /**/
  .rightHide{
    position: absolute;
    top: 30px;
    right: 4.5rem;
    width: 5rem;
    height: 4.5rem;
    background: #FFFFFF;
    border-radius: 2px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .rightHide span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    cursor: pointer;
  }
  .rightHide span:hover{
    color: #00A0E9;
  }
  .click{
    color: #00A0E9 !important;
  }
  .rightHide span:nth-child(1){
    margin-bottom: 0.5rem;
  }

</style>
