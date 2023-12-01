# Record

Java 14버전부터 도입되고 16부터 정식 스펙에 포함된 Record는 class처럼 타입으로 사용이 가능하다.

객체를 생성할 때 보통 아래와 같이 개발자가 만들어야한다.

```java
public class Person {
   private final String name;
   private final int age;

   public Person(String name, int age) {
      this.name = name;
      this.age = age;
   }

   public String getName() {
      return name;
   }

   public int getAge() {
      return age;
   }
}

// 클래스 Person 을 만든다.
// 필드 name, age를 생성한다.
// 생성자를 만든다.
// getter를 구현한다.
```

보통 Entity나 DTO 구현에 있어서 많이 사용하는 형식이다.

이를 Record 타입의 클래스로 만들면 상당히 단순해진다.

```java
public record Person(
	String name,
    int age
) {}
```

자동으로 필드를 private final 로 선언하여 만들어주고, 생성자와 getter까지 암묵적으로 생성된다. 또한 equals, hashCode, toString 도 자동으로 생성된다고 하니 매우 편리하다.

대신 getter 메소드의 경우 구현시 getXXX()로 명칭을 짓지만, 자동으로 만들어주는 메소드는 name(), age()와 같이 필드명으로 생성된다.
