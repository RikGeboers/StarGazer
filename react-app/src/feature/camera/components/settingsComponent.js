import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import CameraService from "../../../services/external/camera.service";
import Toast from "react-native-toast-message";

import styled from "styled-components";
import { FavouriteCameraContext } from "../../../services/internal/camera/favouriteSetting";

const RowContainer = styled.View`
  flex-direction: row;

  justify-content: flex-end;
`;
const UpdateButton = styled(Button)`
  margin-right: 16px;

  flex-grow: 1;
`;
const FavoriteButton = styled(Button)`
  margin-right: 16px;
`;
export const SettingsComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { favourites, addToFavourites, removeFromFavourites } = useContext(
    FavouriteCameraContext
  );
  const styles = StyleSheet.create({
    container: {
      //   minHeight: 128,
      margin: 10,
    },
    label: {
      fontSize: 20,
    },
    select: {},
    button: {
      marginTop: 5,
    },
  });
  useEffect(() => {
    favourites.filter((s) => s === props.setting).length === 0
      ? setIsFavorite(false)
      : setIsFavorite(true);
  }, [favourites, props.setting]);

  async function postSettingsValue() {
    if (props.choices[selectedIndex.row] !== undefined) {
      let cameraSetting = {
        setting: props.setting,
        value: props.choices[selectedIndex.row]
          .substring(0, 3)
          .split(" ")
          .join(""),
      };
      console.log(cameraSetting.value);
      let result = await CameraService.PostCameraSetting(cameraSetting);
      if (result == 200) {
        Toast.show({
          type: "success",
          text1: `Updating settings`,
          text2: `${props.setting} updated was successful`,
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: `Please select a value first.`,
      });
    }
  }

  let choices = [];

  props.choices.forEach(function (item, index) {
    choices.push(<SelectItem title={item} key={index} />);
  });
  const StarIcon = (props) => <Icon {...props} name="star" />;
  function saveFavorite() {
    if (isFavorite) {
      setIsFavorite(false);
      removeFromFavourites(props.setting);
    } else {
      setIsFavorite(true);
      addToFavourites(props.setting);
    }
  }
  return (
    <Layout style={styles.container} level="3">
      <Select
        style={styles.select}
        label={() => <Text style={styles.label}>{props.setting}</Text>}
        placeholder="Select a value"
        selectedIndex={selectedIndex}
        value={props.choices[selectedIndex.row]}
        onSelect={(index) => setSelectedIndex(index)}
      >
        {choices}
      </Select>
      <RowContainer>
        <UpdateButton status="info" onPress={() => postSettingsValue()}>
          Update {props.setting} setting
        </UpdateButton>

        <FavoriteButton
          appearance="outline"
          status={isFavorite ? "warning" : "basic"}
          accessoryLeft={StarIcon}
          onPress={() => saveFavorite()}
        ></FavoriteButton>
      </RowContainer>
    </Layout>
  );
};
