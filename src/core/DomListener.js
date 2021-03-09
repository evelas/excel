import { capitalize } from '@core/utils';

export class DomListener {
  // $root корневой элемент,
  // на который мы будем вешать слушатели
  constructor($root, listeners = []) {
    // Class ExcelComponent наследуется от DomListener
    // поэтому мы имеем доступ к $root
    if (!$root) {
      throw new Error(`>No $root provided for DomListener<`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  // Когда вызываем initDOMListeners
  // Все элементы должны быть прорисованы
  // только после render()
  initDOMListeners() {
    // так как мы находимся в стрелочной функции
    // (не создает своего собственного контекста)
    // то у нас есть доступ к this (es6)
    // если бы мы написали вместо стрелочной функции
    // обычную function, то доступа к this не будет
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`>Method ${method} is not
         implemented in ${this.name} Component<`);
      }
      // the same console.log, но в []
      // мы можем положить переменную
      // console.log(this.onInput);
      // console.log(this['onInput']);

      // Когда мы передаем метод this[method] через this
      // далее он по --ссылке-- вызывается уже в другом контексте
      // поэтому нам нужно привязать контекст через bind

      // Так как bind создает новую функцию,
      // то в removeDOMLis мы будем отправлять другую функцию
      // значит нам надо сохранить ее
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
// private func for this class
function getMethodName(text) {
  return 'on' + capitalize(text);
}
