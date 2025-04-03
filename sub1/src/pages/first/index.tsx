import React, { useEffect } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
// import { history } from 'umi';  // 注释掉原来的 history
// import customHistory from '@/utils/customHistory';  // 引入自定义 history
import { useModel } from 'umi';
// import history from '@/utils/history';
import history from '@/utils/newHistory';

export default (props: any) => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  useEffect(() => {
    console.log('history.location', history.location);
    console.log('props', props);
    // fetch('/api/test1').then(res => {
    //   console.log('sub1/first', res);
    // });
  }, []);

  const handleJump = () => {
    // window.open('https://ysl.cmschina.com/#/')
    window.history.pushState(null, '', '/home');
    // history.push('/home');
    // history.push('/home?name=123&age=18');
  }

  // const handleJump2 = () => {
  //   customHistory.push('/second');
  // }

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
      {/* <Button onClick={handleJump2}>跳子应用</Button> */}
      <Button onClick={handleLoading}>loading</Button>
      <Button onClick={handleJump3}>跳转3</Button>
    </div>
  );
}
