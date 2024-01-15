# 1월 15일 REACT 학습 내용
## CONTEXT API
### 1. 도입
> Single Page Application의 단점에는 component간의 state공유가 어렵다는 단점이 있다
```js
function Par () { // 여기있던 애는 
    return (
        <div>
        </div>
    )
}

function chi () { // props로 전달해줘야함
    return (
        <div>
        </div>
    )
}
```

> 부모자식 관계가 아니라면 props로 데이터 전송이 어려움. 만약 app > detail > child 이런식으로 관계를 가지고  있다면 app에서 child로 데이터를 전달해 주려면 무조건 detail을 거쳐햐함

> props 너무 많아요 ㅜㅜ
>> 1. Context API 사용
>> 2. Redux 같은 라이브러리 사용


### 2. Context API 배워보자
- 사실 잘 안씀
    - 성능이슈
    - 컴포넌트 재활용이 어려움

- 그래도 배워보자
```js
// App.js
// 사용법 1
import { createContext, useState } from 'react'
export let Context1 = createContext()  // context는 state보관함
// 사용법 2 <Context>로 원하는 컴포넌트 감싸기
<Route path="/detail/:id" element={
     <Context1.Provider>
       <Detail shoes={shoes} />
     </Context1.Provider>
} />
// 사용법 3 value{{ state1, state2 }}
<Context1.Provider value={{ stock }}>
```
- context 로 감싸진 컴포넌트들은 그 컴포넌트의 자식까지 value안에 있는 state를 쓸 수 있다.
``` js
// detail.js
import { Context1 } from './../App'

let {a, b} = useContext(Context1) // 보관함에 있는거 가져와서 해체해줌
```
- 대충 이런느낌
    - 안쓰는 이유 조금더 자세히
        - state가 변경되면 context안에 있는 친구들은 전부 다 재렌더링 해서 성능이슈가 생김
        - 이거 재활용 하고싶은데 안에 context있으면 ? 조금 어지러워진다

- 다음강의 redux

