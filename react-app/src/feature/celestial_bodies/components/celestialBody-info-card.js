import React from "react";
import { Spacer } from "../../../components/spacer/spacer";
import { Text } from "../../../components/typography/text";
import {
  CelestialBodyCard,
  Section,
  Info,
  PlanetPictureContainer,
  Icon,
  IconContainer,
  TitleContainer,
  FavoriteContainer,
  PlanetIcon,
} from "./celestialBody-info-card.styles";
import horizonImg from "../../../../assets/icons/horizon-icon.png";
import binocularImg from "../../../../assets/icons/binocular-flat.png";
import { Planet } from "../../../components/planets/images";
import { Favourite } from "../../../components/favourites/favourite";

export function CelestialBodyInfoCard({ celestialBody = {} }) {
  let photo;
  if (celestialBody.type !== "PLANET") {
    photo = Planet(celestialBody.type.toLowerCase());
  } else {
    photo = Planet(celestialBody.name.toLowerCase());
  }
  const {
    name = "Jupiter",
    photos = photo,
    description = "solar system",
    aboveHorizon = false,
    nakedEyeObject = true,
  } = celestialBody;
  return (
    <Section>
      <PlanetPictureContainer>
        <PlanetIcon source={photos} />
      </PlanetPictureContainer>
      <CelestialBodyCard>
        <Info>
          <TitleContainer>
            <Text variant="title">{name}</Text>
            <FavoriteContainer>
              <Favourite celestialBody={celestialBody} />
            </FavoriteContainer>
          </TitleContainer>
          <Text variant="caption">{description}</Text>
          <Spacer position="bottom" size="small" />
          <IconContainer>
            {nakedEyeObject && (
              <>
                <Icon source={binocularImg} />
                <Spacer position="right" size="small" />
                <Text variant="caption">Visible naked eye</Text>
                <Spacer position="right" size="medium" />
              </>
            )}
            {aboveHorizon && (
              <>
                <Icon source={horizonImg} />
                <Spacer position="right" size="small" />
                <Text variant="caption">Above the horizon</Text>
              </>
            )}
          </IconContainer>
        </Info>
      </CelestialBodyCard>
    </Section>
  );
}
