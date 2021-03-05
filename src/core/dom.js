// любые node для создания
// оборачиваем в $
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
              ? document.querySelector(selector)
              : selector;
  }
  // get/set
  // если не передаем параметр в html
  // то это геттер
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      // return this для chain
      // то есть чтобы в цепи мы могли вызывать
      // и другие методы после вызова .html()
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    // если в прототипе присутствует нативный метод append
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      // для более старых браузеров
      this.$el.appendChild(node);
    }
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  attr(name, value) {
    if (value !== 'undefined') {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  closest(selector) {
    // оборачиваем в $ чтобы был у элемента тот же
    // самый функционал что и инстантса класса dom
    return $(this.$el.closest(selector));
  }

  getCoordsNode() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: parseInt(parsed[0]),
        col: parseInt(parsed[1]),
      };
    }
    return this.data.id;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      // style[key]
      return (this.$el.style[key] = styles[key]);
    });
  }

  getStyles(styles = []) {
    return styles.reduce((sum, currentStyle) => {
      sum[currentStyle] = this.$el.style[currentStyle];
      return sum;
    }, {});
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  // Оборачиваем в функцию $
  // чтобы получить доступ к методам класса Dom
  return $(el);
};
