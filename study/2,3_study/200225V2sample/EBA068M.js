sangjin.page.factory("sangjin.page", "ESD007M", {
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

		// var contents = widget.generator.contents();
		// var tabContents = widget.generator.tabContents();

		// tabContents
		// 	.setFormInfo(this.viewBag.FormInfos.formSearch)
		// 	.add(button)

		// contents.add(tabContents);
		// header.addContents(contents);

	},
	

	
	onInitContents(contents){
		var control = widget.generator.control();
		var form = widget.generator.form();
		
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

        form.add(control
			.define("widget.checkbox.whole","chk1","chk_name","선택항목")
			//.dataRules(["required"])//특수한 환경에서만 체크
            .label(["전체","본문","답글"])
            .value(["all","1","0"])
            .end());
        
        form.add(control
            .define("widget.radio","radio1","radio_name","선택항목")
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

        contents.add(form);
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
		
		toolbar.addLeft(control.define("widget.button","submit").label("submit"));
		footer.add(toolbar);
	},
	
	onFooterSubmit:function(){

		//데이터를 꼭 넣어야하는것(?)*********************
		//focus를 주는 함수
		//한번 알아보기
		// var validation = this.contents.validate();

		// //필수 입력을 정하고 그 곳에 입력이 없을 때 커서를 그곳으로 이동시킴
		// if(validation.result.length>0){
		// 	validation.result[0][0].control.setFocus(0);
		// 	//이중배열
		// 	return;
		// }
		// var returnObj = {};
		// returnObj = {
		// 	input: "hi"
		// };
		// returnObj.callback = this.close.bind(this);
		var data = {
			 extract : this.contents.extract(),
			 save:this.contents.save(),
			 serialize:this.contents.serialize(),
			 //callback:this.callback.bind(this) //보통 적어주는 약속같은 코드
		};


		this.sendMessage(this, data);
		debugger;

		//함수설명
		//---------------------------------------------------------------------------------

		// this.contents.extract();//컨테이너단위로 다 넣어줌
		
		// this.contents.serialize();//컨텐츠에 있는 것들의 키와밸류값을 들고옴
		// //디비와 연동을 위해 사용하는 함수이고, 보통 키값을 디비의 이름으로 설정해준다

		// this.contents.serializeById();//id를 베이스로 만들어줌

		// this.contents.save(); //json data가 나옴
		// this.contents.restore();//save와 쌍으로 되어있음

		// this.contents.lastReset(); //extract한 데이터에 대한

		//__ecPageID - 나를 부른 부모페이지 id
		//ecPageID - 자기자신의 id
		//this.popupLevel - 팝업의 깊이
		//this.reponseID - 부모페이지의 콜백 id

		
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

	},
	
	onLoadComplete: function (e) {
		//alert("로딩완료");
		this.header.toggleContents(true);
	},

    //popup에 있어서
    //isApplyDisplayFlag=true 로 넘겨주기
    onPopupHandler: function(control, parameter, handler){
        if(control.cid==""){
            parameter.isApplyDisplayFlag=true;
        }
        handler(parameter);

    },


	//header의 search부분을 눌렀을때.
    onHeaderButton_id:function(){
        this.openWindow({
			url:"/ECERP/EBA/EBA063P_01"
        })
    }

});
