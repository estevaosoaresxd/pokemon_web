import { createContext, useContext } from "react";

const PokemonContext = createContext({});

const PokemonContextProvider = ({ children, value }) => {
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

const usePokemon = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonContextProvider");
  }

  return context;
};

export { PokemonContextProvider, usePokemon };
