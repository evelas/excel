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
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
      // this.$formula.text($cell.text());
      this.$formula.text($cell.data.value || $cell.text());
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
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
