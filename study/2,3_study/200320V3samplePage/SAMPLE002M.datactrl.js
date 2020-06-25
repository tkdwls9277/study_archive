var viewBag = window["viewBag" + __EC_PAGE_ID];

viewBag.DefaultOption = _.merge({}, viewBag.DefaultOption, { outputFormType: "TR001", formSeqInfo: { TR001: 1 } });


// 신규화면
// viewBag.DefaultOption.EditMode = ecenum.editMode.new


//
viewBag.DefaultOption.UIOption = {};


// 수정화면
viewBag.DefaultOption.EditMode = ecenum.editMode.modify;