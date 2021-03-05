export class Page {
  constructor(params) {
    this.params = params;
  }
  // у всех страниц будет getRoot, которые наследуются от Page
  // тогда можем обращаться к getRoot только в классе Page
  getRoot() {
    throw new Error('>Method "getRoot()" should be implemented <');
  }

  afterRender() {}

  destroy() {}
}
