import React from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';

export default () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const handleJump = () => {
    // window.open('https://ysl.cmschina.com/#/')
    window.history.pushState(null, '', '/home');
    // history.push('/home');
  }
  const handleSetState = () => {

    const arr1 = [
      {
        path: '/',
        name: '首页',
        routes: [
          {
            path: '/home',
            name: '首页',
            component: './home',
          }
        ]
      },
      {
        path: '/list',
        name: '列表',
        component: './list',
      }
    ]

    const arr2 = [
      {
        path: '/jgcrm',
        name: '子首页',
        component: './jgcrm',
        routes: [
          {
            path: '/first',
            name: '第一个',
            component: './first',
          }
        ]
      },
      {
        path: '/list',
        name: '列表',
        component: './list',
      },
      {
        path: '/list2',
        name: '列表2',
        component: './list2',
      },
    ]

    masterProps.setMasterState({
      ...masterProps.masterState,
      name: 'sub1',
      age: 18
    })
  }
  return (
    <div>
      <h1 className={styles.title}>Page first</h1>
      <Input placeholder='请输入' />
      <Button onClick={handleJump}>跳转主系统1</Button>
      <Button onClick={handleSetState}>修改主应用数据</Button>
    </div>
  );
}
