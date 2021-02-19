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
      const $parent = $resizer.closest('[data-type="resizable"]');

      const coords = $parent.getCoordsNode();
      const whichColumn = $parent.data.col;
      const column = this.$root.findAll(`[data-col="${whichColumn}"]`);
      const type = $resizer.data.resize;
      console.log(type);
      document.onmousemove = (e) => {
        // coords.right статическое значение
        // e.pageX динамическое координаты меняются при движении мышки
        // Delta - растояние от куда мы передвинули мышку
        // до правого край (так как ресайз на правом крае)
        if (type === 'col') {
          const deltaX = e.pageX - coords.right;
          const valueX = coords.width + deltaX;
          column.forEach((el) => (el.style.width = valueX + 'px'));
        } else {
          const deltaY = e.pageY - coords.bottom;
          const valueY = coords.height + deltaY;
          console.log(valueY);
          // $parent.$el.style.height = valueY + 'px';
          $parent.css({ height: valueY + 'px' });
        }
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }
}
