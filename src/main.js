import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  PaginationPlugin,
  PaginationNavPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  PaginationPlugin,
  PaginationNavPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);


axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log("a")

    return config;
  },
  function(error) {
    // Do something with request error
    console.log("b")

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log("c")
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    console.log("d")

    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  // username: localStorage.username,
  username: undefined,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  async logout() {
    console.log("logout");
    // logout from Azure Server
    try {
      axios.defaults.withCredentials = true;
      await axios.post(
        "http://localhost:3000/logout",
      );
      axios.defaults.withCredentials = false;
      localStorage.removeItem("username");
      this.username = undefined;
    }
    catch (error) {
    console.log("error in update log out")
    console.log(error);
    }
  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
