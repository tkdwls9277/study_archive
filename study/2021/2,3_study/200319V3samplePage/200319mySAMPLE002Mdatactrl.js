var viewBag = window["viewBag" + __EC_PAGE_ID];

viewBag.DefaultOption = _.merge({}, viewBag.DefaultOption, { outputFormType: "TR001", formSeqInfo: { TR001: 1 } });

//viewBag.DefaultOption.EditMode=ecenum.editMode.new;
//viewBag.DefaultOption.UIOption={};

viewBag.DefaultOption.EditMode=ecenum.editMode.modify;