import React, { useEffect, useState } from "react";
import {
  Layout,
  Select,
  SelectItem,
  Text,
  Button,
  Divider,
  Card,
  Spinner,
  List,
  ListItem,
} from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import { StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { WarningModal } from "./warningModal";
import CameraService from "../../../../services/external/camera.service";

export const FinishedSessionDetail = ({ session,deleteSessionFolderFunction }) => {
  const [sessionData, setSessionData] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Session: {session}</Text>
    </View>
  );


  async function getSelectedSessionPhotos() {
    setLoading(true);
    let response = await CameraService.GetSelectedSessionPhotos(session).then(
      async (response) => {
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: `Session zip downloaded`,
          });
          setCurrentFile(response.uri);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "ERROR: Failed downloading the preview image.",
          });
        }
      }
    );
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  async function exportCurrentFile() {
    let response = await Sharing.shareAsync(currentFile);
    console.log(response);
  }

  function deleteSessionFolderWarning() {
    setShowWarning(true);
  }

  async function deleteSessionFolder() {
    deleteSessionFolderFunction(session);
    setShowWarning(false);
  }

  async function showDetailsFuntion() {
    setLoadingDetails(true);
    let imageCount = await CameraService.GetSessionImageCount(session);
    let sessionData = {
      imageCount: imageCount - 1,
    };
    setSessionData(sessionData);
    setShowDetails(true);
    setLoadingDetails(false);
  }

  function hideDetailsFunction() {
    setShowDetails(false);
  }

  return (
    <>
      <Card style={styles.card} header={Header}>
        {showDetails ? (
          <>
            <Text>The session contains {sessionData.imageCount} images.</Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={hideDetailsFunction}
            >
              Hide Details
            </Button>
            {loading ? (
              <>
                <Button
                  style={styles.button}
                  mode="contained"
                  accessoryLeft={LoadingIndicator}
                  status="warning"
                  onPress={getSelectedSessionPhotos}
                >
                  LOADING
                </Button>
              </>
            ) : (
              <>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={getSelectedSessionPhotos}
                  // onPress={() => ExportImage()}
                >
                  Download selected session photos
                </Button>
              </>
            )}
            {currentFile !== null ? (
              <>
                <Button
                  mode="contained"
                  style={styles.button}
                  status="success"
                  onPress={exportCurrentFile}
                >
                  Export session ZIP file
                </Button>
              </>
            ) : null}
            <Button
              mode="contained"
              style={styles.button}
              status="danger"
              onPress={deleteSessionFolderWarning}
            >
              Delete session folder
            </Button>
          </>
        ) : (
          <>
            {loadingDetails ? (
              <>
                <Button
                  style={styles.button}
                  mode="contained"
                  accessoryLeft={LoadingIndicator}
                  status="warning"
                >
                  LOADING
                </Button>
              </>
            ) : (
              <>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={showDetailsFuntion}
                >
                  Show Details
                </Button>
              </>
            )}
          </>
        )}
      </Card>
      <WarningModal
        function={deleteSessionFolder}
        visible={showWarning}
        setVisible={setShowWarning}
        mainText="Are you sure? This can not be reversed!"
        buttonType1="danger"
        buttonText1="Yes, delete"
        buttonType2="info"
        buttonText2="Don't delete"
      ></WarningModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //   minHeight: 128,
    margin: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  select: {},
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    marginTop: 5,
  },
});
