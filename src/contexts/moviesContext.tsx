import React, { useState, useCallback } from "react";
import { BaseMovieProps, FantasyMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  userReviews: Review[];
  mustWatch: number[];
  addToMustWatch: (movie: BaseMovieProps) => void;
  removeFromMustWatch: (movie: BaseMovieProps) => void;
  fantasyMovies: FantasyMovieProps[];
  addFantasyMovie: (movie: FantasyMovieProps) => void;
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: (movie, review) => {
    movie.id, review;
  },
  userReviews: [],
  mustWatch: [],
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
  fantasyMovies: [],
  addFantasyMovie: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const [favourites, setFavourites] = useState<number[]>([]);

  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieProps[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((mId) => mId !== movie.id)
    );
  }, []);

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setUserReviews((prevReviews) => [...prevReviews, review]);
  };

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movie.id)) {
        return [...prevMustWatch, movie.id];
      }
      return prevMustWatch;
    });
  }, []);

  const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) =>
      prevMustWatch.filter((mId) => mId !== movie.id)
    );
  }, []);

  const addFantasyMovie = (movie: FantasyMovieProps) => {
    setFantasyMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        userReviews,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
        fantasyMovies,
        addFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
