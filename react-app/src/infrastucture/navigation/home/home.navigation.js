import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../../../feature/home/screens/home";
import AboutScreen from "../../../feature/about/screens/about.screen";
import { BodiesNavigation } from "../bodies/bodies.navigation";
import { SessionNavigation } from "../sessions/sessions.navigation";
import { CameraSettingsScreen } from "../../../feature/camera/screen/externalCameraSettingsScreen";
import { SettingsScreen } from "../../../feature/settings/screens/settingsScreen";
import { TelescopeSettingsScreen } from "../../../feature/telescope/screens/telescopeSettingsScreen";
import { ExtraNavigation } from "../extra/extra.navigation";
import { SettingsNavigation } from "../settings/setting.navigation";

const Drawer = createDrawerNavigator();

export default function HomeNavigation() {
  const iconSize = 18;
  const iconColor = "grey";

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="home"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sessions"
        component={SessionNavigation}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="camera"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Celestial Bodies"
        component={BodiesNavigation}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="weather-night"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />

      <Drawer.Screen
        name=" Settings"
        component={SettingsNavigation}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="cog"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Extras"
        component={ExtraNavigation}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-grid-plus"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
