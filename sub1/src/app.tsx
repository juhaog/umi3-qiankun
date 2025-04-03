const routerConfig = require('../src/routes');
let hasRegisteredRoutes = false;
import '@/utils/qiankun'

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    // const token = window._QIANKUN_YD.store.get('token');
    // console.log('这是从主应用中获取的token：', token);
    console.log('sub1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('sub1 mount', props, hasRegisteredRoutes);
    const { mainHistory } = props;
    // 可以将主应用的 history 存储到全局状态管理中
    window.__MAIN_HISTORY__ = mainHistory;
    if (!hasRegisteredRoutes) {
      // 可以在子应用加载时传参
      props?.setMasterState({
        sub1Routes: routerConfig,
      });
      hasRegisteredRoutes = true;
    }
    // 监听主应用传递的参数变化
    props?.onGlobalStateChange((state: any, prev: any) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('sub1 onGlobalStateChange', state, prev);
    });
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('sub1 unmount', props);
  },
};

// 判断会话是否过期
export function render(oldRender: () => void) {
  oldRender();
}