import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import lodash from "lodash";
import moment from "vue-moment";
import VueSplit from "vue-split-panel";
import "@babel/polyfill";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //TODO: 사용이 되는건지 확인
Vue.prototype._ = lodash;
Vue.prototype.$moment = moment;

Vue.use(VueSplit);
declare module "vue/types/vue" {
    interface Vue {
        $axios: typeof axios;
        _: typeof lodash;
        $moment: typeof moment;
    }
}

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
