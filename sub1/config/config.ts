import { defineConfig } from 'umi';
const routerConfig = require('../src/routes');
import slash from 'slash2';

export default defineConfig({
  mountElementId: 'root-sub1',
  devtool: 'source-map', // 改为 source-map 以便更好地调试
  hash: true,
  antd: {},
  devServer: {
    port: 8004,
  },
  // publicPath: '/',
  base: '/sub1/',
  esbuild: {},
  qiankun: {
    slave: {
      enable: true,
      devSourceMap: true,
      // masterEntry: 'http://localhost:8004',  // 添加主应用入口
      // shouldNotModifyRuntimePublicPath: true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (context: { resourcePath: string; }, localIdentName: string, localName: string, options: any) => {
        if (context.resourcePath.includes('node_modules') || context.resourcePath.includes('mixin.less')) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdPath = match[1].replace('.less', '');
          const arr = slash(antdPath).split('/').map((a: string) => a.replace(/^[A-Z]/g, '-$1')).map((a: string) => a.toLowerCase());
          return `${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        // 提取公共依赖,调整 splitChunks 策略，减少整体尺寸
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              chunks: 'all',
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              // test({ resource }: { resource: string }) {
              //   return /[\/]node_modules[\/]/.test(resource);
              // },
              priority: -10,
            },
            default: {
              maxAsyncRequests: 30,
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });
  },
  // fastRefresh: {
  //   loading: '@/components/PageLoading',  // 可选，热更新时的加载组件
  // },
  // mfsu: {}, // 启用 MFSU 构建优化
  webpack5: {
    // lazyCompilation: {},
  },
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  dva: {
    // hmr: true, // 开启 dva 的热更新
  },
  // define: {
  //   'process.env.SOCKET_SERVER': 'http://localhost:8001/',  // 添加 SOCKET_SERVER 配置
  // },
});
