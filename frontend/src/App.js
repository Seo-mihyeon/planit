import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  // 전체 일정 조회
  const loadPlans = async () => {
    const res = await api.get("");
    setPlans(res.data);
  };

  // 일정 추가
  const addPlan = async () => {
    if (!title || !date) return alert("제목과 날짜를 입력하세요.");
    await api.post("", { title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
    loadPlans();
  };

  // 일정삭제
  const deletePlan = async (id) =>{
    await api.delete(`/${id}`)
    loadPlans();
  }

  // 일정수정
  const startEdit = (plan) =>{
    setEditId(plan.id);
    setTitle(plan.title);
    setDescription(plan.description);
    setDate(plan.date);
  }

  const updatePlan = async () => {
    if (!title) return alert("제목을 입력해주세요.");
    else if (!description) return alert("내용을 입력해주세요.");
    else if (!date) return alert("날짜를 입력해주세요.");

    await api.put(`${editId}`, {title, description, date});
    setTitle("");
    setDescription("");
    setDate("");
    setEditId(null);
    loadPlans();
  }

  //일정수정취소
  const cancelPlan = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setDate("");
  }

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
      {editId ? (
        <>
        <button onClick={updatePlan}>수정 완료</button>
        <button onClick={cancelPlan}>수정 취소</button>
        </>
      ) : (
        <button onClick={addPlan}>등록</button>
      )}
      <hr />

      <h3>등록된 일정</h3>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <b>{plan.title}</b> - {plan.date} <br />
            {plan.description}
            <br />
            <button onClick={() => deletePlan(plan.id)}>삭제</button>
            <button onClick={() => startEdit(plan)}>수정</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
