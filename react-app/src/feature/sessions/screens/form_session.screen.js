import { navigationRef } from "../../../../App";
import { Text } from "../../../components/typography/text";
import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import NumericInput from "react-native-numeric-input";
import styled from "styled-components";
import { Input } from "@ui-kitten/components";
import { Button, Icon } from "@ui-kitten/components";
LogBox.ignoreLogs(["Require cycle:"]);
import DateTimePicker from "@react-native-community/datetimepicker";
import { TimePicker } from "../components/form/timepicker";
import { RowContainer } from "../components/form/form-styles";
import { Spacer } from "../../../components/spacer/spacer";
import { SwitchButton } from "../components/form/switchButton";
import { TelescopeSection } from "../components/form/telescope";
import { SessionSection } from "../components/form/session";
import { PreviewSection } from "../components/form/preview";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import CameraService from "../../../services/external/camera.service";
import { InfoCardTitle } from "../../celestial_bodies/components/celestialBody-detail-card.styles";

const Container = styled.View`
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  height: 97%;
  background-color: rgba(255, 255, 255, 10);
  overflow: hidden;
`;
export function FormSessionScreen({ route, navigation }) {
  const { celestialBody } = route.params;
  const [session, setSession] = useState();
  const [cleared, setCleared] = useState(0);
  const [openJobs, setOpenJobs] = useState(false);
  const [openTelescope, setOpenTelescope] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  function onSubmit() {
    if (session.sessionName === "") {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
    } else {
      setCleared((prev) => prev + 1);
      console.log(session);

      CameraService.PostSession(session);
      navigation
        .getParent()
        .getParent()
        .navigate("Sessions", { screen: "ActiveSessions" });
    }
  }

  return (
    <ScrollView>
      <Container>
        <Text variant="title">Add Session </Text>
        <InfoCardTitle>
          <Text variant="descriptionTitle">General</Text>
        </InfoCardTitle>
        <Spacer position="bottom" size="medium" />
        <Text variant="body">Target: {celestialBody.name}</Text>
        <Spacer position="bottom" size="medium" />

        <SessionSection clear={cleared} session={setSession} />
        <TelescopeSection
          rightAscension={celestialBody.rightAscension}
          declination={celestialBody.declination}
          type={celestialBody.type}
        />
        <PreviewSection />
        <Spacer position="bottom" size="medium" />
        <Button status="primary" onPress={() => onSubmit()}>
          Submit
        </Button>
      </Container>
    </ScrollView>
  );
}
