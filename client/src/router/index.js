import Vue from "vue";
import VueRouter from "vue-router";

// Admin
import AdminRegister from "../views/admin/register";
import AdminDashboard from "../views/admin/dashboard";
import AdminProgram from "../views/admin/program";
import AdminCourse from "../views/admin/course";
import AdminStudents from "../views/admin/students";
import AdminDeparmtent from "../views/admin/department";

// Student
import StudentRegister from "../views/students/register";
import StudentDashboard from "../views/students/dashboard";
import Login from "../views/login";
Vue.use(VueRouter);

const routes = [
  {
    path: "/admin/department",
    name: "AdminDepartment",
    component: AdminDeparmtent
  },
  {
    path: "/register",
    name: "StudentRegister",
    component: StudentRegister
  },
  {
    path: "/",
    name: "Login",
    component: Login
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
    path: "/admin/programs",
    name: "AdminProgram",
    component: AdminProgram
  },
  {
    path: "/admin/students",
    name: "AdminStudents",
    component: AdminStudents
  },
  {
    path: "/admin/courses",
    name: "AdminCourse",
    component: AdminCourse
  }
];

const router = new VueRouter({
  routes
});

export default router;
