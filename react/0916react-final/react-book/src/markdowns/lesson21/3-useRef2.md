# 3. useRef로 폼 만들기

## 기본 구조

```jsx
import { useRef } from "react";

export default function SignUpFormRef() {
  // ref 생성
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    // 값 검사
    if (!name || !email || !password || !passwordConfirm) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    alert(`${name}님, 회원가입이 완료되었습니다!`);

    // 입력값 초기화
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    passwordConfirmRef.current.value = "";
  };

  return (
    <div>
      <h2>회원가입 (useRef)</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input type="text" ref={nameRef} />
        </label>
        <br />
        <label>
          이메일:
          <input type="email" ref={emailRef} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" ref={passwordRef} />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input type="password" ref={passwordConfirmRef} />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
```

## 특징 비교

### useState

- 입력할 때마다 값이 상태에 저장됨
- 리렌더링 발생 → 실시간 검증(UI에 즉시 반영 가능)
- Controlled Component 방식

### useRef

- 입력 중에는 React가 값을 모르고, 제출 시점에만 가져옴
- 리렌더링 없음 (성능 ↑)
- Uncontrolled Component 방식

## 언제 useRef를 쓰면 좋은가?

- 입력값을 실시간으로 UI에 반영할 필요가 없을 때
- 예: 검색창 자동 포커스, 파일 업로드 input, 비밀번호 확인 제출 시 검사
