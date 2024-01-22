# REACT - 4

설명: Redux

- 페이지 만들기

```jsx
// 까먹을 수도 있으니까...
<Route path="/cart" element={ <Cart/> } />
```

# 1. REDUX

- 설치

```jsx
npm install @reduxjs/toolkit react-redux
```

- react / react-dom의 버전을 확인해야함
- 18..1.x 이상이면 사용가능 그게 아니면 json파일 수정하고 npm install
- redux를 쓰는 이유 > 파일 하나에 state들을 보관할 수 있는데
그걸 모든 컴포넌트가 직접 꺼내쓸 수 있습니다

## 1-1. 저장할 js파일에 아래 코드 작성

```jsx
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { }
})
```

## 1-2 index.js 수정

```jsx
import { Provider } from "react-redux";
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

- <Provider store={import해온거}>안에 있는 컴포넌트 들은 (App의 자식 컴포넌트까지) store.js에 있던 state를 마음대로 꺼내쓸 수 있음

### 2-1 store.js에 state보관 방법

1. createSlice()로 state를 만들고
2. configureStore() 안에 등록하면 된다

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
	name : 'user',
	initialState : 'kim',
})

export default configureStore({
	reducer : {
		user : user.reducer
	}
})
```

- createSlice() 상단에서 import 해온뒤 { name : ‘state이름’, initailState : ‘stateValue’ }
이걸 넣으면 state하나가 생성 가능 (createSlice는 useState와 용도가 비슷한듯)
- state등록은 configureStore() 안에 하면 된다
{ 작명 : createSlice만든거.reducer }

```jsx
// cart.js
import { useSelector } from 'react-redux'

function Cart(){
	let a = useSelcetor((state) => { return state } )
	// let a = useSelector((state) => state.user ) 이런식으로 쓰는게 좀더 낫지않나?
	console.log(a)
	return (생략)
}
```

### 2-2 redux 안의 state를 변경하는 방법

1. store.js에 state 변경하는 함수부터 만들고
2. export하고
3. 필요할 때 꺼내쓰는데 dispatch()로 감싸줘야함

```jsx
let user = createSlice({
	name 'user',
	initialState : 'kim',
	reducers : {
		changeName(state){
			return 'john ' + state
		}
	}
})
```

→ Slice안에 reducers 만들고 그 안에 함수 작성

1. 작명은 자기 알아서
2. 파라미터 하나 작명하면 그건 기존의 state
3. return 우측에 새로운 state 입력하면 그걸로 기존 state를 갈아치움

```jsx
// 만들었으면 export해서 다른데 쓰기좋게 해줘야함
export let { changeName } = user.actions
```

### 2-3 state변경 함수를 사용하는법

```jsx
import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"
// store.js에서 원하는 함수 가져오기
(생략) 

<button onClick={()=>{
	// dispatch로 감싸주면 실행이 잘 된다
  dispatch(changeName())
}}>버튼임</button>
```

### 2-4 array / object 함수를 변경하는법

```jsx
// state를 직접 변경하라고 해도 잘 변경된다
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'park'
    }
  }
})
```

- state 사본을 하나 더 생성해준 덕분에 Redux깔기만 하면 알아서 직접 바뿔 수 있다.
- 숫자 하나만 필요해도 redux에서 일부러 object 아니면 array에 담는 경우도 있음

### 2-5 파라미터 작명

```jsx
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    increase(state, a){
      state.age += a.payload
    }
  }
})
```

- a또는 action으로 작명 많이함
- action.type 하면 state 변경함수 이름이 나오고
- action.palload 하면 파라미터가 나옴