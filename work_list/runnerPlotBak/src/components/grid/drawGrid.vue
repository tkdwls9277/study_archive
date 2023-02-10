<template>
    <v-simple-table style="white-space: nowrap" fixed-header height="450px">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">date</th>
                    <th class="text-left">commit hash</th>
                    <th class="text-left">legacy</th>
                    <th class="text-left">tag</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, i) in gridData.desserts"
                    :key="item.name"
                    @mouseover="selectItem(Math.abs(i - gridData.desserts.length) - 1, true)"
                    @mouseleave="selectItem(Math.abs(i - gridData.desserts.length) - 1, false)"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ item.engineHash }}</td>
                    <td>
                        <v-icon color="red">{{ item.legacy ? "mdi-check" : "" }}</v-icon>
                    </td>
                    <td>{{ item.tag }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script lang="ts">
/**
 * drawGrid.vue
 * @description grid를 그려준다
 * @namespace Vue
 */
import gridData from "@/components/grid/gridData";
import Vue from "vue";

export default Vue.extend({
    props: ["dataList", "type", "index"],
    data() {
        return { gridData: gridData(this.dataList, this.type) };
    },
    methods: {
        selectItem(index: number, flag: boolean) {
            this.$emit("selectItem", { chartIndex: this.index, dotIndex: index, flag });
        },
    },
});
</script>

<style lang="scss">
// 이렇게 하면 우선순위가 낮아져서 먹히지 않음
// .v-data-table__wrapper {
//     overflow-x: hidden;
// }

.v-data-table--fixed-header > .v-data-table__wrapper,
.v-data-table--fixed-height .v-data-table__wrapper {
    overflow-x: hidden;
}
</style>
