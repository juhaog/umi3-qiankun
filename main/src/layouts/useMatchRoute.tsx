import { IRoute, history, useLocation } from 'umi';
// import { IRoute, history, useAppData, useIntl, useLocation, useSelectedRoutes } from 'umi';
import { useEffect, useState } from 'react';
import { useOutlet } from './useOutlet';
import { getBreadcrumb, setPathName } from '@/utils';

type CustomIRoute = IRoute & {
  name: string;
}

interface MatchRouteType {
  title: string;
  pathname: string; //  /user/1
  children: any;
  routePath: string; // /user/:id
  icon?: any;
}

interface UseMatchRouteProps {
  breadcrumbNameMap: Record<string, any>;
  children: React.ReactNode;
}

export function useMatchRoute(props: UseMatchRouteProps) {
  const { breadcrumbNameMap, children: propsChildren } = props;
  // 获取匹配到的路由
  // const selectedRoutes = useSelectedRoutes();
  // 获取路由组件实例
  const children = useOutlet({ children: propsChildren });
  // 获取所有路由
  // const { routes } = useAppData();
  // 获取当前url
  const { pathname } = useLocation();
  // 国际化方法，因为默认菜单做了国际化，所以需要把菜单转成中文
  // const { formatMessage } = useIntl();

  const [matchRoute, setMatchRoute] = useState<MatchRouteType | undefined>();

  // 处理菜单名称
  // const getMenuTitle = (lastRoute: any) => {
  //   let curRoute = lastRoute.route;
  //   let names = ['menu'];

  //   while (curRoute.parentId && !curRoute.isLayout) {
  //     if ((routes[curRoute.parentId] as CustomIRoute).name) {
  //       names.push((routes[curRoute.parentId] as CustomIRoute).name);
  //     } else {
  //       break;
  //     }
  //     curRoute = routes[curRoute.parentId];
  //   }

  //   names.push(lastRoute.route.name);

  //   return formatMessage({ id: names.join('.') });
  // }

  // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
  useEffect(() => {

    // 获取当前匹配的路由
    const breadcrumb = getBreadcrumb(pathname, breadcrumbNameMap);
    // const lastRoute = selectedRoutes.at(-1);

    if (!breadcrumb) return;
    // if (!lastRoute?.route?.path) return;

    // const routeDetail = routes[(lastRoute.route as any).id];

    // 如果匹配的路由需要重定向，这里直接重定向
    if (breadcrumb?.redirect) {
      history.replace(breadcrumb?.redirect);
      return;
    }
    // if (routeDetail?.redirect) {
    //   history.replace(routeDetail?.redirect);
    //   return;
    // }

    // 获取菜单名称
    const title = setPathName(breadcrumb, location);
    // const title = getMenuTitle(lastRoute);

    setMatchRoute({
      title,
      pathname,
      children,
      routePath: breadcrumb.path,
      // routePath: lastRoute.route.path,
      // icon: (lastRoute.route as any).icon,  // icon是拓展出来的字段
    });

  }, [pathname])


  return matchRoute;
}