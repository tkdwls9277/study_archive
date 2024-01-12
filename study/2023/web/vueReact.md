# Vue.js & React

## 개발 CLI

- Vue.js : vue-cli
- React : create-react-app

## CSS 파일 존재 유무

- Vue.js : 없음. style이 실제 컴포넌트 파일 안에서 정의됨
- React : 파일이 존재. 해당 파일을 통해 style 적용

## 데이터 변이

- Vue.js : 반드시 데이터 객체를 생성한 이후 data를 업데이트 할 수 있음
- React : state 객체를 만들고, 업데이트에 조금 더 작업이 필요

```
name: kim 값을 lee로 바꾸려면
Vue.js : this.name = 'lee'
React : this.setState({name:'lee'})
```

Vue에서는 data를 업데이트할 때마다 setState를 알아서 결합해준다.
