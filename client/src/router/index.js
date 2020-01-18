import Vue from "vue";
import VueRouter from "vue-router";
import AdminRegister from "../views/admin/register"
import AdminDashboard from "../views/admin/dashboard"
import AdminCourses from "../views/admin/courses"
import AdminSubjects from "../views/admin/subjects"
import AdminStudents from "../views/admin/students"



Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard
  },
  {
    path: "/admin/register",
    name: "Register",
    component: AdminRegister
  },
  {
    path: "/admin/courses",
    name: "AdminCourses",
    component: AdminCourses
  },
  {
    path: "/admin/students",
    name: "AdminStudents",
    component: AdminStudents
  },
  {
    path: "/admin/subjects",
    name: "AdminSubjects",
    component: AdminSubjects
  }
];

const router = new VueRouter({
  routes
});

export default router;
