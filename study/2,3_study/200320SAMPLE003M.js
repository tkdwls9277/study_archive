ecount.page.factory("ecount.page.common","SAMPLE003M",{
    init: function (options) {
        //기본 전역변수 설정
		this._super.init.apply(this, arguments);
    },

    //page render event
    render: function () {
        this._super.render.apply(this, arguments);
    },

    initProperties:function(){
        this.pageInfo={
            pageHeader:[],
            pageContents:[],
            pageFooter:[],
            pageFunction:[]
        }
    },
//ecount.env.mock.load("/MOCK/shared/SAMPLE_LIST")

})