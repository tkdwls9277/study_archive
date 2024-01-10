<template>
  <div id="app">
    <v-app-bar dark app>
      <img src="@/assets/coyote.png" />
      <h1 @click="home()" style="cursor: pointer; white-space: nowrap z-index: 99;">
        {{ viewTitle() }}
      </h1>
      <v-tabs>
        <v-tab @click="home()">bar chart</v-tab>
        <v-tab @click="$router.push({ path: '/project', query: { serverPort: serverPort } })">line chart</v-tab>
        <v-tab @click="$router.push('/store')">store</v-tab>
        <v-tab @click="$router.push('/compare')">compare</v-tab>
      </v-tabs>
      <v-btn @click="onClickRedirect('12345')" outlined>nightly</v-btn>
      <v-btn @click="onClickRedirect('12348')" outlined>light</v-btn>
    </v-app-bar>
    <router-view :key="$route.path" />
  </div>
</template>

<script lang="ts">
/**
 * HomeView.vue
 * @description 기본 home 화면
 * @namespace Vue
 */
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {
    serverPort() {
      return this.$route.query.serverPort || undefined;
    },
  },
  methods: {
    home() {
      this.$router.push({ path: "/", query: { serverPort: this.serverPort } });
    },
    onClickRedirect: function (url: string) {
      let targetUrl = "http://10.0.1.60:8888";

      if (~window.location.href.indexOf("project")) {
        targetUrl += "/project";
      }

      targetUrl = targetUrl + "/?serverPort=" + url;

      window.open(targetUrl, "_self");

      // if (~window.location.href.indexOf("project")) window.open("http://10.0.1.60:" + url + "/project", "_self");
      // else window.open("http://10.0.1.60:" + url, "_self");
    },
    viewTitle: function () {
      return this.serverPort == "12348"
        ? "Mercury Light Test"
        : this.serverPort == "12345"
        ? "Mercury Nightly Test"
        : "Mercury " + this.serverPort + " Test";
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

img {
  // width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>
