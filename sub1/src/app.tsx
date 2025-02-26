export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('sub1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('sub1 mount', props);
    // const routerConfig = require('../src/routes');
    // 可以在子应用加载时传参
    // props?.setMasterState({
    //   sub1Routes: routerConfig,
    // });
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