import { FaSearch } from "react-icons/fa";
import "./Categories.css";

const categories = [{ key: "recommend", label: "추천 영화" }];

const nowUpcoming = [
  { key: "nowPlaying", label: "현재 상영작" },
  { key: "upcoming", label: "상영 예정작" },
];

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

const Categories = ({ current, selectedGenre, onChange }) => {
  return (
    <div className="styled-categories-block">
      <div className="category-group">
        {categories.map(({ key, label }) => (
          <div
            key={key}
            className={`category${current === key ? " active" : ""}`}
            onClick={() => onChange(key)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="category-group">
        {nowUpcoming.map(({ key, label }) => (
          <div
            key={key}
            className={`category${current === key ? " active" : ""}`}
            onClick={() => onChange(key)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="category-group">
        <div className="category genre-hover">
          <span>장르 별 영화</span>
          <div className="genre-list">
            {genres.map(({ id, name }) => (
              <div
                key={id}
                className={selectedGenre === id ? "active" : ""}
                onClick={() => onChange("genre", id)}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`category search-icon${
          current === "search" ? " active" : ""
        }`}
        onClick={() => onChange("search")}
      >
        <FaSearch />
      </div>
    </div>
  );
};

export default Categories;
