import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'eval', // source-map eval
  antd: {},
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/first', component: '@/pages/first/index' },
    { path: '/second', component: '@/pages/second/index' },
  ],
  fastRefresh: {},
});
