# Redux
- 언제나 설치부터 시작

```bash
npm install @reduxjs/tollkit react-redux
```
- src 폴더 안에 store.js를 생성해서 관리하자
```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        
    }
})
```

- index.js로 가서 Provider로 감싸주기
```js
import { Provider } from "react-redux"
import store from './store.js'

<Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>
</Provider>
```

## store에 state 보관
```js
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim'
}) // state 생성

export default configureStore({
    reducer: {
        user : user.reducer // 뒤에 .reducer 붙여줘야함
    }
}) // state 등록
```
1. createSlice로 state 생성
2. reducer에 등록

## store 꺼내쓰는법
```js
import { useSelector } from 'react-redux'

let a = useSelector((state) => {return state})
console.log(a.user)
```
1. useSelector를 import 받아오기
2. a안에 state들을 넣을 수 있음 state.user 이런식으로 넣어도 괜찮음

## state 변경하는 함수 작성
### 결론부터
> 1. store.js에서 state를 변경하는 함수 작성
> 2. export 해서 빼오기
> 3. 필요할 때 import 하고 dispatch로 감싸줌

### 1. state를 변경하는 함수 작성
```js
let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeName(state){
            return 'john kim'
        },
    },
})
```
- reducers라는 필드를 만들고 state를 변경할 함수들을 작성

### 2. export 해줘야함
```js
// store.js
export let { changeName, ...} = user.actions
```
- redux state를 바꾸는 함수를 action이라고 부름
- 관습적으로 구조분해 할당해서 하나하나 빼주자

### 3. import 받아올 때 해야할 것
```js
import { useDispath, useSelector } from 'react-redux'
import { changeName } from './../store'

function Cart(){
    let dispatch = useDispatch()
}
```
- useDispatch() > store.js로 요청 보내주는 함수
- dispatch(changeName()) 이렇게 사용

### 요약
1. store.js에 만든 createSlice()안에 reducers를 적고 그 안에 변경함수 작성
2. 밖으로 빼서 export let { Name } = sliceName.actions 이런식으로 빼주기
3. 쓸 파일에 import 받아오고 useDispatch를 사용해 호출한다

## Redux안의 데이터가 ary / obj 일 때 변경방법
### 결론 > 그냥 직접 바꾸면 됨
```js
// return 안넣어도 괜찮음
let user = createSlice({
	name : '',
	initialState : { name : 'kim', age : 21},
	reducers : {
		chageName(state){
			state.name = 'part'		
		}
		increase(state){
			state.age += 1
		}
	}
})
```
- 생각보다 착함

### 파라미터 어떻게 넣어용?
```js
// return 안넣어도 괜찮음
let user = createSlice({
	name : '',
	initialState : { name : 'kim', age : 21},
	reducers : {
		chageName(state){
			state.name = 'part'		
		}
		increase(state){
			state.age += 1
		}
		increase2(state){// 이렇게 계속 만들어야하냐?
			state.age += 10
		}
        // 그건 아니고 파라미터는 이렇게 뚫어두자
increase2(state, action){  // 이렇게 계속 만들어야하냐?
		state.age += action.payload  // payload붙여서 넣자
}
	}
})
```

## 다른 파일로 저장할 것들을 뺄거면?
- store라는 폴더 만들어서 관리하자
- 필요하면 export해서 빼주고 store.js에서 받아오자