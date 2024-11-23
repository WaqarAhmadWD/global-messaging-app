import { createRouter, createWebHistory } from "vue-router";
import { useGeneralStore } from "@/stores/general";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
    },
    // authorization
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/layouts/auth.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/login.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/views/auth/signup.vue"),
        },
      ],
      meta: {
        layout: "auth",
      },
    },
    // message
    {
      path: "/message/:id",
      name: "message",
      component: () => import("@/views/message/message.vue"),
      props: true,
    },
    // public
    {
      path: "/public",
      name: "public",
      component: () => import("@/views/public_/public.vue"),
    },
    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const store = useGeneralStore();
  if (to.meta && to.meta.layout) {
    store.layout = to.meta.layout;
  } else {
    store.layout = null;
  }
  next();
});
export default router;
