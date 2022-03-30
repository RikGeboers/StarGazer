import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { VideoScreen } from "../../../feature/extra/screen/video.screen";
const Tab = createBottomTabNavigator();

export const ExtraNavigation = () => (
  <Tab.Navigator
    initialRouteName="ActiveSessions"
    screenOptions={{
      tabBarActiveTintColor: "#219CF0",
    }}
  >
    <Tab.Screen
      name="ActiveSessions"
      component={VideoScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Video",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="video" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
