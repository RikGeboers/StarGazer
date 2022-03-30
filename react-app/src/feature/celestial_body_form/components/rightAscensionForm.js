import styled from "styled-components";
import React, { useState } from "react";
import NumericInput from "react-native-numeric-input";
import { Spacer } from "../../../components/spacer/spacer";
const Container = styled.View`
  flex-direction: row;
`;
export function RaForm(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  function update() {
    props.ra(hours, minutes, seconds);
  }
  return (
    <Container>
      <NumericInput
        type="up-down"
        minValue={0}
        maxValue={23}
        totalWidth={100}
        totalHeight={50}
        onChange={(value) => {
          setHours(value);
          update();
        }}
      />
      <Spacer position="right" size="medium" />
      <NumericInput
        type="up-down"
        minValue={0}
        maxValue={59}
        totalWidth={100}
        totalHeight={50}
        onChange={(value) => {
          setMinutes(value);
          update();
        }}
      />
      <Spacer position="right" size="medium" />
      <NumericInput
        type="up-down"
        minValue={0}
        maxValue={59}
        totalWidth={100}
        totalHeight={50}
        onChange={(value) => {
          setSeconds(value);
          update();
        }}
      />
    </Container>
  );
}
