export default {
  '/api/config': {
    apps: [
      {
        name: 'sub1',
        entry: '//localhost:8001',
      },
    ],
    routes: [
      {
        name: 'sub1',
        path: '/sub1',
        microApp: 'sub1',
      },
    ],
  },
  '/api/menu': {
    routes: {
      path: '/',
      name: '首页',
      routes: [
        {
          path: '/sub1',
          name: '子系统sub1',
        },
        {
          path: '/home',
          name: '工作台',
        },
        {
          path: '/sub1/first',
          name: '子页面1',
        },
        {
          path: '/list1',
          name: '列表1',
        },
        {
          path: '/sub1/second',
          name: '子页面2',
        },
      ],
    },
  },
};
