import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';

export default () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const handleJump = () => {
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
      <Button onClick={handleJump}>跳转主系统</Button>
      <Button onClick={handleSetState}>修改主应用数据</Button>
    </div>
  );
}
