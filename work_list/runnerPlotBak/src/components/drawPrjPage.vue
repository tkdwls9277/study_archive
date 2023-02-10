<template>
    <div class="item small">
        <v-container>
            <v-row justify="space-between" style="text-align: left">
                <v-col>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <h2 class="mb-3">평균 라인 커버리지: {{ aveLineCov }}%</h2>
                        <h2 class="mb-3">평균 브랜치 커버리지: {{ aveBranCov }}%</h2>
                    </v-form>
                </v-col>
                <v-col>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <h2>전체 소요시간: {{ totalTime }}</h2>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>

        <div id="chartApp" class="small">
            <!-- lineCov -->
            <div class="double">
                <canvas v-bind:id="'planet-chart'" v-if="response.length !== 0" :style="`position: relative; height: ${response.length * 35}px;`">
                    <draw-chart :data-list="response" :chart-id="'planet-chart'" :type="$route.name" :cov="'line'" />
                </canvas>
                <div v-else>No Data</div>
            </div>

            <!-- branchCov -->
            <div class="double">
                <canvas v-bind:id="'planet-chart1'" v-if="response.length !== 0" :style="`position: relative; height: ${response.length * 35}px`">
                    <draw-chart :data-list="response" :chart-id="'planet-chart1'" :type="$route.name" :cov="'branch'" />
                </canvas>
                <div v-else>No Data</div>
            </div>

            <!-- consumeTime -->
            <div class="double">
                <canvas v-bind:id="'planet-chart2'" v-if="response.length !== 0" :style="`position: relative; height: ${response.length * 35}px`">
                    <draw-chart :data-list="response" :chart-id="'planet-chart2'" :type="$route.name" :cov="'consumeTime'" />
                </canvas>
                <div v-else>No Data</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * drawPage.vue
 * @description
 * @namespace Vue
 */
import drawChart from "@/components/chart/drawChart.vue";
import { makeSec, setTime } from "@/components/chart/chartData";
import controlAxios from "@/components/modules/controlAxios";
import { List } from "@/components/modules/dataDto";
import _ from "lodash";
import Vue from "vue";

export default Vue.extend({
    name: "drawPage",
    components: { drawChart },
    props: {
        type: {
            type: String,
            default: "",
        },
    },
    data() {
        const run: List[] = [];
        return {
            types: (this.$route.name as string) || ("" as string),
            response: run,
            projectName: (this.$route.query.projectName as string) || ("" as string),
            fileLocation: (this.$route.query.fileLocation as string) || ("" as string),
            aveLineCov: "",
            aveBranCov: "",
            totalTime: "",
        };
    },
    created() {
        this.getDataFromApi();
    },
    methods: {
        // 처음 진입 시 api를 호출하는 module. addDataFromApi로 전체 데이터를 순차적으로 그려준다.
        async getDataFromApi() {
            this.response = await controlAxios({ type: this.types, projectName: this.projectName, fileLocation: this.fileLocation, pageNum: 0 });

            // 서버에서 값을 못받을 때 에러처리
            if (_.isEmpty(this.response)) {
                console.warn("서버와 통신이 되지 않습니다.");
                this.response = await controlAxios({ type: this.types, projectName: this.projectName, fileLocation: this.fileLocation, pageNum: 0 });
                if (_.isEmpty(this.response)) {
                    alert("서버와 통신이 되지 않습니다.");
                }
                return;
            }
        },

        // 다음 페이지로 넘기는 action
        next() {
            this.$router.push({ name: "project", query: { type: "project", projectName: "", fileLocation: "" } });
        },
    },
    watch: {
        response: function (newRes: List[]) {
            let totalLine = 0,
                totalBran = 0,
                totalTime = 0;
            const totalProject = newRes.length;
            // newRes.projectResults.forEach(function (item) {});
            for (let i = 0; i < totalProject; i++) {
                totalLine += newRes[i].projectResults[newRes[i].projectResults.length - 1].lineCoverage;
                totalBran += newRes[i].projectResults[newRes[i].projectResults.length - 1].branchCoverage;
                totalTime += makeSec(newRes[i].projectResults[newRes[i].projectResults.length - 1].consumeTime);
            }
            this.aveLineCov = (totalLine / totalProject).toFixed(2);
            this.aveBranCov = (totalBran / totalProject).toFixed(2);
            this.totalTime = setTime(totalTime);
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
