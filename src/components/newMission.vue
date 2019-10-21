<template>
  <!-- 编辑新任务 弹窗内容开始 -->
  <div id="newMission_background" class="back">
    <div class="newMission">
      <div id="newMission_close" style="margin-bottom: 2%">
        <span id="newMission_close-button" style="margin-top: auto">×</span>
        <h2 style="padding: 0.5%">自定义任务</h2>
      </div>
      <div style="height:535px;margin-top: 5%">
        <div class="container">
          <div class="row">
            <div>
              <form class="layui-form" style="margin-left:7.5%;width:82.5%">
                <div class="row layui-form-item">
                  <label class="layui-form-label" >任务名称</label>
                  <div class="layui-input-block">
                    <input
                      ref="nam_name"
                      lay-verify="required"
                      required
                      class="layui-input"
                      type="text"
                      style="border-radius: 10px"
                    />
                  </div>
                </div>
                <div class="row layui-form-item">
                  <label class="layui-form-label">任务简介</label>
                  <div class="layui-input-block">
                    <textarea ref="nam_brief" class="layui-textarea" style="border-radius: 10px"></textarea>
                  </div>
                </div>
                <div class="row layui-form-item">
                  <label class="layui-form-label">日期时间</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      class="layui-input"
                      id="test10"
                      style="border-radius: 10px"
                      placeholder=" - "
                    />
                  </div>
                </div>
                <div class="row layui-form-item">
                  <div class="layui-col-sm12 layui-col-md12 layui-col-lg12">
                    <form>
                      <div>
                        <div class="layui-row" style="margin-top: 5%">
                          <label class="layui-form-label">阅读材料</label>
                          <label
                            v-if="this.$store.getters.getIsLogin"
                            class="layui-col-sm2 layui-col-md2 layui-col-lg2"
                            @click="material_newupload"
                          >
                            <i class="layui-icon layui-icon-upload-drag" style="font-size: 25px"></i>
                          </label>
                          <label
                            v-if="this.$store.getters.getIsLogin"
                            class="layui-col-sm2 layui-col-md2 layui-col-lg2"
                            @click="material_newurl"
                          >
                            <i class="layui-icon layui-icon-link" style="font-size: 20px"></i>
                          </label>
                        </div>
                        <hr />
                        <ul
                          ref="material_urls"
                          style="margin-left: 20%;margin-top:1.5%;font-size: large"
                        ></ul>
                      </div>
                      <div style="margin-top: 5%">
                        <div class="layui-row">
                          <label class="layui-form-label">实战例题</label>
                          <label
                            v-if="this.$store.getters.getIsLogin"
                            class="layui-col-sm2 layui-col-md2 layui-col-lg2"
                          >.</label>
                          <label
                            v-if="this.$store.getters.getIsLogin"
                            class="layui-col-sm2 layui-col-md2 layui-col-lg2"
                            @click="problem_newurl"
                          >
                            <i class="layui-icon layui-icon-link" style="font-size: 20px"></i>
                          </label>
                        </div>
                        <hr />
                        <ul
                          ref="problem_urls"
                          style="margin-left: 20%;margin-top:1.5%;font-size: large"
                        ></ul>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
              <button
                type="submit"
                class="layui-btn"
                @click="newaMission"
                style="font-size: large"
              >提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="newMission_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    $.ajaxSetup({ crossDomain: true, xhrFields: { withCredentials: true } });
    var newMission_div = document.getElementById("newMission_background");
    var newMission_close = document.getElementById("newMission_close-button");
    newMission_close.onclick = function close() {
      newMission_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == newMission_div) {
        newMission_div.style.display = "none";
      }
    };

    layui.use(["form", "layedit", "laydate"], function() {
      var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

      //日期时间范围
      laydate.render({
        elem: "#test10",
        type: "datetime",
        range: true
      });
    });
  },
  methods: {
    popup: function() {
      var newMission_div = document.getElementById("newMission_background");
      newMission_div.style.display = "block";
    },
    addaurl(name, url, belong_ul) {
      let nli_str =
        '<li class="row" style="padding-top: 1%;font-size: large"><a class="layui-col-sm8 layui-col-md8 layui-col-lg8" href="' +
        url +
        '">' +
        name +
        "</a></li>";
      let nli = $(nli_str);
      if (this.$store.getters.getIsLogin) {
        let nlab = $(
          '<i class="layui-icon layui-icon-delete layui-col-sm4 layui-col-md4 layui-col-lg4" style="font-size: 17px"></i><hr/>'
        );
        nlab.on("click", this.delaurl);
        nli.append(nlab);
      } else {
        nli.append($("<hr/>"));
      }
      $(belong_ul).append(nli);
    },
    delaurl(event) {
      var labdom = event.currentTarget;
      var lidom = $(labdom).parent("li")[0];
      $(lidom).remove();
    },
    rebuildDetail() {
      let detail = {
        left_urls: [],
        right_urls: []
      };
      let material_lis = $(this.$refs.material_urls).find("a");
      for (var i = 0; i < material_lis.length; i++) {
        detail.left_urls.push({
          name: $(material_lis[i]).text(),
          url: $(material_lis[i]).attr("href")
        });
      }
      let problem_lis = $(this.$refs.problem_urls).find("a");
      for (var i = 0; i < problem_lis.length; i++) {
        detail.right_urls.push({
          name: $(problem_lis[i]).text(),
          url: $(problem_lis[i]).attr("href")
        });
      }
      return detail;
    },
    material_newupload() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "上传阅读材料",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<form class="layui-form" style="padding-left: 5%">' +
          '<div class="layui-form-item" style="margin: 5%">' +
          '<span class="layui-form-label" style="margin-top: 3%">材料命名：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_material_name" class="layui-input" style="border-radius: 10px;margin-top: 5%" placeholder="请输入材料名">' +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label" style="margin-top: 3%">上传材料：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_material_file" class="layui-input" style="border-radius: 10px;margin-top: 5%;width: 135%" type="file">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          var obj = document.getElementById("m_new_material_file");

          var formData = new FormData();
          var file = obj.files[0];
          if (file == undefined) {
            layer.msg("No file!", {
              icon: 2,
              time: 2000
            });
            return;
          }
          console.log(file);
          formData.append("file", file);
          $.ajax({
            url:
              this_vue.$store.getters.getBaseUrl + "/postFile" /*接口域名地址*/,
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function(res) {
              if (res.msg) {
                this_vue.addaurl(
                  $("#m_new_material_name").val(),
                  res.fileurl,
                  this_vue.$refs.material_urls
                );

                layer.msg("Successfully uploaded!", {
                  icon: 1,
                  time: 2000
                });
              } else {
                layer.msg("Fail to upload!", {
                  icon: 2,
                  time: 2000
                });
              }
            }
          });

          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    material_newurl() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "添加阅读材料",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<form class="layui-form" style="padding-left: 12%">' +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">材料命名：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_material_name" class="layui-input" style="border-radius: 10px" placeholder="请输入材料名">' +
          "</div>" +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">材料地址：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_material_url" class="layui-input" style="border-radius: 10px" placeholder="请输入材料地址">' +
          "</div>" +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          this_vue.addaurl(
            $("#m_new_material_name").val(),
            $("#m_new_material_url").val(),
            this_vue.$refs.material_urls
          );
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    problem_newurl() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "添加实战例题",
        skin: "layui-layer-rim",
        area: ["450px", "275px"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:7px;margin-top:10px;">' +
          '<form class="layui-form" style="padding-left: 12%">' +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">例题命名：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_problem_name" class="layui-input" style="border-radius: 10px" placeholder="请输入例题名">' +
          "</div>" +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">例题地址：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="m_new_problem_url" class="layui-input" style="border-radius: 10px" placeholder="请输入材料地址">' +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          this_vue.addaurl(
            $("#m_new_problem_name").val(),
            $("#m_new_problem_url").val(),
            this_vue.$refs.problem_urls
          );
          layer.close(index);
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    newaMission: function() {
      if ($(this.$refs.nam_name).val().length == 0) {
        layer.msg("任务名不能为空!", {
          icon: 2,
          time: 2000
        });
        return;
      }
      if ($("#test10").val().length == 0) {
        layer.msg("起止日期不能为空!", {
          icon: 2,
          time: 2000
        });
        return;
      }
      let json = {
        username: this.$store.getters.getUserName,
        nam_name: $(this.$refs.nam_name).val(),
        nam_brief: $(this.$refs.nam_brief).val(),
        nam_timespan: $("#test10").val(),
        detail: this.rebuildDetail()
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/newaMission",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully newed!", {
              icon: 1,
              time: 2000
            });
            $(this.$refs.nam_name).val("");
            $(this.$refs.nam_brief).val("");
            $("#test10").val("");
            $(this.$refs.material_urls).empty();
            $(this.$refs.problem_urls).empty();

            this.$parent.refreshMissions();
          } else {
            layer.msg("Fail to new a mission!", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
</script>

<style >
/* @import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css"; */
ul li {
  list-style: none;
}
#newMission_background {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  text-align: center;
  z-index: 1000;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.newMission {
  background: #eeeeee;
  width: 32.5%;
  height: 72.5%;
  margin: 4% auto;
  overflow: auto;
}

#newMission_close {
  padding: 5px;
  background: #a5bbcc;
}

#newMission_close-button {
  float: right;
  font-size: 30px;
}

/* #newMission_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
