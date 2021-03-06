import React, { useState, createContext, FC, ReactNode } from "react";

import api from "../services/api";

import { PokemonEvolutionChainDTO } from "../dtos";

import { usePokemon } from "../hooks/usePokemon";

export const PokemonEvolutionContext = createContext(
  {} as PokemonEvolutionContextData
);

interface PokemonEvolutionContextData {
  pokemonEvolutionChain: PokemonEvolutionChainDTO[];
  isLoading: boolean;
  fetchPokemonEvolution: () => void;
}

interface PokemonEvolutionProviderProps {
  children: ReactNode;
}

export const PokemonEvolutionProvider: FC<PokemonEvolutionProviderProps> = ({
  children,
}) => {
  //Hooks
  const { pokemonSpecies } = usePokemon();

  //Evolution States
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<
    PokemonEvolutionChainDTO[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchEvolutionImages(evolutionChain) {
    for (let i = 0; i < evolutionChain.length; i++) {
      const response = await api.get(
        `pokemon-species/${evolutionChain[i].species_name}`
      );

      evolutionChain[i][
        "image_url"
      ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${response.data.id}.png`;
    }

    setPokemonEvolutionChain((oldState) => [oldState, ...evolutionChain]);
  }

  async function fetchPokemonEvolution() {
    try {
      setIsLoading(true);

      if (pokemonEvolutionChain.length >= 1) {
        setPokemonEvolutionChain([]);
      }

      await api
        .get(`${pokemonSpecies.evolution_chain.url}`)
        .then((response) => {
          let evoChain = [];
          let evoData = response.data.chain;
          let count: number = 0;

          do {
            let evoDetails = evoData["evolution_details"][0];
            let numberOfEvolutions = evoData.evolves_to.length;

            evoChain.push({
              id: count,
              species_name: evoData.species.name,
              min_level: !evoDetails ? 1 : evoDetails.min_level,
              trigger_name: !evoDetails ? null : evoDetails.trigger.name,
              item: !evoDetails ? null : evoDetails.item,
            });

            if (numberOfEvolutions > 1) {
              for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push({
                  id: count,
                  species_name: evoData.evolves_to[i].species.name,
                  min_level: !!evoData.evolves_to[i]
                    ? 1
                    : evoData.evolves_to[i].min_level,
                  trigger_name: !!evoData.evolves_to[i]
                    ? null
                    : evoData.evolves_to[i].trigger.name,
                  item: !!evoData.evolves_to[i]
                    ? null
                    : evoData.evolves_to[i].item,
                });
              }
            }

            count++;
            evoData = evoData.evolves_to[0];
          } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

          fetchEvolutionImages(evoChain);
        });
    } catch (error) {
      setPokemonEvolutionChain([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PokemonEvolutionContext.Provider
      value={{
        pokemonEvolutionChain,
        isLoading,
        fetchPokemonEvolution,
      }}
    >
      {children}
    </PokemonEvolutionContext.Provider>
  );
};
