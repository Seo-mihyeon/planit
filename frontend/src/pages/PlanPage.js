import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function PlanPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const token = localStorage.getItem('token');
  

  // 전체 일정 조회
  const loadPlans = async () => {

    try {
      const res = await api.get('/api/plans',{
        headers: {Authorization: `Bearer ${token}`}
      });
      const sorted = res.data.sort((a,b) => new Date(b.date) - new Date(a.date));
      setPlans(sorted);
    } catch (error) {
      console.error('일정 조회 실패', error);
    }

  };

  // 일정 추가
  const addPlan = async () => {
    if (!title || !date) return alert("제목과 날짜를 입력하세요.");

    try {
      await api.post('/api/plans', {title, description, date}, {
        headers : {Authorization : `Bearer ${token}`}
      });

      setTitle('');
      setDescription('');
      setDate('');
      loadPlans();
    } catch (error) {
      console.error('일정 추가 실패', error);
    }
  };

  // 일정삭제
  const deletePlan = async (id) =>{
    try {
      await api.delete(`/api/plans/${id}`, {
        headers : {Authorization: `Bearer ${token}`}
      })
      loadPlans();
    } catch (error) {
      console.error('일정 삭제 실패', error);
    }
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

    try {
      await api.put(`/api/plans/${editId}`, {title, description, date},{
        headers : {Authorization : `Bearer ${token}`}
      })
      setTitle("");
      setDescription("");
      setDate("");
      setEditId(null);
      loadPlans();
    } catch (error) {
      console.error('일정 수정 실패')   
    }

    
  }

  //일정수정취소
  const cancelPlan = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setDate("");
  }

  //검색기능
  const filteredPlans = plans.filter(plan =>
    plan.title.toLowerCase().includes(search.toLowerCase())
  )

  const login = async () => {
    navigate("/login")
  }

  useEffect(() => {
    if (!token){
      alert('일정관리 접근 실패!')
      navigate('/login');
      return;
    }
    loadPlans();
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <button onClick={login}>메인화면</button>
      </div>
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


      {/* 카드 + 타임라인 레이아웃 */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* 왼쪽 카드 목록 */}
        <div style={{ flex: 1 }}>
          <h3>🗂️ 일정 목록</h3>
          <h3>검색 : <input type="text" placeholder="제목검색" value={search} onChange={(e) => setSearch(e.target.value)}/></h3>
          {plans.length === 0 && <p>등록된 일정이 없습니다.</p>}
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <h4>{plan.title}</h4>
              <p><b>📆 {plan.date}</b></p>
              <p>{plan.description}</p>
              <button onClick={() => deletePlan(plan.id)}>삭제</button>
              <button onClick={() => startEdit(plan)}>수정</button>
            </div>
          ))}
        </div>

        {/* 오른쪽 타임라인 */}
        <div style={{ flex: 1, paddingLeft: "1rem", borderLeft: "2px solid #eee" }}>
          <h3>🕒 타임라인</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredPlans
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((plan) => (
                <li
                  key={plan.id}
                  style={{
                    marginBottom: "1rem",
                    paddingLeft: "0.5rem",
                    borderLeft: "4px solid #2196f3",
                  }}
                >
                  <strong>{plan.date}</strong> - {plan.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlanPage;
