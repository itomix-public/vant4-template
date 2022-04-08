import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      msg: 'Hello world',
      count: 0,
      auth: false
    };
  },
  getters: {},
  actions: {
    changeState (state: boolean) {
      this.auth = state;
    }
  },
});