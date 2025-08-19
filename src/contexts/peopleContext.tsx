import React, { useState, useCallback, useEffect } from "react";
import { BasePersonProps as Person } from "../types/people";
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

interface PeopleContextInterface {
  favourites: number[];
  addToFavourites: (person: Person) => void;
  removeFromFavourites: (person: Person) => void;
}
const initialContextState: PeopleContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const PeopleContext =
  React.createContext<PeopleContextInterface>(initialContextState);

const PeopleContextProvider: React.FC<React.PropsWithChildren> = ({
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
          setFavourites(userData.favouritePeople || []);
        } else {
          setFavourites([]);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserFavourites();
  }, [currentUser]);

  const addToFavourites = useCallback(
    async (person: Person) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) => {
        if (!prevFavourites.includes(person.id)) {
          return [...prevFavourites, person.id];
        }
        return prevFavourites;
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        await updateDoc(userDocRef, {
          favouritePeople: arrayUnion(person.id),
        });
      } catch (error) {
        try {
          await setDoc(
            userDocRef,
            {
              favouritePeople: [person.id],
              email: currentUser.email,
            },
            { merge: true }
          );
        } catch (createError) {
          console.error("Error adding to favourites:", createError);
        }
      }
    },
    [currentUser]
  );

  const removeFromFavourites = useCallback(
    async (person: Person) => {
      if (!currentUser) return;

      setFavourites((prevFavourites) =>
        prevFavourites.filter((pId) => pId !== person.id)
      );

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          favouritePeople: arrayRemove(person.id),
        });
      } catch (error) {
        console.error("Error removing from favourites:", error);
      }
    },
    [currentUser]
  );

  return (
    <PeopleContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContextProvider;
