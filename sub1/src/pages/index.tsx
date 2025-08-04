import { Input, Button } from 'antd';
import styles from './index.less';
import { useEffect } from 'react';
import history from '@/utils/newHistory';
// import history from '@/utils/history';
export default function IndexPage() {
  useEffect(() => {
    // console.log('window', window, window.__POWERED_BY_QIANKUN__, window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__, window.__webpack_public_path__);
    fetch('/api/test').then(res => {
      console.log('sub1', res);
    });
  }, []);

  const handleJump = () => {
    history.push({
      pathname: '/list2/1/test',
      query: {
        name: '456',
        age: '99',
      },
    });
  }
  return (
    <div>
      <h1 className={styles.title}>子系统</h1>
      <Input placeholder='请输入' />
      <Button onClick={handleJump}>跳转</Button>
    </div>
  );
}
