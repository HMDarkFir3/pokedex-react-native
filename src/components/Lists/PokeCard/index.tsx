import React, { FC } from "react";
import { TouchableOpacityProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Results } from "../../../dtos/PokemonsDTO";

import { usePokemon } from "../../../hooks/usePokemon";

import { Container, Image, Wrapper, Name, Index } from "./styles";

interface Props extends TouchableOpacityProps {
  data: Results;
  index: number;
}

export const PokeCard: FC<Props> = (props) => {
  const { index, ...rest } = props;
  const { name } = props.data;

  //Hooks
  const { fetchPokemon } = usePokemon();

  //Navigation Hooks
  const { navigate } = useNavigation();

  function handlePokemon(pokemonId: string) {
    fetchPokemon(pokemonId);
    navigate("PokemonView");
  }

  return (
    <Container
      {...rest}
      activeOpacity={0.7}
      onPress={() => handlePokemon(name)}
    >
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
            index + 1
          }.png`,
        }}
      />

      <Wrapper>
        <Index>#{index + 1}</Index>
        <Name>{name}</Name>
      </Wrapper>
    </Container>
  );
};
