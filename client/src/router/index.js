import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Home from "@/components/Home";
import Login from "@/components/Login.vue";
import Clusters from "@/components/Clusters"
import Recommend from "@/components/Recommend"

Vue.use(Router);
/* eslint-disable */
export default new Router({
  routes: [
    // uncomment and remove other '/' path to get this back
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },

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
      path: '/recommend/:myParam',
      redirect: to => { return {path: '/recommend', query: {params: to.params.myParam} }}
    }
  ],
  // mode: "history"
});
