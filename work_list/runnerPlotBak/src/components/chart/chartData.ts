/**
 * @name chartData.vue
 * @description 매개변수로 받은 데이터를 통해 실제 chartjs에서 사용할 수 있는 chart 데이터로 변환해준다.
 * @namespace typescript
 */

import { List, Controller } from "@/components/modules/dataDto.js";
import _ from "lodash";

// 그래프에 필요한 데이터 dto
interface dataSetDto {
  title: string;
  labels: string[];
  cov: object[];
  engineHash: string[];
  tag: string[];
  os: string[];
  cores: string[];
  strategy: string[];
}

interface barChartDto {
  lineCov: number[];
  branCov: number[];
  consumeTime: number[];
}

/**
 * 라인차트를 그리는 데이터를 만들어주는 함수
 * @param {List} dataList
 * @param {string} type
 * @returns type, data, options
 */
export default function lineChartData(dataList: List, type: string) {
  // value pasing
  const dataSet: dataSetDto = makeLineDatasets(dataList, type);

  return {
    type: "line",
    data: {
      labels: dataSet.labels, // 가로축 데이터
      datasets: dataSet.cov,
    },
    options: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      responsive: true,
      title: {
        display: true,
        text: dataSet.title,
      },
      //   onHover: function (evt) {
      //     // evt[0]
      //     console.log("hover 이벤트 확인하기", evt);
      //   },
      hover: {
        onHover: function (evt) {
          //   console.log("hover 이벤트 확인하기", evt[0]);
          if (evt[0]) {
            const index = evt[0]._index;
            console.log(evt[0]._model.label + ": " + evt[0]._chart.config.data.datasets[0].data[index]);
          }
        },
      },
      tooltips: {
        enabled: true,
        intersect: false, // 차트의 항목과 교차할 때만 띄울지
        mode: "x", // x축의 모든 항목을 보여주기위함
        callbacks: {
          // tootip의 value값 보여주는 형식 정의
          label: function (
            tooltipItems: { datasetIndex: number; yLabel: number },
            data: { datasets: { [x: string]: { label: string } } }
          ) {
            if (data.datasets[tooltipItems.datasetIndex].label === "consumeTime") {
              return data.datasets[tooltipItems.datasetIndex].label + ": " + setTime(tooltipItems.yLabel);
            } else if (data.datasets[tooltipItems.datasetIndex].label === "branchTotal") {
              return data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel;
            } else {
              // lineCoverage, branchCoverage
              return data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel.toFixed(2) + "%";
            }
          },
          afterLabel: function (tooltipItems: { datasetIndex: number; index: string | number }) {
            if (tooltipItems.datasetIndex + 1 == dataSet.cov.length) {
              let text =
                "version: " + dataSet.engineHash[tooltipItems.index] + "\n" + "tag: " + dataSet.tag[tooltipItems.index];

              if (dataSet.strategy[tooltipItems.index] != undefined) {
                text += "\nstrategy: " + dataSet.strategy[tooltipItems.index];
              }
              if (dataSet.os[tooltipItems.index] != undefined) {
                text += "\nos: " + dataSet.os[tooltipItems.index];
              }
              if (dataSet.cores[tooltipItems.index] != undefined) {
                text += "\ncores: " + dataSet.cores[tooltipItems.index];
              }
              return text;
            }
          },
        },
      },
      scales: {
        yAxes: [
          {
            id: "A",
            type: "linear",
            position: "left",
            ticks: {
              // y축 기준 데이터 변경
              beginAtZero: true,
              padding: 25,
              // min: 0, // y축 최소값
              max: 100, // y축 최대값
              stepSize: 10, // y축 간격
              callback: function (value: string) {
                return value + " %";
              },
            },
          },
          {
            id: "B",
            type: "linear",
            position: "right",
            gridLines: {
              display: false,
            },
            ticks: {
              stepSize: 500,
              callback: function (value: number) {
                return setTime(value);
              },
            },
          },
        ],
      },
    },
  };
}

/**
 * 시:분:초 를 sec로 바꿔주는 함수
 * @param {string} time "HH:MM:SS"
 * @returns 초로 계산한 number
 */
export function makeSec(time: string): number {
  if (_.isEmpty(time)) return 0;
  const timeArray = time.split(":");
  const hour = _.toInteger(timeArray[0]) * 3600;
  const min = _.toInteger(timeArray[1]) * 60;
  const sec = _.toInteger(timeArray[2]) * 1;
  // console.log("time: ", time, " hour: ", hour, " min: ", min, " sec: ", sec);
  return hour + min + sec;
}

/**
 * sec을 시:분:초 로 바꿔주는 함수
 * @param {number} seconds 초
 * @returns "HH:MM:SS" 형태의 string
 */
export function setTime(seconds: number) {
  let hour, min, sec;

  hour = parseInt(String(seconds / 3600));
  min = parseInt(String((seconds % 3600) / 60));
  sec = (seconds % 60).toFixed();

  if (hour.toString().length == 1) hour = "0" + hour;
  if (min.toString().length == 1) min = "0" + min;
  if (sec.toString().length == 1) sec = "0" + sec;

  return hour + ":" + min + ":" + sec;
}

/**
 * 서버에서 내려온 값으로 각 데이터 셋을 생성해주는 함수
 * @param {List} dataList
 * @param {string} type
 * @returns
 */
function makeLineDatasets(dataList: List, type: string): dataSetDto {
  const formatData = makeListFormat(dataList, type);
  let cov = [] as object[];

  const labels: string[] = [],
    lineCov: number[] = [],
    branchCov: number[] = [],
    pairCov: number[] = [],
    dateCov: number[] = [],
    engineHash: string[] = [],
    branchTotal: number[] = [],
    tag: string[] = [],
    os: string[] = [],
    cores: string[] = [],
    strategy: string[] = [],
    branchFlag = formatData.list.find(function (item) {
      return item.branchTotal !== 0;
    }),
    pairFlag = formatData.list.find(function (item) {
      return item.pairTotal !== 0;
    });

  formatData.list.forEach((item: Controller) => {
    const itemDate = new Date(item.testDate.replace(" ", "T"));
    labels.push(
      ("0" + (itemDate.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + itemDate.getDate()).slice(-2) +
        " " +
        ("0" + itemDate.getHours()).slice(-2) +
        ":" +
        ("0" + itemDate.getMinutes()).slice(-2)
    );
    lineCov.push(item.lineCoverage);
    engineHash.push(item.engineHash);
    tag.push(item.tag);
    os.push(item.os);
    cores.push(item.cores);
    strategy.push(item.strategy);
    // branch total이 없는 경우 브런치커버리지는 표시하지 않음 (하나라도 있는 경우 나머지를 number.nan으로 표시하지 않도록 함 branchFlag)
    item.branchTotal !== 0 ? branchCov.push(item.branchCoverage) : branchFlag ? branchCov.push(Number.NaN) : null;
    item.branchTotal !== 0 ? branchTotal.push(item.branchTotal) : branchFlag ? branchTotal.push(Number.NaN) : null;

    item.pairTotal !== 0 ? pairCov.push(item.pairCoverage) : pairFlag ? pairCov.push(Number.NaN) : null;

    // consumeTime이 있는 경우만 넣어주기
    item.consumeTime && dateCov.push(makeSec(item.consumeTime));
  });
  let maxCov = 0,
    hignIndex = 0;

  (branchCov ? branchCov : lineCov).forEach((item, i) => {
    if (maxCov <= item) {
      maxCov = item;
      hignIndex = i;
    }
  });

  cov = [
    {
      // 그래프별 범주
      label: "lineCoverage", // 차트 상단에 차트 이름
      yAxisID: "A",
      fill: false,
      backgroundColor: "rgba(95, 46, 229, 1)",
      borderColor: "rgb(95, 46, 229)",
      borderDash: [10, 0],
      pointStyle: "circle",
      pointHitRadius: 17,
      lineTension: 0, //선 곡선모양 0이면 직선
      datalabels: makeDataLabels("lineCoverage", hignIndex, formatData.list.length),
      // 실제 데이터. labels와 배열 순서가 맞아야 함. 빈곳은 0으로 보정이 필요
      data: lineCov, // 세로축 데이터
    },
  ];

  if (!_.isEmpty(branchCov)) {
    cov.push({
      label: "branchCoverage",
      yAxisID: "A",
      fill: false,
      backgroundColor: "rgba(55, 186, 0, 1)",
      borderColor: "rgb(55, 186, 0)",
      borderDash: [10, 0],
      pointStyle: "rect",
      pointHitRadius: 18,
      lineTension: 0, //선 곡선모양 0이면 직선
      datalabels: makeDataLabels("branchCoverage", hignIndex, formatData.list.length),
      data: branchCov,
    });
  }

  if (!_.isEmpty(pairCov)) {
    cov.push({
      label: "pairCoverage",
      yAxisID: "A",
      fill: false,
      backgroundColor: "rgba(217, 175, 0, 1)",
      borderColor: "rgb(217, 175, 26)",
      borderDash: [10, 0],
      pointStyle: "rect",
      pointHitRadius: 18,
      lineTension: 0, //선 곡선모양 0이면 직선
      datalabels: makeDataLabels("pairCoverage", hignIndex, formatData.list.length),
      data: pairCov,
    });
  }

  if (!_.isEmpty(dateCov)) {
    cov.push({
      label: "consumeTime",
      yAxisID: "B",
      fill: false,
      backgroundColor: "rgba(129, 120, 155, 1)",
      borderColor: "rgb(129, 120, 155)",
      borderDash: [10, 5],
      pointStyle: "triangle",
      pointHitRadius: 18,
      lineTension: 0, //선 곡선모양 0이면 직선
      datalabels: makeDataLabels("consumeTime", hignIndex, formatData.list.length),
      data: dateCov,
    });
  }

  if (!_.isEmpty(branchTotal)) {
    cov.push({
      label: "branchTotal",
      yAxisID: "B",
      fill: false,
      backgroundColor: "rgba(204, 111, 204, 1)",
      borderColor: "rgb(204, 111, 204)",
      borderDash: [3, 5],
      pointStyle: "star",
      pointHitRadius: 18,
      lineTension: 0, //선 곡선모양 0이면 직선
      datalabels: makeDataLabels("branchTotal", hignIndex, formatData.list.length),
      data: branchTotal,
    });
  }

  return {
    title: formatData.title,
    labels,
    cov,
    engineHash,
    tag,
    os,
    cores,
    strategy,
  };
}

/**
 * 가장 높은 커버리지와 가장 최근 커버리지에 값 라벨 표시(브랜치 우선)
 * @param {string} type consumeTime인지 coverage인지
 * @param {number} index 가장 마지막
 * @param {number} maxIndex 가장 최근
 * @returns chart에서 사용하는 format
 */
function makeDataLabels(type: string, index: number, maxIndex: number) {
  return {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "rgba(128, 128, 128, 0.7)",
    borderRadius: 4,
    borderWidth: 1,
    align: "top",
    font: {
      weight: "bold",
    },
    formatter: function (value) {
      if (type == "consumeTime") {
        return setTime(value);
      }
      if (type == "branchTotal") {
        return value;
      }
      // line, branch cov는 소숫점 두자리와 %처리
      return value.toFixed(2) + "%";
    },
    color: "black",
    textAlign: "center",
    display: function (context) {
      return context.dataIndex == index ? true : context.dataIndex == maxIndex - 1 ? true : false;
    },
  };
}

//-------------------------------------------------------------------------------------------------------------------------------

/**
 * 막대차트를 그리는 데이터를 만들어주는 함수
 * @param {List[]} dataList
 * @param {string} type
 * @param {string} cov
 * @returns
 */
export function barChartData(dataList: List[], type: string, cov: string) {
  let chartType: string;
  cov == "line" ? (chartType = "lineCov") : cov == "branch" ? (chartType = "branCov") : (chartType = "consumeTime");

  const barDatasets = makeBarDatasets(dataList);

  return {
    type: "horizontalBar",
    data: {
      labels: barDatasets.chartIds,
      datasets: [
        {
          axis: "y",
          label: "",
          data: [],
          fill: false,
          // backgroundColor: "rgba(255, 99, 132, 0.2)",
          // borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
        {
          axis: "y",
          label: "3 전꺼",
          data: barDatasets.third[chartType],
          fill: false,
          backgroundColor: "rgba(201, 203, 207, 0.2)",
          borderColor: "rgb(201, 203, 207)",
          borderWidth: 1,
        },
        {
          axis: "y",
          label: "2 전꺼",
          data: barDatasets.second[chartType],
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
        {
          axis: "y",
          label: "최근",
          data: barDatasets.first[chartType],
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
        {
          axis: "y",
          label: "",
          data: [],
          fill: false,
          // backgroundColor: "rgba(255, 99, 132, 0.2)",
          // borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      title: {
        display: true,
        text: chartType,
      },
      tooltips: {
        intersect: false, // 차트의 항목과 교차할 때만 띄울지
        callbacks: {
          // tootip의 value값 보여주는 형식 정의
          label: function (tooltipItems: { xLabel: number }) {
            // consumeTime은 시분초로 변환
            if (cov == "consumeTime") {
              return setTime(tooltipItems.xLabel);
            }
            // line, branch cov는 소숫점 두자리와 %처리
            return tooltipItems.xLabel.toFixed(2) + "%";
          },
        },
      },
      indexAxis: "y",
      maintainAspectRatio: false,
      reponsive: true,
      scales: {
        xAxes: [
          {
            type: "linear",
            ticks: {
              callback: function (value: number) {
                // consumeTime은 시분초로 변환
                if (cov == "consumeTime") {
                  return setTime(value);
                }
                // line, branch cov는 소숫점 두자리와 %처리
                return value + " %";
              },
            },
          },
        ],
      },
    },
  };
}

/**
 * 막대차트 데이터 만들어주는 함수
 * @param {List[]} dataList
 * @returns
 */
function makeBarDatasets(dataList: List[]) {
  const chartIds: string[] = [];
  let temp: Controller;
  const first: barChartDto = {
      lineCov: [],
      branCov: [],
      consumeTime: [],
    },
    second: barChartDto = {
      lineCov: [],
      branCov: [],
      consumeTime: [],
    },
    third: barChartDto = {
      lineCov: [],
      branCov: [],
      consumeTime: [],
    };

  dataList.forEach((item1) => {
    // id
    chartIds.push(item1.projectName);

    // 가장 최근 커버리지
    temp = item1.projectResults[item1.projectResults.length - 1];
    first.lineCov.push(_.get(temp, "lineCoverage"));
    first.branCov.push(_.get(temp, "branchCoverage"));
    first.consumeTime.push(makeSec(_.get(temp, "consumeTime")));

    // 두 번째 커버리지
    temp = item1.projectResults[item1.projectResults.length - 2];
    second.lineCov.push(_.get(temp, "lineCoverage"));
    second.branCov.push(_.get(temp, "branchCoverage"));
    second.consumeTime.push(makeSec(_.get(temp, "consumeTime")));

    // 세 번째 커버리지
    temp = item1.projectResults[item1.projectResults.length - 3];
    third.lineCov.push(_.get(temp, "lineCoverage"));
    third.branCov.push(_.get(temp, "branchCoverage"));
    third.consumeTime.push(makeSec(_.get(temp, "consumeTime")));
  });

  return { chartIds, first, second, third };
}

/**
 * list와 title
 * @param {List} dataList
 * @param {string} type
 * @returns title, list
 */
function makeListFormat(dataList: List, type: string) {
  if (type == "file") {
    return {
      title: dataList.fileLocation,
      list: dataList.runnerFileResults,
    };
  } else if (type == "unit") {
    return {
      title: dataList.unitName,
      list: dataList.runnerUnitResults,
    };
  } else {
    return {
      title: dataList.projectName,
      list: dataList.projectResults,
    };
  }
}
