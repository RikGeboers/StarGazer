import { Button, Icon } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Image, ImageBackground } from "react-native";
import { CelestialBodyDetailCard } from "../components/celestialBody-detail-card";
import backgroundImage from "../../../../assets/background.jpeg";
import styled from "styled-components";
import { TelescopeSection } from "../../sessions/components/form/telescope";
import { PreviewBody } from "../components/previewSection";
import { Spacer } from "../../../components/spacer/spacer";
import { FavouritesContext } from "../../../services/internal/favourites/facourites.context";
import { ManualContext } from "../../../services/internal/manualBodies/manual.context";
export const CelestialBodyDetailScreen = ({ route, navigation }) => {
  const { celestialBody } = route.params;
  const { removeFromManuals } = useContext(ManualContext);
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
      {celestialBody.created && (
        <>
          <Spacer position="bottom" size="medium" />
          <SessionButton
            status="danger"
            onPress={() => {
              removeFromManuals(celestialBody);
              navigation.navigate("CelestialBody");
            }}
          >
            Delete
          </SessionButton>
        </>
      )}
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
