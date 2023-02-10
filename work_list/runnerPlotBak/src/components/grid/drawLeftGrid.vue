<template>
    <v-simple-table style="white-space: nowrap; table-layout: fixed">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">name</th>
                    <th class="text-left">contents</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in gridData" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.contents }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script lang="ts">
import Vue from "vue";
import { leftGridData } from "@/components/grid/gridData";

export default Vue.extend({
    props: ["dataList", "type"],
    data() {
        return { gridData: leftGridData(this.dataList, this.type) };
    },
});
</script>
<style lang="scss"></style>
