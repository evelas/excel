
import { storage } from '@core/utils';


// отдельный клиент
// можно сделать клиент под сервер
export class LocalStorageClient {
  constructor(params) {
    this.params = storageName(params);
  }

  // как только сохранится state
  // промис resolve
  save(state) {
    storage(this.params, state);
    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(storage(this.params));
    return new Promise((resolve) => {
      setTimeout(() =>{
        resolve(storage(this.params));
      }, 2500);
    });
  }
}

function storageName(param) {
  return 'excel:' + param;
}
