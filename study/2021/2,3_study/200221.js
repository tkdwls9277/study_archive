//ES6
//iterable
//https://ko.javascript.info/iterable
//반복 가능한(iterable, 이터러블) 객체는 배열을 일반화한 객체
//어떤 객체에든 for..of 반복문을 적용할 수 있음

let range = {
    from: 1,
    to: 5
};
  
  // 1. for..of 최초 호출 시, Symbol.iterator가 호출
  range[Symbol.iterator] = function() {
  
    // Symbol.iterator는 이터레이터 객체를 반환
    // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작
    //    이때 다음 값도 정해짐
    return {
      current: this.from,
      last: this.to,
  
      // 3. for..of 반복문에 의해 반복마다 next()가 호출
      next() {
        // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야함
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
};
  for (let num of range) {
    alert(num); // 1, then 2, 3, 4, 5
}

  //문자열도 이터러블함 - for of를 쓸수있음 
  
  "test"[Symbol.iterator] //ƒ [Symbol.iterator]() { [native code] }

  for(var char of "test"){}
  //위 코드를 풀어 쓴다면 밑에 코드가 된다.
  
  if("test"[Symbol.iterator]){
      var a="test"[Symbol.iterator]();
      if(a.next && typeof a.next == "function"){
          var v = a.next()
          if(!v.done){
              char = v.value;
          }
      }
    }

//반복과정을 더 잘 통제할수있다


//유사배열
// 인덱스와 length프로퍼티가 있음 => 유사 배열
let arrayLike = { 
    0: "Hello",
    1: "World",
    length: 2
};
  // Symbol.iterator가 없으므로 에러 발생
  for (let item of arrayLike) {}

  //Array.from - 유사배열을 '진짜'Array로 변환
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
  
let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); 
// World (메서드가 제대로 동작합니다.)

//prototype을 쓴다면 객체에 생성됨
//prototype을 안쓰고 프로퍼티로 바로 한다면 Array에 바로 사용가능.
//Array.from()을 사용해야함.
Array.from=function(targetObject){
    var result = [];
    if(targetObject[Symbol.iterator] && 
        typeof targetObject[Symbol.iterator]=="function"){
        for(var item of targetObject){
            result.push(item);
            //result.push(fn(item));
            //두번째 인자로 함수를 받았을 경우 이런식으로 사용가능
        }
        return result;
    }
    else{ //유사배열을 리턴하는 방법
        for(var i=0,len=targetObject.length;i<len;i++){
            result.push(targetObject[i]);
        }//1번째 방법(가장 좋은 방법)
        return [...targetObject];
        //2번째 방법(안됨)
        return [].slice.call(targetObject);
        //3번째 방법
        return Array.prototype.slice.call(targetObject);
        //3번째 방법이랑 같은 코드임
        return $.makeArray(targetObject);
        return _.makeArray(targetObject);
        //4번째 방법
        return Array.prototype.slice.call(targetObject).map(fn);
        //두번째 인자로 함수를 받았을 경우 이런식으로 사용가능
        //맵으로 바로쓸수있게 더 공부하기 **
    }
}

//-------------------------------------------------------------------------

//https://ko.javascript.info/map-set
//맵, 셋
//맵은 객체를 키로도 가능.
//찾을때 객체.
//map.keys, map.values, map.entries - 이터러블객체를 반환
//맵은 삽입 순서를 기억.
//셋이 순서를 기억하지 못함.
//맵은 size같은게 존재
//객체에는 length나 size같은게 없음.

//배열에서 중복 요소 제거하기 과제 코드
Array.prototype.unique = function(arr){
    let set = new Set(arr);
    return Array.from(set);
    //return Array.from(new Set(arr)); 이거 한줄로 가능
}
