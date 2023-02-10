//this 
//argument의 유무가 다름. 글로벌컨텍스트, 함수컨텍스트

function whatsThis() { 
    return this.toString(); 
} 
var unikys = { 
    what: whatsThis, 
    toString: function () { 
        return "[object unikys]"; 
    } 
}; 
whatsThis(); // #1 - this는 윈도우
unikys.what(); // #2  - this는 객체자체
whatsThis.call(); // #3 - this는 윈도우
whatsThis.apply(); // #3.1 - this는 윈도우
whatsThis.apply(unikys); // #4 - this는 
unikys.what.call(undefined); // #5 - this는 윈도우
unikys.what.apply(unikys); // #6 - this는
//call이나 apply에서 매개변수가 null이거나 undefined면 this -> window
//매개변수가 있다면 그 매개변수로 들어온 객체를 가르키게됨

//this를 쓰는 이유는 결국 data. this는 data.
//원하는 data를 동적으로 binding하기위해 사용.
//런타임에 변경이 가능하기에.
//---------------------------------------------------------
arguments //배열처럼 다뤄야함
//arguments.foreach()가 없음

//[].slice(0); //새로운 배열을 리턴(복사)

function slice(array){
    var newArray = [];
    array.forEach(item => {
        newArray.push(item);
    });
    return newArray;
}

class Array{
    slice(){
    }
}

//위에 코드가 이런식으로 해석
function Array(){}
Array.prototype.slice=function(){}
//prototype은 클래스의 메소드라 이해

Array.prototype.ecslice=function(){
    var newArray = [];
    array.forEach(item => {
      newArray.push(item);
  });
  return newArray;
}

Array.prototype.ecslice=function(startIndex){
    var newArray = [];
    this.forEach(item => {
      newArray.push(item);
  });
  return newArray;
}
//위 코드와 같은 의미
Array.prototype.ecslice=function(startIndex){
    var newArray = [];
    startIndex = startIndex || 0; //없을 가능성도 있음
    for(var i=startIndex,len=this.length;i<len;i++){
        newArray.push(this[i]);
    }
    newArray.push("e");
    return newArray;
}
//---------------------------------------------
//function의 prototype에 length, apply, bind, call등등이 있음

function print(){
    console.log(this.name);
}

print.call({ name: "apple" });	//apple

//bind
//this값을 받고 새로운 함수를 반환
//첫번째 인자로 전달된 값을 this로 바인딩한 새로운 함수를 반환

//bind는 함수를 두개 만들기도 하고 클로져도 있기에
//스코프체인이 발생하여 메모리차지.
Function.prototype.bind=function(context){
    //debugger;
    //this();
    var self = this;
    var args=[...arguments];
    var context = args.shift();
    return function(){ //리턴하는 함수가 여기서 클로져
        //debugger;
        //this();//==print_banana라는 window를 가르키는 this
        //self.call(context); //call은 가변적, 배열이 전달
        //self.apply(context,arguments) //배열을 나눠서
        self.apply(context,args.concat([...arguments]))
    };
}

var print_banana = print.bind({name:"banana"},"e","data","title");

var print_banana = print.bind({ name: "banana" });
print_banana.call({ name: "apple" });	//banana

//들어오는 모든 변수를 넣을 때
function print(){
    [].slice.call(arguments).forEach(element =>{
        console.log(element);
    });
}

/*
function bind(context){
    var newFunction=function(){};
    return newFunction();
}

var fn = bind(window);
//var fn = bind({a:123});

fn()
*/
//------------------------------------------------
//prototype

var obj={};
for(var p in e.prototype){
    obj[p]=e.prototype[p];
}
return obj;

function e(name){
    this.name = name;
    console.log(this.name);
}//this를 리턴

//e 향한 링크(참조)
var arr = new e(1);
e(2);
arr.__proto__ = e.prototype; //true

//__proto__ : 자기의 계층, 원형, 부모

//펑션에 속성두가지 - 프로퍼티, 프로토타입
//프로퍼티 - a.test = 1; static, 언제든 참조가능, 인스턴스로는 안됨.
//프로토타입은 인스턴스를 통해서만 호출가능
//프로토타입체인을 통해서 OOP를 구현가능

//일반적인 상속의 개념
function e(name){}

function klass(parent,prototype){
    var fn =  function(){
        if(this.init){
            this.init().apply(this, arguments); //User에서 초기화
        }
    }
    if(parent){
        fn.prototype=new parent();
    }
    for(var proto in prototype){
        fn.prototype[proto]=prototype[proto];
    }
    return fn;
}

var e = klass(null,{
    setName:function(name){
        this.name = name;
    },
    print:function(){
        console.log("e - " + this.name);
    }
});

e.prototype.setName=function(name){
    this.name = name;
}

e.prototype.print=function(){
    console.log("e - " + this.name);
}

function User(){}

//new 00의 프로토타입을 리턴한다.
User.prototype = new e();
User.prototype.print = function(){
    e.prototype.print.call(this,arguments);
    console.log(this.name);
}

var User = klass(e,{
    init:function(name){
        this.name=name;
    },
    print:function(){
        e.prototype.print.apply(this,arguments);
        console.log(this.name);
    }
})

var user1 = new User("e");//User를 거쳐 klass함수가 호출됨
var user2 = new User("3count");

user1.setName("e");
user1.print();
//user1.__proto__ === User.prototype
//true
//User.prototype.__proto__ === e.prototype
//true

User.prototype.print = function(){console.log("user : "+this.name)}

//스코프체인 - 식별자를 찾아내는 체인
//프로토타입체인 - 프로퍼티를 찾아내는 체인

User.prototype.name = "aa";
user2.name;
//"aa"
//user2레벨에서 프로퍼티가 없기에 상위에가서 찾아서 User.prototype에서 찾음.
//**공유가 가능하다
//-----------------------------------------------------------------------------

//비동기

function a(){
    console.log("a");
}
function b(){
    console.log("b");
}
function c(){
    console.log("c");
}
function callback(cb){
    console.log("callback");
    cd();
}
a();
callback(b);
c();
//a -> callback -> b -> c


function a(){
    console.log("a");
}
function b(){
    console.log("b");
}
function c(){
    console.log("c");
}
function callback(cb){
    console.log("callback");
    $.ajax({
        success: function(){
            cb();
        }
    })
}
a();
callback(b);
c();
//a -> callback -> c -> b

function a(){
    console.log("a");
}
function b(){
    console.log("b");
}
function c(){
    console.log("c");
}
function callback(cb){
    console.log("callback");
    setTimeout(function(){
        cb();
    },0);
}
a();
callback(b);
c();
//a -> callback -> c -> b

function a(){
    console.log("a");
}
function b(){
    console.log("b");
}
function c(){
    console.log("c");
}
function callback(cb){
    console.log("callback");
    setTimeout(function(){
        cb();
        if(cb2){
            cb2();
        }
    },0);
}
a();
callback(b,function(){
    c();
});
//순서를 지키기위해 콜백속 콜백
//무식한 방법.
//a -> callback -> b -> c


function a(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("a");
            resolve()
            //reject를 씀으로 실패라고 전달도 가능
        },0);
    })
    
    //return Promise.resolve();
}
function b(){
    console.log("b");
    return Promise.resolve();
    //실행하자마자 패스(성공)
}
function c(){
    console.log("c");
    return Promise.resolve();
}
function callback(cb){
    console.log("callback");
    return new Promise(function(resolve){
        setTimeout(function(){
            cb();
            resolve()
        },0);
    })
}

Promise.resolve()
    .then(a)
    .catch(function(){

    })
    .then(function(){
        callback(b)
    })
    .then(c);

a();
callback(b);
c();
//a -> callback -> b -> c
//폴리필 - 객체를 사용하기위해 선언(?)해주는거
//3가지 상태 - wait(펜딩(?)), dom(resolve), error(reject)
//reject일시 가까운 다음 catch로 이동
//async
