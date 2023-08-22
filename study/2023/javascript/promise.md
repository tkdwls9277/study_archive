# Promise

-   [참고 자료(poiemaweb)](https://poiemaweb.com/es6-promise)

자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다. 하지만 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다.

ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프로미스(Promise)를 도입했다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

-   콜백 헬

```js
step1(function (value1) {
    step2(value1, function (value2) {
        step3(value2, function (value3) {
            step4(value3, function (value4) {
                step5(value4, function (value5) {
                    // value5를 사용하는 처리
                });
            });
        });
    });
});
```

<br/><br/>

---

<br/><br/>

## 프로미스의 생성

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state) 정보를 갖는다.

| 상태      | 의미                                       | 구현                                               |
| --------- | ------------------------------------------ | -------------------------------------------------- |
| pending   | 비동기 처리가 아직 수행되지 않은 상태      | resolve 또는 reject 함수가 아직 호출되지 않은 상태 |
| fulfilled | 비동기 처리가 수행된 상태 (성공)           | resolve 함수가 호출된 상태                         |
| rejected  | 비동기 처리가 수행된 상태 (실패)           | reject 함수가 호출된 상태                          |
| settled   | 비동기 처리가 수행된 상태 (성공 또는 실패) | resolve 또는 reject 함수가 호출된 상태             |

Promise 생성자 함수가 인자로 전달받은 콜백 함수는 내부에서 비동기 처리 작업을 수행한다. 이때 비동기 처리가 성공하면 콜백 함수의 인자로 전달받은 resolve 함수를 호출한다. 이때 프로미스는 ‘fulfilled’ 상태가 된다. 비동기 처리가 실패하면 reject 함수를 호출한다. 이때 프로미스는 ‘rejected’ 상태가 된다.

```js
const promiseAjax = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
            // 서버 응답 완료가 아니면 무시
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status >= 200 && xhr.status < 400) {
                // resolve 메소드를 호출하면서 처리 결과를 전달
                resolve(xhr.response); // Success!
            } else {
                // reject 메소드를 호출하면서 에러 메시지를 전달
                reject(new Error(xhr.status)); // Failed...
            }
        };
    });
};
```
