import { isEqual } from './utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            // обновляем компонент
            // если в конструктур передали что-то в массив subscribe
            if (component.isWatching(key)) {
              console.log(component);
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
    });
  }
  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
