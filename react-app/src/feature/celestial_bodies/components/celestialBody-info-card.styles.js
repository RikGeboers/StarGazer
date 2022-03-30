import styled from "styled-components";
import { Card } from "react-native-paper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export const CelestialBodyCard = styled.View`
  flex-grow: 1;
  z-index: 1;
  margin-left: -30px;
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const CelestialBodyCover = styled(Card.Title)`
  padding: ${(props) => props.theme.space[3]};

  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Info = styled.View`
  margin-left: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[3]};
`;
export const PlanetIcon = styled.Image`
  height: 80px;
  width: 80px;
`;
export const PlanetPictureContainer = styled.View`
  z-index: 2;
`;
export const Section = styled.View`
  flex-direction: row;
`;

export const Icon = styled.Image`
  height: 20px;
  width: 20px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
`;
export const TitleContainer = styled.View`
  flex-direction: row;
`;
export const DetailTitleContainer = styled.View`
  flex-direction: row;
`;
export const FavoriteContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
export const FavoriteIcon = styled(MaterialCommunityIcons)`
  font-size: 30px;
`;
export const DirectionRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;
