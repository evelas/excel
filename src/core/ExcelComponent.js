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
    this.prepare();
  }
  // Создадим метод для удобства,
  // который вызывается до init
  prepare() {}

  // toHTML - возвращает шаблон компонента
  toHTML() {
    return '';
  }
  //
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
