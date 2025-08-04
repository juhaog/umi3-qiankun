import {
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React, { memo, useEffect, useState } from 'react';
import history from '@/utils/history';
const { Header, Content, Footer, Sider } = Layout;

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
}

interface LocationProps {
  newLocation: typeof history.location;
}

const App: React.FC<BasicLayoutProps> = (props) => {
  const { children, route } = props;
  // const [location, setLocation] = useState(history.location);

  // useEffect(() => {
  //   return history.listen((location) => {
  //     console.log('location', location, history.location);
  //     // setLocation(location);
  //   });
  // }, []);

  // const childrenWithProps = React.Children.map(children, (child) => {
  //   if (React.isValidElement<LocationProps>(child)) {
  //     return React.cloneElement(child, { newLocation: location });
  //   }
  //   return child;
  // });

  return (
    <ConfigProvider locale={zhCN}>
      {/* {childrenWithProps} */}
      {children}
      {/* <Layout>
        <Content>{children}</Content>
      </Layout> */}
    </ConfigProvider>
  );
};

export default App;
