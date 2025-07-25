import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import '../css/LoginPage.css'

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/api/users/register", { username, password });
      await navigate('/login')
    } catch (error) {
      alert("회원가입 실패!");
    }
  };
  
  const login = async () => {
    try {
      navigate('/login');
    } catch (error) {
      alert('로그인 페이지 이동 실패!')
    }

  }
  return (
    <div className="login-container">
      <div className="login-box">
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
        <p className="register-text">
            이미 계정이 있으신가요?{" "}
            <span onClick={login} className="register-link">로그인</span>
          </p>
      </div>
    </div>
  );
}

export default RegisterPage;
