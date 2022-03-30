import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastucture/theme";
import Toast from "react-native-toast-message";
import { MaterialCommunityIconsPack } from "./src/utils/IconAdaptor";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Providers } from "./src/services/internal/index.context";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import HomeNavigation from "./src/infrastucture/navigation/home/home.navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <IconRegistry icons={MaterialCommunityIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Providers>
          <NavigationContainer>
            <HomeNavigation />
          </NavigationContainer>
        </Providers>
      </ApplicationProvider>
      <ExpoStatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}
