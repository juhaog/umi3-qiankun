import React from 'react';
import styles from './index.less';
import { Input } from 'antd';
import { MicroApp, MicroAppWithMemoHistory } from 'umi';

export default function IndexPage() {

  const menuList = [
    {
      path: '/',
    },
    {
      path: null,
    },
    {
      path: '/customer',
      children: [
        {
          path: null,
          children: [
            {
              path: '/cust/list'
            }
          ]
        }
      ]
    }
  ]

  const addPrefixToPath = (menuItems: any) => {
    return menuItems.map((item: any) => {
      // 创建新对象，避免修改原对象
      const newItem = { ...item };
      
      // 如果有 path 且不为 null，添加前缀
      if (newItem.path !== null && newItem.path !== undefined) {
        newItem.path = '/jgcrm' + newItem.path;
      }
      
      // 如果有 children，递归处理
      if (newItem.children && Array.isArray(newItem.children)) {
        newItem.children = addPrefixToPath(newItem.children);
      }
      
      return newItem;
    });
  };
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Input />
      <MicroAppWithMemoHistory name='sub1' url={'/'} />
    </div>
  );
}
