import React, { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer";
import { Text } from "../../../components/typography/text";
import {
  Icon,
  IconContainer,
  TitleContainer,
  DetailTitleContainer,
  FavoriteContainer,
  FavoriteIcon,
  PlanetIcon,
} from "./celestialBody-info-card.styles";
import horizonImg from "../../../../assets/icons/horizon-icon.png";
import binocularImg from "../../../../assets/icons/binocular-flat.png";
import { Planet } from "../../../components/planets/images";
import styled from "styled-components";
import {
  Background,
  CelestialBodyImg,
  Coordinates,
  InfoCard,
  InfoCardTitle,
} from "./celestialBody-detail-card.styles";
import {
  Declination,
  RightAscension,
} from "../../../components/coordinates/rightAscensionAndDeclination";
import { Favourite } from "../../../components/favourites/favourite";
import backgroundImage from "../../../../assets/background.jpeg";
import { Image, ImageBackground } from "react-native";
import { RowContainer } from "../../sessions/components/active/sessionCard";
export function CelestialBodyDetailCard({ celestialBody = {} }) {
  let photo;
  if (celestialBody.type !== "PLANET") {
    photo = Planet(celestialBody.type.toLowerCase());
  } else {
    photo = Planet(celestialBody.name.toLowerCase());
  }
  const Container = styled.View`
    margin: 16px;
    height: 60%;
    border-radius: 8px;

    background-color: rgba(255, 255, 255, 10);
    overflow: hidden;
  `;
  const Left = styled.View`
    padding-left: 8px;
    padding-top: 4px;
  `;
  const Middle = styled.View`
    flex: 2;
    justify-content: center;

    flex-direction: column;
    padding-left: 16px;
  `;
  const Right = styled.View`
    flex: 1;
    justify-content: center;
    padding-top: -20px;
    align-items: center;
    flex-direction: column;
  `;
  const {
    name = "Jupiter",
    photos = photo,
    description,
    aboveHorizon,
    nakedEyeObject,
    rightAscension,
    declination,
    type,
  } = celestialBody;

  return (
    <Container>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ height: 180 }}
      >
        <DetailTitleContainer>
          <Left>
            <CelestialBodyImg source={photos} />
          </Left>

          <Middle>
            <Text variant="detailTitle">{name}</Text>
            <Text variant="descriptionTitle">{description}</Text>
            <Spacer position="bottom" size="medium" />
            <IconContainer>
              {nakedEyeObject && (
                <>
                  <Icon source={binocularImg} />
                  <Spacer position="right" size="small" />
                  <Text variant="captionInverted">Visible naked eye</Text>
                  <Spacer position="right" size="medium" />
                </>
              )}
            </IconContainer>
            <Spacer position="bottom" size="small" />
            <IconContainer>
              {aboveHorizon && (
                <>
                  <Icon source={horizonImg} />
                  <Spacer position="right" size="small" />
                  <Text variant="captionInverted">Above the horizon</Text>
                </>
              )}
            </IconContainer>
          </Middle>
          <Right>
            <Favourite celestialBody={celestialBody} />
          </Right>
        </DetailTitleContainer>
      </ImageBackground>
      <InfoCard>
        <InfoCardTitle>
          <Text variant="infoCardTitle">Info</Text>
        </InfoCardTitle>
        <RowContainer>
          <Text variant="labelTitle">Type:</Text>
        </RowContainer>
        <RowContainer>
          <Spacer position="left" size="medium" />
          <Text variant="label">
            {type.charAt(0).toUpperCase() + type.toLowerCase().slice(1)}
          </Text>
        </RowContainer>
        <RowContainer>
          <Text variant="labelTitle">Description:</Text>
        </RowContainer>
        <RowContainer>
          <Spacer position="left" size="medium" />
          <Text variant="label">{description}</Text>
        </RowContainer>
        {celestialBody.name.toLowerCase() !== "earth" ? (
          <>
            <RowContainer>
              <Text variant="labelTitle">Right Ascension:</Text>
            </RowContainer>
            <RowContainer>
              <Spacer position="left" size="medium" />
              {RightAscension(rightAscension)}
            </RowContainer>

            <RowContainer>
              <Text variant="labelTitle">Declination:</Text>
            </RowContainer>
            <RowContainer>
              <Spacer position="left" size="medium" />
              {Declination(declination)}
            </RowContainer>
          </>
        ) : (
          <>
            <Text variant="labelTitle">Location:</Text>
            <Text variant="error">You are standing on it</Text>
          </>
        )}
      </InfoCard>
    </Container>
  );
}
