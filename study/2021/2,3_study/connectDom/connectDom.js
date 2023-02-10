// EcountInput
// EcountRadio
// EcountSelect
// EcountButton

// EcountForm
// //컨테이너, 계층을 가짐

// EcountHeader
// EcountContents
// EcountFooter

// EcountElement

//전역 클래스
class eElement{
    //htmlElement/**parentNode */
    constructor(id, value, parentNode){
        this.id=id;
        this.value=value;
        this.parentNode=parentNode;
    }
    render(){
        this.node = document.createElement("div");
        this.node.className=this.value;
        this.parentNode.appendChild(this.node);
    }
    setString(str){
        this.node.appendChild(document.createTextNode(str));
    }
    getNode(){
        return this.parentNode.appendChild(this.node);
    }
}

//class 값 넣는 문제

//div content
// var divcontents= new EcountElement('',"contents",mainPage);
// divcontents.render();




//create dom
//appendCild

//인풋 클래스
class eInput extends eElement{
    constructor(id, value, parentNode){
        super(id, value, parentNode);
    }
    setString(str){
        this.node.appendChild(document.createTextNode(str));
    }
    render(){
        this.node = document.createElement("input");
        this.node.value=this.value;
        this.parentNode.appendChild(this.node);
    }
    setValue(name,value){
        this.node.setAttribute(name,value);
    }
}

// 인풋 테스트
// var codeControlInput = new eInput(1,2,mainPage);
// codeControlInput.render();
// codeControlInput.setString("hi");
// codeControlInput.setValue("name","G_GUBUN_CUST");
// codeControlInput.setValue("value","01");
// codeControlInput.setValue("data-cid","G_GUBUN");




//버튼 클래스
class eButton extends eElement{
    constructor(id, value, parentNode){
        super(id, value, parentNode);
    }
    setString(str){
        this.node.appendChild(document.createTextNode(str));
    }
    render(){
        this.node = document.createElement("button");
        this.parentNode.appendChild(this.node);
    }
}



//라디오 클래스
class eRadio extends eElement{
    constructor(id, value, parentNode){
        super(id, value, parentNode);
        this.typeStr="input";
        this.type="radio";
    }
    setString(str){
        this.parentNode.appendChild(document.createTextNode(str));
    }
    setType(type){
        this.node.type=this.type;
    }
    setValue(name,value){
        this.node.setAttribute(name,value);
    }
    render(){
        this.node = document.createElement("input");
        this.node.value=this.value;
        this.parentNode.appendChild(this.node);
    }

}
//radio test
// var codeControlRadio = new eRadio(1,"01",mainPage);
// codeControlRadio.render();
// codeControlRadio.setType("radio");
// codeControlRadio.setName("G_GUBUN_CUST");
// codeControlRadio.setString("hi");


//셀렉트 클래스
class eSelect extends eElement{

    setValue(name,value){
        this.node.setAttribute(name,value);
    }
    render(){
        this.node = document.createElement("select");
        this.parentNode.appendChild(this.node);
    }
    setString(str){
        this.parentNode.appendChild(document.createTextNode(str));
    }
}

//옵션 클래스
class eOption extends eElement{

    setValue(name,value){
        this.node.setAttribute(name,value);
    }
    render(){
        this.node = document.createElement("option");
        this.node.value=this.value;
        this.parentNode.appendChild(this.node);
    }
    setString(str){
        this.node.appendChild(document.createTextNode(str));
    }
}

//테이블 클래스
class eForm extends eElement{
    setString(str){
        this.node.appendChild(document.createTextNode(str));
    }
    render(){
        this.node = document.createElement("table");
        this.node.className=this.value;
        this.parentNode.appendChild(this.node);
    }
    createtr(){
        this.node = document.createElement("tr");
        this.parentNode.appendChild(this.node);
    }
    createtd(){
        this.node = document.createElement("td");
        this.parentNode.appendChild(this.node);
    }
}






//test
//header
//--------------------------------------------------------------------------------
var divheader = new eElement('',"header",mainPage);
divheader.render();
var divtoolbar = new eElement('',"toolbar",divheader.getNode());
divtoolbar.render();
var divcontrol1 = new eElement('',"control",divtoolbar.getNode());
divcontrol1.render();
divcontrol1.setString("거래처 등록");


var divcontrol2 = new eElement('',"control",divtoolbar.getNode());
divcontrol2.render();
//button test
var codeControlbtn = new eButton(1,2,divcontrol2.getNode());
codeControlbtn.render();
codeControlbtn.setString("option");

//contents
//---------------------------------------------------------------------------------
var divcontents= new eElement('',"contents",mainPage);
divcontents.render();
var mktable = new eForm('',"form",divcontents.getNode());
mktable.render();
var tr1 = new eForm('','',mktable.getNode());
tr1.createtr();
var td1 = new eForm('','',tr1.getNode());
td1.createtd();
td1.setString("거래처 코드");
var td2 = new eForm('','',tr1.getNode());
td2.createtd();

var divinput1 = new eElement('','',td2.getNode());
divinput1.render();
var inputtext = new eInput("text",null,divinput1.getNode());
inputtext.render();
inputtext.setValue("type","text");
inputtext.setValue("data-cid","BUSINESS_NO");
inputtext.setValue("data-cindex","0");

var tr2 = new eForm('',"control",mktable.getNode());
tr2.createtr();
var td3 = new eForm('','',tr2.getNode());
td3.createtd();
td3.setString("거래처코드구분");
var td4 = new eForm('','',tr2.getNode());
td4.createtd();
var divinput2 = new eElement('',"control",td4.getNode());
divinput2.render();

var inputarray = [];
var radioValue=["사업자등록번호","비사업자(내국인)","비사업자(외국인)"];
for(var i=0;i<3;i++){
    inputarray[i]=new eRadio('',"0"+i,divinput2.getNode());
    inputarray[i].render();
    inputarray[i].setType("radio");
    inputarray[i].setValue("data-cid","G_GUBUN");
    inputarray[i].setValue("data-cindex",i);
    inputarray[i].setString(radioValue[i]);
}

var tr3 = new eForm('','',mktable.getNode());
tr3.createtr();
var td5 = new eForm('','',tr3.getNode());
td5.createtd();
td5.setString("외화 거래처");
var td6 = new eForm('','',tr3.getNode());
td6.createtd();
var divinput3 = new eElement('',"control",td6.getNode());
divinput3.render();

var sel = new eSelect('','',divinput3.getNode());
sel.render();
sel.setValue("data-cid","FOREIGN_FLAG");
sel.setValue("data-cindex","0");

var option1 = new eOption('','',sel.getNode());
option1.render();
option1.setValue("value","0");
option1.setString("사용안함");

var option2 = new eOption('','',sel.getNode());
option2.render();
option2.setValue("value","1");
option2.setString("USD");

var option3 = new eOption('','',sel.getNode());
option3.render();
option3.setValue("value","2");
option3.setString("중국원");

var option4 = new eOption('','',sel.getNode());
option4.render();
option4.setValue("value","add");
option4.setString("추가");

//footer
//---------------------------------------------------------------------------------
var divfooter = new eElement('',"footer",mainPage);
divfooter.render();
var divfoottool = new eElement('',"toolbar",divfooter.getNode());
divfoottool.render();

var divcontrol3 = new eElement('',"control",divfoottool.getNode());
divcontrol3.render();
var codeControlbtn1 = new eButton(1,2,divcontrol3.getNode());
codeControlbtn1.render();
codeControlbtn1.setString("New");

var divcontrol4 = new eElement('',"control",divfoottool.getNode());
divcontrol4.render();
var codeControlbtn2 = new eButton(1,2,divcontrol4.getNode());
codeControlbtn2.render();
codeControlbtn2.setString("Save");

var divcontrol5 = new eElement('',"control",divfoottool.getNode());
divcontrol5.render();
var codeControlbtn3 = new eButton(1,2,divcontrol5.getNode());
codeControlbtn3.render();
codeControlbtn3.setString("Reset");
