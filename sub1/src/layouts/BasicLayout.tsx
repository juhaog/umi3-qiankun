import {
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React, { memo, useEffect } from 'react';
const { Header, Content, Footer, Sider } = Layout;

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
}

const App: React.FC<BasicLayoutProps> = (props) => {
  const { children, route } = props;
  useEffect(() => {
    console.log('children', children);
  }, [children]);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
