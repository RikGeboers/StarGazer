import {
  HomeCard,
  HomeCardTitle,
  AnimatedCard,
  hRuleStyle,
} from "../screens/home.style";

import { View } from "react-native";
import { Card } from "react-native-paper";
import { RequestLocation } from "../../../utils/RequestLocation";
import HomeLocation from "./homeLocation";
import React, { useEffect } from "react";
export default function LocationCard({ fadeOut }) {
  const { longitude, latitude, altitude } = RequestLocation();
  useEffect(() => {}, [longitude, latitude, altitude]);

  return (
    <>
      <AnimatedCard style={{ opacity: fadeOut }}>
        <HomeCard>
          <HomeCardTitle
            title="Your location"
            subtitle="Use this to align your telescope."
          />
          <View style={hRuleStyle} />
          <Card.Content>
            <HomeLocation
              latitude={latitude}
              longitude={longitude}
              altitude={altitude}
            />
          </Card.Content>
        </HomeCard>
      </AnimatedCard>
    </>
  );
}
