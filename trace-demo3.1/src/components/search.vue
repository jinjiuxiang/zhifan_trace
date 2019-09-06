<template>
  <div class="search-box" @click="closeAll">
      <div class="user-info"  @click.stop>
        <span class="span1" @click="userClick">{{username}}&nbsp;  <img src="./../../static/img/down.png" alt=""></span>
        <!--<el-dropdown size="mini" split-button type="primary" @command="handleCommand">-->
          <!--自定义标注-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item command="import">导入</el-dropdown-item>-->
            <!--<el-dropdown-item command="look">查看</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
          <!--<span class="esc" @click="getEsc">退出</span>-->
        <div class="rightHide" v-show="rightHide">
          <span @click="changePwd($event)">修改密码</span>
          <span @click="getEsc">退出登录</span>
        </div>
      </div>
      <div class="search-iamge">
        <img src="./../assets/3.svg" alt="">
      </div>
      <div class="search-input">
        <input type="password" style="display: none">
        <input class="input" type="text" onfocus="this.type='text'" autocomplete="off" v-model="key" @keyup.enter="startSearch" placeholder="请输入要追踪的地址">
        <div @click="startSearch">
          <img src="./../assets/search.svg" alt="">
        </div>
        <div class="alet" v-show="aletShow">
          <img class="close" src="./../assets/close.png" alt="">
          <span class="aletText">{{aletText}}</span>
          <img class="cancel" @click="xClick" src="./../assets/cancel.png" alt="">
        </div>
      </div>
      <div class="descBox">
        <div class="descMin1">
          <span class="title">查询记录</span>
          <div class="descMin1Box" v-show="recordShow">
            <div class="uf" style="margin: 40px auto" v-show="recordList.length == 0">暂无查询记录</div>
            <div class="descMin1Box1" v-show="recordList.length > 0">
              <p class="hash" v-for="site in recordList"><span @click="hashClick(site)">{{site}}</span></p>
            </div>
            <div class="descMin1All" v-show="recordhShow">
              <span v-show="recordAllShow" @click="recordAllClick($event)">展开 <img src="./../../static/img/down.png" alt=""></span>
              <span v-show="!recordAllShow" @click="recordHideClick($event)">收起 <img src="./../../static/img/up.png" alt=""></span>
            </div>
          </div>

        </div>
        <!---->
        <div class="descMin2">
          <span class="title">我的图谱</span>
          <p class="header" v-show="topoShow && topoList.length > 0">
            <span>名称</span>
            <span>更新时间</span>
          </p>
          <div class="descMin2Box" v-show="topoShow">
            <div class="descMin1Box2">
              <div class="uf" style="margin: 40px auto" v-show="topoList.length == 0">暂无保存图谱</div>
              <p class="case" v-for="site in topoList" v-show="topoList.length > 0">
                <span class="caseName hash" @click="topoClick(site.graphType,site.searchHash,site.graphId)">{{site.name}}</span>
                <span class="caseTime">{{site.createTime}}</span>
              </p>
            </div>
            <div class="descMin1All" v-show="topohShow">
              <span v-show="topoAllShow" @click="topoAllClick">展开 <img src="./../../static/img/down.png" alt=""></span>
              <span v-show="!topoAllShow" @click="topoHideClick">收起 <img src="./../../static/img/up.png" alt=""></span>
            </div>
          </div>

        </div>
      </div>
    <span class="fot"><span>Copyright 2019 北京知帆科技有限公司 版权所有 京ICP备17074962号</span>
      <span style="cursor: pointer" @click="linkClick"><img src="./../assets/img/min.jpg" alt="">京公网安备 11010802028427号</span></span>

    <!--弹出框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <!--<iframe name="message" style="display: none"></iframe>-->
        <form id="addBillForm" enctype="multipart/form-data">
             <input type="file" name="fileUpload" accept="text/plain" multiple />
             <button type="button" id="fileUpload" @click="tt">上传</button>
        </form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <div class="changePwd" v-show="changePwd2">
      <div class="pwdBox">
        <span class="title2">修改密码</span>
        <span class="label">请输入原密码</span>
        <input type="password" class="pwdInput" v-model="oldPwd" @blur="oldPwdCheck" @focus="oldPwdCheck2">
        <span class="newText" v-show="tS1">该字段不能为空</span>
        <span class="label">请输入新密码</span>
        <input type="password" class="pwdInput" v-model="newPwd" @blur="newPwdCheck" @focus="newPwdCheck2">
        <span class="newText" v-show="tS2">该字段不能为空</span>
        <span class="newText" v-show="tS3">至少8个字符，至少包含数字和英文字母两种</span>
        <!--<span class="newText" v-show="tS6">修改的密码两次输入不一致</span>-->
        <span class="label">确认新密码</span>
        <input type="password" class="pwdInput" v-model="checkPwd" @blur="checkPwdCheck" @focus="checkPwdCheck2">
        <span class="newText" v-show="tS4">该字段不能为空</span>
        <span class="newText" v-show="tS5">至少8个字符，至少包含数字和英文字母两种</span>
        <span class="newText" v-show="tS6">修改的密码两次输入不一致</span>
        <div class="btns">
          <span class="true" @click="changePwdClick">确定</span>
          <span class="false" @click="cancelClick">取消</span>
        </div>
        <img class="tf" @click="cancelClick" src="./../assets/img/hold.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
    // import './../assets/js/jquery'
    import bus from './../assets/eventBus'
    export default {
        name: "search",
        data(){
          return {
            key:"",
            username:"",
            dialogVisible: false,
            fileList:[],
            importFileUrl:this.Config.baseUrl + '/fileImport',
            token:"",
            aletShow:false,
            aletText:'',
            topoShow:true,
            recordShow:true,
            recordAllShow:true,
            topoAllShow:true,
            recordList:[],
            topoList:[],
            recordhShow:false,
            topohShow:false,
            oldPwd:'',
            newPwd:'',
            checkPwd:'',
            changePwd2:false,
            rightHide:false,
            tS1:false,
            tS2:false,
            tS3:false,
            tS4:false,
            tS5:false,
            tS6:false,
          }
        },
        methods:{
          //开始搜索
          startSearch(){
            let that = this;
            if(that.key != ""){
              that.checkKey(that.key)
              // that.Cookies.set("key",that.key);
              // that.$router.push({name:"detail"})
            }
          },
          //退出
          getEsc(){
            let that = this;
            that.$confirm('确认退出？')
              .then(_ => {
                that.Cookies.remove("username");
                that.Cookies.remove("password");
                that.Cookies.remove("key");
                that.Cookies.remove("token");
                that.$router.push({name:"login"})
              })
              .catch(_ => {});
          },
          //点击上传窗口
          handleCommand(command) {
            let that = this;
            if(command == "import"){
              that.dialogVisible = true
            }else {
              that.$router.push({name:"detail"})
            }
          },
          //退出登陆
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          //上传操作
          tt(){
            let that = this;
            //初始化FormData函数，传入的是一个form
            var formData = new FormData($("#addBillForm")[0]);
            //formData.append('sgid',_sgId); 添加表单之外的参数
            $.ajax({
              url: that.Config.baseUrl + '/fileImport',
              type: 'POST',
              headers: {
                token: that.Cookies.get('token')
              },
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              success: function (data) {
                //console.log(data);
                if(data.code == "0000"){
                  that.$message.warning(data.data.sucessNum + " 条成功 " +" , "+ data.data.errNum + " 条失败 ");
                  that.dialogVisible = false;
                }
              },
              error: function (data) {
                //console.log(data);
              }
            })
          },
          //搜索核实
          checkKey(key){
            let that = this;
            $('.input').blur();

            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:"get",
              url:that.Config.baseUrl + "/check",
              params:{
                address:key
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                if(res.data.data.status == 0){
                    that.Cookies.remove('graphId');
                    that.Cookies.remove('graphId2');
                  that.Cookies.set("key",key);
                  that.Cookies.set("checkpoint",res.data.data.checkpoint);
                  that.$router.push({name:"detail"})
                }else if(res.data.data.status == 1){
                  that.aletText = '暂无此地址信息，请尝试搜索其他地址';
                  that.aletShow = true;
                }else {
                  that.aletText = '请输入正确的数字货币地址';
                  that.aletShow = true;
                }
              }
            })
          },
          checkKey2(key){
            let that = this;
            $('.input').blur();

            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:"get",
              url:that.Config.baseUrl + "/check",
              params:{
                address:key
              }
            }).then(res=>{
              console.log(res);
              if(res.data.code == "0000"){
                if(res.data.data.status == 0){
                  that.Cookies.set("key",key);
                  that.Cookies.set("checkpoint",res.data.data.checkpoint);
                  that.$router.push({name:"detail"})
                }else if(res.data.data.status == 1){
                  that.aletText = '暂无此地址信息，请尝试搜索其他地址';
                  that.aletShow = true;
                }else {
                  that.aletText = '请输入正确的数字货币地址';
                  that.aletShow = true;
                }
              }
            })
          },
          //点击X
          xClick(){
            this.aletShow = false;
          },
          //关闭弹窗
          closeAll(){
            this.rightHide = false;
            this.xClick()
          },
          //
          recordAllClick($event){
            let that = this;
            that.topoShow = false;
            $('.descMin2').css('height','48px');
            $('.descMin1').css('height','300px')
            $('.descMin1Box').css('height','246px');
            $('.descMin1Box1').css('overflow','auto');
            $('.descMin1Box1').scrollTop(0)

            that.recordAllShow = false;
          },
          recordHideClick($event){
            let that = this;
            that.topoShow = true;
            $('.descMin2').css('height','214.5px');
            $('.descMin1').css('height','154.5px')
            $('.descMin1Box').css('height','127px');
            $('.descMin1Box1').css('overflow','hidden');
            $('.descMin1Box1').scrollTop(0)

            that.recordAllShow = true;
          },
          topoAllClick(){
            let that = this;
            that.recordShow = false;
            $('.descMin1').css('height','48px')
            $('.descMin2Box').css('height','250px');
            $('.descMin1Box2').css('overflow','auto');
            $('.descMin1Box2').scrollTop(0)
            that.topoAllShow = false;

          },
          topoHideClick(){
            let that = this;
            that.recordShow = true;
            $('.descMin1').css('height','154.5px')
            $('.descMin2Box').css('height','127px');
            $('.descMin1Box2').css('overflow','hidden');
            $('.descMin1Box2').scrollTop(0)

            that.topoAllShow = true;
          },
          //获取查询记录
          getList(){
            let that = this;
            that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
            that.ajax({
              method:'get',
              url:that.Config.baseUrl2+"/member/extend"
            }).then(res=>{
              console.log(res);
              if(res.data.code == '0000'){
                that.recordList = res.data.data.history;
                that.topoList = res.data.data.topo;
                if(that.recordList.length > 6){
                  that.recordhShow = true;
                }
                if(that.topoList.length >= 3){
                  that.topohShow = true;
                }
              }
            })

          },
          //修改密码
          changePwdClick(){
            let that = this;
            let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
            if(that.oldPwd == '' || that.newPwd == '' || that.checkPwd == ''){
              // that.$message.error('输入内容不能为空')
              if(that.oldPwd == ''){
                that.tS1 = true;
                $('.pwdInput').eq(0).css('borderColor','red')

              }
              if(that.newPwd == ''){
                that.tS2 = true;
                $('.pwdInput').eq(1).css('borderColor','red')

              }
              if(that.checkPwd == ''){
                that.tS4 = true;
                $('.pwdInput').eq(2).css('borderColor','red')

              }
            }else if(that.newPwd != that.checkPwd){
              that.tS3 = false;
              that.tS5 = false;
              that.tS6 = true;
              $('.pwdInput').eq(1).css('borderColor','red')
              $('.pwdInput').eq(2).css('borderColor','red')
              // that.$message.error('修改的密码两次输入不一致')
            }else if(reg.test(that.newPwd) == false || reg.test(that.checkPwd) == false){
              that.tS3 = false;
              that.tS5 = false;
              that.tS6 = true;
              $('.pwdInput').eq(1).css('borderColor','red')
              $('.pwdInput').eq(2).css('borderColor','red')
              // $('.pwdInput').eq(1).css('borderColor','red')
              // $('.pwdInput').eq(2).css('borderColor','red')
            }
            else {
              that.ajax.defaults.headers.post['token'] = that.Cookies.get("token");
              let data = {
                oldPassword:that.$md5('chaindigg'+that.$md5(that.oldPwd)),
                newPassword1:that.$md5('chaindigg'+that.$md5(that.newPwd)),
                newPassword2:that.$md5('chaindigg'+that.$md5(that.checkPwd))
              }
              that.ajax({
                method:"post",
                url:that.Config.baseUrl2 + "/member/modify",
                data:that.qs.stringify(data)
              }).then(res=>{
                console.log(res);
                if(res.data.code == "0000"){
                  that.$message.success('修改成功');
                  that.cancelClick();
                  that.Cookies.remove("username");
                  that.Cookies.remove("password");
                  that.Cookies.remove("key");
                  that.Cookies.remove("token");
                  that.$router.push({name:"login"})
                }else {
                  that.$message.error(res.data.message);
                  that.cancelClick();
                }
              })
            }
          },
          //修改密码显示隐藏
          changePwd($event){
            // $($event.currentTarget).addClass('click').siblings().removeClass('click');
            this.rightHide = false;
            this.changePwd2 = true;
          },
          //点击用户名
          userClick(){
            let that = this;
            that.rightHide = !that.rightHide;
          },
          //点击取消
          cancelClick(){
            let that = this;
            that.oldPwd = '';
            that.newPwd = '';
            that.checkPwd = '';
            that.changePwd2 = false;
            that.tS1 = false;
            that.tS2 = false;
            that.tS3 = false;
            that.tS4 = false;
            that.tS5 = false;
            that.tS6 = false;
            $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
            $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
            $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
          },
          //点击hash
          hashClick(addr){
            let that = this;
            that.checkKey(addr)
          },
          //点击图谱
          topoClick(id,searchHash,graphId){
            let that = this;
            that.checkKey2(searchHash)
            that.Cookies.set('topoClick',id)
            that.Cookies.set("key",searchHash);
            that.Cookies.set("keyId",graphId);
            if(id == 1){
              that.Cookies.set("graphId",graphId);
            }else if(id == 2){
              that.Cookies.set("graphId2",graphId);

            }
            // that.$router.push({name:"detail"})
          },
          linkClick(){
            window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
          },

          //////////
          //新旧密码核实
          oldPwdCheck(){
            let that = this;
            console.log(that.oldPwd);
            if(that.oldPwd == ''){
              that.tS1 = true;
              $('.pwdInput').eq(0).css('borderColor','red')
            }else {
              that.tS1 = false;
              $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
            }
          },
          //新旧密码核实
          oldPwdCheck2(){
            let that = this;
            that.tS1 = false;
            $('.pwdInput').eq(0).css('borderColor','#C8C8C8')
          },
          //新密码核实
          newPwdCheck(){
            let that = this;
            let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
            if(that.newPwd == ""){
              that.tS2 = true;
              $('.pwdInput').eq(1).css('borderColor','red')
            }else {
              that.tS2 = false;
              $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
              if(reg.test(that.newPwd)){
                that.tS3 = false;
                $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
                // if(that.checkPwd == that.newPwd){
                //   that.tS6 = false;
                //   $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
                //
                // }else {
                //   that.tS6 = true;
                //   $('.pwdInput').eq(1).css('borderColor','red')
                // }
              }else {
                that.tS3 = true;
                $('.pwdInput').eq(1).css('borderColor','red')
              }
            }
          },
          newPwdCheck2(){
            let that = this;
            that.tS3 = false;
            that.tS2 = false;
            that.tS6 = false;
            $('.pwdInput').eq(1).css('borderColor','#C8C8C8')
          },
          //密码核实
          checkPwdCheck(){
            let that = this;
            let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,20}$/;
            if(that.checkPwd == ""){
              that.tS4 = true;
              $('.pwdInput').eq(2).css('borderColor','red')
            }else {
              that.tS4 = false;
              $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
              if(that.checkPwd == that.newPwd){
                that.tS6 = false;
                $('.pwdInput').eq(2).css('borderColor','#C8C8C8')

              }else {
                that.tS6 = true;
                $('.pwdInput').eq(2).css('borderColor','red')
              }
              // if(reg.test(that.checkPwd)){
              //   that.tS5 = false;
              //   $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
              //
              // }else {
              //   that.tS5 = true;
              //   $('.pwdInput').eq(2).css('borderColor','red')
              // }
            }
          },
          checkPwdCheck2(){
            let that = this;
            that.tS4 = false;
            that.tS5 = false;
            that.tS6 = false;
            $('.pwdInput').eq(2).css('borderColor','#C8C8C8')
          },
          //method end
        },
        activated() {
          this.getList()
        },
        mounted(){
          let that = this;
          that.token = "multipart/form-data;token="+that.Cookies.get('token')
          that.username = that.Cookies.get("username");
          // $('#fileUpload').click(function(){
          //
          // })
          that.getList()
        }
    }
</script>

<style scoped>
.search-box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #191a1d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 1280px;
  min-height: 900px;
}
  .search-iamge{
    /*margin-top: 18.5rem;*/
  }
  .search-input{
    width: 37.5rem;
    height: 3rem;
    background: #FFFFFF;
    border-radius: 2px;
    margin-top: 2.875rem;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #00A0E9;
    position: relative;
  }
  .search-input input{
    flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #999999;
    box-sizing: border-box;
    padding: 0 1.5rem;
    border: none;
    outline: none;
    background: #191a1d;
  }
  .search-input div{
    width: 4.5rem;
    height: 100%;
    background: #00A0E9;
    border-radius: 0 2px 2px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
.search-input div img{
  width: 1.5rem;
  height: auto;
}
  .user-info{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    height:60px;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .user-info img{
    width: 14px;
    height: 8px;
  }
  .span1{
    display: flex;
    margin-right: 1rem;
    align-items: center;
    cursor: pointer;
    position: relative;

  }
  .esc{
    margin-left: 1rem;
    cursor: pointer;
  }
  #addBillForm input[type=file]{
    height: 30px;
  }
  #fileUpload{
    width: 40px;
    height: 30px;
    background: white;
  }
.fot{
  width: 100%;
  text-align: center;
  /*font-size: 0.875rem;*/
  color: #ffffff;
  /*opacity: 0.3;*/
  position: absolute;
  left: 0;
  bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255,255,255,0.1);
  height: 2.5rem;
  font-family: PingFangSC-Regular;
  font-size: 0.75rem;
  /*color: #999999;*/
}
.alet{
  width: 376px !important;
  height: 48px !important;
  background:#3A3C41 !important;
  border-radius: 2px;
  position: absolute;
  bottom: -65px;
  left: calc(50% - 188px);
  display: flex;
  align-items: center;
  z-index: 99;

}
.close{
  margin-left: 22px;
}
.aletText{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  margin-left: 18px;
  flex: 1 !important;
}
.cancel{
  margin-right: 24px;
  cursor: pointer;
  width: 14px !important;
}
  .descBox{
    width: 44.25rem;
    height: 24.625rem;
    margin-top: 3rem;
    box-sizing: border-box;
    padding: 1.5rem;
    background: #1A1C20;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 2px;
  }
  .descMin1{
    height:154.5px;
    width: 100%;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .descMin2{
    height:214.5px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 23.5px;
  }
  .title{
    border-bottom: 2px solid #4A90E2;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #FFFFFF;
    height: 22px;
    display: block;
    width: 56px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .descMin1Box{
    width: 100%;
    height: 127px;
    /*overflow: hidden;*/
    display: flex;
    padding-bottom: 24px;
    box-sizing: border-box;
  }
  .descMin1Box1{
    display: block;
    flex: 1;
    overflow: hidden;
  }
.descMin2Box{
  width: 100%;
  height: 127px;
  /*overflow: hidden;*/
  display: flex;
  padding-bottom: 24px;
  box-sizing: border-box;
}
  .descMin1Box2{
    display: block;
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    /*pa*/
  }
  .hash{
    width: 280px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #00A0E9;
    margin-top: 12px;
    display: inline-block;
    text-decoration: underline;
  }
  .hash span{
    text-decoration: underline;
    cursor: pointer;
  }
  .descMin1All{
    width: 55px;
    height: 100%;
    padding-bottom: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .descMin1All span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .header{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    margin-top: 19px;
  }
  .header span:nth-child(1){
    width: 260px;
    display: inline-block;
  }
  .case{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 12px;

  }
  .caseName{
    width: 260px;
    display: inline-block;
    cursor: pointer;
  }
.rightHide{
  position: absolute;
  top: 44px;
  right: 1rem;
  width: 5rem;
  height: 4.5rem;
  background: #FFFFFF;
  border-radius: 2px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.rightHide span{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
.rightHide span:hover{
  color: #00A0E9;
}
.click{
  color: #00A0E9 !important;
}
.rightHide span:nth-child(1){
  margin-bottom: 0.5rem;
}
.changePwd{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(25,26,29,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.pwdBox{
  width: 22.5rem;
  min-height: 27.125rem;
  background: #FFFFFF;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
}
.title2{
  width: 100%;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  color: #333333;
}
.label{
  width: 100%;
  text-align: left;
  border-radius: 2px;
  margin-top: 1.5rem;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
}
.pwdInput{
  width: 20.5rem;
  height: 2.5rem;
  outline: none;
  background: #FFFFFF;
  border: 1px solid #C8C8C8;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 1rem;
  margin-top: 1rem;
}
.btns{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.btns span{
  width: 5rem;
  height: 2.5rem;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
}
.true{
  background: #00A0E9;
  margin-right: 1.5rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #FFFFFF;
}
.false{
  background: #FFFFFF;
  border: 1px solid #C8C8C8;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #999999;
}
.tf{
  position: absolute;
  right: 17px;
  top: 17px;
  cursor: pointer;
}
  .uf{
    opacity: 0.25;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    text-align: center;
  }
.fot span:nth-child(1){
  display: flex;
  align-items: center;
  margin-right: 5.5rem;
}
.fot span:nth-child(2){
  display: flex;
  align-items: center;
}
.fot span:nth-child(2) img{
  margin-right: 0.5rem;
}
.newText{
    font-size: 10px;
    color: red;
 }
</style>
