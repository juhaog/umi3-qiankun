const apiPrefixMock: string = process.env.NODE_ENV === 'pre' ? '/pre/api' : '/api';
const apiPrefix: string = '/cms_service';
const tokenKey: string = 'token';
const title: string = '后台';
export const homePage = '/home';

export default {
  apiPrefixMock,
  apiPrefix,
  homePage,
  title,
  tokenKey,
};
