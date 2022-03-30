import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { FavouritesScreen } from "../../../feature/favourites/screens/favourites-screen";
import { FavoritesDetailScreen } from "../../../feature/favourites/screens/favorites-detail-screen";
import { FormSessionScreen } from "../../../feature/sessions/screens/form_session.screen";

const FavoritesStack = createStackNavigator();

export const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavouritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <FavoritesStack.Screen
        name="FavoritesDetail"
        component={FavoritesDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <FavoritesStack.Screen
        name="CreateSession"
        component={FormSessionScreen}
        options={{
          headerShown: false,
        }}
      />
    </FavoritesStack.Navigator>
  );
};
