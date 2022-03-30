import { Button } from "@ui-kitten/components";
import react, { useState, useEffect } from "react";
import { StyleSheet } from "react-native-web";

import styled from "styled-components";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const ButtonStyled = styled(Button)`
  border: ${(props) =>
    props.$active ? "2px solid #3568FF" : "2px solid #F2F2F2"};
`;

export function SwitchButton(props) {
  const [active, setActive] = useState("left");

  function changeActive(state) {
    state !== "true"
      ? (setActive("right"), props.active(false))
      : (setActive("left"), props.active(true));
  }
  useEffect(() => {
    props.update();
  }, [active]);
  useEffect(() => {
    setActive("left");
  }, [props.clear]);

  return (
    <Container>
      <ButtonStyled
        appearance="ghost"
        $active={active === "left" ? true : false}
        onPress={() => changeActive("true")}
      >
        {props.left}
      </ButtonStyled>
      <ButtonStyled
        appearance="ghost"
        $active={active === "right" ? true : false}
        onPress={() => changeActive("false")}
      >
        {props.right}
      </ButtonStyled>
    </Container>
  );
}
