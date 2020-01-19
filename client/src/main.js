import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Button
import AddButton from "./components/buttons/AddButton";
import EditButton from "./components/buttons/EditButton";
import DeleteButton from "./components/buttons/DeleteButton";

// Dialog
import AddDialog from "./components/dialogs/AddDialog";

Vue.config.productionTip = false;

// Button
Vue.component("AddButton", AddButton);
Vue.component("EditButton", EditButton);
Vue.component("DeleteButton", DeleteButton);

// Dialog
Vue.component("AddDialog", AddDialog);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
