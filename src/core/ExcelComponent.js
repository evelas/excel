import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  // тут constructor одно и тоже что и в super Formula
  constructor($root, options) {
    super($root, options.listeners);
  }

  // toHTML - возвращает шаблон компонента
  toHTML() {
    return '';
  }
}
