import { defineConfig } from 'umi';
const routerConfig = require('../src/routes');

export default defineConfig({
  devtool: 'eval', // source-map eval
  antd: {},
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
  fastRefresh: {},
});
