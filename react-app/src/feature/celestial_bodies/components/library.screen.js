import React, { useContext } from "react";
import { SafeArea } from "../../../utils/SafeArea";
import { Search } from "../components/search";
import { TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components";
import { CelestialBodyInfoCard } from "../components/celestialBody-info-card";
import { Spacer } from "../../../components/spacer/spacer";
import { ActivityIndicator, Colors } from "react-native-paper";
import { PlanetContext } from "../../../services/internal/bodies/planet.context";
import { MessierContext } from "../../../services/internal/bodies/messier.context";
import { NgcContext } from "../../../services/internal/bodies/ngc.context";
import { FilterBar } from "../components/filterBar";

const CelestialBodyList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  margin-bottom: ${(props) => props.theme.space[5]};
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const LibraryScreen = ({ navigation }) => {
  const { planetIsLoading, planetError, planets } = useContext(PlanetContext);
  const { messierIsLoading, messierError, messier } =
    useContext(MessierContext);
  const { ngcIsLoading, ngcError, ngc } = useContext(NgcContext);
  const data = [];
  const isLoading = planetIsLoading || messierIsLoading || ngcIsLoading;
  const error = [planetError, messierError, ngcError];
  //todo show error
  planets.map((p) => data.push(p));
  messier.map((p) => data.push(p));
  ngc.map((p) => data.push(p));
  const types = ["planets", "messier"];
  return (
    <>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <SafeArea>
        <Search />
        <FilterBar types={types} />
        <CelestialBodyList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CelestialBodyDetail", {
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
      </SafeArea>
    </>
  );
};
