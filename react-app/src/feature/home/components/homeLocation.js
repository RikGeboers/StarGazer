import { TextRow, CardText } from "../screens/home.style";

export default function HomeLocation({ latitude, longitude, altitude }) {
  return (
    <>
      <TextRow>
        <CardText>Latitude</CardText>
        <CardText>
          {Math.round((latitude + Number.EPSILON) * 100) / 100}
        </CardText>
      </TextRow>
      <TextRow>
        <CardText>Longitude</CardText>
        <CardText>
          {Math.round((longitude + Number.EPSILON) * 100) / 100}
        </CardText>
      </TextRow>
    </>
  );
}
