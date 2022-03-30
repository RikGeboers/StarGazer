import React from "react";
import {
  CenteredContainer,
  AboutParagraph,
  ButtonContainer,
  BlogButton,
} from "../screens/about.style";
import { Image, ImageBackground } from "react-native";
import { Title } from "react-native-paper";
import stargazerImage from "../../../../assets/StarGazer.png";
import backgroundImage from "../../../../assets/background.jpeg";
import { Linking } from "react-native";

const cardShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.2,
  shadowRadius: 0.32,
  elevation: 7,
};

const About = () => {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <CenteredContainer style={{ cardShadow }}>
        <Image
          source={stargazerImage}
          style={{
            width: "115%",
            height: 180,
            marginTop: "-3%",
            marginBottom: "5%",
          }}
        />
        <Title>About us</Title>
        <AboutParagraph>
          We are Applied Computer Science students at Karel de Grote Hogeschool
          who are interested in astronomy.
        </AboutParagraph>
        <Title>About this project</Title>
        <AboutParagraph>
          This project was created as part of a course called "The Lab", here we
          learned to create a project with technology that we have never used
          before.
        </AboutParagraph>
      </CenteredContainer>
      <ButtonContainer>
        <Title>Read our blog for more</Title>
        <BlogButton
          icon={"arrow-right"}
          onPress={() => Linking.openURL("https://stargazer.hashnode.dev")}
        />
      </ButtonContainer>
    </ImageBackground>
  );
};

export default About;
