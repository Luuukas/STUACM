# STUACM

> A Vue.js project
## 本地运行
```bash
# 已经通过npm run build，把生成的dist目录放在了server/public目录下，只运行服务器即可
# 命令行cd到ACM-MISSIONS/server目录下
node server.js
```
## 本地调试运行
``` bash
# 安装配置好node环境
# 命令行cd到ACM-MISSIONS目录下
npm install
npm run dev
# 命令行cd到ACM-MISSIONS/server目录下
node server.js
# 过程需要用npm install安装部分依赖

# 需要利用爬虫更新任务状态
node refresh.js
# 需要官方发布题目，更改releaseOfficialMission.js中new_mission对象的内容，然后
node releaseOfficialMission.js
```

## 技术栈

``` bash
前端Vue.js，用到vuex、vue-resource。
后端Node.js，用到express、formidable、express-session、mysql；
用Node.js写的爬虫，用到superagent、cheerio。
RSA加密传输用到jsencrypt、node-rsa。
```

## 文件结构
``` bash
**ACM-MISSIONS**
	effect_pictures: 该目录下保存项目效果图
	server: 该目录下为Node.js的服务端文件
	其他文件均由vue-cli生成

**ACM-MISSIONS/src/store**
	index.js: 该文件用vuex实现全局变量的存储
	
**ACM-MISSIONS/src/components**
	Home.vue: 主页，主要用于提供各种文件，网站资源（现已把首页移至后端，该组件被停用）
	Enroll.vue: 注册页面（现已把注册移至后端，该组件被停用）
	MainPage.vue: 主页面
	showProfile.vue: 主页面中左侧展示个人信息的组件
	aMindMap.vue: Mind-maps折叠面板下的一项
	newMindMap.vue: 新建mindmap时，填写表单的弹出框
	MindMap.vue: 点击一项mindmap时，主页面右侧<router-view>将展示该页面，渲染相应导图，并会被填入相应数据
	Detail.vue: 点击导图中的节点时，弹出该弹出框，并会被填入该节点的相应信息
	MissionsPage.vue: 点击左上角Missions button时，主页面右侧<router-view>将展示任务列表
	aSetOfMissions.vue: 任务列表中的一项折叠面板
	aPieceOfMission.vue: 一项折叠面板中的一项任务
	aMission.vue: 点击一项任务后，弹出该弹出框，并会被填入该任务的相应信息
	newMission.vue: 新建Personal mission时，填写表单的弹出框
	EditProfile.vue: 修改个人信息时，填写表单的弹出框
	
**ACM-MISSIONS/server/public**
	Home.html: 首页
	Enroll.html: 注册页面
	ManageHome: 后台管理页面
	files: 该目录保存用户上传的文件
	imgs: 该目录保存用户头像图片
	resource: 主页用到的各种公开资源
	dist: 该目录为前端npm run build生成的静态资源文件夹
	
**ACM-MISSIONS/server**
	package.json:
	node_modules:
	public:
	file_handle.js: 用formidable专门用于保存用户上传的文件
	img_handle.js: 用formidable专门用于保存用户上传的头像
	sql_handle.js: 用mysql专门处理与数据库交互的事件
	server.js: 服务ACM-MISSIONS的服务器文件
	CODEFORCES_worker.js: codeforces爬虫，输入用户名，爬取其所有提交
	SDUT_worker.js: sdutacm爬虫，输入用户名，爬取其所有提交
	refresh.js: 利用爬虫，逐个用户，把该用户绑定的cf,sdutacm账号下所有提交记录爬下来，逐个任务逐道题目在提交记录中查找测评状态，更新数据库中的状态
	releaseOfficialMission.js: 官方发布任务，把任务添加到所有用户下
	addCodes.js: 向codes数据库添加可用的激活码
	resources.js: 服务后台管理的服务器文件
	ress_handle: 专门管理后台管理页面上传来的文件，同时爬取替换更新静态Home.html
```
## 数据库相关代码
``` bash
// 创建存储用户信息的表
CREATE TABLE `stuacm`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `signature` TINYTEXT NULL,
  `codeforces` VARCHAR(45) NULL,
  `sdutacm` VARCHAR(45) NULL,
  `blogs` JSON NULL,
  `img_url` VARCHAR(128) NULL,
  `enroll_t` VARCHAR(45) NULL,
  `email` VARCHAR(128) NOT NULL,
  `tag` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `username`));

// 创建与用户名对应的一张专门存储该用户相关的任务信息的表
CREATE TABLE `stuacm`.`missions_<username>` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `name` VARCHAR(45) NULL,
  `brief` TINYTEXT NULL,
  `belong` VARCHAR(45) NULL,
  `start_t` VARCHAR(45) NULL,
  `end_t` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `details` JSON NULL,
  PRIMARY KEY (`id`));

// 创建与用户名对应的一张专门存储该用户相关的导图的表
CREATE TABLE `stuacm`.`mindmaps_<username>` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `name` VARCHAR(45) NULL,
  `brief` TINYTEXT NULL,
  `details` JSON NULL,
  PRIMARY KEY (`id`));

// 创建一张存储激活码的表
CREATE TABLE `stuacm`.`codes` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `value` VARCHAR(64) NULL,
  `isused` INT NULL,
  `cotag` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
```
## 注意事项
``` mysql
1. Vue与layui存在莫名冲突，layui的折叠面板在Vue中可能需要手动刷新页面才能正常使用
2. 该项目同时使用了layui和boostrap两个ui库，使用时需要格外注意避免两个ui库之间的冲突
3. Vue与Node运行在不同端口上，需要注意跨域问题，特别的，vue-resource和ajax都需要设置
4. 项目中的请求路径，数据库信息，express-session的密钥secret需要按环境修改
5. 注意异步问题，尤其是数据库操作和爬虫
6. node连接mysql失败，有可能是因为mysql版本过高，使用的密码加密方式不同
7. npm run build前，先修改config/index.js文件中对应项为[assetsPublicPath: './'][productionSourceMap: false]
```

## 功能描述

``` bash
* 展示，修改个人信息
* 登录、注册、修改密码
* 添加、查看任务
* 添加、编辑、查看思维导图
* 后台定时爬虫更新每个用户每个任务的状态
```
## TODO
``` bash
前端:
	1. ~~完善css~~[done]
	2. ~~主页资源站~~[done]
	3. ~~表单填写格式限制~~[done]
后端：
	1. ~~Official为所有人添加题目~~[done]
	2. ~~注册激活码数据库~~[done]
	3. ~~爬虫刷新状态~~[done]
	4. 数据库取email邮件通知
	5. 爬虫改为并发
```
## 当前效果图

![missinspage](./effect_pictures/missionspage.png)

![missinspage](./effect_pictures/mindmapspage.png)

![viewmission](./effect_pictures/viewmission.png)

![mindmapdetail](./effect_pictures/mindmapdetail.png)

![editprofile](./effect_pictures/editprofile.png)

![1571695918316](./effect_pictures/1571695918316.png)

![1571695959477](./effect_pictures/1571695959477.png)

![1571695982095](./effect_pictures/1571695982095.png)