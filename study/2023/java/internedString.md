# Interned String

    자바(Java)의 문자열(String)은 불변(immutable)하다. String의 함수를 호출을 하면 해당 객체를 직접 수정하는 것이 아니라, 함수의 결과로 해당 객체가 아닌 다른 객체를 반환한다. 그러나 항상 그런 것은 아니다.

```java
public void func() {
    // toUpperCase 함수는 lower case의 문자가 발견되지 않으면 기존의 객체를 반환한다.
    String haribo1st = new String("HARIBO");
    String copiedHaribo1st = haribo1st.toUpperCase();

    System.out.println(haribo1st == copiedHaribo1st); // true
}
```

```java
public void func() {
    //생성자를 통해 선언하게 되면 같은 문자열을 가진 새로운 객체가 생성된다. 즉, 힙(heap)에 새로운 메모리를 할당하는 것이다.
    String haribo1st = new String("HARIBO");
    String haribo3rd = "HARIBO";

    System.out.println(haribo1st == haribo3rd); // false
    System.out.println(haribo1st.equals(haribo3rd)); // true
}
```

```java
public void func() {
    // JVM에서 constant pool을 통해 문자열을 관리하고 있다. 리터럴로 선언한 문자열이 constant pool에 있으면 해당 객체를 바로 가져온다. 만약 pool에 없다면 새로 객체를 생성한 후, pool에 등록하고 가져온다. 이러한 플로우를 거치기 때문에 "HARIBO"로 선언한 문자열은 같은 객체로 나오는 것이다.
    String haribo3rd = "HARIBO";
    String haribo4th = String.valueOf("HARIBO");

    System.out.println(haribo3rd == haribo4th);
    System.out.println(haribo3rd.equals(haribo4th));
}
```
