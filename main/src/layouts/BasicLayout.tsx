import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, Switch } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React, { memo, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
}

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const App: React.FC<BasicLayoutProps> = (props) => {
  const { children, route } = props;
  const [menu, setMenu] = useState<any>({});
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');

  const getMenuItems = (routes: any[]): MenuProps['items'] => {
    if (!routes || routes?.length === 0) return [];
    return routes.map((item) => {
      return {
        key: item.path,
        label: item.name,
        children: item?.routes ? getMenuItems(item.routes) : undefined,
      };
    });
  };

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  useEffect(() => {
    fetch('/api/menu').then((res) => {
      return res.json();
    })
    .then(({ routes }) => {
      setMenu(routes);
    });
  }, []);

  const items2 = useMemo(() => {
    return [{ ...menu }].map((item) => {
      if (item.routes && item.routes.length > 0) {
        return {
          key: item.path,
          label: item.name,
          children: item?.routes ? getMenuItems(item.routes) : undefined,
        };
      }
      return {
        key: item.path,
        label: item.name,
      };
    }).filter(Boolean) as MenuProps['items'];
  }, [menu]);
    
  const handleMenuClick = (item: any) => {
    if (item.key && item.key !== '/') {
      history.push(item.key);
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={`${styles.layout}`}>
        <Header className="header">
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>、
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sider theme='light' className="site-layout-background" width={200}>
              <Switch onChange={changeMode} /> Change Mode
              <Menu
                mode={mode}
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['/']}
                style={{ height: '100%' }}
                items={items2}
                onClick={handleMenuClick}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
