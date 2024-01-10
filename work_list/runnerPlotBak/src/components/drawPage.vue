<template>
  <div class="item">
    <rootIndex :type="types" :projectName="projectName" :fileLocation="fileLocation" />
    <div id="chartApp" class="small">
      <search-chart @change="change" @switch_change="handleSwitchChange" :type="types" />
      <!-- dataList 배열의 수에 따라 반복적으로 그려주는 구문 -->
      <div v-if="(response.contents && response.contents.length) != 0">
        <!-- <v-virtual-scroll class="v-list" :item-height="50" :items="response.contents">
          <template v-slot="{ item, i }">
            <v-list-item-title>Item {{ item }}</v-list-item-title> -->
        <div v-for="(item, i) in response.contents" :key="i" class="double">
          <!-- left -->
          <drawLeftGrid :data-list="item" :type="types" :isAdmin="isAdmin" />
          <!-- chart-->
          <canvas v-bind:id="'planet-chart' + i" :style="getStyle(item)">
            <draw-chart
              :data-list="item"
              :chart-id="'planet-chart' + i"
              :type="types"
              :index="i"
              :observe-chart="true"
            />
          </canvas>
          <!-- grid -->
          <draw-grid
            :data-list="item"
            :type="types"
            style="margin-left: 10px"
            @selectItem="selectItem"
            :index="i"
            :isAdmin="isAdmin"
          />
          <!-- next button -->
          <v-btn class="btn" dark height="inherit" v-if="types != 'unit'" @click="next(item)">
            <v-icon large>mdi-chevron-right </v-icon>
          </v-btn>
        </div>
        <!-- </template> -->
        <!-- </v-virtual-scroll> -->
      </div>
      <div v-else>검색결과가 없습니다</div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * drawPage.vue
 * @description 각 모듈을 조합해 runner_plot을 그려준다
 * @namespace Vue
 */

import drawChart, { hoverChart } from "@/components/chart/drawChart.vue";
import drawGrid from "@/components/grid/drawGrid.vue";
import drawLeftGrid from "@/components/grid/drawLeftGrid.vue";
import controlAxios from "@/components/modules/controlAxios";
import { Runner, List, Controller, hoverGrid, listitems, searchData } from "@/components/modules/dataDto.js";
import searchChart from "@/components/search/searchChart.vue";
import rootIndex from "@/components/scroll/rootIndex.vue";
// import VirtualList from "vue-virtual-scroll-list";
// import { VirtualScrollList } from "vue3-virtual-scroll-list";
// import TriggerObserver from "@/components/modules/triggerObserver.vue";
import testSet from "@/assets/testSet.json"; //TODO: 지우기

import _ from "lodash";
import Vue from "vue";

export default Vue.extend({
  name: "drawPage",
  components: { drawChart, drawGrid, drawLeftGrid, searchChart, rootIndex },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    serverPort() {
      return this.$route.query.serverPort || undefined;
    },
  },
  data() {
    const run: Runner = {
      totalPageSize: 0,
      contents: [],
    };
    return {
      types: this.type,
      response: {} as Runner,
      allResponse: run,
      projectName: (this.$route.query.projectName as string) || ("" as string),
      fileLocation: (this.$route.query.fileLocation as string) || ("" as string),
      pageNum: 0,
      diffPreviousLineCoverage: [] as number[], //
      listDataCov: [] as listitems[],
      runnerItemResults: "",
      runnerItemName: "",
      isAdmin: false,
      // showList: [] as List[],
      // showCount: 0,
      remain: 8,
      size: 40,
    };
  },
  created() {
    this.getDataFromApi();
    if (this.types == "unit") {
      this.runnerItemResults = "runnerUnitResults";
      this.runnerItemName = "unitName";
    } else if (this.types == "file") {
      this.runnerItemResults = "runnerFileResults";
      this.runnerItemName = "fileLocation";
    } else {
      this.runnerItemResults = "projectResults";
      this.runnerItemName = "projectName";
    }
  },
  // mounted() {
  //   this.loadItems();
  // },
  methods: {
    // 처음 진입 시 api를 호출하는 module. addDataFromApi로 전체 데이터를 순차적으로 그려준다.
    async getDataFromApi() {
      this.response = await controlAxios({
        type: this.types,
        projectName: this.projectName,
        fileLocation: this.fileLocation,
        pageNum: this.pageNum,
        serverPort: this.$route.query.serverPort as string,
      });

      /**test set**/
      // this.response = testSet;

      this.pageNum = 0;

      // 서버에서 값을 못받을 때 에러처리
      // FIXME: 서버에서 받은 상태로 판단하기
      if (_.isEmpty(this.response)) {
        console.warn("서버와 통신이 되지 않습니다.");
        this.response = await controlAxios({
          type: this.types,
          projectName: this.projectName,
          fileLocation: this.fileLocation,
          pageNum: this.pageNum,
          serverPort: this.$route.query.serverPort as string,
        });
        if (_.isEmpty(this.response)) {
          alert("서버와 통신이 되지 않습니다.");
        }
        return;
      }

      for (let i = 0; i < this.response.totalPageSize - 1; i++) {
        await setTimeout(() => {
          this.addDataFromApi();
        }, 1000);
      }
      // this.loadItems();
    },

    // 다음 페이지의 데이터를 가져와 밑에 추가하는 module
    async addDataFromApi() {
      this.pageNum += 1;

      const nextData: Runner = await controlAxios({
        type: this.types,
        projectName: this.projectName,
        fileLocation: this.fileLocation,
        pageNum: this.pageNum,
        serverPort: this.$route.query.serverPort as string,
      });

      setTimeout(() => {
        this.response.contents.push(...nextData.contents);
      }, 500);
    },

    // 다음 페이지로 넘기는 action
    next(contents: List) {
      let name = "";
      if (this.types == "project") {
        name = "file";
      } else if (this.types == "file") {
        name = "unit";
      } else {
        return;
      }

      this.$router.push({
        name: name,
        query: {
          type: name,
          projectName: contents.projectName,
          fileLocation: contents.fileLocation,
          serverPort: this.serverPort,
        },
      });
    },

    // TODO: 검색 기준 한번 더 정립
    // 필터검색을 한 경우
    async change(value: searchData) {
      // responese buffer 비워주기
      if (this.allResponse.totalPageSize == 0) this.allResponse = _.cloneDeep(this.response);
      this.response = {
        totalPageSize: this.allResponse.totalPageSize,
        contents: [],
      };

      // 아무 검색값이 없는 경우
      if (
        value.id === "" &&
        value.branchCov.length === 0 &&
        value.lineCov.length === 0 &&
        value.lineCompareNum === "" &&
        value.branchCompareNum === "" &&
        value.viewGraph === "all" &&
        value.checkboxOption.some((item) => {
          return !item.enabled;
        }) &&
        value.tag === ""
      ) {
        setTimeout(() => {
          if (this.allResponse) {
            this.response = this.allResponse;
          }
        });
        return;
      }

      setTimeout(() => {
        let result = {
          totalPageSize: this.allResponse.totalPageSize,
          contents: [] as List[],
        };
        result.contents = value.id ? this.searchId(value.id) : _.cloneDeep(this.allResponse.contents);

        if (value.lineCov.length > 0)
          result.contents = this.searchCov(result.contents, Number(value.lineCompareNum), value.lineCov, "line");

        if (value.branchCov.length > 0)
          result.contents = this.searchCov(result.contents, Number(value.branchCompareNum), value.branchCov, "branch");

        if (value.viewGraph !== "all") result.contents = this.skipChartData(result.contents, value.viewGraph);

        const foundCheckOption = value.checkboxOption.find((option) => option.id === "legacy");
        if (foundCheckOption?.enabled) {
          result.contents = this.findLegacyData(result.contents);
        }

        if (value.tag !== "") {
          result.contents = this.searchTag(result.contents, value.tag);
        }

        this.response = result;
      });
    },

    findLegacyData(list: List[]): List[] {
      return list.filter((item) => {
        const runnerItems = item[this.runnerItemResults];
        if (runnerItems[runnerItems.length - 1].legacy) {
          return true;
        }
      });
    },

    /**
     * @description 같지 않은 데이터만 남기는 함수
     * @param value ["all", "skip"]
     */
    skipChartData(list: List[], viewGraph: string): List[] {
      if (viewGraph == "skip") {
        return list.filter((item) => {
          const runnerItems = item[this.runnerItemResults];
          if (runnerItems.length >= 2) {
            const lastItem = runnerItems[runnerItems.length - 1];
            const secondToLastItem = runnerItems[runnerItems.length - 2];

            if (
              lastItem.branchCoverage !== undefined &&
              secondToLastItem.branchCoverage !== undefined &&
              lastItem.branchCoverage !== secondToLastItem.branchCoverage
            ) {
              return true;
            }

            if (
              lastItem.lineCoverage !== undefined &&
              secondToLastItem.lineCoverage !== undefined &&
              lastItem.lineCoverage !== secondToLastItem.lineCoverage
            ) {
              return true;
            }
          }
        });
      }
      return list;
    },

    selectItem(item: hoverGrid) {
      hoverChart(item);
    },

    // -1퍼 이상 떨어지면 빨간색 배경으로 표시
    getStyle(item: List) {
      let itemList = this.makeListFormat(item);
      if (_.isEmpty(itemList.runnerResults)) {
        return "";
      }

      const currentResult = itemList.runnerResults[itemList.runnerResults.length - 1];
      const prevResult = itemList.runnerResults[itemList.runnerResults.length - 2];

      if (currentResult.branchCoverage - _.get(prevResult, "branchCoverage") < -1) {
        return "background-color: rgba(251, 85, 85, 0.4)";
      }

      return "";
    },

    // List에서 type에 따라 controller를 반환
    makeListFormat(item: List) {
      let runnerResults: Controller[];
      let runnerName = "";

      runnerResults = item[this.runnerItemResults];
      runnerResults.length != 0 ? (runnerName = runnerResults[runnerResults.length - 1][this.runnerItemName]) : "";

      return { runnerResults, runnerName };
    },

    searchId(id: string): List[] {
      // 검색어 입력

      return this.allResponse.contents.filter((item) => {
        if (this.types == "project") {
          return item.projectName.toUpperCase().includes(id.toUpperCase());
        } else if (this.types == "file") {
          return item.fileLocation.toUpperCase().includes(id.toUpperCase());
        } else {
          return item.unitName.toUpperCase().includes(id.toUpperCase());
        }
      });
    },

    searchCov(list: List[], compareNum: number, cov: string[], type: string): List[] {
      // 라인 커버리지
      return list.filter((item) => {
        if (this.types == "project") {
          return this.compareCov(item.projectResults[item.projectResults.length - 1], compareNum, cov, type);
        } else if (this.types == "file") {
          return this.compareCov(item.runnerFileResults[item.runnerFileResults.length - 1], compareNum, cov, type);
        } else {
          return this.compareCov(item.runnerUnitResults[item.runnerUnitResults.length - 1], compareNum, cov, type);
        }
      });
    },

    searchTag(list: List[], tag: string) {
      console.log("여기 확인");
      // const result = list.map((item) => {
      //     if (this.types == "project") {
      //         // return item.projectResults.tag==tag;
      //         return (item.projectResults = item.projectResults.filter((item2) => {
      //             return item2.tag == tag;
      //         }));
      //     } else if (this.types == "file") {
      //         return (item.runnerFileResults = item.runnerFileResults.filter((item2) => {
      //             return item2.tag == tag;
      //         }));
      //     } else {
      //         return (item.runnerUnitResults = item.runnerUnitResults.filter((item2) => {
      //             return item2.tag == tag;
      //         }));
      //     }
      // });

      list.forEach((item) => {
        if (this.types == "project") {
          // return item.projectResults.tag==tag;
          item.projectResults = item.projectResults.filter((result) => result.tag.includes(tag));
        } else if (this.types == "file") {
          item.runnerFileResults = item.runnerFileResults.filter((result) => result.tag.includes(tag));
        } else {
          item.runnerUnitResults = item.runnerUnitResults.filter((result) => result.tag.includes(tag));
        }
      });

      return list;
    },

    compareCov(resultList: Controller, compareNum: number, cov: string[], compareType: string) {
      let diffCov: number;
      if (compareType == "line") {
        diffCov = Number((resultList.diffPreviousLineCoverage as number).toFixed(2));
      } else {
        diffCov = Number((resultList.diffPreviousBranchCoverage as number).toFixed(2));
      }

      if (cov.includes("U") && diffCov > compareNum) return true;
      if (cov.includes("S") && diffCov == compareNum) return true;
      if (cov.includes("D") && diffCov < compareNum) return true;

      return false;
    },

    handleSwitchChange(event) {
      this.isAdmin = event;
    },
    // loadItems() {
    //   const emptyList: List = {
    //     fileLocation: "",
    //     projectName: "",
    //     unitName: "",
    //     projectResults: [],
    //     runnerFileResults: [],
    //     runnerUnitResults: [],
    //     prebuildError: 0,
    //     buildError: 0,
    //     filesCount: 0,
    //     emptyFile: 0,
    //   };
    //   let contents = this.response.contents;
    //   const count = this.showCount;
    //   const showList = this.showList;

    //   if (this.showList.length == 0) {
    //     // this.showList = new Array(this.response.contents.length).fill("");
    //     this.showList = new Array(this.response.contents.length).fill({ ...emptyList });
    //   }

    //   // for (let i = this.showCount; i < this.showCount + 5; i++) {
    //   //   this.showList.push(contents[i]);
    //   // }
    //   const temp = this.response.contents.slice(this.showCount, 5);
    //   for (let i = this.showCount; i < this.showCount + 5; i++) {
    //     this.showList[i] = { ...temp[i] };
    //   }
    //   this.showCount += 5;
    // },
  },

  watch: {
    response: {
      deep: true,
      handler: function (newResponse: Runner) {
        let listData = [] as listitems[];

        newResponse.contents.forEach((item: List) => {
          let itemList = this.makeListFormat(item);
          if (itemList.runnerName == "") return;

          // branch coverage 우선, branch coverage가 없는 경우 line coverage로 대체
          let curController = itemList.runnerResults[itemList.runnerResults.length - 1];
          let preController = itemList.runnerResults[itemList.runnerResults.length - 2];
          listData.push({
            name: itemList.runnerName,
            coverage:
              curController.branchTotal !== 0
                ? curController.branchCoverage.toFixed(2)
                : "[L]" + curController.lineCoverage.toFixed(2),

            diffCoverage: (curController.branchTotal !== 0
              ? curController.branchCoverage - _.get(preController, "branchCoverage")
              : curController.lineCoverage - _.get(preController, "lineCoverage")
            ).toFixed(2),
          });
        });
        this.listDataCov = listData;
      },
    },
    listDataCov: {
      deep: true,
      handler: function (newResponse: listitems[]) {
        this.$emit("setListData", newResponse);
      },
    },
  },
});
</script>

<style lang="scss" scope>
.small {
  width: 70%;
  // max-width: 900px;
  margin: 70px auto;
}
.double {
  width: 80%;
  display: inline-flex;
  justify-content: center;
  margin-bottom: 70px;
}
.btn {
  border: 1px #3399dd solid;
  color: "primary";
  margin: 20px;
}
</style>
