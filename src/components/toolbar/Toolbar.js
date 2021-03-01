import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';
import { defaultStyles } from './../../constans';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    // Здесь, вызывается метод конструктора
    // родительского класса ExcelComponent
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('Toolbar:applyStyle', value);

      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
    }
  }
}
