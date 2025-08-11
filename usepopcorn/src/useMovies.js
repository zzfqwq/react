import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useMovies(KEY, query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (debouncedQuery.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      // handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [debouncedQuery]
  );
  return { movies, isLoading, error };
}
