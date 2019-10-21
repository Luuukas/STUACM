<template>
  <!-- 编辑新导图 弹窗内容开始 -->
  <div id="newMindMap_background" class="back">
    <div class="newMindMap">
      <div id="newMindMap_close">
        <span id="newMindMap_close-button" style="margin-top: auto">×</span>
        <h2>添加导图</h2>
      </div>
      <div style="height:325px;margin-top: 5%">
        <div class="container" style="width: 92.5%">
          <div class="row">
            <div>
              <form class="layui-form" style="width:100%;">
                <div class="row layui-form-item">
                  <label class="layui-form-label" style="width:37.5%;">导图名称</label>
                  <div class="layui-input-inline" style="width: 52.5%">
                    <input ref="nam_name" required lay-verify="required" class="layui-input" type="text" style="border-radius: 10px"/>
                  </div>
                </div>
                <div class="row layui-form-item">
                  <label class="layui-form-label" style="width:37.5%;">导图简介</label>
                  <div class="layui-input-inline" style="width: 52.5%">
                    <textarea ref="nam_brief" required lay-verify="required" class="layui-textarea" type="text" style="border-radius: 10px"/>
                  </div>
                </div>
                <div class="row layui-form-item">
                  <label class="layui-form-label" style="width:37.5%;">首节点命名</label>
                  <div class="layui-input-inline" style="width: 52.5%">
                    <input ref="nam_firstnode_name" required lay-verify="required" class="layui-input" type="text" style="border-radius: 10px"/>
                  </div>
                </div>
              </form>
              <button type="submit" class="layui-btn" @click="newaMindMap" style="font-size: large">提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="newMindMap_foot">底部内容</h3> -->
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
    var newMindMap_div = document.getElementById("newMindMap_background");
    var newMindMap_close = document.getElementById("newMindMap_close-button");
    newMindMap_close.onclick = function close() {
      newMindMap_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == newMindMap_div) {
        newMindMap_div.style.display = "none";
      }
    };
  },
  methods: {
    popup: function() {
      var newMindMap_div = document.getElementById("newMindMap_background");
      newMindMap_div.style.display = "block";
    },
    newaMindMap: function() {
      if ($(this.$refs.nam_name).val().length == 0) {
        layer.msg("导图命名不能为空!", {
          icon: 2,
          time: 2000
        });
        return;
      }
      if ($(this.$refs.nam_firstnode_name).val().length == 0) {
        layer.msg("首节点命名不能为空!", {
          icon: 2,
          time: 2000
        });
        return;
      }
      var json = {
        username: this.$store.getters.getUserName,
        nam_name: $(this.$refs.nam_name).val(),
        nam_brief:$(this.$refs.nam_brief).val(),
        nam_firstnode_name:$(this.$refs.nam_firstnode_name).val()
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/newaMindMap",
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
            $(this.$refs.nam_firstnode_name).val("");
            this.$parent.refreshMindMapBox();
          } else {
            layer.msg("Fail to new!", {
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
#newMindMap_background {
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

.newMindMap {
  background: #eeeeee;
  width: 32.5%;
  margin: 10% auto;
  overflow: auto;
}

#newMindMap_close {
  padding: 5px;
  background:#a5bbcc;
}

#newMindMap_close-button {
  float: right;
  font-size: 30px;
}

/* #newMindMap_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
