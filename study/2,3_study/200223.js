"use strict"

//스코프의 기초
// function outer(){
//     var count =0;
//     return{
//         increase: function(){
//             return ++count;
//         },
//         decrease: function(){
//             return --count;
//         }
//     };
// }
// var counter=outer();
// console.log(counter.increase());
// console.log(counter.increase());
// console.log(counter.decrease());

// var counter2 = outer();
// console.log(counter2.increase());

// var countFactory = (function (){
//     var staticCount = 0;
//     return function(){
//         var localCount=0;
//         return{
//             increase: function(){
//                 return{
//                     static:++staticCount,
//                     local:++localCount
//                 };
//             },
//             decrease:function(){
//                 return{
//                     static:--staticCount,
//                     local:--localCount
//                 };
//             }
//         };
//     };
// }());
// var counter = countFactory(), counter2=countFactory();
// console.log(counter.increase());
// console.log(counter.increase());
// console.log(counter2.decrease());
// console.log(counter.increase());

//렉시컬 스코프로 구현되어 글로벌 변수만 접근 가능
// var x = 1;

// function foo() {
//   var x = 10;
//   var inner = function(){
//     return x;
//   };
//   return inner();
// }

// function bar() {
//   console.log(x);
// }

// var a = foo(); 
// a();
// bar(); 

//렉시컬 변수를 합쳐 클로져식으로 만든 함수
// var x = 1;

// function foo() {
//   var x = 10;
//   function bar() {
//     console.log(x);
//   }
//   return bar;
// }
// var clo = foo();
// clo();



/**
 * 이 문제는 많이 어렵습니다. Bare minimum requirements에 해당하지 않으니,
 * 더욱 깊게 공부하고 싶으신 분들만 풀어도 좋습니다.
 * 
 * 1. spec/fixtures.js를 참고해서 테스트에서 어떤 input 값들이
 * 주어지고, 어떻게 parse해 주어야할지 생각해 보세요.
 * 
 * 2. 그냥 테스트 통과를 하고 싶으시다면, 다음과 같이 구현하면 될거예요.
 *  const parseJSON = JSON.parse;
 * 
 * 하지만 이 과제의 목적은 재귀를 공부하는 것이니, 처음부터 구현해봐야겠지요?
 */


// function parseJSON(json) {
//   // your code goes here

// };


// 계산기 만들기
// 중요도: 5
// 아래 3가지 메서드를 가진 calculator라는 객체를 만들어보세요.

// read()는 프롬프트 창에서 두 값을 보여주고 객체의 프로퍼티로 저장합니다.
// sum()은 저장된 두 값의 합을 반환합니다.
// mul()은 저장된 두 값의 곱을 반환합니다.
let calculator = {
    sum(){
        return this.a+this.b;
    },
    mul(){
        return this.a*this.b;
    },
    read(){
        this.a = +prompt("a?",0);
        this.b = +prompt("b?",0);
    }

  };
  
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );

//prompt 앞에 +기호를 붙이는건 정수를 받기위함..?

calculator = {
    sum(){
        return a + b;
    },
    mul(){
        return a * b;
    },
    read(){
        a = +prompt("a?",0);
        b = +prompt("b?",0);
    }

  };
  
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );
  //this를 뺀 값도 잘 들어가서 계산됨
  //여쭤보기


//   체이닝
// 중요도: 2
// 올라가기와 내려가기 메서드를 제공하는 객체 ladder가 있다고 합시다.
  let ladder = {
    step: 0,
    up() {
      this.step++;
    },
    down() {
      this.step--;
    },
    showStep: function() { // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
      alert( this.step );
    }
  };

  ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
//이런식으로 가능


let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep() {
      alert( this.step );
      return this;
    }
  }
  
  ladder.up().up().down().up().down().showStep(); // 1
  //return을 this로 주면 이런식으로 연이어서 사용가능. js 라이브러리에서 주로 사용.

  //Dom에 접근하는 것을 현업에서 많이 쓰게 되는건지 여쭤보기



//   toString과 valueOf는 심볼이 생기기 이전부터 존재해 왔던 “평범한” 메서드
//   이 메서드를 이용하면 "구식(old-style)"이긴 하지만 형 변환을 직접 구현할 수 있음.
//   객체에 Symbol.toPrimitive가 없으면 자바스크립트는 아래 규칙에 따라 toString이나 valueOf를 호출
  let user = {
    name: "John",
    money: 1000,
  
    // hint가 "string"인 경우
    toString() {
      return `{name: "${this.name}"}`;
    },
  
    // hint가 "number"나 "default"인 경우
    valueOf() {
      return this.money;
    }
  
  };
  
  alert(user); // toString -> {name: "John"}
  alert(+user); // valueOf -> 1000
  alert(user + 500); // valueOf -> 1500
