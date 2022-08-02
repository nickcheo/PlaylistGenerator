// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    getSpotifyLogin: async () => {
      console.log('login func heree')
      try {
        let response = await fetch('http://localhost:2000/login')
        // let token = await response.json()
        // console.log(JSON.stringify(token))
        console.log('response here hopefully')
        window.location.href = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
