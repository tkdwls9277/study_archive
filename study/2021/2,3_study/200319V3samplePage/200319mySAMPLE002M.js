/***********************************************************************************
1. Create Date : yyyy.mm.dd
2. Creator     : 이상진
3. Description : sample list
4. Precaution  :
5. History     :
6. MenuPath    :
7. Old File    :
9. Etc         :
***********************************************************************************/
sangjin .page .factory("sangjin.page.common", "SAMPLE002M", {
    init: function () {
        this ._super .init .apply(this, arguments);
    },

    render: function () {
        this ._super .render .apply(this, arguments);
    },

    initProperties: function () {
        this.pageOption.EditMode = viewBag.DefaultOption.EditMode;
        this.pageOption.columnMap = {
            widget: {
                code: {
                    id: "code",
                    class: "code",
                    isKey: true
                },
                code_name: {
                    id: "code_name",
                    class: "codeName"
                },
                remarks: {
                    id: "remarks",
                    class: "remarks"
                }
            }
        },

        this.pageInfo = {
            modifyTitle: "Sample Update",
            inputTitle: "Sample Input",
            FORM_TYPE_GRID: "TI001", //그리드 양식코드
            pageHeader: [
                {
                    group: "header",
                    id: "header",
                    settingInfo: {
                        bookmark: false
                    },
                    child: [
                        {
                            unit: "widget",
                            type: "inputTitle"
                        }
                    ]
                }
            ],
            pageContents: [
                {
                    group: "contents",
                    id: "contents",
                    child: [
                        {
                            group: "form",
                            type: "inv",
                            id: "form"
                        }
                    ]
                }
            ],
            pageFooter: [
                {
                    group: "footer",
                    id: "footer",
                    child: [
                        {
                            group: "toolbar",
                            id: "toolbarFooter",
                            child: [
                                {
                                    unit: "widget",
                                    type: "new"
                                }, {
                                    unit: "widget",
                                    type: "delete"
                                }, {
                                    unit: "widget",
                                    type: "nouse"
                                }, {
                                    unit: "widget",
                                    type: "close"
                                }
                            ]
                        }
                    ]
                }
            ],
            pageFunction: []
        }
    },

    // ----------------------------------------------------------------------------------------------------------------------
    //버튼 4개
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

                parent.addLeft(ctrl.define("widget.button", this.id, '').label("저장"))
            },

            ON_KEY_F8: function () {
                this._ON_CLICK("F8");
            },

            _ON_CLICK: function (e) {
                var param = {
                    "Request": {
                        "Data": {
                            "CODE": "test",
                            "CODE_NAME": "test",
                            "REMARKS": "test",
                            "USE_YN": "1"
                        },
                        "EditMode": "01"
                    }
                };
                sangjin .common .api({
                        url: "/ECAPI/SVC/Basic/Sample/SaveSampleData",
                        data: Object.toJSON(param),
                        success: function (result) {
                            if (result.Status == "200") {
                                var validation = this .contents .validate();
                                var data = {
                                    extract: this .contents .extract(),
                                    save: this .contents .save(),
                                    callback: this .close .bind(this)
                                };
                                if (validation.result.length > 0) {
                                    validation .result[0][0] .control .setFocus(0); //setfocus는 cindex이다
                                    return;
                                }
                                if (viewBag.DefaultOption.EditMode == "01") {
                                    if (result.Data.Error.type == "duplicate") {
                                        sangjin.alert("중복된 코드입니다.");
                                        return;
                                    }
                                }
                                // 팝업창 닫기 && 리스트 reload
                                this.sendMessage(this, data);
                            } else {
                                sangjin.alert(result.data);
                            }
                        }.bind(this)
                    });
            }.bind(this)

        }
    },

    onInitUnitWidgetDelete: function () {
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

                if (viewBag.DefaultOption.EditMode == "02") {
                    parent.addLeft(ctrl.define("widget.button", this.id, '').label("삭제"))
                }

            },

            _ON_CLICK: function (e) {
                sangjin.confirm("삭제하시겠습니까?", function (e) {
                    if (e == true) {
                        var param = {
                            "Request": {
                                "Data": {
                                    "CODE": "00003"
                                },
                                "EditMode": "03"
                            }
                        };
                        sangjin .common .api({
                                url: "/ECAPI/SVC/Basic/Sample/DeleteSampleData",
                                data: Object.toJSON(param),
                                success: function (result) {
                                    var data = {
                                        extract: this .contents .extract(),
                                        save: this .contents .save(),
                                        callback: this .close .bind(this)
                                    };
                                    if (result.Status == "200") {
                                        // 팝업창 닫기 && 리스트 reload
                                        this.sendMessage(this, data);
                                    } else {
                                        sangjin.alert(result.data);
                                    }
                                }.bind(this)
                            });
                    }
                }.bind(this));
            }.bind(this)
        }
    },

    onInitUnitWidgetNouse: function () {
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

                if (viewBag.DefaultOption.EditMode == "02") {
                    parent.addLeft(ctrl.define("widget.button", this.id, '').label("사용안함"))
                }
            },

            _ON_CLICK: function (e) {
                var param = {
                    "Request": {
                        "Data": {
                            "CODE": "test",
                            "CODE_NAME": "test",
                            "REMARKS": "test",
                            "USE_YN": "1"
                        },
                        "EditMode": "00"
                    }
                };
                sangjin .common .api({
                        url: "/ECAPI/SVC/Basic/Sample/UpdateSampleUseYn",
                        data: Object.toJSON(param),
                        success: function (result) {
                            if (result.Status == "200") {
                                // 팝업창 닫기 && 리스트 reload
                                this.sendMessage({
                                    callback: this .close .bind(this)
                                });
                            } else {
                                sangjin.alert(result.data);
                            }
                        }.bind(this)
                    });
            }
        }
    },
    onInitUnitWidgetClose: function () {
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

                parent.addLeft(ctrl.define("widget.button", this.id, '').label("닫기"))
            },

            _ON_CLICK: function (e) {
                this.close();
            },

            onMessageHandler_SAMPLE002M: function (data, message) {
                message.callback && message.callback();
                this
                    .getComposite("searchManager")
                    .executeLastSearch();
            }
        }
    },
    // ---------------------------------------------------------------------------------------------------------------------------
    //input 칸 생성

    onInitGroupFormInv: function () {
        return {
            isOverriding: true,
            getInputFormMaster: function (flag) {
                return this.formInfos["TI001"];
            },
            onInitControl: function () {},
            // onLoadComplete:function(){}
        }
    },

    onInitUnitWidgetCode: function () {
        return {
            init: function (option) {
                eccomposite_v1 .unit .widget .prototype .init .apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1 .unit .widget .prototype .render .apply(this, arguments);

                this.createLayout(parent);
            },

            createLayout: function (header) {
                var ctrl = widget .generator .control();

                if (viewBag.DefaultOption.EditMode == "02") {
                    header.add(
                        ctrl.define("widget.input", "code", "inputName", "코드").readOnly().value(sangjin.page.list.prototype.STORAGE.CODE).end()
                    );
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                } else {
                    header.add(
                        ctrl.define("widget.input", "code", "inputName", "코드").dataRules(["required"]).end()
                    );
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                };
            }
        }
    },

    onInitUnitWidgetCodeName: function () {
        return {
            init: function (option) {
                eccomposite_v1 .unit .widget .prototype .init .apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1 .unit .widget .prototype .render .apply(this, arguments);

                this.createLayout(parent);
            },

            createLayout: function (header) {
                var ctrl = widget .generator .control();

                if (viewBag.DefaultOption.EditMode == "02") {
                    header.add(
                        ctrl.define("widget.input", "code_name", "inputName", "코드이름").dataRules(["required"]).value(sangjin.page.list.prototype.STORAGE.CODE_NAME).end()
                    );
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                } else {
                    header.add(
                        ctrl.define("widget.input", "code_name", "inputName", "코드이름").dataRules(["required"]).end()
                    );
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                };
            }
        }
    },

    onInitUnitWidgetRemarks: function () {
        return {
            init: function (option) {
                eccomposite_v1 .unit .widget .prototype .init .apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1 .unit .widget .prototype .render .apply(this, arguments);

                this.createLayout(parent);
            },

            createLayout: function (header) {
                var ctrl = widget .generator .control();

                if (viewBag.DefaultOption.EditMode == "02") {
                    header.add(
                        ctrl.define("widget.input", "remarks", "inputName", "적요").value(sangjin.page.list.prototype.STORAGE.REMARKS).end()
                    );
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                } else {
                    header.add(ctrl.define("widget.input", "remarks", "inputName", "적요").end());
                    sangjin.page.list.prototype.STORAGE.EditMode = viewBag.DefaultOption.EditMode;
                };
            }
        }
    }
});