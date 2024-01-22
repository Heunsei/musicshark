# REACT - 1

Name: 총 정리
설명: className / state / component / ternary operator

# 1. 설치

```jsx
// install
npx create-react-app appName
// start
cd appName
npm start
```

# 2. className

```jsx
// App.js가 우리의 메인 페이지
import {} ~~

function App() {
	let post = '강남 우동 맛집'
	return (
		<div className = "App">
			<div> { post } </div>
			<div className={data}>안녕하세요</div>
		</div>
	)
}
```

- 클래스 name을 넣을때는 class 가 아니라 className=”” 이런식으로 넣어줘야함.
- 변수를 html에 꽂아넣고 싶으면 {중괄호} 를 사용
    - className 안에도 꽂아넣을 수 있다

```jsx
<div style={ {color : 'blue', fontSize : '30px'} }> 글씨 </div>
```

- JSX 상에서 style을 넣으려면 style = {} 안에 {} 자료형으로 집어넣어야함
- 단 font-size이렇게 대쉬기호를 못쓰니까 대문자로 넣어줘야함

# 3. state

- let post = ‘강남 우동 맛집’ 이렇게 변수를 저장 할 수도 있지만 state를 써서 저장하자

```jsx
import { useState } from 'react';
let [a, setA] = useState('')
```

- state를 쓰는 이유는 state는 변동사항이 생기면 state쓰는 html도 자동으로 재렌더링 해주기때문
- 바뀌지 않는 state들은 굳이 저장할 필요가 없다.
- /*eslint-disable*/ 넣으면 warning 띄워줌
- state 변경

```jsx
function App(){
	let [ add, setAdd ] = useState(0);
	return (
		<h4> { 글제목[0] } <span onClick={ () => { setAdd(add + 1) } }>
	)
}
```

- object / array 자료형 수정

```jsx
function App(){
	let [ name, setName ] = useState(['남자코트', '강남 우동 맛집', '파이썬' ]);

	return (
		<button onClick= { () => {
			let copy = [...name];
			copy[0] = '여자코트 추천'
			setName(copy)
		}}> 수정버튼 </button>
	)
}
```

# 4. Component 문법

```jsx
// return문 안에 같은 html요소를 연달아 적을 수 없음
return (
	<div></div>
	<div></div>
)
// 이렇게 해야함
return (
	<div>
		<div></div>
		<div></div>
	</div>
)
// 겉을 감싸는 div 대신 <></> 사용가능
```

```jsx
function App() {
	return (
		<div>
			<Modal></Modal>
		</div>
	)
}

function Modal(){
	return (
		<div className = "modal">
			<h4>제목</h4>
			<p>날짜</p>
		</div>
	)
}

let Modal = () => {
  return ( <div></div>) 
}
```

- Modal 같은  html덩어리를 component라고 부름
- 주의점
    1. component 작명시 영어대문자로 보통 시작
    2. return() 안에 html 태그들이 평행하게 여러개 들어갈 수 없음
    3. function App(){} 안에 넣으면 안됨
        1. function App() {} > 이거도 컴포넌트 생성문
        2. 컴포넌트안에 컴포넌트를 만들진 않음
    4. <component.> 이렇게 써도 됨
- 어떤 html들을 component로 만들까
    1. 반복해서 출현하는 html덩어리
    2. 자주 변경될거같은 부분
    3. 다른 페이지를 만들고 싶다면 그 페이지의 html을 component로
    4. 웹페이지를 component단위로 나눠서 작업

### state 활용

```jsx
function App(){
	let [ modal, setModal ] = useState(false)	
	return (
		<div className="app">
			{
				modal == true ? <Modal></Modal> : null
			}
		</div>
	)
}
// button 만들어서 onClick={() => { setModal(true) }} 이런거 넣어주자
```

# map

```jsx
function App (){
  return (
    <div>
      (생략)
      { 
        글제목.map(function(a, i){
          return (
          <div className="list">
            <h4>{ 글제목[i] }</h4>
            <p>2월 18일 발행</p>
          </div> )
        }) 
      }
    </div>
  )
}
```

- 이거는..모르면 공부 안한거니까 생략하자…

```jsx
// map으로 생성한 html에는 key값을 넣어줘야함
<div className="list" key={i}>
```