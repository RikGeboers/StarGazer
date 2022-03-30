import React, { useState, useRef, useEffect } from "react";
import { CenteredContainer, HomeHeader } from "./home.style";
import { Title, Subheading } from "react-native-paper";
import { ImageBackground, Animated } from "react-native";
import BlogCard from "../components/blogCard";
import LocationCard from "../components/locationCard";
import GetStartedCard from "../components/getStartedCard";
import backgroundImage from "../../../../assets/background.jpeg";

const Home = () => {
  const moveStarted = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const stretch = useRef(new Animated.Value(100)).current;
  const fadeContentIn = useRef(new Animated.Value(0)).current;
  const [expandGetStarted, setExpandGetStarted] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeOut, {
        toValue: expandGetStarted ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
        delay: expandGetStarted ? 0 : 150,
      }),
      Animated.timing(moveStarted, {
        toValue: expandGetStarted ? { x: 0, y: -50 } : { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(stretch, {
        toValue: expandGetStarted ? 550 : 150,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeContentIn, {
        toValue: expandGetStarted ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
        delay: expandGetStarted ? 0 : 150,
      }),
    ]).start();
  }, [expandGetStarted]);

  async function checkPermission() {
    console.log(status.granted);
    if (status.granted === false) {
      await MediaLibrary.requestPermissionsAsync().catch((error) => {
        console.log(error);
      });
    }
  }
  return (
    <CenteredContainer>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <HomeHeader>
          <Title style={{ color: "white" }}>Welcome to StarGazer</Title>
          <Subheading style={{ color: "white" }}>
            Stargazing made easy!
          </Subheading>
        </HomeHeader>
        <LocationCard fadeOut={fadeOut} />
        <GetStartedCard
          y={moveStarted.y}
          stretch={stretch}
          expandGetStarted={expandGetStarted}
          setExpandGetStarted={setExpandGetStarted}
          fadeContentIn={fadeContentIn}
        />
        <BlogCard fadeOut={fadeOut} />
      </ImageBackground>
    </CenteredContainer>
  );
};

export default Home;
