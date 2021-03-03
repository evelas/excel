export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      // unsub
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    // like emit
    dispatch(action) {
      state = rootReducer(state, action);
      // wat
      // передаем тому кто подписался state
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      // чтобы не мутировало
      // при условии что структура данных не сложная
      return JSON.parse(JSON.stringify(state));
    },
  };
}
