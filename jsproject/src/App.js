import { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import MovieList from "./MovieList";
import MovieSearch from "./MovieSearch";
import "./App.css";

const App = () => {
  const [menu, setMenu] = useState("recommend");
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);

  const handleMenuChange = (key, genreId = "") => {
    setMenu(key);
    setSelectedGenre(key === "genre" ? genreId : "");
    setPage(1);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        {" "}
        <Categories
          current={menu}
          selectedGenre={selectedGenre}
          onChange={handleMenuChange}
        />
        {menu === "search" ? (
          <MovieSearch query={query} setQuery={setQuery} />
        ) : (
          <MovieList
            menu={menu}
            query={query}
            genre={selectedGenre}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default App;
