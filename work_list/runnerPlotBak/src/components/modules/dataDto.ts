/**
 * @name dataDto.vue
 * @description 서버와 통신할 dto와 공통적으로 사용할 dto를 정리해놓은 파일
 * @namespace typescript
 */

export interface Runner {
    totalPageSize: number; // 페이지의 전체 크기
    contents: List[]; // 검색된 element list
    sortCoverageType?: string; // 정렬을 떨어진 라인커버리지로 할것인지, 브랜치 커버리지로 할것인지에 대한 여부
}

export interface List {
    fileLocation: string; // 검색된 함수의 파일 경로
    projectName: string; // 검색된 함수의 프로젝트 이름
    unitName: string; // 검색된 함수 이름
    projectResults: Controller[]; // 검색된 프로젝트의 결과 리스트
    runnerFileResults: Controller[]; // 검색된 파일의 결과 리스트
    runnerUnitResults: Controller[]; // 검색된 함수의 결과 리스트
    prebuildError?: number; // 전빌드에서 에러난 갯수
    buildError?: number; // 빌드에서 에러난 갯수
    filesCount?: number; // 총 파일 갯수
    emptyFile?: number; // 비어있는 파일 갯수
}

export interface Controller {
    id: number; // 검색된 결과의 ID
    unitName: string; // 검색된 함수 이름
    fileLocation: string; // 검색된 함수의 파일 경로
    projectName: string; // 검색된 함수의 프로젝트 이름
    lineTotal: number; // c/c++ 코드 상에서 실행 될 수 있는 전체 라인 수
    lineCount: number; // c/c++ 코드 상에서 실행 한 전체 라인 수
    lineCoverage: number; // c/c++ 코드 상에서 실행된 라인 커버리지 ((line_count / line_total) * 100)
    branchTotal: number; // c/c++ 코드 상에서 실행 될 수 있는 전체 분기 수
    branchCount: number; // c/c++ 코드 상에서 실행 한 전체 분기 수
    branchCoverage: number; // c/c++ 코드 상에서 실행된 분기 커버리지 ((branch_count / branch_total) * 100)
    fileStatus: number; // 해당 파일의 테스트 된 status. 0 : 초기 상태. 끝자리가 3인경우 성공. 2인경우 실패.
    testDate: any; // 테스트된 날짜
    consumeTime: string; // 테스트 하는데 전체 소요된 시간
    engineHash: string; // 테스트 엔진의 git hash 값
    legacy: boolean; // highland 인지 옛날 버전인지
    tag: string; // 어떤 젠킨스 프로젝트로 돌렸는지

    diffPreviousBranchCoverage?: number; // 이전 테스트 결과와의 브랜치 커버리지 차이
    diffPreviousLineCoverage?: number; // 이전 테스트 결과와의 라인커버리지 차이
}

/**
 * @description 검색 시 필요한 파라미터들
 */
export interface axiosData {
    type: string;
    projectName: string;
    fileLocation: string;
    pageNum: number;
    serverPort: string;
}

export interface deleteAxiosData {
    projectName: string;
    consumeTime: string;
    engineHash: string;
    tag: string;
    serverPort: string;
}

export interface searchData {
    id: string;
    lineCov: string[];
    branchCov: string[];
    lineCompareNum?: string;
    branchCompareNum?: string;
    viewGraph: string;
    checkboxOption: searchCheckOption[];
    tag: string;
}

interface searchCheckOption {
    label: string;
    id: string;
    enabled: boolean;
}

/**
 * @description grid hover를 통해 chart에 표시해주기 위한 파라미터
 */
export interface hoverGrid {
    chartIndex: number; // 몇 번째 차트인지
    dotIndex: number; // 현재 차트의 몇 번째 점인지
    flag: boolean; // 그리드에 마우스가 올라갔는지 아닌지
}

export interface listitems {
    name: string;
    coverage: string;
    // lineCov: string;
    diffCoverage: string;
    // diffLineCov: string;
    // 인덱스 시그니처(index Signature)
    [key: string]: string | boolean;
}
