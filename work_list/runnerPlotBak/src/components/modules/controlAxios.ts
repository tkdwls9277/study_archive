/**
 * @name controlAxios.vue
 * @description axios와 관련된 기능이 모여있는 모듈
 * @namespace typescript
 */

import axios from "axios";
import { axiosData, deleteAxiosData } from "@/components/modules/dataDto";

/**
 * 서버에서 전체적인 데이터를 가져오는 함수
 * @param {axiosData} axiosData dataDto.vue에 정의된 REST API 파라미터
 * @returns
 */
export default async function getData(axiosData: axiosData) {
  const serverPort = axiosData.serverPort || getApiUrl();
  return await axios
    .get("http://10.0.1.60:" + serverPort + "/api/v1/plot/" + getUrl(axiosData.type), {
      params: {
        projectName: axiosData.projectName,
        fileLocation: axiosData.fileLocation,
        page: axiosData.pageNum,
        size: 99999, // 차트 동적 생성에 따라 거의 전체를 들고 오도록.
        limit: 20,
      },
    })
    .then((res) => {
      console.log("axios url: ", res.config.url, " ,axios data: ", res.data);
      return res.data;
    })
    .catch((ex) => {
      console.warn("error:", ex);
    });
}

/**
 * 서버에서 name 데이터들만 가져오는 함수 (사용안함)
 * @param {axiosData} axiosData dataDto.vue에 정의된 REST API 파라미터
 * @returns
 */
export async function getListData(axiosData: axiosData) {
  if (!axiosData.type) axiosData.type = "project";

  return await axios
    .get("http://10.0.1.60:" + getApiUrl() + "/api/v1/plot/" + axiosData.type + "/names", {
      params: {
        projectName: axiosData.projectName,
        fileLocation: axiosData.fileLocation,
      },
    })
    .then((res) => {
      console.log("axios url: ", res.config.url, " ,axios data: ", res.data);
      return res.data;
    })
    .catch((ex) => {
      console.warn("error:", ex);
    });
}

export function getUrl(type: string) {
  if (type == "") return "all_project";
  else return type;
}

// TODO: json 파일로 빼서 URL주소 지정하기
function getApiUrl() {
  return "12348"; // TODO: 지우기
  if (~window.location.href.indexOf("12347")) {
    return "12348";
  } else {
    return "12345";
  }
}

export async function deleteData(deleteAxiosData: deleteAxiosData) {
  const serverPort = deleteAxiosData.serverPort || getApiUrl();
  return await axios
    .get("http://10.0.1.60:12348/api/v1/plot/delete", {
      params: {
        projectName: deleteAxiosData.projectName,
        consumeTime: deleteAxiosData.consumeTime,
        engineHash: deleteAxiosData.engineHash,
        tag: deleteAxiosData.tag,
      },
    })
    .then((res) => {
      console.log("axios url: ", res.config.url, " ,axios data: ", res.data);
      return res.data;
    })
    .catch((ex) => {
      console.warn("error:", ex);
    });
}
