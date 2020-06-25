
//setTimeout
//setTimeout은 그 시간 이후에 이벤트큐에 넣는거 
// setTimeout의 콜백함수는 즉시 실행되지 않고 지정 대기 시간만큼 기다리다가 
//“tick” 이벤트가 발생하면 태스크 큐로 이동한 후 Call Stack이 비어졌을 때 Call Stack으로 이동되어 실행

//target currentTarget
//currentTarget 이벤트가 bind된 객체
//target 객체자체
//https://poiemaweb.com/js-event
//한번 더 정독하기

//--------------------------------------------------------------------------------------------------------------------

//https://poiemaweb.com/js-ajax
//한번 더 정독하기
//XMLHttpRequest.open(method, url[, async])
//method : HTTP method (“GET”, “POST”, “PUT”, “DELETE” 등)
//url : 요청을 보낼 URL
//async : 비동기 조작 여부. 옵션으로 default는 true이며 비동기 방식으로 동작한다.

fetch({
    url:"http://naver.com",
    method:"GET",
    async:"false",
    data:"user=1",
    header:{
        "context-type":"application/json",
        "x-e-user":e
    },
    success:function(result){
        console.log(result)
    },
    error:function(errorMessage){
        console.log(errorMessage)
    },
    complete:function(){
        console.log("complete");
    }
})

window.fetch = function(option){
    // var url=option.url;
    // var method=option.method;
    // var data=options.data;
    // var header=option.header;
    var {url, method, data, header}=option; //위의 코드들이 축약된 모습
    var {async, success, eroor, complete}=option;
    if(!url){
        throw "";
    }

    var xhr = new this.XMLHttpRequest();

    //header 가공
    for(var name in header){
        xhr.setRequestHeader(name, header[name]);
    }

    //data 예외처리
    if(header["context-type"] == "application/json"){
        if(data && typeof data !== "string")
        data=JSON.stringify(data);
    }

    xhr.open(method || "GET",url,async);
    xhr.send(data);
    //비동기로 동작
    //eventQuere에 존재
    xhr.onreadystatechange = function(event){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            }else{
                error(xhr.responseText);
            }
            complete();
        }
    };
};

fetch({
    success:function(){

    }
})
showTab();

fetch = function(option){
    var {url, method, async, data, header, success, error, complete}=option;
    if(!url){
        throw "";
    }

    var xhr = new this.XMLHttpRequest();
    for(var name in header){
        xhr.setRequestHeader(name, header[name]);
    }
    if(header["context-type"]=="application/json"){
        if(data && typeof data !== "string"){
            data=JSON.stringify(data);
        }
    }

    xhr.open(method ||"GET",url,async);
    xhr.send(data);
}

//----------------------------------------------------------------------------------------------

//CORS

//동일출처원칙을 우회하는 방법 1. 웹서버의 프록시 파일, 2. JSONP, 3. cross-Origin Resource Sharing
//JsonP
//캐쉬가 됨. 리소스이기 때문. 일반적으로 사용은 안함.

//----------------------------------------------------------------------------------------------

//node.js는 실행환경이다.
//node 실행
//디드라이브로 이동
//파일만들기
//npm init써서 package.json을 생성
//pakagename
//version = 2.0.0
//description = test
//entry point등등은 나중에.
//node test.js 처럼 폴더속 파일을 실행
//pakage의 script부분을 실행해줌 커맨드 생성
//npm start로 실행
//npm install json-server 등의 등록된 커맨드로 설치 가능
//npm install -g typescript 글로벌영역에 설치

//패키지 설치하는 거 3가지
//로컬, 글로벌, dev
//       -g    --save-dev

//npm install만 적어줬을때 현재폴더의 패키지를 찾아 devDependencies 들을 일괄적으로 다운

//=> 화살표함수는 아규먼트가 없음. 인스턴스를 만들수가 없음. 자기자신의 스코프가 없음.

//..rest 파라미터 es6.

//----------------------------------------------------------------------------------------------

var arr1=[1,2,3];
arr1.push(4,5,6);
//이게 가능하다는것은
Array.prototype.push=function(item,item2,item3){
    [].slice.call(arguments).forEach(function(item){
        this[this.length++]=item;        
    }),bind(this);
}
//이런식으로 구현이 되어있다


// ES5
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

// apply 메소드의 2번째 인자는 배열. 이것은 개별 인자로 push 메소드에 전달된다.
Array.prototype.push.apply(arr1, arr2);

console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]

//copy
//e 내에서는 clone이라는 Object 메소드를 만들어놓음.

var name = "e";

var obj={
    [name]:"test"
}
obj[name]="test"//변수로 프로퍼티 네임, 동적

obj.e="test"
//둘이 다름

//-------------------------------------------------------------------------------------

//모듈

(function(){
    function User(){}
    var create = 0;

    return{
        createUser:function(){
            create++;
            return new User();
        }
    }
})()//es5까지의 모듈을 지원안할때 만들던 모듈의 모양을 한 클로져
//즉시함수로 감싸서 접근하지 못하게 됨
//스코프 공유안됨
//한정적으로 사용할 수 있도록 하기 위해 return 시켜줌

// var User = function(){

// }
// var create = 0;
// const fn ={
//     createUser:function(){

//     }
// }
// export fn; //가운데 defalt를 써주면 하나만 export 가능하고 받는데서 리네임을 동시에 실행가능
//위의 모듈과 같은 역할을 함
//다른 파일에서 쓸때는
//import user from './m1';
//user.createUser();
//이런식으로 활용. export나 import같은 신택스만 지원해줌.

//----------------------------------------------------------------------------------------------

//promise 
//https://poiemaweb.com/es6-promise 읽어보기

var parser = function(response){
    try{
        var result = JSON.parse(response);
    return Promise.resolve(result);
    }catch(e){
        return Promise.reject(e);
    }
}
var parser = function(response){
    return new Promise(function(resolve, reject){
        try{
            var result = JSON.parse(response);
            resolve(result);
        }catch(e){
            reject(e);
        }
    })
}//위에랑 같은 결과값을 기대하는 코드

fetch("http://")
.then(parser)
.then(function(response){
    var result = JSON.parse(response)
})
.catch(function(error){

})

c();

window.fetch=function(url){
    return new Promise(function(resolve,reject){

        var {url, method, data, header}=option; //위의 코드들이 축약된 모습
        var {async, success, eroor, complete}=option;
        if(!url){
            throw "";
        }
    
        var xhr = new this.XMLHttpRequest();
    
        //header 가공
        for(var name in header){
            xhr.setRequestHeader(name, header[name]);
        }
    
        //data 예외처리
        if(header["context-type"] == "application/json"){
            if(data && typeof data !== "string")
            data=JSON.stringify(data);
        }
    
        xhr.open(method || "GET",url,async);
        xhr.send(data);
        //비동기로 동작
        //eventQuere에 존재
        xhr.onreadystatechange = function(event){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(xhr.responseText);
                }else{
                    reject(xhr.responseText);
                }
                complete();
            }
        };
    })
}

//------------------------------------------------------------------------------------------

//Symbol로 만들어진 프로퍼티는 for in 문에서 빠진다.
