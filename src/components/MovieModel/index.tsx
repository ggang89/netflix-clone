import { useRef } from "react";
import "./MovieModal.css"
import useOnClickOutside from "../../hooks/useOnClickOutside";

type Props = {
  backdrop_path: string;
  title: string;
  overview: string;
  name: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}: Props) {
  //const ref = useRef();
  const ref = useRef<HTMLDivElement>(null);
  //=>useRef()의 기본 반환 타입이 MutableRefObject<undefined>라서 type오류 발생 
  // 하지만 ref는 <div> 요소에 할당되므로 HTMLDivElement에 대한 참조여야 합니다
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">😍100% for you</span> {}
              💌{release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">⭐평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;