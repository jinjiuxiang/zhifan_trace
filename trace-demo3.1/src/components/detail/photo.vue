<template>
  <div class="photo">
    <div class="first">
      <span class="addr">地址：{{key}}<span style="margin-left: 32px;color: #00A0E9;font-family: PingFangSC-Regular;font-size: 16px">所属钱包：[{{wallData.walletId}}]</span>&nbsp;<span style="font-size: 16px;font-family: PingFangSC-Regular">（共{{wallData.walletSize}}个地址）</span></span>
      <div class="fBtn">
        <span class="sel" @click="addrChange($event,0)">地址画像</span>
        <span @click="addrChange($event,1)">钱包画像</span>
      </div>
    </div>
    <div class="fDesc" v-show="num == 0">
      <p>
        <span>余额：{{addrData.addressBalance}}</span>
        <span>最新交易：<span>{{addrData.addressLatestTxValue}}</span>/{{addrData.addressLatestTxTime}}</span>
      </p>
      <p>
        <span>总接收次数：{{addrData.addressIncomingTxNum}}次</span>
        <span>总接收额度：{{addrData.addressTotalInValue}}</span>
      </p>
      <p>
        <span>总转出次数：{{addrData.addressOutputTxNum}}次</span>
        <span>总转出额度：{{addrData.addressTotalOutValue}}</span>
      </p>
      <p>
        <span>常用IP：-</span>
        <span>常用地点：-</span>
      </p>
    </div>
    <div class="fDesc" v-show="num == 1">
      <p>
        <span>余额：{{wallData.walletBalance}}</span>
        <span>最新交易：<span>{{wallData.walletLatestTxValue}}</span>/{{wallData.walletLatestTxTime}}</span>
      </p>
      <p>
        <span>总接收次数：{{wallData.walletIncomingTxNum}}次</span>
        <span>总接收额度：{{wallData.walletTotalInValue}}</span>
      </p>
      <p>
        <span>总转出次数：{{wallData.walletOutputTxNum}}次</span>
        <span>总转出额度：{{wallData.walletTotalOutValue}}</span>
      </p>
      <p>
        <span>常用IP：-</span>
        <span>常用地点：-</span>
      </p>
    </div>
    <div id="main" style="width: 100%;height: 400px;margin-top: 100px"></div>
    <!--<div id="mainChart3" v-show="num == 1" style="width: 100%;height: 400px;margin-top: 100px"></div>-->
  </div>
</template>

<script>
    export default {
      name: "photo",
      data(){
        return {
          num:0,
          addrData:{},
          wallData:{},
          addrChart:{},
          wallChart:{},
          key:"",
          myChart2:null
        }
      },
      methods:{
        //地址钱包切换
        addrChange($event,num){
          let that = this;
          that.num = num;
          if(num == 0){
            console.log('dz')
            that.drawMain2()
          }else {
            console.log('qb')
            //that.drawMain2(that.wallChart.x,that.wallChart.y1,that.wallChart.y2)
          }
          $($event.currentTarget).addClass('sel').siblings().removeClass('sel');
        },
        //获取地址数据
        getAddrData(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+"/info",
            params:{
              address:address
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.addrData = res.data.data;
            }
            console.log(that.addrData);
          })
        },
        //获取钱包数据
        getWalData(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+"/wallet",
            params:{
              address:address
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.wallData = res.data.data;
            }
          })
        },
        //获取地址折线图数据
        getAddrChart(address){
          let that = this;
          that.myChart2 = that.$echarts.init(document.getElementById('main'));
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+'/balance',
            params:{
              address:address
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.addrChart = res.data.data;
              that.drawMain2(resp.x,resp.y1,resp.y2)
            }
          })
        },
        //获取钱包折线图数据
        getWallChart(address){
          let that = this;
          that.myChart2 = that.$echarts.init(document.getElementById('main'));
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+'/balance',
            params:{
              walletFlag:-1,
              address:address
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.wallChart = res.data.data;
              //that.drawMain3(resp.x,resp.y1,resp.y2)
            }
          })
        },
        //画地址图像，
        drawMain2(xData,yData1,yData2){
          let that = this;
          var option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }]
          };

          // var option = {
          //   tooltip: {
          //     trigger: 'axis',
          //   },
          //   legend: {
          //     data:['BTC余额']
          //   },
          //   grid: {
          //     left: '3%',
          //     right: '4%',
          //     bottom: '60',
          //     containLabel: true
          //   },
          //   dataZoom:{
          //     type:'slider',
          //     start:50,
          //     end:100
          //   },
          //   toolbox: {
          //     // feature: {
          //     //   saveAsImage: {}
          //     // }
          //   },
          //   xAxis: {
          //     type: 'category',
          //     boundaryGap: false,
          //     data: xData
          //   },
          //   yAxis: [
          //     {
          //       splitLine:{show: false},
          //       type: 'value',
          //       name:'BTC余额',
          //     },
          //     // {
          //     //   splitLine:{show: false},
          //     //   type: 'value',
          //     //   name:vm.$t('text.txVal'),
          //     //   position: 'right',
          //     // }
          //   ],
          //   series: [
          //     {
          //       name:'BTC余额',
          //       type:'line',
          //       //stack: '总量',
          //       yAxisIndex:0,
          //       smooth:true,
          //
          //       data:yData1
          //     },
          //     // {
          //     //   name:vm.$t('text.txVal'),
          //     //   type:'line',
          //     //   //stack: '总量',
          //     //   yAxisIndex:1,
          //     //   smooth:true,
          //     //   data:yData2
          //     // }
          //   ]
          // };

          // 使用刚指定的配置项和数据显示图表。
          that.myChart2.setOption(option);
        },
        //搜索
        getSearch(key){
          let that = this;
          that.key = key;
          that.getAddrData(that.key);
          that.getWalData(that.key);
          that.getAddrChart(that.key)
          that.getWallChart(that.key);
          that.drawMain2()
        },
        //需改颜色
        colorChange(val){
          if(val.indexOf('+') != -1){
            return 'add'
          }else{
            return 'reduce'
          }
        }
      },
      filters:{
        valChange(val){
          if(val > 0){
            return '+' + val;
          }else {
            return val;
          }
        }
      },
      beforeMount(){
        let that = this;
        that.key = that.Cookies.get("key");
      },
      mounted(){
          console.log("11111111");
          let that = this;
          that.getAddrData(that.key);
          that.getWalData(that.key);
          that.getAddrChart(that.key)
          that.getWallChart(that.key)

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
  .photo{
    width: 100%;
    height: 300px;
  }
  .first{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    box-sizing: border-box;
    padding: 30px 40px;
  }
  .addr{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
  }
  .fBtn{
    display: flex;
    background: #1A1C20;
    border: 1px solid rgba(255,255,255,0.20);
  }
  .fBtn span{
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    border: 2px;
    cursor: pointer;
  }
  .fBtn span:nth-child(1){
    border-radius: 2px 0px 0px 2px;
  }
  .fBtn span:nth-child(2){
    border-radius: 0px 2px 2px 0px;
  }
  .sel{
    background: #00A0E9 !important;
    color: #FFFFFF !important;
  }
  .fDesc{
    display: flex;
    box-sizing: border-box;
    padding-left:38px;
    margin-top: 40px;
  }
  .fDesc p{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .fDesc p span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
  }
  .fDesc p span:nth-child(2){
    margin-top: 25px;
  }
</style>
