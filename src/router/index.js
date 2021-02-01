import Vue from "vue";
import VueRouter from "vue-router";
import Form from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import InError from "../views/InError.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Form",
    component: Form
  },
  {
    path: "/form",
    component: Form
  },

  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/500',
    component: InError
  },
  {
    path: '*',
    redirect: '/404',
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
