<template>
  <v-container fluid style="width: 40%">
    <v-simple-table style="white-space: nowrap" fixed-header height="400px" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-if="type == 'project' && isAdmin" class="text-left"></th>
            <th class="text-left">date</th>
            <th class="text-left">commit hash</th>
            <th class="text-left">tag</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in gridData.desserts"
            :key="item.name"
            @mouseover="selectItem(Math.abs(i - gridData.desserts.length) - 1, true)"
            @mouseleave="selectItem(Math.abs(i - gridData.desserts.length) - 1, false)"
            class="compact-cell"
          >
            <!-- <td style="padding: 0px 0px 0px 4px">
              <v-checkbox v-model="selectedItems" :value="generateCheckboxValue(item)"></v-checkbox>
            </td> -->
            <td v-if="type == 'project' && isAdmin" style="padding: 0px 0px 0px 4px">
              <v-icon @click="deleteRow(item)" class="delete-icon">mdi-delete</v-icon>
            </td>
            <td>
              {{ item.name }}
              <span :class="[item.legacy ? 'mdi mdi-alpha-l-circle' : '']" style="color: red"></span>
            </td>
            <td>{{ item.engineHash }}</td>
            <td>{{ item.tag }}</td>
            <!-- <td style="display: flex">
            <v-btn fab small density="compact" @click="deleteRow()">
              <v-icon small color="red">mdi-delete</v-icon>
            </v-btn>
          </td> -->
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- TODO: 추후 추가. store와 compare 선택해서 추가하는 버튼 -->
    <!-- <v-row justify="center" style="margin-top: 10px">
      <v-col cols="12">
        <v-row justify="center">
          <v-btn style="margin: 0 2px" color="secondary" text outlined :disabled="selectedItems.length == 0"
            >store</v-btn
          >
          <v-btn style="margin: 0 2px" color="secondary" text outlined :disabled="selectedItems.length == 0"
            >compare</v-btn
          >
        </v-row>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
/**
 * drawGrid.vue
 * @description grid를 그려준다
 * @namespace Vue
 */
import gridData from "@/components/grid/gridData";
import { deleteData } from "@/components/modules/controlAxios";

import Vue from "vue";

export default Vue.extend({
  name: "drawGrid",
  props: ["dataList", "type", "index", "isAdmin"],
  data() {
    return { selectedItems: [], gridData: gridData(this.dataList, this.type) };
  },
  // TODO: 지우기
  watch: {
    selectedItems(newMsg) {
      console.log("selectedItems: " + newMsg);
    },
  },
  methods: {
    selectItem(index: number, flag: boolean) {
      this.$emit("selectItem", {
        chartIndex: this.index,
        dotIndex: index,
        flag,
      });
    },
    async deleteRow(item) {
      console.log(item);
      await deleteData({
        projectName: this.dataList.projectName,
        consumeTime: item.originDate,
        engineHash: item.engineHash,
        tag: item.tag,
        serverPort: this.$route.query.serverPort as string,
      });
    },
    // generateCheckboxValue(item) {
    //   return `${item.originDate}/${item.engineHash}/${item.tag}`;
    // },
  },
});
</script>

<style lang="scss">
tbody td {
  text-align: left;
}
// 이렇게 하면 우선순위가 낮아져서 먹히지 않음
// .v-data-table__wrapper {
//     overflow-x: hidden;
// }

// .v-data-table--fixed-header > .v-data-table__wrapper,
// .v-data-table--fixed-height .v-data-table__wrapper {
//   overflow-x: hidden;
// }
/* Define custom cell padding */
</style>
