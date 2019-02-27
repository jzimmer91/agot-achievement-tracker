import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
Vue.prototype.$http = axios;
Vue.use(Vuetify);

Vue.config.productionTip = false;
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyBKI8fezHy0aBSA4_zZ8SH8T6s_AeJIA9I",
  authDomain: "agot-achievement-tracker.firebaseapp.com",
  databaseURL: "https://agot-achievement-tracker.firebaseio.com",
  projectId: "agot-achievement-tracker",
  storageBucket: "agot-achievement-tracker.appspot.com",
  messagingSenderId: "105854739704"
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();

import VueFire from "vuefire";
Vue.use(VueFire);

new Vue({
  router,
  firebase: {
    achievementLists: db.ref("achievementlists")
  },
  render: h => h(App)
}).$mount("#app");
