import Vue from "vue";
import VueRouter from "vue-router";
import AdminRegister from "../views/admin/register";
import AdminDashboard from "../views/admin/dashboard";
import AdminCourses from "../views/admin/courses";
import AdminSubjects from "../views/admin/subjects";
import AdminStudents from "../views/admin/students";
import StudentRegister from "../views/admin/students/register";
import StudentDashboard from "../views/admin/students/dashboard";
import StudentLogin from "../views/admin/students/login";
Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "StudentRegister",
    component: StudentRegister
  },
  {
    path: "/login",
    name: "StudentLogin",
    component: StudentLogin
  },
  {
    path: "/dashboard",
    name: "StudentDashboard",
    component: StudentDashboard
  },
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
