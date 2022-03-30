import DirectionControls from "./celestialBody-direction-controls";
import { Button, Icon } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import TelescopeService from "../../../services/external/telescope.service";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer";
import * as MediaLibrary from "expo-media-library";
import { Image } from "react-native";
import CameraService from "../../../services/external/camera.service";
export function PreviewBody(props) {
  const [preview, setPreview] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [show, setShow] = useState(false);
  const [previewImg, setPreviewImg] = useState();
  const EyeIcon = (props) => <Icon {...props} name="eye" />;
  const CameraIcon = (props) => <Icon {...props} name="camera" />;
  const SessionButton = styled(Button)`
    margin: 0px 16px 0px 16px;
  `;
  const Container = styled.View`
    margin: 16px;
    height: 65%;
    border-radius: 8px;

    background-color: rgba(255, 255, 255, 10);
    overflow: hidden;
  `;
  useEffect(() => {}, [preview]);
  async function GetPreviewImage() {
    checkPermission();
    let response = await CameraService.GetPreview()
      .then((response) => {
        if (response.status === 200) {
          setPreviewImg(response.uri);
          Toast.show({
            type: "success",
            text1: `Preview image downloaded.`,
          });
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "ERROR: Failed downloading the preview image.",
        });
      });
  }

  async function checkPermission() {
    console.log(status.granted);
    if (status.granted === false) {
      await MediaLibrary.requestPermissionsAsync().catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <>
      <SessionButton
        status="primary"
        appearance="outline"
        accessoryLeft={EyeIcon}
        onPress={() => {
          TelescopeService.Align(
            props.rightAscension,
            props.declination,
            props.type
          );
          setPreview(true);
        }}
      >
        Navigate telescope
      </SessionButton>
      {preview && (
        <>
          <Spacer />
          <SessionButton
            status="primary"
            appearance="outline"
            accessoryLeft={CameraIcon}
            onPress={() => {
              GetPreviewImage();
              setShow(true);
            }}
          >
            Take a photo
          </SessionButton>
          {show && (
            <>
              <Image
                source={{ uri: previewImg }}
                style={{ flex: 2, resizeMode: "contain" }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
