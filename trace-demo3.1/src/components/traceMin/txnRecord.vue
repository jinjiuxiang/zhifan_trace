<template>
    <div class="traceMin" v-loading="loading2"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" @click="closeAll">
      <!---->
      <div class="trFrist">
        <span>交易记录</span>
        <div class="close" @click="txnH">
          <img src="./../../assets/X.png" alt="">
        </div>
        <div class="close2" @click="allSee" v-show="allSeeShow">
          <img src="./../../assets/big.png" alt="">
        </div>
        <div class="close2" @click="noAllSee" v-show="!allSeeShow">
          <img src="./../../assets/small.png" alt="">
        </div>
      </div>
      <!---->
      <div class="trBody">
         <div class="trHead" style="box-sizing: border-box;padding-left: 40px">
            <div>时间</div>
            <div>转入钱包</div>
            <div>交易额（BTC）</div>
            <div>转出钱包</div>
            <div v-show="rec">交易后余额（BTC）</div>
            <div>
              <div>交易费（BTC）</div>
              <div></div>
            </div>
         </div>
        <!---->
        <div class="trBodyMin" @scroll="scroll2">
          <div class="dfBox">
            <div class="trMin" style="box-sizing: border-box;padding-left: 40px" v-for="(site,index) in recordData">
              <div class="moc">{{site.time | timeFilter}}</div>
              <div class="moc" v-if="site.walletInputVo != null">
                <p style="display: flex;flex-direction: column;width: 100%;">
                <span style="display: flex;align-items: center"><span :class="lightNode(site.walletInputVo.fromWallet)">[{{site.walletInputVo.fromWallet}}]</span><span v-show="site.walletInputVo.tag != null">[{{site.walletInputVo.tag}}]</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-tooltip placement="left" :manual="true" :value="disabled11 == index+1">
                    <div class="ht" slot="content" style="width:100%;height: 116px;overflow-y: auto;display: flex;flex-direction: column;min-width: 600px;box-sizing: border-box;padding: 0 30px">
                      <!--<span style="color:red">123123123123123</span>-->
                      <span class="hdFs" v-for="site in inputData">{{site.hash}}&nbsp;&nbsp;&nbsp;&nbsp;[{{site.walletId}}]&nbsp;&nbsp;&nbsp;&nbsp;{{site.btcValue}}</span>
                    </div>
                    <div class="mc" @mouseover="mouIn" @mouseout="mouOut" @click.stop @click="lClick($event,site.walletInputVo.fromWallet,site.txn,index)"></div>
                  </el-tooltip>
                </span>

                  <!--<span v-show="site.walletInputVo.tag != null">[{{site.walletInputVo.tag}}]</span>-->
                  <!--&lt;!&ndash;<span style="display: flex;align-items: center">[{{site.walletInputVo.fromWallet}}]&nbsp;&nbsp;&nbsp;&nbsp;<div class="mc" @mouseover="mouIn" @mouseout="mouOut" @click.stop @click="lClick($event,site.walletInputVo.fromWallet,site.txn)"></div></span>&ndash;&gt;-->
                </p>
              </div>
              <div class="moc" v-show="site.walletInputVo == null">
                coinbase
              </div>
              <div class="moc">
                <p style="display: flex;flex-direction: column;width: auto">
                  <span v-for="site2 in site.walletOutputVos">{{site2.btcValue}}</span>

                </p>
              </div>
              <div class="moc">
                <p style="width: 100%">
                <span style="display: flex;align-items: center" v-for="(site2,index2) in site.walletOutputVos"><span :class="lightNode(site2.toWallet)">[{{site2.toWallet}}]</span>&nbsp;&nbsp;<span v-show="site2.tag != null">[{{site2.tag}}]</span>
                  &nbsp;&nbsp;
                  <el-tooltip placement="left" :manual="true" :value="disabled2 == index2+1 && disabled22 == index+1" style="display: flex;width: 20px !important;">
                    <div class="ht" slot="content" style="height: 116px;overflow-y: auto;display: flex;flex-direction: column;min-width: 600px;align-items: flex-end;box-sizing: border-box;padding: 0 30px;">
                      <span class="hdFs" v-for="site in outputData">{{site.hash}}&nbsp;&nbsp;&nbsp;&nbsp;[{{site.walletId}}]&nbsp;&nbsp;&nbsp;&nbsp;{{site.btcValue}}</span>
                    </div>
                      <div style="width: 18px !important;border: none" class="mc" @mouseover="mouIn" @mouseout="mouOut" @click.stop @click="lClick2($event,site2.toWallet,site.txn,index2,index)"></div>
                  </el-tooltip>
                </span>

                </p>
              </div>
              <div class="moc" v-show="rec">{{site.btcBalance}}</div>
              <div class="moc">
                <span class="">{{site.btcFee}}</span>
                <span class="detail" @click="detailClick(site.txnHash)">查看详情</span>
              </div>
            </div>
          </div>
        </div>
        <!---->
        <!--<div class="hide" v-show="hShow" @click.stop>-->
          <!--<div class="triangle_border_left">-->
            <!--<span></span>-->
          <!--</div>-->
          <!--<div class="ff"  v-loading="loading6"element-loading-text="数据加载中"-->
               <!--element-loading-spinner="el-icon-loading"-->
               <!--element-loading-background="rgba(0, 0, 0, 0.8)">-->
            <!--<span v-for="site in inputData">{{site.hash}} &nbsp;&nbsp;&nbsp;&nbsp;[{{site.walletId}}] &nbsp;&nbsp;&nbsp;&nbsp;{{site.btcValue}}</span>-->

          <!--</div>-->
        <!--</div>-->
        <!--<div class="hide2" v-show="hShow2" @click.stop>-->
          <!--<div class="triangle_border_right">-->
            <!--<span></span>-->

          <!--</div>-->
          <!--<div class="ff2" dir="rtl" v-loading="loading7"element-loading-text="数据加载中"-->
               <!--element-loading-spinner="el-icon-loading"-->
               <!--element-loading-background="rgba(0, 0, 0, 0.8)">-->
            <!--<span v-for="site in outputData">{{site.btcValue}} &nbsp;&nbsp;&nbsp;&nbsp;[{{site.walletId}}] &nbsp;&nbsp;&nbsp;&nbsp;{{site.hash}} </span>-->

          <!--</div>-->
        <!--</div>-->
      </div>
      <!---->
    </div>
</template>

<script>
    export default {
      name: "txnRecord",
      data(){
        return {
          hShow:false,
          hShow2:false,
          loading2:false,
          recordData:{},
          inputData:[],
          outputData:[],
          loading6:false,
          loading7:false,
          rec:true,
          minHeight:0,
          disabled1:0,
          disabled11:0,
          disabled2:0,
          disabled22:0,
          specNode1:'',
          specNode2:'',
          bodyScroll:0,
          scrollNum:0,
          maxPageNum:0,
          id:0,
          bodyHeight:0,
          allSeeShow:true
        }
      },
      methods:{
        mouIn($event){
          $($event.currentTarget).attr('src','./../../../static/img/2.png')
        },
        mouOut($event){
          $($event.currentTarget).attr('src','./../../../static/img/1.png')
        },
        lClick($event,walletId,txn,index,e){
          e = e || window.event;
          let that = this;
          that.hShow = true;
          that.hShow2 = false;
          // let x=e.clientX?e.clientX:e.layerX;
          // let y=e.clientY?e.clientY:e.layerY;
          // console.log(e.clientX);
          // console.log(e.clientY);
          // that.disabled2 = 0;
          // that.disabled22 = 0;
          $('.mc').removeClass("umm")
          $($event.currentTarget).addClass("umm")
          $($event.currentTarget).parent().siblings().find('.mc').removeClass("umm")
          // $('.hide').css({left:x+10 +'px',top:y-60 +'px'})
          that.loading6 = true;
          that.inputClick(walletId,txn,index)
        },
        lClick2($event,walletId,txn,index2,index,e){
          let that = this;
          that.hShow2 = true;
          that.hShow = false;
          that.loading7 = true;
          that.disabled11 = 0;
          that.disabled2 = index2+1;
          that.disabled22 = index+1;
          e = e || window.event;
          // let x=e.clientX?e.clientX:e.layerX;
          // let y=e.clientY?e.clientY:e.layerY;
          $('.mc').removeClass("umm")
          $($event.currentTarget).addClass("umm")
          $($event.currentTarget).parent().siblings().find('.mc').removeClass("umm")
          // console.log($($event.currentTarget)[0].offsetLeft+60);
          // $('.hide2').css({left:x+10-690 +'px',top:y-60 +'px'})
          that.outputClick(walletId,txn)

        },
        scroll2(){
          let that = this;
          that.hShow2 = false;
          that.hShow = false;
          that.disabled2 = 0;
          that.disabled22 = 0;
          that.disabled11 = 0;
          // console.log($('.trBodyMin').scrollTop());;
          that.bodyScroll = $('.trBodyMin').scrollTop();
          // console.log($('.dfBox').height());
          that.bodyHeight = $('.dfBox').height();
          console.log($('.dfBox').height() - that.bodyScroll);
          if($('.dfBox').height() - that.bodyScroll == 200 ){
            that.loading2 = true;
            that.scrollNum++;
            if(that.scrollNum >= that.maxPageNum){
              that.loading2 = false;

              return false;
            }else {
              that.recordClick2(that.id)
            }
            console.log(that.scrollNum)
          }else if(that.bodyScroll == 0) {
            if(that.scrollNum == 0){
              //that.scrollNum =0;
            }else {
              that.scrollNum--;
              that.recordClick2(that.id)
              $('.trBodyMin').scrollTop(20);
              console.log(that.scrollNum)
            }
            // if(that.bodyScroll > that.maxPageNum){
            // }
          }
          $('.mc').removeClass("umm")
        },
        txnH(){
          this.$emit('txnH')
        },
        getClick(){
          this.loading2 = true;
        },
        recordClick(id){
          console.log(id);
          //钱包详情
            let that = this;
          that.id = id;
          that.scrollNum = 0;
          console.log(that.specNode1);
          console.log(that.specNode2);
            that.loading2 = true;
          that.allSeeShow = true;
          $('.traceMin').css('top','');
          $('.trBodyMin').css('min-height','200px')
            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:"get",
              url:that.Config.baseUrl +'/record',
              params:{
                walletId:parseInt(id),
                index:that.scrollNum,
                checkpoint:that.Cookies.get('checkpoint')
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                that.specNode1 = that.Cookies.get('specNode1')
                that.specNode2 = that.Cookies.get('specNode2')
                that.recordData = res.data.data.list;
                that.maxPageNum = res.data.data.maxPage;
                console.log(that.recordData);
                that.$nextTick(() => {
                  that.loading2 = false;
                })
              }
            })
        },
        recordClick2(id){
          console.log(id);
          //钱包详情
            let that = this;
          console.log(that.specNode1);
          console.log(that.specNode2);
          that.allSeeShow = true;
          $('.traceMin').css('top','');
          $('.trBodyMin').css('min-height','200px')
            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:"get",
              url:that.Config.baseUrl +'/record',
              params:{
                walletId:parseInt(id),
                index:that.scrollNum,
                checkpoint:that.Cookies.get('checkpoint')
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                that.specNode1 = that.Cookies.get('specNode1')
                that.specNode2 = that.Cookies.get('specNode2')
                that.recordData = res.data.data.list;
                //that.recordData.splice(that.recordData, 0, res.data.data.list);
                console.log(that.recordData);
                that.maxPageNum = res.data.data.maxPage;
                console.log(that.recordData);
                that.$nextTick(() => {
                  that.loading2 = false;
                  $('.trBodyMin').scrollTop($('.dfBox').height()/2);

                })
              }
            })
        },
        //点击线
        linkClick(str){
          console.log(str);
          //钱包详情
            let that = this;
          $('.traceMin').css('top','');
          $('.trBodyMin').css('min-height','200px')
          that.specNode1 = that.Cookies.get('specNode1')
          that.specNode2 = that.Cookies.get('specNode2')
            that.loading2 = true;
            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:"get",
              url:that.Config.baseUrl +'/view',
              params:{
                ids:str,
                checkpoint:that.Cookies.get('checkpoint')
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                that.recordData = res.data.data;
                console.log(that.recordData);
                that.$nextTick(() => {
                  that.loading2 = false;
                })
              }
            })
        },
        //查看详情
        detailClick(hash){
          window.open('https://info.chaindigg.com/btc/txn/'+hash)
        },
        //查看输入详情
        inputClick(walletId,txnId,index){
          let that = this;
          that.disabled2 = 0;
          that.disabled22 = 0;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            methods:'get',
            url:that.Config.baseUrl + '/detail',
            params:{
              walletId:walletId,
              txnId:txnId,
              inputFlag:true,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code== "0000"){
              that.inputData = res.data.data;
              that.loading6 = false;
              that.$nextTick(()=>{
                that.disabled11 = index+1;
              })
            }
          })
        },
        outputClick(walletId,txnId){
          let that = this;
          that.disabled11 = 0;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            methods:'get',
            url:that.Config.baseUrl + '/detail',
            params:{
              walletId:walletId,
              txnId:txnId,
              inputFlag:false,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code== "0000"){
              that.outputData = res.data.data;
              that.loading7 = false;

            }
          })
        },
        //关闭
        closeAll(){
          let that = this;
          that.hShow = false;
          that.hShow2 = false;
          that.disabled2 = 0;
          that.disabled22 = 0;
          that.disabled11 = 0;
        },
        //
        tLine(){
          this.rec = false;
        },
        tNode(){
          this.rec = true;
        },
        //钱包高亮
        lightNode(val){
          let that = this;

          if(val ==that.specNode1 || val ==that.specNode2){
            return 'spec'
          }
        },
        //全屏
        allSee(){
          let that = this;
          that.allSeeShow = !that.allSeeShow;
          $('.traceMin').css('top','110px');
          $('.trBodyMin').css('min-height',that.minHeight-200+'px');
        },
        noAllSee(){
          let that = this;
          that.allSeeShow = !that.allSeeShow;
          $('.traceMin').css('top','');
          $('.trBodyMin').css('min-height','200px')

        }
      },
      filters:{
        timeFilter(value){
          var date = new Date(value);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
      },
      mounted(){
        let that = this;
        that.minHeight = $(window).height() - 101
        window.onresize = () => {
          return (() => {
            that.minHeight = $(window).height() - 101
          })()
        };
        that.specNode1 = that.Cookies.get('specNode1')
        that.specNode2 = that.Cookies.get('specNode2')
        console.log(that.specNode1);
        console.log(that.specNode2);
      },
      //监听
      watch:{
        bodyScroll(val,oldVal){
          // console.log(val,oldVal)
        }
      }
    }
</script>

<style scoped>
  .traceMin{
    width: 100%;
    min-height: 320px;
    position: fixed;
    background: #131518;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    box-sizing: border-box;
  }
  .trFrist{
    width: 100%;
    height: 40px;
    border: 1px solid #24262C;
    box-sizing: border-box;
    padding: 0 40px;
    display: flex;
    position: relative;
  }
  .close{
    width: 48px;
    height: 48px;
    background: #131518;
    position: absolute;
    top:-48px;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .close2{
    width: 48px;
    height: 48px;
    background: #131518;
    position: absolute;
    top:-48px;
    right: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .trFrist span{
    padding: 0 8px;
    height: 40px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #00A0E9;
    border-bottom: 1px solid #00A0E9;
    border-top: 1px solid #131518;
    display: flex;
    box-sizing: border-box;
    align-items: center;
  }
  /**/
  .trBody{
    width: 100%;
    box-sizing: border-box;
    padding: 24px 40px;
  }
  .trHead{
    width: 100%;
    height: 40px;
    background: #24262C;
    display: flex;
  }
  .trHead div{
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
  }
  /**/
  .trBodyMin{
    width: 100%;
  }
  .trMin{
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
  }
  .moc{
    flex: 1;
    box-sizing: border-box;
    padding: 10px 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .trMin div:last-child{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .trMin div:last-child span{
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .detail{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A90E2;
    text-decoration: underline;
    cursor: pointer;
  }
  .trBodyMin{
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  body{
    scrollbar-highlight-color:#f4ae21;
  }
  .hide{
    min-width: 660px;
    height: 116px;
    background: none;
    position: fixed;
    overflow: auto;
    box-sizing: border-box;
  }
  .ff{
    width: 630px;
    height: 116px;
    overflow: auto;
    margin-left: 30px;
    background: #24262C;
    box-sizing: border-box;
    padding: 0 21px;

  }
  .ff2{
    width: 630px;
    height: 116px;
    overflow: auto;
    margin-right: 30px;
    background: #24262C;
    box-sizing: border-box;
    padding: 0 21px;

  }
  .hide span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 16px;
    display: block;
  }
  .hide2 span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 16px;
    display: block;
  }
  .hide2{
    min-width: 660px;
    height: 116px;
    background: none;
    position: fixed;
    overflow: auto;
    box-sizing: border-box;
  }
  .triangle_border_left{
    /*width:0;*/
    /*height:0;*/
    /*border-width:30px 30px 30px 0;*/
    /*border-style:solid;*/
    /*border-color:transparent #333 transparent transparent;!*透明 灰 透明 透明 *!*/
    /*margin:40px auto;*/
    /*position:relative;*/
  }
  .triangle_border_left span{
    display:block;
    width:0;
    height:0;
    border-width:16px 30px 16px 0;
    border-style:solid;
    border-color:transparent #24262C transparent transparent;/*透明 黄 透明 透明 */
    position:absolute;
    top:30px;
    left:0px;
    z-index: 9;
  }
  .triangle_border_right{
    /*width:0;*/
    /*height:0;*/
    /*border-width:30px 0 30px 30px;*/
    /*border-style:solid;*/
    /*border-color:transparent transparent transparent #333;!*透明 透明 透明 灰*!*/
    /*margin:40px auto;*/
    /*position:relative;*/
  }
  .triangle_border_right span{
    display:block;
    width:0;
    height:0;
    border-width:16px 0 16px 30px;
    border-style:solid;
    border-color:transparent transparent transparent #24262C;/*透明 透明 透明 黄*/
    position:absolute;
    top:28px;
    right:0px;
  }
  .mc{
    cursor: pointer;
    width: 18px !important;
    height: 12px !important;
    display: inline-block !important;
    background-image: url("./../../assets/1.png");
    background-repeat: no-repeat;
    background-position: center;
    /*background: red;*/
  }
  .mc:hover{
    background-image: url("./../../assets/2.png");
  }
  .umm{
    background-image: url("./../../assets/2.png");
  }
  .hdFs{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 16px;
  }
  .spec{
    color: #FFB700 !important;
  }
  .trBodyMin::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 200px;
  }
  .trBodyMin::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    height: 120px;
    background: rgba(255,255,255,0.2);
  }
  .trBodyMin::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #131518;
  }
  .ht::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 136px;
  }
  .ht::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    height: 80px;
    background: #24262C;
  }
  .ht::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    border-radius: 0;
    background: #303133;
  }
</style>
