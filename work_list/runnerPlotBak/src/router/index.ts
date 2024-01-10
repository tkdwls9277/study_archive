import Vue from "vue";
import VueRouter from "vue-router";

//modules
import HomeView from "@/views/HomeView.vue";
import ProjectView from "@/views/ProjectView.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

/** 같은 페이지에서 같은 페이지로 $router.push 한 오류를 처리함 (ex : 홈페이지에서 홈 로고를 클릭한 경우) */
const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    return window.location.reload();
  });
};

//Vue와 VueRouter 연결
Vue.use(VueRouter);

//우리가 사용할 route 생성 및 설정
const routes = [
  {
    path: "/",
    component: ProjectView,
    props: true,
  },
  {
    path: "/project",
    name: "project",
    component: HomeView,
    props: true,
  },
  {
    path: "/file",
    name: "file",
    component: HomeView,
    props: true,
  },
  {
    path: "/unit",
    name: "unit",
    component: HomeView,
    props: true,
  },
  {
    path: "/store",
    name: "store",
    component: HomeView,
    props: true,
  },
  {
    path: "/compare",
    name: "compare",
    component: HomeView,
    props: true,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
