import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import history from '@/utils/history';
import { jumpFn } from './config';
// import history from '@/utils/newHistory';

export default (props: any) => {
  const [state, setState] = useState({});
  const jump = jumpFn('/sub1/first', { state });

  useEffect(() => {
    const unlisten = history.listen((location) => {
      console.log('location2', location, props);
    });

    // 设置当前路由的清理函数
    const cleanup = () => {
      console.log('unlisten2', unlisten);
      unlisten();
    };
    // window.__CURRENT_ROUTE_CLEANUP__ = cleanup;

    return cleanup;
    // console.log('history.location', history.location);
    // console.log('props', props);
  }, [history.location]);

  const handleJump = () => {
    // history.push('/sub1/first?name=123&age=18');
    history.push({
      pathname: '/sub1/first',
      query: {
        name: '123',
        age: '18',
      },
      state: {
        name: '123',
        age: '18',
      },
    });
  }

  const handleJump1 = () => {
    history.push({
      pathname: '/sub1/first',
      state: {
        num: '123458',
      },
    });
  }
  // useEffect(() => {
  //   fetch('/api/test2').then(res => {
  //     console.log('sub1/second', res);
  //   });
  // }, []);
  return (
    <div>
      <h1 className={styles.title}>Page second</h1>
      <Input placeholder='请输入' />
      {/* <Button onClick={handleJump}>跳转1</Button>
      <Button onClick={handleJump1}>跳转11</Button> */}
      <Button onClick={jump}>跳转1</Button>
      <Button onClick={() => setState({ num: '123458' })}>切换数据1</Button>
      <Button onClick={() => setState({ num: '999999' })}>切换数据2</Button>
    </div>
  );
}
