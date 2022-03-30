import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import Toast from "react-native-toast-message";
import { ScrollView, StyleSheet } from "react-native";
import { SettingsComponent } from "../components/settingsComponent";
import CameraService from "../../../services/external/camera.service";
import { Button, Layout } from "@ui-kitten/components";
import { SettingsLoadCard } from "../components/settingsLoadCard";
import { CameraSettingsContext } from "../../../services/internal/camera/cameraSettings";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const CameraSettingsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [cameraSettings, setCameraSettings] = useState([]);
  const [showReload, setShowReload] = useState(false);
  let settingsComponent = [];
  const [cameraName, setCameraName] = useState(null);
  const [loadedSettings, setLoadedSettings] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { cameraSavedSettings, replaceSetting } = useContext(
    CameraSettingsContext
  );
  useEffect(() => {
    setLoadedSettings(cameraSavedSettings);
  }, [cameraSavedSettings]);

  useEffect(() => {
    settingsComponent = [];
    cameraSettings.forEach(function (item, index) {
      settingsComponent.push(
        <SettingsComponent
          setting={item.value}
          choices={item.choices}
          key={index}
        />
      );
    });
  }, [cameraSettings]);

  cameraSettings.forEach(function (item, index) {
    settingsComponent.push(
      <SettingsComponent
        setting={item.value}
        choices={item.choices}
        key={index}
      />
    );
  });

  function saveCameraSettings() {
    if (cameraName === null) {
      Toast.show({
        type: "error",
        text1: "Please enter a camera name first.",
      });
    } else if (cameraSettings.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please fetch settings first.",
      });
    } else {
      let preloaded = [...loadedSettings];
      let settings = {
        name: cameraName,
        settings: cameraSettings,
      };
      preloaded.push(settings);
      setLoadedSettings(preloaded);
      //changed
      replaceSetting(preloaded);
    }
  }

  function loadCameraSettings(selectedSettingsIndex) {
    setCameraSettings(cameraSavedSettings[selectedSettingsIndex].settings);
  }

  function deleteCameraSettings(selectedSettingsIndex) {
    let loaded = [...loadedSettings];
    loaded.splice(selectedSettingsIndex, 1);
    setLoadedSettings(loaded);
    setSelectedIndex(0);
    replaceSetting(loaded);
  }

  async function fetchData() {
    setLoading(true);
    setShowReload(false);
    try {
      let settings = await CameraService.GetCameraSettings(
        setLoading,
        setShowReload
      );
      let filledSettings = [];
      for (let i = 0; i < settings.length; i++) {
        try {
          let choices = await CameraService.GetConfigSettingsChoices(
            settings[i]
          );
          if (
            choices.length !== 0 &&
            choices !== null &&
            choices !== undefined
          ) {
            let filledSetting = {
              value: settings[i],
              choices: choices,
            };
            filledSettings.push(filledSetting);
          }
        } catch (err) {
          console.log("Failed getting settings:" + settings[i]);
        }
      }
      setCameraSettings(filledSettings);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowReload(true);
    }
  }

  const styles = StyleSheet.create({
    button: {
      margin: 10
    },
    container: {
      margin: 10,
      backgroundColor: "red",
    },
    card: {
      margin: 10,
    },
  });

  return (
    <>
      <ScrollView>
        <Layout tyle={styles.container}>
          <SettingsLoadCard
            setCameraName={setCameraName}
            cameraName={cameraName}
            saveCameraSettings={saveCameraSettings}
            fetchData={fetchData}
            loadedSettings={loadedSettings}
            loadCameraSettings={loadCameraSettings}
            deleteCameraSettings={deleteCameraSettings}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          ></SettingsLoadCard>
          {settingsComponent}
        </Layout>
        {showReload && (
          <Button
            style={styles.button}
            status="danger"
            onPress={() => fetchData()}
          >
            Retry fetching settings
          </Button>
        )}
      </ScrollView>
      {loading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
    </>
  );
};
