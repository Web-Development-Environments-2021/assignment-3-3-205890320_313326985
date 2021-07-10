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
  PaginationNavPlugin,
  FormRadioPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  ModalPlugin,
  FormSpinbuttonPlugin,
  IconsPlugin,
  SpinnerPlugin
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
  FormRadioPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  ModalPlugin,
  FormSpinbuttonPlugin,
  IconsPlugin,
  SpinnerPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);


axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    return config;
  },
  function(error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error

    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage?.username,
  unionAgent: localStorage?.unionAgent,
  searchObject: sessionStorage?.searchObject,
  login(loginDetails) {
    let username = loginDetails.username;
    let unionAgent = loginDetails.response.union_agent;
    localStorage.setItem("username", username);
    localStorage.setItem("unionAgent", unionAgent);
    if(unionAgent == 1){
      this.unionAgent = unionAgent;
    }
    else{
      this.unionAgent = undefined;
    }

    this.unionAgent = unionAgent;
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
      localStorage.removeItem("unionAgent");
      sessionStorage.removeItem("searchObject");
      this.username = undefined;
      this.unionAgent = undefined;
      this.searchObject= undefined;
    }
    catch (error) {
    console.log("error in update log out")
    console.log(error);
    }
  },
  setSearchData(searchDet){
    this.searchObject=searchDet;
    sessionStorage.setItem("searchObject", this.searchObject);
  }
};
console.log(shared_data);

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
