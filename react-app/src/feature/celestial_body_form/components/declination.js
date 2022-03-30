import styled from "styled-components";
import React, { useState } from "react";
import NumericInput from "react-native-numeric-input";
import { Spacer } from "../../../components/spacer/spacer";
const Container = styled.View`
  flex-direction: row;
  width: 20%;
`;
export function DecForm(props) {
  const [degrees, setDegrees] = useState(0);
  const [arcMinutes, setArcMinutes] = useState(0);
  const [arcSeconds, setArcSeconds] = useState(0);
  function update() {
    props.dec(degrees, arcMinutes, arcSeconds);
  }
  return (
    <Container>
      <NumericInput
        type="up-down"
        minValue={-23}
        maxValue={23}
        totalWidth={100}
        totalHeight={50}
        valueType="real"
        onChange={(value) => {
          setDegrees(value);
          update();
        }}
      />
      <Spacer position="right" size="medium" />
      <NumericInput
        type="up-down"
        minValue={0}
        totalWidth={100}
        totalHeight={50}
        maxValue={59}
        onChange={(value) => {
          setArcMinutes(value);
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
          setArcSeconds(value);
          update();
        }}
      />
    </Container>
  );
}
