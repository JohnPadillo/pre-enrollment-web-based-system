import Vue from "vue";
import VueRouter from "vue-router";
import AdminRegister from "../views/admin/register"

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin/",
    name: "AdminDashboard",
    // component: AdminDashboard
  },
  {
    path: "/admin/register",
    name: "Register",
    component: AdminRegister
  }
];

const router = new VueRouter({
  routes
});

export default router;
