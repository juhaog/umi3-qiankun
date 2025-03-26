# umi3 + qiankun project

## main--主应用

此项目为动态加载子应用路由，菜单不通过routes配置（通过接口获取或者自定义）

### 插件注册（config.ts）

```javascript
qiankun: {
    master: {
      // 注册子应用信息
      // apps: [],
    },
  },
```

### 注册和挂载子应用（app.tsx）--- [umi官网查看具体配置](https://v3.umijs.org/zh-CN/plugins/plugin-qiankun)

```js
// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
export const qiankun = fetch('/api/config')
  .then((res) => {
    return res.json();
  })
  .then(({ apps, routes }) => {
    return Promise.resolve({
      // 注册子应用信息
      apps,
      routes,
      // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
      lifeCycles: {
        afterMount: (props: any) => {
          console.log(props);
        },
      },
      // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
    });
  });
// 判断会话是否过期
export function render(oldRender: () => void) {
  oldRender();
}
```

## sub1--子应用

### 插件注册（config.ts）

```javascript
export default {
  qiankun: {
    slave: {},
  },
};
```

### 配置运行时生命周期钩子

```javascript
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('app1 unmount', props);
  },
};

// 判断会话是否过期
export function render(oldRender: () => void) {
  oldRender();
}
```

## 数据通讯

### 主应用

传递数据(app.tsx)

```javascript
import { useState } from "react";

export const useQiankunStateForSlave = () => {
  const [masterState, setMasterState] = useState({});

  return {
    masterState,
    setMasterState,
  };
}
```

主应用使用

```javascript
import { useModel } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

const index = () => {
  const { masterState } = useModel('@@qiankunStateForSlave');

  return (
    <div>
	{JSON.stringify(masterState)}
    </div>
  );
};

export default App;
```

### 子应用

可在子应用加载时监听数据(app.tsx)

```javascript
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
```

使用时

```javascript
import { useModel } from 'umi';

export default () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const handleSetState = () => {
    masterProps.setMasterState({
      ...masterProps.masterState,
      name: 'sub1',
      age: 18
    })
  }
  return (
    <div>
      <Button onClick={handleSetState}>修改主应用数据</Button>
    </div>
  );
}
```

## 注意

主应用跳转子应用要加指定的前缀，子应用跳转其它的子应用或者主应用不能使用umi的跳转，此处使用的是

`window.history.pushState(null, '', '/home');`

通过useModal使用时需要注意，主应用用的是qiankunStateForSlave，子应用用的是qiankunStateFromMaster

多页签缓存参考文章：[手把手带你在微前端(qiankun)中实现多页签功能(路由keepalive)](https://juejin.cn/post/7225862344483668026)

无语了！！ **qiankun的多页签缓存的bug可以通过上面文章里面的方法处理，这里是通过降低qiankun的版本去处理，一定要在resolutions里面固定版本！！**

问题：

1. 跳转发布订阅模式
2. 引用页面问题，跨应用问题
