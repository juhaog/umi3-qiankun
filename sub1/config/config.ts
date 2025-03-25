import { defineConfig } from 'umi';
const routerConfig = require('../src/routes');

export default defineConfig({
  devtool: 'source-map', // 改为 source-map 以便更好地调试
  hash: true,
  antd: {},
  devServer: {
    port: 8004,
  },
  // publicPath: 'http://localhost:8004/',
  qiankun: {
    slave: {
      enable: true,
      devSourceMap: true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
  // fastRefresh: {
  //   loading: '@/components/PageLoading',  // 可选，热更新时的加载组件
  // },
  // mfsu: {}, // 启用 MFSU 构建优化
  // webpack5: {}, // 使用 webpack 5
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  dva: {
    hmr: true, // 开启 dva 的热更新
  },
  // define: {
  //   'process.env.SOCKET_SERVER': 'http://localhost:8001/',  // 添加 SOCKET_SERVER 配置
  // },
});
