import Vue from 'vue'
import Router from 'vue-router'
import MissionsPage from '@/components/MissionsPage'
import MainPage from '@/components/MainPage'
import MindMap from '@/components/MindMap'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/',
          redirect: '/MissionsPage'
        },
        {
          path: '/MindMap',
          name: 'MindMap',
          component: MindMap
        },
        {
          path: '/MissionsPage',
          name: 'MissionsPage',
          component: MissionsPage
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log(to.fullPath)
//   if((to.fullPath).toString().substr(0,8)=="/section"){
//     next({
//       path: '/',
//     });
//   }else{
//     next();
//   } 
// });

export default router