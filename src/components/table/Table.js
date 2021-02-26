import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.helpers';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import * as actions from '../../redux/actions/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(25, this.store.getState());
  }

  prepare() {
    // создаем переменную
    this.selection = new TableSelection();
  }

  init() {
    // super так как у нас в родителе
    // вызывается init связанный с domlisteners
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('Formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('Formula:keydown', () => {
      this.selection.current.focus();
    });

    // this.$subscribe((state) => {
    //   console.log('State-test-table', state);
    // });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      console.log(data);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    console.log(this);
    const keys = ['Tab', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    const id = this.selection.current.id(true);
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('Table:input', $(event.target));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:select', $cell);
  }
}

// Для проверки
// const emitter = new Emitter();

// const unsub = emitter.subscribe('Это событие', (data, moreData) =>
//   console.log('Событие: ', data, moreData),
// );
// emitter.subscribe('Это событие2', (data) => console.log('Событие2: ', data));

// emitter.emit('Это событие', 'какие-то данные', 'eee');
// emitter.emit('Это событие', 'какие-то данные+++', 'eee+++');
// emitter.emit('Это событие2', 'какие-то данные2');
// emitter.emit('Это событие другое и мы на него не подписались', 'какие-то данные которые не дошли');
// setTimeout(() => {
//   emitter.emit('Это событие', 'какие-то данные после 2 сек', 'and one');
// }, 2000);

// setTimeout(() => {
//   unsub();
// }, 3000);
// setTimeout(() => {
//   emitter.emit('Это событие', 'какие-то данные после 4 сек уже unsub', 'and one');
// }, 4000);
