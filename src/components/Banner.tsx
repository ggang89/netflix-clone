import axios from "../api/axios";
import { useEffect, useState } from "react";
import requests from "../api/requsts";
import "./Banner.css"

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    
    // 여러 영화 중 하나의 Id 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random()*request.data.results.length)
    ].id;

    // 선택된 id 영화이 상세한 정보 가져오기
    const {data:movieDetail} = await axios.get(`movie/${movieId}`, {
      params: { append_to_reponse: 'videos' },
    });
    setMovie(movieDetail);
  };
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};
  return (
    <header className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize:"cover",
    }}>
      <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">
          {movie?.title||movie?.name||movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">
            Play
          </button>
          <button className="banner_button info">
           More Information
          </button>
        </div>
        {/* {DIV >2 BUTTONS} */}
        <h1 className="banner_description">
          {truncate(movie?.overview,100)}
        </h1>
        {/* Description */}
      </div>
      <div className="banner_fadeBottom"/>

  </header>
  
  );
}
