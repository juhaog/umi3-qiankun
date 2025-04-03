type ParsedQuery = Record<string, string | string[] | null>;

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

class History {
  private listeners: Listener[] = [];
  
  // 解析查询字符串
  private parseQuery(search: string): ParsedQuery {
    if (!search || search === '?') return {};
    
    const query: ParsedQuery = {};
    const searchParams = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    
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
      query: this.parseQuery(window.location.search)
    };
  }

  // 添加历史记录
  push(path: string | LocationDescriptorObject, state?: any) {
    if (typeof path === 'string') {
      window.history.pushState(state, '', path);
    } else {
      const { pathname = '', search = '', hash = '', state: locationState, query } = path;
      let finalSearch = search;
      if (query) {
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
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
      const { pathname = '', search = '', hash = '', state: locationState, query } = path;
      let finalSearch = search;
      if (query) {
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
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
  listen(listener: Listener) {
    this.listeners.push(listener);
    
    // 返回取消监听的函数
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 通知所有监听器
  private notify() {
    const location = this.location;
    this.listeners.forEach(listener => listener(location));
  }

  constructor() {
    // 监听浏览器前进后退按钮
    window.addEventListener('popstate', () => {
      this.notify();
    });
  }
}

// 创建单例实例
const history = new History();

export default history;
