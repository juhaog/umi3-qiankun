export {};

// 添加 Emitter 接口声明
interface Emitter {
  add(eventName: string, callback: Function, count: number): void;
  emit(...args: any[]): void;
  on(eventName: string, callback: Function): void;
  once(eventName: string, callback: Function): void;
  off(eventName: string, callback: Function): void;
  watch(callback: Function): void;
}

interface NewStorage {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
  setGlobalData(key: string, value: any): void;
  getGlobalData(key: string): any;
}

declare global {
  interface Window {
    _QIANKUN_YD: {
      event: Emitter;
      store: NewStorage;
    };
    //   __POWERED_BY_QIANKUN__?: boolean;
    //   __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __webpack_public_path__?: string;
  }
}
if (window.__POWERED_BY_QIANKUN__) {
  // 仅在子应用下执行
  window['__webpack_public_path__'] =
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

window._QIANKUN_YD = window._QIANKUN_YD || {
  // 通信
  event: (() => {
    class Emitter {
        private events: Record<string, Array<{ callback: Function; count: number }>>;
        private watchs: Function[];
      constructor() {
        this.events = {};
        this.watchs = [];
      }
      add(eventName: string, callback: Function, count: number) {
        if (!eventName || typeof callback !== 'function') return console.error('eventName 和 callback 不能为空');
        if (!this.events[eventName]) {
          this.events[eventName] = [];
          this.events[eventName].push({ callback, count });
        } else {
          const hasExist = this.events[eventName].some(
            (item) => item.callback === callback && item.count === count,
          );
          !hasExist && this.events[eventName].push({ callback, count });
        }
      }
      emit(...args: any[]) {
        const [eventName, ...restArgs] = args;
        const callbacks = this.events[eventName] || [];
        if (callbacks.length <= 0) return console.error(`${eventName}事件不存在`);
        if (eventName && this.watchs.length > 0) {
          this.watchs.forEach((item) => {
            item.apply(this, [eventName, ...restArgs]);
          });
        }
        if (eventName && callbacks.length > 0) {
          callbacks.forEach(({ callback, count }) => {
            callback.apply(this, [eventName, ...restArgs]);
            count && this.off(eventName, callback);
          });
        }
      }
      on(eventName: string, callback: Function) {
        this.add(eventName, callback, 0);
      }
      once(eventName: string, callback: Function) {
        this.add(eventName, callback, 1);
      }
      off(eventName: string, callback: Function) {
        const callbacks = this.events[eventName] || [];
        if (callbacks.length <= 0) return console.error(`${eventName}事件不存在`);
        if (!callback) this.events[eventName] = [];
        callbacks.forEach((item, index) => {
          if (item.callback === callback) {
            callbacks.splice(index, 1);
          }
        });
      }
      watch(callback: Function) {
        if (typeof callback !== 'function') return console.error('callback 不能为空');
        this.watchs.push(callback);
      }
    }
    return new Emitter();
  })(),
  // 数据共享（具备持久化能力）
  store: (() => {
    class Storage {
        private storage: any;
        private global: Record<string, any>;
      constructor() {
        // 持久化
        this.storage = generatorStorage(window.localStorage);
        // this.storage = generatorStorage(window.sessionStorage);
        // 全局数据，生命周期同window
        this.global = {};
      }
      set(key: string, value: any) {
        return this.storage.set(key, value);
      }
      get(key: string) {
        return this.storage.get(key);
      }
      remove(key: string) {
        this.storage.remove(key);
      }
      clear() {
        this.storage.clear();
      }
      setGlobalData(key: string, value: any) {
        this.global[key] = value;
      }
      getGlobalData(key: string) {
        return this.global[key];
      }
    }
    return new Storage();
  })(),
};

function generatorStorage(storage: any) {
  const prefix = (key: string) => `__qiankun_yd_${key}`;
  return {
      set(key: string, value: any) {
          const valueFormat = (value: any) => {
              if (
                  ["[object Array]", "[object Object]"].includes(
                      Object.prototype.toString.call(value)
                  )
              ) {
                  return JSON.stringify(value);
              } else {
                  return value;
              }
          };
          storage.setItem(prefix(key), valueFormat(value));
      },
      get(key: string) {
          try {
              return JSON.parse(storage.getItem(prefix(key)));
          } catch {
              return storage.getItem(prefix(key));
          }
      },
      remove(key: string) {
          storage.removeItem(prefix(key));
      },
      clear() {
          storage.clear();
      },
  };
}