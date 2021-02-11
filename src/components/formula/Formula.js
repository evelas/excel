import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  // корневой класс для данного блока
  static className = 'excel__formula';

  constructor($root) {
    // Здесь, вызывается метод конструктора
    // родительского класса ExcelComponent
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    // this.$root привязан через bind
    console.log(this.$root);
    console.log('formula: input listener', e.target.textContent.trim());
  }

  onClick() {
    console.log('Click');
  }
}
