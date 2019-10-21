<template>
  <div v-if="hasAcmer" class="container" style="width: 100%">
    <eP ref="editP"></eP>
    <div
      class="row"
      style="background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%"
    >
      <div class="col-sm-3 col-md-3 col-lg-2">
        <h1 style="color:#FF6347; font-family: 'Comic Sans MS'" @click="gotoHome">STUACM</h1>
      </div>
      <div class="col-sm-7 col-md-7 col-lg-8">
        <h3></h3>
      </div>
      <div class="col-sm-2 col-md-2 col-lg-2">
        <div class="btn-group" style="float: right;margin-right:25%">
          <label style="margin-top:12.5%">
            <i class="layui-icon layui-icon-username" style="font-size: 30px; color: #1E9FFF;"></i>Action
            <button data-toggle="dropdown" class="btn dropdown-toggle">
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" style="margin: auto">
              <li>
                <a v-if="this.$store.getters.getIsLogin" href="#" @click="editProfile">个人信息</a>
              </li>
              <li>
                <a v-if="this.$store.getters.getIsLogin" href="#" @click="changePassword">账号信息</a>
              </li>
              <li>
                <a v-if="this.$store.getters.getIsLogin" href="#" @click="tryLogout">Log out</a>
              </li>
              <li>
                <a v-if="!this.$store.getters.getIsLogin" href="#" @click="tryLogin">Log in</a>
              </li>
            </ul>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-sm-2 col-md-2 col-lg-2"
        style="background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%"
      >
        <sPf v-if="refreshsPf"></sPf>
      </div>
      <div class="col-sm-10 col-md-10 col-lg-10">
        <!-- <MsP></MsP> -->
        <router-view ref="rtv"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sPf from "./showProfile";
import MsP from "./MissionsPage";
import eP from "./EditProfile";
export default {
  components: {
    sPf,
    MsP,
    eP
  },
  data() {
    return {
      hasAcmer: false,
      refreshsPf: true
    };
  },
  created() {
    var acmer = this.getUrlParam("acmer");
    console.log(acmer);
    if (acmer == null) {
      alert("请附带ACMER参数");
      window.location.href = this.$store.getters.getBaseUrl + "/Home";
    } else {
      var json = {
        username: acmer
      };
      this.$http
        .post(this.$store.getters.getBaseUrl + "/isExits", JSON.stringify(json))
        .then(res => {
          res = res.body;
          if (!res.msg) {
            alert("ACMER不存在");
            window.location.href = this.$store.getters.getBaseUrl + "/Home";
          } else {
            this.$store.dispatch("asetUserName", acmer);
            this.hasAcmer = true;
          }
        });
    }
  },
  mounted() {
    layui.use(["form", "layedit", "laydate"], function() {
      var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    });
  },
  methods: {
    gotoHome: function() {
      window.location.href = this.$store.getters.getBaseUrl + "/Home";
    },
    getUrlParam: function(name) {
      var reg = new RegExp(name + "=([^&]*)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.toString().match(reg); //匹配目标参数
      if (r != null) return r[1];
      return null; //返回参数值
    },
    editProfile: function() {
      this.$refs.editP.popup();
    },
    tryLogin: function() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "登录",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:4px; margin-top:10px;">' +
          '<div class="layui-card-body">' +
          '<label class="layui-form-label" style="font-size: medium;margin-top: 3%">邮箱：</label>' +
          "<div class='layui-input-block'style='margin-top:3%'  >" +
          '<input id="login_email" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入注册邮箱">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium;margin-top: 3%">密码：</label>' +
          "<div class='layui-input-block' style='margin-top:3% ' >" +
          '<input id="login_password" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入该页面用户的密码">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["登录", "取消"],
        btn1: function(index, layero) {
          if (!this_vue.checkEmail($("#login_email").val())) return;
          if (!this_vue.checkpw($("#login_password").val())) return;

          let json = {
            username: this_vue.$store.getters.getUserName
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/prepareRSA",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg == "prepared") {
                let _pubKey = res.tmppubder;
                console.log(_pubKey);

                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(_pubKey);

                let json = {
                  username: this_vue.$store.getters.getUserName,
                  email: $("#login_email").val(),
                  password: encrypt.encrypt($("#login_password").val())
                };
                this_vue.$http
                  .post(
                    this_vue.$store.getters.getBaseUrl + "/login",
                    JSON.stringify(json)
                  )
                  .then(res => {
                    res = res.body;
                    if (res.msg) {
                      layer.msg("Successfully login！", {
                        icon: 1,
                        time: 2000
                      });
                      this_vue.$store.dispatch("asetIsLogin", true);
                    } else {
                      layer.msg("Fail to login！", {
                        icon: 2,
                        time: 2000
                      });
                    }
                  });
              } else {
                layer.msg("Fail to login！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    checkEmail: function(myemail) {
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

      if (!myReg.test(myemail)) {
        layer.msg("邮箱格式不对!", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      return true;
    },
    checkpw(password) {
      console.log(password);
      if (!(password.length < 12 && password.length >= 6)) {
        layer.msg("密码长度6-12位!", {
          icon: 2,
          time: 2000
        });
        return false;
      }

      return true;
    },
    checkequal(pw1, pw2) {
      if (pw1 != pw2) {
        layer.msg("两次密码不相同!", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      return true;
    },
    changePassword: function() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "修改密码",
        skin: "layui-layer-rim",
        area: ["450px", "325px"],

        content:
          '<div class="layui-row" style="width: 420px;  margin-left:4px; margin-top:10px;">' +
          '<div class="layui-card-body">' +
          '<label class="layui-form-label" style="font-size: medium">原密码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="cpw_oldpw" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入现在在用的密码">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">新密码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="cpw_newpw0" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入更换后的密码">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">新密码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="cpw_newpw1" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请再次输入新密码">' +
          "</div>" +
          "</div>",
        btn: ["修改", "取消"],
        btn1: function(index, layero) {
          if (!this_vue.checkpw($("#cpw_oldpw").val())) return;
          if (!this_vue.checkpw($("#cpw_newpw0").val())) return;
          if (
            !this_vue.checkequal($("#cpw_newpw0").val(), $("#cpw_newpw1").val())
          )
            return;

          let json = {
            username: this_vue.$store.getters.getUserName
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/prepareRSA",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg == "prepared") {
                let _pubKey = res.tmppubder;
                console.log(_pubKey);

                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(_pubKey);

                let json = {
                  username: this_vue.$store.getters.getUserName,
                  oldpw: encrypt.encrypt($("#cpw_oldpw").val()),
                  newpw: encrypt.encrypt($("#cpw_newpw0").val())
                };
                this_vue.$http
                  .post(
                    this_vue.$store.getters.getBaseUrl + "/changePW",
                    JSON.stringify(json)
                  )
                  .then(res => {
                    res = res.body;
                    if (res.msg) {
                      layer.msg("修改成功!", {
                        icon: 1,
                        time: 2000
                      });
                    } else {
                      layer.msg("修改失败!", {
                        icon: 2,
                        time: 2000
                      });
                    }
                  });
              } else {
                layer.msg("Fail to login！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    tryLogout: function() {
      var json = {
        username: this.$store.getters.getUserName
      };
      this.$http
        .post(this.$store.getters.getBaseUrl + "/logout", JSON.stringify(json))
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully logout!", {
              icon: 1,
              time: 2000
            });
            this.$store.dispatch("asetIsLogin", false);
          } else {
            layer.msg("Fail to logout!", {
              icon: 2,
              time: 2000
            });
          }
        });
    },
    refreshSPF: function() {
      // 移除组件
      this.refreshsPf = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refreshsPf = true;
      });
    }
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
</style>
