import TelescopeService from "../../../services/external/telescope.service";
import { DirectionRow } from "./celestialBody-info-card.styles";
import { Spacer } from "../../../components/spacer/spacer";
import { IconButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Snackbar, Text } from "react-native-paper";
import { View } from "react-native";

export default function DirectionControls() {
  const [trackRate, setTrackRate] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  async function move(direction, trackRate) {
    try {
      let response = await TelescopeService.Move(direction, trackRate);
      setInfoMessage(response.data);
      setShowInfo(true);
    } catch (error) {
      setInfoMessage(error.response.data);
      setShowInfo(true);
    }
  }

  return (
    <>
      <DirectionRow>
        <Text>Trackrate: {trackRate}</Text>
      </DirectionRow>
      <DirectionRow>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={9}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="black"
          step={1}
          onValueChange={(value) => setTrackRate(value)}
          thumbTintColor={"blue"}
        />
      </DirectionRow>
      <DirectionRow>
        <IconButton
          icon="arrow-up"
          type="clear"
          onPressIn={() => move("up", trackRate)}
          onPress={() => move("up", 0)}
        />
      </DirectionRow>
      <DirectionRow>
        <IconButton
          icon="arrow-left"
          type="clear"
          onPressIn={() => move("left", trackRate)}
          onPress={() => move("left", 0)}
        />
        <Spacer position="right" size="photo" />
        <IconButton
          icon="arrow-right"
          type="clear"
          onPressIn={() => move("right", trackRate)}
          onPress={() => move("right", 0)}
        />
      </DirectionRow>
      <DirectionRow>
        <IconButton
          icon="arrow-down"
          type="clear"
          onPressIn={() => move("down", trackRate)}
          onPress={() => move("down", 0)}
        />
      </DirectionRow>
      <Snackbar
        visible={showInfo}
        onDismiss={() => setShowInfo(false)}
        action={{
          label: "OK",
        }}
        style={{ backgroundColor: "white" }}
      >
        <View>
          <Text>{infoMessage}</Text>
        </View>
      </Snackbar>
    </>
  );
}
