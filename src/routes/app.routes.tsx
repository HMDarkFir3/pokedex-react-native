import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { Home } from "../screens/Home";
import { PokemonView } from "../screens/PokemonView";
import { Pokedex } from "../screens/Pokedex";
import { ErrorView } from "../screens/ErrorView";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="PokemonView" component={PokemonView} />
      <Screen name="Pokedex" component={Pokedex} />
      <Screen name="ErrorView" component={ErrorView} />
    </Navigator>
  );
};
