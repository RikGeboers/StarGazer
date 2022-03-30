import {
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import react, { useState, useEffect } from "react";
import { Spacer } from "../../../../components/spacer/spacer";
import { SessionCard } from "./sessionCard";
import styled from "styled-components";
const SessionList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export function ActiveSessionList(props) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const refactorData = props.activeSessions.map((s, index) => ({
      ...s,
      open: false,
      id: index,
    }));
    props.setActiveSessions(refactorData)
  }, []);

  function updateState(id) {
    let items = props.activeSessions.slice();
    items.map((s) => {
      if (s.id === id) {
        s.open ? (s.open = false) : (s.open = true);
      }
    });
    props.setActiveSessions(items);
  }

  return (
        <>
          <SessionList
            data={props.activeSessions}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={props.refreshData} />
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => updateState(item.id)}>
                  <Spacer position="bottom" size="large">
                    <SessionCard session={item} open={item.open} cancelSession={props.cancelSession}/>
                  </Spacer>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.sessionName}
          />
        </>
  );
}