import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  // корневой класс для данного блока
  static className = 'excel__formula';

  constructor($root) {
    // Здесь, вызывается метод конструктора
    // родительского класса ExcelComponent
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    console.log('formula: input listener', e);
  }
}
