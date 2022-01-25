import * as React from "react";
import { TextInput, FlatList } from "react-native";
import { useKeyboard } from "@react-native-community/hooks";

//Components Folder
import Input from "../../components/Input";
import PokeCard from "../../components/PokeCard";

//Utils Folder
import { pokeCards } from "../../utils/pokeCards";

//Styles
import { Container, Content, Title } from "./styles";

const Home: React.FC = () => {
  //Refs
  const inputRef = React.useRef<TextInput>(null);

  //Community Hooks
  const keyboard = useKeyboard();

  function inputOnBlur() {
    if (keyboard.keyboardShown === false) {
      inputRef.current?.blur();
    }
  }

  React.useEffect(() => {
    inputOnBlur();
  }, [keyboard.keyboardShown]);

  return (
    <Container>
      <Content>
        <Title>What are{"\n"}you looking for?</Title>

        <Input
          ref={inputRef}
          placeholder="Search pokemons, items, etc"
          onBlur={inputOnBlur}
        />

        <FlatList
          data={pokeCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <PokeCard data={item} index={index} />
          )}
          contentContainerStyle={{
            marginTop: 20,
          }}
          numColumns={2}
        />
      </Content>
    </Container>
  );
};

export default Home;
