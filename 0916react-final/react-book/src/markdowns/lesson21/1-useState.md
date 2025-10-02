# 1. useState로 폼 만들기

웹 애플리케이션에서 가장 자주 등장하는 기능 중 하나가 바로 회원가입 폼입니다. 이름, 이메일, 비밀번호 같은 정보를 입력받고, 사용자가 제출하면 서버로 전송하는 구조죠. React에서는 useState 훅을 사용해 이런 입력값을 쉽게 관리할 수 있습니다.

## useState란 무엇인가?

React의 useState는 컴포넌트 안에서 상태(state)를 관리할 수 있게 해주는 훅(Hook) 입니다.

폼의 각 입력값은 시간이 지남에 따라 바뀌므로 "상태"라고 볼 수 있습니다. 예를 들어 사용자가 이름을 입력할 때마다 값이 변하므로, 이 변화를 실시간으로 추적하기 위해 useState를 씁니다.

## 기본 회원가입 폼 구조

우선 JSX 구조만 단순하게 만들면 다음과 같습니다.

```jsx
import { useState } from "react";

export default function SignUpForm() {
  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label>
          이름: <input type="text" />
        </label>
        <br />
        <label>
          이메일: <input type="email" />
        </label>
        <br />
        <label>
          비밀번호: <input type="password" />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
```

지금은 입력창에 글자를 써도 React가 그 값을 알 수 없습니다.
여기서 useState를 활용해 입력값을 상태로 관리해야 합니다.

## useState로 입력값 관리하기

이제 각 입력 필드를 상태로 연결해 보겠습니다.

```jsx
import { useState } from "react";

export default function SignUpForm() {
  const [name, setName] = useState(""); // 이름 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    console.log("제출 데이터:", { name, email, password });
    alert(`${name}님, 회원가입이 완료되었습니다!`);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            value={name} // 상태와 연결
            onChange={(e) => setName(e.target.value)} // 상태 업데이트
          />
        </label>
        <br />
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
```

여기서 핵심은 **value와 onChange**입니다.

`value={state}` → 입력창의 값을 해당 상태와 연결합니다.

`onChange={(e) => setState(e.target.value)}` → 사용자가 입력할 때마다 상태가 업데이트됩니다.

즉, 입력창은 항상 상태를 "보여주고", 사용자의 입력은 다시 상태를 "갱신"하는 구조가 됩니다. 이런 패턴을 **Controlled Component**(제어 컴포넌트)라고 합니다.

## 여러 입력값을 한 번에 관리하기

위 예제처럼 상태를 하나씩 만들 수도 있지만, 입력 필드가 많아지면 코드가 길어집니다.

이럴 땐 객체 형태로 상태를 묶을 수 있습니다.

```jsx
import { useState } from "react";

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // 입력창 name과 value 추출
    setForm({
      ...form, // 기존 값 유지
      [name]: value, // 해당 필드만 업데이트
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출 데이터:", form);
    alert(`${form.name}님, 회원가입이 완료되었습니다!`);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
```

이 방식의 장점은 다음과 같습니다:

입력 필드가 늘어나도 useState를 추가하지 않아도 됨

공통 handleChange 함수 하나로 모든 필드를 처리 가능

관리와 유지보수가 쉬움

## 마무리 정리

- useState는 React에서 상태를 관리하는 기본 훅이다.
- 입력 폼을 만들 때 value와 onChange를 연결해야 상태가 UI와 동기화된다.
- 여러 입력값은 객체로 묶어 관리하면 코드가 간결해진다.
- 최종적으로 `handleSubmit`에서 상태를 활용해 서버 전송, 검증, 메시지 출력 등을 할 수 있다.

## 결론

React에서 회원가입 폼을 만드는 과정은 useState를 어떻게 활용하느냐에 달려 있습니다. 단순히 입력값을 읽는 수준을 넘어서, 실시간으로 상태를 반영하고, 제출 시 데이터 객체로 정리하는 구조를 만들면, 이후 서버 연동이나 유효성 검증을 추가하기도 수월합니다.

이처럼 작은 폼 예제를 직접 만들어보면 React의 핵심 개념인 상태 관리와 제어 컴포넌트를 자연스럽게 익힐 수 있습니다.
