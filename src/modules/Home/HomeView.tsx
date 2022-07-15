import { List } from "antd";
import React from "react";
import { MovieCard } from "../../components";
import { Movie } from "../../hooks";
import { Pagination } from "antd";

import "./Home.scss";

interface Props {
  movies: Movie[];
  currentPage: number;
  totalMovies: number;
  onPageChange: (page: number) => void;
}

const HomeView: React.FC<Props> = ({ movies, currentPage, totalMovies, onPageChange }) => {
  console.log(currentPage)
  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={movies}
        renderItem={(item) => (
          <List.Item>
            <MovieCard title={item.title} backdrop_path={item.backdrop_path} />
          </List.Item>
        )}
      />
      <Pagination
        onChange={onPageChange}
        current={currentPage}
        defaultCurrent={1}
        total={totalMovies}
        pageSize={20}
        pageSizeOptions={[]}
      />
    </>
  );
};

export default HomeView;
