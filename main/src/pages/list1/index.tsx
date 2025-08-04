import React, { useEffect } from 'react';
import styles from './index.less';
import { Modal } from 'antd';

export default function List1(props: any) {
  useEffect(() => {
    console.log('props', props, window.history.state);
  }, [props]);
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
      <h1 className={styles.title}>list1</h1>
    </div>
  );
}
