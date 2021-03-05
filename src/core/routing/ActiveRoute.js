export class ActiveRoute {
  // когда нет смысла делать экземпляр класса
  // то можно использовать класс с статическими методами
  // с помощью get не нужно будет () вызывать метод
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return ActiveRoute.path.split('/')[1];
  }

  static navigate(path) {
    window.location.hash = path;
  }
}
