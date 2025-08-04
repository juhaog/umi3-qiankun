import _ from 'lodash';

export const getBreadcrumbNameMap = (menuList: any[], routes: any[]) => {
  const routeMap: { [key: string]: any } = {};

  const flattenMenuData = (data: any[]) => {
    if (!data) return;
    data.forEach((menuItem) => {
      if (menuItem.children || menuItem.routes) {
        flattenMenuData(menuItem.children || menuItem.routes);
      }

      routeMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(routes);
  flattenMenuData(menuList);
  return routeMap;
};

export const getBreadcrumb = (
  pathname: string,
  breadcrumbNameMap: { [key: string]: any },
) => {
  return Object.values(breadcrumbNameMap).find(
    (item) => item.path === pathname,
  );
};

export const setPathName = (menuItem: any, location: any) => {
  if (!menuItem) return 'Error';
  if (menuItem.multiple) {
    const title =
      _.get(location, 'query.title') || _.get(location, 'state.title');
    return `${menuItem.name}${title ? ` - ${title}` : ''}`;
  }
  return menuItem.name;
};
