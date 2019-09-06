<template>
  <div class="container" @click="headerHide" v-loading="loadingH"
       element-loading-text="数据加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--头部搜索和多语言切换-->
    <div class="detail" :style="{minHeight:minHeight + 'px'}" v-if="hackReset">
      <!--btc等交易详情页-->
      <BTC_txn v-if="finalData.coinType != 'USDT'&&finalData.dataType =='txn'" :message="finalData" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_txn>
      <!--btc等区块详情页-->
      <!--<BTC_block v-if="finalData.coinType != 'USDT'&& finalData.dataType =='block'" :message="finalData" v-on:btcPageChange="btcPageChange" v-on:getBeforeBlock="getBeforeBlock" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_block>-->
      <!--btc等地址详情页-->
      <BTC_address v-if="finalData.coinType != 'USDT'&&finalData.coinType != 'BCH'&&finalData.coinType != 'BCHSV' && finalData.dataType =='address'" :message="finalData" v-on:btcAddressPageChange="btcAddressPageChange" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_address>
      <!--usdt地址详情页-->
      </div>
  </div>
</template>

<script>

  import BTC_address from './../browser/BTC-address'
  import BTC_txn from './../browser/BTC-tx'
  var vm;
  export default {
    name: "detail",
    data(){
      vm = this;
      return {
        minHeight:0,
        params:this.$route.params,
        finalData:{},
        hide:false,
        loadingH:true,
        hackReset:false

    }
    },
    components:{
      BTC_address,BTC_txn
    },
    methods:{
      //根据搜索条件的类型不同，进行不同的搜索
      getFinalData(dataType,key){
        let that = this;
        that.hackReset = false
        that.loadingH = true;
        if(dataType == 'block'){
          console.log('block');
          that.getBlockData(key,0);
        }else if(dataType == 'txn'){
          console.log("txn");
          that.getTxnData(key)
        }else if(dataType == 'address'){
          console.log("address");
          that.getAddressData(key,0)
        }

      },
      //获取区块数据
      getBlockData(id,page){
        const that = this;
        let reg = /^[0-9]+.?[0-9]*$/;
        let channelid = "";
        if(that.$route.query.channelId == undefined){
          channelid = ""
        }else {
          channelid = that.$route.query.channelId
        }
        if(reg.test(id)){
          var data = {
            coinType:that.params.coinType,
            id:id,
            pageSize:20,
            pageNumber:page,
            channelId:channelid
          }
        }else {
          var data = {
            coinType:that.params.coinType,
            hash:id,
            pageSize:20,
            pageNumber:page,
            channelId:channelid
          }
        }
        that.ajax.interceptors.response.use(function (response) {
          return response;
        }, function (err) {
          if (err && err.response) {
            that.$router.push({name:"noserver"})
            //window.location.href = "http://10.0.0.38:8081/nosec"
            //window.location.replace( "https://test.blockdigg.com/noServers")
          }else{
            err.message = '连接服务器失败!'
          }
        });
        that.ajax({
          methods:"get",
          url:that.Config.baseUrl+"/api/block",
          params:data
        }).then(function (res) {
          if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
            that.finalData = res.data.data;
            document.title=res.data.data.coinType+" "+vm.$t('text.titleBlock') + " #"+res.data.data.id+"-"+vm.$t('text.blockTitle');
            that.Cookies.set('preCoinType',data.coinType);
            that.Cookies.set('preDataType',that.params.dataType);
            that.Cookies.set('preKey',that.params.key);
            window.scrollTo(0,0)
          }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
            that.Cookies.set('searchWord',that.params.key);
            that.$router.push({name:"noSearch",params:{key:that.params.key}})
          }
        })
      },
      //点击分页发起请求
      btcPageChange(pageNum){
        const that = this;
        that.getBlockData(that.params.key,pageNum)
      },
      //点击前一区块或后裔区块发送的请求
      getBeforeBlock(beforeNum){
        const that = this;
        if(beforeNum != null){
          that.$route.params.key = beforeNum;
          //that.params.id = beforeNum;

          //that.getBlockData(that.parameters)
          this.$router.push({name:"detail",params:that.params,query:that.$route.query})
        }
        window.location.reload()
      },
      //获取交易信息
      getTxnData(id){
        let that = this;
        let reg = /^[0-9]+.?[0-9]*$/;
        let channelid = "";
        if(that.$route.query.channelId == undefined){
          channelid = ""
        }else {
          channelid = that.$route.query.channelId
        }
        if(reg.test(id)){
          var data = {
            coinType:'btc',
            id:id,
            channelId:channelid
          }
        }else {
          var data = {
            coinType:'btc',
            hash:id,
            channelId:channelid
          }
        }
        that.ajax.interceptors.response.use(function (response) {
          return response;
        }, function (err) {
          if (err && err.response) {
            that.$router.push({name:"noserver"})
            // window.location.replace( "https://test.blockdigg.com/noServers")
          }else{
            err.message = '连接服务器失败!'
          }
        });
        that.ajax({
          methods:"get",
          url:that.Config.pathUrl+"/api/txn",
          params:data
        }).then(function (res) {
          //console.log(res);
          if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
            that.finalData = res.data.data;
            console.log(that.finalData);
            that.loadingH = false;
            that.$nextTick(() => {
              that.hackReset = true
            })
            // document.title=res.data.data.coinType+ " " +vm.$t('text.titleTxn') + " "+res.data.data.hash+"-"+vm.$t('text.blockTitle');
            that.Cookies.set('preCoinType',data.coinType)
            that.Cookies.set('preDataType',that.params.dataType)
            that.Cookies.set('preKey',that.params.key)
          }
          if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
            that.Cookies.set('searchWord',that.params.key);
            // that.$router.push({name:"noSearch",params:{key:that.params.key}})
          }
        })
      },
      //点击详情页面中的交易哈希
      btcBlockTxnChange(value){
        const that = this;
        that.getFinalData('txn',value);
        // this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:that.$route.query})
        // window.location.reload();
      },
      //点击详情页面中的地址哈希
      btcTxnAddressChange(value){
        const that = this;
        that.getFinalData('address',value);
        // this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'address',key:value},query:that.$route.query})
        // window.location.reload();
      },
      //获取地址信息
      getAddressData(id,page){
        let that = this;
        let reg = /^[0-9]+.?[0-9]*$/;
        let channelid = "";
        if(that.$route.query.channelId == undefined){
          channelid = ""
        }else {
          channelid = that.$route.query.channelId
        }
        if(reg.test(id)){
          var data = {
            coinType:'btc',
            id:id,
            pageSize:20,
            pageNumber:page,
            channelId:channelid
          }
        }else {
          var data = {
            coinType:'btc',
            hash:id,
            pageSize:20,
            pageNumber:page,
            channelId:channelid
          }
        }
        that.ajax.interceptors.response.use(function (response) {
          return response;
        }, function (err) {
          if (err && err.response) {
            that.$router.push({name:"noserver"})
            //window.location.replace( "https://test.blockdigg.com/noServers")
          }else{
            err.message = '连接服务器失败!'
          }
        });
        that.ajax({
          methods:"get",
          url:that.Config.pathUrl+"/api/address",
          params:data
        }).then(function (res) {
          if(res.data.code == "0000" && res.data.data != null && res.data.data.length !=0){
            that.finalData = res.data.data;
            that.loadingH = false;
            console.log(that.finalData);
            that.$nextTick(() => {
              that.hackReset = true
            })
            that.Cookies.set('preCoinType',data.coinType)
            that.Cookies.set('preDataType',that.params.dataType)
            that.Cookies.set('preKey',that.params.key)
            window.scrollTo(0,0)
          }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
            console.log("1111")
            that.Cookies.set('searchWord',that.params.key);
            // that.$router.push({name:"noSearch",params:{key:that.params.key}})
          }
        }).catch(err =>{
          that.$message.error(err.error)
          //console.log(err);

        })
      },
      //点击地址详情页的分页
      btcAddressPageChange(pageNum){
        const that = this;
        that.loadingH = true;
        that.getAddressData(that.finalData.hash,pageNum)
      },
      //点击前一交易后一交易
      btcTxnBeforeOrNextClick(value){
        const that = this;
        that.getFinalData('txn',value);
        // this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:that.$route.query})
        // window.location.reload();
      },
      //首页隐藏
      headerHide(){
        let that = this;
      }
    },
    mounted(){
      let that = this;
      window.onpopstate = () =>{
        window.location.reload()
      }
      if($(window).height() > 500){
        that.minHeight = $(window).height() - 101
      }else {
        that.minHeight = 500;
      }
      window.onresize = () => {
        return (() => {
          if($(window).height() > 500){
            that.minHeight = $(window).height() - 101
          }else {
            that.minHeight = 500;
          }
        })()
      };
      that.Cookies.set("zf_channelId",JSON.stringify(that.$route.query));
      that.getFinalData('address',that.Cookies.get('key'));
      that.Cookies.set('pageNow','detail');
      //mounted end
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #191a1d;

  }
  .detail{
    width: 100%;
  }
</style>
