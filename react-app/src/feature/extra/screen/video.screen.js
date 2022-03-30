import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utils/SafeArea";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Input, Spinner } from '@ui-kitten/components';
import CameraService from '../../../services/external/camera.service';
import Toast from "react-native-toast-message";
import { WarningModal } from "../components/warningModal";
import * as Sharing from 'expo-sharing';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;


const Header = (props) => (
  <View {...props}>
    <Text category='h6'>Create a video</Text>
  </View>
);

const DownloadHeader = (props) => (
  <View {...props}>
    <Text category='h6'>Download video</Text>
  </View>
);

const ExportHeader = (props) => (
  <View {...props}>
    <Text category='h6'>Export video</Text>
  </View>
);



const UserInput = (props) => (
  <View style={styles.footerContainer}>
    <Input
      label='Choose the video length in seconds'
      style={styles.input}
      placeholder='Video length'
      value={props.videoLength}
      keyboardType='numeric'
      onChangeText={nextValue => props.setVideoLength(nextValue)}
    />
    <Button
      mode="contained"
      style={styles.button}
      status='success'
      size='small'
      onPress={props.showWarningFunction}
    >
      Start video
    </Button>
    <WarningModal function={props.startVideo}
      visible={props.showWarning}
      setVisible={props.setShowWarning}
      mainText='This will delete the previous video on the Raspi, are you sure?'
      buttonType1='danger'
      buttonText1='Yes, record new video'
      buttonType2='info'
      buttonText2="Cancel"
    ></WarningModal>
  </View>
);








export const VideoScreen = () => {
  const [videoLength, setVideoLength] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [downloading, setDownloading] = useState(false);

  function showWarningFunction() {
    setShowWarning(true);
  }

  useEffect(() => {

  }, []);


  async function startVideo() {
    setShowWarning(false);
    if (videoLength <= 0 || isNaN(videoLength)) {
      Toast.show({
        type: "error",
        text1: `Please input a valid video length`,
      });
    } else {
      let response = await CameraService.PostCreateVideoAction(videoLength);
    }

  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small' />
    </View>
  );

  async function downloadVideo() {
    setDownloading(true);
    let response = await CameraService.GetCreatedVideo();
    if (response.status !== 200) {
      Toast.show({
        type: "error",
        text1: `Failed to download: File not found.`,
      });
      setDownloading(false);
    } else {
      setVideoUri(response.uri);
      setDownloading(false);
    }
  }

  async function exportVideo() {
    let response = await Sharing.shareAsync(videoUri);
    console.log(response);

  }


  return (
    <>
      <Card status='danger' style={styles.card}>
        <Text>
          Creating a video overwrites the previously created video, make sure you have exported the video if you
          still need the file.
        </Text>
      </Card>
      <Card style={styles.card} header={Header}>
        <UserInput showWarningFunction={showWarningFunction} showWarning={showWarning}
          setShowWarning={setShowWarning} videoLength={videoLength} setVideoLength={setVideoLength} startVideo={startVideo}></UserInput>

      </Card>
      <Card style={styles.card} header={DownloadHeader}>

        {downloading
          ?
          <>
            <Button mode="contained" accessoryLeft={LoadingIndicator} status='warning'>
              Downloading
            </Button>
          </>
          :
          <>
            <Button
              mode="contained"
              status='success'
              onPress={downloadVideo}
            >
              Download existing video file
            </Button>
          </>
        }
      </Card>

      {videoUri === null
        ?
        null
        : <>
          <Card style={styles.card} header={ExportHeader}>
            <Button
              mode="contained"
              status='success'
              onPress={exportVideo}
            >
              Export video file
            </Button>
          </Card>
        </>
      }
    </>
  );
};


const styles = StyleSheet.create({
  button: {
    maxHeight: 40,
    marginTop: 10,
    width: '45%'
  },
  card: {
    margin: 5,
  },
  input: {
    marginRight: 5,
    marginTop: -10
  },
  footerContainer: {
    flexDirection: 'row',
  }
});
