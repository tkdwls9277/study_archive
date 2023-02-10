<template>
    <div></div>
</template>

<script lang="ts">
/**
 * @name drawChart.vue
 * @description 실질적으로 chart를 그려주는 컴포넌트
 * @namespace typescript
 */

import Vue from "vue";
import Chart from "chart.js";
import chartData, { barChartData } from "@/components/chart/chartData";
import ChartDataLabels from "chartjs-plugin-datalabels";
import _ from "lodash";
import { hoverGrid } from "@/components/modules/dataDto";

// map으로 손실없이 저장
let chart = new Map<number, Chart>();
Chart.plugins.register(ChartDataLabels);

export default Vue.extend({
    props: ["chartId", "dataList", "type", "cov", "index"],
    methods: {
        beforeCreateChart() {
            if (!_.isEmpty(this.$route.name)) {
                this.createChart(chartData(this.dataList, this.type));
            } else {
                this.createChart(barChartData(this.dataList, this.type, this.cov));
            }
        },
        createChart(dataList: { type: string; data: object; options: object }): void {
            const ctx: any = document.getElementById(this.chartId);

            chart.set(
                this.index,
                new Chart(ctx, {
                    type: dataList.type,
                    data: dataList.data,
                    options: dataList.options,
                })
            );

            // chart.destroy();
        },
    },

    async mounted() {
        this.$nextTick(function () {
            this.beforeCreateChart();
        });
    },
});

/**
 * @description grid hover를 통해 chart에 표시해주기 위한 함수
 * @param {hoverGrid} item
 */
export function hoverChart(item: hoverGrid) {
    const chartIns = chart.get(item.chartIndex) as Chart;

    if (item.flag === true) {
        if (chartIns && chartIns.options) {
            chartIns.options.elements = {
                point: {
                    radius: function (context): number {
                        let index = context.dataIndex;
                        return index == item.dotIndex ? 10 : 3;
                    },
                },
            };
        }
    } else {
        if (chartIns && chartIns.options) {
            chartIns.options.elements = {
                point: {
                    radius: 3,
                },
            };
        }
    }

    chartIns.update();
}
</script>
