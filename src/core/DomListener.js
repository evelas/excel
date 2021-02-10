export class DomListener {
  // $root корневой элемент,
  // на который мы будем вешать слушатели
  constructor($root, listeners = []) {
    // Class ExcelComponent наследуется от DomListener
    // поэтому мы имеем доступ к $root
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  // Когда вызываем initDOMListeners
  // Все элементы должны быть прорисованы
  // только после render()
  initDOMListeners() {}
  removeDOMListeners() {}
}
