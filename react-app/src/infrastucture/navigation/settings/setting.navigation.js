import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CameraSettingsScreen } from "../../../feature/camera/screen/externalCameraSettingsScreen";
import { SettingsScreen } from "../../../feature/settings/screens/settingsScreen";
import { TelescopeSettingsScreen } from "../../../feature/telescope/screens/telescopeSettingsScreen";
const Tab = createBottomTabNavigator();

export const SettingsNavigation = () => (
  <Tab.Navigator
    initialRouteName="ActiveSessions"
    screenOptions={{
      tabBarActiveTintColor: "#219CF0",
    }}
  >
    <Tab.Screen
      name="Pi Settings"
      component={SettingsScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Pi Settings",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="raspberry-pi"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Camera Settings"
      component={CameraSettingsScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Camera Settings",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="camera-retake"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Telescope Settings"
      component={TelescopeSettingsScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Telescope",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="telescope" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
