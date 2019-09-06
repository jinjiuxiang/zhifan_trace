<template>
  <div @click="hideClick">
    <div id="mountNode" @click="hideClick" @click.stop style="overflow: auto" v-loading="loadingM2"
         element-loading-text="数据加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"></div>
    <div class="hide-cc" @click.stop>
      <div class="hideSource" @click="getData2(2)">追踪来源
        <div class="mtm"><img src="./../assets/img/san.png" alt=""></div>
      </div>
      <div class="hideSource hideS" @click="hideCome">收起来源
        <div class="mtm"><img src="./../assets/img/san.png" alt=""></div>
      </div>
      <div class="hideSource nodata uts" @click="hideClick">追踪来源
        <div class="mtm"><img src="./../assets/img/san.png" alt=""></div>
      </div>
      <!--<div class="hideSource hideS" @click="deleteClick">收起节点-->
        <!--<div class="mtm"><img src="./../assets/img/san.png" alt=""></div>-->
      <!--</div>-->
      <div class="hideGo" @click="getData2(1)">追踪去向</div>
      <div class="hideGo hideG" @click="hideGo">收起去向</div>
      <div class="hideGo nodata utg" @click="hideClick">追踪去向</div>
      <div class="hideGo2" @click="deleteNode">删除节点</div>
    </div>
    <!--<div class="stavePhoto" @click="stavePhoto">-->
      <!--保存图谱-->
    <!--</div>-->
    <div style="width: 250px;height: 50px;background: pink;position: fixed;top: 150px;right: 100px;z-index: 99">
        <span style="cursor: pointer" @click="upStep">上一步</span>
        <span style="cursor: pointer" @click="downStep">下一步</span>
        <span style="cursor: pointer" @click="saveImage('png','rr')">保存图片</span>
        <span style="cursor: pointer">重置图谱</span>
    </div>
  </div>
</template>

<script>
  import G6 from '@antv/g6';
  import '@antv/g6/build/plugin.tool.highlightSubgraph';
  import '@antv/g6/build/plugin.behaviour.analysis';
  import '@antv/g6/build/plugin.layout.dagre';
  import '@antv/g6/build/plugin.tool.tooltip';
  import html2canvas from "html2canvas";
  import jsPDF from "jspdf";
  var arrtmc = [];
    export default {
      name: "antV",
      data(){
        return {
          data:{
            nodes: [{
              id: '节点1',
              hash:'wewqeqwekjdasfjasd',
              index:1,
              shape: 'circle',
            },
              {
                id: '节点0',
                hash:'wewqeqwekjdasfjasd',
                index:11,
                preIndex:11,
                shape: 'circle'
              },
              {
              id: '节点1-1',
              index:11,
              preIndex:1,
                shape: 'circle'
            }, {
              id: '节点1-2',
              index:12,
              preIndex:1,
                shape: 'circle'
            }, {
              id: '节点1-1-1',
              index:111,
              preIndex:11,
                shape: 'circle'
            }, {
              id: '节点1-1-1-1',
              index:1111,
              preIndex:111,
                shape: 'circle'
            }],
            edges: [{
              source: '节点1',
              target: '节点1-1',
              // label:{
              //   text:'1qweeqweqweqweqwe123123213',
              //   fill: 'green',
              // },


              style: {
                endArrow: true,
                stroke: 'blue',
                lineDash: [2, 2],
                labelCfg: {
                  position: 'top',
                  style: {
                    fill: '#666'
                  }
                },
              },
              size:10,
              index:1
            }, {
              source: '节点1',
              target: '节点1-2',
              index:1,
              // label:{
              //   text:'1qweeqweqweqweqwe123123213',
              //   fill: 'green',
              // },
            }, {
              source: '节点1-2',
              target: '节点1-1-1',
              index:12
            }, {
              source: '节点1-1',
              target: '节点1-1-1',
              index:11
            }, {
              source: '节点0',
              target: '节点1-1',
              index:11
            },{
              source: '节点1-1-1',
              target: '节点1-1-1-1',
              index:111
            }]
          },
          data2:{
            nodes: [
              {
                id: '节点1',
                hash:'wewqeqwekjdasfjasd',
                index:1,
                shape: 'circle',
                style: {
                      stroke: null,
                      fill: '#60ACDD',
                      //fillOpacity: 0.45,
                      lineWidth: 2,
                      cursor:'pointer',
                      color:'red'
                    },
                label: {
                  text: '文本标签',
                  fill: '#fff'
                },
                labelCfg: {
                  position: 'bottom',
                  style: {
                    fill: '#fff',
                  }
                },
                color:'#fff'


              }
              ],
            edges: []
          },
          graph:null,
          indexS:[],
          dataNew:{
            nodes:[],
            edges:[]
          },
          linkNew:[],
          walletId:'',
          level:0,
          index:0,
          items:[],
          tarArr:[],
          sorArr:[],
          nonce:0,
          tags:[],
          preVertexIds:'',
          backVertexIds:'',
          stepGroups:[],
          stepIndex:0,
          mocbb:"",
          domX:0,
          domY:0,
          centerX:0,
          centerY:0,
          zoomNum:0,
          loadingM2:true,
          contArr:[],
          contIdArr:[],
        }
      },
      methods:{
        startChart(){
          let that = this;
          let goArr = [];
          let sourceArr=[];
          const Highlighter = G6.Plugins['tool.highlightSubgraph'];
          const tooltip = new G6.Plugins['tool.tooltip']();
          const highlighter = new Highlighter();
          G6.registerNode('rect', {
            getPath: function getPath(item) {
              var width = 100; // 一半宽
              var height = 40; // 一半高
              return G6.Util.getRectPath(-width / 2, -height / 2, width, height, 10);
            }
          });

          that.graph = new G6.Graph({
            container: 'mountNode',
            fitView: 'cc',
            height: window.innerHeight-120, // 画布高
            plugins: [highlighter,new G6.Plugins['layout.dagre'](
              {
                nodesep:60,
                ranksep:120
              }
            ),highlighter,tooltip],
            defaultIntersectBox: 'rect', // 使用矩形包围盒
            grid: {
              forceAlign: true, // 是否支持网格对齐
              cell: 10,         // 网格大小
              line: {           // 网格线样式
                stroke: '#333'
              }
            },
            layout:{
              auto:true
            },
            modes: {
              default: ['panCanvas','wheelZoom']
            },
            style:{
              fill:'#fff'
            }
          });
          that.graph.addPlugin(highlighter);
          that.graph.node({
            shape: 'circle',
            label: function label(model) {
              let obj = {
                fill:'#fff'
              };
              obj.text = model.entity.replace('实体','钱包')
              return obj;
            },
            labelCfg: {
              style: {
                fill: '#fff'
              }
            },
            // style: {
            //   stroke: null,
            //   //fill: '#92949F',
            //   // fillOpacity: 0.45,
            //   // lineWidth: 2,
            //   // cursor:'pointer',
            //   // color:'#fff'
            // },
            size: 50,
          });
          that.graph.edge({
            style: {
              endArrow: true,
              lineWidth: 4,
              size: 8,
            },
            size: 8,
            color:'rgba(255,255,255,0.3)',
            // label: function label(model) {
            //   console.log(model);
            //   let obj = {
            //     fill:'#fff',
            //     show:false
            //   };
            //   // obj.text = model.value
            //   //obj.text = null
            //   return obj;
            // },
            // labelRectStyle: {      // 文本标签背景样式
            //   fill: '#202227',
            //   stroke:null
            // },
            tooltip(model) {
              return [
                ['交易信息',model.value],
                ['交易次数',model.value],
              ];
            },
          });

          // if(items.length != 0){
          //   that.graph.highlightSubgraph(items);
          //
          // }
          let  ar1 = [];
          let  ar2 = [];
          if(that.tarArr.length > 0){
            ar1 = JSON.parse(JSON.stringify(that.tarArr)).pop();
          }else {
            ar1 = that.tarArr;
          }
          if(that.sorArr.length > 0){
            ar2 = JSON.parse(JSON.stringify(that.sorArr)).pop();;
          }else {
            ar2 = that.sorArr;
          }
          let obj = {
            value:JSON.parse(JSON.stringify(that.dataNew)),
            to:JSON.parse(JSON.stringify(that.tarArr)),
            sor:JSON.parse(JSON.stringify(that.sorArr)),
          }
          arrtmc.push(obj);
          console.log(arrtmc);
          that.mocbb = JSON.stringify(arrtmc)
          that.stepIndex++;
          // console.log(that.stepGroups);
          that.graph.read(that.dataNew);
          that.loadingM2 = false;
          that.items = that.graph.getItems();
          // console.log(that.items);
          that.graph.on('contextmenu', (ev,e)=>{
            //var e = document.all ? window.event : arguments[0] ? arguments[0] : event;
            //console.log(event);
            //event.preventDefault();
            // event.stopPropagation();
            //e.preventDefault();
            // console.log(ev);

            if(ev.item != null){
              // console.log(ev);
              if(ev.item.type == 'node'){
                // console.log('点击了点')
                console.log(ev);
                that.domX = ev.domX;
                that.domY = ev.domY;
                $('.hide-cc').css('top', ev.domY + 'px')
                $('.hide-cc').css('left', ev.domX + 'px')
                that.walletId = ev.item.model.walletId;
                const node1 = that.graph.find(that.walletId);
                that.contArr.push(ev.item.model.style.fill);
                console.log(that.contArr);
                that.contIdArr.push(that.walletId);
                that.graph.update(node1, {
                  style:{
                    fill:'red'
                  }
                });
                // if(that.contArr.length == 2){
                //   that.graph.update(that.contIdArr[0], {
                //     style:{
                //       fill:that.contArr[0]
                //     }
                //   });
                //   that.contArr.shift();
                //   that.contIdArr.shift();
                // }
                that.level = ev.item.model.walletId;
                that.index = ev.item.model.walletId.levelIndex;
                that.preVertexIds = ev.item.model.preVertexIds;
                that.backVertexIds = ev.item.model.backVertexIds;
                // console.log(ev.item.model);
                // console.log(ev.item.model.hasPreIn);
                if(that.sorArr.indexOf(that.walletId) == -1){
                  $('.hideSource').css('display',"flex")
                  $('.hideS').css('display',"none");
                }else {
                  $('.hideSource').css('display',"none");
                  $('.hideS').css('display',"flex");
                }

                if(that.tarArr.indexOf(that.walletId) == -1){
                  $('.hideGo').css('display',"flex")
                  $('.hideG').css('display',"none")
                }else {
                  $('.hideGo').css('display',"none")
                  $('.hideG').css('display',"flex")
                }
                $('.hide-cc').css('display','block');
                $('.uts').css('display','none')
                $('.utg').css('display','none')
                if(ev.item.model.hasPreIn <=0){
                  $('.hideSource').css('display',"none")
                  $('.uts').css('display','flex')
                }
                if(ev.item.model.hasNextOut <=0){
                  $('.hideGo').css('display',"none")
                  $('.utg').css('display','flex')

                }
                if(ev.item.model.hasPreIn <=0 && ev.item.model.hasNextOut <=0){
                  $('.utg').css('display','flex')
                  $('.uts').css('display','flex')
                }
                // that.getData2(1)
                //that.chooseData(ev.item.model.index)
              }else if(ev.item.type == 'edge'){
                // console.log('点击了线')
              }
            }
          });
          that.graph.on('mouseenter', (ev,e)=>{
            // let event = e || window.event;
            //console.log(ev);
            // event.preventDefault();
            let items = [];
            let item1 = null
            if(ev.item.type == 'node'){
              if(ev.item.getEdges().length != 0){
                item1= ev.item.getEdges();
                item1.forEach(val=>{
                  items.push(val);
                  //console.log(val);
                  let items2 = null;
                  let items3 = null;
                  //that.graph.tooltip(val.model)
                  items2 = val.getSource();
                  items3 = val.getTarget();
                  //console.log(items2);
                  // if(items2.length != 0){
                  //   items2.forEach(val=>{
                  items.push(items2)
                  items.push(items3)
                  //   })
                  // }
                })
              }
              //console.log(ev.item.getEdges());
              let item2 = ev.item.getChildren();
              items.push(ev.item)
              //items.concat(item1)
              //console.log(ev);
              that.graph.highlightSubgraph(items);
            }
            if(ev.item.type == 'edge'){
              //console.log(ev.item);
              // ev.item.model.style.label.text = ev.item.model.value;
              let edge1 = ev.item.getSource()
              let edge2 = ev.item.getTarget();
              let edges = [];
              edges.push(edge1,edge2,ev.item);
              //console.log(edges);
              that.graph.highlightSubgraph(edges);
            }
            if(ev.item != null){
              //console.log(ev);

            }
          });
          that.graph.on('mouseleave', (ev,e)=>{
            // let event = ev || window.event;
            // console.log(ev);
            that.graph.unhighlightGraph();
          });
          that.graph.on('dblclick', (ev,e)=>{
            // let event = e || window.event;
            // console.log(ev);
            // event.preventDefault();
            //event.stopPropagation()
            $('.hide-cc').css('display',"none");
            // alert('111111')
            if(ev.item.type == 'node'){
              if(ev.item.model.entity.indexOf('实体')== -1 && ev.item.model.category == 2){
// console.log(ev.item.model.walletId);
                that.$emit('walH');
                that.$emit('txnH');

              }else {
                that.$emit('walSH');
                that.$emit('txnS');
                that.walletClick(ev.item.model.walletId);
                that.recordClick(ev.item.model.walletId);
                that.Cookies.set('specNode1',ev.item.model.walletId)
                that.Cookies.set('specNode2',"")

                that.$emit('tNode')
              }

            }
            if(ev.item.type == 'edge'){
              // console.log(ev.item);
              that.$emit('walH');
              that.$emit('txnS');
              that.$emit('tLine');
              // console.log(params.data);
              that.Cookies.set('specNode1',ev.item.model.fromWalletId)
              that.Cookies.set('specNode2',ev.item.model.toWalletId);
              // console.log('点击了线')
              // console.log(params.data.txList);
              that.linkClick(ev.item.model.txList)
            }

          });
          graph.on('dragstart', (ev)=>{
            $('.hide-cc').css('display',"none")
          });
        },
        deleteClick(){
          this.graph.remove(this.walletId)
        },
        chooseData(index){
          let that = this;
          if(that.indexS.indexOf(index) == -1){
            that.indexS.push(index)
            that.data.nodes.map(val =>{
              if(val.preIndex == index){
                let obj = {};
                obj.id = val.id;
                obj.index = val.index;
                obj.preIndex = val.preIndex;
                obj.shape = val.shape;
                obj.style = {
                  fill:'#A9ACB6',
                  stroke: null,
                  label: {
                    fill: '#fff'
                  },
                }
                that.data2.nodes.push(obj)
              }
            })
            that.data.edges.map(val =>{
              if(val.index == index){
                that.data2.edges.push(val)
              }
            })
            // console.log(that.data2);
            that.graph.read(that.data2);
          }

        },
        getData(address,direction) {
          let that = this;
          let arr = [123,123];
          // console.log(that.Cookies.get("token"));
          that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
          that.ajax({
            method: 'get',
            url: that.Config.baseUrl+'/step',
            params: {
              checkpoint:that.Cookies.get('checkpoint'),
              address: address,
              walletId: that.walletId,
              level: that.level,
              index: that.index,
              direction: direction,
              // nonce:that.nonce,
              // walletId:1,
              // preVertexIds:'',
              // backVertexIds:''
              // preVertexIds:arr
            }
          }).then(res => {
            // console.log(res);
            that.dataNew.nodes = res.data.data.vertex;
            that.linkNew = res.data.data.edge;
            that.nonce = res.data.data.vertex[0].nonce;
            // console.log(that.nonce);
            that.modifyData(res.data.data);
          })
        },
        getData2(direction) {
          let that = this;
          that.zoomNum = that.graph.getZoom();
          that.loadingM2 = true;
          console.log(that.zoomNum);
          if(direction == 1){
            if(that.tarArr.indexOf(that.walletId) == -1){
              // console.log(that.Cookies.get("token"));
              // console.log(that.preVertexIds);
              if(that.preVertexIds == undefined){
                that.preVertexIds = ''
              }
              if(that.backVertexIds == undefined){
                that.backVertexIds = ''
              }
              let arr = [];
              if(that.preVertexIds != ''){
                arr = that.preVertexIds.split(",")
              }
              arr.push(that.walletId);
              that.preVertexIds = arr.join(",")
              that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
              that.ajax({
                method: 'get',
                // url: 'http://10.0.0.33:5100/api/trace/step',
                url: that.Config.baseUrl4+'/step',
                params: {
                  checkpoint:that.Cookies.get('checkpoint'),
                  address: that.Cookies.get('key'),
                  walletId: that.walletId,
                  level: that.level,
                  index: that.index,
                  nonce:that.nonce,
                  direction: direction,
                  preVertexIds:that.preVertexIds,
                  backVertexIds:that.backVertexIds
                }
              }).then(res => {
                // console.log(res);
                that.tarArr.push(that.walletId);
                $('.hide-cc').css('display','none');
                res.data.data.vertex.forEach(val=>{
                  let flag = true;
                  that.dataNew.nodes.map(val2 => {
                    if(val.walletId == val2.id){
                      // console.log(val);
                      flag = false;
                    }
                  })
                  if(flag){
                    that.dataNew.nodes.push(val)
                  }
                })
                res.data.data.edge.forEach(val=>{
                  let flag2 = true;
                  that.dataNew.edges.map(val2 => {
                    if(val.fromWalletId == val2.fromWalletId && val.toWalletId == val2.toWalletId){
                      // console.log(val);
                      flag2 = false;
                    }
                  })
                  if(flag2){
                    that.dataNew.edges.push(val)
                  }
                })
                // res.data.data.edge.forEach(val=>{
                //   // that.dataNew.edges.push(val)
                //   if(that.dataNew.edges.indexOf(val) != -1){
                //     console.log(val);
                //   }
                // })

                let obj = {
                  edge:that.dataNew.edges,
                  vertex:that.dataNew.nodes
                }
                // console.log(obj);
                that.modifyData2(obj);
              })
            }else {
              $('.hide-cc').css('display','none');
              return false;
            }
          }else if(direction == 2){
            console.log(that.sorArr);
            if(that.sorArr.indexOf(that.walletId) == -1){
              // console.log(that.Cookies.get("token"));
              if(that.preVertexIds == undefined){
                that.preVertexIds = ''
              }
              if(that.backVertexIds == undefined){
                that.backVertexIds = ''
              }
              let arr = [];
              if(that.backVertexIds != ''){
                arr = that.backVertexIds.split(",")
              }
              arr.push(that.walletId);
              that.backVertexIds = arr.join(",")
              that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
              that.ajax({
                method: 'get',
                // url: that.Config.baseUrl+'/step',
                // url:'http://10.0.0.33:5100/api/trace/step',
                url: that.Config.baseUrl4+'/step',
                params: {
                  checkpoint: that.Cookies.get('checkpoint'),
                  address: that.Cookies.get('key'),
                  walletId: that.walletId,
                  level: that.level,
                  index: that.index,
                  nonce:that.nonce,
                  direction: direction,
                  preVertexIds:that.preVertexIds,
                  backVertexIds:that.backVertexIds
                }
              }).then(res => {
                // console.log(res);
                that.sorArr.push(that.walletId);
                $('.hide-cc').css('display','none');
                res.data.data.vertex.forEach(val=>{
                  let flag = true;
                  that.dataNew.nodes.map(val2 => {
                    if(val.walletId == val2.id){
                      // console.log(val);
                      flag = false;
                    }
                  })
                  if(flag){
                    that.dataNew.nodes.push(val)
                  }
                })
                res.data.data.edge.forEach(val=>{
                  let flag2 = true;
                  that.dataNew.edges.map(val2 => {
                    if(val.fromWalletId == val2.fromWalletId && val.toWalletId == val2.toWalletId){
                      // console.log(val);
                      flag2 = false;
                    }
                  })
                  if(flag2){
                    that.dataNew.edges.push(val)
                  }
                })
                // res.data.data.edge.forEach(val=>{
                //   that.dataNew.edges.push(val)
                // })
                let obj = {
                  edge:that.dataNew.edges,
                  vertex:that.dataNew.nodes
                }
                // console.log(obj);
                that.modifyData2(obj);
              })
            }else {
              $('.hide-cc').css('display','none');
              return false;
            }
          }

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
              item.id = item.walletId;
              //item.symbol=that.symbol[item.category];
              item.symbolSize = num;
              if (item.addressHash != undefined) {
                item.hash = item.addressHash;
              }
              if(item.category == 2 || item.category == 0){
                item.style={
                  fill: '#55a2d8',
                  stroke:'#55a2d8'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
              if(item.entity.indexOf('实体') == -1 && item.category == 2){
                item.style={
                  fill: '#5FB98F',
                  stroke:'#5FB98F'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
              if(item.category == 1){
                item.style={
                  fill: '#A9ACB6',
                  stroke:'#A9ACB6'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
              // item.x = 0;
              // item.y = 100;
            });
            that.dataNew.nodes.forEach((value)=>{
              let arr = that.Cookies.get('exchangeId2').split(",");
              let arr2 = that.Cookies.get('exchangeTag2').split(",");
              let arr1 = arr.map(Number);
              if(arr1.indexOf(value.walletId) != -1){
                // value.entity = that.Cookies.get('exchangeTag2');
                value.entity = arr2[arr1.indexOf(value.walletId)];
                value.style={
                  fill: '#FFB700',
                  stroke:'#FFB700'
                };
                value.label={ //标签样式
                  fill:'#ffffff',
                }
                console.log(value)
              }
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
            // console.log(data);
            // console.log(that.dataNew);
            let obj = {
              value:JSON.parse(JSON.stringify(that.dataNew)),
              to:JSON.parse(JSON.stringify(that.tarArr)),
              sor:JSON.parse(JSON.stringify(that.sorArr)),
            }
            arrtmc = JSON.parse(that.mocbb)
            console.log(arrtmc);
            console.log(that.mocbb);
            let arr2 = [];
            if(arrtmc.length > 0){
              for(let i =0;i<=that.stepIndex-1;i++){
                console.log(i);
                console.log(arrtmc[i]);
                arr2.push(arrtmc[i])
              }
            }
            console.log(arr2);
            arrtmc=arr2
            arrtmc.push(obj);
            that.mocbb = JSON.stringify(arrtmc)
            that.stepIndex++;
            // console.log(arrtmc);
            // console.log(that.stepIndex);
            // console.log(arrtmc);

            that.graph.read(that.dataNew);
            const node1 = that.graph.find(that.walletId);
            that.graph.update(node1, {
              style:{
                fill:'red'
              }
            });
            let tf = that.graph.find(that.walletId);
            console.log(tf);
            let ufc = that.graph.getDomPoint({
              x: tf.model.x,
              y: tf.model.y
            });
            console.log(ufc);
            that.graph.translate(that.domX-ufc.x,that.domY-ufc.y);
            that.graph.zoom(that.zoomNum);
            that.loadingM2 = false;
            that.items = that.graph.getItems();
            // console.log(that.items);
          }
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
              item.id = item.walletId;
              //item.symbol=that.symbol[item.category];
              item.symbolSize = num;
              if (item.addressHash != undefined) {
                item.hash = item.addressHash;
              }
              if(item.category == 2){
                item.style={
                  fill: '#55a2d8',
                  stroke:'#55a2d8'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
              if(item.entity.indexOf('实体') == -1 && item.category == 2){
                item.style={
                  fill: '#5FB98F',
                  stroke:'#5FB98F'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
              if(item.category == 1){
                item.style={
                  fill: '#A9ACB6',
                  stroke:'#A9ACB6'
                };
                item.label={ //标签样式
                  fill:'#ffffff',
                }
              }
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
            // console.log(data);
            that.dataNew.nodes = data.vertex;
            that.dataNew.edges = data.edge;
            that.startChart();
          }
        },
        walletClick(id){
          let that = this;
          // console.log(id)
          that.$emit('walletClick',id)
        },
        //交易记录
        recordClick(id){
          let that = this;
          that.$emit('recordClick',id)
        },
        linkClick(ids){
          let str = "";
          if(ids.length > 0){
            let arr = [];
            ids.forEach((value)=>{
              arr.push(value.txId)
            })
            str = arr.join(',');
            // console.log(str);
          }
          this.$emit('linkClick',str)
        },
        //获取修改的标签
        getTag(){
          // console.log("修改了白噢钱")
          let that = this;
          // console.log(that.Cookies.get('exchangeId2'));
          // console.log(that.Cookies.get('exchangeTag2'));
          let arr = that.Cookies.get('exchangeId2').split(",");
          let arr2 = that.Cookies.get('exchangeTag2').split(",");
          let arr1 = arr.map(Number);
          that.dataNew.nodes.forEach((value)=>{
            let st = value.walletId.toString();
            console.log(arr.indexOf(value.walletId));
            if(arr1.indexOf(value.walletId)!= -1){
              // value.entity = that.Cookies.get('exchangeTag2');
              value.entity = arr2[arr1.indexOf(value.walletId)];
              value.style={
                fill: '#FFB700',
                stroke:'#FFB700'
              };
              value.label={ //标签样式
                fill:'#ffffff',
              }
              let obj = {};
              obj.addressId = value.walletId;
              obj.tag = that.Cookies.get('exchangeTag2');
              that.tags.push(obj)
              console.log(value)
            }
          });
          that.graph.read(that.dataNew);
          // that.backwardData.vertex.forEach((value)=>{
          //   if(value.walletId == that.Cookies.get('exchangeId')){
          //     value.entity = that.Cookies.get('exchangeTag');
          //     value.itemStyle={
          //       color:"#FFB700",
          //       borderWidth:0
          //     };
          //     value.label={ //标签样式
          //       color:'#ffffff',
          //       show:true
          //     }
          //     console.log(value)
          //   }
          // });
          // that.forwardData.vertex.forEach((value)=>{
          //   if(value.walletId == that.Cookies.get('exchangeId')){
          //     value.entity = that.Cookies.get('exchangeTag');
          //     value.itemStyle={
          //       color:"#FFB700",
          //       borderWidth:0
          //     };
          //     value.label={ //标签样式
          //       color:'#ffffff',
          //       show:true
          //     }
          //     console.log(value)
          //   }
          // });
          // for(let i =0;i<that.finalData.vertex.length;i++){
          //   if(that.finalData.vertex[i].walletId == that.Cookies.get('exchangeId')){
          //     that.finalData.vertex[i].entity = that.Cookies.get('exchangeTag');
          //         console.log(that.finalData.vertex[i])
          //       }
          // }
          // console.log(that.finalData);
          // that.allClick()
          // $('.btn1').addClass('btnSel').siblings().removeClass('btnSel')
        },
        //
        hideClick(){
          let that = this;
          that.$emit('walH');
          that.$emit('txnH');
          that.$emit('closeAll');
          $('.hide-cc').css('display','none');
        },
        stavePhoto(){
          let that = this;
          that.$emit('stavePhoto');
        },
        getSave(key){
          console.log(key);
          let that = this;
          console.log(that.dataNew);
          let graphId = '';
          if(that.Cookies.get('graphId2') != null && that.Cookies.get('graphId2') != undefined){
            graphId = that.Cookies.get('graphId2')
          }else {
            graphId = ''
          }
          let data={
            address:that.Cookies.get('key'),
              // nonce:that.nonce,
              nodes:JSON.stringify(that.dataNew.nodes),
              edges:JSON.stringify(that.dataNew.edges),
              name:key,
              type:2,
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
              that.$emit('successClick');
              that.Cookies.set('graphId2',res.data.data);
            }else {
              that.$emit('failClick',res.data.message)
            }
          })
        },
        getPoint(id){
          let that = this;
          let data = {
            topoId:id
          }
          that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
          that.ajax({
            method: 'post',
            url: that.Config.baseUrl2+'/member/load/graph',
            data:that.qs.stringify(data)
          }).then(res => {
            console.log(res);
            if(res.data.code=='0000'){
              console.log(res.data);
              that.dataNew.nodes = JSON.parse(res.data.data.nodes);
              that.dataNew.edges = JSON.parse(res.data.data.edges);
              that.startChart();
            }
          })
        },
        //收起去向
        hideGo(){
          let that = this;
          that.zoomNum = that.graph.getZoom();
          console.log(that.zoomNum);
          // console.log(that.graph.getNodes());
          let arr = [];
          that.graph.getNodes().forEach(value => {
           if(value.model.preVertexIds != undefined){
             if(value.model.preVertexIds.indexOf(that.walletId) != -1){
               if(value.id != that.walletId){
                 // console.log(value);
                 arr.push(value.id);
               }
             }
           }
          })
          // console.log(arr);
          let indexArr = [];
          arr.map(val=>{
            // that.graph.remove(val)
            that.dataNew.nodes.map((val2,index)=>{
              if(val2.id == val){
                indexArr.push(val);
              }
            })
          })
          // console.log(indexArr);
          indexArr.forEach(val=>{
            that.dataNew.nodes.splice(that.dataNew.nodes.indexOf(val),1);
          })

          let edgeArr = [];
          // that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
          // arr.forEach(val=>{
          //   that.dataNew.edges.forEach((val2,index)=>{
          //     if(val2.toWalletId != that.walletId){
          //       edgeArr.push(val);
          //     }
          //   })
          // })
          // console.log(edgeArr);
          arr.forEach(val=>{
            that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
          })
          // console.log(that.dataNew.nodes);
          // console.log(that.dataNew.edges);
          $('.hide-cc').css('display','none');
          $('.hideGo').css('display',"none")
          $('.utg').css('display','flex');
          that.tarArr.splice(that.tarArr.indexOf(that.walletId),1);
          // let obj = {
          //   edge:that.dataNew.edges,
          //   vertex:that.dataNew.nodes
          // }
          // console.log(obj);
          // that.modifyData2(obj);
          let  ar1 = [];
          let  ar2 = [];
          if(that.tarArr.length > 0){
            ar1 = JSON.parse(JSON.stringify(that.tarArr)).pop();
          }else {
            ar1 = that.tarArr;
          }
          if(that.sorArr.length > 0){
            ar2 = JSON.parse(JSON.stringify(that.sorArr)).pop();;
          }else {
            ar2 = that.sorArr;
          }
          let obj = {
            value:JSON.parse(JSON.stringify(that.dataNew)),
            to:JSON.parse(JSON.stringify(that.tarArr)),
            sor:JSON.parse(JSON.stringify(that.sorArr)),
          }
          arrtmc = JSON.parse(that.mocbb)
          console.log(arrtmc);
          console.log(that.mocbb);
          let arr2 = [];
          if(arrtmc.length > 0){
            for(let i =0;i<=that.stepIndex-1;i++){
              console.log(i);
              console.log(arrtmc[i]);
              arr2.push(arrtmc[i])
            }
          }
          console.log(arr2);
          arrtmc=arr2
          arrtmc.push(obj);
          that.mocbb = JSON.stringify(arrtmc)
          that.stepIndex++;
          that.graph.read(that.dataNew);
          let tf = that.graph.find(that.walletId);
          console.log(tf);
          let ufc = that.graph.getDomPoint({
            x: tf.model.x,
            y: tf.model.y
          });
          console.log(ufc);
          that.graph.translate(that.domX-ufc.x,that.domY-ufc.y);
          console.log(that.stepGroups);
        },
        //收起来源
        hideCome(){
          let that = this;
          that.zoomNum = that.graph.getZoom();
          console.log(that.zoomNum);
          console.log(that.graph.getNodes());
          let arr = [];
          that.graph.getNodes().forEach(value => {
            if(value.model.backVertexIds != undefined){
              if(value.model.backVertexIds.indexOf(that.walletId) != -1){
                if(value.id != that.walletId){
                  console.log(value);
                  arr.push(value.id);
                }
              }
            }
          })
          console.log(arr);
          let indexArr = [];
          let edgeArr = [];

          arr.map(val=>{
            // that.graph.remove(val)
            that.dataNew.nodes.map((val2,index)=>{
              if(val2.id == val){
                indexArr.push(val2);
              }
            })
            that.dataNew.edges.map((val3,index)=>{
              if(val3.fromWalletId == val){
                edgeArr.push(val3);
              }
            })
          })

          console.log(indexArr);
          indexArr.forEach(val=>{
            console.log(that.dataNew.nodes.indexOf(val));
            that.dataNew.nodes.splice(that.dataNew.nodes.indexOf(val),1);
          })
          console.log(edgeArr);
          edgeArr.forEach(val=>{
            that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
          })
          console.log(that.dataNew.nodes);
          console.log(that.dataNew.edges);
          $('.hide-cc').css('display','none');
          $('.hideS').css('display',"none")
          $('.utg').css('display','flex');
          that.sorArr.splice(that.sorArr.indexOf(that.walletId),1);
          let  ar1 = [];
          let  ar2 = [];
          if(that.tarArr.length > 0){
            ar1 = JSON.parse(JSON.stringify(that.tarArr)).pop();
          }else {
            ar1 = that.tarArr;
          }
          if(that.sorArr.length > 0){
            ar2 = JSON.parse(JSON.stringify(that.sorArr)).pop();;
          }else {
            ar2 = that.sorArr;
          }
          let obj = {
            value:JSON.parse(JSON.stringify(that.dataNew)),
            to:JSON.parse(JSON.stringify(that.tarArr)),
            sor:JSON.parse(JSON.stringify(that.sorArr)),
          }
          arrtmc = JSON.parse(that.mocbb)
          console.log(arrtmc);
          console.log(that.mocbb);
          let arr2 = [];
          if(arrtmc.length > 0){
            for(let i =0;i<=that.stepIndex-1;i++){
              console.log(i);
              console.log(arrtmc[i]);
              arr2.push(arrtmc[i])
            }
          }
          console.log(arr2);
          arrtmc=arr2
          arrtmc.push(obj);
          that.mocbb = JSON.stringify(arrtmc)
          that.stepIndex++;
          console.log(that.stepGroups);
          that.graph.read(that.dataNew);
          let tf = that.graph.find(that.walletId);
          console.log(tf);
          let ufc = that.graph.getDomPoint({
            x: tf.model.x,
            y: tf.model.y
          });
          console.log(ufc);
          that.graph.translate(that.domX-ufc.x,that.domY-ufc.y);
        },
        //删除节点
        deleteNode(){
          let that = this;
          that.zoomNum = that.graph.getZoom();
          console.log(that.zoomNum);
          console.log(that.graph.getNodes());
          let arr = [];
          that.graph.getNodes().forEach(value => {
            console.log(value.model.backVertexIds);
            console.log(that.walletId);
            if(value.model.backVertexIds != undefined && value.model.backVertexIds != ''){
              if(value.model.backVertexIds.indexOf(that.walletId) != -1 || value.id == that.walletId){
                  console.log(value);
                  arr.push(value.id);
              }
            }
          })
          console.log(arr);
          let indexArr = [];
          let edgeArr = [];

          arr.map(val=>{
            // that.graph.remove(val)
            that.dataNew.nodes.map((val2,index)=>{
              if(val2.id == val){
                indexArr.push(val2);
              }
            })
            that.dataNew.edges.map((val3,index)=>{
              if(val3.fromWalletId == val){
                edgeArr.push(val3);
              }
            })
          })

          // console.log(indexArr);
          // console.log(edgeArr);
          indexArr.forEach(val=>{
            console.log(that.dataNew.nodes.indexOf(val));
            that.dataNew.nodes.splice(that.dataNew.nodes.indexOf(val),1);
          })
          console.log(edgeArr);
          edgeArr.forEach(val=>{
            that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
            // console.log(that.dataNew.edges);
          })
          // console.log(that.dataNew.nodes);
          // console.log(that.dataNew.edges);
          $('.hide-cc').css('display','none');
          $('.hideS').css('display',"none")
          $('.utg').css('display','flex');
          that.sorArr.splice(that.sorArr.indexOf(that.walletId),1);
          let  ar1 = [];
          let  ar2 = [];
          if(that.tarArr.length > 0){
            ar1 = JSON.parse(JSON.stringify(that.tarArr)).pop();
          }else {
            ar1 = that.tarArr;
          }
          if(that.sorArr.length > 0){
            ar2 = JSON.parse(JSON.stringify(that.sorArr)).pop();;
          }else {
            ar2 = that.sorArr;
          }
          let obj = {
            value:JSON.parse(JSON.stringify(that.dataNew)),
            to:JSON.parse(JSON.stringify(that.tarArr)),
            sor:JSON.parse(JSON.stringify(that.sorArr)),
          }
          arrtmc = JSON.parse(that.mocbb)
          console.log(arrtmc);
          console.log(that.mocbb);
          let arr21 = [];
          if(arrtmc.length > 0){
            for(let i =0;i<=that.stepIndex-1;i++){
              console.log(i);
              console.log(arrtmc[i]);
              arr21.push(arrtmc[i])
            }
          }
          console.log(arr21);
          arrtmc=arr21
          arrtmc.push(obj);
          that.mocbb = JSON.stringify(arrtmc)
          that.stepIndex++;
          // console.log(that.stepGroups);

          //////////////
          // console.log(that.graph.getNodes());
          let arr2 = [];
          that.graph.getNodes().forEach(value => {
            if(value.model.preVertexIds != undefined && value.model.preVertexIds != ""){
              if(value.model.preVertexIds.indexOf(that.walletId) != -1 || value.id == that.walletId){
                  console.log(value);
                  arr2.push(value.id);
              }
            }
          })
          // console.log(arr2);
          let indexArr2 = [];
          let edgeArr2 = [];
          arr2.map(val=>{
            // that.graph.remove(val)
            that.dataNew.nodes.map((val2,index)=>{
              if(val2.id == val){
                indexArr2.push(val);
              }
            })
            that.dataNew.edges.map((val3,index)=>{
              if(val3.toWalletId == val){
                edgeArr2.push(val3);
              }
            })
          })
          // console.log(indexArr);
          indexArr2.forEach(val=>{
            that.dataNew.nodes.splice(that.dataNew.nodes.indexOf(val),1);
          })

          // let edgeArr2 = [];
          // that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
          // arr.forEach(val=>{
          //   that.dataNew.edges.forEach((val2,index)=>{
          //     if(val2.toWalletId != that.walletId){
          //       edgeArr.push(val);
          //     }
          //   })
          // })
          console.log(edgeArr2);
          // arr2.forEach(val=>{
          //   that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
          // })
          edgeArr2.forEach(val=>{
            that.dataNew.edges.splice(that.dataNew.edges.indexOf(val),1);
            console.log(that.dataNew.edges);
          })
          console.log(that.dataNew.nodes);
          console.log(that.dataNew.edges);
          $('.hide-cc').css('display','none');
          $('.hideGo').css('display',"none")
          $('.utg').css('display','flex');
          that.tarArr.splice(that.tarArr.indexOf(that.walletId),1);
          // let obj = {
          //   edge:that.dataNew.edges,
          //   vertex:that.dataNew.nodes
          // }
          // console.log(obj);
          // that.modifyData2(obj);
          that.graph.read(that.dataNew);
          console.log(that.stepGroups);
          // that.graph.read(that.dataNew);
        },
        //上一步
        upStep(){
          let that = this;
          that.zoomNum = that.graph.getZoom();
          console.log(that.zoomNum);
          console.log(that.stepIndex);
          console.log(arrtmc);
          if(that.stepIndex >=2){
            that.stepIndex--;
            console.log(arrtmc[that.stepIndex]);
            that.tarArr = arrtmc[that.stepIndex-1].to;
            that.sorArr = arrtmc[that.stepIndex-1].sor;
            that.dataNew = arrtmc[that.stepIndex-1].value;
            that.graph.read(arrtmc[that.stepIndex-1].value);
            that.graph.zoom(that.zoomNum);
            console.log(arrtmc[that.stepIndex].sor);
            console.log(that.tarArr);
            console.log(that.sorArr);
            console.log(that.stepIndex);
            console.log(arrtmc);
            console.log(arrtmc[that.stepIndex - 1].value);
            that.mocbb = JSON.stringify(arrtmc)
          }else {
            that.stepIndex = 1;
            return false;
          }
        },
        //
        saveImage(imgdate,filename){
          // let idt = $("#mountNode").find("canvas").attr('id');
          // console.log(idt);
          // var canvas = document.getElementById(idt);
          // $('#'+idt).css('background','black')
          // var context = canvas.getContext("2d");
          // function dataURLtoFile(dataurl, filename = 'file') {
          //   let arr = dataurl.split(',')
          //   let mime = arr[0].match(/:(.*?);/)[1]
          //   let suffix = mime.split('/')[1]
          //   let bstr = atob(arr[1])
          //   let n = bstr.length
          //   let u8arr = new Uint8Array(n)
          //   while (n--) {47
          //     u8arr[n] = bstr.charCodeAt(n)
          //   }
          //   return new File([u8arr], `${filename}.${suffix}`, {
          //     type: mime
          //   })
          // }
          // var base64Img = 'data:image/bmp;base64,LASDJFLKAJDFLKASDJFL...' // base64编码的图片
          // var imgFile = dataURLtoFile(canvas.toDataURL("image/png"));
          // let evt = document.createEvent("HTMLEvents");
          // evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
          // let aLink = document.createElement('a');
          // aLink.download = 'qwe';
          // aLink.href = URL.createObjectURL(imgFile);
          // aLink.click();
          // console.log(imgFile);
          let idt = $("#mountNode").find("canvas").attr('id');
          console.log(idt);
          var canvas = document.getElementById(idt);
          function saveAsPNG(canvas) {
            return canvas.toDataURL("image/png");
          }
          function downLoad(url){
            var oA = document.createElement("a");
            oA.download = '';// 设置下载的文件名，默认是'下载'
            oA.href = url;
            document.body.appendChild(oA);
            oA.click();
            oA.remove(); // 下载之后把创建的元素删除
          }
          downLoad(saveAsPNG(canvas));
        },
        downStep(){
          let that = this;
          that.zoomNum = that.graph.getZoom();
          console.log(that.zoomNum);
          console.log(that.stepIndex);
          console.log(arrtmc);
          if(that.stepIndex >=1 && that.stepIndex < arrtmc.length){
            that.stepIndex++;
            console.log(arrtmc[that.stepIndex]);
            that.tarArr = arrtmc[that.stepIndex-1].to;
            that.sorArr = arrtmc[that.stepIndex-1].sor;
            that.dataNew = arrtmc[that.stepIndex-1].value;
            that.graph.read(arrtmc[that.stepIndex-1].value);
            that.graph.zoom(that.zoomNum);
            console.log(arrtmc[that.stepIndex].sor);
            console.log(that.tarArr);
            console.log(that.sorArr);
            console.log(that.stepIndex);
            console.log(arrtmc);
            console.log(arrtmc[that.stepIndex - 1].value);
            that.mocbb = JSON.stringify(arrtmc)
          }else {
            that.stepIndex = arrtmc.length;
            return false;
          }
        }

      },
      mounted(){
        let that = this;
        if(that.Cookies.get('cl') == 2){
          $("#mountNode").width(document.documentElement.clientWidth);
          $("#mountNode").height(document.documentElement.clientHeight-113);
          window.addEventListener("resize", () => {
            $("#mountNode").css('width',$(window).width() + 'px');
            $("#mountNode").css('height',$(window).height()-113 + 'px');
            // $("#chart").css('height',$(window).height()-113 +'px');
          });

          if(that.Cookies.get('topoClick') == 2){
            // that.tabShow = that.Cookies.get('topoClick')
            that.getPoint(that.Cookies.get('keyId'));
            // $('.tab span').eq(3).addClass('tabSel').siblings().removeClass('tabSel')
            that.Cookies.remove('topoClick')
          }else if(that.Cookies.get('topoClick') == 1){
            // that.tabShow = that.Cookies.get('topoClick')
            that.getData(that.Cookies.get('key'),1)
          }else {
            that.getData(that.Cookies.get('key'),1)
          }
          document.oncontextmenu = function(){
            return false;
          }
        }
        that.Cookies.set('exchangeTag2','');
        that.Cookies.set('exchangeId2','');
        that.Cookies.set('exchangeTag','');
        $('.utg').css('display','none')
        $('.uts').css('display','none')
        //this.startChart()
      }
    }
</script>

<style scoped>
#mountNode{
  background: #191a1d;
}
.hide-cc{
  width: 144px;
  background: #24262C;
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  padding: 7px 0;
  height: 137px;
}
.hide-cc div{
  width: 100%;
  display: flex;
  justify-content: center;
  height: 45px;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #ffffff;
  position: relative;
}
.hideSource{
  border-bottom: 1px solid #1A1C20;
  cursor: pointer;

}
.hideGo{
  cursor: pointer;
  border-bottom: 1px solid #1A1C20;

}
  .hide-cc div:hover{
    color: #00A0E9;
  }
  .nodata{
    /*background:  !important;*/
    color: #8E8E93 !important;
    cursor: default !important;
  }
  .stavePhoto{
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
    right: 32px;
    top: 25px;
    cursor: pointer;
    z-index: 99;
  }
  .mtm{
    position: absolute !important;
    left: -10px !important;
    top: 0px !important;
    height: 35px !important;
    display: flex !important;
    justify-content: flex-start !important;
  }
</style>
