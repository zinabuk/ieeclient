import { createRouter, createWebHistory } from "vue-router";
import RegisterStaff from "@/views/RegisterStaff.vue";
import LogIn from "@/views/LogIn.vue";
import DashBoard from "@/views/protected/DashBoard.vue";
const routes = [
  {
    path: "/",
    name: "RegisterStaff",
    component: RegisterStaff,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/home",
    component: DashBoard,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
