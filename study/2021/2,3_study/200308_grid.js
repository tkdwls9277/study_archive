sangjin.page.factory("sangjin.page","ESD006M",{
    init:function(options){
        this._super.init.apply(this,arguments);
    },

    render:function(){
        this._super.render.apply(this);
    },

    onInitHeader:function(header){
        header.setTitle("newTest");
    },

    onInitContents(contents){
        var g = widget.generator;
        var grid = g.grid();

        var rowData = [];
        for(var i=0;i<10;i++){
			if(i>=9){
				rowData.push({
					"A0":"2020/03/"+(i+1)+"-"+(i+1),
					"A1":"이카"+ +(i+1),
					"A2":"모니터"+(i+1),
					"A3":10.00000
				})
			}else{
				rowData.push({
					"A0":"2020/03/0"+(i+1)+"-"+(i+1),
					"A1":"이카"+ +(i+1),
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
			ecount.alert("체크박스 개수 초과");
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
		.setCustomRowCell("data_no",this.dataSetting.bind(this))
		.setCustomRowCell("prod_des",this.prodSetting.bind(this))
		.setCustomRowCell("s_state",this.s_stateSetting.bind(this))


		//만든 그리드를 Contents에서 실제구현하는 코드
        contents.addGrid("grid",grid);
	},
	//------------------------------------------------------------------------------------------
	//setCustomRowCell을 따로 지정해주기 위한 코드
	dataSetting:function(value,rowItem){
		var option={};
		option.attrs={};

		option.event={
			"click":function(event, data){
				ecount.alert(data.rowItem[ecount.grid.constValue.keyColumnPropertyName]);
			}//.bind(this) 이부분이 없어도 잘 작동 한다. 왜?
		}
		option.shaded=true;
		return option;
	},

	prodSetting:function(value, rowItem){
		var option={};
		if(rowItem[ecount.grid.constValue.keyColumnPropertyName]=="0"){	
			option.attrs={"class":"text-italic"}
		};
		
		return option;
	},

	s_stateSetting:function(value, rowItem){
		var option={};
		if(rowItem[ecount.grid.constValue.keyColumnPropertyName]=="0"){	
			option.attrs={"class":"text-warning"};
		};
		return option;
	}
	//-----------------------------------------------------------------------------------------------------------

})
