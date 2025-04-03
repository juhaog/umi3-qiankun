import { MicroAppWithMemoHistory, useLocation, history } from 'umi';
// import { MicroAppWithMemoHistory, useLocation, useOutlet as useChildren } from 'umi'
import { qiankunConfig } from '@/qiankun-config';

interface UseOutletProps {
  children: React.ReactNode;
}

export function useOutlet(props: UseOutletProps) {
  const { children } = props;
  const { pathname } = useLocation();

  // const children = useChildren();

  const [appName, moduleName] = pathname.split('/');

  // 如果没有匹配到子模块，就使用主模块的useOutlet
  const app = qiankunConfig.apps.find((app) => app.name === moduleName);
  if (!app) {
    // if (!qiankunConfig.apps.some(app => app.name === moduleName)) {
    return children;
  }

  const getRemainingPath = (path: string) => {
    const index = path.indexOf('/', 1);
    return index === -1 ? '/' : path.substring(index);
  };

  const remainingPath = getRemainingPath(pathname);
  console.log('appName', moduleName, remainingPath, pathname);

  return (
    <MicroAppWithMemoHistory
      id={pathname}
      name={app.name}
      url={remainingPath}
      autoSetLoading={true}
      className="myContainer"
      wrapperClassName="myWrapper"
      mainHistory={history}
    />
  );
}
