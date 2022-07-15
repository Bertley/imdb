import React from "react";
import { useLikes } from "../../hooks";
import LikedView from "./LikedView";

const Liked = () => {
  const { data, onLikeMovie } = useLikes();

  return <LikedView movies={Object.values(data)} onLikeMovie={onLikeMovie} />;
};

export default Liked;
