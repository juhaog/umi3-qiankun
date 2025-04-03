const Routes = [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
      {
        path: '/first',
        component: '@/pages/first/index',
      },
      {
        path: '/second',
        component: '@/pages/second/index',
      },
      {
        path: '/third/:id/:code',
        component: '@/pages/third/index',
      },
    ],
  },
  
];

module.exports = Routes;
