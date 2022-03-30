import React, { useContext, useState, useEffect } from "react";
import { SafeArea } from "../../../utils/SafeArea";
import { Search } from "../components/search";
import { TouchableOpacity, FlatList, RefreshControl } from "react-native";
import styled from "styled-components";
import { CelestialBodyInfoCard } from "../components/celestialBody-info-card";
import { Spacer } from "../../../components/spacer/spacer";
import { ActivityIndicator, Colors } from "react-native-paper";
import { PlanetContext } from "../../../services/internal/bodies/planet.context";
import { MessierContext } from "../../../services/internal/bodies/messier.context";
import { NgcContext } from "../../../services/internal/bodies/ngc.context";
import { ManualContext } from "../../../services/internal/manualBodies/manual.context";

const CelestialBodyList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
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
  const { manuals } = useContext(ManualContext);
  const isLoading = planetIsLoading || messierIsLoading || ngcIsLoading;
  const error = [planetError, messierError, ngcError];
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterKey, setFilterKey] = useState("ALL");
  const [refreshing, setRefreshing] = useState(false);

  //todo show error
  let types = [...new Set(originalData.map((f) => f.type))];

  useEffect(() => {
    let initArray = [];
    planets.map((p) => initArray.push(p));
    messier.map((p) => initArray.push(p));
    ngc.map((p) => initArray.push(p));
    if (manuals.length > 0) manuals.map((p) => initArray.push(p));
    setOriginalData(initArray);
    setFilteredData(initArray);
  }, [planets, messier, ngc]);
  function refreshData() {
    setRefreshing(true);
    setFilterKey("ALL");
    let initArray = [];
    planets.map((p) => initArray.push(p));
    messier.map((p) => initArray.push(p));
    ngc.map((p) => initArray.push(p));
    if (manuals.length > 0) manuals.map((p) => initArray.push(p));
    setOriginalData(initArray);
    setFilteredData(initArray);
    setRefreshing(false);
  }
  useEffect(() => {
    refreshData();
  }, [manuals]);

  function filter(type) {
    if (types.includes(type)) {
      const newData = originalData.filter((p) => p.type === type);
      setFilterKey(type);
      setFilteredData(newData);
    } else if (type === "ALL") {
      setFilteredData(originalData);
      setFilterKey(type);
    }
  }
  function search(keyWord) {
    if (keyWord.length > 0) {
      if (types.includes(keyWord)) {
        setFilterKey(keyWord);
      }
      if (filterKey === "ALL") {
        const key = keyWord.toLowerCase();
        const newFilterData = originalData.filter((p) => {
          const description = p.description;
          if (description !== undefined)
            return (
              description.toLowerCase().includes(key) ||
              p.name.toLowerCase().includes(key)
            );
        });
        setFilteredData(newFilterData);
      } else {
        const key = keyWord.toLowerCase();
        const newData = originalData
          .filter((p) => p.type === filterKey)
          .filter((p) => {
            const description = p.description;
            if (description !== undefined)
              return (
                description.toLowerCase().includes(key) ||
                p.name.toLowerCase().includes(key)
              );
          });

        setFilteredData(newData);
      }
    } else {
      if (keyWord === "") setFilteredData(originalData);
    }
  }

  return (
    <>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

      <Search
        active={filterKey}
        types={types}
        filter={filter}
        search={search}
      />
      <CelestialBodyList
        data={filteredData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
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
    </>
  );
};
