import React, { useEffect } from 'react';
import styles from './index.less';
import { Modal } from 'antd';
import { useParams } from 'umi';
export default function List2(props: any) {
  const { id, code } = useParams<{ id: string, code: string }>();
  useEffect(() => {
    console.log('props', props, id, code);
  }, []);
  // useEffect(() => {
  //   const init = () => {
  //     const ModalRef = Modal.info({
  //       title: '加载中',
  //       content: '加载中...',
  //     });
  //     setTimeout(() => {
  //       ModalRef.destroy()
  //     }, 3000);
  //   }
  //   // 订阅loading事件
  //   window._QIANKUN_YD.event.on('loading', init)
  //   return () => {
  //     window._QIANKUN_YD.event.off('loading', init)
  //   }
  // }, []);
  return (
    <div>
      <h1 className={styles.title}>list2</h1>
    </div>
  );
}
