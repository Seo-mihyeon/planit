import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/", // 백엔드 주소
});

export default api;
