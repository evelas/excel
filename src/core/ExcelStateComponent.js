// local state
// first for toolbar

import { ExcelComponent } from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  // get template() {
  //   return JSON.stringify(this.state);
  // }

  initState(initialState = {}) {
    this.state = { ...initialState };
  }

  setState(newState) {
    // копируем старое и новое состояние
    // старое состояние - если мы в новом состоянии
    // передавали только 1 свойство, чтобы не терялись другие
    this.state = { ...this.state, ...newState };
    // обновляем компонент каждый раз
    // когда получаем новое состояние
    this.$root.html(this.template);
  }
}
