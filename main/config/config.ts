import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'eval', // source-map eval
  antd: {},
  qiankun: {
    master: {
      // 注册子应用信息
      // apps: [],
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      name: '首页',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/home',
          name: '工作台',
          component: '@/pages/index',
        },
        {
          path: '/list1',
          name: '列表1',
          component: '@/pages/list1',
        },
      ],
    },
  ],
  fastRefresh: {},
});
