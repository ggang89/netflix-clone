import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // vite에서 env 파일사용시 import.meta.env.VITE_변수명으로 사용
    api_key: import.meta.env.VITE_MOVIE_DB_API_KEY,
    language: "ko-KR",
  },
});

export default instance;