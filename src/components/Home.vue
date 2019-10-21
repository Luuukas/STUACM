<template>
<body data-spy="scroll" data-target="#myScrollspy">
  <div class="container">
    <div class="jumbotron">
      <h1>STUACM Home</h1>
    </div>
    <div class="row">
      <div class="col-xs-3" id="myScrollspy">
        <ul class="nav nav-tabs nav-stacked" id="myNav">
          <li>
            <a href="#section-1">协会简介</a>
          </li>
          <li>
            <a href="#section-2">电子资源</a>
          </li>
          <li>
            <a href="#section-3">常用网站</a>
          </li>
          <li>
            <a href="#section-4">课件材料</a>
          </li>
          <li>
            <a href="#section-5">赛事题解</a>
          </li>
          <li>
            <a href="#section-6">发展相册</a>
          </li>
        </ul>
      </div>
      <div class="col-xs-9">
        <h2 id="section-1">协会简介</h2>
        <p>你猜</p>
        <hr />
        <h2 id="section-2">电子资源</h2>
        <a
          href="http://127.0.0.1:8081/resource/e-resources/Junior Training Sheet.xlsx"
          class="list-group-item"
        >Junior Training Sheet.xlsx</a>
        <a
          href="http://127.0.0.1:8081/resource/e-resources/图论总结 by amber.pdf"
          class="list-group-item"
        >图论总结 by amber.pdf</a>
        <a href="http://127.0.0.1:8081/resource/e-resources/背包问题九讲.pdf" class="list-group-item">背包问题九讲.pdf</a>
        <hr />
        <h2 id="section-3">常用网站</h2>
        <a href="http://codeforces.com/" class="list-group-item">codeforces</a>
        <a href="https://acm.sdut.edu.cn/onlinejudge2/" class="list-group-item">山东理工ACM OJ</a>
        <h2 id="section-4">课件材料</h2>
        <a href="http://127.0.0.1:8081/resource/courseware/ACM竞赛.pdf" class="list-group-item">ACM竞赛.pdf</a>
        <a
          href="http://127.0.0.1:8081/resource/courseware/汕头大学 ACM 模板.md"
          class="list-group-item"
        >汕头大学 ACM 模板.md</a>
        <a
          href="http://127.0.0.1:8081/resource/courseware/汕头大学 ACM 模板.pdf"
          class="list-group-item"
        >汕头大学 ACM 模板.pdf</a>
        <h2 id="section-5">赛事题解</h2>
        <a
          href="http://127.0.0.1:8081/resource/solutions/2018ICPC沈阳网络赛题解.pdf"
          class="list-group-item"
        >2018ICPC沈阳网络赛题解.pdf</a>
        <a
          href="http://127.0.0.1:8081/resource/solutions/ACM-ICPC 2018 Jiaozuo Online Contest - EOJ Wiki.pdf"
          class="list-group-item"
        >ACM-ICPC 2018 Jiaozuo Online Contest - EOJ Wiki.pdf</a>
        <a
          href="http://127.0.0.1:8081/resource/solutions/ACM-ICPC 2018 Nanjing Online Contest - EOJ Wiki.pdf"
          class="list-group-item"
        >ACM-ICPC 2018 Nanjing Online Contest - EOJ Wiki.pdf</a>
        <a
          href="http://127.0.0.1:8081/resource/solutions/ACM-ICPC 2018 Qingdao Online Contest - EOJ Wiki.pdf"
          class="list-group-item"
        >ACM-ICPC 2018 Qingdao Online Contest - EOJ Wiki.pdf</a>
        <a
          href="http://127.0.0.1:8081/resource/solutions/ACM-ICPC 2018 Xuzhou Online Contest - EOJ Wiki.pdf"
          class="list-group-item"
        >ACM-ICPC 2018 Xuzhou Online Contest - EOJ Wiki.pdf</a>
        <hr />
        <h2 id="section-6">发展相册</h2>
        <img alt="杨金朋.jpg" />
        <img alt="卢义文.jpg" />
      </div>
    </div>
  </div>
</body>
</template>

<script>
export default {
  mounted() {
    $(document).ready(function() {
      $("#myNav").affix({
        offset: {
          top: 125
        }
      });
    });
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
/* Custom Styles */
ul.nav-tabs {
  width: 140px;
  margin-top: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}
ul.nav-tabs li {
  margin: 0;
  border-top: 1px solid #ddd;
}
ul.nav-tabs li:first-child {
  border-top: none;
}
ul.nav-tabs li a {
  margin: 0;
  padding: 8px 16px;
  border-radius: 0;
}
ul.nav-tabs li.active a,
ul.nav-tabs li.active a:hover {
  color: #fff;
  background: #0088cc;
  border: 1px solid #0088cc;
}
ul.nav-tabs li:first-child a {
  border-radius: 4px 4px 0 0;
}
ul.nav-tabs li:last-child a {
  border-radius: 0 0 4px 4px;
}
ul.nav-tabs.affix {
  top: 30px; /* Set the top position of pinned element */
}
</style>
