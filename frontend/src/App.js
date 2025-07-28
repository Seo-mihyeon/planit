import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate  } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PlanPage from "./pages/PlanPage"; 

function PrivateRoute({ children }){
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/login">로그인</Link> | 
        <Link to="/register">회원가입</Link> | 
        <Link to="/plans">일정 관리</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plans" element={<PrivateRoute><PlanPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
