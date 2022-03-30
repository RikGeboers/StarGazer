import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import CameraService from '../../../services/external/camera.service';
import { Layout, Select, SelectItem, Text, Button, Divider, Card, Spinner } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import * as Sharing from 'expo-sharing';
import { WarningModal } from "../components/warningModal";
export const ManageSessionImages = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [savedSessions, setSavedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [showWarning,setShowWarning] = useState(false);

  useEffect(() => {
    async function getSessions() {
      let result = await CameraService.GetSavedSessions();
      if (result.lenght == 0) {
        Toast.show({
          type: 'info',
          text1: `No saved settings found`
        });
      } else {
        setSavedSessions(result);
      }
    }
    getSessions();
  }, []);

  async function getSessions() {
    let result = await CameraService.GetSavedSessions();
    if (result.lenght == 0) {
      Toast.show({
        type: 'info',
        text1: `No saved settings found`
      });
    } else {
      Toast.show({
        type: 'success',
        text1: `Saved sessions fetch completed`
      });
      setSavedSessions(result);
    }
  }

  async function getSelectedSessionPhotos() {
    setLoading(true);
    let response = await CameraService.GetSelectedSessionPhotos(savedSessions[selectedIndex.row]).then(async (response) => {
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: `Session zip downloaded`,
        })
        setCurrentFile(response.uri);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'ERROR: Failed downloading the preview image.'
        });
      }
    })
  }

  async function exportCurrentFile() {
    let response = await Sharing.shareAsync(currentFile);
    console.log(response);
  }


   function deleteSessionFolderWarning(){
    setShowWarning(true);
  }

  async function deleteSessionFolder(){
      console.log('deleted');
      setShowWarning(false);
  }



  useEffect(() => {
    async function checkSelectedSession() {
      let imageCount = await CameraService.GetSessionImageCount(savedSessions[selectedIndex.row]);
      let sessionData = {
        imageCount: imageCount
      }
      setSessionData(sessionData);
    }
    checkSelectedSession();
  }, [selectedIndex]);


  let choices = [];

  savedSessions.forEach(function (item, index) {

    choices.push(
      <SelectItem title={item}
        key={index} />
    )
  });

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small' />
    </View>
  );


  const Header = (props) => (
    <View {...props}>
      <Text category='h6'>Session: {savedSessions[selectedIndex.row]}</Text>
    </View>
  );

  return (
    <>
      <Layout style={styles.container} level='3'>
        <Button
          mode="contained"
          style={styles.button}
          onPress={getSessions}
          status='success'
        // onPress={() => ExportImage()}
        >
          Refetch saved sessions
        </Button>
        <Select style={styles.select}
          label={() => <Text style={styles.label}>Select a saved session to manage</Text>}
          placeholder='Select a saved session'
          selectedIndex={selectedIndex}
          value={savedSessions[selectedIndex.row]}
          onSelect={index => setSelectedIndex(index)}>
          {choices}
        </Select>
        {savedSessions[selectedIndex.row] !== undefined
          ?
          <>
            <Card style={styles.card} header={Header}>
              <Text>
                The session contains {sessionData.imageCount} images.
              </Text>
            </Card>
            {loading
              ?
              <>

                <Button style={styles.button} mode="contained" accessoryLeft={LoadingIndicator} status='warning'
                >
                  LOADING
                </Button>
              </>
              :
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
            }
            {currentFile !== null
              ?
              <>
                <Button
                  mode="contained"
                  style={styles.button}
                  status='success'
                  onPress={exportCurrentFile}
                >
                  Export session ZIP file
                </Button>
              </>
              : null}
            <Button
              mode="contained"
              style={styles.button}
              status='danger'
              onPress={deleteSessionFolderWarning}
            >
              Delete session folder
            </Button>
          </>
          : null}

      <WarningModal function={deleteSessionFolder} 
      visible={showWarning} 
      setVisible={setShowWarning}
      mainText='Are you sure? This can not be reversed!'
      buttonType1='danger'
      buttonText1='Yes, delete'
      buttonType2='info'
      buttonText2="Don't delete"
      >

      </WarningModal>
      </Layout>


    </>
  );
};


const styles = StyleSheet.create({
  container: {
    //   minHeight: 128,
    margin: 10

  },
  label: {
    fontSize: 20,
    marginBottom: 5

  },
  select: {

  },
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  card: {
    marginTop: 5
  }
});

