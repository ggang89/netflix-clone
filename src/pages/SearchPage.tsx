import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../api/axios";
import "./SearchPages.css"


export default function SearchPage() {
  const [searchResults, setSearchresults] = useState([]);

  console.log("useLocation", useLocation());

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = query.get("q");
  console.log("searchTerm", searchTerm);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log("request", request);
      setSearchresults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie">
                <div className="movie_column_poster">
                  <img src={movieImageUrl} alt="movie"
                  className="movie_poster"/>
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
        <section className="no_results">
          <div className="no_results_text">
            <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
          </div>
      </section>
    );
  };

  return renderSearchResults();
}
