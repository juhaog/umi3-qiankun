import { defineConfig } from 'umi';
import slash from 'slash2';

export default defineConfig({
  devtool: 'eval', // source-map eval
  antd: {},
  hash: true,
  dva: {
    immer: true,
    hmr: true,
  },
  esbuild: {},
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
  locale: {
    antd: false,
    default: 'zh-CN',
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
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  // fastRefresh: {
  //   loading: '@/components/PageLoading',
  // },
  webpack5: {
    // lazyCompilation: {},
  },
  // mfsu: {},
});
