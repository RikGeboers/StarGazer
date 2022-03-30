import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FinishedSessionScreen } from "../../../feature/sessions/screens/finished_session.screen";
import { ActiveSessionScreen } from "../../../feature/sessions/screens/active_session.screen";

const Tab = createBottomTabNavigator();

export const SessionNavigation = () => (
  <Tab.Navigator
    initialRouteName="ActiveSessions"
    screenOptions={{
      tabBarActiveTintColor: "#219CF0",
    }}
  >
    <Tab.Screen
      name="ActiveSessions"
      component={ActiveSessionScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Active",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="access-point"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="FinishedSessions"
      component={FinishedSessionScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Finished",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="check-all" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
