sangjin .page .factory("sangjin.page", "ESD006M", {

        //page init event
        init: function (options) {
            //기본 전역변수 설정
            this ._super .init .apply(this, arguments);
        },

        //page render event
        render: function () {
            this ._super .render .apply(this);
        },

        onInitHeader: function (header) {
            header.setTitle("sangjin");

            var contents = widget .generator .contents();

            header.addContents(contents);

        },

        onInitContents(contents) {
            //그리드 생성.
            var g = widget.generator,
                grid1 = g.grid();

            // cursorIndex:1 - 엔터를 클릭했을때 포커스가 가는 순서 지정 controlOption:{decivalUnit:[18,6]} -
            // 자릿수제한(dataType이 필요함)
            grid1
                .setColumns([
                    {
                        id: "prod_cd",
                        title: "품목코드",
                        width: 100,
                        controlType: "widget.code.prod",
                        cursorIndex: 1
                    }, {
                        id: "prod_des",
                        title: "품목명",
                        width: 100,
                        controlType: "widget.input.general",
                        cursorIndex: 3
                    }, {
                        id: "qty",
                        title: "수량",
                        width: 100,
                        controlType: "widget.input.number",
                        cursorIndex: 2
                    }, {
                        id: "price",
                        title: "단가",
                        width: 100,
                        controlType: "widget.input.number",
                        //linechange: true
                    }, {
                        id: "supply_amt",
                        title: "공급가액",
                        width: 100,
                        controlType: "widget.input.number",
                        controlOption: {
                            decimalUnit: [18, 6]
                        },
                        dataType: '92'
                    }, {
                        id: "vat_amt",
                        title: "부가세",
                        width: 100,
                        controlType: "widget.input.number"
                    }, {
                        id: "inspection",
                        title: "검사",
                        width: 80,
                        controlType: "widget.select"
                    }, {
                        id: "size_des",
                        title: "규격선택",
                        width: 80,
                        controlType: "widget.input.general",
                        isHideColumn: true
                    }
                ])
                .setRowData([])
                .setEditable(true, 3, 3)
                .setEditRowMoveable(true)
                //.setEventAutoAddRowOnLastRow(true, 2)
                .setColumnPropertyColumnName("id")
                //.setCustomRowCell('inspection',this.inspectionSetting.bind(this))
                .setCustomRowCell('qty', this.qtySetting.bind(this))
                .setCustomRowCell('inspection', function (value, rowItem) {
                    var option = {};
                    var selectOption = [];

                    selectOption.push(["0", "숨기기"]);
                    selectOption.push(["1", "보이기"]);

                    option.optionData = selectOption;

                    option.event = {
                        'change': function (event, data) {
                            debugger;
                            var grid = this
                                .contents
                                .getGrid("grid1")
                                .grid;

                            if (data.newValue == '1') {
                                grid.setColumnVisibility("size_des", true);
                            } else {
                                grid.setColumnVisibility("size_des", false);
                            }
                        }.bind(this)
                    }

                    return option;
                }.bind(this))
                // ---------------------------------------
                //합계영역과 그 세팅을 위한 코드
                .setEditSpecialRowCount(1)
                .setColumnsAutoSetting({
                    'qty': {
                        'actionType': 'sum',
                        'total': 0
                    },
                    'supply_amt': {
                        'actionType': 'sum',
                        'total': 0
                    }
                })
                // -----------------------------------------
                //품목코드를 통해 다른 그리드에서 값을 가져오는 코드
                .setCustomRowCell('prod_cd', function (value, rowItem) {
                    var option = {};

                    option.controlOption = {
                        controlEvent: {
                            //rowKey에는 호출한 그리드칸이 들어있음
                            'itemSelect': function (rowKey, arg, control) {
                                var grid = this
                                    .contents
                                    .getGrid("grid1")
                                    .grid;

                                var rowItem = arg.rowItem;
                                grid.setCell('prod_cd', rowKey, rowItem.PROD_CD);
                                grid.setCell('prod_des', rowKey, rowItem.PROD_DES);
                                grid.setCell('price', rowKey, 100 * (parseInt(rowKey) + 1));
                                grid.setCell('supply_amt', rowKey, 100 * (parseInt(rowKey) + 1));

                                grid.setCellFocus('qty', rowKey);
                            }.bind(this)
                        }
                    };
                    return option;
                }.bind(this))

                //공급가액 입력 시, 부가세에 10%값으로 세팅
                .setCustomRowCell("supply_amt", function (value, rowitem) {
                    var option = {};
                    //debugger;

                    option.event = {
                        'change': function (event, data) {
                            //debugger;
                            var grid = this
                                .contents
                                .getGrid("grid1")
                                .grid;

                            grid.setCell('vat_amt', data.rowKey, data.newValue / 10);
                        }.bind(this)
                    }
                    return option;
                }.bind(this))
                //체크박스
                // -------------------------------------
                .setCheckBoxUse(true)
                .setCheckBoxMaxCount(5)
                .setCheckBoxMaxCountExceeded(function () {
                    sangjin.alert("체크박스 개수 초과");
                })

                //페이지 숫자 칸 만들기
                .setRowDataUrl('/Account/Basic/GetSiteList')
                .setPagingUse(true)
                .setPagingRowCountPerPage(10, true)
                .setPagingUseDefaultPageIndexChanging(true)
                // --------------------------------------
                //.setRowDataSample({"print": "인쇄"})
                // --------------------------------------
                //html 코드를 위치에 맞게 삽입해주는 코드
                .setHeaderTopRightHTML("2020.03.05")

            contents.addGrid("grid1", grid1);

        },

        onInitFooter: function (footer) {
            var control = widget .generator .control();
            var toolbar = widget .generator .toolbar();

            toolbar.addLeft(control.define("widget.button", "save").label("save"));
            toolbar.addLeft(
                control.define("widget.button", "removeRow").label("removeRow")
            );

            footer.add(toolbar);
        },

        // ----------------------------------------------------------------
        // inspectionSetting:function(value,rowItem){ 	var option={}; 	var
        // selectOption=[]; 	selectOption.push(["0","숨기기"]);
        // selectOption.push(["1","보이기"]); 	option.optionData=selectOption; 	return
        // option; },
        // -----------------------------------------------------------------

        // 수량 입력 후, 하단 행에 포커스 주면 위 그리드의 수량 세팅(+체크박스 체크해주기) 현재 행 인덱스 구하기 getRowIndexByKey
        // 이전 행 로우키 구하기 getRowKeyByIndex 이전 행 데이터 구하기 getRowItem 값이 있으면, 현재 셀에 값 넣기
        // setcell
        qtySetting: function (value, rowItem) {
            var option = {};
            option.event = {
                "focus": function (event, data) {
                    //debugger;
                    if (data.rowIdx != 0) {
                        var grid = this .contents .getGrid("grid1") .grid;

                        var crruntindex = grid.getRowIndexByKey(data.rowKey);
                        var preindex = grid.getRowKeyByIndex(crruntindex - 1);
                        //debugger;

                        grid.setCell('qty', data.rowKey, grid.getRowItem(preindex).qty);
                        //debugger;
                    }
                }.bind(this)
            }
            return option;
        },

        // 유효성 체크하기 (setCellShowError) option={ 	placement:"auto", 	message:"자료를 입력
        // 바랍니다.", 	popOverVisible:true } 품목코드 필수 품목코드 확인 후, 품목명, 수량 필수 모두 통과하면 저장성공
        // alert창 띄우기 validateGetErrorKey
        onFooterSave: function (value, rowItem) {
            var grid = this .contents .getGrid("grid1") .grid;
            grid.getColumnInfoList();
            option = {
                placement: "auto",
                message: "자료를 입력 바랍니다.",
                popOverVisible: true
			};
			var error = grid.getValidateErrorKeyList();
			debugger;
			for(var i =0;i<error.length-1;i++){
				grid.removeValidate(error.columnId[i],error.rowKey[i]);
			}
			

            for (var i = 0; i < grid.getRowList().length; i++) {
                if (!grid.getRowList()[i].PROD_CD) {
                    //debugger;
                    grid.setCellShowError("prod_cd", i, option);
                    
                } else if(grid.getRowList()[i].PROD_CD){
                    if (!grid.getRowList()[i].PROD_DES) {
                        grid.setCellShowError("prod_des", i, option);
                        
                    } else if (!grid.getRowList()[i].QTY) {
                        grid.setCellShowError("qty", i, option);
                        
                    } 
                }
			}
			if(!grid.getValidateErrorKeyList()){
				sangjin.alert("hi");
			}

        },

        onFooterRemoveRow: function (e) {
            var grid = this .contents .getGrid("grid1") .grid;
            var rowId = grid.getCheckedKeyList();

            //여러개 체크하는것을 대비해 foreach가 필요할듯
            for (var i = 0; i < rowId.length; i++) {
                grid.removeRow(rowId[i]);
            }

        }

    });
