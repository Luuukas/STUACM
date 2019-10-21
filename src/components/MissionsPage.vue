<template>
  <div class="container">
    <nM ref="newaM"></nM>
    <aM ref="viewaM"></aM>
    <div class="row">
      <label @click="newaMission" v-if="this.$store.getters.getIsLogin" class="col-sm-12 col-md-12 col-lg-12">
        <div class="help-block" style="margin-bottom:1%">点击添加自定义任务
        <i class="layui-icon layui-icon-add-circle-fine" style="font-size: large;margin: 5%"></i>
        </div>
      </label>
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="accordion" id="asms_box" v-if="refreshMs">
          <asms v-for="(info,index) in infos" :key="index" :info="info"></asms>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import asms from "./aSetOfMissions";
import nM from "./newMission";
import aM from "./aMission";
export default {
  name: "MissionsPage",
  components: {
    asms,
    nM,
    aM
  },
  data() {
    return {
      refreshMs: true,
      infos: []
    };
  },
  created() {
    this.getMissions();
  },
  methods: {
    // 数据库上把所有的任务都存储在一起了，请求到所有任务后，先用改函数做一次整理，使得任务按年月分类
    tidyMissions: function(missions){
      let abbr = ["","Jan.","Feb.","Mar.","Apr.","May.","June","July","Aug.","Sep.","Oct.","Nov.","Dec."];
      let myDate = new Date();
      let start_year = 2019;
      let start_month = 8;
      let now_year = myDate.getFullYear();
      let now_month = (myDate.getMonth()==12?1:myDate.getMonth()+1);
      console.log(now_month);
      let now_year_str = ""+now_year;
      let now_month_str = (now_month<10?"0"+now_month:""+now_month);
      let infos = {};
      if(start_year<now_year){
      for(var j=start_month;j<=12;j++){
        infos["asam_"+start_year+(j<10?"0"+j:""+j)] = {
            inner_id: "asam_"+start_year+(j<10?"0"+j:""+j),
            year: ""+start_year,
            month: abbr[j],
            status: "Past",
            missions: []
          };
      };
      }
      for(var i=start_year+1;i<now_year;i++){
        for(var j=1;j<=12;j++){
          infos["asam_"+i+(j<10?"0"+j:""+j)] = {
            inner_id: "asam_"+i+(j<10?"0"+j:""+j),
            year: ""+i,
            month: abbr[j],
            status: "Past",
            missions: []
          };
        }
      };
      for(var j=(start_year<now_year?1:start_month);j<now_month;j++){
        infos["asam_"+now_year+(j<10?"0"+j:""+j)] = {
            inner_id: "asam_"+now_year+(j<10?"0"+j:""+j),
            year: ""+now_year,
            month: abbr[j],
            status: "Past",
            missions: []
          };
      };
      infos["asam_"+now_year+now_month_str] = {
            inner_id: "asam_"+now_year+now_month_str,
            year: ""+now_year,
            month: abbr[now_month],
            status: "Now",
            missions: []
          };
      if(now_month==12){
        infos["asam_"+now_year+"01"] = {
            inner_id: "asam_"+(now_year+1)+"01",
            year: ""+(now_year+1),
            month: abbr[1],
            status: "Future",
            missions: []
          };
      }else{
        infos["asam_"+now_year+((now_month+1)<10?"0"+(now_month+1):""+(now_month+1))] = {
            inner_id: "asam_"+now_year+(now_month+1),
            year: ""+now_year,
            month: abbr[now_month+1],
            status: "Future",
            missions: []
          };
      };
       let now_name = "asam_"+now_year_str+now_month_str;
      for(var i=0;i<missions.length;i++){
        let start_name = "asam_"+missions[i].start_t.substr(0,4)+missions[i].start_t.substr(5,2);
        let end_name = "asam_"+missions[i].end_t.substr(0,4)+missions[i].end_t.substr(5,2);
        let name = (now_name<=end_name?now_name:start_name);
        infos[name].missions.push(missions[i]);
      }
      let infos_array = [];
      for (let i in infos) {
        infos_array.push(infos[i]);
      }
      return infos_array.reverse();
    },
    // 向服务器请求所有任务
    getMissions: function() {
      var json = {
        username: this.$store.getters.getUserName
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/getMissions",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            this.infos = this.tidyMissions(res.infos);
          } else {
            layer.msg("Fail to get missions!", {
              icon: 2,
              time: 2000
            });
          }
        });
    },
    // 重新渲染任务
    refreshMissions: function() {
      this.getMissions();

      // 移除组件
      this.refreshMs = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refreshMs = true;
      });
    },
    // 弹出新建任务表单的弹出框
    newaMission: function() {
      this.$refs.newaM.popup();
    },
    // 把该任务的信息填入 展示信息的弹出框中 然后弹出弹出框展示
    viewaMission: function(title, start_t, end_t, belong, detail) {
      this.$refs.viewaM.fillMissionDetail(
        title,
        start_t,
        end_t,
        belong,
        detail
      );
      this.$refs.viewaM.popup();
    }
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
</style>
