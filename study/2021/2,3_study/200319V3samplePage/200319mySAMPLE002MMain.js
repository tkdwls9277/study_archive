/***********************************************************************************
1. Create Date : yyyy.mm.dd
2. Creator     : Hong gil dong
3. Description : sample list
4. Precaution  :
5. History     : 
6. MenuPath    : 
7. Old File    :
9. Etc         :
***********************************************************************************/
sangjin.page.factory("sangjin.page.common", "ESD006M", {
    init: function () {
        this._super.init.apply(this, arguments);
    },

    render: function () {
        this._super.render.apply(this, arguments);
    },

    initProperties: function () {
        this.pageInfo = {
            title: "Sample List",
            pageHeader: [
                {
                    group: "header", id: "header",
                    settingInfo: {
                        bookmark: false
                    },
                    child: [
                        { unit: "widget", type: "outputTitle" },
                        { unit: "widget", type: "quickSearch" },
                        {
                            group: "tabContents", type: "searchForm", id: "searchForm",
                            settingInfo: {
                                isInitShowSearchTab: false,	//초기검색탭노출여부
                                isSerializeAllUse: false,	//체크박스 전체항목 데이터 포함여부 //TODO hhy 기본이 true일거 같은데 공통은 확인...
                                isOnSync: true,             //검색탭 동기화여부
                            },
                        },
                        {
                            group: "toolbar", id: "headerToolbar", sortType: "output-common-header",
                            child: [
                                { unit: "widget", type: "search" }, 
                                { unit: "widget", type: "rewrite" },
                            ],
                        }
                    ]
                }
            ],
            pageContents: [
                {
                    group: "contents", type: "output", id: "contents",
                    functions: [
                        { function: "setOutputLayout" }
                    ],
                    child: [
                        {
                            group: "grid", type: "form", id: "gridForm",
                            settingInfo: {
                                keyColumn: ["CODE"],
                                renderType: "columnFix",
                                field: [
                                    { id: "CODE", key: "code" },
                                    { id: "USE_YN", key: "useYn" }
                                ]
                            },
                            functions: [
                                { function: "gridSearch" },//그리드 검색
                                { function: "gridColumns" },//그리드 컬럼
                                { function: "gridCustomRowCell" },//그리드 customRowCell
                                { function: "gridDimension" },//그리드 dimension
                                { function: "gridPaging" },//그리드 페이징
                                {
                                    function: "callSearchApi", type: "grid",//검색 데이터 조회
                                    settingInfo: {
                                        api: "/SVC/Basic/Sample/GetListSampleData",
                                    }
                                },
                                {
                                    function: "gridStyle",//그리드 스타일
                                    settingInfo: {
                                        isHeaderFix: true,//그리드 상단 틀고정 여부
                                        isColumnFixHeader: true,//컬럼헤더 틀고정 사용여부
                                        setRowBackgroundColor: function (rowItem) {
                                            if (rowItem.USE_YN == "0") {
                                                return "danger"
                                            }
                                        }.bind(this)
                                    }
                                },
                                {
                                    function: "gridShade",//그리드 음영
                                    settingInfo: {
                                        hasGroupShaded: false,//그룹 음영여부
                                        shaded: ["CODE"],//음영컬럼
                                    }
                                },
                            ]
                        }
                    ]
                }
            ],
            pageFooter: [
                {
                    group: "footer", id: "footer",
                    child: [
                        {
                            group: "toolbar", id: "toolbarFooter", sortType: "output-common-footer",
                            child: [
                                { unit: "widget", type: "new", }, 
                            ]
                        }
                    ]
                },
            ],
            pageFunction: [
                { function: "reloadPage" },//페이지 reload
                {
                    function: "searchManager",//검색 Manager
                    settingInfo: {
                        isFirstLoadSearch: true,//처음 로딩시 검색여부
                        defaultSearchParam: {//기본 검색 파라미터
                            CODE: "",
                            CODE_NAME: "",
                            REMARKS: "",
                            USE_YN: ""
                        },
                    }
                },
                { function: "outputFormManager" },//출력양식 Manager
            ]
        }
    },

    // 캐시 바라보지 않게끔 재정의
    onInitFunctionOutputFormManager: function () {
        return {
            isOverriding: true,
            init: function () {

                eccomposite_v1.function.prototype.init.apply(this, arguments);

                //form type
                this._formType = this.pageOption.outputFormType;

                //form seq
                this._formSeq = 1

                //다음 검색 form type
                this._nextSearchFormType = this._formType;

                sangjin.page.list.prototype.STORAGE = [];
                //출력 양식 (일단 단일 양식으로)
                sangjin.page.list.prototype.STORAGE = this.viewBag.FormInfos[this._formType];

                this._outputForm = sangjin.page.list.prototype.STORAGE;

            }
        }
    },

    onInitUnitWidgetChkUseYn: function () {
        return {
            onInitControl: function (cid, control) {
                control
                    .label([sangjin.resource.LBL02475, sangjin.resource.LBL01448, sangjin.resource.LBL01450])
                    .value(['', '1', '0'])
                    .select('')
            },

            onSetSearchParam: function (option) {
                this.pageOption.asyncApiStep.add({
                    fn: function () {
                        option.searchParam.USE_YN = this.getLayout("header").getControl(this.realId).getValue();

                        this.pageOption.asyncApiStep.next();

                    }.bind(this)
                })
            }
        }
    },

    onInitUnitGridCellCode: function () {
        return {
            init: function () {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);

                this.bindGridEvent(this.realId);
            },

            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },

            setColumnCustomCell: function (columnMap, settingInfo, searchParam, value, cell, control, column, rowItem, rowItemIndex) {
                control.define("widget.gridCell.link")
                    .label(value);
            },

            onGridTbodyLinkClick: function (e) {
                e.event && e.event.preventDefault();
                sangjin.page.list.prototype.STORAGE.CODE=e.rowItem.CODE;
                sangjin.page.list.prototype.STORAGE.CODE_NAME=e.rowItem.CODE_NAME;
                sangjin.page.list.prototype.STORAGE.REMARKS=e.rowItem.REMARKS;
                this.openWindow({
                    url: "/ECERP/SVC/SAMPLE/SAMPLE002M",
                    popupType: false,
                    param: {
                        width: 500,
                        height: 250,
                        EditMode: ecenum.editMode.modify
                    }
                })
            }
        }
    },

    onInitUnitGridCellUseYn: function () {
        return {
            init: function () {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
            },

            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },

            setColumnCustomCell: function (columnMap, settingInfo, searchParam, value, cell, control, column, rowItem, rowItemIndex) {
                var label = value == "1" ? sangjin.resource.LBL01448 : sangjin.resource.LBL01450;
                control.label(label);
            }
        };
    },

    onInitUnitWidgetNew: function () {
        return {
            init: function () {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
            
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                this.createLayout(parent);

                //이벤트 바인딩	
                this.createButtonEvent();
            },

            createLayout: function (parent) {
                var ctrl = widget.generator.control();

                parent.addLeft(ctrl.define("widget.button", this.id, '')
                        .label(sangjin.resource.BTN00151))
            },

            _ON_CLICK: function (e) {
                this.openWindow({
                    url: "/ECERP/SVC/SAMPLE/SAMPLE002M",
                    popupType: false,
                    param: {
                        width: 500,
                        height: 250,
                        EditMode: ecenum.editMode.new
                    }
                })
            },

            onMessageHandler_SAMPLE002M: function (data, message) {
                message.callback && message.callback();
                this.getComposite("searchManager").executeLastSearch();
                debugger;
            },
        }
    }
});