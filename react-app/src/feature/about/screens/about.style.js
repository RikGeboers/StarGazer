import styled from "styled-components";
import { Paragraph, IconButton } from "react-native-paper";

export const CenteredContainer = styled.View`
  align-items: center;
  margin: 5% 7.5% 2.5% 7.5%;
  height: 82%;
  border-radius: 8px;
  padding: 2%;
  background-color: rgba(255,255,255,10);
  overflow: hidden;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin: 0% 7.5% 5% 7.5%;
  height: 9%
  border-radius: 10px;
  padding: 0% 3.5% 0% 8%;
  background-color: rgba(255,255,255,10);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const AboutParagraph = styled(Paragraph)`
 text-align: center;
 padding: 3%;
`

export const BlogButton = styled(IconButton)`
 background-color: ${(props) => props.theme.colors.bg.secondary};
`

export const buttonShadow = {
  shadowColor: "#000",
  shadowOffset: {
	  width: 0,
	  height: 0,
  },
  shadowOpacity: 0.20,
  shadowRadius: 0.10,
  elevation: 2,
}

