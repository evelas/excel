export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el intanceof DOM === true
  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    console.log(this.group);
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach(($el) => {
      $el.css(style);
    });
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
