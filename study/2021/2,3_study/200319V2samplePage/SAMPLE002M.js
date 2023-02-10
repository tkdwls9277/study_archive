sangjin .page .factory("sangjin.page.popup.type2", "SAMPLE002M", {
    init: function (options) {
        this ._super .init .apply(this, arguments);

    },

    render: function () {
        this ._super .render .apply(this, arguments);
        this.slipInfo=this.TestCode;
    },

    onInitHeader: function (header) {
        header.notUsedBookmark();
        if (viewBag.DefaultOption.EditMode == "01") {
            header.setTitle("Sample Input");
        } else {
            header.setTitle("Sample Update");
        }

    },

    onInitContents: function (contents) {
        var control = widget .generator .control();
        var form = widget .generator .form();

        if (viewBag.DefaultOption.EditMode == "02") {
            form.add(
                control.define("widget.input", "input1", "CODE", "코드").readOnly().value(this.slipInfo.CODE).end()
            );
            form.add(
                control.define("widget.input", "input2", "CODE_NAME", "코드이름").dataRules(["required"]).value(this.slipInfo.CODE_NAME).end()
            );
            form.add(control.define("widget.input", "input3", "REMARKS", "적요").value(this.slipInfo.REMARKS).end());
        } else {
            form.add(
                control.define("widget.input", "input1", "CODE", "코드").dataRules(["required"]).end()
            );
            form.add(
                control.define("widget.input", "input2", "CODE_NAME", "코드이름").dataRules(["required"]).end()
            );
            form.add(control.define("widget.input", "input3", "REMARKS", "적요").end());
        }
        contents.add(form);
    },

    onInitFooter: function (footer) {
        var control = widget .generator .control();
        var toolbar = widget .generator .toolbar();

        toolbar.addLeft(control.define("widget.button", "save").label("저장(F8)"));
        if (viewBag.DefaultOption.EditMode == "02") {
            toolbar.addLeft(control.define("widget.button", "delete").label("삭제"));
            toolbar.addLeft(control.define("widget.button", "nouse").label("사용안함"));
        }
        toolbar.addLeft(control.define("widget.button", "close").label("닫기"));
        footer.add(toolbar);
    },
    onFooterSave: function () {
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
        var validation = this .contents .validate();
        sangjin .common .api({
                url: "/ECAPI/SVC/Basic/Sample/SaveSampleData",
                data: Object.toJSON(param),
                success: function (result) {
                    if (result.Status == "200") {

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
                        this.sendMessage(this, {
                            callback:this .close .bind(this)
                        });
                    } else {
                        sangjin.alert(result.data);
                    }
                }.bind(this)
            });
    },

    onFooterDelete: function () {
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
                            if (result.Status == "200") {
                                // 팝업창 닫기 && 리스트 reload
                                this.sendMessage(this, {callback: this .close .bind(this)});
                            } else {
                                sangjin.alert(result.data);
                            }
                        }.bind(this)
                    });
            }
        }.bind(this));
    },

    onFooterNouse: function () {
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
                        this.sendMessage(this, {
                            callback: this
                                .close
                                .bind(this)
                        });
                    } else {
                        sangjin.alert(result.data);
                    }
                }.bind(this)
            });
    },

    onFooterClose: function () {
        this.close();
    },
    ON_KEY_F8: function () {
        this.onFooterSave();
    },
    onLoadComplete:function(){
        this.contents.getControl("input1").setFocus(0);
    },
});