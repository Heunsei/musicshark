# REACT - 3

설명: lifecycle hook / axios / animation / Context API

# 1. lifecycle hook

```jsx
// 옛날 문법
class Detail2 extends React.Component {
  componentDidMount(){
    //Detail2 컴포넌트가 로드되고나서 실행할 코드
  }
  componentDidUpdate(){
    //Detail2 컴포넌트가 업데이트 되고나서 실행할 코드
  }
  componentWillUnmount(){
    //Detail2 컴포넌트가 삭제되기전에 실행할 코드
  }
}
```

```jsx
import {useState, useEffect} from 'react';

// 요즘 문법, 컴포넌트가 mount & update시 실행
function Detail(){

  useEffect(()=>{
    //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
    console.log('안녕')
  });
  
  return (생략)
}
```

### useEffect 안에 적은 코드는 html 렌더링 이후에 동작

- 또한 useEffect안의 코드들은 html을 보여주고 나서 실행하기 때문에 실행 시점을 조절할 수 있음

```jsx
useEffect(()=>{ 
  그 다음 실행됨 
  return ()=>{
    여기있는게 먼저실행됨
  }
}, [dependency])
```

- return안에 있는 코드들은 clean up function이라 불림
- 타이머제거, socket 연결요청제거, ajax요청 중단 이런 코드를 많이 작성
- 컴포넌트 unmount 시에도 clean up function 안에 있던게 1회 실행
- dependency에는 state를 여러게 넣을 수 있음
- dependency가 비어있다면 로드 시 1회 실행하고 실행 안해줌
- state가 있다면 []안에 있는 변수나 state가 변할때만 실행
- [  ] 이거조차 없다면 재렌더링마다 코드 실행

```jsx
// 재렌더링마다 코드실행
useEffect(()=>{ 실행할코드 })
// 컴포넌트 mount시 1회 실행
useEffect(()=>{ 실행할코드 }, [])
// 컴포넌트 unmount시 1회 실행
useEffect(()=>{ 
  return ()=>{
    실행할코드
  }
}, [])
// state1이 변경될 때만 실행
useEffect(()=>{ 실행할코드 }, [state1])
```

# 2. AJAX / axios

```bash
npm install axios
```

```jsx
import axios from 'axios'

function App(){

  let [shoes, setShoes] = useState(어쩌구);
  return (
    <button onClick={()=>{
      axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
        let copy = [...shoes, ...결과.data]
        setShoes(copy)
      })
      .catch(()=>{
        console.log('실패함')
      })
    }}>버튼</button>
  )
}
```

```jsx
// ajax요청 한번에 여러개 보낼라면
Promise.all( [axios.get('URL1'), axios.get('URL2')] )
// 둘다 완료시 특정 코드를 실행하고 싶으면 .then()을 뒤에 붙이면됨
```

- ajax로 가져온 데이터를 html에에 꽂을 때 에러나는 경우
    1. ajax요청을 가져오고 state에 저장
    2. 그 state를 html에 넣어서 보여달라고 <div> { state.ddd } </div> 이렇게 짯는데 state가 비었다고 안된대요
    3. ajax요청보다 html 요청이 빨라서 그럼
        1. → state안에 뭐가 들어있다면 보여달라고 if문 추가하자
        

# 3. animation 적용

1. 애니메이션 동작 전, 동작 후 className 만들기
2. 그 후 transition 추가

```jsx
.start {
  opacity : 0
}
.end {
  opacity : 1;
  transition : opacity 0.5s;
}
```

```jsx
function TabContent({탭}){

  let [fade, setFade] = useState('')

  useEffect(()=>{
    setTImeout(()=>{ setFade('end') }, 100)
  return ()=>{
    setFade('')
  }
  }, [탭])

  return (
    <div className={'start ' + fade}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
    </div>
  )
}
```

- fade를 뗏다가 붙였다 해야 나왔다 사라지는 듯한 효과를 줄 수 있음
- setTimeout 쓰는 이유
    - 리액트 18버전 이후 automatic batch라는 기능이 존재
    - 하나의 state를 변경하는 state함수가 연달아 여러개 있다면
    - 처리를 다~ 하고 마지막에 한번만 재렌더링 되기때문
    - flushSync() 이런거 써도 된다한다

# 4. Context API

1. createContext()로 Context1이라는 state보관함을 만들어둠

```jsx
export let Context1 = React.createContext();

function App(){
  let [재고, 재고변경] = useState([10,11,12]);

  (생략)
}
```

1. Context1로 원하는 곳을 감싸고 공유를 원하는 state를 value 안에 다 작성

```jsx
export let 재고context = React.createContext();

function App(){
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <Context1.Provider value={ {재고, shoes} }>
      <Detail shoes={shoes}/>
    </Context1.Provider>
    
  )
}
```

- Context1으로 감싼 모든 컴포넌트와 그 자식 컴포넌트 들은 state를 props 전송 없이 직접 사용가능
1. Context로 받아온거 어떻게 쓰나요

```jsx
Detail.js)

import {useState, useEffect, useContext} from 'react';
import {Context1} from './../App.js';

function Detail(){
  let {재고} = useContext(Context1)

  return (
    <div>{재고}</div>
  )
}
```

- Context를 import 해옴 ( from ‘react’ )
- let { name } = useContext(Context1)
- 단점이 조금 있음
    - state변경 시 쓸데없는 컴포넌트 까지 전부 재렌더링 되고
    - useContext()를 쓰고있는 컴포넌트는 나중에 다른 파일에 재사용 할 때, Context를 import 하는게 귀찮아 질 수 있음.