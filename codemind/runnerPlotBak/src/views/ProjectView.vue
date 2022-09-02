<template>
    <v-app>
        <!--scroll top을 위한 위치-->
        <div class="header" />

        <!-- list, graph 동적 분할 -->

        <v-main>
            <draw-prg-page :type="type" :projectName="projectName" :fileLocation="fileLocation" />
        </v-main>

        <scrollTop />
    </v-app>
</template>

<script lang="ts">
/**
 * HomeView.vue
 * @description 기본 home 화면
 * @namespace Vue
 */
import drawPrgPage from "@/components/drawPrjPage.vue";
import scrollTop from "@/components/scroll/scrollTop.vue";
import Vue from "vue";

export default Vue.extend({
    name: "App",
    props: {
        type: {
            type: String,
            default: "",
        },
        projectName: {
            type: String,
            default: "",
        },
        fileLocation: {
            type: String,
            default: "",
        },
    },

    components: { drawPrgPage, scrollTop },
});
</script>
