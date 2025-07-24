import React, { useState } from "react";
import api from "../api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("api/users/register", { username, password });
      alert("회원가입 성공!");
    } catch (error) {
      alert("회원가입 실패!");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={register}>회원가입</button>
    </div>
  );
}

export default RegisterPage;
