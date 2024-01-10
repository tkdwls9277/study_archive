/**
 * @name gridData.vue
 * @description runner_plot을 그려준다
 * @namespace typescript
 */
import _ from "lodash";
import { List, Controller } from "@/components/modules/dataDto.js";

/**
 * @description v-data-table (안씀)
 * @param {List} dataList dataDto.vue에 정의된 서버에서 받은 값
 * @param {string} type project, file, unit
 * @returns
 */
export function gridTableData(dataList: List, type: string) {
  const dataSet = gridData(dataList, type);
  const headers = [
    {
      text: dataSet.title,
      align: "left",
      sortable: false,
      value: "name",
    },
    { text: "버전", value: "engineHash" },
  ];
  if (!_.isEmpty(type)) {
    headers.push({ text: "legacy", value: "legacy" });
  }

  return {
    headers: headers,
    desserts: dataSet.desserts,
  };
}

/**
 * @description v-simple-table
 * @description 서버에서 내려온 값으로 각 데이터 셋을 생성해주는 함수
 * @param {List} dataList dataDto.vue에 정의된 서버에서 받은 값
 * @param {string} type project, file, unit
 * @returns
 */
export default function gridData(dataList: List, type: string) {
  // list와 title
  const list = makeListFormat(dataList, type);

  const desserts: { name: string; originDate: any; engineHash: string; legacy: string; tag: string }[] = [];
  list.forEach((item: Controller) => {
    const itemDate: Date = new Date(item.testDate.replace(" ", "T"));
    const month: string = (itemDate.getMonth() > 10 ? "0" : "") + (itemDate.getMonth() + 1);
    const day: string = (itemDate.getDate() > 10 ? "0" : "") + (itemDate.getDate() + 1);
    desserts.push({
      name:
        ("0" + (itemDate.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + itemDate.getDate()).slice(-2) +
        " " +
        ("0" + itemDate.getHours()).slice(-2) +
        ":" +
        ("0" + itemDate.getMinutes()).slice(-2),
      originDate: item.testDate,
      engineHash: item.engineHash,
      legacy: item.legacy ? "true" : "",
      tag: item.tag,
    });
  });

  return {
    title: dataList.projectName,
    desserts: desserts.reverse(),
  };
}

/**
 * @description v-simple-table left
 * @param {List} dataList
 * @param {string} type
 * @returns
 */
export function leftGridData(dataList: List, type: string) {
  const list = _.cloneDeep(makeListFormat(dataList, type)).reverse();
  const leftGridItems = [
    {
      name: "branch(exe/total)",
      contents: (list[0].branchCount + " / " + list[0].branchTotal) as string | number | undefined,
    },
    {
      name: "line(exe/total)",
      contents: list[0].lineCount + " / " + list[0].lineTotal,
    },
  ];
  if (type == "project")
    leftGridItems.push(
      {
        name: "failed prebuild",
        contents: dataList.prebuildError,
      },
      {
        name: "failed build",
        contents: dataList.buildError,
      },
      {
        name: "total file",
        contents: dataList.filesCount,
      },
      {
        name: "empty file",
        contents: dataList.emptyFile,
      }
    );

  return leftGridItems;
}

function makeListFormat(dataList: List, type: string) {
  if (type == "project") {
    return dataList.projectResults as Controller[];
  } else if (type == "file") {
    return dataList.runnerFileResults as Controller[];
  } else {
    return dataList.runnerUnitResults as Controller[];
  }
}
// export function makeSimpleDatasets(dataList: List, type: string): any {
//     // list와 title
//     let list = null;
//     if (type == "project") {
//         list = dataList.projectResults;
//     } else if (type == "file") {
//         list = dataList.runnerFileResults;
//     } else {
//         list = dataList.runnerUnitResults;
//     }

//     const name: any[] = [];
//     const engineHash: string[] = [];
//     const legacy: boolean[] = [];

//     list.forEach((item: Controller) => {
//         name.push(item.testDate);
//         engineHash.push(item.engineHash);
//         legacy.push(item.legacy);
//         // desserts.push({
//         //     name: item.testDate,
//         //     engineHash: item.engineHash,
//         //     legacy: item.legacy,
//         // });
//     });
//     return {
//         name,
//         engineHash,
//         legacy,
//     };
// }
