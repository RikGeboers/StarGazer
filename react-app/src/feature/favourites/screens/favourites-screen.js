import React, { useContext } from "react";
import styled from "styled-components";
import { TouchableOpacity, FlatList,StyleSheet } from "react-native";
import { Spacer } from "../../../components/spacer/spacer";
import { CelestialBodyInfoCard } from "../../celestial_bodies/components/celestialBody-info-card";
import { FavouritesContext } from "../../../services/internal/favourites/facourites.context";
import { Layout, Card, Text } from "@ui-kitten/components";

const CelestialBodyList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return (
    <>
      {favourites.length == 0
        ?
        <Card
          style={styles.card}
          status="info"
        >
          <Text>You have no favorites yet, select one in library by clicking the heart symbol.</Text>
        </Card>
        :
        <CelestialBodyList
          data={favourites}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FavoritesDetail", {
                    celestialBody: item,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <CelestialBodyInfoCard celestialBody={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      }
    </>
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});