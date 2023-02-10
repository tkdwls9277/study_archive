sangjin .page .factory("sangjin.page.common", "SAMPLE003M", {
    init: function (options) {
        //기본 전역변수 설정
        this ._super .init .apply(this, arguments);
    },

    //page render event
    render: function () {
        this ._super .render .apply(this, arguments);
    },

    initProperties: function () {
        this.pageInfo = {
            title: "Sample List",
            pageHeader: [
                {
                    group: "header",
                    id: "header",
                    child: [
                        {
                            unit: "widget",
                            type: "outputTitle"
                        }, {
                            group: "tabContents",
                            type: "searchForm",
                            id: "searchForm",
                            settingInfo: {
                                isInitShowSearchTab: false, //초기검색탭노출여부
                                isOnSync: true
                            }
                        }, {
                            group: "toolbar",
                            id: "headerToolbar",
                            child: ["search"]
                        }, {
                            unit: "widget",
                            type: "quickSearch"
                        }
                    ],
                    settingInfo: {
                        bookmark: false
                    }
                }
            ],
            //------------------------------------------------------------
            pageContents: [
                {
                    group: "contents",
                    type:"output",
                    id: "contents",
                    child: [
                        {
                            group: "grid",
                            type: "form",
                            id:"gridForm",
                            settingInfo: {
                                renderType: "columnFix",
                                field:[
                                    {id:"CODE",key:"code"},
                                    {id:"USE_YN",key:"useYn"}
                                ],
                                // field:function(){
                                //     var field=[
                                //         {id:"CHK",key:"e"},
                                //         {id:"CHK",key:"e"},
                                //         {id:"CHK",key:"e"},
                                //     ];
                                //     return field;
                                // }.bind(this)(),
                                //필드안에서 조작이 가능하다. 조금 더 알아보자.
                            },
                            functions:[
                                { function: "gridPaging" },
                                { function: "gridSearch" },
                                {function: "gridColumns"}, 
                                {
                                    function: "callSearchApi",
                                    type: "grid",
                                    settingInfo: {
                                        api: "/ECAPI/SVC/Basic/Sample/GetListSampleData"
                                    }
                                },
                                {
                                    function: "gridStyle",
                                    settingInfo: {
                                         setRowBackgroundColor: function(data) {
                                             if (data.USE_YN == "0")
                                                    return true;
                                            }.bind(this)
                                    },
                                },
                                {
                                    function: "gridCheckbox",
                                    settingInfo: {
                                         maxCount: 100,
                                         initialItems: [],
                                    },
                                },
                                { function: "gridCustomRowCell" },
                                
                            ],
                            //child:[{ unit: "gridCell", type: "codeNo"}]
                        }
                    ]
                }
            ],
            //--------------------------------------------------------------
            pageFooter: [
                {
                    group: "footer",
                    id: "footer",
                    child: [
                        {
                            group: "toolbar",
                            id: "footerToolbar",
                            child: [{unit:"widget",type:"new"}]
                        }
                    ]
                }
            ],
            //----------------------------------------------------------------
            pageFunction: [
                {function:"outputFormManager"},
                {
                    function: "searchManager",
                    settingInfo: {
                        defaultSearchParam: {
                            CODE:"",
                            CODE_NAME:"",
                            REMARKS:"",
                            USE_YN:"",
                        },
                        isFirstLoadSearch: true
                    }
                }, 
                
                
                
            ]
        }
    },

    onInitUnitWidgetChkUseYn: function () {
        return {
            onInitControl: function (cid, control) {
                switch (cid) {
                    case "chkUseYn":
                        control
                            .label(["전체", "사용", "사용안함"])
                            .value(["", "1", "0"])
                            .select("")
                        break;
                }
            }
        }
    },

    onInitUnitGridCellCode:function(){
        return{
            //isOverriding:true,
            init: function (option) {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
                this.bindGridEvent(this.realId);
            },
        
            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },

            setColumnCustomCell: function (columnMap, settingInfo, searchParam, value, cell, control, column, rowItem, rowItemIndex) {
                control.define("widget.gridCell.link").label(value == "0" ? "" : value);       
            },

            onGridTbodyLinkClick:function(){
                //     this.openWindow({
    //         url: '/ECERP/Popup.Search/ES303P',
    //         name: sangjin.resource.LBL07280,
    //         additional: this.pageOption.isAdditionalPopup,
    //         param: {
    //             width: 435,
    //             height: 300,
    //             historySlipDate: this.slipInfo.Master.REQ_DATE,
    //             historySlipNo: this.slipInfo.Master.REQ_NO,
    //             menuType: "15",
    //             serNo: "-1",
    //             isParentHistoryListFlag: true,
    //             lastData: String.format("{0}[{1}]", this.slipInfo.Master.WRITE_DT, this.slipInfo.Master.WRITER_ID)
    //         }
    //  });
            }
            
        }
    },

    onInitUnitGridCellUseYn:function(){
        return{
            init:function(){
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);

                
            },
            render:function(){
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
            },
            setColumnCustomCell: function (columnMap, settingInfo, searchParam, value, cell, control, column, rowItem, rowItemIndex) {
                control.define("widget.gridCell.label").label(value == "0" ? "사용안함" : "사용함");     
            },
        }
    },

    // onGridTbodyClick:function(){
    //     this.openWindow({
    //         url: '/ECERP/Popup.Search/ES303P',
    //         name: sangjin.resource.LBL07280,
    //         additional: this.pageOption.isAdditionalPopup,
    //         param: {
    //             width: 435,
    //             height: 300,
    //             historySlipDate: this.slipInfo.Master.REQ_DATE,
    //             historySlipNo: this.slipInfo.Master.REQ_NO,
    //             menuType: "15",
    //             serNo: "-1",
    //             isParentHistoryListFlag: true,
    //             lastData: String.format("{0}[{1}]", this.slipInfo.Master.WRITE_DT, this.slipInfo.Master.WRITER_ID)
    //         }
    //  });
    // },

    onInitUnitWidgetNew: function () {
        return {
            init: function () {
                eccomposite_v1 .unit .widget .prototype .init .apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1 .unit .widget .prototype .render .apply(this, arguments);
                this.createLayout(parent);
                //이벤트 바인딩
                this.createButtonEvent();
            },

            createLayout: function (parent) {
                var ctrl = widget .generator .control();

                parent.addLeft(ctrl.define("widget.button", "new").label("신규").end());
            },

            ON_KEY_F8: function () {
                this._ON_CLICK("F8");
            },

            _ON_CLICK: function (e) {
                        //     this.openWindow({
    //         url: '/ECERP/Popup.Search/ES303P',
    //         name: sangjin.resource.LBL07280,
    //         additional: this.pageOption.isAdditionalPopup,
    //         param: {
    //             width: 435,
    //             height: 300,
    //             historySlipDate: this.slipInfo.Master.REQ_DATE,
    //             historySlipNo: this.slipInfo.Master.REQ_NO,
    //             menuType: "15",
    //             serNo: "-1",
    //             isParentHistoryListFlag: true,
    //             lastData: String.format("{0}[{1}]", this.slipInfo.Master.WRITE_DT, this.slipInfo.Master.WRITER_ID)
    //         }
    //  });
            }

        }
    },
    //sangjin.env.mock.load("/MOCK/shared/SAMPLE_LIST")
})