import { createRouter, createWebHistory } from "vue-router";
import { useGeneralStore } from "@/stores/general";
import Home from "@/views/index.vue";
import Public from "@/views/public_/public.vue";
import Login from "@/views/auth/login.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
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
          component: Login,
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
      path: "/message/:name/:id",
      name: "message",
      component: () => import("@/views/message/message.vue"),
      props: true,
    },
    // public
    {
      path: "/public",
      name: "public",
      component: Public,
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
  const token = localStorage.getItem("Authorization");
  const store = useGeneralStore();

  if (to.path === "/" && !token) next("/public");

  if (to.meta && to.meta.layout) {
    store.layout = to.meta.layout;
  } else {
    store.layout = null;
  }
  next();
});
export default router;
