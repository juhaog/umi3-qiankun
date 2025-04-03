import React, { useEffect } from 'react';
import styles from './index.less';
// import history from '@/utils/history';
import history from '@/utils/newHistory';
import { useParams } from 'umi';
export default (props: any) => {
  const { id, code } = useParams<{ id: string, code: string }>();
  useEffect(() => {
    console.log('props', props, id, code);
  }, []);
  return (
    <div>
      <h1 className={styles.title}>Page third</h1>
    </div>
  );
}
