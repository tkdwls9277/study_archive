sangjin.page.factory("sangjin.page","ESD006M",{
    init: function (options) {
        this._super.init.apply(this, arguments);
    },

    render: function () {
        this._super.render.apply(this);
    },

    onInitHeader: function (header, resource) {
		debugger;
    },

    onInitContents:function(contents){
        var g = widget.generator;
        var grid = g.grid();

        var rowData = [];
        for(var i=0;i<10;i++){
			if(i>=9){
				rowData.push({
					"A0":"2020/03/"+(i+1)+"-"+(i+1),
					"A1":"이카운트"+ +(i+1),
					"A2":"모니터"+(i+1),
					"A3":10.00000
				})
			}else{
				rowData.push({
					"A0":"2020/03/0"+(i+1)+"-"+(i+1),
					"A1":"이카운트"+ +(i+1),
					"A2":"모니터"+(i+1),
					"A3":10.00000
				})
			}
            
        }
        grid.setColumns([
            {id:"data_no", title:"전표일자", controlType:"widget.link", dataType:"21"},
            {id:"cust_des", title:"거래처명", controlType:"widget.label", fontBold:true},
            {id:"prod_des", title:"품목명", controlType:"widget.label"},
            {id:"tot_amt", title:"금액합계", controlType:"widget.label", dataType:"92"},
            {id:"s_state", title:"회계반영여부", controlType:"widget.faCheckLink"}
        ])
		.setRowData(rowData)
		
		//id값으로 주소를 기억
		//페이징 처리를 위한 주석
		//.setColumnPropertyColumnName("id")

		//------------------------------------
		//체크박스
		.setCheckBoxUse(true)
		.setCheckBoxMaxCount(5)
		.setCheckBoxMaxCountExceeded(function(){
			e.alert("체크박스 개수 초과");
		})
		//-------------------------------------
		//그리드 본문 내 키값을 기준으로 해당 순서 인덱스 값을 반환
		//.setKeyColumn(["data_no"])

		//data_no에 그림자 속성 추가
		.setEventShadedColumnId("data_no")

		//--------------------------------------
		//페이징 처리하기
		.setRowDataUrl('/Account/Basic/GetSiteList')
		.setPagingUse(true)
		.setPagingRowCountPerPage(10,true)
		.setPagingUseDefaultPageIndexChanging(true)

		//----------------------------------------
		//HTML 코드를 위치에 맞게 삽입할 수 있는 코드
		.setHeaderTopRightHTML("2020.03.07")

		//----------------------------------------

		//각각의 속성에 접근해서 변경하기 위한 코드.
		//선언만 하고 바깥에 따로 코딩함.
		// .setCustomRowCell("data_no",this.dataSetting.bind(this))
		// .setCustomRowCell("prod_des",this.prodSetting.bind(this))
		// .setCustomRowCell("s_state",this.s_stateSetting.bind(this));


		//만든 그리드를 Contents에서 실제구현하는 코드
		//contents.addGrid("grid",grid);
		
		//-----------------------------------------------------------------------
		//입력 그리드 만들기

		var gridInput = g.grid();
		
		gridInput
		.setColumns([
			{id:"prod_cd", title:"품목코드", width:100, controlType:"widget.code.prod", dataType: '11'},
			{id:"prod_des", title:"품목명", width:100, controlType:"widget.input.general"},
			{id:"qty", title:"수량", width:100, controlType:"widget.input.number"},
			{id:"price", title:"단가", width:100, controlType:"widget.input.number", dataType: '92'},
			{id:"supply_amt", title:"공급가액", width:100, controlType:"widget.input.number"},
			{id:"vat_amt", title:"부가세", width:100, controlType:"widget.input.number"},
			{id:"inspection", title:"검사", width:80, controlType:"widget.select"},
			{id:"size_des", title:"규격선택", width:80, controlType:"widget.input.general", isHideColumn: true}
		])
		
		.setRowData([])
		//특정 셀의 입력가능 상태를 변경
		.setEditable(true, 3, 3) //실행이 안됨!!!!!!
		.setEditRowMoveable(true)

		.setColumnPropertyColumnName('id')

		//자동으로 2줄씩 추가해주는 코드
		.setEventAutoAddRowOnLastRow(true, 2)

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
		debugger;

		//체크박스
		// .setCheckBoxUse(true)
        // .setCheckBoxMaxCount(5)
        // .setCheckBoxMaxCountExceeded(function () {
        //     e.alert("체크박스 개수 초과");
		// })
		
		//페이지 숫자 칸 만들기
		// .setRowDataUrl('/Account/Basic/GetSiteList')
        // .setPagingUse(true)
        // .setPagingRowCountPerPage(10, true)
		// .setPagingUseDefaultPageIndexChanging(true);

		contents.addGrid("gridInput",gridInput);
		debugger;
	},
	//------------------------------------------------------------------------------------------
	//setCustomRowCell을 따로 지정해주기 위한 코드

	//-----------------------------------------------------------------------------------------------------------

	onGridAfterRowDataLoad: function (e, data) {
        debugger;
    },
	
	onGridRenderComplete: function (e, data, gridObj) {
        sangjin.page.list.prototype.onGridRenderComplete.apply(this, arguments);
        debugger;}
	
})
