import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./MovieList.css";

const API_KEY = "";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ menu, query, genre }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const fetchMovies = useCallback(
    async (page = 1, isAppending = false) => {
      try {
        let url = "";

        if (menu === "genre") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&with_genres=${genre}&page=${page}`;
        } else {
          const endpoint =
            {
              recommend: "top_rated",
              nowPlaying: "now_playing",
              upcoming: "upcoming",
              search: "search/movie",
            }[menu] || "popular";

          url =
            endpoint === "search/movie"
              ? `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`
              : `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=ko-KR&region=KR&page=${page}`;
        }

        const { data } = await axios.get(url);

        setTotalPages(data.total_pages);
        setIsFetching(false);

        if (isAppending) {
          setMovies((prev) => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
        }
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
        setIsFetching(false);
      }
    },
    [menu, query, genre]
  );

  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    fetchMovies(1);
  }, [menu, query, genre, fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200;
      setShowTopButton(window.scrollY > 400);

      if (
        menu === "recommend" &&
        nearBottom &&
        !isFetching &&
        currentPage < totalPages
      ) {
        setIsFetching(true);
        setCurrentPage((prev) => {
          const nextPage = prev + 1;
          fetchMovies(nextPage, true);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu, currentPage, totalPages, isFetching, fetchMovies]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchMovies(newPage);
    window.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="styled-movie-list">
      <div className="movie-container">
        {movies.map(({ id, poster_path, title, overview }) => (
          <div className="movie-item" key={id}>
            <img
              className="poster"
              src={
                poster_path
                  ? `${IMAGE_BASE_URL}${poster_path}`
                  : "https://via.placeholder.com/150x225?text=No+Image"
              }
              alt={title}
            />
            <div className="movie-info">
              <h3>{title}</h3>
              <p>{overview}</p>
            </div>
          </div>
        ))}
      </div>

      {(menu === "nowPlaying" || menu === "upcoming") && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      {isFetching && <div>Loading more movies...</div>}
      {menu === "recommend" && showTopButton && (
        <button className="top-button" onClick={scrollToTop}>
          ▲ Top
        </button>
      )}
    </div>
  );
};

export default MovieList;
