import {
  HomeCard,
  HomeCardTitle,
  CardText,
  TextRow,
  AnimatedCard,
  AnimatedCardText,
  buttonShadow,
  RightButton,
  hRuleStyle,
} from "../screens/home.style";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";

export default function GetStartedCard({
  y,
  stretch,
  expandGetStarted,
  setExpandGetStarted,
  fadeContentIn,
}) {
  return (
    <>
      <AnimatedCard style={{ transform: [{ translateY: y }], height: stretch }}>
        <HomeCard>
          <TextRow>
            <HomeCardTitle
              title="Get started"
              subtitle="Get started with astrophotography."
            />
            <RightButton
              icon={expandGetStarted ? "arrow-down" : "arrow-right"}
              size={22}
              color={"black"}
              style={buttonShadow}
              onPress={() => setExpandGetStarted(!expandGetStarted)}
            />
          </TextRow>
          <View style={hRuleStyle} />
          <Card.Content>
            <TextRow>
              <CardText>
                Learn how to set yourself up for a nice stargazing experience.
                Follow step by step instructions on how to set up your Raspberry
                PI and telescope.
              </CardText>
            </TextRow>
            {expandGetStarted && (
              <>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  <Title>Step 1 - Connecting everything</Title>
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  - Connect the DSLR camera to the Raspberry Pi
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  - Connect the telescope to the Raspberry Pi
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  - Make sure the Raspberry Pi acts as a wifi access point
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  - Connect your smartphone with this wifi access point
                </AnimatedCardText>
                <View style={hRuleStyle} />
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  <Title>Step 2 - Align the telescope</Title>
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  Make sure that you have aligned your telescope correctly. This
                  is necessary for slewing the telescope in the right direction.
                </AnimatedCardText>
                <View style={hRuleStyle} />
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  <Title>Step 3 - Settings</Title>
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  Follow the instructions in the settings tab in the mobile app.
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  In telescope settings, set the telescope to the one you are
                  currently using.
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  Apply changes to the camera settings for better picture
                  quality.
                </AnimatedCardText>
                <AnimatedCardText style={{ opacity: fadeContentIn }}>
                  It is also recommended to disable stand-by on your DSLR camera
                  to ensure that the camera is always active.
                </AnimatedCardText>
                <View style={hRuleStyle} />
                <Title>Enjoy stargazing!</Title>
              </>
            )}
          </Card.Content>
        </HomeCard>
      </AnimatedCard>
    </>
  );
}
