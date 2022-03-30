import React from "react";
import { CelestialBodyDetailCard } from "../../celestial_bodies/components/celestialBody-detail-card";
import styled from "styled-components";
import { Button, Icon } from "@ui-kitten/components";
import { Spacer } from "../../../components/spacer/spacer";
import { PreviewBody } from "../../celestial_bodies/components/previewSection";
export const FavoritesDetailScreen = ({ route, navigation }) => {
  const { celestialBody } = route.params;
  const TelescopeIcon = (props) => <Icon {...props} name="telescope" />;
  const SessionButton = styled(Button)`
    margin: 0px 16px 0px 16px;
  `;
  return (
    <>
      <CelestialBodyDetailCard celestialBody={celestialBody} />
      <PreviewBody
        rightAscension={celestialBody.rightAscension}
        declination={celestialBody.declination}
        type={celestialBody.type}
      />
      <Spacer position="bottom" size="large" />
      <SessionButton
        status="primary"
        accessoryLeft={TelescopeIcon}
        onPress={() =>
          navigation.navigate("CreateSession", {
            celestialBody: celestialBody,
          })
        }
      >
        Create Session
      </SessionButton>
    </>
  );
};
