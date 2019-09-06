<template>
  <div class="photo">
    <div class="first">
      <span class="addr">地址：{{key}}<span style="margin-left: 32px;color: #00A0E9;font-family: PingFangSC-Regular;font-size: 16px">所属钱包：[{{addrData.walletId}}]</span>&nbsp;<span style="font-size: 16px;font-family: PingFangSC-Regular">（共{{addrData.walletSize}}个地址）</span></span>
      <span class="newTime">数据更新时间：{{addrData.dataExpiration}}</span>
    </div>
    <div class="ltc">
      <div class="fBtn">
        <span class="sel" @click="addrChange($event,0)">地址画像</span>
        <span @click="addrChange($event,1)" v-show="!utShow">钱包画像</span>
        <el-tooltip class="item" effect="dark" content="该地址暂不提供钱包画像" placement="right">
          <span v-show="utShow" style="cursor: not-allowed;">钱包画像</span>
        </el-tooltip>
      </div>
    </div>
    <!---->
    <div style="display: flex; width: 100%;box-sizing: border-box;padding: 0 40px 0 30px;margin-top: 1.5rem;">
      <div class="ut" v-show="num == 0"  style="margin-right: 40px;display: flex;flex-direction: column">
        <p class="newD11">
          <span class="newLabel">余额</span>
          <span class="newText balance">{{addrData.addressBalance}}BTC</span>
        </p>
        <p class="newD12">
          <span class="newLabel">总转入次数</span>
          <span class="newText">{{addrData.addressIncomingTxNum}}次</span>
        </p>
        <p class="newD13">
          <span class="newLabel">总转出次数</span>
          <span class="newText">{{addrData.addressOutputTxNum}}次</span>
        </p>
        <p class="newD14">
          <span class="newLabel">常用登录地点</span>
          <span class="newText">-</span>
        </p>
      </div>
      <div class="ut" v-show="num == 0" style="margin-right: 40px;display: flex;flex-direction: column">
        <p class="newD15">
          <span class="newLabel"><span>最新交易</span> <span class="val">{{addrData.addressLatestTxTime}}</span>
</span>
          <span class="newText" :class="colorChange(addrData.addressLatestTxValue)">{{addrData.addressLatestTxValue | valStr}}BTC</span>
        </p>
        <p class="newD16">
          <span class="newLabel">总转入额度</span>
          <span class="newText add">{{addrData.addressTotalInValue}}BTC</span>
        </p>
        <p class="newD17">
          <span class="newLabel">总转出额度</span>
          <span class="newText reduce">{{addrData.addressTotalOutValue}}BTC</span>
        </p>
        <p class="newD18">
          <span class="newLabel">常用IP</span>
          <span class="newText">-</span>
        </p>
      </div>
      <div class="ut" v-show="num == 1" style="margin-right: 40px;display: flex;flex-direction: column">
        <p class="newD11">
          <span class="newLabel">余额</span>
          <span class="newText balance">{{wallData.walletBalance}}BTC</span>
        </p>
        <p class="newD12">
          <span class="newLabel">总转入次数</span>
          <span class="newText">{{wallData.walletIncomingTxNum}}次</span>
        </p>
        <p class="newD13">
          <span class="newLabel">总转出次数</span>
          <span class="newText">{{wallData.walletOutputTxNum}}次</span>
        </p>
        <p class="newD14">
          <span class="newLabel">常用登录地点</span>
          <span class="newText">-</span>
        </p>
      </div>
      <div class="ut" v-show="num == 1" style="margin-right: 40px;display: flex;flex-direction: column">
        <p class="newD15">
          <span class="newLabel"><span>最新交易</span> <span class="val">{{wallData.walletLatestTxTime}}</span>
</span>
          <span class="newText" :class="colorChange(wallData.walletLatestTxValue)">{{wallData.walletLatestTxValue | valStr}}BTC</span>
        </p>
        <p class="newD16">
          <span class="newLabel">总转入额度</span>
          <span class="newText add">{{wallData.walletTotalInValue}}BTC</span>
        </p>
        <p class="newD17">
          <span class="newLabel">总转出额度</span>
          <span class="newText reduce">{{wallData.walletTotalOutValue}}BTC</span>
        </p>
        <p class="newD18">
          <span class="newLabel">常用IP</span>
          <span class="newText">-</span>
        </p>
      </div>
      <div style="margin-right: 40px" v-loading="loadingM2"
           element-loading-text="数据加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <div id="pie1" style="height: 431px;margin-top: 21px;background: #24262C;box-sizing: border-box;padding: 12px"></div>
      </div>
      <div style="" v-loading="loadingM2"
           element-loading-text="数据加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <div id="pie2" style="height: 431px;margin-top: 21px;background: #24262C;box-sizing: border-box;padding: 12px"></div>

      </div>
    </div>
    <div style="box-sizing: border-box;height: 486px;margin-top: 40px;display: flex;justify-content: center;box-sizing: border-box;padding:28px;background: #24262C;margin:40px 28px" v-loading="loadingM"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div id="mainBot" style="height: 430px;"></div>
    </div>
    <div style="width: 100%;display: flex;box-sizing: border-box;justify-content: space-between;padding: 0 28px" >
        <div style="width: 100%;display: flex;box-sizing: border-box;justify-content: space-between;"  v-loading="loadingM1"
             element-loading-text="数据加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
          <div id="mainBot2" style="height: 456px;background: #24262C;padding: 28px;box-sizing:border-box;"></div>
          <div id="mainBot22" style="height: 456px;background: #24262C;padding: 28px;box-sizing:border-box;"></div>
        </div>
    </div>
    <div style="margin-top: 40px;box-sizing: border-box;padding: 0 28px">
      <div style="width: 100%" v-loading="loadingM1"
           element-loading-text="数据加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <div style="width: 100%;display: flex;box-sizing: border-box;justify-content: space-between;background: #24262C;">
          <div id="mainBot23" style="height: 400px;padding: 28px 28px 0 28px;box-sizing:border-box;"></div>
          <div id="mainBot24" style="height: 400px;padding: 28px 28px 0 28px;box-sizing:border-box;"></div>
        </div>
        <div style="width: 100%;display: flex;box-sizing: border-box;justify-content: space-between;background: #24262C;margin-bottom: 40px;padding-bottom: 28px">
          <div id="mainBot25" style="height: 400px;padding: 0 28px 0 28px;box-sizing:border-box;"></div>
          <div id="mainBot26" style="height: 400px;padding: 0 28px 0 28px;box-sizing:border-box;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "photo2",
      data(){
        return {
          num:0,
          addrData:{},
          wallData:{},
          addrChart:{},
          wallChart:{},
          key:"",
          myChart2:null,
          myChart21:null,
          myChart22:null,
          myChart23:null,
          myChart24:null,
          myChart25:null,
          myChart26:null,
          myChartPie1:null,
          myChartPie2:null,
          chartAll:{},
          chartAll2:{},
          chartAll3:{},
          chartAll4:{},
          utShow:false,

          loadingM:true,
          loadingM1:true,
          loadingM2:true,
        }
      },
      methods:{
        drawMain2(xData,yData1,yData2){
          let that = this;
          // var option = {
          //   xAxis: {
          //     type: 'category',
          //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          //   },
          //   yAxis: {
          //     type: 'value'
          //   },
          //   series: [{
          //     data: [820, 932, 901, 934, 1290, 1330, 1320],
          //     type: 'line',
          //     smooth: true
          //   }]
          // };

          var option = {
            tooltip: {
              trigger: 'axis',
            },
            title: {
              text: '余额变化',
              textStyle:{
                color:'#fff'
              }
            },
            grid: {
              left: '2%',
              right: '3%',
              bottom: '60',
              containLabel: true
            },
            // dataZoom:{
            //   type:'slider',
            //   start:0,
            //   end:100
            // },
            toolbox: {
              // feature: {
              //   saveAsImage: {}
              // }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xData,
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  opacity:0.4,
                  type:'solid'
                },
              }
            },
            yAxis: [
              {
                splitLine:{
                  show: true,
                  lineStyle:{
                    opacity:0.1,
                    type:'dashed'
                  }
                },
                type: 'value',
                name:'',
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                  },
                  show:false
                },
              },
              {
                splitLine:{show: false},
                type: 'value',
                name:'人民币余额',
                position: 'right',
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                },
                show:false,

              }
            ],
            series: [
              {
                name:'BTC余额',
                type:'line',
                //stack: '总量',
                yAxisIndex:0,
                smooth:true,

                data:yData1,
                lineStyle:{
                  color:'#3657FF',
                  width:2
                },
                itemStyle : {
                  normal : {
                    color:'#3657FF',
                  },
                },
                areaStyle: {
                  normal: {
                    color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#3657FF'
                    }, {
                      offset: 1,
                      color: 'rgb(36, 38, 44)'
                    }])
                  }
                },
              },
              {
                name:'人民币余额',
                type:'line',
                //stack: '总量',
                yAxisIndex:1,
                smooth:true,
                data:yData2,
                // areaStyle: {
                //   normal: {
                //     color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //       offset: 0,
                //       color: '#3688F3'
                //     }, {
                //       offset: 1,
                //       color: 'rgb(36, 38, 44)'
                //     }])
                //   }
                // },
                itemStyle : {
                  normal : {
                    color:'#3688F3',
                    borderWidth:0
                  },
                  opacity:0,
                  emphasis: {color: 'rgba(54,134,241,0) '}
                },
                lineStyle:{
                  color:'#3688F3',
                  width:0
                },
                showSymbol:false,
                label:{
                  show:false
                },
                emphasis:{
                  label:{
                    show:false
                  }
                },
                hoverAnimation:false
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          that.loadingM = false;
          that.myChart2.setOption(option);
        },
        drawMain21(xData,yData1,yData2){
          let that = this;
          let option = {
            title: {
              text: '交易次数',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转入次数','转出次数'],
              textStyle:{
                color:'#fff'
              },
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '40',
              containLabel: true
            },
            toolbox: {
              feature: {
                // saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data:xData,
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  opacity:0.4,
                  type:'solid'
                },
              }
            },
            yAxis: {
              type: 'value',
              splitLine:{
                show: true,
                lineStyle:{
                  opacity:0.1,
                  type:'dashed'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'#fff',
                },
                show:false
              },
            },
            series: [
              {
                name:'转入次数',
                type:'line',
                stack: '总量',
                data:yData1,
                lineStyle:{
                  color:"#3657FF"
                },
                itemStyle : {
                  normal : {
                    color:'#3657FF',
                  },
                },
              },
              {
                name:'转出次数',
                type:'line',
                stack: '总量2',
                data:yData2,
                lineStyle:{
                  color:"#12E2B2"
                },
                itemStyle : {
                  normal : {
                    color:'#12E2B2',
                  },
                },
              }
            ]
          };


          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;
          that.myChart21.setOption(option);
        },
        drawMain22(xData,yData1,yData2){
          let that = this;
          let option = {
            title: {
              text: '交易额度',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转入额度','转出额度'],
              textStyle:{
                color:'#fff'
              },
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '40',
              containLabel: true
            },
            toolbox: {
              feature: {
                // saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data:xData,
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  opacity:0.4,
                  type:'solid'
                },
              }
            },
            yAxis: {
              type: 'value',
              splitLine:{
                show: true,
                lineStyle:{
                  opacity:0.1,
                  type:'dashed'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'#fff',
                },
                show:false
              },
            },
            series: [
              {
                name:'转入额度',
                type:'line',
                stack: '总量',
                data:yData1,
                lineStyle:{
                  color:"#3657FF",
                  width:2
                },
                itemStyle : {
                  normal : {
                    color:'#3657FF',
                  },
                },
              },
              {
                name:'转出额度',
                type:'line',
                stack: '总量2',
                data:yData2,
                lineStyle:{
                  color:"#12E2B2",
                  width:2
                },
                itemStyle : {
                  normal : {
                    color:'#12E2B2',
                  },
                },
              }
            ]
          };


          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;
          that.myChart22.setOption(option);
        },
        drawMain23(xData,yData1,yData2){
          let that = this;
          let option = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转入次数'],
              textStyle:{
                color:'#fff'
              },
            },
            title: {
              text: '交易活跃区间',
              textStyle:{
                color:'#fff'
              }
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '60',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : xData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                    opacity:0.4,
                    type:'solid'
                  },
                }
              }
            ],
            yAxis : [
              {
                type: 'value',
                splitLine:{
                  show: true,
                  lineStyle:{
                    opacity:0.1,
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                  },
                  show:false
                },
              }
            ],
            series : [
              {
                name:'转入次数',
                type:'bar',
                barWidth: '60%',
                data:yData1,
                itemStyle:{
                  color:"#4C66EF"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;

          that.myChart23.setOption(option);
        },
        drawMain24(xData,yData1,yData2){
          let that = this;
          let option = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            title: {
              text: '',
              textStyle:{
                color:'#fff'
              }
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转入次数'],
              textStyle:{
                color:'#fff'
              },
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '40',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : xData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                    opacity:0.4,
                    type:'solid'
                  },
                },
                axisLabel:{
                  rotate:60,
                },
              }
            ],
            yAxis : [
              {
                type: 'value',
                splitLine:{
                  show: true,
                  lineStyle:{
                    opacity:0.1,
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                  },
                  show:false
                },

              }
            ],
            series : [
              {
                name:'转入次数',
                type:'bar',
                barWidth: '60%',
                data:yData1,
                itemStyle:{
                  color:"#4C66EF"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;

          that.myChart24.setOption(option);
        },
        drawMain25(xData,yData1,yData2){
          let that = this;
          let option = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            title: {
              text: '',
              textStyle:{
                color:'#fff'
              }
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转出次数'],
              textStyle:{
                color:'#fff'
              },
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '60',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : xData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                    opacity:0.4,
                    type:'solid'
                  },
                }
              }
            ],
            yAxis : [
              {
                type: 'value',
                splitLine:{
                  show: true,
                  lineStyle:{
                    opacity:0.1,
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                  },
                  show:false
                },
              }
            ],
            series : [
              {
                name:'转出次数',
                type:'bar',
                barWidth: '60%',
                data:yData1,
                itemStyle:{
                  color:"#12CFA8"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;

          that.myChart25.setOption(option);
        },
        drawMain26(xData,yData1,yData2){
          let that = this;
          let option = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            title: {
              text: '',
              textStyle:{
                color:'#fff'
              }
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:['转出次数'],
              textStyle:{
                color:'#fff'
              },
            },
            grid: {
              left: '3%',
              right: '8%',
              bottom: '40',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : xData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                    opacity:0.4,
                    type:'solid'
                  },
                },
                axisLabel:{
                  rotate:60,
                },
              }
            ],
            yAxis : [
              {
                type: 'value',
                splitLine:{
                  show: true,
                  lineStyle:{
                    opacity:0.1,
                    type:'dashed'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff',
                  },
                  show:false
                },
              }
            ],
            series : [
              {
                name:'转出次数',
                type:'bar',
                barWidth: '60%',
                data:yData1,
                itemStyle:{
                  color:"#12CFA8"
                }
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM1 = false;

          that.myChart26.setOption(option);
        },
        drawMainPie1(xData,yData1,yData2){
          let that = this;
          let option = {
            title: {
              text: '资金来源分布',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}: ({d}%)"
            },
            legend: {
              orient: 'horizontal',
              data:yData1,
              y:'bottom',
              textStyle:{
                color:'#fff'
              },
              type:"scroll",
              pageTextStyle:{
                color:"#fff"
              }
            },
            graphic:{
              type:'text',
              left:'center',
              top:'center',
              style:{
                text:'总转入次数\n\n'+yData2,
                textAlign:'center',
                fill:'#fff',
                fontSize:16,
                width:30,
                height:30
              }
            },
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:xData
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM2 = false;

          that.myChartPie1.setOption(option);
        },
        drawMainPie2(xData,yData1,yData2){
          let that = this;
          let option = {
            title: {
              text: '资金去向分布',
              textStyle:{
                color:'#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}: ({d}%)"
            },
            legend: {
              orient: 'horizontal',
              y:'bottom',
              data:yData1,
              textStyle:{
                color:'#fff'
              },
              type:"scroll",
              pageTextStyle:{
                color:"#fff"
              }
            },
            graphic:{
              type:'text',
              left:'center',
              top:'center',
              style:{
                text:'总转出次数\n\n'+yData2,
                textAlign:'center',
                fill:'#fff',
                fontSize:16,
                width:30,
                height:30
              }
            },
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:xData
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          that.loadingM2 = false;

          that.myChartPie2.setOption(option);
        },
        getSearch(key){
          let that = this;
          that.key = key;
          that.getWalData(that.key);
          that.getAddrData(that.key);
          that.getWallChart(that.key);
          that.$nextTick(()=>{
            that.getAddrChart(that.key);

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
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.wallData = res.data.data;
              that.$nextTick(()=>{
                that.getWalChartAll2(that.key)
              })
            }
          })
        },
        //地址钱包切换
        addrChange($event,num){
          let that = this;
          that.num = num;
          if(num == 0){
            console.log('dz')
            that.drawMain2(that.addrChart.x,that.addrChart.y1,that.addrChart.y2);
            that.txnNumAjax();
            that.txnNumAjax11();
            $($event.currentTarget).addClass('sel').siblings().removeClass('sel');

          }else {
            console.log('qb')
            that.drawMain2(that.wallChart.x,that.wallChart.y1,that.wallChart.y2);
            that.txnNumAjax2();
            that.txnNumAjax12();
            $($event.currentTarget).addClass('sel').siblings().removeClass('sel');

          }
        },
        //获取地址数据
        getAddrData(address){
          let that = this;
          that.myChart2 = that.$echarts.init(document.getElementById('mainBot'),'macarons');
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+"/info",
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.addrData = res.data.data;
              that.Cookies.set('dataExpiration',that.addrData.dataExpiration)
              this.$nextTick(()=>{
                that.getAddrChartAll2(that.key)
              })
            }
            console.log(that.addrData);
          })
        },
        //交易次数
        txnNumAjax(){
          let that = this;
          that.myChart21 = that.$echarts.init(document.getElementById('mainBot2'),'macarons');
          that.myChart22 = that.$echarts.init(document.getElementById('mainBot22'),'macarons');
          that.myChart23 = that.$echarts.init(document.getElementById('mainBot23'),'macarons');
          that.myChart24 = that.$echarts.init(document.getElementById('mainBot24'),'macarons');
          that.myChart25 = that.$echarts.init(document.getElementById('mainBot25'),'macarons');
          that.myChart26 = that.$echarts.init(document.getElementById('mainBot26'),'macarons');
          that.myChartPie1 = that.$echarts.init(document.getElementById('pie1'),'macarons');
          that.myChartPie2 = that.$echarts.init(document.getElementById('pie2'),'macarons');
          that.drawMain21(that.chartAll.dayTxnCount.x,that.chartAll.dayTxnCount.in,that.chartAll.dayTxnCount.out)
          that.drawMain22(that.chartAll.dayTxnValue.x,that.chartAll.dayTxnValue.in,that.chartAll.dayTxnValue.out)
          that.drawMain23(that.chartAll.weekInCount.x,that.chartAll.weekInCount.y)
          that.drawMain24(that.chartAll.hourInCount.x,that.chartAll.hourInCount.y)
          that.drawMain25(that.chartAll.weekOutCount.x,that.chartAll.weekOutCount.y)
          that.drawMain26(that.chartAll.hourOutCount.x,that.chartAll.hourOutCount.y)
        },
        txnNumAjax11(){
          let that = this;
          that.drawMainPie1(that.chartAll3.input,that.chartAll3.inputArr,that.addrData.addressIncomingTxNum);
          that.drawMainPie2(that.chartAll3.output,that.chartAll3.outputArr,that.addrData.addressOutputTxNum);
        },
        txnNumAjax12(){
          let that = this;
          that.drawMainPie1(that.chartAll4.input,that.chartAll4.inputArr,that.wallData.walletIncomingTxNum);
          that.drawMainPie2(that.chartAll4.output,that.chartAll4.outputArr,that.wallData.walletOutputTxNum);
        },
        txnNumAjax2(){
          let that = this;
          that.myChart21 = that.$echarts.init(document.getElementById('mainBot2'),'macarons');
          that.myChart22 = that.$echarts.init(document.getElementById('mainBot22'),'macarons');
          that.myChart23 = that.$echarts.init(document.getElementById('mainBot23'),'macarons');
          that.myChart24 = that.$echarts.init(document.getElementById('mainBot24'),'macarons');
          that.myChart25 = that.$echarts.init(document.getElementById('mainBot25'),'macarons');
          that.myChart26 = that.$echarts.init(document.getElementById('mainBot26'),'macarons');
          that.myChartPie1 = that.$echarts.init(document.getElementById('pie1'),'macarons');
          that.myChartPie2 = that.$echarts.init(document.getElementById('pie2'),'macarons');
          that.drawMain21(that.chartAll2.dayTxnCount.x,that.chartAll2.dayTxnCount.in,that.chartAll2.dayTxnCount.out)
          that.drawMain22(that.chartAll2.dayTxnValue.x,that.chartAll2.dayTxnValue.in,that.chartAll2.dayTxnValue.out)
          that.drawMain23(that.chartAll2.weekInCount.x,that.chartAll2.weekInCount.y)
          that.drawMain24(that.chartAll2.hourInCount.x,that.chartAll2.hourInCount.y)
          that.drawMain25(that.chartAll2.weekOutCount.x,that.chartAll2.weekOutCount.y)
          that.drawMain26(that.chartAll2.hourOutCount.x,that.chartAll2.hourOutCount.y)
        },
        //需改颜色
        colorChange(val){
          if(val>=0){
            return 'add'
          }else{
            return 'reduce'
          }
        },
        //获取地址折线图数据
        getAddrChart(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+'/balance',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.addrChart = res.data.data;
              that.$nextTick(()=>{
                that.drawMain2(resp.x,resp.y1,resp.y2)
              })
            }
          })
        },
        //获取钱包折线图数据
        getWallChart(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+'/balance',
            params:{
              walletFlag:-1,
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.wallChart = res.data.data;
              //that.drawMain3(resp.x,resp.y1,resp.y2)
            }
          })
        },
        //颜色变化
        getAddrChartAll(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl3+'/v3Manager/api/address/txn/distribution',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.chartAll = res.data.data;
              that.$nextTick(()=>{
                that.txnNumAjax()
              })
            }
          })
        },
        getWalChartAll(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl3+'/v3Manager/api/wallet/txn/distribution',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.chartAll2 = res.data.data;
              that.$nextTick(()=>{
                // that.txnNumAjax2()
              })
            }
          })
        },
      //
        getAddrChartAll2(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl3+'/v3Manager/api/address/coinflow',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.chartAll3 = res.data.data;
              if(that.chartAll3.input != null && that.chartAll3.input.length > 0){
                let arr = [];
                that.chartAll3.input.forEach(val=>{
                  arr.push(val.name)
                })
                that.chartAll3.inputArr = arr;
              }else {
                that.chartAll3.inputArr = [];
              }
              if(that.chartAll3.output != null && that.chartAll3.output.length > 0){
                let arr = [];
                that.chartAll3.output.forEach(val=>{
                  arr.push(val.name)
                })
                that.chartAll3.outputArr = arr;
              }else {
                that.chartAll3.outputArr = null;
              }
              that.$nextTick(()=>{
                that.txnNumAjax11()
              })
            }
          })
        },
        getWalChartAll2(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl3+'/v3Manager/api/wallet/coinflow',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              that.chartAll4 = res.data.data;
              if(that.chartAll4.input != null && that.chartAll4.input.length > 0){
                let arr = [];
                that.chartAll4.input.forEach(val=>{
                  arr.push(val.name)
                })
                that.chartAll4.inputArr = arr;
              }else {
                that.chartAll4.inputArr = [];
              }
              if(that.chartAll4.output != null && that.chartAll4.output.length > 0){
                let arr = [];
                that.chartAll4.output.forEach(val=>{
                  arr.push(val.name)
                })
                that.chartAll4.outputArr = arr;
              }else {
                that.chartAll4.outputArr = null;
              }
              that.$nextTick(()=>{
                // that.txnNumAjax12()
              })
            }
          })
        },
        //
        bigOrSmall(address){
          let that = this;
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method:"get",
            url:that.Config.baseUrl3+'/v3Manager/api/wallet/large',
            params:{
              address:address,
              checkpoint:that.Cookies.get('checkpoint')
            }
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              let resp = res.data.data;
              if(resp == '0'){
                that.utShow = false;
                that.getWalChartAll(that.key)
                that.getWallChart(that.key);
                that.getWalData(that.key);

              }else {
                that.utShow = true;
              }
            }
          })
        }
      },
      filters:{
        valStr(val){
          if(val >0 ){
            return '+' + val
          }else {
            return val
          }
        }
      },
      mounted(){
        let that = this;
        //if(that.Cookies.get('cl') != 0){
          //this.drawMain2()
        //pie1
        //   $("#mainBot").width(document.documentElement.clientWidth);
        //   $("#mainBot2").width(document.documentElement.clientWidth/2-50);
        //   $("#mainBot22").width(document.documentElement.clientWidth/2-50);
          // $("#mainBot23").width(document.documentElement.clientWidth/2-50);
          // $("#mainBot24").width(document.documentElement.clientWidth/2-50);
          // $("#pie1").width(document.documentElement.clientWidth/4-50);
          // $("#pie2").width(document.documentElement.clientWidth/4-50);
            let wai = $(window).width();
            if(wai < 1400){
              wai = 1400;
            }
          $("#mainBot").width(wai-60);
          $("#pie1").width((wai-772)/2);
          $("#pie2").width((wai-772)/2);
          $("#mainBot2").width(wai/2-105);
          $("#mainBot22").width(wai/2-105);
          $("#mainBot23").width(wai/2-105);
          $("#mainBot24").width(wai/2-105);
          $("#mainBot25").width(wai/2-105);
          $("#mainBot26").width(wai/2-105);
          window.addEventListener("resize", () => {
            let wai = $(window).width();
            if(wai < 1400){
              wai = 1400;
            }
            $("#mainBot").width(wai-60);
            console.log(wai);
            $("#mainBot2").width(wai/2);
            $("#mainBot22").width(wai/2);
            $("#mainBot23").width(wai/2);
            $("#mainBot24").width(wai/2);
            $("#mainBot25").width(wai/2);
            $("#mainBot26").width(wai/2);
            $("#pie1").width((wai-772)/2);
            $("#pie2").width((wai-772)/2);
            // $("#pie1").width(wai/4);
            // $("#pie2").width(wai/4);
            this.myChart2.resize();
            this.myChart21.resize();
            this.myChart22.resize();
            this.myChart23.resize();
            this.myChart24.resize();
            this.myChart25.resize();
            this.myChart26.resize();
            this.myChartPie1.resize();
            this.myChartPie2.resize();
          });
          that.key = that.Cookies.get("key");

          that.$nextTick(()=>{
            that.getAddrData(that.key);
            that.bigOrSmall(that.key)
            that.getAddrChart(that.key);
            that.getAddrChartAll(that.key)
            // that.getAddrChartAll2(that.key)
          })
        //}
      }
    }
</script>

<style scoped>
  .add{
    color: #0CF5C0 !important;
  }
  .reduce{
    color: #ED1835 !important;
  }
  .photo{
    width: 100%;
    height: 300px;
    background: #191a1d;
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
  .ltc{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    box-sizing: border-box;
    padding: 0px 40px;
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
  /**/
  .newDesc{
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px 0 30px;
    margin-top: 1.5rem;
  }
  .newDesc1{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .newDesc2{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  .newDesc1 p,.newDesc2 p{
    width: 17.5rem;
    height: 5.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 1rem 1.5rem;
    /*background: red;*/
  }
  .newD11{background: url("./../../assets/img/balance.png") no-repeat;}
  .newD12{background: url("./../../assets/img/numRec.png");}
  .newD13{background: url("./../../assets/img/numIn.png");}
  .newD14{background: url("./../../assets/img/adr.png");}
  .newD15{background: url("./../../assets/img/trace.png");}
  .newD16{background: url("./../../assets/img/down.png");}
  .newD17{background: url("./../../assets/img/out.png");}
  .newD18{background: url("./../../assets/img/ip.png");}
  .newLabel{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
  }
  .newText{
    font-family: PingFangSC-Semibold;
    font-size: 1.25rem;
    margin-top: 0.75rem;
    color: #FFFFFF;
    padding: 0;

  }
  .balance{
    color: #00A0E9;
  }
  .val{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #ffffff;
  }
  .newTime{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
  }
  .ut{
    margin-left: -8px;
  }
  .ut p{
    width: 17.5rem;
    height: 5.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 1rem 1.5rem;
    margin-top: 21px;
    /*background: red;*/
  }
</style>
