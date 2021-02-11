// любые node для создания
// оборачиваем в $
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
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
