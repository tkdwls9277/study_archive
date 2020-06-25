var input = document.createElement("input");

document.body.appendChild(input);
document.getElementById("mainpage").appendChild(input);
//화면에 출력

input.type="button";
//타입을 버튼으로 바꿈

input.value="button";
//버튼 글자표시

input.onclick = function(){alert("button")};
//온클릭속성

input.className = "test";
input.id="test";
//클래스, 아이디 설정.

document.body.innerHTML
//직접 html코드를 넣을수도 있다. 다 사라질수도 있으니 주의



document.querySelector("#input_1").value
//id가 input_1인것의 value값을 들고오기
document.querySelector("#input_1").getAttribute("value")
document.querySelector("#input_1").setAttribute("value", 444)
//현재 value를 들고 오는거랑 설정되어있는 어트리뷰트를 가져오는거랑은 다르다

//testNode랑 Node는 다르다
document.body.appendChild(document.createTextNode("textsetting"))


//----------------------------------------------------------------------------
