# Casting

> 변수가 원하는 정보를 다 갖고 있는 것

```c++
int a = 0.1; // (1) 에러 발생 X
int b = (int) true; // (2) 에러 발생 O, boolean은 int로 캐스트 불가

// (1)은 0.1이 double형이지만, int로 될 정보 또한 가지고 있음

// (2)는 true는 int형이 될 정보를 가지고 있지 않음
```

<br>

## 캐스팅이 필요한 이유는?

다형성 : 오버라이딩된 함수를 분리해서 활용할 수 있다.
상속 : 캐스팅을 통해 범용적인 프로그래밍이 가능하다.

<br>

## 형변환의 종류

-   묵시적 형변환 : 캐스팅이 자동으로 발생 (업캐스팅)

    Parent p = new Child(); // (Parent) new Child()할 필요가 없음
    Parent를 상속받은 Child는 Parent의 속성을 포함하고 있기 때문

-   명시적 형변환 : 캐스팅할 내용을 적어줘야 하는 경우 (다운캐스팅)

    Parent p = new Child();
    Child c = (Child) p;
    다운캐스팅은 업캐스팅이 발생한 이후에 작용한다.
