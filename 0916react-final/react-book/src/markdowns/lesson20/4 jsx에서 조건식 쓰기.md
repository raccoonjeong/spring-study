# 4. 조건식 쓰기

## 조건식 AND (&&) 출력하기

조건 && (참일 경우 값)

```jsx
export default function Notice() {
  const hasMessage = true;

  return (
    <div>
      <h3>알림</h3>
      {hasMessage && <p>새로운 메시지가 있습니다!</p>}
    </div>
  );
}
```

## 조건식 OR (||) 출력하기

조건 || (거짓일 경우 값)

```jsx
export default function UserName() {
  const name = ""; // 값이 없다고 가정

  return (
    <div>
      <p>사용자: {name || "손님"}</p>
    </div>
  );
}
```

## 삼항연산자 조건식 출력하기

조건 ? (참일 경우 값) : (거짓일 경우 값)

```jsx
export default function LoginStatus() {
  const isLogin = false;

  return (
    <div>
      <p>{isLogin ? "로그인 되었습니다." : "로그인이 필요합니다."}</p>
    </div>
  );
}
```
