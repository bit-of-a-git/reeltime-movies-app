import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, FantasyMovieProps, Review } from "../types/interfaces";
import { db } from "../config/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "./authContext";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  reviews: Review[];
  addReview: (review: Review) => void;
  removeReview: (review: Review) => void;
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
  reviews: [],
  addReview: () => {},
  removeReview: () => {},
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
  const [favourites, setFavourites] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieProps[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserFavourites = async () => {
      if (!currentUser) {
        setFavourites([]);
        setReviews([]);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavourites(userData.favouriteMovies || []);
          setReviews(userData.reviews || []);
          setMustWatch(userData.mustWatchMovies || []);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserFavourites();
  }, [currentUser]);

  const addToFavourites = useCallback(
    async (movie: BaseMovieProps) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) => {
        if (!prevFavourites.includes(movie.id)) {
          return [...prevFavourites, movie.id];
        }
        return prevFavourites;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          favouriteMovies: arrayUnion(movie.id),
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            favouriteMovies: [movie.id],
            email: currentUser.email,
          });
        } catch (createError) {
          console.error("Error adding to favourites:", createError);
        }
      }
    },
    [currentUser]
  );

  const removeFromFavourites = useCallback(
    async (movie: BaseMovieProps) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) =>
        prevFavourites.filter((mId) => mId !== movie.id)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          favouriteMovies: arrayRemove(movie.id),
        });
      } catch (error) {
        console.error("Error removing from favourites:", error);
        setFavourites((prev) => prev.filter((mId) => mId !== movie.id));
      }
    },
    [currentUser]
  );
  // TODO - do you need both of these? Probably not
  const addReview = useCallback(
    async (review: Review) => {
      if (!currentUser) return;

      setReviews((prevReviews) => {
        if (!prevReviews.some((r) => r.movieId === review.movieId)) {
          return [...prevReviews, review];
        }
        return prevReviews;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          reviews: arrayUnion(review),
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            reviews: [review],
            email: currentUser.email,
          });
        } catch (createError) {
          console.error("Error adding to reviews:", createError);
        }
      }
    },
    [currentUser]
  );

  // TODO - do you need both of these? The review is likely enough
  const removeReview = useCallback(
    async (review: Review) => {
      if (!currentUser) return;

      setReviews((prevReviews) =>
        prevReviews.filter((r) => r.movieId !== review.movieId)
      );
    },
    [currentUser]
  );

  const addToMustWatch = useCallback(
    async (movie: BaseMovieProps) => {
      if (!currentUser) return;

      setMustWatch((prevMustWatch) => {
        if (!prevMustWatch.includes(movie.id)) {
          return [...prevMustWatch, movie.id];
        }
        return prevMustWatch;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          mustWatchMovies: arrayUnion(movie.id),
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            mustWatchMovies: [movie.id],
            email: currentUser.email,
          });
        } catch (createError) {
          console.error("Error adding to must watch movies:", createError);
        }
      }
    },
    [currentUser]
  );

  const removeFromMustWatch = useCallback(
    async (movie: BaseMovieProps) => {
      if (!currentUser) return;

      setMustWatch((prevMustWatch) =>
        prevMustWatch.filter((mId) => mId !== movie.id)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          mustWatchMovies: arrayRemove(movie.id),
        });
      } catch (error) {
        console.error("Error removing from must watch movies:", error);
        setMustWatch((prev) => prev.filter((mId) => mId !== movie.id));
      }
    },
    [currentUser]
  );

  const addFantasyMovie = (movie: FantasyMovieProps) => {
    setFantasyMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        reviews,
        addReview,
        removeReview,
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
