<template>
    <div id="app">
        <v-app-bar dark app>
            <img src="@/assets/coyote.png" />
            <h1 @click="home()" style="cursor: pointer; white-space: nowrap">
                {{ viewTitle() }}
            </h1>
            <v-tabs>
                <v-tab @click="home()">bar chart</v-tab>
                <v-tab @click="$router.push('/project')">line chart</v-tab>
            </v-tabs>
            <v-btn @click="onClickRedirect('8888')" outlined>nightly</v-btn>
            <v-btn @click="onClickRedirect('12347')" outlined>light</v-btn>
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
    methods: {
        home() {
            this.$router.push("/");
        },
        onClickRedirect: function (url: string) {
            if (~window.location.href.indexOf("project")) window.open("http://10.0.0.5:" + url + "/project", "_self");
            else window.open("http://10.0.0.5:" + url, "_self");
        },
        viewTitle: function () {
            return ~window.location.href.indexOf("12347") ? "Mercury Light Test" : "Mercury Nightly Test";
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
