# 이벤트 위임

하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식

```html
<h1>오늘의 할 일</h1>
<ul class="itemList">
    <li>
        <input type="checkbox" id="item1" />
        <label for="item1">이벤트 버블링 학습</label>
    </li>
    <li>
        <input type="checkbox" id="item2" />
        <label for="item2">이벤트 캡쳐 학습</label>
    </li>
</ul>
```

```js
var inputs = document.querySelectorAll("input");
inputs.forEach(function (input) {
    input.addEventListener("click", function (event) {
        alert("clicked");
    });
});
```

자바스크립트 querySelectorAll()를 이용해 화면에 존재하는 모든 인풋 박스 요소를 가져온 다음 각 인풋 박스의 요소에 클릭 이벤트 리스너를 추가
화면을 실행시키고 각 리스트 아이템의 인풋 박스(체크 박스)를 클릭하면 경고 창이 표시

```js
// 새 리스트 아이템을 추가하는 코드
var itemList = document.querySelector(".itemList");

var li = document.createElement("li");
var input = document.createElement("input");
var label = document.createElement("label");
var labelText = document.createTextNode("이벤트 위임 학습");

input.setAttribute("type", "checkbox");
input.setAttribute("id", "item3");
label.setAttribute("for", "item3");
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

새로 추가된 리스트 아이템(이벤트 위임 학습)에서 클릭 이벤트가 동작하지 않는 모습

인풋 박스에 클릭 이벤트 리스너를 추가하는 시점에서 리스트 아이템은 두 개입니다. 따라서, 새롭게 추가된 리스트 아이템에는 클릭 이벤트 리스너가 등록되지 않았죠. 이런 식으로 매번 새롭게 추가된 리스트 아이템까지 클릭 이벤트 리스너를 일일이 달아줘야 할까요?

리스트 아이템이 많아지면 많아질수록 이벤트 리스너를 다는 작업 자체가 매우 번거롭습니다. 이 번거로운 작업을 해결할 수 있는 방법이 바로 이벤트 위임(Event Delegation)입니다.

앞에서 살펴본 코드를 아래와 같이 변경

```js
var itemList = document.querySelector(".itemList");
itemList.addEventListener("click", function (event) {
    alert("clicked");
});
```

화면의 모든 인풋 박스에 일일이 이벤트 리스너를 추가하는 대신 이제는 인풋 박스의 상위 요소인 ul 태그, .itemList에 이벤트 리스너를 달아놓고 하위에서 발생한 클릭 이벤트를 감지합니다. 이 부분이 앞에서 배웠던 이벤트 버블링이죠.
