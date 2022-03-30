import { Text } from "../../../../components/typography/text";
import {
  ButtonTitleEnd,
  SectionTitleArea,
  TilteArea,
  TilteBorder,
} from "./form-styles";
import { Button, Icon } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";

export function SectionTitle(props) {
  const DropDownIcon = (props) => <Icon {...props} name="chevron-down" />;
  const DropUpIcon = (props) => <Icon {...props} name="chevron-up" />;
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    props.update(show);
  }, [show]);

  return (
    <SectionTitleArea
      onPress={() => {
        show ? setShow(false) : setShow(true);
      }}
    >
      <TilteArea>
        <TilteBorder>
          <Text variant="descriptionTitle">{props.title}</Text>
        </TilteBorder>
      </TilteArea>
      <ButtonTitleEnd>
        <Button
          onPress={() => {
            show ? setShow(false) : setShow(true);
          }}
          appearance="ghost"
          accessoryRight={show ? DropUpIcon : DropDownIcon}
        ></Button>
      </ButtonTitleEnd>
    </SectionTitleArea>
  );
}
