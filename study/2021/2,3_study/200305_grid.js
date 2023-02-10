sangjin.page.factory("sangjin.page", "ESD006M", {

    //page init event
    init: function (options) {
        //기본 전역변수 설정
		this._super.init.apply(this, arguments);
    },

    //page render event
    render: function () {
		
        this._super.render.apply(this);

    },
	
	onInitHeader:function(header){
		header.setTitle("sangjin");

		var contents = widget.generator.contents();

		header.addContents(contents);

	},

	
	onInitContents(contents){
		//그리드 생성.
		var g = widget.generator,
			grid1 = g.grid();


		//-------------------------------------------------------------------------------------------------
		//기초 컬럼 생성
		// var rowData=[];
		// for (var i=0;i<10;i++){
		// 	rowData.push({
		// 		'data_no':"2020/02/"+(i+1),
		// 		'cust_des':"이카운트"+ +(i+1),
		// 		'prod_des':"모니터"+(i+1),
		// 		'tot_amt':10.00000
		// 	})
		// }

		// grid1.setColumns([
		// 	{id:"data_no", title:"전표일자", width:100, controlType:"widget.link", dataType:"21"},
		// 	{id:"cust_des", title:"거래처명", width:100, controlType:"widget.label"},
		// 	{id:"prod_des", title:"품목명", width:100, controlType:"widget.label"},
		// 	{id:"tot_amt", title:"금액합계", width:100, controlType:"widget.label", dataType:"92"},
		// 	{id:"checked", title:"회계반영여부", width:100, controlType:"widget.faCheckLink", align:"center"}
		// ])
		// .setColumnPropertyColumnName("id")
		// .setRowData(rowData)

		// contents.addGrid("grid1",grid1);
		//-------------------------------------------------------------------------------------------------

		//첫번째 행에 여러가지 속성들을 추가하는 것
		//
		// var rowData=[];
		// for (var i=0;i<9;i++){
		// 	rowData.push({
		// 		'data_no':"2020/02/0"+(i+1)+"-"+(i+1),
		// 		'cust_des':"이카운트"+ +(i+1),
		// 		'prod_des':"모니터"+(i+1),
		// 		'tot_amt':10.00000
		// 	})
		// }
		// rowData.push({
		// 	'data_no':"2020/02/10-10",
		// 	'cust_des':"이카운트10",
		// 	'prod_des':"모니터10",
		// 	'tot_amt':10.00000
		// })

		// grid1.setColumns([
		// 	{id:"data_no", title:"전표일자", width:100, controlType:"widget.link", dataType:"22"},
		// 	{id:"cust_des", title:"거래처명", width:100, controlType:"widget.label",fontBold:true},
		// 	{id:"prod_des", title:"품목명", width:100, controlType:"widget.label"},
		// 	{id:"tot_amt", title:"금액합계", width:100, controlType:"widget.label", dataType:"92"},
		// 	{id:"checked", title:"회계반영여부", width:100, controlType:"widget.faCheckLink", align:"center"}
		// ])
		// //체크박스
		// //-------------------------------------
		// .setCheckBoxUse(true)
		// .setCheckBoxMaxCount(5)
		// .setCheckBoxMaxCountExceeded(function(){
		// 	sangjin.alert("체크박스 개수 초과");
		// })
		// //--------------------------------------

		// //음영처리
		// .setEventShadedColumnId("data_no")

		// //--------------------------------------
		// .setKeyColumn(["data_no"])
		// .setColumnPropertyColumnName("id")
		// .setRowData(rowData)
		// .setCustomRowCell("data_no",function(value, rowitem){
		// 	var option={};
		// 	if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="2020/02/01-1"){
		// 		//option.fontBold='1';
		// 		option.attrs={};
		// 		option.data = "이카운트11";
		// 		option.shaded=true;
				
		// 		option.parentAttrs={};
		// 		option.parentAttrs.class="text-right";
				
		// 		//부모의 속성에 접근
		// 		option.event={
		// 			'click':function(event, data){
		// 				debugger;
		// 				sangjin.alert(data.rowItem[sangjin.grid.constValue.keyColumnPropertyName]);
		// 			}
		// 		}
		// 	}

		// 	return option;
		// })
		// .setCustomRowCell("prod_des",function(value, rowitem){
		// 	if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="2020/02/01-1"){
		// 		var option={};
		// 		option.attrs={};
		// 		option.attrs.class="text-italic";
		// 	}
		// 	return option;
		// })
		// .setCustomRowCell("checked",function(value, rowitem){
		// 	if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="2020/02/01-1"){
		// 		var option={};
		// 		option.attrs={};
		// 		option.attrs={
		// 			"class":"test-warning"
		// 		};
		// 	}
		// 	return option;
		// })

		// contents.addGrid("grid1",grid1);

		//-----------------------------------------------------------------------------------------------------
		var rowData=[];
		var mergeData={};

		mergeData['_ROW_TITLE']='merge';
		mergeData['_COLSPAN_COUNT']=2;
		mergeData['_MERGE_START_INDEX']=1;
		mergeData['_ROWSPAN_COUNT']=2;
		mergeData['_IS_BOLD']=true;
		mergeData['_IS_CENTER_ALIGN']=true;

		for (var i=0;i<9;i++){
			rowData.push({
				'A0':"2020/02/0"+(i+1)+"-"+(i+1),
				'A1':"이카운트"+ +(i+1),
		 		'A2':"모니터"+(i+1),
				'A3':10.00000,
				'MAXCNT':100,
				'_MERGE_SET':[]
			})
		}
		rowData.push({
			'A0':"2020/02/10-10",
			'A1':"이카운트10",
		 	'A2':"모니터10",
			'A3':10.00000,
			'MAXCNT':100,
			'_MERGE_SET':[]
		})
		//rowData는 실제 데이터랑 머지데이터가 합쳐져 있는 변수이다.
		rowData[1]['_MERGE_SET']=[mergeData];

		grid1.setColumns([
			{id:"data_no", title:"전표일자", width:100, controlType:"widget.link", dataType:"22"},
			{id:"cust_des", title:"거래처명", width:100, controlType:"widget.label",fontBold:true},
			{id:"prod_des", title:"품목명", width:100, controlType:"widget.label"},
			{id:"tot_amt", title:"금액합계", width:100, controlType:"widget.label", dataType:"92"},
			{id:"checked", title:"회계반영여부", width:100, controlType:"widget.faCheckLink", align:"center"},
			{id:"print", title:"프린트", width:100, controlType:"widget.link", align:"center"}
		])
		//체크박스
		//-------------------------------------
		.setCheckBoxUse(true)
		.setCheckBoxMaxCount(5)
		.setCheckBoxMaxCountExceeded(function(){
			sangjin.alert("체크박스 개수 초과");
		})
		//--------------------------------------

		//음영처리
		.setEventShadedColumnId("data_no")

		//--------------------------------------
		//페이지 숫자 칸 만들기
		.setRowDataUrl('/Account/Basic/GetSiteList')
		
		.setPagingUse(true)
		.setPagingRowCountPerPage(10,true)
		.setPagingUseDefaultPageIndexChanging(true)
		//--------------------------------------
		.setRowDataSample({"print":"인쇄"})
		//--------------------------------------
		//html 코드를 위치에 맞게 삽입해주는 코드
		.setHeaderTopRightHTML("2020.03.05")
		//--------------------------------------
		//keyid를 설정해주는 코드
		//.setKeyColumn(["data_no"])
		//.setColumnPropertyColumnName("id")
		.setRowData(rowData)
		//---------------------------------------------------------------------------------------
		
		//각각의 칸에 각각의 효과를 넣어주기
		.setCustomRowCell("data_no",function(value, rowitem){
			var option={};
			if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="0"){
				//option.fontBold='1';
				option.attrs={};
				option.data = "이카운트11";
				option.shaded=true;
				
				option.parentAttrs={};
				option.parentAttrs.class="text-right";
				
				//부모의 속성에 접근
				option.event={
					'click':function(event, data){
						sangjin.alert(data.rowItem[sangjin.grid.constValue.keyColumnPropertyName]);
					}
				}
			}

			return option;
		})
		.setCustomRowCell("prod_des",function(value, rowitem){
			if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="0"){
				var option={};
				option.attrs={};
				option.attrs.class="text-italic";
			}
			return option;
		})
		.setCustomRowCell("checked",function(value, rowitem){
			if(rowitem[sangjin.grid.constValue.keyColumnPropertyName]=="0"){
				var option={};
				option.attrs={};
				option.attrs={
					"class":"text-warning"
				};
			}
			return option;
		})
		//------------------------------------------------------------------------------------------
		contents.addGrid("grid1",grid1);
		
		
	},

	//1. 추가사항
	//2. 페이지 이동 시 5번째 행 거래처명을 colspan 3으로 병합해라
	onGridAfterRowDataLoad:function(e,data){
		var mergeData={};

		mergeData['_ROW_TITLE']='merge';
		mergeData['_COLSPAN_COUNT']=3;
		mergeData['_MERGE_START_INDEX']=1;
		mergeData['_IS_BOLD']=true;
		mergeData['_IS_CENTER_ALIGN']=true;

		data.result.Data[5]['_MERGE_SET']=[mergeData];
	},
	//그리드에서 요청한 ROW 데이터 조회가 완료되었을때 호출됩니다.
	//그리드 랜더링이 시작되기 전이며 파라미터로 ROW 데이터 목록과 응답 시간 정보가 전달됩니다.


	onGridRenderComplete:function(e){
		sangjin.page.list.prototype.onGridRenderComplete.apply(this, arguments);

		var grid=this.contents.getGrid("grid1").grid;
		grid.addCellClass("tot_amt","0","text-right");
	},
	//그리드 랜더링이 완료된 이후 호출됩니다.
	//-------------------------------------------------------------------------------------------------------------






	onInitFooter:function(footer){
		var control = widget.generator.control();
		var toolbar = widget.generator.toolbar();
		
		toolbar.addLeft(control.define("widget.button","save").label("save"));
		toolbar.addRight(control.define("widget.button","reset").label("reset"));

		footer.add(toolbar);
	},

	onMessageHandler: function (context, data) {
		this.contents.lastReset(data.extract.result);	
	},
	
	onFooterReset:function(){
		this.contents.getControl("input1").setValue(null);
		this.contents.getControl("input2").setValue(null);
		this.contents.getControl("input3").setValue(null);
		this.contents.getControl("input4").setValue(null);
	},

	//실행되는 과정중 모든 데이터가 로드되며 거쳐가는 함수
	onInitControl:function(cid, control){
		if(cid=="txtDocNo"){
			control.readOnly();
		}else if(cid=="ddlSTaxFlag"){
			control.label(["전체","미청구","미확인"])
					.value(["all","1","2"])
		}else if(cid == "ddlForeignFlag"){
			control.label(["전체","내자","외자"])
					.value(["all","1","2"])
		}
	},
	
	onLoadComplete: function (e) {
		//alert("로딩완료");
		// this.header.toggleContents(true);
		this.header.getControl("txtBondDebitNo").setValue("111");
	},
	
	onChangeControl: function (control) {
		var a = this.contents.getControl("input1").getValue();
		if(a=='0'){
			this.contents.getControl("input1").setValue(null);
			this.contents.getControl("input2").setValue(null);
			this.contents.getControl("input3").setValue(null);
			this.contents.getControl("input4").setValue(null);
        }

        /*
        1. contents - widget.checkbox.whole
                  (항목 : 전체, 본문, 답글)
        */
        //cindex, Value, getCheckedInfo, setValue
		//체크박스 알고리즘
		if(control.cid == "chk1"){
			var cindex = control.cindex;
			var value = control.value;
			var currentValue = control.__self.getCheckedInfo().slice(1);
			if(cindex == 0){
				control.__self.setCheckedAll(value);
			}else{
				var diffValue = currentValue.all(function(info){
					return info.checked;
				});
				
				control.__self.setValue(0,diffValue);
				
			}
		}

		if(control.cid=="subradio"){
			if(control.value=="subradio1"){
				this.contents.getControl("subinput2").show();
				this.contents.getControl("subinput").hide();
			}else{
				this.contents.getControl("subinput2").hide();
				this.contents.getControl("subinput").show();
			}
		}else if(control.__self.pcid){
			this.contents.getControl(control.__self.pcid).get(1).hide();
		}

    },

    //popup에 있어서
    //isApplyDisplayFlag=true 로 넘겨주기
    onPopupHandler: function(control, parameter, handler){
        if(control.cid==""){
            parameter.isApplyDisplayFlag=true;
        }
        handler(parameter);

    },


	//header의 search 버튼을 클릭했을 때 이벤트
	//popup을 띄워준다.
    onHeaderButton_id:function(){
        this.openWindow({
            url:"/ECERP/SVC/ESD/ESD007M",
            param:{
                XPNS_ITEM_CD:"11",
				EditFlag:"M",
				__ecPageID:this
            }
        })
	},
	
	//sendMessage - popup에서 전 페이지로 메세지를 넘겨줌
	//onMessageHandler - popup에서 받은 데이터
	
});
