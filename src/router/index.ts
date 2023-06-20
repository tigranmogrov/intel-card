import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";

import middlewarePipeline from "./middlewarePipeline";
import auth from "./middleware/auth";
import guest from "./middleware/guest";
import cardId from "./middleware/card-id";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: { middleware: [auth] },
  },
  {
    path: "/register",
    component: () => import("@/views/RegisterView.vue"),
    name: "Register",
    meta: { middleware: [guest], title: "Register" },
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
    name: "Login",
    meta: { middleware: [guest], title: "Login" },
  },
  {
    path: "/create-card",
    name: "Create",
    component: () => import("@/views/CreateCard.vue"),
    meta: { middleware: [auth] },
  },
  {
    path: "/cards",
    name: "Cards",
    component: () => import("@/views/Cards.vue"),
    meta: { middleware: [auth] },
  },
  {
    path: "/cards/:id",
    name: "Cards-item",
    component: () => import("@/views/CardItem.vue"),
    meta: { middleware: [auth, cardId] },
  },
  { path: "/:pathMatch(.*)*", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware: any = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

router.afterEach((to) => {
  const docTitle: any = to.meta.title || "";
  if (docTitle) {
    document.title = `Intelli ${to.meta.title}`;
  }
});

export default router;
