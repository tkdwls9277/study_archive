sangjin.page.factory("sangjin.page.common", "ESA605M", {
    init: function (option) {
        this._super.init.apply(this, arguments);
    },

    render: function (option) {
        this._super.render.apply(this, arguments);
    },

    getAuthorize: function () {
        if (this.viewBag.Permission.Self.Value != "W") {
            return false;
		} else {
            return true;
		}
    },

    initProperties: function () {
        this.pageOption.columns = [
            {
                propertyName: "UPRC_DV_CD",
                id: "UPRC_DV_CD",
                title: sangjin.resource.LBL03422,
                width: 450,
            },
            {
                propertyName: "APCL_PRTY_NO",
                id: "APCL_PRTY_NO",
                title: sangjin.resource.LBL18812,
                width: 80,
            },
            {
                propertyName: "USE_TF",
                id: "USE_TF",
                title: sangjin.resource.LBL35244,
                width: 220,
            },
        ]

        this.pageOption.columnsA = [
            {
                propertyName: "UPRC_DV_CD",
                id: "UPRC_DV_CD",
                title: sangjin.resource.LBL03422,
                width: 450,
            },
            {
                propertyName: "APCL_PRTY_NO",
                id: "APCL_PRTY_NO",
                title: sangjin.resource.LBL18812,
                width: 80,
            },
            {
                propertyName: "USE_TF",
                id: "USE_TFA",
                title: sangjin.resource.LBL35244,
                width: 220,
            },
        ]

        this.pageInfo = {
            title: sangjin.resource.LBL18811,
            name: "ESD006P_10",
            path: "/ECERP/SVC/ESD/ESD006P_10",
            pageHeader: [
                {
                    group: "header", id: "header", sortType: "input-inventory-header",
                    child: ["inputTitle"],
                    settingInfo: {
                        bookmark: false
                    }
                }
            ],
            pageContents: [{
                group: "contents", id: "contents",
                child: [

                    {
                        group: "grid", type: "bomGrid", id: "bomGrid",
                    },
                ]
            }],
            pageFooter: [
                {
                    group: "footer", id: "footer",
                    child: [
                        {
                            group: "toolbar", id: "footerToolbarDefault", sortType: "input-inventory-footer",
                            child: ["apply"]
                        }
                    ]
                }
            ],
            pageFunction: [
            ]
        };
    },


    onInitGroupGridBomGrid: function () {
        return {
            init: function (option) {
                this.isMainGrid = false;
                this.gridId = this.id;
                this.gridVersion = "v3";

                eccomposite_v1.group.grid.prototype.init.apply(this, arguments);
            },

            //render
            render: function (parent) {
                eccomposite_v1.group.grid.prototype.render.apply(this, arguments);
                var grid = widget.generator.grid(this.gridVersion);

                var columnList = [
                    { index: 0, propertyName: "ProdCd", id: "ProdCd", title: sangjin.resource.LBL03017, width: 160 },//품목코드
                    { index: 1, propertyName: "ProdDes", id: "ProdDes", title: sangjin.resource.LBL03004, width: 160 },//품목명
                    { index: 2, propertyName: "BomVerDes", id: "BomVerDes", title: sangjin.resource.LBL06392, width: 143, controlType: "widget.code.BOM" }, // BOM버전
                    { index: 3, propertyName: "BomVerCode", id: "BomVerCode", width: 0, isHideColumn: true }, // BOM코드
                    { index: 4, propertyName: "Qty", id: "Qty", title: sangjin.resource.LBL35131, width: 80, dataType: "9" + sangjin.config.inventory.DEC_Q, isSubTotal: false, isTotal: false, align: "right", controlOption: { decimalUnit: [18, 6] } }//수량 (Qty)
                ];

                var HcolumnList = [];
                var FcolumnList = [];
                for (var i = 0; i < columnList.length; i++) {
                    HcolumnList.push(_.extend({}, columnList[i], { controlType: undefined, dataType1: "TEXT", dataType2: "TEXT", dataType: "" }));
                    FcolumnList.push(_.extend({}, columnList[i], { controlType: undefined }));
                }

                grid
                    .setTheadColumnPropertyNormailze("upper")//헤더 컬럼명 대문자로 설정
                    .setTbodyColumnPropertyNormailze("upper")//바디 컬럼명 대문자로 설정
                    .setTfootColumnPropertyNormailze("upper")//푸터 컬럼명 대문자로 설정
                    .setEditable(true, 0, 0)// 처음 로드 시 row 수            
                    .setColumnSortable(false)//정렬 사용여부
                    .setTheadColumnPropertyName("ProdCd")//헤더 컬럼명으로 사용할 명 설정
                    .setTbodyColumnPropertyName("ProdCd")//바디 컬럼명으로 사용할 명 설정
                    .setTfootColumnPropertyName("ProdCd")//푸터 컬럼명으로 사용할 명 설정

                    .setEventWidgetTriggerObj(this.pageEvents)//페이지 이벤트 바인딩
                    .setTbodyRowShowInputOutLine(true)//active row에 다른 컬럼들 css 설정할지 여부
                    .setTbodyRowDatas(this.InitDatas.TitleGrid)
                    .setTfootRowDatas([])
                    .setColumnSortable(false)//정렬 기능 off
                    .setTheadColumnFix(true)//헤더 틀고정
                    .setCellResize(false, "width")//그리드 셀 마우스로 사이즈 변경 기능 오픈

                    .setTheadColumns(HcolumnList)
                    .setTbodyColumns(columnList)
                    .setTfootColumns(FcolumnList)

                parent.addGrid(this.gridId, grid);
            },

        };
    },


    onInitUnitWidgetApply: function () {
        return {
            init: function () {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                this.createLayout(parent);
                this.createButtonEvent();
            },

            createLayout: function (parent) {
                var g = widget.generator;
                var ctr = g.control();
                parent.addLeft(ctr.define("widget.button", "apply").label(sangjin.resource.BTN00070).end());
            }


        };
    },

    // GridCell "titleValue"" Composite
    onInitUnitGridCellTitleValue: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
                this.bindGridEvent(this.realId);
            },

            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },

            setColumnCustomCell: function (value, rowItem) {
                var option = {};
                if (this.getComposite("grid").id == "salesMgt") {
                    if (value == "WDP") {
                        option.data = sangjin.resource.LBL35192;
                        return option;
                    };
                };

                switch (value) { /// 리소스 작업해야 함
                    case "WP":
                        option.data = sangjin.resource.LBL18813;
                        break;
                    case "WPG":
                        option.data = sangjin.resource.LBL18814;
                        break;
                    case "CP":
                        option.data = sangjin.resource.LBL18815;
                        break;
                    case "CPG":
                        option.data = sangjin.resource.LBL18816;
                        break;
                    case "LP":
                        option.data = sangjin.resource.LBL04171;
                        break;
                    case "CRT":
                        option.data = sangjin.resource.LBL18817;
                        break;
                    case "WDP":
                        option.data = sangjin.resource.LBL35191;
                        break;
                };

                return option;
            }
        };
    },

    // GridCell "orderOfPriority" Composite
    onInitUnitGridCellOrderOfPriority: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
                this.bindGridEvent(this.realId);
            },

            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },

            setColumnCustomCell: function (value, rowItem) {
                var option = {};
                option.controlType = "widget.input.number";
                option.parentAttrs = { 'class': 'text-center' };
                option.controlOption = {
                    isPositiveInteger: true,
                    maxLength: 3
                };

                return option;
            }
        };
    },

    // GridCell "useYNradio" Composite
    onInitUnitGridCellUseYNradio: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.gridCell.prototype.init.apply(this, arguments);
                this.bindGridEvent(this.realId);
            },

            render: function () {
                eccomposite_v1.unit.gridCell.prototype.render.apply(this, arguments);
            },
            
            setColumnCustomCell: function (value, rowItem) {
                var option = {};
                option.controlType = "widget.radio.multi";
                option.label = ([sangjin.resource.LBL01448, sangjin.resource.LBL03589]);
                option.value = ([1, 0]);
                option.select = value;
                option.parentAttrs = { 'class': 'text-center' };
                if (rowItem.UPRC_DV_CD == "WDP") {
                    option.attrs = {
                        'disabled' : true
                    };
                }
                return option;
            }
        };
    },

    // overriding for Option > Last Transaction Setting
    onInitUnitWidgetOutputOption: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
                this.optionList = this.createOptionList();
            },

            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                this.createLayout(parent);
            },

            createLayout: function (header) {
                if (this.optionList.length == 0) {
                    return false;
                };
                header.add("option", this.optionList, false);
            },

            createOptionList: function () {
                var optionList = [];
                this.createItems(optionList);
                return optionList;
            },

            setDropdownButtonlastTransacPrice: function (list, id) {
                list.push({ id: id, label: sangjin.resource.LBL18810 });
                this.createButtonEvent(id, "dropdown");
            },

            createItems: function (optionList) {
                for (var i = 0; i < this.settingInfo.optionList.length; i++) {
                    if (this["setDropdownButton" + this.settingInfo.optionList[i]]) {
                        this["setDropdownButton" + this.settingInfo.optionList[i]](optionList, this.settingInfo.optionList[i]);
                    };
                };
            },

            onDropdownLastTransacPrice: function (e) {
                var params = {
                    width: 500,
                    height: 300,
                    POPUP_CD: 515,
                    SETUPID: "INV038∬INV039",
                    ISSELFCUSTOM: false
                };

                this.openWindow({
                    url: "/ECERP/ESC/ESC001P_309",
                    name: sangjin.resource.LBL18810,
                    param: params
                });
            },

            // when save in Last Transaction Setting
            onMessageHandler_ESC001P_309: function (event, data) {
                data.callback && data.callback();
                this.onAllSubmitSelf('/ECERP/SVC/ESA/ESA605M');
            }
        }
    },

    // footer button "Save" Composite
    onInitUnitWidgetSave: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                this.createLayout(parent);
            },

            createLayout: function (parent) {
                var ctrl = widget.generator.control();
                parent.addLeft(ctrl.define("widget.button", "save").label(sangjin.resource.BTN00065));
                this.saveShortCutKey("F8");
                this.createButtonEvent();
            },

            _ON_CLICK: function (e) {
                if (this.permissions.Self.Value != "W") {
                    sangjin.alert(sangjin.common.getAuthMessage("", [{
                        MenuResource: this.pageInfo.title, PermissionMode: "U"
                    }]).fullErrorMsg);  //sangjin.resource.MSG00456

                    return false;
                }

                var self = this,
                    saleGrid = this.getGrid("salesMgt"),
                    purchasesGrid = this.getGrid("purchasesMgt");

                // reset Errors
                saleGrid.refreshCellByColumn("APCL_PRTY_NO");
                purchasesGrid.refreshCellByColumn("APCL_PRTY_NO");

                // get rowData by Tabs
                var saleList = saleGrid.getRowList(),
                    purchasesList = purchasesGrid.getRowList();

                // check Duplicate
                var salesErrList = this.chkDuplicate(saleList),
                    purchasesErrList = this.chkDuplicate(purchasesList);

                // if duplacate list, show Err
                if (salesErrList.length > 0 || purchasesErrList.length > 0) {
                    salesErrList.length > 0 && this.showDeplicateErr(salesErrList, saleGrid);
                    purchasesErrList.length > 0 && this.showDeplicateErr(purchasesErrList, purchasesGrid);

                    return false;
                };

                // // orderBy Acs && Nombering from 1
                // var salesData = this.setOrderOfPriority(saleList);
                // var purchasesData = this.setOrderOfPriority(purchasesList);

                saleList = saleList.where(function (x) { return x[sangjin.gridV2.constValue.rowStatePropertyName] != "none" });
                purchasesList = purchasesList.where(function (x) { return x[sangjin.gridV2.constValue.rowStatePropertyName] != "none" });


                if (saleList.length > 0 || purchasesList.length > 0) {
                    sangjin.common.api({
                        url: "/SVC/Inventory/Basic/SavePriceApplyOrder",
                        data: Object.toJSON({
                            Request: { Data: { saleList: saleList, purchasesList: purchasesList } }
                        }),
                        success: function (result) {
                            self.onAllSubmitSelf({ url: '/ECERP/SVC/ESA/ESA605M' });
                        },
                        error: function (e) {
                            if (!$.isEmpty(e.fullErrorMsg))
                                sangjin.alert(e.fullErrorMsg);
                        },
                        complete: function () { }.bind(this)
                    });
                }
                else {
                    sangjin.alert(sangjin.resource.MSG09749);
                };

            },

            // // orderBy Acs && Nombering from 1
            // setOrderOfPriority: function (rowData) {
            //     // orderBy Acs
            //     rowData.sort(function(a, b){
            //         return a.APCL_PRTY_NO - b.APCL_PRTY_NO
            //     });

            //     // Nombering from 1
            //     for(var i = 0, len = rowData.length; i < len; i++){
            //         rowData[i].APCL_PRTY_NO = i + 1;
            //     }

            //     return rowData;
            // },

            // check duplicate list
            chkDuplicate: function (rowData) {
                var duplicateList = [];

                for (var i = 0, len = rowData.length; i < len; i++) {
                    if (rowData[i].APCL_PRTY_NO == "" && rowData[i].APCL_PRTY_NO !== 0) {
                        duplicateList.push(rowData[i]);
                    };
                    for (var k = 0, len = rowData.length; k < len; k++) {

                        if (rowData.indexOf(rowData[i]) != rowData.indexOf(rowData[k]) &&
                            rowData[i].APCL_PRTY_NO == rowData[k].APCL_PRTY_NO) {

                            if (duplicateList.indexOf(rowData[k]) == -1) {
                                duplicateList.push(rowData[k]);
                            }
                        }
                    }
                }

                return duplicateList;
            },

            // show duplicate errors
            showDeplicateErr: function (deplicateList, grid) {
                for (var i = 0, len = deplicateList.length; i < len; i++) {
                    grid.setCellShowError("APCL_PRTY_NO", deplicateList[i][sangjin.grid.constValue.keyColumnPropertyName], {});
                };
            },
        };
    },

    // footer button "history" Composite
    onInitUnitWidgetHistory: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                this.createLayout(parent);
            },

            createLayout: function (footer) {
                var ctrl = widget.generator.control();
                footer.addLeft(ctrl.define("widget.button", this.id).label("H"));
                this.createButtonEvent();
            },

            _ON_CLICK: function (e) {

                var param = {
                    width: 450,
                    height: 140,
                    lastEditTime: this.pageOption.MOD_DTM,
                    lastEditId: this.pageOption.MODR_ID,
                    popupType: false,
                    additional: false
                };
                this.openWindow({
                    url: '/ECERP/Popup.Search/CM100P_31',
                    name: sangjin.resource.LBL07157,
                    param: param
                });
            },
        };
    },

    // Grid V2 for tabs
    onInitGroupGridTabs: function () {
        return {
            init: function () {
                this.id = this.tabId
                this.gridId = this.tabId;
                this.realId = this.tabId;
                eccomposite_v1.group.grid.prototype.init.apply(this, arguments);
                this.createItems("gridCell");
            },

            render: function (parent) {
                eccomposite_v1.group.grid.prototype.render.apply(this, arguments);
                var grid = this.createLayout();
                this.execChildRender(parent);
                parent.addGrid(this.gridId, grid);

                for (var i = 0; i < this._commonItemList.length; i++) {
                    var control = this._commonItemList[i];
                    var gridData = control.getGridCellData();

                    if (gridData.callback) {
                        grid.setCustomRowCell(control.id, gridData.callback)
                    };
                };
            },

            createLayout: function () {
                var grid = widget.generator.grid(), rowData;
                var rowData = this.InitDatas.ViewData.PURCHASES;
                var col = this.pageOption.columnsA;

                if (this.gridId == "salesMgt") {
                    rowData = this.InitDatas.ViewData.SALES;
                    col = this.pageOption.columns;
                };
                grid.setEditRowDataSample({ ISCHANGE: "N" })
                    .setColumns(col)
                    .setEditable(true, 0, 0)
                    .setRowData(rowData);

                return grid;
            },

            createItems: function (componentType) {
                for (var i = 0; i < this.settingInfo.field.length; i++) {
                    var columnMapKey = this.settingInfo.field[i];
                    var option = {
                        compositeType: "unit",
                        unitType: componentType,
                        groupType: "",
                        functionType: "",
                        skillType: columnMapKey.key || "",
                        subSkillType: columnMapKey.type || "",
                        childList: [],
                        tabId: this.tabId || "",
                        id: columnMapKey.id,
                        parentType: this.skillType || this.groupType || "",
                        gridId: this.id,
                        parentId: this.parentId,
                        settingInfo: columnMapKey.settingInfo || {}
                    };

                    this.createCompositeInstance(option);
                };
            },

        };
    },

    // tabContents error fixed. When click tab, true return needed.
    // ECU team need to fix below error
    // TabContents file needs below source
    onInitGroupTabContents: function () {
        return {
            isOverriding: true,
            onBeforeChangeTab: function () {
                return true;
            }
        }
    }


});