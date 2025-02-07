import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css"

type Props = {
  title: string;
  id: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

type Movie = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
  // console에 있는 모든 항목을 다 적을 필요없이 사용할 것의 type만 적어주면 되나?
}

export default function Row({ title, id, fetchUrl, isLargeRow }: Props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //console.log("request", request);
    };
    fetchMovieData();
  }, [fetchUrl]);  //[]는 외부변수만 참조한다

  
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow_left">
          <span
            className="arrow text-4xl"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) {
                
              element.scrollLeft -= window.innerWidth - 80;
              }
              // 여기 id가 어디서 온거지?? => Row 컴포넌트의 props id
              // error: 개체가 null인 것 같다 => null아님 연산자 사용
              // null아님 연산자보다 조건문으로 처리하는 게 더 좋다.
            }}
          >
            {"<"}
          </span>
        </div>

        <div id={id} className="row_posters">
          {movies.map((movie:Movie) => (
            <img
              key={movie.id}
              className='row_poster ${isLargeRow && "row_posterLarge"}'
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider_arrow_right">
          <span
            className="arrow text-4xl"
            onClick={() => {
              document.getElementById(id)!.scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
    </section>
  );
}
