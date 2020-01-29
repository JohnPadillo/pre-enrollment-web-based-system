import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Button
import AddButton from "./components/buttons/AddButton";
import EditButton from "./components/buttons/EditButton";
import DeleteButton from "./components/buttons/DeleteButton";
import RemoveButton from "./components/buttons/RemoveButton";

// Dialog
import AddDialog from "./components/dialogs/AddDialog";
import Dialog from "./components/dialogs/Dialog";

import ConfirmationDialog from "./components/dialogs/ConfirmationDialog";

// Toolbar
import ToolbarNav from "@/components/Toolbar.vue";

// Form
import PreEnrollmentForm from "@/components/PreEnrollmentForm";

Vue.config.productionTip = false;

// Button
Vue.component("AddButton", AddButton);
Vue.component("EditButton", EditButton);
Vue.component("DeleteButton", DeleteButton);
Vue.component("RemoveButton", RemoveButton);

// Dialog
Vue.component("AddDialog", AddDialog);
Vue.component("formDialog", Dialog);

Vue.component("ConfirmationDialog", ConfirmationDialog);

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
