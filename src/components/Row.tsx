import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModel";

// Import Swiper React components
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  title: string;
  id: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  // console에 있는 모든 항목을 다 적을 필요없이 사용할 것의 type만 적어주면 되나?
};

export default function Row({ title, id, fetchUrl, isLargeRow }: Props) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState<Movie>({
    backdrop_path: " ",
    id: 0,
    name: "",
    poster_path: "",
    title: "",
    overview: "",
    release_date: "",
    first_air_date: "",
    vote_average: 0,
  });

  //console.log(movieSelected)
  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log("request", request);
    };
    fetchMovieData();
  }, [fetchUrl]); //[]는 외부변수만 참조한다

  const handleClick = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        <div id={id} className="row_posters">
          {movies.map((movie: Movie) => (
            <SwiperSlide key={movie.id}>
              <img
                className='row_poster ${isLargeRow && "row_posterLarge"}'
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
