const routes = [
    {
      path: '/home',
      name: 'Home',
      alias:'/',
      component: () => import('../pages/home.vue'),
    },
    // {
    //   path:'/login',
    //   name:'Login',
    //   component:()=>import('../components/pages/Login.vue')
    // }
  ]
  export default routes