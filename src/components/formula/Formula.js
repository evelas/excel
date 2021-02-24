import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
export class Formula extends ExcelComponent {
  // корневой класс для данного блока
  static className = 'excel__formula';

  constructor($root, options) {
    // Здесь, вызывается метод конструктора
    // родительского класса ExcelComponent
    // в options первым мы реализовали emitter
    // в Excel js передаем в каждый компонент $root, options
    console.log(options);
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('Table:select', ($cell) => {
      console.log($cell);
      this.$formula.text($cell.text());
    });
    this.$on('Table:mousedown', ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on('Table:input', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  onInput(event) {
    // this.$root привязан через bind
    this.$emit('Formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('Formula:keydown');
      // const $current = this.selection.current;
    }
  }
}
