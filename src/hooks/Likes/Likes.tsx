import React, { PropsWithChildren, useCallback } from "react";
import { Movie } from "../../types";
import useLocalStorage from "../LocalStorage/LocalStorage";
import { useMovies } from "../Movies";

interface LikesProps {
  data: { [key: number]: Movie };
  onLikeMovie: (index: number) => void;
}

const LikesContext = React.createContext<LikesProps>({} as LikesProps);
LikesContext.displayName = "LikesContext";

export const LikesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [data, setData] = useLocalStorage("liked_movies", {});
  const { data: movies } = useMovies();

  const onLikeMovie = useCallback(
    (index: number) => {
      const movie = movies[index];

      if (data[movie.id]) {
        delete data[movie.id];
      } else {
        data[movie.id] = movie;
      }

      setData(data);
    },
    [movies]
  );

  return (
    <LikesContext.Provider value={{ data, onLikeMovie }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = React.useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }

  return context;
};
