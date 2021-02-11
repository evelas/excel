// Централизованное место для всех компонентов в excel

import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // тут constructor одно и тоже что и в super Formula
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

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
