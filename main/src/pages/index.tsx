import React, { useEffect } from 'react';
import styles from './index.less';
import { Input, Button } from 'antd';
import { MicroApp, MicroAppWithMemoHistory, history } from 'umi';

export default function IndexPage(props: any) {
  useEffect(() => {
    console.log('props', props);
  }, []);

  const handleJump = () => {
    history.push({
      pathname: '/list1',
      search: '?name=123&age=18',
    });
  }

  const handleJump2 = () => {
    history.push({
      pathname: '/sub1/first',
      query: {
        name: '456',
        age: '99',
      },
    });
  }

  const handleJump3 = () => {
    history.push({
      pathname: '/list2/1/test',
    });
  }

  const handleJump4 = () => {
    history.push({
      pathname: '/sub1/third/1/test',
      query: {
        name: '46',
        age: '9',
      },
    });
  }

  // const menuList = [
  //   {
  //     path: '/',
  //   },
  //   {
  //     path: null,
  //   },
  //   {
  //     path: '/customer',
  //     children: [
  //       {
  //         path: null,
  //         children: [
  //           {
  //             path: '/cust/list'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]

  // const addPrefixToPath = (menuItems: any) => {
  //   return menuItems.map((item: any) => {
  //     // 创建新对象，避免修改原对象
  //     const newItem = { ...item };
      
  //     // 如果有 path 且不为 null，添加前缀
  //     if (newItem.path !== null && newItem.path !== undefined) {
  //       newItem.path = '/jgcrm' + newItem.path;
  //     }
      
  //     // 如果有 children，递归处理
  //     if (newItem.children && Array.isArray(newItem.children)) {
  //       newItem.children = addPrefixToPath(newItem.children);
  //     }
      
  //     return newItem;
  //   });
  // };
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Input />
      <Button onClick={handleJump}>跳转</Button>
      <Button onClick={handleJump2}>跳转2</Button>
      <Button onClick={handleJump3}>跳转3</Button>
      <Button onClick={handleJump4}>跳转4</Button>
      {/* <MicroAppWithMemoHistory name='sub1' url={'/'} /> */}
    </div>
  );
}
