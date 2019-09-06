<template>
  <div class="trace" @click="closeAll">
    <txnRecord v-show="txnShow" v-on:txnH="txnH"  ref="txnRecord" v-on:walH="walH"></txnRecord>
    <walletVue v-show="walShow" v-on:walH="walH" ref="walletVue" v-on:getTag="getTag"></walletVue>
    <traceMin v-on:walSH="walSH" v-on:walH="walH" v-on:txnS="txnS" v-on:txnH="txnH" ref="traceMin" v-on:walletClick="walletClick" v-on:recordClick="recordClick" v-on:linkClick="linkClick" v-on:tNode="tNode" v-on:tLine="tLine"></traceMin>
  </div>
</template>

<script>
    import txnRecord from './../traceMin/txnRecord';
    import walletVue from './../traceMin/walletVue';
    import traceMin from './../trace/traceMin2'
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
        walSH(){
          console.log('111')

          this.walShow = true;
        },
        walH(){
          this.walShow = false;
        },
        txnS(){
          this.txnShow = true;
          // $('.traceMin').animate({minHeight:'320px'},3500);
        },
        txnH(){
          this.txnShow = false;
        },
        getSearch(key){
          this.$refs.traceMin.getSearch();
          this.walH();
          this.txnH();
        },
        walletClick(id){
          console.log(id);
          this.$refs.walletVue.walletClick(id);
        },
        recordClick(id){
          console.log(id);
          this.$refs.txnRecord.recordClick(id)
        },
        linkClick(str){
          console.log(str);
          this.$refs.txnRecord.linkClick(str)

        },
        closeAll(){
          this.$refs.txnRecord.closeAll();
          this.$refs.walletVue.closeAll();
          $('.mc').removeClass("umm");
          this.$message.closeAll()
        },
        tNode(){
          this.$refs.txnRecord.tNode();
        },
        tLine(){
          this.$refs.txnRecord.tLine();
        },
        getTag(){
          this.$refs.traceMin.getTag();
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
