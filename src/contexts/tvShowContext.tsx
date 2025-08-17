import React, { useState, useCallback, useEffect } from "react";
import { BaseTvShowProps } from "../types/interfaces";
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
}
const initialContextState: TvShowContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const TvShowContext =
  React.createContext<TvShowContextInterface>(initialContextState);

const TvShowContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserFavourites = async () => {
      if (!currentUser) {
        setFavourites([]);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavourites(userData.favouriteTvShows || []);
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

  return (
    <TvShowContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </TvShowContext.Provider>
  );
};

export default TvShowContextProvider;
