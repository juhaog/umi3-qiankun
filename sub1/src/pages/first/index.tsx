import React, { useEffect } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';

export default () => {
  const masterProps = useModel('@@qiankunStateFromMaster');

  useEffect(() => {
    fetch('/api/test1').then(res => {
      console.log('sub1/first', res);
    });
  }, []);

  const handleJump = () => {
    // window.open('https://ysl.cmschina.com/#/')
    window.history.pushState(null, '', '/home');
    // history.push('/home');
  }
  const handleSetState = () => {
    masterProps.setMasterState({
      ...masterProps.masterState,
      name: 'sub1',
      age: 18
    })
  }
  return (
    <div>
      <h1 className={styles.title}>Page first</h1>
      <Input placeholder='请输入' />
      <Button onClick={handleJump}>跳转主系统1</Button>
      <Button onClick={handleSetState}>修改主应用数据</Button>
    </div>
  );
}
