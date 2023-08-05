# 동기 && 비동기

## 동기식 처리 모델(Synchronous processing model)

-   직렬적으로 태스크(task)를 수행한다. 즉, 태스크는 순차적으로 실행되며 어떤 작업이 수행 중이면 다음 작업은 대기하게 된다.

```js
function func1() {
    console.log("func1");
    func2();
}

function func2() {
    console.log("func2");
    func3();
}

function func3() {
    console.log("func3");
}

func1();
```

<br /><br />

---

<br /><br />

## 비동기식 처리 모델(Asynchronous processing model 또는 Non-Blocking processing model)

병렬적으로 태스크를 수행한다. 즉, 태스크가 종료되지 않은 상태라 하더라도 대기하지 않고 다음 태스크를 실행한다. 예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청한 이후 서버로부터 데이터가 응답될 때까지 대기하지 않고(Non-Blocking) 즉시 다음 태스크를 수행한다. 이후 서버로부터 데이터가 응답되면 이벤트가 발생하고 이벤트 핸들러가 데이터를 가지고 수행할 태스크를 계속해 수행한다.

자바스크립트의 대부분의 DOM 이벤트 핸들러와 Timer 함수(setTimeout, setInterval), Ajax 요청은 비동기식 처리 모델로 동작한다.

```js
function func1() {
    console.log("func1");
    func2();
}

function func2() {
    setTimeout(function () {
        console.log("func2");
    }, 0);

    func3();
}

function func3() {
    console.log("func3");
}

func1();
```
