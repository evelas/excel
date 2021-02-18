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
      console.log(event.target.dataset.resize);
      console.log(event.target.dataset);

      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; // Если добавить еще блок например с фильтром то родитель будет другим // Bad
      // const $parent = $resizer.$el.closest(); // Bad так как могут изменится классы
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoordsNode();
      // console.log($parent.$el.childElementCount);
      // console.log($parent.$el.children.length);

      document.onmousemove = (e) => {
        console.log($resizer);
        console.log($parent.getCoordsNode());
        console.log(e.pageX);
        // coords.right статическое значение
        // e.pageX динамическое координаты меняются при движении мышки
        // Delta - растояние от куда мы передвинули мышку
        // до правого край (так как ресайз на правом крае)
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }
}
