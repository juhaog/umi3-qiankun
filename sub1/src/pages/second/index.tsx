import React, { useEffect } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
// import history from '@/utils/history';
import history from '@/utils/newHistory';

export default () => {

  const handleJump = () => {
    history.push('/sub1/first?name=123&age=18');
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
      <Button onClick={handleJump}>跳转1</Button>
    </div>
  );
}
