`_QIANKUN_YD.event` 相关 API 说明：

| 语法                                                          | 说明               |
| :------------------------------------------------------------ | :----------------- |
| `window._QIANKUN_YD.event.on(eventName, cb)`                | 订阅               |
| `window._QIANKUN_YD.event.one(eventName, cb)`               | 订阅，仅执行一次   |
| `window._QIANKUN_YD.event.emit(eventName, arg1, arg2, ...)` | 发布               |
| `window._QIANKUN_YD.event.off(eventName, cb)`               | 解除订阅           |
| `window._QIANKUN_YD.event.watch(eventName, cb)`             | 监听所有的订阅事件 |

`_QIANKUN_YD.store` 相关 API 说明：

| 语法                                                   | 说明                           |
| :----------------------------------------------------- | :----------------------------- |
| `window._QIANKUN_YD.store.set(key, value)`           | 储存数据，具备持久化           |
| `window._QIANKUN_YD.store.get(key)`                  | 获取数据                       |
| `window._QIANKUN_YD.store.remove(key)`               | 清除单项数据                   |
| `window._QIANKUN_YD.store.clear()`                   | 清除全部数据                   |
| `window._QIANKUN_YD.store.setGlobalData(key, value)` | 储存全局数据，生命周期同window |
| `window._QIANKUN_YD.store.getGlobalData(key, value)` | 获取全局数据                   |

参考来源：**[微前端（qiankun）之应用间的通信方案-发布订阅](https://juejin.cn/post/7441617631907397659)**

案例：

1.消息订阅

```javascript
const init = () => {
    const ModalRef = Modal.info({
      title: '加载中',
      content: '加载中...',
    });
    setTimeout(() => {
      ModalRef.destroy()
    }, 3000);
  }
  useEffect(() => {
    console.log('BasicLayout', children);
    // window._QIANKUN_YD.store.set('token', '我是一个token');
    // 订阅loading事件
    window._QIANKUN_YD.event.on('loading', init)
    return () => {
      window._QIANKUN_YD.event.off('loading', init)
    }
  }, []);
```

```javascript
const handleLoading = () => {
    window._QIANKUN_YD.event.emit('loading')
  }
  return (
    <Button onClick={handleLoading}>loading</Button>
  );
```

2.数据共享（持久化）

设置值 `window._QIANKUN_YD.store.set('token', '我是一个token');`

读取值 `const token = window._QIANKUN_YD.store.get('token');`

其它用法参考相关API
