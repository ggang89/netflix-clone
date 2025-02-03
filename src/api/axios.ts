import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "12ab4a3d51cbb01094359cf4afe686dc",
    language: "ko-KR"
  },
});

export default instance;