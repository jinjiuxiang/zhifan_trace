<template>
    <div class="container">
      <div id="chartHandel">

      </div>
      <div class="hide-cc">
          <div class="hideSource" @click="getData2(2)">来源</div>
          <div class="hideGo" @click="getData2(1)">去向</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "newWay",
      data() {
        return {
          data: [
            {
              name: "节点1",
              index: 1,
              symbolSize: 70,
              category: 1,
              categoryIndex: 1,
              symbol: 'roundRect',
              x: 715,
              y: 100
            },
            {
              name: "节点1-1",
              index: 11,
              preIndex: 1,
              preI: 1,
              category: 2,
              categoryIndex: 1,
              preCateIndex: 1,
              symbolSize: 70,
              mIndex: 1,
              symbol: 'rect',
              num: 2
            },
            {
              name: "节点1-2",
              index: 12,
              preIndex: 1,
              preI: 2,
              mIndex: 2,
              category: 2,
              categoryIndex: 2,
              preCateIndex: 1,
              symbolSize: 70,
              symbol: 'rect',
              num: 2

            },
            {
              name: "节点1-1-1",
              index: 111,
              preIndex: 11,
              category: 3,
              categoryIndex: 1,
              preCateIndex: 1,
              mIndex: 1,
              symbolSize: 70,
              symbol: 'rect',
              num: 2
            },
            {
              name: "节点1-1-2",
              index: 112,
              preIndex: 11,
              category: 3,
              categoryIndex: 2,
              preCateIndex: 1,
              mIndex: 2,
              symbolSize: 70,
              symbol: 'rect',
              num: 2
            },
            {
              name: "节点1-2-1",
              index: 121,
              preIndex: 12,
              category: 3,
              categoryIndex: 1,
              preCateIndex: 2,
              mIndex: 1,
              symbolSize: 70,
              symbol: 'rect',
              num: 4

            },
            {
              name: "节点1-2-2",
              index: 122,
              preIndex: 12,
              mIndex: 2,
              category: 3,
              categoryIndex: 2,
              preCateIndex: 2,
              symbolSize: 70,
              symbol: 'rect',
              num: 4

            },
            {
              name: "节点1-2-3",
              index: 123,
              preIndex: 12,
              mIndex: 2,
              category: 3,
              categoryIndex: 3,
              preCateIndex: 2,
              symbolSize: 70,
              symbol: 'rect',
              num: 4
            },
            {
              name: "节点1-2-4",
              index: 124,
              preIndex: 12,
              mIndex: 2,
              category: 3,
              categoryIndex: 4,
              preCateIndex: 2,
              symbolSize: 70,
              symbol: 'rect',
              num: 4
            },
            {
              name: "节点1-1-1-1",
              index: 1111,
              preIndex: 111,
              category: 4,
              mIndex: 1,
              categoryIndex: 1,
              preCateIndex: 1,
              symbolSize: 70,
              symbol: 'rect',
            },
            {
              name: "节点1-1-1-2",
              index: 1112,
              preIndex: 111,
              category: 4,
              categoryIndex: 2,
              preCateIndex: 1,
              symbolSize: 70,
              symbol: 'rect',
              value: 30
            },
            {
              name: "节点1-1-2-1",
              index: 1121,
              preIndex: 112,
              category: 4,
              categoryIndex: 1,
              preCateIndex: 2,
              symbolSize: 70,
              symbol: 'rect',
            },
            {
              name: "节点1-1-2-2",
              index: 1122,
              preIndex: 112,
              category: 4,
              symbolSize: 70,
              symbol: 'rect',
            },
            {
              name: "节点1-1-1-1-1",
              index: 11111,
              preIndex: 1111,
              category: 5,
              symbolSize: 70,
              symbol: 'circle',
            },
            {
              name: "节点1-1-1-1-2",
              index: 11112,
              preIndex: 1111,
              category: 5,
              symbolSize: 70,
              symbol: 'circle',
            },
          ],
          data2: [
            // {
            //   name:"节点1",
            //   index:1,
            //   symbolSize : 70,
            //   category : 1,
            //   categoryIndex : 1,
            //   preCateIndex:0  ,
            //   symbol : 'roundRect',
            //   x:0,
            //   y:100,
            //   num:1
            // },
          ],
          links: [ //edges是其别名代表节点间的关系数据。
            {
              source: '节点1',
              target: '节点1-1'
            },
            {
              source: '节点1',
              target: '节点1-2'
            },
            {
              source: '节点1',
              target: '节点1-2'
            },
            {
              source: '节点1-1',
              target: '节点1-1-1'
            },
            {
              source: '节点1-1',
              target: '节点1-1-2'
            },
            {
              source: '节点1-1',
              target: '节点1-1-3'
            },
            {
              source: '节点1-2',
              target: '节点1-2-1'
            },
            {
              source: '节点1-2',
              target: '节点1-2-2'
            },
            {
              source: '节点1-2',
              target: '节点1-2-3'
            },
            {
              source: '节点1-2',
              target: '节点1-2-4'
            },
            {
              source: '节点1-1-1',
              target: '节点1-1-1-1'
            },
            {
              source: '节点1-1-1',
              target: '节点1-1-1-2'
            },
            {
              source: '节点1-1-2',
              target: '节点1-1-2-1'
            },
            {
              source: '节点1-1-2',
              target: '节点1-1-2-2'
            },
            {
              source: '节点1-1-2-2',
              target: '节点1-1-2'
            },
            {
              source: '节点1-1-2-2',
              target: '节点1'
            },
            {
              source: '节点1-1-1-1',
              target: '节点1-1-1-1-1'
            },
            {
              source: '节点1-1-1-1',
              target: '节点1-1-1-1-2'
            },
            {
              source: '节点1-1-1-1-2',
              target: '节点1'
            },
          ],
          links2: [],
          hideShow: false,
          walletId: '',
          level: 1,
          index: 1,
          myChart:null,
          option:null
        }
      },
      methods: {
        chartDraw() {
          let that = this;
          var data = this.data;
          var data2 = this.data2;
          var links = this.links2;
          var arr = [];
          var nodeObj = {};
          that.myChart = this.$echarts.init(document.getElementById('chartHandel'), 'macarons');
          // 指定图表的配置项和数据
          that.option = {
            tooltip: {
              show: true,   //默认显示
              showContent: true, //是否显示提示框浮层
              trigger: 'item',//触发类型，默认数据项触发
              triggerOn: 'click',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
              alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
              showDelay: 0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
              hideDelay: 200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
              enterable: false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
              position: 'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
              confine: false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
              transitionDuration: 0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
              formatter: function (params, ticket, callback) {
                //判断数据，提供相应的url。
                var path = "";
                var node = params.data; //当前选中节点数据
                var category = params.data.category;  //选中节点图例0负载 1中间件 2端口号 3数据库 4用户名
                if (category == 2) { //为jvm 虚拟机各类参数的路径
                  path = "${ctx}/weblogic.do?host=" + node.host + "&port="
                    + node.port + "&username=" + node.username
                    + "&pwd=" + node.pwd; //准备访问路径
                } else if (category == 4) { //为jdbc 数据库的路径
                  path = "${ctx}/oracle.do?host=" + node.host + "&port="
                    + node.port + "&username=" + node.username
                    + "&pwd=" + node.pwd + "&instance="
                    + node.instance; //准备访问路径
                }

                //console.log(params);
                $.ajax({
                  async: true,//设置异、同步加载
                  cache: false,//false就不会从浏览器缓存中加载请求信息了
                  type: 'post',
                  dataType: "json",
                  url: path,//请求的action路径
                  success: function (data) { //请求成功后处理函数。
                    //加工返回后的数据
                    debugger;
                    if (category == 2) { //当选择端口号时
                      var res = 'jvm最大内存值:' + data.memoryMaxSize + '<br/>';
                      res += 'jvm空闲内存值:' + data.memoryFreeSize + '<br/>';
                      res += 'jvm内存使用率：' + data.memoryPer + '<br/>';
                      res += '空闲线程：' + data.ideThread + '<br/>';
                      res += '总线程：' + data.totalThread + '<br/>';
                      res += '每秒处理的线程数比率：' + data.throuhput + '<br/>';
                      callback(ticket, res);
                    } else if (category == 4) {//当选择用户名时
                      var res = '当前链接数：' + data.processCount + '<br/>';
                      res += '最大链接数：' + data.maxProcessCount + '<br/>';
                      callback(ticket, res);
                    }

                  },
                  error: function () {//请求失败处理函数
                    $.messager.alert('警告', '请求失败！', 'warning');
                  }
                });
                if (category == 2 || category == 4) { //当选择端口号与用户名时提示加载
                  return "loading";
                } else {                   //其他情况显示所属图例以及名称
                  return myChart.getOption().series[params.seriesIndex].categories[params.data.category].name + ":" + params.name;
                }

              }
            },

            legend: { //=========圖表控件
              show: false,
              data: [{
                name: '负载',

                icon: 'rect'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'

              },
                {
                  name: '中间件',

                  icon: 'roundRect'
                }, {
                  name: '端口号',

                  icon: 'circle'
                }, {
                  name: '数据库',

                  icon: 'circle'
                }, {
                  name: '用户名',
                  icon: 'roundRect'
                }]
            },
            series: [{
              type: 'graph', //关系图
              name: "监控管理系统", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
              layout: 'none', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
              legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
              hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
              coordinateSystem: null,//坐标系可选
              xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
              yAxisIndex: 0, //y轴坐标
              force: { //力引导图基本配置
                initLayout: 100,//力引导的初始化布局，默认使用xy轴的标点
                repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                gravity: 0,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                edgeLength: 100,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                layoutAnimation: true
                //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
              },
              roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              nodeScaleRatio: 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
              draggable: true,//节点是否可拖拽，只在使用力引导布局的时候有用。
              focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              //symbol:'roundRect',//关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
              //symbolSize:10 ,//也可以用数组分开表示宽和高，例如 [20, 10] 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：(value: Array|number, params: Object) => number|Array
              //symbolRotate:,//关系图节点标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
              //symbolOffset:[0,0],//关系图节点标记相对于原本位置的偏移。[0, '50%']
              edgeSymbol: ['none', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
              edgeSymbolSize: 20,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
              itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                normal: { //默认样式
                  label: {
                    show: true
                  },
                  borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                  borderColor: 'rgba(255,215,0,0.4)', //设置图形边框为淡金色,透明度为0.4
                  borderWidth: 2, //图形的描边线宽。为 0 时无描边。
                  opacity: 1
                  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

                },
                emphasis: {//高亮状态

                }
              },
              lineStyle: { //==========关系边的公用线条样式。
                normal: {
                  color: 'rgba(255,255,255,0.3)',
                  width: '3',
                  type: 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                  curveness: 0.05, //线条的曲线程度，从0到1
                  opacity: 1
                  // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                },
                emphasis: {//高亮状态

                }
              },
              label: { //=============图形上的文本标签
                normal: {
                  show: true,//是否显示标签。
                  position: 'inside',//标签的位置。['50%', '50%'] [x,y]
                  textStyle: { //标签的字体样式
                    color: '#cde6c7', //字体颜色
                    fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                    fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontFamily: 'sans-serif', //文字的字体系列
                    fontSize: 12, //字体大小
                  }
                },
              },

              edgeLabel: {//==============线条的边缘标签
                normal: {
                  show: true,
                  verticalAlign: 'top',
                  backgroundColor: '#24262C',
                  color:'#fff',
                  padding: [0, 20],
                  fontSize: 14,
                  formatter:function(a,b){
                    return a.value
                  },
                },
                emphasis: {//高亮状态

                }
              },
              emphasis : {//高亮状态
                edgeLabel:{
                  normal: {
                    show: true,
                    verticalAlign: 'top',
                    backgroundColor: '#fff',
                    padding: [0, 20],
                    fontSize: 14
                  },
                }
              },
              //别名为nodes   name:影响图形标签显示,value:影响选中后值得显示,category:所在类目的index,symbol:类目节点标记图形,symbolSize:10图形大小
              //label:标签样式。
              data: data2,
              categories : [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
                {
                  name : '起点',
                  symbol : 'circle',
                  itemStyle:{
                    color:"#60ACDD",
                    borderWidth:0
                  },
                  label:{
                    show:true,
                    color:'#fff'
                  },
                },{
                  name : '未标注',
                  symbol : 'circle',
                  itemStyle:{
                    color:"#A9ACB6",
                    borderWidth:0,
                  },
                  label:{
                    show:true,
                    color:'#fff'
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
              links: links
            }]
          };

          // 使用刚指定的配置项和数据显示图表。
          that.myChart.setOption(that.option);

          /*ECharts3 方法部分 开始*/
          function appendPath(params) {    //拼接节点关系并显示在左下角，
            var option = myChart.getOption();
            var series = option.series[params.seriesIndex]; //获取图表
            var nodesOption = series.data;//获取所有数据
            var links = series.links;//获取所有连线
            if (params.dataType == "node") { //dataType可以是edge(线条)或node(数据)
              var id = params.data.id;
              var categoryName = series.categories[params.data.category].name;//获取当前节点的图例名称
              var str = categoryName + ":" + nodesOption[id].name;
              var i = 0;
              var map = {};
              for (i = 0; i < links.length; i++) {
                map[links[i].source] = links[i].target;
              }

              while (true) {
                if (map[id] == undefined) {
                  break;
                }
                //获取父节点的图例名称并连接
                str = series.categories[nodesOption[map[id]].category].name + ":" + nodesOption[map[id]].name + "->" + str;
                id = map[id];
              }
              return str;
            } else if (params.dataType == "edge") { //当鼠标停留在连线上时，暂不处理
              return "";
            }
          }

          function openOrFold(params) {  //该事件会提示节点间关系
            var str = appendPath(params);
            document.getElementById("main_1").innerHTML = str;
            return str;
          }

          //var ecConfig = echarts.config; echarts2的获取事件方法，当前为echarts3
          //myChart.on('mouseover', openOrFold);
          //筛选

          function getChoose(id, category) {
            let that = this;
            //console.log(data);
            if (arr.indexOf(id) == -1) {
              let tmARr = [];
              // nodeObj[category] = 0;
              data.forEach((val, index) => {
                if (val.preIndex == id) {
                  tmARr.push(val);
                  // nodeObj[val.category] = 0;
                }
              })
              //console.log(nodeObj);
              if (nodeObj[category + 1] == undefined) {
                tmARr.forEach((val, index) => {
                  // val.x = 100*index;
                  // val.y = 100*(val.category);
                  if (index == tmARr.length - 1) {
                    nodeObj[val.category] = 100 * index;
                  }
                  //console.log(val.category);
                  //console.log("1111")
                  // val.x = 100*index;
                  // val.y = 100+100*(val.category);
                  data2.push(val)
                  //console.log(tmARr);

                })

                console.log(data2);
                // data2.map((val,index)=>{
                //
                // })
                // tmARr.forEach((val,index)=>{
                //     val.x = 100*index;
                //     val.y = 100*(val.category);
                //     if(index == tmARr.length-1){
                //       nodeObj[val.category] = 100*index;
                //     }
                //     //console.log(val.category);
                //     //console.log("1111")
                //   // val.x = 100*index;
                //   // val.y = 100+100*(val.category);
                //   data2.push(val)
                //   //console.log(tmARr);
                //
                // })
              } else {
                tmARr.forEach((val, index) => {
                  //console.log('2222');
                  //console.log(nodeObj[val.category]);
                  val.x = 100 * (index + 1) + nodeObj[val.category];
                  val.y = 100 * (val.category);
                  if (index == tmARr.length - 1) {
                    nodeObj[val.category] = 100 * (index) + nodeObj[val.category]

                  }
                  // if(index < tmARr.length-1){
                  // }else {
                  //   nodeObj[val.category] = 100*(index) + nodeObj[val.category]
                  //
                  // val.x = 100*index;
                  // val.y = 100+100*(val.category);
                  data2.push(val)
                  //console.log(tmARr);

                })
              }
              // tmARr.forEach((val,index)=>{
              //   if(nodeObj[val.category] == undefined){
              //     val.x = 100*index;
              //     val.y = 100*(val.category);
              //     nodeObj[val.category] = 100*index;
              //     console.log(val.category);
              //     console.log("1111");
              //   }else {
              //     console.log('2222');
              //     console.log(nodeObj[val.category]);
              //     val.x = 100*index + nodeObj[val.category];
              //     val.y = 100*(val.category);
              //     nodeObj[val.category] = 100*(index) + nodeObj[val.category]
              //
              //     // if(index < tmARr.length-1){
              //     // }else {
              //     //   nodeObj[val.category] = 100*(index) + nodeObj[val.category]
              //     // }
              //   }
              //   // val.x = 100*index;
              //   // val.y = 100+100*(val.category);
              //   data2.push(val)
              //   console.log(tmARr);
              //
              // })
              data2.sort((a, b) => {
                if (a['category'] == b['category']) {
                  if (a['preCateIndex'] == b['preCateIndex']) {
                    if (a['categoryIndex'] > b['categoryIndex']) {
                      return 1;
                    } else if (a['categoryIndex'] < b['categoryIndex']) {
                      return -1;
                    } else {
                      return 0;
                    }
                  } else {
                    if (a['preCateIndex'] > b['preCateIndex']) {
                      return 1;
                    } else {
                      return -1;
                    }
                  }
                } else {
                  if (a['category'] > b['category']) {
                    return 1;
                  } else {
                    return -1;
                  }
                }
              })
              // data2.forEach((val,index)=>{
              //   let ux = 0;
              //   if(index>0 && data2[index].category != data2[index+1].category){
              //    console.log(index)
              //   }
              //   val.x = 100*(index-ux);
              //   val.y = 100+100*(val.category);
              // })
              let ux = 0;
              for (let i = 1; i < data2.length; i++) {
                if (data2[i - 1].category != data2[i].category) {
                  ux = i;
                }
                data2[i].x = 100 * (i - ux);
                data2[i].y = 100 + 100 * (data2[i].category);
              }
              //console.log(data2);
              for (let j = data2.length - 1; j >= 0; j--) {
                // console.log(data2[j]['x']);
                let num = 1;
                data2.forEach((val) => {
                  if (val.category == data2[j].category && val.preCateIndex == data2[j].preCateIndex) {
                    num++;
                    // console.log(num);
                  }
                })
                data2.forEach((val) => {
                  if (val.category - data2[j].category == -1 && val.categoryIndex == data2[j].preCateIndex) {
                    // console.log(val);
                    val.x = data2[j].x + 50 * (num - 2)

                  }
                })
                // console.log(num);
                // data2.forEach((val)=>{
                //   if(val.category-data2[j].category == -1 && val.categoryIndex == data2[j].preCateIndex ){
                //     console.log(num);
                //     val.x = data2[j].x+50*num
                //   }
                // })
              }
              console.log(data2);
              that.myChart.setOption(that.option, true);
              arr.push(id);
            }

            //console.log(option);
          }

          function youData(params, e) {
            $('.hide-cc').css('display', 'block')
            $('.hide-cc').css('top', params.event.offsetY + 'px')
            $('.hide-cc').css('left', params.event.offsetX + 'px')
            var e = e || window.event;
            e.preventDefault()
            console.log(params);
            if (params.data.hasNextOut <= 0) {
              $('.hideGo').css('display', 'none')
            }
            if (params.data.hasPreIn <= 0) {
              $('.hideSource').css('display', 'none')
            }
            that.walletId = params.data.walletId;
            that.level = params.data.level;
            that.index = params.data.levelIndex;
            // console.log(params.data.index);
            //getChoose(params.data.index,params.data.category)
          }


          that.myChart.on('contextmenu', youData);
          //'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'
          /*ECharts3 方法部分 结束*/

          /*ECharts3 结束*/
        },
        getData(address,direction) {
          let that = this;
          console.log(that.Cookies.get("token"));
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method: 'get',
            url: 'http://10.0.0.44:9006/v2Manager/follow/step',
            params: {
              checkpoint: '1553045910860',
              address: address,
              walletId: that.walletId,
              level: that.level,
              index: that.index,
              direction: direction
            }
          }).then(res => {
            console.log(res);
            that.data2 = res.data.data.vertex;
            that.links2 = res.data.data.edge;
            this.modifyData(res.data.data);
          })
        },
        modifyData(data) {
          let that = this;
          //console.log(data);
          if (data == null) {
            alert("没有收到数据");
          } else {
            var idMap = {};
            var num = 40;
            if (data.vertex.length > 40) {
              num = 40
            } else {
              num = 60
            }
            $.each(data.vertex, function (i, item) {
              idMap[item.walletId] = i;
              var vtx = {};
              item.walletId = item.walletId;
              item.name = item.entity.replace(/实体/g, "钱包");
              //item.symbol=that.symbol[item.category];
              item.symbolSize = num;
              if (item.addressHash != undefined) {
                item.hash = item.addressHash;
              }
              item.x = 0;
              item.y = 100;
            });

            $.each(data.edge, function (i, item) {
              var link = {};
              item.source = item.fromWalletId;
              item.target = item.toWalletId;
              item.txList = item.traceTransactionList;
              item.value = item.value;

              //obj.e.push(link);
            });
            // console.log(idMap);
            console.log(data);
            that.data2 = data.vertex;
              that.links2 = data.edge;
              that.chartDraw();
          }
        },
        getData2(direction) {
          let that = this;
          console.log(that.Cookies.get("token"));
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method: 'get',
            url: 'http://10.0.0.44:9006/v2Manager/follow/step',
            params: {
              checkpoint: '1553045910860',
              address: that.Cookies.get('key'),
              walletId: that.walletId,
              level: that.level,
              index: that.index,
              direction: direction
            }
          }).then(res => {
            console.log(res);
            console.log(that.data2);
            console.log(that.links2);
            $('.hide-cc').css('display','none');
            res.data.data.vertex.forEach(val=>{
              let flag = true;
              that.data2.map(val2 => {
                if(val.entity == val2.name){
                  console.log(val);
                  flag = false;
                }
              })
              if(flag){
                that.data2.push(val)
              }
            })

            res.data.data.edge.forEach(val=>{
              that.links2.push(val)
            })
            let obj = {
              edge:that.links2,
              vertex:that.data2
            }
            console.log(obj);
            this.modifyData2(obj);
          })
        },
        modifyData2(data) {
          let that = this;
          //console.log(data);
          if (data == null) {
            alert("没有收到数据");
          } else {
            var idMap = {};
            var num = 40;
            if (data.vertex.length > 40) {
              num = 40
            } else {
              num = 60
            }
            $.each(data.vertex, function (i, item) {
              idMap[item.walletId] = i;
              var vtx = {};
              item.walletId = item.walletId;
              item.name = item.entity;
              //item.symbol=that.symbol[item.category];
              item.symbolSize = num;
              if (item.addressHash != undefined) {
                item.hash = item.addressHash;
              }
              // item.x = 0;
              // item.y = 100;
            });

            $.each(data.edge, function (i, item) {
              var link = {};
              item.source = item.fromEntity;
              item.target = item.toEntity;
              item.txList = item.traceTransactionList;
              item.value = item.value;

              //obj.e.push(link);
            });
            // console.log(idMap);
            console.log(data);

            that.data2 = data.vertex;
            that.links2 = data.edge;

            that.data2.sort((a, b) => {
              if (a['level'] == b['level']) {
                if (a['preLevelIndex'] == b['preLevelIndex']) {
                  if (a['levelIndex'] > b['levelIndex']) {
                    return 1;
                  } else if (a['levelIndex'] < b['levelIndex']) {
                    return -1;
                  } else {
                    return 0;
                  }
                } else {
                  if (a['preLevelIndex'] > b['preLevelIndex']) {
                    return 1;
                  } else {
                    return -1;
                  }
                }
              } else {
                if (a['level'] > b['level']) {
                  return 1;
                } else {
                  return -1;
                }
              }
            })
            let ux = 0;
            for (let i = 1; i < that.data2.length; i++) {
              if (that.data2[i - 1].level != that.data2[i].level) {
                ux = i;
              }
              that.data2[i].x = 100 * (i - ux);
              that.data2[i].y = 100 + 100 * (that.data2[i].level);
            }

            //
            for (let j = that.data2.length - 1; j >= 0; j--) {
              // console.log(data2[j]['x']);
              let num = 1;
              that.data2.forEach((val) => {
                if (val.level == that.data2[j].level && val.preLevelIndex == that.data2[j].preLevelIndex) {
                  num++;
                  //console.log(num);
                }
              })
              that.data2.forEach((val) => {
                console.log(val.levelIndex);
                console.log(that.data2[j].preLevelIndex);
                if (val.level - that.data2[j].level == -1 && val.levelIndex == that.data2[j].preLevelIndex) {
                  console.log(val);
                  val.x = that.data2[j].x + 50 * (num - 2)
                  console.log(val);
                }
              })
              // console.log(num);
              // data2.forEach((val)=>{
              //   if(val.category-data2[j].category == -1 && val.categoryIndex == data2[j].preCateIndex ){
              //     console.log(num);
              //     val.x = data2[j].x+50*num
              //   }
              // })
            }
            that.myChart.setOption(that.option)
          }
        },
      },
        mounted() {
          let that = this;
          // $("#chartHandel").width(document.documentElement.clientWidth);
          $("#chartHandel").height(document.documentElement.clientHeight-113);
          // that.getEchartInfo(that.Cookies.get('key'));
          that.getData(that.Cookies.get('key'),1)
          window.onresize = () => {
            return (() => {
              // $("#chartHandel").width(document.documentElement.clientWidth);
              $("#chartHandel").height(document.documentElement.clientHeight-113);
              that.myChart.resize();
            })()
          }

        }
    }
</script>

<style scoped>
.container{
  width: 100%;
  background: #24262C;
  overflow: auto;

}
  #chartHandel{


    width: 6000px;
  }
  .hide-cc{
    width: 120px;
    height: 120px;
    background: pink;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  .hide-cc div{
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
