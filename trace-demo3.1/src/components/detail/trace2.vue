<template>
  <div class="trace" @click="closeAll">
    <txnRecord v-show="txnShow" v-on:txnH="txnH"  ref="txnRecord" v-on:walH="walH"></txnRecord>
    <walletVue v-show="walShow" v-on:walH="walH" ref="walletVue" v-on:getTag="getTag"></walletVue>
    <traceMin v-on:walSH="walSH" v-on:walH="walH" v-on:txnS="txnS" v-on:txnH="txnH" ref="traceMin" v-on:walletClick="walletClick" v-on:recordClick="recordClick" v-on:linkClick="linkClick" v-on:tNode="tNode" v-on:tLine="tLine" v-on:stavePhoto="stavePhoto" v-on:successClick="successClick" v-on:closeAll="closeAll" v-on:failClick="failClick"></traceMin>
  </div>
</template>

<script>
    import txnRecord from './../traceMin/txnRecord';
    import walletVue from './../traceMin/walletVue2';
    import traceMin from './../antV'
    export default {
      name: "trace",
      components:{
        txnRecord,walletVue,traceMin
      },
      data(){
        return {
          walShow:false,
          txnShow:false,
          txnLoad:true,
        }
      },
      methods:{
        //钱包显示
        walSH(){
          console.log('111')

          this.walShow = true;
        },
        //钱包隐藏
        walH(){
          this.walShow = false;
        },
        //交易显示
        txnS(){
          this.txnShow = true;
        },
        //交易隐藏
        txnH(){
          this.txnShow = false;
        },
        //开始搜索
        getSearch(key){
          this.$refs.traceMin.getSearch();
          this.walH();
          this.txnH();
        },
        //点击查看钱包信息
        walletClick(id){
          console.log(id);
          this.$refs.walletVue.walletClick(id);
        },
        //点击参看额度信息
        recordClick(id){
          console.log(id);
          this.$refs.txnRecord.recordClick(id)
        },
        //点击链接
        linkClick(str){
          console.log(str);
          this.$refs.txnRecord.linkClick(str)

        },
        //关闭全部
        closeAll(){
          this.$refs.txnRecord.closeAll();
          this.$refs.walletVue.closeAll();
          $('.mc').removeClass("umm");
          this.$message.closeAll()
        },
        //点击点
        tNode(){
          this.$refs.txnRecord.tNode();
        },
        //点击线
        tLine(){
          this.$refs.txnRecord.tLine();
        },
        //开始切换
        getTag(){
          this.$refs.traceMin.getTag();
        },
        //保存图谱
        stavePhoto(){
          let that = this;
          that.$emit('stavePhoto');
        },
        //开始存储
        getSave(key){
          let that = this;
          console.log(key);
          that.$refs.traceMin.getSave(key);
        },
        //成功
        successClick(){
          let that = this;
          that.$emit('successClick')
        },
        //失败
        failClick(message){
          let that = this;
          that.$emit('failClick',message)
        }
      },
      mounted(){
        console.log("2222222")
      }
    }
</script>

<style scoped>
  .trace{
    /*background: red;*/
    position: relative;
    box-sizing: border-box;
  }
</style>
