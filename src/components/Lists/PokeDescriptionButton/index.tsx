import React, { FC } from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  data: {
    id: number;
    title: string;
  };
  isActive: boolean;
  backgroundColor: string;
}

export const PokeDescritionButton: FC<Props> = (props) => {
  const { isActive, backgroundColor, ...rest } = props;
  const { title } = props.data;

  return (
    <Container
      {...rest}
      isActive={isActive}
      backgroundColor={backgroundColor}
      activeOpacity={0.7}
    >
      <Title>{title}</Title>
    </Container>
  );
};
