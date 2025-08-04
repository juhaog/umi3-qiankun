import React, { useEffect } from 'react';
import styles from './index.less';
// import history from '@/utils/history';
import history from '@/utils/newHistory';
import { useParams } from 'umi';
import { Button } from 'antd';
import useLocationState from '@/hook/useLocaltionState';
export default (props: any) => {
  const { id, code } = useParams<{ id: string, code: string }>();
  const locationState = useLocationState(`/third/${id}/${code}`);
  useEffect(() => {
    console.log('locationState', locationState);
    console.log('history.location', history.location);
  }, []);
  return (
    <div>
      <h1 className={styles.title}>Page third</h1>
      <Button onClick={() => {
        history.push({
          pathname: '/sub1/first',
        });
      }}>跳转</Button>
    </div>
  );
}
