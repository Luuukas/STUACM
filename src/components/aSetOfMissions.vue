<template>
  <div class="accordion-group" style="width:100%">
    <div class="accordion-heading" ref="heading">
      <a ref="heading_a" class="accordion-toggle" data-toggle="collapse" data-parent href>
        <div class="container">
          <div
            class="row"
            style="background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%;width:100%;height:40px"
          >
            <label class="col-sm-4 col-md-4 col-lg-4" style="height:100%;font-size: large;padding-top:0.7%">{{info.year}}</label>
            <label class="col-sm-4 col-md-4 col-lg-4" style="height:100%;font-size: large;padding-top:0.7%">{{info.month}}</label>
            <label class="col-sm-4 col-md-4 col-lg-4" style="height:100%;font-size: large;padding-top:0.7%">{{info.status}}</label>
          </div>
        </div>
      </a>
    </div>
    <div ref="inner_div" id class="accordion-body collapse">
      <div class="accordion-inner">
        <div class="container">
          <div class="row" style="width:100%">
            <table class="table" style="margin-bottom:1%">
              <tbody>
                <aPoM v-for="(info,index) in info.missions" :key="index" :info="info"></aPoM>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aPoM from "./aPieceOfMission"
export default {
    components:{
        aPoM
    },
  props: {
    info: Object
  },
  data() {
    return {
    };
  },
  mounted() {
    $(this.$refs.heading_a).attr("data-parent", "asms_box");
    $(this.$refs.heading_a).attr("href", "#" + this.info.inner_id);
    $(this.$refs.inner_div).attr("id", this.info.inner_id);
    $(this.$refs.heading_a).find("label").addClass(this.info.status)
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
.Future{
  background-color:#a5bbcc;
}
.Now{
  background-color: #b9def0;
}
.Past{
  background-color: floralwhite;
}
</style>
