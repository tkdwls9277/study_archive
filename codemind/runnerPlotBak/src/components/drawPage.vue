<template>
    <div class="item">
        <rootIndex :type="types" :projectName="projectName" :fileLocation="fileLocation" />
        <div id="chartApp" class="small">
            <search-chart @change="change" />
            <!-- dataList 배열의 수에 따라 반복적으로 그려주는 구문 -->
            <div v-if="(response.contents && response.contents.length) != 0">
                <div v-for="(item, i) in response.contents" :key="i" class="double">
                    <!-- left -->
                    <drawLeftGrid :data-list="item" :type="types" />
                    <!-- chart-->
                    <canvas v-bind:id="'planet-chart' + i" :style="getStyle(item)">
                        <draw-chart :data-list="item" :chart-id="'planet-chart' + i" :type="types" :index="i" />
                    </canvas>
                    <!-- grid -->
                    <draw-grid :data-list="item" :type="types" style="margin-left: 10px" @selectItem="selectItem" :index="i" />
                    <!-- next button -->
                    <v-btn class="btn" dark height="inherit" v-if="types != 'unit'" @click="next(item)">
                        <v-icon large>mdi-chevron-right </v-icon>
                    </v-btn>
                </div>
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
        };
    },
    created() {
        this.getDataFromApi();
    },
    methods: {
        // 처음 진입 시 api를 호출하는 module. addDataFromApi로 전체 데이터를 순차적으로 그려준다.
        async getDataFromApi() {
            // const aaa = await getFileList({ type: this.types, projectName: this.projectName, fileLocation: this.fileLocation, pageNum: this.pageNum });
            this.response = await controlAxios({ type: this.types, projectName: this.projectName, fileLocation: this.fileLocation, pageNum: this.pageNum });
            this.pageNum = 0;

            // 서버에서 값을 못받을 때 에러처리
            // FIXME: 서버에서 받은 상태로 판단하기
            if (_.isEmpty(this.response)) {
                console.warn("서버와 통신이 되지 않습니다.");
                this.response = await controlAxios({ type: this.types, projectName: this.projectName, fileLocation: this.fileLocation, pageNum: this.pageNum });
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
        },

        // 다음 페이지의 데이터를 가져와 밑에 추가하는 module
        async addDataFromApi() {
            this.pageNum += 1;

            const nextData: Runner = await controlAxios({
                type: this.types,
                projectName: this.projectName,
                fileLocation: this.fileLocation,
                pageNum: this.pageNum,
            });

            setTimeout(() => {
                this.response.contents.push(...nextData.contents);
                // console.log("nextData: ", nextData, "contents: ", this.response.contents);
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

            this.$router.push({ name: name, query: { type: name, projectName: contents.projectName, fileLocation: contents.fileLocation } });
        },

        // TODO: 검색 기준 한번 더 정립
        // 필터검색을 한 경우
        async change(value: searchData) {
            // responese buffer 비워주기
            if (this.allResponse.totalPageSize == 0) this.allResponse = this.response;
            this.response = {
                totalPageSize: 0,
                contents: [],
            };

            // 아무 검색값이 없는 경우
            if (!_.get(value.branchCov, "length") && !_.get(value.lineCov, "length") && !value.compareNum && !value.id) {
                setTimeout(() => {
                    if (this.allResponse) {
                        this.response = this.allResponse;
                    }
                }, 1000);
                return;
            }

            setTimeout(() => {
                // 검색어 입력
                if (value.id) {
                    this.response = {
                        totalPageSize: this.allResponse.totalPageSize,
                        contents:
                            this.allResponse.contents.filter((item) => {
                                if (this.types == "project") {
                                    return item.projectName.toUpperCase().includes(value.id.toUpperCase());
                                } else if (this.types == "file") {
                                    return item.fileLocation.toUpperCase().includes(value.id.toUpperCase());
                                } else {
                                    return item.unitName.toUpperCase().includes(value.id.toUpperCase());
                                }
                            }) || [],
                    };
                }

                // 라인 커버리지
                if (_.get(value.lineCov, "length") > 0) {
                    // const compareNum = Number(value.compareNum) || 3;
                    const targetData = value.id ? this.response.contents : this.allResponse.contents;

                    this.response = {
                        totalPageSize: this.allResponse.totalPageSize,
                        contents:
                            targetData.filter((item) => {
                                if (this.types == "project") {
                                    return compareCov(item.projectResults[item.projectResults.length - 1], "line");
                                } else if (this.types == "file") {
                                    return compareCov(item.runnerFileResults[item.runnerFileResults.length - 1], "line");
                                } else {
                                    return compareCov(item.runnerUnitResults[item.runnerUnitResults.length - 1], "line");
                                }
                            }) || [],
                    };
                }

                // 브랜치 커버리지
                if (_.get(value.branchCov, "length") > 0) {
                    const targetData = value.id || _.get(value.lineCov, "length") > 0 ? this.response.contents : this.allResponse.contents;

                    this.response = {
                        totalPageSize: this.allResponse.totalPageSize,
                        contents:
                            targetData.filter((item) => {
                                if (this.types == "project") {
                                    return compareCov(item.projectResults[item.projectResults.length - 1], "branch");
                                } else if (this.types == "file") {
                                    return compareCov(item.runnerFileResults[item.runnerFileResults.length - 1], "branch");
                                } else {
                                    return compareCov(item.runnerUnitResults[item.runnerUnitResults.length - 1], "branch");
                                }
                            }) || [],
                    };
                }
            }, 1000);

            // 라인, 브랜치 커버리지가 오름인지 같음인지 내림인지 필터링해주는 함수
            function compareCov(resultList: Controller, compareType: string) {
                const compareNum = Number(value.compareNum);

                if (compareType == "line") {
                    const diffCov = Number((resultList.diffPreviousLineCoverage as number).toFixed(2));
                    if (~value.lineCov.indexOf("U")) {
                        if (diffCov > compareNum) return true;
                    }
                    if (~value.lineCov.indexOf("S")) {
                        if (diffCov == compareNum) return true;
                    }
                    if (~value.lineCov.indexOf("D")) {
                        if (diffCov < compareNum) return true;
                    }
                    return false;
                } else {
                    const diffCov = Number((resultList.diffPreviousBranchCoverage as number).toFixed(2));
                    if (~value.branchCov.indexOf("U")) {
                        if (diffCov > compareNum) return true;
                    }
                    if (~value.branchCov.indexOf("S")) {
                        if (diffCov == compareNum) return true;
                    }
                    if (~value.branchCov.indexOf("D")) {
                        if (diffCov < compareNum) return true;
                    }
                    return false;
                }
            }
        },

        selectItem(item: hoverGrid) {
            hoverChart(item);
        },

        // -1퍼 이상 떨어지면 빨간색 배경으로 표시
        getStyle(item: List) {
            let itemList = this.makeListFormat(item);
            if (
                itemList.runnerResults[itemList.runnerResults.length - 1].branchCoverage -
                    _.get(itemList.runnerResults[itemList.runnerResults.length - 2], "branchCoverage") <
                -1
            ) {
                return "background-color: rgba(251, 85, 85, 0.4)";
            }
            return "";
        },

        // List에서 type에 따라 controller를 반환
        makeListFormat(item: List) {
            let runnerResults: Controller[];
            let runnerName: string;
            if (this.type == "file") {
                runnerResults = item.runnerFileResults;
                runnerName = runnerResults[runnerResults.length - 1].fileLocation;
            } else if (this.type == "unit") {
                runnerResults = item.runnerUnitResults;
                runnerName = runnerResults[runnerResults.length - 1].unitName;
            } else {
                runnerResults = item.projectResults;
                runnerName = runnerResults[runnerResults.length - 1].projectName;
            }
            return { runnerResults, runnerName };
        },
    },
    watch: {
        response: {
            deep: true,
            handler: function (newResponse: Runner) {
                let listData = [] as listitems[];

                newResponse.contents.forEach((item: List) => {
                    // let runnerResults: Controller[];
                    // let runnerName: string;

                    // if (this.type == "file") {
                    //     runnerResults = item.runnerFileResults;
                    //     runnerName = runnerResults[runnerResults.length - 1].fileLocation;
                    // } else if (this.type == "unit") {
                    //     runnerResults = item.runnerUnitResults;
                    //     runnerName = runnerResults[runnerResults.length - 1].unitName;
                    // } else {
                    //     runnerResults = item.projectResults;
                    //     runnerName = runnerResults[runnerResults.length - 1].projectName;
                    // }

                    let itemList = this.makeListFormat(item);

                    // branch coverage 우선, branch coverage가 없는 경우 line coverage로 대체
                    let curController = itemList.runnerResults[itemList.runnerResults.length - 1];
                    let preController = itemList.runnerResults[itemList.runnerResults.length - 2];
                    listData.push({
                        name: itemList.runnerName,
                        coverage: curController.branchTotal !== 0 ? curController.branchCoverage.toFixed(2) : "[L]" + curController.lineCoverage.toFixed(2),

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

<style lang="scss">
.small {
    max-width: 900px;
    margin: 70px auto;
}
.double {
    display: flex;
    justify-content: center;
    margin-bottom: 70px;
}
.btn {
    border: 1px #3399dd solid;
    color: "primary";
    margin: 20px;
}
</style>
