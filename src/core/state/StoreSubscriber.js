import { isEqual } from '../utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  subscribeComponents(components) {
    // Фиксируем state, чтобы в процессе не менялся
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      // тут state - так в store через initialState мы занесли некоторые поля
      // например currentText
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          // console.log(state[key]);
          // console.log(!isEqual(this.prevState[key], state[key]));
          // console.log(!isEqual(this.store.getState()[key], state[key]));
          // console.log(this.store.getState()[key]);
          // console.log(this.prevState[key])
          components.forEach((component) => {
            // обновляем компонент
            // если в конструктур передали что-то в массив subscribe
            if (component.isWatching(key)) {
              const changes = {
                [key]: state[key],
              };
              component.storeChanged(changes);
            }
          });
        }
      });
      // обновляем state
      this.prevState = this.store.getState();
      // создадим переменную redux
      if (process.env.NODE_ENV === 'development') {
        window['redux'] = this.prevState;
      }
    });
  }
  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
