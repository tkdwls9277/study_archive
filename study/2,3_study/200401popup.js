/***********************************************************************************
1. Create Date : 2020.03.27
2. Creator     : 이상진
3. Description : Related Settings -> 회계전표별 계정기본값
4. Precaution  :
***********************************************************************************/
sangjin.page.factory("sangjin.page.common", "POPUP_005", {
    init: function () {
        this._super.init.apply(this, arguments);
    },
    render: function () {
        this._super.render.apply(this, arguments);
    },
    initProperties: function () {
        this.pageInfo = {
            title: "회계전표별 계정기본값",
            FormType: "TR001",
            pageHeader: [{
                group: "header",
                id: "header",
                settingInfo: {
                    bookmark: false
                },
                child: [{
                    unit: "widget",
                    type: "outputTitle"
                }]
            }],
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
                                    { id: "CODE_NAME", key: "codeName" }
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
                            ]
                        }
                    ]
                }
            ],
            pageFooter: [{
                group: "footer",
                id: "footer",
                child: [{
                    group: "toolbar",
                    id: "toolbarFooter",
                    child: [{
                        unit: "widget",
                        type: "outputClose"
                    }, ]
                }]
            }],
            pageFunction: [
                { function: "reloadPage" },//페이지 reload
                {
                    function: "searchManager",//검색 Manager
                    settingInfo: {
                        isFirstLoadSearch: true,//처음 로딩시 검색여부
                        defaultSearchParam: {//기본 검색 파라미터
                            CODE: "",
                            CODE_NAME: "",
                        },
                    }
                },
                { function: "outputFormManager" },//출력양식 Manager
            ]
        }
    },

    onInitUnitGridCellCodeName: function () {
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
                    .label(value)
                    .handler({
                        "click": function (e) {
                            this.setApply(e);
                        }.bind(this)
                    })
                    .end();
            },
            onGridTbodyLinkClick:function(event){
                var params = {
                    width: sangjin.infra.getPageWidthFromConfig(),
                    TrxType: event.rowItem.TRX_TYPE,
                    SerNo: event.rowItem.SER_NO,
                    controlID: "accountSetting",
                    isFormZT: this.pageOption.isFormZT,
                };
                this.openWindow({
                    url: '/ECERP/POPUP.COMMON/EBD010P_08',
                    name: sangjin.resource.LBL01457,
                    param: params,
                    fpopupID: this.ecPageID,
                    popupType: false,
                });
            }
        };
    },
});
