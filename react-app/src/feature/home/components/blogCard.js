import {
  HomeCard,
  HomeCardTitle,
  CardText,
  TextRow,
  RightButton,
  AnimatedCard,
  buttonShadow,
  hRuleStyle,
} from "../screens/home.style";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Linking } from "react-native";

export default function BlogCard({ fadeOut }) {
  return (
    <>
      <AnimatedCard style={{ opacity: fadeOut }}>
        <HomeCard>
          <TextRow>
            <HomeCardTitle
              title="Check out our blog"
              subtitle="Read our blog for more information."
            />
            <RightButton
              icon="arrow-right"
              onPress={() => Linking.openURL("https://stargazer.hashnode.dev")}
              size={22}
              color={"black"}
              style={buttonShadow}
            />
          </TextRow>
          <View style={hRuleStyle} />
          <Card.Content>
            <TextRow>
              <CardText>
                Read our blog for a clear explanation on how this project was
                designed.
              </CardText>
            </TextRow>
          </Card.Content>
        </HomeCard>
      </AnimatedCard>
    </>
  );
}
