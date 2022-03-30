import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components";
export const SafeArea = styled.SafeAreaView`
  margin-top: ${getStatusBarHeight()}px;
`;
