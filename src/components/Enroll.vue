<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    $.ajaxSetup({ crossDomain: true, xhrFields: { withCredentials: true } });
    let this_vue = this;
    layui.use(["form", "layedit", "laydate"], function() {
      let layer = layui.layer;
      layer.open({
        id: 1,
        type: 1,
        closeBtn: 0,
        anim: 0,
        scrollbar: false,
        title: "注册-激活",
        skin: "layui-layer-rim",
        area: ["28%", "45%"],

        content:
          '<div class="layui-row layui-col-space6" style="margin:auto; margin-top: 5%">' +
          '<div class="layui-card-body">' +
          '<label class="layui-form-label" style="font-size: medium">用户名：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="enroll_username" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入唯一用户名 /^[a-zA-Z0-9_]{4,16}$/">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">邮箱：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="enroll_email" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入注册邮箱">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">密码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="enroll_password0" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入自定义密码 6-12">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">密码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="enroll_password1" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请再次输入自定义密码">' +
          "</div>" +
          '<label class="layui-form-label" style="font-size: medium">激活码：</label>' +
          "<div class='layui-input-block'>" +
          '<input id="enroll_code" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入激活码">' +
          "</div>",
        btn: ["注册"],
        btn1: function(index) {
          console.log($("#enroll_username").val());
          if (!this_vue.checkusername($("#enroll_username").val())) return;
          if(!this_vue.checkEmail($("#enroll_email").val())) return;
          if(!this_vue.checkpw($("#enroll_password0").val())) return;
          if(!this_vue.checkequal($("#enroll_password0").val(),$("#enroll_password1").val())) return;
          if(!this_vue.checkcode($("#enroll_code").val())) return;

          let json = {
            username: $("#enroll_username").val(),
            email: $("#enroll_email").val(),
            password: $("#enroll_password0").val(),
            code: $("#enroll_code").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/enroll",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg) {
                layer.msg("Successfully enrolled！", {
                  icon: 1,
                  time: 2000
                });
                layer.close(index);
              } else {
                layer.msg("Fail to enroll！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
        }
      });
    });
  },
  methods: {
    checkusername: function(value) {
      //value：表单的值
      if ((value.length==0)) {
        layer.msg("用户名不能为空", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
      if (!uPattern.test(value)) {
        layer.msg("用户名含特殊字符或过短过长", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        layer.msg("用户名首尾不能出现下划线'_'", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      if (/^\d+\d+\d$/.test(value)) {
        layer.msg("用户名不能全为数字", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      return true;
    },
    checkEmail: function(myemail) {
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

      if (myReg.test(myemail)) {
        return true;
      } else {
        layer.msg("邮箱格式不对!", {
          icon: 2,
          time: 2000
        });
        return false;
      }
    },
    checkpw(password) {
      if (!(password.length<12&&password.length>=6)) {
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
    checkcode(code){
      if(code.length==0){
        layer.msg("请输入激活码!", {
          icon: 2,
          time: 2000
        });
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>
