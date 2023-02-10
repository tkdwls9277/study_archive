<template>
    <v-navigation-drawer id="app-drawer" dark style="position: fixed; width: inherit; padding-top: 50px">
        <br />
        <v-subheader v-if="types == 'project'">
            <v-select :items="Object.keys(categorys)" label="category filter" v-model="selectListItems" chips multiple solo />
        </v-subheader>

        <v-list nav dense style="text-align: left" subheader two-line>
            <v-list-item-group v-model="selectedItem" v-if="viewListItems.length != 0">
                <v-list-item v-for="(item, i) in viewListItems" v-show="showFilterList(item)" :key="i" :id="i" @click="$vuetify.goTo('#planet-chart' + i)">
                    <v-list-item-content>
                        <!--FIXME: id를 받아서 하는 식으로 바꾸면 재사용성 증가할듯함-->
                        <v-list-item-title v-text="item.name + ' ' + getCatList(item)"> </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action style="display: contents">
                        <div :style="{ color: item.coverage == 0 ? 'red' : 'white' }">{{ item.coverage }}</div>
                        <div :style="{ color: showItemColor(item.diffCoverage) }">({{ showDiffItem(item.diffCoverage) }})</div>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
            <!-- 결과가 아무것도 없을 경우 -->
            <v-list-item-group v-else style="text-align: center"> <v-list-item-title>검색 결과가 없습니다</v-list-item-title> </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
/**
 * navigationBar.vue
 * @description 페이지의 전체 리스트를 보여주는 navibar
 * @namespace Vue
 */
import Vue from "vue";
import category from "@/assets/category.json";
import { listitems } from "@/components/modules/dataDto";

export default Vue.extend({
    props: ["listDataCov"],
    data() {
        return {
            types: this.$route.name as string,
            projectName: (this.$route.query.projectName as string) || ("" as string),
            fileLocation: (this.$route.query.fileLocation as string) || ("" as string),
            selectedItem: 0,
            categorys: JSON.parse(JSON.stringify(category)),
            allListItems: this.listDataCov,
            viewListItems: [] as listitems[],
            selectListItems: [] as string[],
        };
    },

    methods: {
        // category filter show
        showFilterList: function (item) {
            if (this.selectListItems.length === 0) {
                return true;
            } else {
                for (let i = 0; i < this.selectListItems.length; i++) {
                    if (item[this.selectListItems[i]]) return true;
                }
                return false;
            }
        },

        // diffCoverage 색상
        showItemColor: function (item: number) {
            if (item > 0) {
                if (item > 1) return "green";
                else return "#A6FDB6";
            } else if (item < 0) {
                if (item < -1) return "red";
                else return "#FFBABA";
            } else return "white";
        },

        // diffCoverage 값
        showDiffItem: function (item: number) {
            return item > 0 ? "▲ " + item + "%" : item < 0 ? "▼ " + item + "%" : "-";
        },

        // 각 list가 속한 category 리스트
        getCatList: function (item: listitems) {
            let itemKeyList = Object.keys(item).slice(3);

            if (itemKeyList.length > 0) return "[" + itemKeyList.join(",") + "]";
            else return "";
        },
    },

    watch: {
        // project list coverage 순차적으로 적용
        listDataCov: function (newListDataCov: listitems[]) {
            this.allListItems = newListDataCov;
            for (let i = 0; i < this.allListItems.length; i++) {
                for (let key in this.categorys) {
                    if (this.categorys[key].includes(this.allListItems[i].name.toLowerCase())) {
                        this.allListItems[i][key] = true;
                    }
                }
            }
            // 바뀐 값에 대한 화면갱신을 위해 PUSH를 사용
            this.viewListItems = [];
            this.viewListItems.push(...this.allListItems);
        },
    },
});
</script>
