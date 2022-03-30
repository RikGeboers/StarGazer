import { Button, Icon } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { CameraSetting } from "./camera";
export function CameraButton(props) {
  const DropDownIcon = (props) => <Icon {...props} name="chevron-down" />;
  const DropUpIcon = (props) => <Icon {...props} name="chevron-up" />;
  const [open, setOpen] = useState(props.open);

  useEffect(() => {}, [open]);
  function onPress() {
    open ? setOpen(false) : setOpen(true);
    if (props.item === undefined) {
      props.update(open);
    } else {
      props.update(props.item);
    }
  }
  return (
    <>
      <Button
        onPress={() => onPress()}
        accessoryLeft={open ? DropUpIcon : DropDownIcon}
        appearance="ghost"
      ></Button>
    </>
  );
}
