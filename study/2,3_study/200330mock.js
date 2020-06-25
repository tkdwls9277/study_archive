/**
 * MOCK - FrontEnd Integrated?Development Environment
 * 
 * __MOCK_CONFIG - 컨피그 정보, 모든 페이지 요청시 추가된다. 경로는 무조건 풀 패스 (/ECERP, /MOCK)
 * __MOCK_OPTION - dataCtrl, pageCtrl 정보
 * option host 없을경우 __EC_MOCK_CONFIG.host 값 추가
 * mockup.cshtml - DefaultViewPage 아니면 무조건 세팅
 * postDataDecorator
 *      - 목업일경우 - __MOCK_DATA=JSON.stringify(postDataDecorator())
 *      - 목업아닐때 - post data로 postDataDecorator() 리턴값 전송
 */
sangjin.env.mock.register({
	host: "test.sangjinerp.com", //
	MOCKMap: {
		page: {
			"/ECERP/SVC/SAMPLE/SAMPLE002M": {
				mockup: {
					type: "default",
					cshtml: "", //DefaultViewPage 아니면 무조건 세팅
					css: ""
				},
				option: {
					pageCtrl: "/MOCK/tutorial/XESD006M.js"
				},
				postDataDecorator: function (param) {
					param.Options = {
						CustomViewData: [{
								Method: "INPUT",
								FormData: {
									FormType: "GR004",
									FormSeq: 1,
									SetManuallyOption: {
										ViewType: "I" //ENUM_XFORM_VIEW_TYPE

									}
								},
								DetailData: [{
										ColCd: "bond",
										//ColNm: sangjin.resource.LBL19132,
										ColNm: "bond",
										ControlType: "widget.input",
										DataType: "TEXT", //ENUM_DATA_TYPE1
										IsRequired: true
									},
									{
										ColCd: "prod",
										ColNm: sangjin.resource.LBL10323,
										ControlType: "widget.input",
										DataType: "TEXT",
										decCount: 2,
										IsRequired: true
									},
									{
										ColCd: "FUNDS_JOURNAL",
										//ColNm:sangjin.resource.LBL19133,
										ColNm: "FUNDS_JOURNAL",
										ControlType: "widget.input",
										DataType: "TEXT", //ENUM_DATA_TYPE1
										decCount: 2,
										IsRequired: true
									},
									{
										ColCd: "FUNDS_STATUS_TABLE",
										//ColNm:sangjin.resource.LBL19134,
										ColNm: "FUNDS_STATUS_TABLE",
										ControlType: "widget.input",
										DataType: "TEXT",
										decCount: 2,
										IsRequired: true
									},
									{
										ColCd: "ACCOUNT",
										//ColNm:sangjin.resource.LBL19135,
										ColNm: "ACCOUNT",
										ControlType: "widget.input",
										DataType: "TEXT", //ENUM_DATA_TYPE1
										decCount: 2,
										IsRequired: true
									},
								]
							},

						],
						MockUpProgramInfo: {
							ProgramId: "E040802",
							NameResource: "LBL35574"
						},

					};
					return param;
				}
			},
			"/ECERP/SVC/ESD/ESD006M": {
				mockup: {
					type: "default",
					cshtml: "",
					css: ""
				},
				option: {
					//dataCtrl: "/MOCK/sample/XESD006M.datactrl.js",
					pageCtrl: "/MOCK/tutorial/EBA063P_01.js",
					dataCtrl: "/MOCK/tutorial/SAMPLE002M.datactrl.js"
				},
				postDataDecorator: function (param) {
					param.Options = {
						CustomViewData: [{
							Method: "LIST",
							FormData: {
								FormType: "TR001",
								FormSeq: 1,
								SetManuallyOption: {
									ViewType: "R", //ENUM_XFORM_VIEW_TYPE
								}
							},
							DetailData: [{
									ColCd: "CODE",
									ColNm: sangjin.resource.LBL00737,
									ControlType: "widget.label",
									DataType: "TEXT", //ENUM_DATA_TYPE1
									FieldSize: 150,
									IsRequired: true
								},
								{
									ColCd: "CODE_NAME",
									ColNm: sangjin.resource.LBL02878,
									ControlType: "widget.label",
									DataType: "TEXT", //ENUM_DATA_TYPE1
									FieldSize: 200,
									IsRequired: true
								},
								{
									ColCd: "REMARKS",
									ColNm: sangjin.resource.LBL01418,
									ControlType: "widget.label",
									FieldSize: 200,
									DataType: "TEXT", //ENUM_DATA_TYPE1
								},
								{
									ColCd: "USE_YN",
									ColNm: sangjin.resource.LBL35244,
									ControlType: "widget.label",
									FieldSize: 150,
									DataType: "TEXT", //ENUM_DATA_TYPE1
								}
							]
						}],
					}

					return param;
				}
			},
			"/ECERP/SVC/SAMPLE/POPUP_001": {
				mockup: {
					type: "default",
					cshtml: "",
					css: ""
				},
				option: {
					pageCtrl: "/MOCK/tutorial/XESD006M.js"
				}
			},
			"/ECERP/SVC/SAMPLE/POPUP_005": {
				mockup: {
					type: "Default",
					cshtml: "",
					css: ""
				},
				option: {
					pageCtrl: "/MOCK/tutorial/remakePopup_005.js",
					dataCtrl: "/MOCK/tutorial/POPUP_005.datactrl.js"
				},
				postDataDecorator: function (param) {
					param.Options = {
						CustomViewData: [{
							Method: "LIST",
							FormData: {
								FormType: "TR001",
								FormSeq: 1,
								SetManuallyOption: {
									ViewType: "R", //ENUM_XFORM_VIEW_TYPE
								}
							},
							DetailData: [{
									ColCd: "CODE",
									ColNm: "회계전표",
									ControlType: "widget.label",
									DataType: "TEXT", //ENUM_DATA_TYPE1
									FieldSize: 150,
									IsRequired: true
								},
								{
									ColCd: "CODE_NAME",
									ColNm: "설정",
									ControlType: "widget.link",
									DataType: "TEXT", //ENUM_DATA_TYPE1
									FieldSize: 200,
									IsRequired: true
								},
							]
						}],
					}
					return param;
				}
			},

			"/ECERP/SVC/SAMPLE/ZTMigration": {
				mockup: {
					type: "Default",
					cshtml: "",
					css: ""
				},
				option: {
					pageCtrl: "/MOCK/tutorial/ZTMigration.js",
					dataCtrl: "/MOCK/tutorial/POPUP_005.datactrl.js"
				},
				"/ECERP/SVC/SAMPLE/POPUP_005": {
					mockup: {
						type: "default",
						cshtml: "", //DefaultViewPage 아니면 무조건 세팅
						css: ""
					},
					option: {
						pageCtrl: "/MOCK/tutorial/POPUP_005.js",
						dataCtrl: "/MOCK/tutorial/POPUP_005.datactrl.js",
					},
					postDataDecorator: function (param) {
						param.Options = {
							CustomViewData: [
								{
									Method:"INPUT",
									FormData:{
										FormType: "GR004",
										FormSeq:1,
										SetManuallyOption: {
											ViewType: "I"//ENUM_XFORM_VIEW_TYPE
											
										}
									},
									DetailData: [
										{
											ColCd:"A0",
											//ColNm: sangjin.resource.LBL19132,
											ColNm:"A0",
											ControlType: "widget.input",
											DataType: "TEXT", //ENUM_DATA_TYPE1
											IsRequired: true
										},
										{
											ColCd:"A1",
											ColNm:"A1",
											ControlType: "widget.input",
											DataType: "TEXT",
											decCount: 2,
											IsRequired: true
										},
										{
											ColCd:"A2",
											//ColNm:sangjin.resource.LBL19133,
											ColNm:"A2",
											ControlType: "widget.input",
											DataType: "TEXT", //ENUM_DATA_TYPE1
											decCount:2,
											IsRequired: true
										},
										{
											ColCd:"A3",
											//ColNm:sangjin.resource.LBL19134,
											ColNm:"A3",
											ControlType: "widget.input",
											DataType: "TEXT",
											decCount: 2,
											IsRequired: true
										},
										{
											ColCd:"A4",
											//ColNm:sangjin.resource.LBL19135,
											ColNm:"A4",
											ControlType: "widget.input",
											DataType: "TEXT", //ENUM_DATA_TYPE1
											decCount:2,
											IsRequired: true
										},
									]
								},
								
							],
							MockUpProgramInfo: {
								ProgramId: "E040802",
								NameResource: "LBL35574"
							},
	
						};
						return param;
					}
				},
			// 	postDataDecorator: function (param) {
			// 		param.Options = {
			// 			SearchFormData: {
			// 				Method: "SEARCH",
			// 				FormData: {
			// 					SetManuallyOption: {
			// 						ViewType: "H", //ENUM_XFORM_VIEW_TYPE
			// 						//FormType: "MI630",
			// 						//FormSeq:1,
			// 					}
			// 				},
			// 				DetailData: [
			// 					{
			// 						TabCd: "Zone",
			// 						Title: "Zone Syncronization",
			// 						SubItems: [{
			// 								controlType: "widget.select",
			// 								id: "category",
			// 								name: "category",
			// 								subTitle: "category",
			// 								title: "category",
			// 							},
			// 							{
			// 								controlType: "widget.label",
			// 								id: "from",
			// 								name: "from",
			// 								subTitle: "from",
			// 								title: "from",
			// 							},
			// 							{
			// 								controlType: "widget.checkbox.whole",
			// 								id: "to",
			// 								name: "to",
			// 								subTitle: "to",
			// 								title: "to",
			// 							},]
			// 					},
			// 					{
			// 						TabCd: "Code",
			// 						Title: "ZT Code Migration",
			// 						SubItems: [{
			// 							controlType: "widget.select",
			// 							id: "qw",
			// 							name: "qw",
			// 							subTitle: "qw",
			// 							title: "qw",
			// 						},
			// 						{
			// 							controlType: "widget.label",
			// 							id: "qe",
			// 							name: "qe",
			// 							subTitle: "qe",
			// 							title: "qe",
			// 						},
			// 						{
			// 							controlType: "widget.checkbox",
			// 							id: "qr",
			// 							name: "qr",
			// 							subTitle: "qr",
			// 							title: "qr",
			// 						}, 
			// 						{
			// 							controlType: "widget.select",
			// 							id: "category",
			// 							name: "category",
			// 							subTitle: "category",
			// 							title: "category",
			// 						},
			// 						{
			// 							controlType: "widget.label",
			// 							id: "from",
			// 							name: "from",
			// 							subTitle: "from",
			// 							title: "from",
			// 						},
			// 						{
			// 							controlType: "widget.checkbox",
			// 							id: "to",
			// 							name: "to",
			// 							subTitle: "to",
			// 							title: "to",
			// 						}
								
								
								
			// 					]
			// 					},
			// 				]
			// 			}
			// 		}
			// 		return param;
			// 	}
			// },
			}
		},

		api: {
			"/ECAPI/SVC/Basic/Sample/GetListSampleData": {
				host: "test.sangjinerp.com",
				status: 200,
				url: "/MOCK/tutorial/GetListSampleData.aspx"
			},
		}
	}
});
