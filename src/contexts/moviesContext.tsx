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
  removeFantasyMovie: (index: number) => void;
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
  removeFantasyMovie: () => {},
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
        setMustWatch([]);
        setFantasyMovies([]);
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
          setFantasyMovies(userData.fantasyMovies || []);
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
      }
    },
    [currentUser]
  );

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

  const removeReview = useCallback(
    async (review: Review) => {
      if (!currentUser) return;

      setReviews((prevReviews) =>
        prevReviews.filter((r) => r.movieId !== review.movieId)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const updatedReviews = userData?.reviews.filter(
          (r: Review) => r.movieId !== review.movieId
        );
        await updateDoc(userDocRef, {
          reviews: updatedReviews,
        });
      } catch (error) {
        console.error("Error removing review:", error);
      }
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

  const addFantasyMovie = useCallback(
    async (movie: FantasyMovieProps) => {
      if (!currentUser) return;

      setFantasyMovies((prevMovies) => [movie, ...prevMovies]);

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const updatedMovies = [movie, ...(userData?.fantasyMovies || [])];
        await updateDoc(userDocRef, {
          fantasyMovies: updatedMovies,
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            fantasyMovies: [movie],
            email: currentUser.email,
          });
        } catch (createError) {
          console.error("Error adding to fantasy movies:", createError);
        }
      }
    },
    [currentUser]
  );

  const removeFantasyMovie = useCallback(
    async (index: number) => {
      if (!currentUser) return;

      setFantasyMovies((prevMovies) =>
        prevMovies.filter((_, i) => i !== index)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const updatedMovies = (userData?.fantasyMovies || []).filter(
          (_, i) => i !== index
        );

        await updateDoc(userDocRef, {
          fantasyMovies: updatedMovies,
        });
      } catch (error) {
        console.error("Error removing fantasy movie:", error);
      }
    },
    [currentUser]
  );

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
        removeFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
