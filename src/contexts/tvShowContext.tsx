import React, { useState, useCallback, useEffect } from "react";
import { BaseTvShowProps } from "../types/tvShows";
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

interface TvShowContextInterface {
  favourites: number[];
  addToFavourites: (tvShow: BaseTvShowProps) => void;
  removeFromFavourites: (tvShow: BaseTvShowProps) => void;
  mustWatch: number[];
  addToMustWatch: (movie: BaseTvShowProps) => void;
  removeFromMustWatch: (movie: BaseTvShowProps) => void;
}
const initialContextState: TvShowContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  mustWatch: [],
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
};

export const TvShowContext =
  React.createContext<TvShowContextInterface>(initialContextState);

const TvShowContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserFavourites = async () => {
      if (!currentUser) {
        setFavourites([]);
        setMustWatch([]);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavourites(userData.favouriteTvShows || []);
          setMustWatch(userData.mustWatchTvShows || []);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserFavourites();
  }, [currentUser]);

  const addToFavourites = useCallback(
    async (tvShow: BaseTvShowProps) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) => {
        if (!prevFavourites.includes(tvShow.id)) {
          return [...prevFavourites, tvShow.id];
        }
        return prevFavourites;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          favouriteTvShows: arrayUnion(tvShow.id),
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            favouriteMovies: [tvShow.id],
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
    async (tvShow: BaseTvShowProps) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) =>
        prevFavourites.filter((tId) => tId !== tvShow.id)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          favouriteTvShows: arrayRemove(tvShow.id),
        });
      } catch (error) {
        console.error("Error removing from favourites:", error);
      }
    },
    [currentUser]
  );

  const addToMustWatch = useCallback(
    async (tvShow: BaseTvShowProps) => {
      if (!currentUser) return;

      setMustWatch((prevMustWatch) => {
        if (!prevMustWatch.includes(tvShow.id)) {
          return [...prevMustWatch, tvShow.id];
        }
        return prevMustWatch;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          mustWatchTvShows: arrayUnion(tvShow.id),
        });
      } catch (error) {
        try {
          await setDoc(userDocRef, {
            mustWatchTvShows: [tvShow.id],
            email: currentUser.email,
          });
        } catch (createError) {
          console.error("Error adding to must watch TV shows:", createError);
        }
      }
    },
    [currentUser]
  );

  const removeFromMustWatch = useCallback(
    async (tvShow: BaseTvShowProps) => {
      if (!currentUser) return;

      setMustWatch((prevMustWatch) =>
        prevMustWatch.filter((tId) => tId !== tvShow.id)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          mustWatchTvShows: arrayRemove(tvShow.id),
        });
      } catch (error) {
        console.error("Error removing from must watch TV shows:", error);
        setMustWatch((prev) => prev.filter((tId) => tId !== tvShow.id));
      }
    },
    [currentUser]
  );

  return (
    <TvShowContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
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
