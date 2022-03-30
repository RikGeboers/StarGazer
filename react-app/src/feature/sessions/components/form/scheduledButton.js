import { Button, Icon } from "@ui-kitten/components";

import React from "react";
import styled from "styled-components";
import { Spacer } from "../../../../components/spacer/spacer";
const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export function ScheduledJobController(props) {
  const AddIcon = (props) => <Icon {...props} name="plus" />;
  const MinusIcon = (props) => <Icon {...props} name="minus" />;

  return (
    <Container>
      <Button
        onPress={() => {
          props.control("add");
          props.update();
        }}
        status="success"
        accessoryRight={AddIcon}
      />
      {props.length > 1 && (
        <>
          <Spacer position="right" size="small" />
          <Button
            onPress={() => {
              props.control("remove");
              props.update();
            }}
            status="danger"
            accessoryRight={MinusIcon}
          />
        </>
      )}
    </Container>
  );
}
