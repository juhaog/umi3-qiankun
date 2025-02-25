import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { history } from 'umi';

export default () => {
  const handleJump = () => {
    window.history.pushState(null, '', '/home');
    // history.push('/home');
  }
  return (
    <div>
      <h1 className={styles.title}>Page first</h1>
      <Button onClick={handleJump}>跳转主系统</Button>
    </div>
  );
}
