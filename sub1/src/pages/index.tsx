import { Input } from 'antd';
import styles from './index.less';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {
    fetch('/api/test').then(res => {
      console.log('sub1', res);
    });
  }, []);
  return (
    <div>
      <h1 className={styles.title}>子系统</h1>
      <Input placeholder='请输入' />
    </div>
  );
}
