import Vue from "vue";
import VueRouter from "vue-router";

// Admin
import AdminRegister from "../views/admin/register";
import AdminDashboard from "../views/admin/dashboard";
import AdminProgram from "../views/admin/program";
import AdminCourse from "../views/admin/course";
import AdminStudents from "../views/admin/students";
import AdminDeparmtent from "../views/admin/department";
import AdminCurriculum from "../views/admin/curriculum";
import AdminSchedule from "../views/admin/schedule";
import AdminSection from "../views/admin/section";
import AdminRoom from "../views/admin/room";

// Student
import StudentRegister from "../views/students/register";
import StudentDashboard from "../views/students/dashboard";
import Login from "../views/login";
Vue.use(VueRouter);

const routes = [
  // Admin Router
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/admin/curriculum",
    name: "AdminCurriculum",
    component: AdminCurriculum
  },
  {
    path: "/admin/department",
    name: "AdminDepartment",
    component: AdminDeparmtent
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
  },
  {
    path: "/admin/sections",
    name: "AdminSection",
    component: AdminSection
  },
  {
    path: "/admin/rooms",
    name: "AdminRoom",
    component: AdminRoom
  },
  {
    path: "/admin/schedule",
    name: "AdminSchedule",
    component: AdminSchedule
  },

  // Student router
  {
    path: "/dashboard",
    name: "StudentDashboard",
    component: StudentDashboard
  },
  {
    path: "/register",
    name: "StudentRegister",
    component: StudentRegister
  }
];

const router = new VueRouter({
  routes
});

export default router;
