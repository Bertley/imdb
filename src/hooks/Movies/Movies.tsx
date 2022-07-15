import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface MoviesProps {
  data: Movie[];
  loading: boolean;
  error: string;
  totalData: number;
  page: number;
  onPageChange: (page: number) => void
}

const MoviesContext = React.createContext<MoviesProps>({} as MoviesProps);
MoviesContext.displayName = "MoviesContext";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const MoviesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalData, setTotalData] = useState<number>(0);
  
  const page = Number(useQuery().get("page")) || 1;
  
  const navigate = useNavigate();
  const onPageChange = (page: number) => {
    navigate('?page=' + page, {replace: true});
  };

  /**
   * 
   * @param {Movie[]} movies
   * @param {number} totalData We are manually setting 10000 as the page must be less than or equal to 500 at 20 movies per page
   */
  const fetchMovies = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17&page=${page}`
      );
      const json = await response.json();
      setData(json.results);
      setTotalData(10000);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  return (
    <MoviesContext.Provider value={{ data, loading, error, totalData, page, onPageChange }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = React.useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }

  return context;
};
