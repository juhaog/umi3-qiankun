import { history } from 'umi'

export const qiankunConfig = {
  apps: [{
    name: 'sub1',
    entry: '//localhost:8004',
    activeRule: '/sub1',
  }],
  routes: [
    {
      name: 'sub1',
      path: '/sub1',
      microApp: 'sub1',
      microAppProps: {
        autoSetLoading: true,
        className: 'myContainer',
        wrapperClassName: 'myWrapper',
        mainHistory: history,
      }
    },
  ],
};