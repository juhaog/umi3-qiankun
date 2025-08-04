import { useState } from "react";
import { qiankunConfig } from "./qiankun-config";
import '@/utils/qiankun'
import actions from "./utils/actions";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    // 'global',
    // 'login'
  ],
};

/**
 * 引入redux-persist持久化
 */
const persistEnhancer = () => (createStore: any) => (reducer: any, initialState: any, enhancer: any) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  return {
    ...store,
    persist,
  };
};

export const dva = {
  config: {
    extraEnhancers: [persistEnhancer()],
    onError(err: any) {
      err.preventDefault();
    },
  },
};

export const useQiankunStateForSlave = () => {
  const [masterState, setMasterState] = useState({});

  const microSetMasterState = (state: any) => {
    const allStates = Object.assign(masterState, state);
    setMasterState(allStates);
    actions.setGlobalState(allStates);
  }
  return {
    masterState,
    // setMasterState,
    microSetMasterState,
  };
}

// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
// export const qiankun = fetch('/api/config')
//   .then((res) => {
//     return res.json();
//   })
//   .then(({ apps, routes }) => {
//     return Promise.resolve({
//       // 注册子应用信息
//       apps,
//       routes,
//       prefetch: 'all',
//       // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
//       lifeCycles: {
//         afterMount: (props: any) => {
//           console.log(props);
//         },
//       },
//       // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
//     });
// });
export const qiankun = Promise.resolve({
  // 注册子应用信息
  apps: qiankunConfig.apps,
  routes: qiankunConfig.routes,
  // apps: [
  //   {
  //     name: 'sub1',
  //     entry: '//localhost:8004',
  //   },
  // ],
  // routes: [
  //   {
  //     name: 'sub1',
  //     path: '/sub1',
  //     microApp: 'sub1',
  //   },
  // ],
  // sandbox: true,
  // prefetch: 'all',
  // sandbox: { strictStyleIsolation: true },
  sandbox: false,
  // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
  lifeCycles: {
    afterMount: (props: any) => {
      console.log('afterMount主应用', props);
    },
    beforeUnmount: (props: any) => {
      console.log('beforeUnmount主应用', props);
    },
  },
  // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
});
// 判断会话是否过期
export function render(oldRender: () => void) {
  oldRender();
}
