import React, { useState, useCallback } from "react";
import { Person } from "../types/interfaces";

interface PersonContextInterface {
  favourites: number[];
  addToFavourites: (person: Person) => void;
  removeFromFavourites: (person: Person) => void;
}
const initialContextState: PersonContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const PersonContext =
  React.createContext<PersonContextInterface>(initialContextState);

const PersonContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = useCallback((person: Person) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(person.id)) {
        return [...prevFavourites, person.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((person: Person) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((pId) => pId !== person.id)
    );
  }, []);

  return (
    <PersonContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContextProvider;
