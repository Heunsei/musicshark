### 2024-01-18

#### HTTP vs WebSocket

<img src="./httpVSwebsocket_01.png">

* HTTP<br>

클라이언트 (request) ↔ 서버 (response) 가 번갈아서 발생.<br>

Stateless하다는 특징을 갖고 있어, 서버는 클라이언트를 기억하지 못하므로 로그인 유지와 같은 기능이 필요할 시, cookie를 서버에게 보내는 방식으로 유지하여야 한다.



* WebSocket

클라이언트가 서버에게 요청하면 서버는 수락 혹은 거부를 한다.<br>
서버가 수락한다면 클라이언트와 서버는 연결(connection)되어 연결을 끊기 전까지 원하는대로 request와 response를 주고받을 수 있다.<br>



---

#### SocketIO vs Websocket
SocketIO는 실시간 웹 애플리케이션을 위한 이벤트 기반 라이브러리이며, websocket의 부가기능이 아니다.
websocket은 SocketIO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나다.

A 라는 브라우저가 websocket을 지원하지 않는다고 하여도 socketIO는 작동한다.