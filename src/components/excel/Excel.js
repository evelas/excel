import { $ } from '@core/dom';

// Корневой компонент для страницы excel
// $ - dom node
export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector);
    // нужно работать в инснансе класса dom
    // поэтому el создаем с помощью нашей библы
    this.$el = $(selector);
    this.components = options.components || [];
  }
  // getRoot - возвращает корневую ноду
  getRoot() {
    const $root = $.create('div', 'excel');
    // Component - в методе foreach мы получаем доступ до
    // каждого Класса (значит тут мы сможем создавать его instance)

    // update forEach -> map, чтобы возвращать
    // инстанс того класса (new Component), от которого мы создаемсся
    // c forEach мы получали классы, а нам нужны инстансы
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      // or
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);

      const component = new Component($el);
      // DEBUG
      if (component.name) {
        window['debug' + component.name] = component;
      }
      $el.html(component.toHTML());
      // $el.innerHTML = component.toHTML();
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    // у node есть метод insert
    // afterbegin afterend beforebegin beforeend
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>test</h1>`);
    this.$el.append(this.getRoot());
    // у каждого компонента вызываем init
    this.components.forEach((component) => component.init());
  }
}
// $el - как StyleGuide. Так понятее,
// что мы образаемся к дом элементу.
// в Selector мы передаем (для универсальности кода)
// тот div, в которым мы будем отрисовывать приложение.
// Сам класс должен зависить от входных данных,
// а не построен на уже имеющихся в классе данных
