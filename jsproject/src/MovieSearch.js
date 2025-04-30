import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { FaSearch } from "react-icons/fa";
import "./MovieSearch.css";

const API_KEY = "";
const MOVIES_PER_PAGE = 10;

const genres = [
  { id: "", name: "전체" },
  { id: 28, name: "액션" },
  { id: 12, name: "모험" },
  { id: 16, name: "애니메이션" },
  { id: 35, name: "코미디" },
  { id: 80, name: "범죄" },
  { id: 14, name: "판타지" },
  { id: 36, name: "역사" },
  { id: 27, name: "공포" },
  { id: 10402, name: "음악" },
  { id: 10749, name: "로맨스" },
  { id: 878, name: "SF" },
  { id: 53, name: "스릴러" },
  { id: 10752, name: "전쟁" },
];

const MovieSearch = ({ query, setQuery }) => {
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=1`
        );

        const filtered = genre
          ? data.results.filter((m) => m.genre_ids.includes(+genre))
          : data.results;

        setResults(filtered);
        setTotalPages(Math.ceil(filtered.length / MOVIES_PER_PAGE));
        setPage(1);
      } catch (e) {
        console.error("영화 검색 오류:", e);
      }
    };

    fetchMovies();
    window.scrollTo(0, 0);
  }, [query, genre]);

  const handleSearch = () => setPage(1);

  const indexOfLast = page * MOVIES_PER_PAGE;
  const indexOfFirst = indexOfLast - MOVIES_PER_PAGE;
  const currentMovies = results.slice(indexOfFirst, indexOfLast);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, page - 4);
    let endPage = Math.min(totalPages, page + 5);

    if (startPage > 1) {
      pageNumbers.push(1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="movie-search-container">
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목 입력"
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="movie-container search-results">
        {currentMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} showReview={true} />
        ))}
      </div>

      {results.length > 0 && (
        <div className="navigation">
          <div className="pagination">
            {generatePageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={pageNum === page ? "active" : ""}
                onClick={() => {
                  setPage(pageNum);
                  window.scrollTo(0, 0);
                }}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
