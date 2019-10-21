<template>
  <!-- 编辑新任务 弹窗内容开始 -->
  <div id="viewDetail_background" class="back">
    <div class="viewDetail">
      <div id="viewDetail_close">
        <span id="viewDetail_close-button">×</span>
        <h2>结点详情</h2>
      </div>
      <div style="height:535px">
        <div class="container">
          <div class="layui-row">
            <div class="layui-col-sm12 layui-col-md12 layui-col-lg12">
              <form>
                <div>
                  <div class="layui-row" style="margin-top: 5%">
                    <h2 class="layui-col-sm8 layui-col-md8 layui-col-lg8">阅读材料</h2>
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
                  <hr/>
                  <ul ref="material_urls" style="margin-left: 20%;margin-top:1.5%;font-size: large">
                    <li class="row" style="padding-top: 3.5%;font-size: large">
                      <a href="https://www.baidu.com">百度</a>
                    </li>
                  </ul>
                </div>
                <div style="margin-top: 5%">
                  <div class="layui-row">
                    <h2 class="layui-col-sm8 layui-col-md8 layui-col-lg8">实战例题</h2>
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
                  <hr/>
                  <ul ref="problem_urls" style="margin-left: 20%;margin-top:1.5%;font-size: large">
                    <li style="padding-top: 3.5%;font-size: large">
                      <a href="https://www.baidu.com">百度</a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="viewDetail_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  data() {
    return {
      nodeId: ""
    };
  },
  mounted() {
    $.ajaxSetup({ crossDomain: true, xhrFields: { withCredentials: true } });
    var this_vue = this;

    var viewDetail_div = document.getElementById("viewDetail_background");
    var viewDetail_close = document.getElementById("viewDetail_close-button");
    viewDetail_close.onclick = function close() {
      viewDetail_div.style.display = "none";
      if (this_vue.nodeId != "") {
        this_vue.$parent.upgradedetails(
          this_vue.rebuildDetail(),
          this_vue.nodeId
        );
      }
      this_vue.nodeId = "";
    };
    window.onclick = function close(e) {
      if (e.target == viewDetail_div) {
        viewDetail_div.style.display = "none";
        if (this_vue.nodeId != "") {
          this_vue.$parent.upgradedetails(
            this_vue.rebuildDetail(),
            this_vue.nodeId
          );
        }
        this_vue.nodeId = "";
      }
    };

    layui.use(["form", "layedit", "laydate"], function() {
      var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    });
  },
  methods: {
    popup: function() {
      var viewDetail_div = document.getElementById("viewDetail_background");
      viewDetail_div.style.display = "block";
    },
    addaurl(name, url, belong_ul) {
      let nli_str =
        '<li class="row" style="padding-top: 1%;font-size: large"><a class="layui-col-sm8 layui-col-md8 layui-col-lg8" href="' + url + '">' + name + "</a></li>";
      let nli = $(nli_str);
      if (this.$store.getters.getIsLogin) {
        let nlab = $(
          '<i class="layui-icon layui-icon-delete layui-col-sm4 layui-col-md4 layui-col-lg4" style="font-size: 17px"></i><hr/>'
        );
        nlab.on("click", this.delaurl);
        nli.append(nlab);
      }else{
        nli.append($('<hr/>'));
      }
      $(belong_ul).append(nli);
    },
    delaurl(event) {
      var labdom = event.currentTarget;
      var lidom = $(labdom).parent("li")[0];
      $(lidom).remove();
    },
    addurls(detail, nodeId) {
      this.nodeId = nodeId;
      $(this.$refs.material_urls).empty();
      $(this.$refs.problem_urls).empty();
      for (var i = 0; i < detail.left_urls.length; i++) {
        this.addaurl(
          detail.left_urls[i].name,
          detail.left_urls[i].url,
          this.$refs.material_urls
        );
      }
      for (var i = 0; i < detail.right_urls.length; i++) {
        this.addaurl(
          detail.right_urls[i].name,
          detail.right_urls[i].url,
          this.$refs.problem_urls
        );
      }
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
          '<input id="d_new_material_name" class="layui-input" style="border-radius: 10px;margin-top: 5%" placeholder="请输入材料名">' +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label" style="margin-top: 3%">上传材料：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="d_new_material_file" class="layui-input" style="border-radius: 10px;margin-top: 5%;width: 135%" type="file">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          var obj = document.getElementById("d_new_material_file");

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
                  $("#d_new_material_name").val(),
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
          '<input id="d_new_material_name" class="layui-input" style="border-radius: 10px" placeholder="请输入材料名">' +
          "</div>" +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">材料地址：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="d_new_material_url" class="layui-input" style="border-radius: 10px" placeholder="请输入材料地址">' +
          "</div>" +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          this_vue.addaurl(
            $("#d_new_material_name").val(),
            $("#d_new_material_url").val(),
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
          '<div class="layui-row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<form class="layui-form" style="padding-left: 12%">' +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">例题命名：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="d_new_problem_name" class="layui-input" style="border-radius: 10px" placeholder="请输入例题名">' +
          "</div>" +
          "</div>" +
          '<div class="layui-form-item">' +
          '<span class="layui-form-label">例题地址：</span>' +
          '<div class="layui-input-inline">' +
          '<input id="d_new_problem_url" class="layui-input" style="border-radius: 10px" placeholder="请输入材料地址">' +
          "</div>" +
          "</form>" +
          "</div>",
        btn: ["添加", "取消"],
        btn1: function(index, layero) {
          this_vue.addaurl(
            $("#d_new_problem_name").val(),
            $("#d_new_problem_url").val(),
            this_vue.$refs.problem_urls
          );
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    }
  }
};
</script>

<style scoped>
/* @import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css"; */
ul li {
  list-style: none;
}
#viewDetail_background {
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

.viewDetail {
  background: #eeeeee;
  width: 32.5%;
  margin: 4% auto;
  overflow: auto;
}

#viewDetail_close {
  padding: 5px;
  background: #009f95;
}

#viewDetail_close-button {
  float: right;
  font-size: 30px;
}

/* #viewDetail_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
