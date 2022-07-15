import React from "react";
import { useMovies } from "../../hooks";
import HomeView from "./HomeView";

function Home() {
  const { data, totalData, page, onPageChange } = useMovies();

  return (
    <HomeView
      movies={data}
      totalMovies={totalData}
      currentPage={page}
      onPageChange={(page) => onPageChange(page)}
    />
  );
}

export default Home;
