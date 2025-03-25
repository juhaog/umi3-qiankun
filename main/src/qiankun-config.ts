export const qiankunConfig = {
  apps: [{
    name: 'sub1',
    entry: '//localhost:8004',
  }],
  routes: [
    {
      name: 'sub1',
      path: '/sub1',
      microApp: 'sub1',
    },
  ],
};