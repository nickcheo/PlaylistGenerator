import Vue from "vue";
import Router from "vue-router";
import createWebHistory from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Home from "@/components/Home";
import Login from "@/components/Login.vue";
import Clusters from "@/components/Clusters"
import Recommend from "@/components/Recommend"
import About from '@/components/About'

Vue.use(Router);
/* eslint-disable */
export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/next",
      name: "Login",
      component: Login
    },
    {
      path: "/hello",
      name: "Hello",
      component: HelloWorld
    },
    {
      path: "/clusters",
      name: "Clusters",
      component: Clusters
    },
    {
      path: "/recommend",
      name: "Recommend",
      component: Recommend
    },
    {
      path: '/about',
      name: "About",
      component: About
    },
    {
      path: '/recommend/:myParam',
      redirect: to => { return {path: '/recommend', query: {params: to.params.myParam} }}
    }
  ],
  mode: "history"
});
