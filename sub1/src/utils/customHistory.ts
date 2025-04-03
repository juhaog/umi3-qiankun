// 创建自定义的 history 对象
const customHistory = {
  push(path: string) {
    window.history.pushState(null, '', path);
  },
  // 可以根据需要添加其他方法，比如 replace, goBack 等
  replace(path: string) {
    window.history.replaceState(null, '', path);
  },
  goBack() {
    window.history.back();
  }
};

export default customHistory; 