import React, { useState, useEffect } from "react";
import { Select, SelectItem, Text } from "@ui-kitten/components";

export const SettingsSelect = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let choices = [];
  props.choices.forEach(function (item, index) {
    choices.push(<SelectItem title={item} key={index} />);
  });
  function SettingUpdate() {
    if (props.choices[selectedIndex.row] !== undefined) {
      let cameraSetting = {
        setting: props.setting,
        value: props.choices[selectedIndex.row]
          .substring(0, 3)
          .split(" ")
          .join(""),
      };

      props.update(cameraSetting);
    }
  }
  useEffect(() => {
    SettingUpdate();
  }, [selectedIndex]);

  return (
    <Select
      label={() => <Text>{props.setting}</Text>}
      placeholder="Select a value"
      selectedIndex={selectedIndex}
      value={props.choices[selectedIndex.row]}
      onSelect={(index) => {
        setSelectedIndex(index);
      }}
    >
      {choices}
    </Select>
  );
};
