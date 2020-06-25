//bind는 하나의 변수로 묶어주기.

for(var i=0; len=2;){

}

[].forEach(function(){

})
//forEach는 렉시컬컨텍스트가 발생-함수가 계속 실행되기때문.

//개발자가 편한건 고민해봐야한다.

//루프에서 함수를 선언하거나 돔에 접근하는 것은 고민해봐야한다.

//---------------------------------------------------------------

var e = e || {}
e.common.api = function(){}
//namespace - 객체에 접근하는것
//이런것들을 모듈이라고 한다.

//즉시실행함수 - 선언하자마자 실행하는 것.
(function(){
    function User(){

    }
})
function User2(){}
//이럴때 다른 파일에서 User는 선언하지 못함
//vo에 User가 올라갔다가 function이 끝나면 라이플사이클도 킅남.
//User가 스택에서 빠져나오기에 다른데서 선언못함
//그래서 클로저가 필요함.

e.user=(function(){
    var createdIndex=0;
    var e = klass();
    var User = klass(e);
    createdIndex++;

    return {
        create:function (prototype) {
            createdIndex++; //위의 변수를 참조하고 있다. create는 참조될때 실행.
            return new User(prototype);
        },
        getCreatedIndex:function() {
            return createdIndex
        }//이런식으로 객체를 리턴하는걸 모듈이라고 한다.
    };
})();
//모양기억하기
//다른 파일에서 var user1 = e.user.create(); 라고 선언
//e.user = null 로 선언해제


//클로저의 기본
//#1
function outer() {
    var count=0;
    var inner=function(){
        return ++count;
    };
    return inner;
}
var increase = outer();  //8번째 라인이 실행되면 count변수는 메모리에서 해제되어야 한다.

console.log(increase()); // ===1 //inner함수가 count를 참조하고 있어서 해제 되지 않는다.
console.log(increase()); // ===2


//#2
function outer () {
    var count = 0;  
    return {
      increase: function(){
        return ++count;
      },
      decrease: function(){
        return --count;
      }
    }; 
}
  
var counter = outer();
  
console, log(counter.increase()); // === 1 
console, log(counter.increase()); // === 2 
console, log(counter.decrease()); // === 1
  
var counter2 = outer();
  
console.log(counter2.increase()); // === ? === 1 //별개의 객체로 이해.
  
  
//#3
var countFactory = (function(){
    var staticCount=0;
    return function(){
        var localCount=0;
        return{
            increase: function(){
                return{
                    static:++staticCount,
                    local:++localCount
                };
            },
            decrease: function(){
                return{
                    static:--staticCount,
                    local:--localCount
                };
            }
        }
    }
}());
//이중클로져 
var counter = countFactory(), counter2 = countFactory(); 

console.log(counter.increase()); 
console.log(counter.increase()); 
console.log(counter2.decrease()); 
console.log(counter.increase());

//------------------------------------------------------------------------

//이벤트

//이벤트버블링
//특정 화면 요소에서 이벤트가 발생했을 때 
//해당 이벤트가 더 상위의 화면 요소들로 전달

//이벤트캡쳐
//버블링의 반대
//addEventListener() API에서 3번째 옵션 객체에 capture:true

//document.querySelector().addEventListener("Click",fuction(){debugger;}) 정도는 알아놓기

//Target 실제 이벤트가 발생한 타겟
//currentTarget 이벤트를 발생시킨 주체

//-------------------------------------------------------------------------

[1,2,3,4,5]

var a = [1,2,3,4,5]

delete a[2] //===[1,2,empty,4,5] 값만 없애고 배열의 크기는 같음

a.splice(2,1); //===[1,2,4,5] 아예지우기

a.splice(2,0,3); //[1,2,3,4,5] a[2]번째에 3을추가 (3번째 매개변수부터의 수를 추가)
a.splice(0,0, 1,2,3,4,5); //[1,2,3,4,5,1,2,3,4,5] a[0]부터 뒤에값들이 주르륵 들어감
//splice를 쓸때 반복문안에서는 주의. 인덱스가 동적으로 바뀜.

//map
[1,2,3,4,5,6,7].map(function(item, index){return {index:index}})
//Array의 데이터를 가공할때 사용

//맵이 실제 돌아가는 원리
Array.prototype.map = function(fn){
    var result = [];
    this.forEach(function(item){
        result.push(fn(item));
    });
    return result;
}

//filter
var arr = [1,2,3,4,5]
var newFilteredArr = arr.filter(function(item,index){
    return item>3;
})
//필터가 실제 돌아가는 원리
Array.prototype.map = function(fn){
    var result = [];
    this.forEach(function(item){
        if(fn(item)){
            result.push(item);
        }
    });
    return result;
}

//-----------------------------------------------------------------------

//Currying
var createLable = function(label){
    var prefix ="";
    if(e.config.user.comCode ==1){//config변수로서 login할때(?) 전역으로 선언
        prefix="a";
    }else if(e.config.user.comCode ==2)
    prefix="b";

    return function(){
        return prefix+label;
    }
}

var customLabel = createLable("e");

//------------------------------------------------------------------------------

//서버쪽 아키텍쳐에 관한 이해도가 필요
//WAS
//80포트 - http

//라우터는 페이지를 전환하는거다. (새로고침 없이도 가능)

//-------------------------------------------------------------------------------

let func = function(arg1, arg2, ...argN) {
    return expression;
  };
//위와 같은 의미
let func = (arg1, arg2, ...argN) => expression
//this는 무조건 상위, 화살표는 스코프를 가지지 않음.

//화살표 함수 사용
group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
  
    showList() {
      this.students.forEach(
        student => alert(this.title + ': ' + student)
      );
    }
  };
group.showList();
//정상작동

//그냥 forEach사용
group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
  
    showList() {
      this.students.forEach(function(student) {
        // Error: Cannot read property 'title' of undefined
        alert(this.title + ': ' + student) //이곳에서 에러
      });
    }
  };
  group.showList();
  //this가 가르키는 부분이 window여서 가져오는 값이 없음. 스코프가 없음.

  //화살표를 사용하지 않는경우 이런식으로 사용가능
group = {
    title:"Our Group",
    students:["Jon","pete"],
    showList:function(){
        var fn = function(student){
            return alert(this.title+":"+student)
        }.bind(this);
        this.students.forEach(fn);
    }
};

//바벨
//모던 자바스크립트 코드 -> 구 표준을 준수하는 코드
//트랜스파일러, 폴리필의 기능이 존재

//인스턴스를 for in 문으로 도는건 웬만해선 하면 안된다

//Symbol형은 for in 루프에서 빠진다. ****공부가 필요
