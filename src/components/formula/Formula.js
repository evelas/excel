import { ExcelComponent } from '@core/ExcelComponent';

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
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    // this.$root привязан через bind
    const text = event.target.textContent.trim();
    this.emitter.emit('Formula:input', text);
  }
}
