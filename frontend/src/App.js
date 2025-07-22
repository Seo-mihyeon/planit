import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // 전체 일정 조회
  const loadPlans = async () => {
    const res = await api.get("/");
    setPlans(res.data);
  };

  // 일정 추가
  const addPlan = async () => {
    if (!title || !date) return alert("제목과 날짜를 입력하세요.");
    await api.post("/", { title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
    loadPlans();
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📅 일정 등록</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="내용"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <button onClick={addPlan}>등록</button>

      <hr />

      <h3>등록된 일정</h3>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <b>{plan.title}</b> - {plan.date} <br />
            {plan.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
