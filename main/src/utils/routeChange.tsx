class Dep {
  public subs: any[]
  static watch: any
  constructor() {
    this.subs = []
  }
  defined(watch: any) {
    this.subs.push(watch)
  }
  notify() {
    this.subs.forEach(e => {
      if(typeof e.update === 'function') {
        try {
          e.update.apply(e)
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}

class Watch {
  public name: string
  public callBack: any
  constructor(name: string, fn: Function) {
    this.name = name
    this.callBack = fn
  }
  add(dep:Dep) {
    dep.subs.push(this)
  }
  update() {
    var cb = this.callBack
    cb(this.name)
  }
}

export const addMethod = function () {
  let historyDep = new Dep()
  return function (name: string) {
    if(name === 'historychange') {
      return function (name: string, fn: Function) {
        let event = new Watch(name, fn)
        historyDep.defined(event)
      }
    } else if (name === 'pushState' || name === 'replaceState') {
      let method = history[name]
      return function () {
        method.apply(history, arguments as any)
        historyDep.notify()
      }
    }
  }
}