import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Text,
  Select,
  SelectItem,
  Input,
} from "@ui-kitten/components";
import { Spacer } from "../../../../components/spacer/spacer";
const Container = styled.View`
  flex-direction: row;
`;
const LeftContainer = styled.View`
  flex: 2;
`;
const RightContainer = styled.View`
  margin-top: 15px;
  flex: 1;
`;
export const SettingsLoad = (props) => {
  let choices = [];

  props.loadedSettings.forEach(function (item, index) {
    choices.push(<SelectItem title={item.name} key={index} />);
  });

  return (
    <Container>
      <LeftContainer>
        <Select
          label={() => <Text>Favorite Camera Settings</Text>}
          placeholder="Select camera"
          selectedIndex={props.selectedIndex}
          value={choices[props.selectedIndex.row]}
          onSelect={(index) => props.setSelectedIndex(index)}
        >
          {choices}
        </Select>
      </LeftContainer>
      <Spacer position="right" size="medium" />
      <RightContainer>
        <Button
          status="success"
          onPress={() => props.loadCameraSettings(props.selectedIndex.row)}
        >
          Load
        </Button>
      </RightContainer>
    </Container>
  );
};
