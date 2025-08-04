import { history as subHistory, createBrowserHistory } from 'umi';
type ParsedQuery = Record<string, string | string[] | null>;
type Action = 'PUSH' | 'REPLACE' | 'POP';
type UnregisterCallback = () => void;
type LocationListener = (location: Location, action: Action) => void;

type Listener = (location: Location) => void;

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  query: ParsedQuery;
}

interface LocationDescriptorObject {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: any;
  query?: ParsedQuery;
}

const handlePath = (path: string) => {
  if (window.__POWERED_BY_QIANKUN__) {
    // 主应用下运行时，不做处理
    return path;
  } else {
    // 单独运行时，如果路径以 /sub1 开头，则去掉
    return path.startsWith('/sub1') ? path.replace('/sub1', '') : path;
  }
};

class History {
  private listeners: LocationListener[] = [];

  // 解析查询字符串
  private parseQuery(search: string): ParsedQuery {
    if (!search || search === '?') return {};

    const query: ParsedQuery = {};
    const searchParams = new URLSearchParams(
      search.startsWith('?') ? search.slice(1) : search,
    );

    searchParams.forEach((value, key) => {
      if (key in query) {
        // 如果已经存在该键，转换为数组
        const existing = query[key];
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          query[key] = [existing as string, value];
        }
      } else {
        query[key] = value;
      }
    });

    return query;
  }

  get location(): Location {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: window.history.state,
      query: this.parseQuery(window.location.search),
    };
  }

  get length() {
    return window.history.length;
  }

  get action(): Action {
    return 'POP';
  }

  // 添加历史记录
  push(path: string | LocationDescriptorObject, state?: any) {
    if (typeof path === 'string') {
      window.history.pushState(state, '', path);
    } else {
      const {
        pathname = '',
        search = '',
        hash = '',
        state: locationState,
        query,
      } = path;
      let finalSearch = search;
      if (query) {
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, String(v)));
          } else if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        finalSearch = `?${searchParams.toString()}`;
      }
      const url = pathname + finalSearch + hash;
      window.history.pushState(locationState, '', url);
    }
    this.notify();
  }

  // 替换当前历史记录
  replace(path: string | LocationDescriptorObject, state?: any) {
    if (typeof path === 'string') {
      window.history.replaceState(state, '', path);
    } else {
      const {
        pathname = '',
        search = '',
        hash = '',
        state: locationState,
        query,
      } = path;
      let finalSearch = search;
      if (query) {
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, String(v)));
          } else if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        finalSearch = `?${searchParams.toString()}`;
      }
      const url = pathname + finalSearch + hash;
      window.history.replaceState(locationState, '', url);
    }
    this.notify();
  }

  // 返回上一页
  back() {
    window.history.back();
  }

  // 前进下一页
  forward() {
    window.history.forward();
  }

  // 监听路由变化
  listen(listener: LocationListener): UnregisterCallback {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // 通知所有监听器
  private notify() {
    const location = this.location;
    this.listeners.forEach((listener) => listener(location, this.action));
  }

  go(n: number) {
    window.history.go(n);
  }

  goBack() {
    window.history.back();
  }

  goForward() {
    window.history.forward();
  }

  block() {
    return () => {};
  }

  createHref(location: LocationDescriptorObject) {
    const { pathname = '', search = '', hash = '' } = location;
    return pathname + search + hash;
  }

  constructor() {
    // 监听浏览器前进后退按钮
    window.addEventListener('popstate', () => {
      this.notify();
    });
    // 初始化时触发一次通知
    this.notify();
  }
}

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
  const history = createBrowserHistory<any>({
    forceRefresh: !window.__POWERED_BY_QIANKUN__,
  });

  // 添加初始化监听
  const originalListen = history.listen;
  history.listen = (listener) => {
    // 立即执行一次监听器
    listener(history.location, history.action);
    // 返回原始的监听函数
    return originalListen(listener);
  };

  return history;
};
export default getHistory();
