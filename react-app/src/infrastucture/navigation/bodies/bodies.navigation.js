import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CelestialBodyNavigator } from "./bodyDetail.navigation";
import { FavouritesScreen } from "../../../feature/favourites/screens/favourites-screen";
import { ManualAddBody } from "../../../feature/celestial_body_form/screens/form-screen";
import { SessionScreen } from "../../../feature/extra/screen/session.screen";
import { FavoritesNavigator } from "./favoriteDetail.navigation";

const Tab = createBottomTabNavigator();

export const BodiesNavigation = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "#219CF0",
    }}
  >
    <Tab.Screen
      name="FavoritesScreen"
      component={FavoritesNavigator}
      options={{
        headerShown: false,
        tabBarLabel: "Favorites",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="heart" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Library"
      component={CelestialBodyNavigator}
      options={{
        headerShown: false,
        tabBarLabel: "Library",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="book-open-variant"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={ManualAddBody}
      options={{
        tabBarLabel: "Add",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-thick" color={color} size={size} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="StarGazing Session Home"
      component={SessionScreen}
      options={{
        tabBarLabel: "StarGazing Session Home",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="timelapse" color={color} size={size} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);
