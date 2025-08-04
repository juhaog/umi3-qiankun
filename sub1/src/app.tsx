const routerConfig = require('../src/routes');
// let hasRegisteredRoutes = false;
import '@/utils/qiankun'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

// 声明全局类型
declare global {
  interface Window {
    __SUB1_ROOT__: any;
    __MAIN_HISTORY__: any;
  }
}

const persistConfig = {
  key: 'root-sub1',
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

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    // const token = window._QIANKUN_YD.store.get('token');
    // console.log('这是从主应用中获取的token：', token);
    console.log('sub1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    const { mainHistory } = props;
    const { hasRegisteredRoutes } = props?.masterState;
    console.log('sub1 mount', props, hasRegisteredRoutes);
    
    // 存储主应用的 history
    window.__MAIN_HISTORY__ = mainHistory;
    
    if (!hasRegisteredRoutes) {
      props?.microSetMasterState({
        sub1Routes: routerConfig,
        hasRegisteredRoutes: true,
      });
    }
    // 监听主应用传递的参数变化
    // props?.onGlobalStateChange((state: any, prev: any) => {
    //   // state: 变更后的状态; prev 变更前的状态
    //   console.log('sub1 onGlobalStateChange', state, prev);
    // });
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    // const { singleSpa } = props
    // singleSpa?.unloadApplication(props.name)
    console.log('sub1 unmount', props);
    const {container} = props;
    // if (container) {
    //   console.log('container', container);
    //   // ReactDOM.unmountComponentAtNode(container);
    //   // const root = createRoot(container);
    //   // root.unmount();
    // }
  },
};

// 判断会话是否过期
export function render(oldRender: () => void) {
  oldRender();
}