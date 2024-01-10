<template lang="html">
    <div>
        <br /><br /><br /><br /><br /><br />
        <h1>not found page</h1>
        <br /><br /><br />
        <v-btn outlined @click="home()">home 으로 돌아가기</v-btn>
    </div>
</template>

<script lang="ts">
/**
 * NotFoundPage.vue
 * @description 없는 페이지를 접근할 때의 라우터 처리
 * @namespace Vue
 */
import Vue from "vue";

export default Vue.extend({
    name: "NotFoundPage",

    methods: {
        home() {
            this.$router.push("/");
        },
    },
});
</script>

<style lang="scss"></style>
