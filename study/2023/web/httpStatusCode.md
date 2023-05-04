# status code

[HTTP 상태코드 | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)  
[HTTP 상태코드 | WIKI](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)

사용자가 웹 브라우저를 통해 웹 서버에 어떠한 요청을 할 경우, 웹 서버는 요청에 대한 응답으로 아래와 같은 HTTP 상태 코드를 나타낸다. 응답은 HTTP 요청이 성공했는지 실패했는지를 서버에서 알려주는 코드에 따라 5개의 그룹으로 나누어진다.

## Information : 100번대(정보 응답)

| 코드 | 설명                                                                                         |
| ---- | -------------------------------------------------------------------------------------------- |
| 100  | Countinue : 서버가 request 헤더는 받았고, 클라이언트가 request 바디 부분을 보내고 있는 상태  |
| 101  | Switching Protocols : 요청자가 서버에게 Switching Protocol을 묻는 상태                       |
| 102  | Processing : 요청자에 의해 서버가 요청을 수신하였으며 이를 처리했지만, 응답이 없는 상태      |
| 103  | Checkpoint : 중단된 Put과 Post 요청을 재개할 목적으로 되찾을 수 있는 request를 사용하는 상태 |

<br /><br />

---

<br /><br />

## Successful : 200번대(성공 응답)

| 코드 | 설명                                                                                                                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | OK : 에러 없이 전송이 성공된 상태                                                                                                                                                          |
| 201  | Created : request가 되었고, 새로운 자원이 만들어진 상태                                                                                                                                    |
| 202  | Accepted : 서버가 request를 전송받았으나 현재 완전하게 처리되진 않은 상태                                                                                                                  |
| 203  | Non-Authoritative Information : 서버가 클라이언트 요구 중 일부만 전송한 상태                                                                                                               |
| 204  | No Content : 서버가 클라이언트 요구를 처리했으나 전송할 데이터가 없는 상태                                                                                                                 |
| 205  | Reset Content : No Content 상태라서 요청자의 document view의 reset이 필요한 상태                                                                                                           |
| 206  | Partial Content : 클라이언트의 header 범위 문제로 서버가 자원 일부만 전달받은 상태                                                                                                         |
| 207  | Multi-Status : 멀티-상태 응답은 다수의 리소스가 여러 개의 상태 코드인 상황이 적절한 경우에 해당하는 정보를 서비스에 전달한 상태                                                            |
| 208  | Multi-Status : 멀티-상태 응답 DAV에서 사용, propstat(property와 status의 합성어) 응답 속성으로 동일 컬렉션으로 바인드된 복수의 내부 멤버를 반복적으로 열거하는 것을 피하려고 사용하는 상태 |
| 226  | IM Used : 서버가 GET 요청에 대한 리소스를 처리했으며, 응답이 하나 또는 그 이상의 인스턴스 조작이 현재 인스턴스에 적용이 되었음을 알리는 상태                                               |

<br /><br />

---

<br /><br />

## Redirection : 300번대(리다이렉션 응답)

| 코드 | 설명                                                                                                                                                       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 300  | Multiple Choices : 최대 다섯 개의 링크를 골라서 이동할 수 있는 상태                                                                                        |
| 301  | Moved Permanently : 요청된 페이지가 새 URL로 옮겨진 상태                                                                                                   |
| 302  | Found : 요청된 페이지가 일시적으로 새 URL로 옮겨진 상태                                                                                                    |
| 303  | See Other : 요청된 페이지는 다른 URL에서 찾을 수 있는 상태                                                                                                 |
| 304  | Not Modified : 마지막 요청 이후 수정되지 않은 상태                                                                                                         |
| 305  | Use Proxy : location field에 proxy의 URL을 사용하는 상태                                                                                                   |
| 306  | Switch Proxy : 사용하지 않는 코드(Unused)                                                                                                                  |
| 307  | Temporary Redirect 302 Found HTTP 응답 코드와 동일한 의미가 있으며, 사용자 에이전트가 반드시 사용된 HTTP 메소드를 변경하지 말아야 하는 점만 다른 상태      |
| 308  | Permanent Redirect 301 Moved Permanently HTTP 응답 코드와 동일한 의미가 있으며, 사용자 에이전트가 반드시 HTTP 메소드를 변경하지 말아야 하는 점만 다른 상태 |

<br /><br />

---

<br /><br />

## Client Error : 400번대(클라이언트 에러 응답)

| 코드 | 설명                                                                                                                                                                       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request : 요청사항에 문법적인 오류가 있어서 서버가 이해할 수 없는 상태                                                                                                 |
| 401  | Unauthorized : 해당 요청에 대한 권한이 없는 상태                                                                                                                           |
| 402  | Payment Required                                                                                                                                                           |
| 403  | Forbidden : 금지된 요청을 허가하지 않는 상태                                                                                                                               |
| 404  | Not Found : 요청한 페이지를 찾을 수 없는 상태                                                                                                                              |
| 405  | Method Not Allowed : request에 명시된 요청 Method가 제공되지 않은 상태                                                                                                     |
| 406  | Not Acceptable : request에서 accept header에 not acceptable의 내용을 가진 자원을 요청한 상태                                                                               |
| 407  | Proxy Authentication Required : 프록시 서버에게 해당 요청이 수행되도록 인증받아야 하는 상태                                                                                |
| 408  | Request Timeout : 요청 대기 시간이 지난 상태                                                                                                                               |
| 409  | Conflict : request 충돌로 인해서 요청이 완료되지 않은 상태                                                                                                                 |
| 410  | Gone : 요청 페이지는 더 이상 사용할 수 없는 상태                                                                                                                           |
| 411  | Length Required : Content-Length 부분이 빠져서 요청을 허가하지 않은 상태                                                                                                   |
| 412  | Precondition Failed : request 헤더 필드에 선결 조건에 대한 값이 서버에서 false가 나온 경우                                                                                 |
| 413  | Request entity too large : 요청 엔티티를 서버가 처리하기에 너무 큰 상태                                                                                                    |
| 414  | Request-URI Too Long : 요청 URI가 너무 긴 상태                                                                                                                             |
| 415  | Unsupported Media Type : 지원하지 않는 미디어 타입을 요청한 상태                                                                                                           |
| 416  | Requested Range Not Satisfiable : 클라이언트가 파일 일부를 요청했을 때 서버가 지원하지 않는 상태                                                                           |
| 417  | Expectation Failed : Expect request-header 필드의 요구를 서버가 충족시킬 수 없는 상태                                                                                      |
| 421  | Misdirected Request : 서버로 유도된 요청 응답을 서버에서 생성할 수 없는 상태                                                                                               |
| 422  | Unprocessable Entity : 요청은 잘 전달 됐지만, 문법 오류가 난 상태                                                                                                          |
| 423  | Locked : 요청한 리소스에 접근하는 것이 잠겨있는 상태                                                                                                                       |
| 424  | Failed Dependency : 이전의 요청이 실패한 상태에서 지금의 요청도 실패한 상태                                                                                                |
| 426  | Upgrade Required : 클라이언트에서 보낸 요청의 프로토콜이 맞지 않아 현재 서버에서 처리할 수 없으나, 클라이언트가 다른 프로토콜로 업그레이드한다면 처리의 가능성이 있는 상태 |
| 428  | Precondition Required : 요청이 조건부여야 하는 상태                                                                                                                        |
| 429  | Too Many Requests : 사용자가 지정된 시간에 너무 많은 요청을 보낸 상태                                                                                                      |
| 431  | Request Header Fields Too Large : 요청한 헤드 필드가 너무 커서 서버에서 처리하지 않는 상태                                                                                 |
| 451  | Unavailable For Legal Reasons : 정부에 의해 검열된 웹 페이지와 같은 불법적인 리소스를 요청하여 거부된 상태                                                                 |

<br /><br />

---

<br /><br />

## Server Error : 500번대(서버 에러 응답)

| 코드 | 설명                                                                                                                                                                  |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 500  | Internal Server Error : 일반적인 서버 에러 메세지로 요청 사항을 이행할 수 없는 상태                                                                                   |
| 501  | Not Implemented : 서버가 해당 요청 메소드를 인식 못 하거나, 이행할 능력이 없는 상태                                                                                   |
| 502  | Bad Gateway : 게이트웨이나 프록시의 상태가 나쁘거나 과부하인 상태                                                                                                     |
| 503  | Service Unavailable : 일시적인 과부하나 서비스 중단 상태(임시 조건에 사용되어야 하며, Retry-After: HTTP 헤더는 가능하면 서비스를 복구하기 전 예상 시간을 포함해야 함) |
| 504  | Gateway Timeout : 과부하 등의 이유로 게이트웨이나 프록시의 한계 대기 시간이 지난 상태                                                                                 |
| 505  | HTTP Version Not Supported : request에서 사용한 HTTP 프로토콜을 서버가 지원하지 않는 상태                                                                             |
| 506  | Variant Also Negotiates : 서버 내부 구성에 오류가 있어 반환되는 값에 콘텐츠 협상이 순환 참조로 이루어져 있는 상태                                                     |
| 507  | Insufficient Storage : 서버 내부에 구성 오류가 있어 선택된 리소스는 투명한 콘텐츠 협상에 참여하도록 구성되므로 협상 과정에서 적절한 끝점이 아님을 알려주는 상태       |
| 508  | Loop Detected : 서버가 요청을 처리하는 동안 무한 루프를 감지한 상태                                                                                                   |
| 510  | Not Extended : 서버가 요청을 처리할 때 요청에 대한 추가 확장이 필요한 상태                                                                                            |
| 511  | Network Authentication Required : 클라이언트의 접근을 위한 네트워크 인증이 필요한 상태                                                                                |
