import React, { useState } from "react";
import { Link, Route, useNavigate } from 'react-router-dom';
import api from "../api";
import '../css/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/users/login", { username, password });
      await navigate('/plans');
    } catch (error) {
      alert("로그인 실패!");
    }
  };

  const register = async () => {
    try {
      navigate("/register");
    } catch (error) {
      alert("회원가입 페이지로 이동 실패!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
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
        <button onClick={login}>로그인</button>
        <p className="register-text">
          아직 계정이 없으신가요? {""}
          <span onClick={register} className="register-link">회원가입</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
