import { Searchbar } from "react-native-paper";
import styled from "styled-components";

import React, { useState } from "react";
import { FilterBar } from "./filterBar";
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  padding-bottom: 0px;
`;

export function Search(props) {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search a celestial body"
        value={searchKeyWord}
        onSubmitEditing={() => props.search(searchKeyWord)}
        onIconPress={() => props.search(searchKeyWord)}
        onChangeText={(text) => {
          props.search(text);
          setSearchKeyWord(text);
        }}
      />
      <FilterBar
        active={props.active}
        filter={props.filter}
        types={props.types}
      />
    </SearchContainer>
  );
}
