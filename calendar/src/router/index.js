import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/index.vue";

const routes = [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/PersonalCabinet",
      name: "PersonalCabinet",
      component: () => import("@/pages/PersonalCabinet.vue")
    },
    {
      path: "/employees",
      name: "employees",
      component: () => import("@/pages/employees.vue")
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;