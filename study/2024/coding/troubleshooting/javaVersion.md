# 스프링부트 3.0 이상에서 빌드가 되지 않는 현상

```
incompatible because this component declares a component for use during compile-time, compatible with java 17 and the consumer needed a component for use during runtime, compatible with java 11
```

이 문제의 해결책으로 스프링 부트 2.7.x 로 다운그레이드 하면된다는 글도 있는데 3.0 이상을 사용한다는 전제하에 해결법을 정리한다.

## 1. java version

스프링부트 3.0 이상에서는 자바 17버전 이상으로만 호환된다.

```bash
java --version
```

## 2. build.gradle

해당 프로젝트의 sourceCompatibility 가 17이상으로 되어있는지 확인한다.

## 3. IntelliJ

이 프로젝트를 실행하는 IntelliJ가 프로젝트를 Java 17로 실행해야만 한다.

- Gradle Build

    IntelliJ의 Preferences/Settings -> Build, Execution, Deployment -> Build Tools -> Gradle 로 이동한다. -> Gradle의 JVM이 Java 17이상인지 확인

- Project SDK
    
    File -> Project Structure.. 로 이동하여 프로젝트 SDK의 버전을 확인후 Java 17이상으로 설정

## Gradle Refresh

IntelliJ까지 설정이 모두 끝났다면 다시 Gradle Refresh를 실행