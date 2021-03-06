import React, { useEffect, FC } from "react";
import { TouchableOpacityProps } from "react-native";

import { PokemonEvolutionChainDTO } from "../../dtos";

import { usePokemon } from "../../hooks/usePokemon";
import { usePokemonEvolution } from "../../hooks/usePokemonEvolution";

import {
  Container,
  Wrapper,
  SubWrapper,
  PokeImage,
  Image,
  Name,
  Level,
  NotEvolution,
} from "./styles";

interface Props extends TouchableOpacityProps {
  data: PokemonEvolutionChainDTO;
  backgroundColor: string;
  pokemonCurrentName: string;
  handleDescriptionSelected: (descriptionType: string) => void;
}

export const PokeEvolution: FC<Props> = (props) => {
  const { backgroundColor, pokemonCurrentName, handleDescriptionSelected } =
    props;
  const { species_name, image_url, min_level, item } = props.data;

  const { fetchPokemon } = usePokemon();
  const { pokemonEvolutionChain } = usePokemonEvolution();

  const [evolutionType, setEvolutionType] = React.useState<string>("");

  const handlePokemon = React.useCallback(
    (pokemonName: string) => {
      fetchPokemon(pokemonName);
      handleDescriptionSelected("info");
    },
    [pokemonEvolutionChain]
  );

  useEffect(() => {
    if (min_level) {
      setEvolutionType(`Level ${String(min_level)}`);
    } else if (item) {
      setEvolutionType(item?.name.replace("-", " "));
    }
  }, []);

  return (
    <Container>
      <Wrapper
        activeOpacity={0.7}
        onPress={() => handlePokemon(species_name)}
        disabled={species_name === pokemonCurrentName}
      >
        <SubWrapper>
          <PokeImage>
            <Image
              source={{
                uri: image_url
                  ? image_url
                  : "https://img1.gratispng.com/20171220/dxe/question-mark-png-5a3a85e2667e64.6782850215137848024198.jpg",
              }}
            />
            <Name>{species_name}</Name>
          </PokeImage>

          <Level backgroundColor={backgroundColor}>{evolutionType}</Level>
        </SubWrapper>
      </Wrapper>
    </Container>
  );
};
