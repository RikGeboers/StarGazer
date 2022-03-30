import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { LibraryScreen } from "../../../feature/celestial_bodies/screens/library.screen";
import { CelestialBodyDetailScreen } from "../../../feature/celestial_bodies/screens/body-detail.screen";
import { FormSessionScreen } from "../../../feature/sessions/screens/form_session.screen";

const CelestialBodyStack = createStackNavigator();

export const CelestialBodyNavigator = () => {
  return (
    <CelestialBodyStack.Navigator
    // screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <CelestialBodyStack.Screen
        name="CelestialBody"
        component={LibraryScreen}
        options={{
          headerShown: false,
        }}
      />
      <CelestialBodyStack.Screen
        name="CelestialBodyDetail"
        component={CelestialBodyDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <CelestialBodyStack.Screen
        name="CreateSession"
        component={FormSessionScreen}
        options={{
          headerShown: false,
        }}
      />
    </CelestialBodyStack.Navigator>
  );
};
