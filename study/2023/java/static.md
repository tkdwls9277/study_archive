# 정적변수/메소드(static)

## static이란?

java에서 static 키워드를 사용하면 메모리에 한번 할당되어 프로그램이 종료될 때 없어지는 것을 의미한다.

> class 생성 -> static 영역에 생성
> new 연산을 통해 생성한 객체 -> heap 영역에 할당

이러한 이유 때문에 string 클래스의 비교를 동등연산자(=,!=)이 아닌 equal()을 통해 하는 것이다. 스택에서 클래스의 주소를 가리키기 때문에 같은 문자열이더라도 동등연산자를 사용하면 다르다고 나온다.
객체의 생성시 할당된 heap 영역의 메모리는 GC(garbage Collector)를 통해 수시로 관리를 받는다. 하지만 static 영역에 할당된 메모리는 모든 객체가 공유하는 메모리라는 장점이 있지만 GC가 관리해주지 않기 때문에 static을 자주 사용하면 프로그램의 메모리 효율이 떨어지게 되며 시스템의 퍼포먼스에 악영향을 준다.

<br /><br />

---

<br /><br />

## static 변수
  메모리에 고정적으로 할당되어 프로그램이 종료될 때 해제되는 변수/메소드


static 변수는 클래스 변수이다. 객체를 생성하지 않고도 static 자원에 접근이 가능하다. 메모리에 한번 할당이 되므로 여러 객체를 생성해도 해당 메모리를 공유하게 된다.
하나의 클래스에서 100개의 인스턴스를 만드는 경우 그 안에서 메모리가 중복해서 생성이 될 것이다. 같은 값인 경우 여러 객체가 그냥 하나의 메모리를 참조하게 하면 메모리 낭비가 없어질 것이다. public/final과 함께 사용된다.

<br /><br />

---

<br /><br />


## static 메소드
  
- static method는 객체의 생성 없이 호출이 가능하고 객체에서는 호출이 불가능하다.

  대표적인 예로 Math 객체가 있다. Scanner 객체는 import를 해줘야 사용이 가능한데 반해 Math는 import를 해주지 않아도 바로 사용이 가능한 점이 대표적인 특성이다.

- static 메소드에서는 static이 선언되지 않은 변수에 접근이 불가능하다.
  
  객체를 생성하지 않고 static 메소드를 이용하기 때문에 할당되지 않은 메모리 영역에 접근을 해서 오류가 나는 것이다. 따라서 static 변수에 접근 하기 위한 메소드는 반드시 static 메소드가 되어야 한다.

```java
public class Example{
  public String test1 = "hello";
  public static String test2 = "world";

  public static void printName(){
    System.out.println(this.test1); // error
    System.out.println(this.test2);
  }
}
/*Example의 test1은 Example example = new Example();을 이용해서 객체를 생성해준다. 생성과 동시에 test1이 메모리에 할당되는 것이다. 하지만 위의 코드에서는 객체를 생성하지 않고 static메소드를 이용하기 때문에 할당되지 않은 메모리 영역에 접근을 해서 오류가 발생한다.*/
```

<br /><br />

---

<br /><br />

## static 변수와 메소드 활용

- 일반적으로 상수들만 모아서 사용하며 대문자와 '_'를 조합하여 이름을 짓는다.
- 상속을 방지하기 위해 final class로 선언을 한다.

```java
public final class Apllication{
  puclic static final String Test = "Hello World";
}
```