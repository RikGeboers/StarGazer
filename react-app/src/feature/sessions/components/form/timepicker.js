import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Icon, Layout, Spinner } from "@ui-kitten/components";
import styled from "styled-components";
import { Platform } from "react-native";
const TimePickerContainer = styled.View`
  flex-grow: 1;
  flex-direction: ${Platform.OS === "ios" ? "column" : "row"};
  justify-content: flex-end;
`;
export function TimePicker(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    let currentDate = date;
    if (selectedDate !== undefined) {
      currentDate = selectedDate;
    }
    setShow(false);
    setDate(currentDate);
    if (props.item != null) {
      props.time(currentDate, props.item);
    } else {
      props.time(currentDate);
    }
    props.update();
  };
  const TimeIcon = (props) => <Icon {...props} name="clock-outline" />;
  return (
    <TimePickerContainer>
      {!show && Platform.OS !== "ios" ? (
        <Button
          onPress={() => setShow(true)}
          accessoryLeft={TimeIcon}
          appearance="outline"
        >
          {props.buttonTitle}
        </Button>
      ) : (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </TimePickerContainer>
  );
}
