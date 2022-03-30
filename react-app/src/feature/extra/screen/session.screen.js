import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import { ExportTimelapseScreen } from "./exportTimelapse.screen";
import { CreateTimelapseScreen } from "./createTimelapse.screen";
import { ManageSessionImages } from "./manageSessionImages.screen";
import { VideoScreen } from "./video.screen";
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;


// export const SessionScreen = () => {
//   return (
//     <>
//         <SessionStack />
//     </>
//   );
// };

const Stack = createStackNavigator();


export const SessionScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StarGazing Session" component={HomeScreen} />
      <Stack.Screen name="Manage Timelapse" component={ExportTimelapseScreen} />
      <Stack.Screen name="Create Timelapse" component={CreateTimelapseScreen} />
      <Stack.Screen name="Manange Session Images" component={ManageSessionImages}/>
      <Stack.Screen name="Manange Video" component={VideoScreen}/>
    </Stack.Navigator>
  );
}



function HomeScreen({ navigation }) {
  const onClickCreateTimeLapse = () => {
    navigation.navigate('Create Timelapse');
  };

  const onClickExportTimeLapse = () => {
    navigation.navigate('Export Timelapse');
  };

  const onClickManageSessionImages = () =>{
    navigation.navigate('Manange Session Images');
  }

  const onClickManageVideo = () =>{
    navigation.navigate('Manange Video');
  }
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      margin: 10,
      width: '90%'
    },
  });

  

  return (
    <>
      <Layout style={styles.container}>
        <Button style={styles.button}
          status='info'
        onPress={onClickCreateTimeLapse}
        >
          Create timelapse


        </Button>
        <Button style={styles.button}
          status='info'
          onPress={onClickExportTimeLapse}
        >
          Export timelapse
        </Button>
        <Button style={styles.button}
          status='info'
          onPress={onClickManageVideo}
        >
          Manage Video
        </Button>
        <Button style={styles.button}
          status='info'
        onPress={onClickManageSessionImages}
        >
          Manange Session Images
        </Button>
      </Layout>
    </>
  );
}

