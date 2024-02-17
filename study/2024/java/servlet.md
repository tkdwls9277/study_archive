# Servlet

    클라이언트의 요청을 처리하고, 그 결과를 반환하는 Java 의 동적 웹 프로그래밍 기술이다.

![](images/servlet1.png)

기본적으로 Servlet 은 CGI 와 기술 체계가 매우 유사하다. CGI 가 기존 요청에 대해 프로그램을 실행하는 방식이라면, Servlet 는 요청별로 새로운 Servlet 을 실행하는 방식이다. 단, Servlet 은 컨테이너를 통해 개별적으로 Servlet 의 생명주기를 관리한다는 점이 다르다.

![](images/servlet2.png)

## 특징

Servlet 은 다음과 같은 3가지 메서드를 가지고 있다.

- init() : Servlet 인스턴스를 생성한다.
- service() : Servlet 의 기능을 수행하는 메서드로, HTTP Method 에 따라, doGet(), doPost(), doPut(), doDelete() 등의 메서드들이 호출된다. 개발자는 해당 요청을 알맞게 연결한 후, doXXX() 메서드를 오버라이드하여, 응답할 컨텐츠를 구현해야 한다.
- destroy() : Servlet 인스턴스를 종료한다.


실질적으로 개발자는 xml 파일에, 구현한 인스턴스를 등록하여 언어에게 이를 알리고, Servlet 별로, 요청에 따른 응답을 구현하면, 요청 시 서버에서 이를 알아서 호출하여 적절한 동적 컨텐츠가 반환되도록 하는 것이다.


추후 등록과정은 @WebServlet 어노테이션을 사용하는 것으로 web.xml 에 설정이 더욱 간소화된다.

<br>

## Dispatcher Servlet

Servlet 에 각기 다른 Servlet 에 대한 요청이 동시에 들어오는 경우, 스레드별로 Servlet 인스턴스가 생성되어 요청을 수행하는 멀티 스레딩이 이루어진다. 멀티스레딩 자체의 위험성도 존재하지만, 서블릿 별로 공통적으로 수행하는 로직이 중복된다는 단점이 존재했다.

추후 이 문제를 보완하여, 기존 공통처리 사항을 위한 Controller 를 따로 설계한 것이 FrontController 패턴이다.

![](images/servlet3.png)

### 프론트 컨트롤러 패턴

MVC 디자인 패턴을 기반으로, 서버에 대한 모든 요청을 일괄적으로 처리하도록 구성한 설계를 의미한다. 기존에는 Controller(Servlet) 별로, 요청, 기능 구현, 클라이언트에게 응답을 모두 관리했다면, FrontController 에게 요청, 클라이언트에게 응답 부분을 위임하는 것으로 더욱 효율적인 서버 운영이 가능했다.

<br>

## DispatcherServlet

Spring MVC 에서 FrontController 의 역할을 수행하는 Servlet 을 의미한다. DispatcherServlet 은 기존 FrontController 와 동일하게 Servlet 의 공통영역을 처리하는 것은 물론, 각각의 Controller(Servlet) 의 결과정보를 기반으로, ViewResolver 를 통해 동적 페이지를 생성하여 결과를 반환하도록 해준다.

![](images/servlet4.png)