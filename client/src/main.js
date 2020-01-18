import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Button
import AddButton from "./components/buttons/AddButton";

// Dialog
import AddDialog from "./components/dialogs/AddDialog";

Vue.config.productionTip = false;

// Button
Vue.component("AddButton", AddButton);

// Dialog
Vue.component("AddDialog", AddDialog);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
