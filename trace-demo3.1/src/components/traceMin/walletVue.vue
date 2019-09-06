<template>
    <div class="wallet"
         v-loading="loading3"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="walletTop">
        <div class="wa1">
          <span class="wa1Text">钱包：{{wallData.walletName | nameFi}}（共有{{wallData.walletSize}}个地址）</span>
          <el-tooltip class="item" effect="dark" content="如需对地址进行监控，请联系Chaindigg，联系电话：400-6988-698" placement="top-end">
            <span class="set">设置监控</span>
          </el-tooltip>
        </div>
        <div class="wa2">
          <span class="wa1Text">标注：</span>
          <span class="tag">{{wallData.walletName | nameFi}}</span>
        </div>
        <div class="wa2">
          <span class="wa1Text">图谱显示标注：</span>
          <span class="tag" v-show="tagShow" @dblclick="editTag">{{wallData.walletName | tagName}}</span>
          <input type="text" @click.stop v-show="!tagShow" v-model="tagVal" @keyup.enter="getTag(wallData.walletId)">
        </div>
        <div class="close" @click="walH">
          <img src="./../../assets/X.png" alt="">
        </div>
      </div>
      <!---->
      <div class="walletBtm">
        <span class="wa1Text">最新余额：{{wallData.walletBalance}}</span>
        <span class="wa1Text">最新交易额度：<span :class="colorChange(wallData.walletLatestTxValue)">{{wallData.walletLatestTxValue}}</span></span>
        <span class="wa1Text">最新交易时间：{{wallData.walletLatestTxTime}}</span>
        <span class="wa1Text">总转入：{{wallData.walletTotalInValue}}/{{wallData.walletIncomingTxNum}}次</span>
        <span class="wa1Text">总转出：{{wallData.walletTotalOutValue}}/{{wallData.walletOutputTxNum}}次</span>
      </div>
      <!---->
      <div class="jk" v-show="jkShow">
        <div class="jkMin">
          <div class="jk1">
              <span>钱包监控设置</span>
              <span style="cursor: pointer" @click="jkH"><img src="./../../assets/X.png" alt=""></span>
          </div>
          <div class="tt">
            <span class="label">钱包</span>
            <span class="text">12233654</span>
          </div>
          <div class="tt">
            <span class="label">钱包备注</span>
            <input class="in1" type="text">
          </div>
          <div class="tt">
            <span class="label">钱包备注</span>
            <div class="inout">
               <div>
                 <span class="t1">转入</span>
                 <span class="t2">大于</span>
                 <input class="in2" type="text">
               </div>
              <div style="margin-top: 12px">
                <span class="t1">转出</span>
                <span class="t2">大于</span>
                <input class="in2" type="text">
              </div>
            </div>
          </div>
          <div class="tt">
            <span class="label">通知方式</span>
            <el-checkbox label="邮件"></el-checkbox>
            <el-checkbox label="短信"></el-checkbox>
          </div>
          <div class="bb">
            <span class="ed" @click="open">取消</span>
            <span class="qr" @click="open2">保存</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "walletVue",
      data(){
        vm = this;
        return {
          jkShow:false,
          loading3:false,
          wallData:{},
          tagShow:true,
          tagVal:'',
          newTag:''
        }
      },
      methods:{
        open() {
          this.$message('取消保存');
          this.jkH();
        },
        open2() {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.jkH();
        },
        jkS(){
          this.jkShow = true;
        },
        jkH(){
          this.jkShow = false;
        },
        walH(){
          this.$emit('walH')
        },
        walletClick(id){
          console.log(id);
          let that = this;
          console.log(vm.Cookies.get('exchangeId'));
          that.loading3 = true;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+"/wallet",
            params:{
              walletId:id,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.wallData = res.data.data;
              that.tagVal = that.wallData.walletName;
              that.$nextTick(() => {
                that.loading3 = false;
              })
            }
          })
        },
        //创建可编辑标签
        editTag(){
          let that = this;
          that.tagShow = false;
        },
        getTag(id){
          let that = this;
          that.tagShow = true;
          that.Cookies.set('exchangeId',id);
          that.Cookies.set('exchangeTag',that.tagVal);
          that.newTag = that.tagVal;
          console.log(that.tagVal);
          that.$emit('getTag')
        },
        //需改颜色
        colorChange(val){
          if(val.indexOf('+') != -1){
            return 'add'
          }else{
            return 'reduce'
          }
        },
        //关闭标签编辑
        closeAll(){
          let that = this;
          that.tagShow = true;

        }
      },
      filters:{
        nameFi(val){
          let t = val.replace('实体',"钱包")
          return t
        },
        valChange(val){
          if(val > 0){
            return '+' + val;
          }else {
            return val;
          }
        },
        tagName(val){
          if(vm.Cookies.get('exchangeTag') != ''){
            if(val.indexOf(vm.Cookies.get('exchangeId')) != -1){
              console.log(1111)
              let tt = vm.Cookies.get('exchangeTag');
              return tt;
            }else {
              return val.replace('实体','钱包')
            }
          }else {
            return val.replace('实体','钱包')
          }
        }
      }
    }
</script>

<style scoped>
  .add{
    color: #5FB98F !important;
  }
  .reduce{
    color: #E8716E !important;
  }
  .wallet{
    min-width: 360px;
    min-height: 296px;
    background: #1A1C20;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
  }
  .walletTop{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 24px;
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .wa1{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .set{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3691FB;
    cursor: pointer;
  }
  .wa1Text{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
  }
  .tag{
    padding: 1px 12px;
    background: #3691FB;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    user-select:none;
  }
  .tagIn{
    display: inline-block;
  }
  .wa2{
    margin-top: 13px;
  }
  .walletBtm{
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    padding: 24px;
    position: relative;
  }
  .walletBtm span{
    margin-bottom: 12px;
  }
  .walletBtm span:last-child{
    margin-bottom: 0px;
  }
  .close{
    width: 40px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: -40px;
    background: #1A1C20;
    cursor: pointer;
  }
  /**/
  .jk{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .jkMin{
    width: 480px;
    height: 300px;
    background: #212226;
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
  }
  .jk1{
    height: 46px;
    width: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    border-bottom: 1px solid #131518;
  }
  .jk1 span:nth-child(1){
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
  }
  .tt{
    display: flex;
    margin-top: 21px;
  }
  .label{
    width: 116px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
  }
  .text{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;

  }
  .in1{
    width: 214px;
    height: 24px;
    background: #FFFFFF;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 12px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    border: none;
    outline: none;
  }
  .inout{
    display: flex;
    flex-direction: column;
  }
  .t1{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-right: 24px;
  }
  .t2{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
  }
  .in2{
    width: 128px;
    height: 24px;
    background: #FFFFFF;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 12px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    border: none;
    outline: none;
  }
  .bb{
    display: flex;
    justify-content: flex-end;
    margin-top: 7px;
  }
  .ed{
    width: 48px;
    height: 22px;
    background: #9B9B9B;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
  }
  .qr{
    width: 48px;
    height: 22px;
    background: #00A0E9;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>








