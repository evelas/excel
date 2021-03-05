export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // то же, что и dispatch
  // уведомляем слушателя если они есть
  // event событие на которые мы могли подписаться
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      // listener == fn из subscribe
      listener(...args);
    });
    // console.log(this.listeners);
    return true;
  }

  // подписываемся на уведомления
  // добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn);
    };
  }
}
