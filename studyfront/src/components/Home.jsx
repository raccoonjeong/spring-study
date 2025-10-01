import { useState, useRef, useEffect } from "react";

export function Home() {
  const [seData, setSeData] = useState();
  const [locData, setLocData] = useState();
  const [data, setData] = useState();

  const textRef = useRef();
  const handleBtn = () => {
    const text = textRef.current.value;
    setData(text);
    sessionStorage.setItem("save", text);
    localStorage.setItem("locSave", text);
  };

  useEffect(() => {
    setData(data);
    setSeData(sessionStorage.getItem("save"));
    setLocData(localStorage.getItem("locSave"));
  }, []);
  return (
    <>
      <div>기본 : {JSON.stringify(data)}</div>
      <div>세션 : {JSON.stringify(seData)}</div>
      <div>로컬 : {JSON.stringify(locData)}</div>
      <input type="text" ref={textRef}></input>
      <button onClick={handleBtn}>버튼</button>
    </>
  );
}
