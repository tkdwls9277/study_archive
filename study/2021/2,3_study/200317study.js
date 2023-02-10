let hamster = {
    stomach: [],

    eat(food) {
        this
            .stomach
            .push(food);
    }
};

let speedy = {
    __proto__: hamster
};

let lazy = {
    __proto__: hamster
};

// 햄스터 한 마리가 음식을 찾았습니다.
speedy.eat("apple");
alert(speedy.stomach); // apple

// 이 햄스터도 같은 음식을 가지고 있습니다. 왜 그럴까요? 고쳐주세요.
alert(lazy.stomach); // apple

// -------------------------------------------------------------------------------

/*
  speedy.eat("apple");을 선언했을 때 hamster의 eat함수가 실행이 된다.
  그리고 this.stomach.push(food)를 했을때 speedy에서 찾지 못해 hamster의
  stomach에 저장이 되고 다음부터 stomach를 호출할때마다 hamster에서 찾아 접근하게 된다.
  */
let hamster = {
    stomach: [],

    eat(food) {
        // this.stomach.push 대신에 this.stomach에 할당
        this.stomach = [food];
    }
};

let speedy = {
    __proto__: hamster
};

let lazy = {
    __proto__: hamster
};

// Speedy는 음식을 발견합니다.
speedy.eat("apple");
alert(speedy.stomach); // apple

// Lazy의 stomach는 비어있습니다.
alert(lazy.stomach); // <nothing>

// -----------

let hamster = {
    stomach: [],

    eat(food) {
        this
            .stomach
            .push(food);
    }
};

let speedy = {
    __proto__: hamster,
    stomach: []
};

let lazy = {
    __proto__: hamster,
    stomach: []
};

// speedy는 음식을 발견합니다.
speedy.eat("apple");
alert(speedy.stomach); // apple

// lazy의 stomach은 비어있습니다.
alert(lazy.stomach); // <nothing>

//햄스터가 각자의 stomach를 가지게 한다면 똑같이 문제 해결 가능

// --------------------------------------------------------------------------

//구조 분해 할당(destructuring-assignment)

let arr = ["Ilya", "Kantor"]

let [firstName, surname] = arr;
//=== let [firstName, surname] = "Ilya Kantor".split(' '); 위의 것과 같은 의미.

alert(firstName); // Ilya
alert(surname); // Kantor

//할당 연산자 우측엔 모든 이터러블이 올수있음
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);


//할당 연산자 좌측엔 “할당할 수 있는(assignables)”것이면 뭐든 가능
//객체 프로퍼티도 가능
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');
alert(user.name); // Ilya

//...으로 나머지 요소 들고 오기
//들고온 나머지 요소가 저장된 변수는 배열로 저장된다.

let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar

// `rest`는 배열 입니다.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2