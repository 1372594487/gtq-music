const routes = [
    {
      path: '/home',
      name: 'Home',
      alias:'/',
      component: () => import('../pages/home.vue'),
    },
  ]
  export default routes