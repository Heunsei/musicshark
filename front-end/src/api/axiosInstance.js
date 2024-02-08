import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 환경변수에서 API의 기본 URL을 설정
});

export default api;
