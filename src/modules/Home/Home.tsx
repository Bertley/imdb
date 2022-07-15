import React from "react";
import { useLikes, useMovies } from "../../hooks";
import HomeView from "./HomeView";

function Home() {
  const { data, totalData, page, onPageChange } = useMovies();
  const { data: likedMovies, onLikeMovie } = useLikes();

  return (
    <HomeView
      movies={data}
      totalMovies={totalData}
      currentPage={page}
      onPageChange={(page) => onPageChange(page)}
      onLikeMovie={onLikeMovie}
      likedMovies={likedMovies}
    />
  );
}

export default Home;
