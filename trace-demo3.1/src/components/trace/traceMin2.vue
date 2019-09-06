<template>
  <div style="position: relative">

    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="chart" style="" v-loading="loading11"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">

    </div>
    <div class="btnAll">
      <div class="btn1 btnSel"  @click="allChange($event,'all')">全部</div>
      <div class="btn2" @click="allChange($event,'back')">来源</div>
      <div class="btn3" @click="allChange($event,'forward')">去向</div>
    </div>
    <!--<div class="saveChart"  @click="saveHideClick">-->
      <!--保存图谱-->
    <!--</div>-->
    <!--<div id='main_1' style="position: relative;height:15px;width: 100%;color:#A52A2A">节点关系提示区</div>-->
    <div class="saveHide" v-show="saveHide">
        <div class="saveMin">
            <span class="title">保存图谱</span>
          <span class="desc">由于区块链上的数据在不断变化，下次打开次图谱时，可能会发生变化。</span>
          <span class="label">请输入图谱名称</span>
          <input type="text" class="saveText" v-model="chartName">
          <div class="btns">
            <span class="true" @click="trueClick">确定</span>
            <span class="false" @click="falseClick">取消</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "traceMin",

      data(){
        return {
          finalData:{},
          backwardData:{},
          forwardData:{},
          symbol:['circle','circle','circle'],
          walShow:false,
          loading11:true,
          saveHide:false,
          chartName:''
        }
      },
      methods:{
        //画追踪图
        getEchartInfo(address){
          let that = this;
          that.loading11 = true;
          let data = {
            address:address,
            checkpoint:that.Cookies.get('checkpoint')
          }
          $('.btn1').addClass('btnSel').siblings().removeClass('btnSel')
          that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
          that.ajax({
            method:"post",
            url:that.Config.baseUrl + '/topo',
            data:that.qs.stringify(data)
          }).then(res => {
            //console.log(res);
            if(res.data.code == "0000"){
              that.finalData = res.data.data.all;
              that.modifyData(res.data.data.all);
              that.backwardData = res.data.data.backward;
              that.forwardData = res.data.data.forward;
              //that.finalData1 = res.data.data.backward;
              //that.finalData2 = res.data.data.forward;
              //that.loading2 = false;

              that.loading11 = false;
              console.log(that.finalData);
              // console.log(that.finalData1);
            }else {
              that.$message.error("跟踪失败")
            }
          })
        },
        //
        modifyData(data){
          let that = this;
          //console.log(data);
          if(data==null){
            alert("没有收到数据");
          }else{
            var idMap = {};
            var num = 40;
            if(data.vertex.length >40){
              num = 40
            }else {
              num = 60
            }
            $.each(data.vertex,function(i,item){
              idMap[item.walletId]=i;
              var vtx = {};
              item.id=item.walletId;
              item.name=item.entity.replace(/实体/g,"钱包");
              item.symbol=that.symbol[item.category];
              item.symbolSize=num;
              if(item.addressHash!=undefined){
                item.hash=item.addressHash;
              }

            });

            $.each(data.edge,function(i,item){
              var link = {};
              item.source=idMap[item.fromWalletId];
              item.target=idMap[item.toWalletId];
              item.txList = item.traceTransactionList;
              item.value=item.value;

              //obj.e.push(link);
            });
            // console.log(idMap);
            console.log(data);
            that.setChart(data);
          }
        },
        //开始画图
        setChart(data){
          let that = this;
          // 基于准备好的dom，初始化ECharts实例
          that.myChart = that.$echarts.init(document.getElementById('chart'), 'macarons');
          // 指定图表的配置项和数据
          var option = {
            // toolbox: {
            //   feature: {
            //     dataZoom: {
            //       yAxisIndex: false
            //     },
            //     // saveAsImage: {
            //     //   pixelRatio: 2
            //     // }
            //   }
            // },
            tooltip : {
              show : true,   //默认显示
              showContent:true, //是否显示提示框浮层
              trigger:'item',//触发类型，默认数据项触发
              triggerOn:'mousemove',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
              alwaysShowContent:false, //默认离开提示框区域隐藏，true为一直显示
              showDelay:0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
              hideDelay:200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
              enterable:false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
              position:'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
              confine:false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
              transitionDuration:0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
              formatter:function(params, ticket, callback) {
                //判断数据，提供相应的url。
                var path="";
                var node=params.data; //当前选中节点数据
                var category=params.data.category;  //选中节点图例0负载 1中间件 2端口号 3数据库 4用户名


                //console.log(params);

                // if(category==2){ //当选择端口号与用户名时提示加载
                //   return myChart.getOption().series[params.seriesIndex].categories[params.data.category].name+":"+params.name;
                // }else{                   //其他情况显示所属图例以及名称
                //                          //return myChart.getOption().series[params.seriesIndex].categories[params.data.category].name+":"+params.name;
                // }

              }
            },

            // legend : { //=========圖表控件
            //   show : true,
            //   x : 'center',
            //   y : 'top',
            //   textStyle:{
            //     color:'#ffffff'
            //   },
            //   data : [ {
            //     name : '起点',
            //     icon : 'circle',
            //     color:'#ffffff'
            //   }, {
            //     name : '未标注',
            //     icon : 'circle'
            //   },{
            //     name : '交易所',
            //     icon : 'circle'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            //   }]
            // },
            series : [ {
              type : 'graph', //关系图
              name : "监控管理系统", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
              layout : 'force', //图的布局，'force'类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
              legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
              hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
              coordinateSystem : null,//坐标系可选
              xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
              yAxisIndex : 0, //y轴坐标
              force : { //力引导图基本配置
                //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
                repulsion : 200,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                gravity : 0.01,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                edgeLength :250,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                layoutAnimation : true
                //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
              },
              roam : true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              nodeScaleRatio : 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
              draggable : true,//节点是否可拖拽，只在使用力引导布局的时候有用。
              focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              //symbol:'roundRect',//关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
              //symbolSize:40 ,//也可以用数组分开表示宽和高，例如 [20, 10] 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：(value: Array|number, params: Object) => number|Array
              //symbolRotate:,//关系图节点标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
              //symbolOffset:[0,0],//关系图节点标记相对于原本位置的偏移。[0, '50%']
              edgeSymbol : [ 'none', 'arrow' ],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
              edgeSymbolSize : 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
              itemStyle : {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                normal : { //默认样式
                  label : {
                    show : true
                  },
                  borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                  borderColor : 'rgba(255,215,0,0.4)', //设置图形边框为淡金色,透明度为0.4
                  borderWidth : 1, //图形的描边线宽。为 0 时无描边。
                  opacity : 1
                  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

                },
                emphasis : {//高亮状态

                }
              },
              lineStyle : { //==========关系边的公用线条样式。
                normal : {
                  label:{
                    show:false
                  },
                  color : 'rgba(255,255,255,0.3)',
                  width : '3',
                  type : 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                  curveness : -0.1, //线条的曲线程度，从0到1
                  opacity : 1
                  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                },
              },
              label : { //=============图形上的文本标签
                normal : {
                  show : true,//是否显示标签。
                  position : 'inside',//标签的位置。['50%', '50%'] [x,y]
                  textStyle : { //标签的字体样式
                    color : '#ffffff', //字体颜色
                    fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                    fontWeight : 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontFamily : 'sans-serif', //文字的字体系列
                    fontSize : 12, //字体大小
                  }
                },
              },
              edgeLabel : {//==============线条的边缘标签
                normal : {
                  show : false,
                  formatter:function(a,b){
                    return a.value
                  },
                },
              },
              emphasis : {//高亮状态
                edgeLabel:{
                  show : true,
                  color:'#ffffff'
                }
              },
              //别名为nodes   name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,symbolSize:10图形大小
              //label:标签样式。
              data : data.vertex,
              categories : [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
                {
                  name : '起点',
                  symbol : 'circle',
                  itemStyle:{
                    color:"#60ACDD",
                    borderWidth:0
                  }
                },{
                  name : '未标注',
                  symbol : 'circle',
                  itemStyle:{
                    color:"#A9ACB6",
                    borderWidth:0,
                  },
                  label:{
                    show:false,
                  },
                },{
                  name : '交易所',
                  symbol : 'rect',
                  itemStyle:{
                    color:"#5FB98F",
                    borderWidth:0
                  },
                  label : { //标签样式
                    color:'#ffffff'
                  }
                } ],
              links : data.edge
            } ]
          };
          //console.log(option);
          // 使用刚指定的配置项和数据显示图表。
          that.myChart.setOption(option);

          /*ECharts3 方法部分 开始*/
          function appendPath(params){    //拼接节点关系并显示在左下角，
            var option = that.myChart.getOption();
            var series = option.series[params.seriesIndex]; //获取图表
            var nodesOption = series.data;//获取所有数据
            var links= series.links;//获取所有连线
            if(params.dataType=="node"){ //dataType可以是edge(线条)或node(数据)

              var id=params.data.id;

              var categoryName = series.categories[params.data.category].name;//获取当前节点的图例名称

              if(params.data.name.indexOf("实体")==-1 && params.data.category==2){
                categoryName = "交易所";
              }else {
                if(that.Cookies.get('cl') == 2){
                  that.$emit('walSH');
                  that.$emit('txnS');
                  that.walletClick(params.data.id);
                  that.recordClick(params.data.id);
                  that.Cookies.set('specNode1',params.data.id)
                  that.Cookies.set('specNode2',"")

                  that.$emit('tNode')
                }else {
                  that.open()
                }

              }
              console.log(params.data);
              // that.walletDetail(params.data.id);



              var str=categoryName+":"+params.data.name;
              if(params.data.category==0){
                let a = params.data.name.replace("钱包","");
                console.log(a);

                //蓝色
                //that.getWalletInfo(a)
                str+="<br>addressHash:"+params.data.hash;
              }else{
                //console.log(params.data.id)
                //that.getWalletInfo(params.data.id)
                str+="<br>nodeId:"+params.data.id;
              }
              var map = {};
              for(var i = 0 ; i < links.length; i++){
                if(map[links[i].source]==undefined){
                  map[links[i].source] =new Array();
                }
                map[links[i].source].push(links[i].target);
              }
              //console.log(map);
              /*
              while(true){
                  if(map[id]==undefined || map[id].length==0){
                      break;
                  }
                  //获取父节点的图例名称并连接
                  for(var k=0;k<map[id].length;k++)
                  str =series.categories[nodesOption[map[id]].category].name+":"+nodesOption[map[id]].name+"->" + str;
                  id = map[id] ;
              }
              */
              return str;
            }else if(params.dataType=="edge"){ //当鼠标停留在连线上时
              // $('.txnInfo').css({display:'block'});
              // $('.txnInfo').animate({width:'25.875rem'},350);
              // $('.walletInfo').css({display:'none'});

              if(that.Cookies.get('cl') == 2){
                that.$emit('walH');
                that.$emit('txnS');
                that.$emit('tLine');
                console.log(params.data);
                that.Cookies.set('specNode1',params.data.fromWalletId)
                that.Cookies.set('specNode2',params.data.toWalletId);
                console.log('点击了线')
                console.log(params.data.txList);
                that.linkClick(params.data.txList)
                that.txnInfoData = params.data.txList;
              }else {
                that.open2()
              }
              // var str="当前交易为：";
              // $.each(params.data.txList,function(i,item){
              //   str+="txId: "+item.txId+"<br>txHash: "+item.txHash+"<br>inputAddress: "+JSON.stringify(item.inputAddressSet)+"<br>";
              // });
              // return str;
            }
          }

          function openOrFold(params) {  //该事件会提示节点间关系
            var str = appendPath(params);
            //document.getElementById("tooltip").innerHTML = str;
            //console.log(str)
            return str;
          }
          //var ecConfig = echarts.config; echarts2的获取事件方法，当前为echarts3
          that.myChart.on('dblclick', openOrFold);
          //'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'
          /*ECharts3 方法部分 结束*/

          /*ECharts3 结束*/
        },
        //开始搜索
        getSearch(key){
          let that = this;
          that.getEchartInfo(that.Cookies.get('key'));
        },
        //点击钱包
        walletClick(id){
          let that = this;
          console.log(id)
          that.$emit('walletClick',id)
        },
        //交易记录
        recordClick(id){
          let that = this;
          that.$emit('recordClick',id)
        },
        //点击线
        linkClick(ids){
          let str = "";
          if(ids.length > 0){
            let arr = [];
            ids.forEach((value)=>{
              arr.push(value.txId)
            })
            str = arr.join(',');
            console.log(str);
          }
          this.$emit('linkClick',str)
        }
        ,
        //全部切换
        allChange($event,type){
          let that = this;
          $($event.currentTarget).addClass('btnSel').siblings().removeClass('btnSel');
          that.$emit('walH');
          that.$emit('txnH');
          if(type == 'all'){
            that.allClick();
          }else if(type == 'back'){
            that.backClick();
          }else {
            that.forwardClick();
          }
        },
        //点击全部
        allClick(){
          let that = this;
          that.modifyData(that.finalData);
        },
        //点击去想
        backClick(){
          let that = this;
          that.modifyData(that.backwardData);
        },
        //点击来源
        forwardClick(){
          let that = this;
          that.modifyData(that.forwardData);
        },
        open() {
          let that = this;
          this.$alert('正式版可查看节点详细信息', '', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        },
        open2() {
          let that = this;
          this.$alert('正式版可查看更多交易信息', '', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        },
        //获取修改的标签
        getTag(){
          console.log("修改了白噢钱")
          let that = this;
          console.log(that.Cookies.get('exchangeId'));
          console.log(that.Cookies.get('exchangeTag'));
          that.finalData.vertex.forEach((value)=>{
            if(value.walletId == that.Cookies.get('exchangeId')){
              value.entity = that.Cookies.get('exchangeTag');
              value.itemStyle={
                color:"#FFB700",
                  borderWidth:0
              };
              value.label={ //标签样式
                color:'#ffffff',
                show:true
              }
              console.log(value)
            }
          });
          that.backwardData.vertex.forEach((value)=>{
            if(value.walletId == that.Cookies.get('exchangeId')){
              value.entity = that.Cookies.get('exchangeTag');
              value.itemStyle={
                color:"#FFB700",
                borderWidth:0
              };
              value.label={ //标签样式
                color:'#ffffff',
                show:true
              }
              console.log(value)
            }
          });
          that.forwardData.vertex.forEach((value)=>{
            if(value.walletId == that.Cookies.get('exchangeId')){
              value.entity = that.Cookies.get('exchangeTag');
              value.itemStyle={
                color:"#FFB700",
                borderWidth:0
              };
              value.label={ //标签样式
                color:'#ffffff',
                show:true
              }
              console.log(value)
            }
          });
          // for(let i =0;i<that.finalData.vertex.length;i++){
          //   if(that.finalData.vertex[i].walletId == that.Cookies.get('exchangeId')){
          //     that.finalData.vertex[i].entity = that.Cookies.get('exchangeTag');
          //         console.log(that.finalData.vertex[i])
          //       }
          // }
          console.log(that.finalData);
          that.allClick()
          $('.btn1').addClass('btnSel').siblings().removeClass('btnSel')
        },
        //保存图谱
        saveHideClick(){
          let that = this;
          // this.$message('这是一条消息提示');

          that.saveHide = true;
        },
        //
        trueClick(){
          let that = this;
          console.log(that.chartName);
          that.saveHide = false;

          // if(that.chartName == ''){
          // }
          // that.$message.error('输入内容不能为空')
          // if(that.chartName == ''){
          // }else {
          //   that.$message.success('保存成功')
          // }
        },
        //
        falseClick(){
          let that = this;
          that.saveHide = false;
          that.chartName = '';
        }
      },
      mounted(){
        let that = this;
        if(that.Cookies.get('cl') != 0){
          $("#chart").width(document.documentElement.clientWidth);
          $("#chart").height(document.documentElement.clientHeight-113);
          that.getEchartInfo(that.Cookies.get('key'));
          // window.onresize = () => {
          //   return (() => {
          //     $("#chart").width(document.documentElement.clientWidth);
          //     $("#chart").height(document.documentElement.clientHeight-113);
          //     console.log(document.documentElement.clientWidth);
          //     that.myChart.resize();
          //   })()
          // }
          window.addEventListener("resize", () => {
            $("#chart").css('width',$(window).width() + 'px');
            $("#chart").css('height',$(window).height()-113 +'px');

          });
        }
      }
    }
</script>

<style scoped>
  .btnAll{
    width: 156px;
    height: 32px;
    position: absolute;
    top: 25px;
    left: 40px;
    display: flex;
  }
  .btnAll div{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .btn1{
    width:52px;
    box-sizing: border-box;
    border-radius: 2px 0px 0px 2px;
    background: #1A1C20;
    border: 1px solid rgba(255,255,255,0.20);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
  }
  .btn2{
    width:52px;
    box-sizing: border-box;
    background: #1A1C20;
    border: 1px solid rgba(255,255,255,0.20);
    border-right: none;
    border-left: none;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
  }
  .btn3{
    width:52px;
    box-sizing: border-box;
    border-radius: 0px 2px 2px 0px;
    background: #1A1C20;
    border: 1px solid rgba(255,255,255,0.20);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
  }
  .btnSel{
    background: #00A0E9;
    color: #FFFFFF;
  }
  /**/
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
    top: 25px;
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
</style>
