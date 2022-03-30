import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import CameraService from "../../../services/external/camera.service";
import { Layout,Card,Text } from "@ui-kitten/components";
import Toast from "react-native-toast-message";

import { FinishedSessionDetail } from "../components/finished/finishedSessionDetail";
export function FinishedSessionScreen() {
  const [savedSessions, setSavedSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getSessions() {
      let result = await CameraService.GetSavedSessions();
      if (result.lenght == 0 && result.length !== undefined) {
        Toast.show({
          type: "info",
          text1: `No finished settings found`,
        });
      } else {
        setSavedSessions(result);
      }
    }
    getSessions();
  }, []);

  async function deleteSessionFolderFunction(sessionName){

    let response = await CameraService.DeleteSessionFolder(sessionName);

    if(response.status == 200){
      let sessions = [...savedSessions];
      let index = sessions.indexOf(sessions.find(s=>s === sessionName));
      console.log(index);
      if(index > -1){
         sessions.splice(index,1);
      }
      setSavedSessions(sessions);
      Toast.show({
        type: "success",
        text1: `Deleted successfully`,
      });
    }else{
      Toast.show({
        type: "error",
        text1: `Failed to delete folder`,
      });
    }


  }

  async function refreshData() {
    let result = await CameraService.GetSavedSessions();
    if (result.lenght == 0 && result.length !== undefined) {
      Toast.show({
        type: "info",
        text1: `No finished settings found`,
      });
    } else {
      setSavedSessions(result);
    }
  }

  let sessions = [];

  savedSessions.forEach(function (item, index) {
    sessions.push(
      <FinishedSessionDetail session={item} deleteSessionFolderFunction={deleteSessionFolderFunction} key={item}></FinishedSessionDetail>
    );
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
    >
      {savedSessions.length == 0 ? (
        <>
          <Card style={styles.card}
          status="info">
            <Text>
              There are no finished sessions, pull down to refresh.
            </Text>
          </Card>
        </>
      ) : (
        <Layout style={styles.container} level="3">
          {sessions}
        </Layout>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //   minHeight: 128,
    margin: 10,
  },
  card: {
    margin: 10
  }
});
