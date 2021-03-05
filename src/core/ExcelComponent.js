// Централизованное место для всех компонентов в excel

import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // тут constructor одно и тоже что и в super Formula
  // то есть в options мы принимаем то,
  // что закинули в super Formula
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.store = options.store;

    this.prepare();
  }
  // Создадим метод для удобства,
  // который вызывается до init
  prepare() {}

  // toHTML - возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // $ связан с dom js
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // update теперь будем подписывать не каждый компонент
  // а подпишем весь эксель и будем сравнивать state с prevState
  // и если какое-то поле будет изменено,
  // то это поле будем прокидывать в компонент
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }
  // вместо $subscribe
  // сюда приходят только те измнения по тем полям,
  // на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализируем компонент
  // добавляем слушателей
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
