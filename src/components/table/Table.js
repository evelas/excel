import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(35);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; // Если добавить еще блок например с фильтром то родитель будет другим // Bad
      // const $parent = $resizer.$el.closest(); // Bad так как могут изменится классы
      console.log(event);
      console.log($(event.target.dataset));
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoordsNode();

      const whichColumn = $parent.data.col;
      const column = document.querySelectorAll(`[data-col="${whichColumn}"]`);
      // console.log(whichColumn);
      // console.log(column);
      document.onmousemove = (e) => {
        // coords.right статическое значение
        // e.pageX динамическое координаты меняются при движении мышки
        // Delta - растояние от куда мы передвинули мышку
        // до правого край (так как ресайз на правом крае)
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        column.forEach((el) => (el.style.width = value + 'px'));
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }
}
