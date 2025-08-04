import React, { useEffect } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
// import { history } from 'umi';  // 注释掉原来的 history
// import customHistory from '@/utils/customHistory';  // 引入自定义 history
import { useModel, useLocation } from 'umi';
import history from '@/utils/history';
import useLocationState from '@/hook/useLocaltionState';
// import history from '@/utils/newHistory';

// 声明全局类型
// declare global {
//   interface Window {
//     __CURRENT_ROUTE_CLEANUP__: (() => void) | null;
//   }
// }

export default (props: any) => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const locationState = useLocationState('/sub1/first');
  useEffect(() => {
    // console.log(masterProps)
    // masterProps.onGlobalStateChange((state: any, prev: any) => {
    //   console.log(state, prev)
    // })
    // const a=masterProps.unmountSelf()
    // console.log(a)
    // console.log('locationState', locationState);
    // console.log('history.location', history.location);
    const unlisten = history.listen((location) => {
      console.log('location1', location);
    });

    // 设置当前路由的清理函数
    const cleanup = () => {
      console.log('unlisten', unlisten);
      unlisten();
    };
    // window.__CURRENT_ROUTE_CLEANUP__ = cleanup;

    return cleanup;
    // console.log('props', props);
    // fetch('/api/test1').then(res => {
    //   console.log('sub1/first', res);
    // });
  }, []);

  const handleJump = () => {
    // window.open('https://ysl.cmschina.com/#/')
    // window.history.pushState(null, '', '/home');
    history.push('/home');
    // history.push('/home?name=123&age=18');
  }

  const handleJump2 = () => {
    history.push({
      pathname: '/second',
      // pathname: '/sub1/second',
      query: {
        name: 'xxxxxx',
        age: 'wwwww',
      },
      state: {
        name: '123xx',
        age: '456ww',
      },
    });
  }

  // const handleSetState = () => {
  //   masterProps.setMasterState({
  //     ...masterProps.masterState,
  //     name: 'sub1',
  //     age: 18
  //   })
  // }

  const handleLoading = () => {
    window._QIANKUN_YD.event.emit('loading')
  }
  const handleJump3 = () => {
    // window.history.pushState(null, '', '/sub1/third/1/test?name=4&age=8789');
    history.push({
      pathname: '/sub1/third/1/test',
      query: {
        name: '4',
        age: '8789',
      },
    });
  }
  return (
    <div>
      <h1 className={styles.title}>Page first</h1>
      <Input placeholder='请输入' />
      <Button onClick={handleJump}>跳转主系统1</Button>
      {/* <Button onClick={handleSetState}>修改主应用数据</Button> */}
      <Button onClick={handleJump2}>跳子应用second</Button>
      <Button onClick={handleLoading}>loading</Button>
      <Button onClick={handleJump3}>跳转3</Button>
    </div>
  );
}
