import { List } from "antd";
import React from "react";
import { MovieCard } from "../../components";
import { Movie } from "../../types";

interface Props {
  movies: Movie[];
  onLikeMovie: (index: number) => void;
}

const LikedView: React.FC<Props> = ({ movies, onLikeMovie }) => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={movies}
    renderItem={(item, index) => (
      <MovieCard
        type="horizontal"
        title={item.title}
        key={item.title}
        backdrop_path={item.backdrop_path}
        onLikeMovie={onLikeMovie}
        liked={true}
        index={index}
        popularity={item.popularity}
      />
    )}
  />
);

export default LikedView;
