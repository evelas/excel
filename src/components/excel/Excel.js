import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from '../../core/StoreSubscriber';

// Корневой компонент для страницы excel
// $ - dom node
export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector);
    // нужно работать в инснансе класса dom
    // поэтому el создаем с помощью нашей библы
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }
  // getRoot - возвращает корневую ноду
  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
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

      const component = new Component($el, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window['debug' + component.name] = component;
      // }
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

    this.subscriber.subscribeComponents(this.components);
    // у каждого компонента вызываем init
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
// $el - как StyleGuide. Так понятее,
// что мы образаемся к дом элементу.
// в Selector мы передаем (для универсальности кода)
// тот div, в которым мы будем отрисовывать приложение.
// Сам класс должен зависить от входных данных,
// а не построен на уже имеющихся в классе данных
