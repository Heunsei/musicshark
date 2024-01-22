# Front-End Coding Convention

### 명명규칙
- 상수는 영어 대문자, 스네이크 표기법을 사용
```js
const NAME_ROLE;
```

- 변수 및 함수는 카멜 케이스 사용
```js
// 배열 : 복수형 이름으로 사용
const datas = [];

// 이벤트 핸들러 : on으로 시작
const onClick = () => {}
const onChange = () => {};

// 반환 값이 불린인 경우: 'is'로 시작
const isLoading = false;
```

### 블록구문
- 한 줄짜리 블록일 경우에도 줄 바꿈 하여 사용
```js
if(true){
  return 'hello'
}
```

### 폴더 네이밍
- 카멜케이스를 기본으로 하며, 컴포넌트 폴더일 경우에만 파스칼케이스로 사용

## mui guide
- sx 속성값
-> sx 프로퍼티는 불필요한 스타일 구성 요소 코드 작성을 피하고
대신 구성 요소 자체 내에서 직접 스타일을 정의하는 방법.
```js
 <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
```