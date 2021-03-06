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
import ViewButton from "./components/buttons/ViewButton";
import SaveButton from "./components/buttons/SaveButton";
import ViewChecklistButton from "./components/buttons/ViewChecklist";
import EnrollButton from "./components/buttons/EnrollButton.vue";

// Dialog
import AddDialog from "./components/dialogs/AddDialog";
import Dialog from "./components/dialogs/Dialog";

import ConfirmationDialog from "./components/dialogs/ConfirmationDialog";

// Toolbar
import ToolbarNav from "@/components/Toolbar.vue";

// Form
import PreEnrollmentForm from "@/components/PreEnrollmentForm";

// Snackbar
import Snackbar from "@/components/Snackbar";

// Tuition fee
import TuitionFee from "@/components/TuitionFee";

Vue.config.productionTip = false;

// Button
Vue.component("AddButton", AddButton);
Vue.component("EditButton", EditButton);
Vue.component("DeleteButton", DeleteButton);
Vue.component("RemoveButton", RemoveButton);
Vue.component("ViewButton", ViewButton);
Vue.component("ViewChecklistButton", ViewChecklistButton);
Vue.component("EnrollButton", EnrollButton);

Vue.component("SaveButton", SaveButton);

// Dialog
Vue.component("AddDialog", AddDialog);
Vue.component("formDialog", Dialog);

Vue.component("ConfirmationDialog", ConfirmationDialog);

// Toolbar
Vue.component("ToolbarNav", ToolbarNav);

// Form
Vue.component("PreEnrollmentForm", PreEnrollmentForm);

// Snackbar
Vue.component("Snackbar", Snackbar);

// Tuition fee
Vue.component("TuitionFee", TuitionFee);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
