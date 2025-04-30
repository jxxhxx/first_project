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

  const handleMenuChange = (key, genreId = "") => {
    setMenu(key);
    setSelectedGenre(key === "genre" ? genreId : "");
  };

  return (
    <>
      <Header />
      <div className="container">
        {" "}
        <Categories
          current={menu}
          selectedGenre={selectedGenre}
          onChange={handleMenuChange}
        />
        {menu === "search" ? (
          <MovieSearch query={query} setQuery={setQuery} />
        ) : (
          <MovieList menu={menu} query={query} genre={selectedGenre} />
        )}
      </div>
    </>
  );
};

export default App;
