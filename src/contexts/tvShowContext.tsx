import React, { useState, useCallback } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";

interface TvShowContextInterface {
  favourites: number[];
  addToFavourites: (tvShow: BaseTvShowProps) => void;
  removeFromFavourites: (tvShow: BaseTvShowProps) => void;
  addReview: (tvShow: BaseTvShowProps, review: Review) => void;
  mustWatch: number[];
  addToMustWatch: (tvShow: BaseTvShowProps) => void;
  removeFromMustWatch: (tvShow: BaseTvShowProps) => void;
}
const initialContextState: TvShowContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},

  mustWatch: [],
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
};

export const TvShowContext =
  React.createContext<TvShowContextInterface>(initialContextState);

const TvShowContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const [favourites, setFavourites] = useState<number[]>([]);

  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToFavourites = useCallback((tvShow: BaseTvShowProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(tvShow.id)) {
        return [...prevFavourites, tvShow.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((tvShow: BaseTvShowProps) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((tId) => tId !== tvShow.id)
    );
  }, []);

  const addReview = (tvShow: BaseTvShowProps, review: Review) => {
    setMyReviews({ ...myReviews, [tvShow.id]: review });
  };

  const addToMustWatch = useCallback((tvShow: BaseTvShowProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(tvShow.id)) {
        return [...prevMustWatch, tvShow.id];
      }
      return prevMustWatch;
    });
  }, []);

  const removeFromMustWatch = useCallback((tvShow: BaseTvShowProps) => {
    setMustWatch((prevMustWatch) =>
      prevMustWatch.filter((tId) => tId !== tvShow.id)
    );
  }, []);

  return (
    <TvShowContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {children}
    </TvShowContext.Provider>
  );
};

export default TvShowContextProvider;
