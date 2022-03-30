import React, { useState } from "react";
import CameraService from "../../../../services/external/camera.service";
import Toast from "react-native-toast-message";
import { Image, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Button, Icon } from "@ui-kitten/components";

import { InfoCardTitle } from "../../../celestial_bodies/components/celestialBody-detail-card.styles";
import { Text } from "../../../../components/typography/text";
import { Spacer } from "../../../../components/spacer/spacer";
import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";
export function PreviewSection() {
  const [previewImg, setPreviewImg] = useState();
  const [showPreview, setShowPreview] = useState();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [show, setShow] = useState(false);

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

  async function ExportImage() {
    checkPermission();
    if (previewImg !== undefined) {
      let asset = await MediaLibrary.createAssetAsync(previewImg);
      let folderExists = await MediaLibrary.getAlbumAsync("StarGazer");
      console.log(folderExists);
      if (folderExists === null) {
        await MediaLibrary.createAlbumAsync("StarGazer", asset, false);
        Toast.show({
          type: "info",
          text1: `Image saved in new folder: StarGazer.`,
          text2: `The folder is in your images folder on your phone`,
        });
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, folderExists.id, false);
        Toast.show({
          type: "info",
          text1: `Image saved in folder: StarGazer.`,
          text2: `The folder is in your images folder on your phone`,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: `No image present.`,
      });
    }
  }
  const CameraIcon = (props) => <Icon {...props} name="camera" />;
  const PreviewButton = styled(Button)`
    margin: 0px 64px 0px 64px;
  `;
  return (
    <>
      <SectionTitle title="Preview" update={setShowPreview} />
      <Spacer position="bottom" size="medium" />
      {showPreview && (
        <>
          <PreviewButton
            appearance="outline"
            status="primary"
            accessoryLeft={CameraIcon}
            onPress={() => {
              GetPreviewImage();
              setShow(true);
            }}
          >
            Take Preview
          </PreviewButton>

          {show && (
            <>
              <Image
                source={{ uri: previewImg }}
                style={{ flex: 2, resizeMode: "contain" }}
              />
              <PreviewButton
                icon="camera"
                mode="contained"
                disabled={previewImg === undefined}
                onPress={() => {
                  ExportImage();
                }}
              >
                Export Image
              </PreviewButton>
            </>
          )}
        </>
      )}
    </>
  );
}
