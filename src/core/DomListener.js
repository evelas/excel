export class DomListener {
  // $root корневой элемент,
  // на который мы будем вешать слушатели
  constructor($root) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
  }
}
