import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'eval', // source-map eval
  antd: {},
  hash: true,
  dva: {
    immer: true,
    hmr: true,
  },
  devServer: {
    port: 8003,
  },
  proxy: {
    'sub1': {
      target: 'http://localhost:8001',
      'changeOrigin': true,
      'pathRewrite': { '^/sub1' : '' },
    },
  },
  mock: {},
  qiankun: {
    master: {
      // 注册子应用信息
      // apps: [],
      // singular: false,
    },
  },
  targets: {
    ie: 10,
    chrome: 46,
  },
  ignoreMomentLocale: true,
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
          path: '/',
          redirect: '/home',
        },
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
        {
          path: '/list2/:id/:code',
          name: '列表2',
          component: '@/pages/list2',
        },
        // {
        //   name: '子应用首页',
        //   path: '/sub1/',
        // },
        // {
        //   name: '子应用列表1',
        //   path: '/sub1/first/',
        // },
        // {
        //   name: '子应用列表2',
        //   path: '/sub1/second/',
        // },
      ],
    },
  ],
  lessLoader: {
    javascriptEnabled: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  }
  // fastRefresh: {
  //   loading: '@/components/PageLoading',
  // },
});
