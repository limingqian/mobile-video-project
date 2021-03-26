import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true,
    activeItem: 0,
    userName: "",
    showName: ""
  },
  mutations: {
    yes(state) {
      state.isLogin = true;
    },
    no(state) {
      state.isLogin = false;
    },
    changeActive(state, n) {
      state.activeItem = n;
    },
    userName(state, n) {
      state.userName = n;
    },
    showName(state, n) {
      state.showName = n;
    }
  },
  actions: {},
  modules: {}
});
