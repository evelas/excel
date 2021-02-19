import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  // const $parent = $resizer.$el.parentNode; // Если добавить еще блок например с фильтром то родитель будет другим // Bad
  // const $parent = $resizer.$el.closest(); // Bad так как могут изменится классы
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoordsNode();
  const whichColumn = $parent.data.col;
  const column = $root.findAll(`[data-col="${whichColumn}"]`);
  let value;
  const type = $resizer.data.resize;

  // При каждом движении мыши делаются лишнии проверки
  // можно сначала делать if а потом mousemove
  document.onmousemove = (e) => {
    // coords.right статическое значение
    // e.pageX динамическое координаты меняются при движении мышки
    // Delta - растояние от куда мы передвинули мышку
    // до правого край (так как ресайз на правом крае)
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      column.forEach((el) => (el.style.width = value + 'px'));
      $resizer.css({ right: 0 });
    } else {
      $parent.css({ height: value + 'px', bottom: 0 });
    }
  };
}
