import styled from "styled-components";
import { Text } from "../../../../components/typography/text";
import { TouchableOpacity } from "react-native";
export const RowContainer = styled.View`
  flex-direction: row;
`;
export const ButtonTitleEnd = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const SectionTitleArea = styled(TouchableOpacity)`
  flex-direction: row;
`;
export const TilteArea = styled.View`
  flex: 4;
`;

export const TilteBorder = styled.View`
  border-bottom-color: ${(props) => props.theme.colors.bg.tertiary};
  border-bottom-width: 2px;
  width: 35%;
`;
