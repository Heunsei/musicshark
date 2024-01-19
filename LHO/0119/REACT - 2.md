# REACT - 2

설명: props / class / import & export / router / useParams

# 1. Props

- 부모 컴포넌트의 정보를 자식에게 넘겨줄 때 사용.

```jsx
function App (){
  let [name, setName] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  return (
    <div>
      <Modal name={name} ></Modal>
    </div>
  )
}

function Modal(props){
  return (
		props.name.map((a) => {
			<div className="modal">
        <h4>{ a }</h4>
      </div>
			})
  )
}
```

```jsx
// style 속성을 이렇게 넣어줄 수 있음
function Modal(props){
  return (
    <div className="modal" style={{ background : props.color }}>
      <h4>{ props.name[0] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
```

# 2. class 문법

```jsx
class Modal2 extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div>안녕</div>
    )
  }
}
```

- extends는 기존 class 안에 있던 변수,함수를 복사해주는 문법
    - React.Component라는 class안에 있는 변수와 함수들을 복사해야 컴포넌트라 인정해주기 때문에, class ~~ extends React.Component라고 쓰는것.

```jsx
class Modal2 extends React.Component {
  constructor(){
    super();
    this.state = {
      name : 'kim',
      age : 20
    }
  }

  render(){
    return (
      <div>안녕 { this.state.age }
        <button onClick={()=>{ this.setState({age : 21}) }}>버튼</button>
      </div>
    )
  }
}
```

- props 전달

```jsx
class Modal2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : 'kim',
      age : 20
    }
  }

  render(){
    return (
      <div>안녕 { this.props.프롭스이름 }</div>
    )
  }
}
```

### 이상한 팁

```jsx
// public 폴더에 있는 이미지 사용
<img src={process.env.PUBLIC_URL + '/logo192.png'} />
```

2-3부터 정리해야함

# 3. import & export

- import / export 문법

```jsx
// (data.js 파일)

var name1 = 'Kim';
var name2 = 'Park';
export { name1, name2 }

// (App.js 파일)

import { name1, name2 } from './data.js';
```

# 4. REACT - ROUTER - DOM

```bash
npm install react-router-dom@6
```

- index.js가서 설정

```jsx
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
```

- App.js

```jsx
import { Routes, Route, Link } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Routes>
      <Route path="/detail" element={ <div>상세페이지임</div> } />
      <Route path="/about" element={ <div>어바웃페이지임</div> } />
    </Routes>
  )
}
```

1. 상단에 컴포넌트들을 import 해오고
2. <Routes> 만들고 그안에 <Route>를 작성
3. <Route path=”/url경로” element={<보여줄html>/} 

```jsx
// 각각의 경로로 이동하는 링크생성
<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
```

```jsx
// page 이동기능 만들고 싶으면 useNavigate() 사용하자
function App(){
  let navigate = useNavigate()
  
  return (
    (생략)
    <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
  )
}
// 숫자 1 넣으면 앞으로 한번가기 
// 숫자 -1 넣으면 뒤로 한번가기
// 404 page같은거 보여줄때
<Route path="*" element={ <div>없는페이지임</div> } />
```

```jsx
// 서브경로 만들 수 있는 nested routes
<Route path="/about" element={ <About/> } >  
  <Route path="member" element={ <div>멤버들</div> } />
  <Route path="location" element={ <div>회사위치</div> } />
</Route>
```

```jsx
// about 안에 무엇을 보여줄지 표기해야함
// 그것이 outlet
function About(){
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  )
}
```

### useParams()

```jsx
// 페이지 여러개 만들고 싶을때쓰는 url 파라미터 문법
<Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
```

```jsx
import { useParams } from 'react-router-dom'

function Detail(){
  let {id} = useParams();
  console.log(id)
  
  return (
    <div className="container>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[0].content}</p>
        <p>{props.shoes[0].price}원</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
  </div>
  )
}
```

- useParams()
    - /:url파라미터 자리에 유저가 입력한 값을 가져올 수 있음
    - detail/1 에 접속하면 id에 1이 들어옴
    - detail/:id/:difn 이렇게도 쓸 수 있음