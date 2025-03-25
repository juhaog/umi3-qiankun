import {
  CloseOutlined,
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
import {
  Breadcrumb,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  Switch,
  Tabs,
} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { history, MicroAppWithMemoHistory, useLocation, useModel } from 'umi';
import { trackPageInfo } from '@/utils/tracker';
import { KeepAliveTab, useKeepAliveTabs } from './useKeepAliveTabs';
import { ItemType, MenuInfo } from 'rc-menu/lib/interface';
import { getBreadcrumbNameMap } from '@/utils';
import { KeepAliveTabContext } from './context';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

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

interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

enum OperationType {
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHER = 'close-other',
}

type MenuItemType = (ItemType & { key: OperationType }) | null;

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

const findMenuItem = (routes?: any[], path?: string): any => {
  if (!routes || routes?.length === 0) return null;
  // 递归查找匹配的菜单项
  for (const route of routes) {
    // 检查当前路由是否匹配
    if (route.key === path) {
      return route;
    }

    // 如果有子路由，递归搜索
    if (route?.children && route?.children?.length) {
      const found = findMenuItem(route?.children, path);
      if (found) {
        return found;
      }
    }
  }
};

const App: React.FC<BasicLayoutProps> = (props) => {
  const { masterState } = useModel('@@qiankunStateForSlave');
  const { children, route } = props;
  const [menu, setMenu] = useState<any>({});
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const { pathname } = useLocation();
  const {
    keepAliveTabs,
    activeTabRoutePath,
    breadcrumbNameMap,
    closeTab,
    refreshTab,
    closeOtherTab,
    onHidden,
    onShow,
  } = useKeepAliveTabs({menu, children});

  useEffect(() => {
    console.log('BasicLayout', children);
  }, [children]);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => {
        return res.json();
      })
      .then(({ routes }) => {
        setMenu(routes);
        // trackPageInfo();
      });
  }, []);

  const menuItems: MenuItemType[] = useMemo(
    () =>
      [
        {
          label: '刷新',
          key: OperationType.REFRESH,
        },
        keepAliveTabs.length <= 1
          ? null
          : {
              label: '关闭',
              key: OperationType.CLOSE,
            },
        keepAliveTabs.length <= 1
          ? null
          : {
              label: '关闭其他',
              key: OperationType.CLOSEOTHER,
            },
      ].filter((o) => o),
    [keepAliveTabs],
  );

  const menuClick = useCallback(
    ({ key, domEvent }: MenuInfo, tab: KeepAliveTab) => {
      domEvent.stopPropagation();

      if (key === OperationType.REFRESH) {
        refreshTab(tab.routePath);
      } else if (key === OperationType.CLOSE) {
        closeTab(tab.routePath);
      } else if (key === OperationType.CLOSEOTHER) {
        closeOtherTab(tab.routePath);
      }
    },
    [closeOtherTab, closeTab, refreshTab],
  );

  const renderTabTitle = useCallback(
    (tab: KeepAliveTab) => {
      return (
        <Dropdown
          menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
          trigger={['contextMenu']}
        >
          <div style={{ margin: '-12px 0', padding: '12px 0' }}>
            {tab.icon}
            {tab.title}
          </div>
        </Dropdown>
      );
    },
    [menuItems],
  );

  const keepAliveContextValue = useMemo(
    () => ({
      closeTab,
      closeOtherTab,
      refreshTab,
      onHidden,
      onShow,
      breadcrumbNameMap,
    }),
    [closeTab, closeOtherTab, refreshTab, onHidden, onShow, breadcrumbNameMap],
  );

  const tabItems = useMemo(() => {
    return keepAliveTabs.map((tab: KeepAliveTab) => {
      return {
        key: tab.routePath,
        label: renderTabTitle(tab),
        children: (
          <div
            key={tab.key}
            style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}
          >
            {React.cloneElement(tab.children, {
              keepAliveHandle: keepAliveContextValue,
            })}
          </div>
        ),
        closable: keepAliveTabs.length > 1,
      };
    });
  }, [keepAliveTabs, keepAliveContextValue]);

  const items2 = useMemo(() => {
    return [{ ...menu }]
      .map((item) => {
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
      })
      .filter(Boolean) as MenuProps['items'];
  }, [menu]);

  const handleMenuClick = (item: any) => {
    if (item.key && item.key !== '/' && item.key !== pathname) {
      history.push(item.key);
    }
  };

  const onTabsChange = useCallback(
    (tabRoutePath: string) => {
      const curTab = keepAliveTabs.find(
        (tab: KeepAliveTab) => tab.routePath === tabRoutePath,
      );
      if (curTab) {
        history.push(curTab?.pathname);
      }
    },
    [keepAliveTabs],
  );

  const onTabEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove') {
      closeTab(targetKey as string);
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
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider theme="light" width={200} className="site-layout-background">
            <Switch
              onChange={(value) => setMode(value ? 'vertical' : 'inline')}
            />
            Change Mode
            <Menu
              mode={mode}
              defaultSelectedKeys={['/home']}
              defaultOpenKeys={['/']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>
          <Layout className="site-layout-background">
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <KeepAliveTabContext.Provider value={keepAliveContextValue}>
                <Tabs
                  activeKey={activeTabRoutePath}
                  onChange={onTabsChange}
                  type="editable-card"
                  hideAdd
                  onEdit={onTabEdit}
                  style={{ marginBottom: 16 }}
                >
                  {tabItems.map((tab) => (
                    <TabPane
                      tab={tab.label}
                      key={tab.key}
                      closeIcon={tab.closable ? <CloseOutlined /> : null}
                    >
                      {tab.children}
                    </TabPane>
                  ))}
                </Tabs>
              </KeepAliveTabContext.Provider>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(App);
