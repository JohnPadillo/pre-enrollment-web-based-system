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

// Toolbar
import ToolbarNav from "@/components/Toolbar.vue";

// Form
import PreEnrollmentForm from "@/components/PreEnrollmentForm";

Vue.config.productionTip = false;

// Button
Vue.component("AddButton", AddButton);
Vue.component("EditButton", EditButton);
Vue.component("DeleteButton", DeleteButton);

// Dialog
Vue.component("AddDialog", AddDialog);

// Toolbar
Vue.component("ToolbarNav", ToolbarNav);

// Form
Vue.component("PreEnrollmentForm", PreEnrollmentForm);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
