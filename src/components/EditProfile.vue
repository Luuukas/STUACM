<template>
  <!-- 编辑个人信息 弹窗内容开始 -->
  <div id="editProfile_background" class="back">
    <div class="editProfile">
      <div id="editProfile_close">
        <span id="editProfile_close-button">×</span>
        <h2>个人信息</h2>
      </div>
      <div style="height:670px">
        <div class="container" style="width:100%">
          <div class="layui-row">
            <div>
              <div class="layui-upload">
                <div class="layui-upload-list">
                  <img
                    id="test1"
                    ref="eP_user_img"
                    alt="140x140"
                    src="BG4.jpg"
                    class="img-circle layui-upload-img"
                    style="height: 140px;width:140px"
                  />
                </div>
              </div>
              <div style="margin: 1%;font-size: 0.85vw;">点击头像以更换头像</div>
              <form class="layui-form">
                <div class="layui-form-item layui-form-text" style="width:100%">
                  <label class="layui-form-label" style="width:30%;font-size: 0.85vw;">个性签名：</label>
                  <div class="layui-input-block">
                    <textarea
                      ref="eP_user_signature"
                      class="layui-textarea"
                      style="border-radius: 10px;width:70%"
                    ></textarea>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label" style="width:30%;font-size: 0.85vw;">昵称：</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      ref="eP_user_nickname"
                      style="width: 70%;border-radius: 10px"
                      required
                      lay-verify="required"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label" style="width: 30%;font-size: 0.85vw;">codeforces 用户名：</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      ref="eP_user_codeforces"
                      style="border-radius: 10px;width:70%;"
                      required
                      lay-verify="required"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label" style="width: 30%;font-size: 0.85vw;">sdutacm 用户名：</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      ref="eP_user_sdutacm"
                      required
                      style="border-radius: 10px;width: 70%"
                      lay-verify="required"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
                <label class="layui-form-label" style="width: 30%;font-size: 0.85vw;">BLOGS：</label>
                <hr style="margin:0 15% 2% 15%;border:2px solid lightcoral;"/>
                <div class="layui-form-item" ref="eP_user_blogs">
                  <div class="layui-row">
                    <label class="layui-col-md1"></label>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写博客网站"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写相应网址"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <label class="layui-col-md1"></label>
                  </div>
                  <div class="layui-row">
                    <label class="layui-col-md1"></label>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写博客网站"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写相应网址"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <label class="layui-col-md1"></label>
                  </div>
                  <div class="layui-row">
                    <label class="layui-col-md1"></label>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写博客网站"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <div class="layui-unselect layui-form-select layui-col-md5">
                      <div class="layui-select-tips">
                        <input
                          class="layui-input layui-unselect"
                          type="text"
                          placeholder="请填写相应网址"
                          style="margin-left: 3%;border-radius: 10px"
                        />
                      </div>
                    </div>
                    <label class="layui-col-md1"></label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="layui-row">
            <div class="help-block" style="font-size: 0.85vw;">修改任何信息都需要点击提交</div>
            <button type="button" class="layui-btn" @click="UpgProfile" style="font-size: 0.85vw;">提交</button>
          </div>
        </div>
      </div>
      <!-- <h3 id="editProfile_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  mounted() {
    var editProfile_div = document.getElementById("editProfile_background");
    var editProfile_close = document.getElementById("editProfile_close-button");
    editProfile_close.onclick = function close() {
      editProfile_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == editProfile_div) {
        editProfile_div.style.display = "none";
      }
    };

    var this_vue = this;
    layui.use("upload", function() {
      var $ = layui.jquery,
        upload = layui.upload;

      //普通图片上传
      var uploadInst = upload.render({
        elem: "#test1",
        url: this_vue.$store.getters.getBaseUrl + "/upgProfileImg",
        xhrFields: { withCredentials: true },
        data: {
          username: this_vue.$store.getters.getUserName
        },
        choose: function(obj) {
          //预读本地文件示例，不支持ie8
          obj.preview(function(index, file, result) {
            $(this_vue.$refs.eP_user_img).attr("src", result); //图片链接（base64）
          });
        },
        done: function(res) {
          console.log(res.new_imgurl);
          if (res.msg) {
            layer.msg("Successfully upgraded profile!", {
              icon: 1,
              time: 2000
            });
            this_vue.$parent.refreshSPF();
          } else {
            layer.msg("Fail to upgrade profile!", {
              icon: 2,
              time: 2000
            });
          }
        },
        error: function() {
          //演示失败状态，并实现重传
          var demoText = $("#demoText");
          demoText.html(
            '<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>'
          );
          demoText.find(".demo-reload").on("click", function() {
            uploadInst.upload();
          });
        }
      });
    });
  },
  methods: {
    popup: function() {
      var editProfile_div = document.getElementById("editProfile_background");
      editProfile_div.style.display = "block";
    },
    fillProfile: function(profile) {
      $(this.$refs.eP_user_img).attr("src", profile.user_img);
      $(this.$refs.eP_user_nickname).val(profile.user_nickname);
      $(this.$refs.eP_user_signature).val(profile.user_signature);
      $(this.$refs.eP_user_codeforces).val(profile.user_codeforces);
      $(this.$refs.eP_user_sdutacm).val(profile.user_sdutacm);
      for (var i = 0; i < 3; i++) {
        $($(this.$refs.eP_user_blogs).find("input")[i * 2]).val(
          profile.user_blogs[i].name
        );
        $($(this.$refs.eP_user_blogs).find("input")[i * 2 + 1]).val(
          profile.user_blogs[i].url
        );
      }
    },
    UpgProfile: function() {
      let user_blogs = [];
      for (var i = 0; i < 3; i++) {
        user_blogs.push({
          name: $($(this.$refs.eP_user_blogs).find("input")[i * 2]).val(),
          url: $($(this.$refs.eP_user_blogs).find("input")[i * 2 + 1]).val()
        });
      }
      var json = {
        username: this.$store.getters.getUserName,
        user_nickname: $(this.$refs.eP_user_nickname).val(),
        user_signature: $(this.$refs.eP_user_signature).val(),
        user_codeforces: $(this.$refs.eP_user_codeforces).val(),
        user_sdutacm: $(this.$refs.eP_user_sdutacm).val(),
        user_blogs: user_blogs
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/upgProfile",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully upgraded profile!", {
              icon: 1,
              time: 2000
            });
            this.$parent.refreshSPF();
          } else {
            layer.msg("Fail to upgrade profile!", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
ul li {
  list-style: none;
}
#editProfile_background {
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

.editProfile {
  background: #eeeeee;
  width: 37.5%;
  margin: 2% auto;
  overflow: auto;
}

#editProfile_close {
  padding: 5px;
  background: lightcoral;
}

#editProfile_close-button {
  float: right;
  font-size: 30px;
}

/* #editProfile_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
