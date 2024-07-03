import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import VidCall from "./pages/VidCall.vue";
import Main from "./pages/Main.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Main, name: "main" },
  { path: "/vid-call", component: VidCall, name: "vid-call" },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
