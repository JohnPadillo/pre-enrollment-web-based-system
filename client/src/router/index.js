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
import AdminRole from "../views/admin/roles";
import AdminPreEnrollment from "../views/admin/pre-enrollment";
import AdminFees from "../views/admin/fees";

// Student
import StudentRegister from "../views/students/register";
import StudentDashboard from "../views/students/dashboard";
import Login from "../views/login";

// Forgot Password
import ForgotPassword from "../views/forgotpassword";
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
  {
    path: "/admin/roles",
    name: "AdminRole",
    component: AdminRole
  },
  {
    path: "/admin/pre-enrollment",
    name: "AdminPreEnrollment",
    component: AdminPreEnrollment
  },
  {
    path: "/admin/fees",
    name: "AdminFees",
    component: AdminFees
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
  },

  // Forgot Password
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword
  }
];

const router = new VueRouter({
  routes
});

export default router;
