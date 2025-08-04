import { history as subHistory } from 'umi';

const handlePath = (path: string) => {
  if (window.__POWERED_BY_QIANKUN__) {
    // 主应用下运行时，不做处理
    return path;
  } else {
    // 单独运行时，如果路径以 /sub1 开头，则去掉
    return path.startsWith('/sub1') ? path.replace('/sub1', '') : path;
  }
};

class PrefixHistory {
  private history: typeof subHistory;

  constructor(history: typeof subHistory) {
    this.history = history;
  }

  get location() {
    return this.history.location;
  }

  get length() {
    return this.history.length;
  }

  get action() {
    return this.history.action;
  }

  push(path: string | any, state?: any) {
    if (typeof path === 'string') {
      this.history.push(handlePath(path), state);
    } else {
      const location = { ...path };
      if (location.pathname) {
        location.pathname = handlePath(location.pathname);
      }
      this.history.push(location);
    }
  }

  replace(path: string | any, state?: any) {
    if (typeof path === 'string') {
      this.history.replace(handlePath(path), state);
    } else {
      const location = { ...path };
      if (location.pathname) {
        location.pathname = handlePath(location.pathname);
      }
      this.history.replace(location);
    }
  }

  go(n: number) {
    this.history.go(n);
  }

  goBack() {
    this.history.goBack();
  }

  goForward() {
    this.history.goForward();
  }

  listen(listener: any) {
    return this.history.listen(listener);
  }

  block(prompt?: any) {
    return this.history.block(prompt);
  }

  createHref(location: any) {
    return this.history.createHref(location);
  }
}

export const getHistory = () => {
  const baseHistory = window.__POWERED_BY_QIANKUN__ ? window.__MAIN_HISTORY__ : subHistory;
  return baseHistory;
  // return new PrefixHistory(baseHistory);
};

const history = getHistory();
export default history;
