import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// import { string } from "postcss-selector-parser";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isOpenNavigation: false,
    customerID: 0,
    token: null,
    user: null,
    isUserLogin: false,
    detailProduct: [],
    addCart: [],
    invoiceID: 0,
    stepper: 1,
    notifycation: null
  },
  mutations: {
    changeNavigation(state, isOpenNavigation) {
      state.isOpenNavigation = isOpenNavigation;
    },
    changeDetailP(state, detailProduct) {
      state.detailProduct = detailProduct;
    },
    setCustomerID(state, customerID) {
      state.customerID = customerID;
    },
    setInvoinceID(state, invoiceID) {
      state.invoiceID = invoiceID;
    },

    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLogin = true;
      } else {
        state.isUserLogin = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    isAddCart(state, addCart) {
      state.addCart = addCart;
    },
    isStepper(state, stepper) {
      state.stepper = stepper;
    },
    isnotifycation(state, notifycation) {
      state.notifycation = notifycation;
    }
  },
  getters: {
    isOpenNavigation: state => state.isOpenNavigation,
    detailProduct: state => state.detailProduct,
    customerID: state => state.customerID,
    invoiceID: state => state.invoiceID
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    headerAddCart({ commit }, addCart) {
      commit("isAddCart", addCart);
    },
    headerStepoer({ commit }, stepper) {
      commit("isStepper", stepper);
    },
    EventNotifycation({ commit }, notifycation) {
      commit("isnotifycation", notifycation);
    }
  },
  modules: {}
});
