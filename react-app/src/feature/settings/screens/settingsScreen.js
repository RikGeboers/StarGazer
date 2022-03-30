import React from "react";
import { FirstBootDebugCard } from "../components/firstBootDebug";
import { CheckTimeCard } from "../components/checkTime";
import { ScrollView } from "react-native";

export const SettingsScreen = () => {
  return (
    <ScrollView>
      <FirstBootDebugCard />
      <CheckTimeCard />
    </ScrollView>
  );
};
