<template>
  <tr v-if="!isDeled" class="row" @click="viewthisMission" ref="atr">
    <td class="col-sm-3 col-md-3 col-lg-3" style="font-size: large">{{info.title}}</td>
    <td class="col-sm-3 col-md-3 col-lg-3" style="font-size: large">{{info.start_t}}</td>
    <td class="col-sm-3 col-md-3 col-lg-3" style="font-size: large">{{info.end_t}}</td>
    <td class="col-sm-2 col-md-2 col-lg-2" style="font-size: large">{{info.belong}}</td>
    <td class="col-sm-1 col-md-1 col-lg-1" style="font-size: large">
      <label v-if="this.$store.getters.getIsLogin&&info.belong=='Personal'" @click="delmission">-</label>
    </td>
  </tr>
</template>

<script>
export default {
    props:{
        info: Object
    },
    data(){
        return{
            isDeled: false
        }
    },
    mounted(){
      $(this.$refs.atr).addClass(this.info.status);
    },
    methods:{
      delmission: function(event){
        event.stopPropagation(); // 阻止点击事件冒泡
        var json = {
          username : this.$store.getters.getUserName,
          id : this.info.id
        };
        this.$http
        .post(
          this.$store.getters.getBaseUrl + "/delPersonalMission",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully deleted!", {
              icon: 1,
              time: 2000
            });
            this.isDeled = true;
          } else {
            layer.msg("Fail to refresh!", {
              icon: 2,
              time: 2000
            });
          }
        });
      },
      viewthisMission: function(){
        console.log(this.info.brief);
        this.$parent.$parent.viewaMission(this.info);
      }
    }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
.unfinished {
  background-color: rgb(253, 246, 246);
}
.finished {
  background-color:  	#20B2AA;
}
</style>
