sangjin.page.factory("sangjin.page", "ESD006M", {
    /********************************************************************** 
    *   Init Data Setting function
    **********************************************************************/
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
		//var header = widget.generator.header();

		header.setTitle("sangjin");

		var control = widget.generator.control();
		var input = control.define("widget.input","input_id","inputName","입력컨트롤");
		header.add(input);
		
		var button = control.define("widget.button","button_id").label("Search");
		header.add(button);

		//검색에 탭을 추가해주는거
		//원래는 폼을 선언해서 만들어줘야하지만,
		//매번 이렇게 하기에는 번거롭기에 디비에 저장되어있는 데이터를 불러온다.
		// var form = widget.generator.form();
		var contents = widget.generator.contents();
		
		

		// 	form.template("input");
		// 	form.add(control.define("widget.input", "input1", "input1", "거래처1")
		// 	 .end());
		// 	form.add(control.define("widget.input", "input2", "input2", "거래처2")
		// 	 .end());
		// 	form.add(control.define("widget.input", "input3", "input3", "거래처3")
		// 	 .end());
		// 	form.add(control.define("widget.input", "input4", "input4", "거래처4")
		// 	 .end());
	
		// 	form.add(control
		// 		.define("widget.checkbox.whole","chk1","chk_name","선택항목")
		// 		.dataRules(["required"])//특수한 환경에서만 체크
		// 		// .maxLength(10)
		// 		// .useNumericOnly()//실시간으로 데이터 체크한다
		// 		.label(["전체","본문","답글"])
		// 		.value(["all","1","0"])
		// 		.end());
			
		// 	form.add(control
		// 		.define("widget.radio.whole","radio1","radio_name","선택항목")
		// 		.label(["전체","본문","답글"])
		// 		.value(["all","1","0"])
		// 		.end());
	
		// 	form.add(control
		// 		.define("widget.select","select1","select_name","선택항목")
		// 		.option([["all","전체"],["1","본문"],["0","답글"]])
		// 		.end());
	
		// 	form.add(control
		// 		.define("widget.code.cust","cust","custname","거래처 단일")
		// 		.end());
	
		// 	form.add(control
		// 		.define("widget.multiCode.cust","multi","multiname","거래처 다중")
		// 		.end());
	
		// 		//품목
		// 	form.add(control
		// 		.define("widget.multiCode.prod","prod","prodname","품목")
		// 		.end());
	
		// 		//창고
		// 	form.add(control
		// 		.define("widget.multiCode.wh","wh","whname","창고")
		// 		.hasFn([
		// 			{label:"팝업1", id:"fntest1"},
		// 			{label:"팝업2", id:"fntest2"}
		// 		])
		// 		.end());
				//hasFn
				//포커스가 갔을때 오른쪽에 Fn키와 그에따른 그룹버튼을 만들어줌
				//onFunction+id
		
		var tabContents = widget.generator.tabContents();
		// tabContents
		// 	.createActiveTab("all","전체")
		// 	.add(form)


		tabContents
			.setFormInfo(this.viewBag.FormInfos.formSearch)

		//debugger;
		contents.add(tabContents);
		header.addContents(contents);

	},

	
	onInitContents(contents){
		var control = widget.generator.control();
		var form = widget.generator.form();
		var subControl = widget.generator.control();
		//subControl을 새로 만들어준 이유
		//선언 할때마다 초기화를 시켜주는 기능이 있을건데
		//widget.customizer.specName2 에서는 control.define안에 control.define이 있기에
		//하나의 클로저를 공유하는 것이되어 중간에 초기화가 진행
		//그래서 하나의 클로저를 더 생성해주는 것
		
		var toolbar1 = widget.generator.toolbar();
		var toolbar2 = widget.generator.toolbar();
		
		form.template("input");
		form.add(control.define("widget.input", "input1", "input1", "거래처1")
 		.end());
		form.add(control.define("widget.input", "input2", "input2", "거래처2")
 		.end());
		form.add(control.define("widget.input", "input3", "input3", "거래처3")
 		.end());
		form.add(control.define("widget.input", "input4", "input4", "거래처4")
		 .end());
		 

		 //-----------------------------------------------------------------------------------------------------
		 //combine과 customizer
		 form.add(control.define("widget.combine.specName", "specName", "specName", "combine")
		 .end());
		 
		 form.add(control.define("widget.customizer.specName2", "customizer", "customizer", "customizer")
		 .addControl(subControl.define("widget.input","subinput").end())
		 .addControl(subControl.define("widget.input","subinput2").hide().end())
		 .addControl(subControl.define("widget.radio","subradio")
		 	.label(["subradio1","subradio2","subradio3"])
			.value(["subradio1","subradio2","subradio3"])
			.end())
		 .end());

		 //-------------------------------------------------------------------------------------------------------

        form.add(control
			.define("widget.checkbox.whole","chk1","chk_name","선택항목")
			//.dataRules(["required"])//특수한 환경에서만 체크
			// .maxLength(10)
			// .useNumericOnly()//실시간으로 데이터 체크한다
            .label(["전체","본문","답글"])
            .value(["all","1","0"])
            .end());
        
        form.add(control
            .define("widget.radio.whole","radio1","radio_name","선택항목")
            .label(["전체","본문","답글"])
            .value(["all","1","0"])
            .end());

        form.add(control
            .define("widget.select","select1","select_name","선택항목")
            .option([["all","전체"],["1","본문"],["0","답글"]])
            .end());

        form.add(control
            .define("widget.code.cust","cust","custname","거래처 단일")
            .end());

        form.add(control
            .define("widget.multiCode.cust","multi","multiname","거래처 다중")
            .end());

            //품목
        form.add(control
            .define("widget.multiCode.prod","prod","prodname","품목")
            .end());

            //창고
        form.add(control
			.define("widget.multiCode.wh","wh","whname","창고")
			.hasFn([
				{label:"팝업1", id:"fntest1"},
				{label:"팝업2", id:"fntest2"}
			])
			.end());
			//hasFn
			//포커스가 갔을때 오른쪽에 Fn키와 그에따른 그룹버튼을 만들어줌
			//onFunction+id

        contents.add(form);
	},

	onFunctionFntest1:function(){
		alert("fn-test");
	},
	
	
	
	
	/*
	1. footer 버튼 - save, reset
	2. contents - form - 거래처 1,2,3,4 input
	3. save click - 콘솔 - 거래처 1,2,3,4 값 출력
	4. reset click - 거래처 1,2,3,4 빈값으로 채우기
	5. alert - "로딩완료"
	6. 입력폼 거래처1 값이 0이면 모든 입력 폼 초기화
	*/
	onInitFooter:function(footer){
		var control = widget.generator.control();
		var toolbar = widget.generator.toolbar();
		
		toolbar.addLeft(control.define("widget.button","save").label("save"));
		toolbar.addRight(control.define("widget.button","reset").label("reset"));

		var addGroup = control.define("widget.button.group","addGroup","addGroup")
		.label("저장")
		.addGroup([
			{label:"저장/유지"
			,id:"save"}
		])
		.end();

		footer.add(widget.generator.toolbar().addLeft(addGroup));
		footer.add(toolbar);
	},
	
	//버튼위에 생기는 그룹아이디를 지정해서 실행시켜주는거
	onButtonSave:function(){
		alert("hi");
	},
	
	onFooterSave:function(){
		console.log(this.contents.getControl("input1").getValue());
		console.log(this.contents.getControl("input2").getValue());
		console.log(this.contents.getControl("input3").getValue());
		console.log(this.contents.getControl("input4").getValue());

	},
	onMessageHandler: function (context, data) {
		// console.log(context);
		// var data = message.data;
		// console.log(data);
		
		this.contents.lastReset(data.extract.result);
		//debugger;
		//전체 ui를 가져와서 저장한다.

		//this.contents.restore(data.save);
		//값만 뽑아와서 저장한다.
		
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
		this.header.toggleContents(true);
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
