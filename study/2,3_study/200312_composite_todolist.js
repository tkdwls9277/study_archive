sangjin.page.factory("sangjin.page.common", "ESD007M", {
    //init
    init: function (option) {
        this._super.init.apply(this, arguments);
        if(e.page.list.prototype.DW_SJ_STORAGE == null || e.page.list.prototype.DW_SJ_STORAGE == "undefined") {
            e.page.list.prototype.DW_SJ_STORAGE = [];
        }
    },

    //render
    render: function (option) {
        this._super.render.apply(this, arguments);
    },

    initProperties: function () {
        //columnMap 정의
        this.pageOption.columnMap = {
            //요청정보
            grid: {
                IO_DATE: "IO_DATE", 
                IO_NO: "IO_NO", 
                IO_TYPE: "IO_TYPE", 
                F_FLAG: "F_FLAG", 
                VERSION: "VERSION_NO", 
                GB_TYPE: "GB_TYPE", 
                WRITER_ID: "WRITER_ID",
                WID: "WID", 
                IN_PART_WRITER: "IN_PART_WRITER", 
                IN_PART: "IN_PART"
            }
        }; 

        //현재 페이지의 정보
        this.pageInfo = {
            title: "todo_list",//타이틀
            
            pageHeader: [
                { 
                    group: "header", id: "header",
                    child: [
                        { unit: "widget", type: "outputTitle" },
                        {
                            unit: "widget", type: "inputTitle",
                            settingInfo: {
                                id: "keyword_input",
                                label: "검색어 입력 ㄱㄱ",
                            }
                        },
                        {
                            unit: "widget", type: "search",
                            settingInfo: {
                                id: "search_btn",
                                label: "검색",
                            }
                        
                        },
                    ],
                }
            ],

            pageContents: [
                {
                    group: "contents",
                    id: "contents",
                    child: [
                        {
                            group: "grid",
                            type: "form",
                            id: "gridId"
                        }
                    ]
                }
            ],

            pageFooter: [
                { 
                    group: "footer", id: "footer",
                    child: [
                        { 
                            group: "toolbar", id: "toolbarFooter",
                            child: [
                                { 
                                    unit: "widget", type: "save_btn",
                                    settingInfo: {
                                        id: "save_btn",
                                        label: "저장",
                                    }
                                    
                                },
                               { 
                                   unit: "widget", type: "delete_btn",
                                   settingInfo: {
                                        id: "delete_btn",
                                        label: "삭제",
                                    }
                                }, 
                            ]
                        }
                    ]
                }
            ],

            pageFunction: [
                { function: "reloadPage" },
            ],
        };
    },
//==============================================================================================
// HEADER
onInitUnitWidgetInputTitle: function() {
    var customOpt = {
        isOverriding: true,
        //init
        init: function (option) {
            eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
        },

        //render
        render: function (parent) {
            eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);

            this.createLayout(parent);
        },

        createLayout: function (header) {
            var ctrl = widget.generator.control();       
    
            var input = ctrl.define("widget.input", this.settingInfo.id, "inputName", this.settingInfo.label);
            header.add(input);

            //이벤트 바인딩
            this.createButtonEvent();
        },
    }

    return customOpt;
},
onInitUnitWidgetSearch: function() {
    var customOpt = {
        isOverriding: true,
        
        //init
        init: function (option) {
            eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
        },
    
        //render
        render: function (parent) {
            eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
    
            //객체 생성
            this.createLayout(parent);

            
            //이벤트 바인딩   
            this.createButtonEvent("search_btn");
        },
    
        //객체 생성
        createLayout: function (header) {
            var ctrl = widget.generator.control();  

            var button = ctrl.define("widget.button", this.settingInfo.id).label(this.settingInfo.label);
            header.add(button);

            //이벤트 바인딩
            this.createButtonEvent();
        },

        //버튼클릭
        _ON_CLICK: function (e) {
            //debugger;
            var keyword = this.header.getControl("keyword_input").getValue();
            var tempData = ecount.page.list.prototype.DW_SJ_STORAGE;
            var resultData = [];
            var gridtemp = this.contents.getGrid("grid1").grid;

            // 모든 데이터 순회
            for(var i = 0;i < tempData.length;i++){
                gridtemp.removeRow(i); // 돌면서 지우기
                var resultTitle = tempData[i]["title"].search(keyword); // 검색 결과 리턴
                var resultContents = tempData[i]["contents"].search(keyword);

                // title or contents 중 검색 키워드 있다면 or 검색 키워드 입력 안했다면
                if(resultTitle >= 0 || resultContents >= 0) {
                    resultData.push({
                        title: tempData[i]["title"],
                        contents: tempData[i]["contents"],
                        date: tempData[i]["date"],
                    });
                }
            };

            // 검색 결과 출력
            for(var i = 0;i < resultData.length;i++) {
                gridtemp.setCell('titleColumns', i, resultData[i]["title"]);
                gridtemp.setCell('contentsColumns', i, resultData[i]["contents"]);
                gridtemp.setCell('dateColumns', i, resultData[i]["date"]);
            }
        }.bind(this),
    }
    return customOpt;
},
//======================================================================================================
// CONTENTS
onInitGroupGridForm: function (commonEvent) {
    var customOption = {

        isOverriding: true, //동일한 공통 객체를 overriding할지 여부

        //init
        init: function (option) {
            eccomposite_v1
                .unit
                .widget
                .prototype
                .init
                .apply(this, arguments);
        },

        //render
        render: function (parent) {
            eccomposite_v1
                .unit
                .widget
                .prototype
                .render
                .apply(this, arguments);

            //인스턴스 추가
            this.createLayout(parent);
        },

        //유닛 생성
        createLayout: function (contents) {
            var g = widget.generator,
                grid1 = g.grid();

            grid1
                .setColumns([
                    {
                        id: "titleColumns",
                        title: "제목",
                        width: 100,
                        controlType: "widget.input.general",
                        dataType: "22",
                        fontBold: true
                    }, {
                        id: "contentsColumns",
                        title: "내용",
                        width: 500,
                        controlType: "widget.input.general"
                    }, {
                        id: "dateColumns",
                        title: "마감날짜",
                        width: 180,
                        controlType: "widget.date"
                    }, {
                        id: "checkColumns",
                        width: 40,
                        controlType: "widget.checkbox"
                    }
                ])
                .setEditable(true, 1, 1)
                .setPagingUse(true)
                .setPagingRowCountPerPage(3, true)
                .setPagingUseDefaultPageIndexChanging(true)
                .setCheckBoxUse(true)
                .setEventShadedColumnId("titleColumns")
                .setRowData([])
                //.setEditRowMoveable(true)
                .setEventAutoAddRowOnLastRow(true, 1, 1)
                .setCustomRowCell('checkColumns', function (value, rowItem) {
                    var option = {};

                    option.event = {
                        'change': function (event, data) {
                            var grid1 = this.getGrid(this.grid1);
                            //debugger;

                            if (data.newValue) {
                                grid1.setEditable(false, "titleColumns", data.rowId);
                                grid1.setEditable(false, "contentsColumns", data.rowId);
                                grid1.setEditable(false, "dateColumns", data.rowId);
                            } else {
                                grid1.setEditable(true, "titleColumns", data.rowId);
                                grid1.setEditable(true, "contentsColumns", data.rowId);
                                grid1.setEditable(true, "dateColumns", data.rowId);
                            }
                        }.bind(this)
                    }

                    return option;
                }.bind(this))

            contents.addGrid("grid1", grid1);
        },
    };
    return customOption;
},
//======================================================================================================
// FOOTER
onInitUnitWidgetSave_btn: function(){
    var customOpt = {
        //init
        init: function (option) {
            eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
        },

        //render
        render: function (parent) {
            eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);

            //객체선언
            this.createLayout(parent);

            //이벤트 바인딩   
            this.createButtonEvent();
        },

        //객체선언
        createLayout: function (parent) {
            var ctrl = widget.generator.control();
            //버튼추가
            ctrl.define("widget.button", this.settingInfo.id).label(this.settingInfo.label);

            parent.addLeft(ctrl);
        },

        /**********************************************************************
        *  common function
        **********************************************************************/

        //버튼클릭
        _ON_CLICK: function (e) {
            //debugger;
            var gridtemp = this.contents.getGrid("grid1").grid;
                    console.log("===========> : " + gridtemp.getRowCount());
                    var temp = [];
                    for(var i = 0;i < gridtemp.getRowCount();i++) {
                        if(!gridtemp.getCell("titleColumns", i)){
                            continue;
                        }
                        temp.push({
                            title: gridtemp.getCell("titleColumns", i),
                            contents: gridtemp.getCell("contentsColumns", i),
                            date: gridtemp.getCell("dateColumns", i),
                        });
                    }
                    ecount.page.list.prototype.DW_SJ_STORAGE = temp;
                    alert("저장 완료!!");
            }.bind(this),
        }
        return customOpt;
    },
    
    onInitUnitWidgetDelete_btn: function(){
        var customOpt = {
            //init
            init: function (option) {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
    
            //render
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
    
                //객체선언
                this.createLayout(parent);
    
                //이벤트 바인딩   
                this.createButtonEvent();
            },
    
            //객체선언
            createLayout: function (parent) {
                var ctrl = widget.generator.control();
    
                //버튼추가
                ctrl.define("widget.button", this.settingInfo.id).label(this.settingInfo.label);
    
                parent.addLeft(ctrl);
            },
    
            /**********************************************************************
            *  common function
            **********************************************************************/
    
            //버튼클릭
            _ON_CLICK: function (e) {
                //debugger;
                var gridtemp = this.contents.getGrid("grid1").grid;
                var rowId = gridtemp.getCheckedKeyList();

                //체크한 곳 삭제하고 글로벌 갱신
                for (var i = 0; i < rowId.length; i++) {
                    gridtemp.removeRow(rowId[i]);
                    ecount.page.list.prototype.DW_SJ_STORAGE[rowId[i]].title=null;
                }

                var totalLength = ecount.page.list.prototype.DW_SJ_STORAGE.length;
                var temp=[];
                for(var i = 0;i < totalLength;i++) {
                    if(ecount.page.list.prototype.DW_SJ_STORAGE[i].title){
                        temp.push(ecount.page.list.prototype.DW_SJ_STORAGE[i]);
                    }
                }
                ecount.page.list.prototype.DW_SJ_STORAGE=[];
                for(var i=0;i<temp.length;i++){
                    ecount.page.list.prototype.DW_SJ_STORAGE[i]=temp[i];
                }
            }.bind(this),
        }
        return customOpt;
    },
//====================================================================================================
// FUNCTION
    onInitFunctionReloadPage: function() {
        var customOpt = {
            isOverriding: true,
            //init
            init: function (option) {
                eccomposite_v1.function.prototype.init.apply(this, arguments);
            },

            //render
            render: function (option) {
                eccomposite_v1.function.prototype.render.apply(this, arguments);
            },

            onLoadComplete: function() {
                if(ecount.page.list.prototype.DW_SJ_STORAGE) {
                    var totalLength = ecount.page.list.prototype.DW_SJ_STORAGE.length;
                    var gridtemp = this.contents.getGrid("grid1").grid;
                    gridtemp.addRow(totalLength);
                    for(var i = 0;i < totalLength;i++) {
                        gridtemp.setCell('titleColumns', i, ecount.page.list.prototype.DW_SJ_STORAGE[i]["title"]);
                        gridtemp.setCell('contentsColumns', i, ecount.page.list.prototype.DW_SJ_STORAGE[i]["contents"]);
                        gridtemp.setCell('dateColumns', i, ecount.page.list.prototype.DW_SJ_STORAGE[i]["date"]);
                    }
                }
            }.bind(this),
        }
        return customOpt;
    },
});

//eccomposite을 재정의 해서 원하는 기능을 제작.
//아직 많이 부족해서 나중에 더 보고 기능 강화하기
