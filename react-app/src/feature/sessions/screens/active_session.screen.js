import React, { useState,useEffect } from "react";
import { ScrollView, RefreshControl,StyleSheet } from "react-native";
import { ActiveSessionList } from "../components/active/activeList";
import CameraService from "../../../services/external/camera.service";
import Toast from "react-native-toast-message";
import { Layout, Card, Text } from "@ui-kitten/components";

export function ActiveSessionScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);

  useEffect(() => {
    async function refreshData() {
      setActiveSessions([]);
      let response = await CameraService.GetActiveSessions();
      if (response.status == 200) {
        if(response.data.length == 0){
          Toast.show({
            type: "info",
            text1: `No sessions found`,
          });
        }
        setActiveSessions(response.data);  
      } else {
        Toast.show({
          type: "error",
          text1: `Failed fetching active sessions.`,
        });
      }
    }
    refreshData();
  }, []);

  async function refreshData() {
    setActiveSessions([]);
    let response = await CameraService.GetActiveSessions();
    if (response.status == 200) {
      if(response.data.length == 0){
        Toast.show({
          type: "info",
          text1: `No sessions found`,
        });
      }
      setActiveSessions(response.data);

    } else {
      Toast.show({
        type: "error",
        text1: `Failed fetching active sessions.`,
      });
    }
  }

  async function cancelSession(sessionName) {
    let response = await CameraService.CancelSession(sessionName);
    if (response.status == 200) {
      Toast.show({
        type: "success",
        text1: `Session cancelled successfully`,
      });
      refreshData();
    } else {
      Toast.show({
        type: "error",
        text1: `Failed to cancel the session.`,
      });
    }
  }

  return (
    <>
      {activeSessions.length == 0 ? (
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }>
          <Card
            style={styles.card}
            status="info"
          >
            <Text>There are no active sessions, pull down to refresh.</Text>
          </Card>
        </ScrollView>
      ) : (
        <>
          <ActiveSessionList activeSessions={activeSessions} refreshData={refreshData}
          cancelSession={cancelSession} setActiveSessions={setActiveSessions}
          />
        </>)}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});
