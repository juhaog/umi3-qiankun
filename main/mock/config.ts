export const menuList = [
  {
    children: [
      {
        children: null,
        component: null,
        icon: null,
        id: 'access_config',
        path: '/sub1',
        name: '子系统sub1',
        upperId: 'access',
        url: null,
      },
      {
        children: null,
        code: 'access_config_home',
        component: null,
        icon: null,
        id: 'access_config_home',
        path: '/home',
        name: '工作台',
        upperId: 'access_config',
        url: null,
      },
      {
        children: null,
        code: 'access_config_add',
        component: null,
        icon: null,
        id: 'access_config_add',
        path: '/sub1/first',
        name: '子页面1',
        upperId: 'access_config',
        url: null,
      },
      {
        children: null,
        code: 'access_config_add1',
        component: null,
        icon: null,
        id: 'access_config_add1',
        path: '/list1',
        name: '列表1',
        upperId: 'access_config1',
        url: null,
      },
      {
        children: null,
        code: 'access_config_add2',
        component: null,
        icon: null,
        id: 'access_config_add2',
        path: '/sub1/second',
        name: '子页面2',
        upperId: 'access_config2',
        url: null,
      },
      {
        children: null,
        code: 'access_config_add3',
        component: null,
        icon: null,
        id: 'access_config_add3',
        path: '/list2/1/test',
        name: '列表2',
        upperId: 'access_config3',
        url: null,
      },
      {
        children: null,
        code: 'access_config_add4',
        component: null,
        icon: null,
        id: 'access_config_add4',
        path: '/sub1/third/1/test',
        name: '子页面3',
        upperId: 'access_config4',
        url: null,
      },
    ],
    code: 'react_index_page',
    component: null,
    icon: null,
    id: 'index',
    name: '首页',
    path: '/',
    upperId: '0',
    url: null,
  },
];
export default {
  '/api/config': {
    apps: [
      {
        name: 'sub1',
        entry: '//localhost:8001',
      },
    ],
    routes: [
      {
        name: 'sub1',
        path: '/sub1',
        microApp: 'sub1',
      },
    ],
  },
  '/api/menu': {
    routes: {
      path: '/',
      name: '首页',
      routes: [
        {
          path: '/sub1',
          name: '子系统sub1',
        },
        {
          path: '/home',
          name: '工作台',
        },
        {
          path: '/sub1/first',
          name: '子页面1',
        },
        {
          path: '/list1',
          name: '列表1',
        },
        {
          path: '/sub1/second',
          name: '子页面2',
        },
        {
          path: '/list2/1/test',
          name: '列表2',
        },
        {
          path: '/sub1/third/1/test',
          name: '子页面3',
        },
      ],
    },
  },
  '/api/menu2': {
    menuList: menuList,
  },
};
