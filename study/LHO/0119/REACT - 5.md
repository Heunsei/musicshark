# REACT - 5

설명: React-query

### 설치

```jsx
// 설치
npm install react-query
```

```jsx
// index.js
import { QueryClient, QueryClientProvider } from "react-query"  //1번
const queryClient = new QueryClient()   //2번

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>  //3번
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
// App.js 가서
import { useQuery } from 'react-query';

function App(){
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )

  return (
    <div>
      { result.isLoading && '로딩중' }
      { result.error && '에러남' }
      { result.data && result.data.name }
    </div>
  )
}
```

- result라는 변수에 ajax 현재 상태가 알아서 저장됨
    - 로딩중일땐 result.isLoading > true
    - ajax요청이 실패하면 result.error > true
    - ajax요청이 성공시엔 [result.data](http://result.data) 안에 데이터가 들어옴
    - { result.isLoading  ? ‘로딩중’ : result.data} 이렇게 쓸수있지 않을까?
        - ‘로딩중’ 이 아니라 컴포넌트를 띄워줄 수도 있을듯
- 장점
    1. 틈만나면 알아서 ajax재요청(페이지 체류 후 시간경과, 다시돌아오거나 할때)
        1. {staleTime: 2000} 시간 설정 가능 자세한건 검색 ㄱ
    2. 실패해도 알아서 재시도
    3. ajax로 가져온 결과는 state 공유가 필요없음
- 정리
    - react-query가 주장하는 장점은 server-state (DB 데이터)를 프론트엔드에서 실시간 동기화해주는걸 도와준다고 함
    - 근데 ajax 요청을 몇초마다 계속 날려서 가져오는 방식이라 http1을 쓰는 서버나 브라우저라면 좀 비효율적일 수도 있다.
    - 실시간으로 서버에서 데이터를 자주 보내려면 웹소켓이나 server-sent events 같은 가벼운 방식들도 있음.
    - 그래서 react-query는 ajax 관련 기능개발 편하게 할 수 있는데에 의의가 더 있다.
    - 근데 http2나 3을 지원하는 브라우저나 서버를 이용한다면 GET POST 요청 자주해도 서버 부담이 적을 수 있어서 상관없을듯요