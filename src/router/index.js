import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue';
import { isLogin } from "./../utils/auth";
// check,
import Forbidden from "./../views/403"; // 非异步加载
// import findLast from "lodash/findLast";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/list",
    name: "List",
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/detail/:courseId",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/hot/:type",
    name: "Hot",
    component: () => import(/* webpackChunkName: "hot" */ "../views/Hot.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import(/* webpackChunkName: "mine" */ "../views/Mine.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      title: "虚拟现实教学平台"
    }
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (!isLogin() && to.name == "Mine") {
    next({
      name: "Login"
    });
  } else {
    next();
  }
  next();
});

export default router;
