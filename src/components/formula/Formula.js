import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  // корневой класс для данного блока
  static className = 'excel__formula';

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
