import styled from "styled-components";

export const Background = styled.Image`
  height: 25%;
  width: 100%;
`;
export const CelestialBodyImg = styled.Image`
  height: 170px;
  width: 170px;
`;
export const Coordinates = styled.View`
  flex-direction: row;
`;
export const PlanetImageContainer = styled.View`
  flex-direction: row;
`;
export const InfoCard = styled.View`
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.space[3]};
`;
export const InfoCardTitle = styled.View`
  border-bottom-color: ${(props) => props.theme.colors.bg.tertiary};
  border-bottom-width: 2px;
  width: 30%;
`;
