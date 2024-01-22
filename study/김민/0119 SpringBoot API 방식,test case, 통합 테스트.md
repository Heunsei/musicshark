# SpringBoot API 방식,test case, 통합 테스트

## API 방식

### @ResponseBody 문자 변환

```
@Controller
public class HelloController {

    // @ResponseBody 문자 반환
    @GetMapping("hello-string")
    @ResponseBody
    public String helloString(@RequestParam("name") String name) {
        return "hello " + name;
    }
}
```

→ HTTP의 body에 문자 내용을 직접 반환

### @ResponseBody 객체 변환

```
@Controller
public class HelloController {

    // 데이터를 내려줄 객체 생성
    static class Hello {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    // @ResponseBody 객체 반환
    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello();
        hello.setName(name);
        return hello;
    }
}
```

→ 객체를 반환하면 객체가 JSON으로 변환됨

### @ResponseBody 사용 원리

`@ResponseBody`를 사용

- HTTP의 body에 내용을 직접 반환
- `viewResolver` 대신에 `HttpMessageConverter`가 동작
    
    `StringHttpMessageConverter` : 기본 문자 처리
    
    `MappingJackson2HttpMessageConverter` : 기본 객체 처리
    
- byte 처리 등 여러 `HttpMessageConverter`가 기본으로 등록되어 있음

## 테스트 케이스 작성

`src/test/Java` 폴더에 패키지를 만든다.

클래스 이름 관례는 테스트할 클래스에 Test를 붙인다.(ExampleClassTest)

테스트할 메서드에 `@Test` 어노테이션을 붙인다.

모든 테스트는 메서드 순서 **상관없이** 다 따로 동작한다.(순서에 의존관계가 있으면 좋은 테스트가 아님)

### 테스트 라이브러리

- JUnit : 테스트 프레임워크
- Mockito : JUnit 위에서 동작하며 Mocking과 Verification을 도와주는 프레임워크
- AssertJ : 테스트 코드를 더 편리하게 작성하도록 도와주는 라이브러리
- spring-test : 스프링 통합 테스트 지원

### Assertions.assertThat

- `Assertions.assertThat`을 통해 기대한 값이 실제 값과 같은지 알 수 있음

```
class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        // 같으면 초록색, 다르면 빨간색
        assertThat(member).isEqualTo(result);
    }
}
```

### @AfterEach

- 메서드 실행이 끝날 때마다 작동하는 콜백 메세지

```
class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach() {
        repository.clear();
    }
}
```

→ 각 테스트가 종료될 때마다 메모리 DB에 저장된 데이터 삭제

### given, when, then

- 뭔가가 주어졌을 때, 무엇을 실행해서 어떤 결과가 나와야하는지 알아보기 편함

`class MemberServiceTest {

    MemberService memberService;

    @Test
    void join() {
        // given
        Member member = new Member();
        member.setName("hello");

        // when
        Long saveId = memberService.join(member);

        // then
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }
}`

## 스프링 통합 테스트

```
@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    void join() {
        ...
    }

    ...
}
```

### @SpringBootTest

스프링 컨테이너와 테스트를 함께 실행한다.

### @Transactional

테스트 케이스에 이 어노테이션이 있으면 테스트 시작 전에 트랜잭션을 시작하고, 테스트 완료 후에 항상 롤백한다.

이렇게 하면 DB에 데이터가 남지 않으므로 다음 테스트에 영향을 주지 않아 계속적인 테스트가 가능하다.

→ 하지만 테스트에 `@Commit` 어노테이션이 있으면 롤백하지 않고 테스트 데이터가 DB에 저장된다.

```
@Test
@Commit
void join() {
    ...
}
```

**스프링 컨테이너를 이용한 통합 테스트보다 자바로 이루어진 단위 테스트가 좋을 확률이 높다!**