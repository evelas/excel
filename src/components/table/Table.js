import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.helpers';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return createTable(25);
  }

  prepare() {
    // создаем переменную
    this.selection = new TableSelection();
  }

  init() {
    // super так как у нас в родителе
    // вызывается init связанный с domlisteners
    super.init();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);

    this.emitter.subscribe('Formula:input', (text) => {
      this.selection.current.text(text);
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    const id = this.selection.current.id(true);
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}

// const emitter = new Emitter();

// emitter.subscribe('Это событие', (data, moreData) => console.log('Событие: ', data, moreData));
// emitter.subscribe('Это событие2', (data) => console.log('Событие2: ', data));

// emitter.emit('Это событие', 'какие-то данные', 'eee');
// emitter.emit('Это событие', 'какие-то данные+++', 'eee+++');
// emitter.emit('Это событие2', 'какие-то данные2');
// emitter.emit('Это событие другое и мы на него не подписались', 'какие-то данные которые не дошли');
// setTimeout(() => {
//   emitter.emit('Это событие', 'какие-то данные после 2 сек', 'and one');
// }, 2000);
