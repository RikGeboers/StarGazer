import styled from "styled-components";
import {
  Card,
  Text,
  IconButton,
  Title as TitlePaper,
} from "react-native-paper";
import { Animated } from "react-native";

export const CenteredContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 100%;
`;

export const AnimatedCard = styled(Animated.View)`
  height: 26%;
  width: 95%;
  margin: 1%;
`;

export const HomeCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 102%;
  width: 100%;
  border-radius: 10px;
  margin: 2%;
`;

export const HomeCardTitle = styled(Card.Title)`
  width: 80%;
`;

export const CardText = styled(Text)`
  font-size: 11px;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 1%;
`;

export const AnimatedCardText = styled(Animated.Text)`
  font-size: 11px;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 1%;
`;

export const TextRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const HomeHeader = styled.View`
  padding: 3%;
  align-items: center;
`;

export const RightButton = styled(IconButton)`
  background-color: ${(props) => props.theme.colors.text.inverse};
`;

export const buttonShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 0.1,
  elevation: 2,
};

export const hRuleStyle = {
  borderBottomColor: "lightgrey",
  borderBottomWidth: 1,
  width: "95%",
  margin: "2%",
};
