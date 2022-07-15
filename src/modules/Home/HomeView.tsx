import { List } from "antd";
import React from "react";
import { MovieCard } from "../../components";
import { Pagination } from "antd";

import "./Home.scss";
import { Movie } from "../../types";

interface Props {
  movies: Movie[];
  currentPage: number;
  totalMovies: number;
  onPageChange: (page: number) => void;
  onLikeMovie: (index: number) => void;
  likedMovies: { [key: number]: Movie };
}

const HomeView: React.FC<Props> = ({
  movies,
  currentPage,
  totalMovies,
  onPageChange,
  onLikeMovie,
  likedMovies,
}) => {
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
        renderItem={(item, index) => (
          <List.Item key={item.title}>
            <MovieCard
              index={index}
              onLikeMovie={onLikeMovie}
              title={item.title}
              backdrop_path={item.backdrop_path}
              liked={likedMovies[item.id] ? true : false}
            />
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
