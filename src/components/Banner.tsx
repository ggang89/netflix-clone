import instance from "../api/axios";
import { useEffect, useState } from "react";
import requests from "../api/requsts";
import "./Banner.css";
import styled from "styled-components";

type Video = {
  id: string;
  key: string;
}

type Movie = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  videos: {results: Video[]}
};

export default function Banner() {
  const [movie, setMovie] = useState<Movie>({
    id: 0,
    overview: "",
    poster_path: "",
    backdrop_path: "",
    title: "",
    name: "",
    original_name: "",
    videos: { results: [] }, // 빈 배열을 제공
  });
  const [isClicked, setIsClicked] = useState(false);
  console.log("movie", movie); 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await instance.get(requests.fetchNowPlaying);
    console.log("request", request);
    // 여러 영화 중 하나의 Id 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 선택된 id 영화의 상세한 정보 가져오기
    //  { data: movieDetail }
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
    console.log("1",movieDetail)
  };
  const truncate = (str:string, n:number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          {/* title */}
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button play"
              onClick={() => {
                setIsClicked(true);
              }}
            >
              Play
            </button>
            <button className="banner_button info">More Information</button>
          </div>
          {/* {DIV >2 BUTTONS} */}
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
          {/* Description */}
        </div>
        <div className="banner_fadeBottom" />
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].id}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].id}`}
            title="YouTube video player"
            allow=" autoplay; fullscreen"

            // allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
