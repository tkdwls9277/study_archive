<template>
    <v-app>
        <!--scroll top을 위한 위치-->
        <div class="header" />

        <!-- list, graph 동적 분할 -->
        <Split>
            <SplitArea :size="15">
                <navigation-bar :listDataCov="listDataCov" />
            </SplitArea>
            <SplitArea :size="85">
                <v-main>
                    <drawPage :type="$route.name" :projectName="projectName" :fileLocation="fileLocation" @setListData="setListData" />
                </v-main>
            </SplitArea>
        </Split>

        <scrollTop />
    </v-app>
</template>

<script lang="ts">
/**
 * HomeView.vue
 * @description 기본 home 화면
 * @namespace Vue
 */
import drawPage from "@/components/drawPage.vue";
import navigationBar from "@/components/scroll/navigationBar.vue";
import scrollTop from "@/components/scroll/scrollTop.vue";
import { listitems } from "@/components/modules/dataDto";
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
    data() {
        return {
            // diffPreviousLineCoverage: [] as number[],
            listDataCov: [] as listitems[],
        };
    },

    components: { drawPage, navigationBar, scrollTop },

    methods: {
        setListData: function (listDataCov: listitems[]) {
            this.listDataCov = listDataCov;
        },
    },
});
</script>
