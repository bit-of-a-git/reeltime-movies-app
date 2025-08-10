import React, { useState, useCallback } from "react";
import { Person } from "../types/interfaces";

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
