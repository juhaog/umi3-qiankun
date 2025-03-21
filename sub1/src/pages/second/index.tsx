import React from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import { history } from 'umi';

export default () => {

  const handleJump = () => {
    history.push('/first');
  }
  return (
    <div>
      <h1 className={styles.title}>Page second</h1>
      <Input placeholder='请输入' />
      <Button onClick={handleJump}>跳转1</Button>
    </div>
  );
}
