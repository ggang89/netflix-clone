import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";
import "./SearchPages.css";

type Movie = {
  poster_path: string;
  original_title: string;
  overview: string;
};

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>({
    poster_path: "",
    original_title: "",
    overview: "",
  });

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(`/movie/${movieId}`);
      setMovie(request.data);
     // console.log(request);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <h2>...Loading...</h2>;

  return (
    <section>
      <img
        className="movie_poster"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.original_title}
      />
      <div className="movie_poster_detail">
        <h2>{movie.original_title}</h2>
        <p>{movie.overview}</p>
      </div>
    </section>
  );
}
