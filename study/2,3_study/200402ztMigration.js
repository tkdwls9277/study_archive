sangjin.page.factory("sangjin.page.common", "POPUP_005", {
    init: function () {
        this._super.init.apply(this, arguments);
    },
    render: function () {
        this._super.render.apply(this, arguments);
    },
    initProperties: function () {
        this.pageInfo = {
            title: "ZT Migration",
            FormType: "Zone Syncronization",
            pageHeader: [{
                group: "header",
                id: "header",
                settingInfo: {
                    bookmark: false
                },
                child: [{
                    unit: "widget", type: "outputTitle"
                },
                {
                    group: "tabContents", type: "searchForm", id: "searchForm",
                    settingInfo: {
                        isInitShowSearchTab: true,	//초기검색탭노출여부
                        isSerializeAllUse: false,
                    },
                },
                {
                    group: "toolbar", id: "headerToolbar",
                    child: [
                        { unit: "widget", type: "search"}, 
                        { unit: "widget", type: "rewrite"},
                        { unit: "widget", type: "history" },
                    ],
                }]
            }],
            pageContents: [],
            pageFooter: [],
            pageFunction: []
        }
    },

    //--------------------------------------------------------------------
    //button
    //--------------------------------------------------------------------

    onInitGroupTabContentsSearchForm: function () {
        return {
            isOverriding: true,
            //탭변경 전 이벤트
            onBeforeChangeTab: function (e) {
                debugger;

                if(e.id == "Code"){
                    this.getControls("category").hide();
                    this.getControls("from").hide();
                    this.getControls("to").hide();
                }

                return {
                    event: e,
                    result: true
                };
            },
        };
    },

    // H
    onInitUnitWidgetHistory: function () {
        return {
            init: function (option) {
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },

            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
                var ctrl = widget.generator.control();
                parent.addLeft(ctrl.define("widget.button", this.id).label("H"));

                this.createButtonEvent();
            },

            _ON_CLICK: function (e) {
                this.openWindow({
                    url: '/ECERP/Popup.Search/CM100P_31',
                    name: sangjin.resource.LBL07157,
                    param: {
                        width: 450,
                        height: 150,
                        // lastEditTime: this.pageInfo.lastEditTime,   ////////// 수정해야 함 
                        // lastEditId: this.pageInfo.lastEditId,     ////////// 수정해야 함 
                    }
                });
            }
        };
    },

    //--------------------------------------------------------------------
    //tab1 menu - Zone Syncronization
    //--------------------------------------------------------------------

    //Category
    onInitUnitWidgetCategory: function () {
        return {
            init: function (option) {
                debugger;
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
            },
            onInitControl: function (cid, control) {

                control.option(["0", "Account"]);
            },
        }
    },

    //From
    onInitUnitWidgetFrom: function () {
        return {
            init: function (option) {
                debugger;
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
            },
            onInitControl: function (cid, control) {
                control.label("E Zone")
            },
        }
    },

    //To
    onInitUnitWidgetTo: function () {
        return {
            init: function (option) {
                debugger;
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
            },
            onInitControl: function (cid, control) {
                control
                    .label(["BA", "BB", "BC","IA","Z","F","AA","AB","AC","CA","CB","CC","CD"])
                    //.value(['', '1', '0'])
                    //.select('')

            },
        }
    },

    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------

    onInitUnitWidgetQe: function () {
        return {
            init: function (option) {
                debugger;
                eccomposite_v1.unit.widget.prototype.init.apply(this, arguments);
            },
            render: function (parent) {
                eccomposite_v1.unit.widget.prototype.render.apply(this, arguments);
            },
            onInitControl: function (cid, control) {
                control.label("E Zone")
            },
        }
    },
})