import { debounce } from '@core/utils';

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  // Сохраняет state в client
  listen(state) {
    this.client.save(state);
  }

  // Метод для получения state
  // в client находится другой new класс
  get() {
    return this.client.get();
  }
}
