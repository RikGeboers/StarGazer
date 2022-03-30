import styled from "styled-components";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { Spacer } from "../../../components/spacer/spacer";

const FilterButton = styled(Button).attrs(({ active }) => ({
  mode: active ? "contained" : "outlined",
  labelStyle: { fontSize: 10 },
}))`
  margin-top: 10px;
`;

const Bar = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})`
  height: 40px;

  margin-left: 16px;
  margin-bottom: 5px;
`;
export const FilterBar = (props) => {
  return (
    <Bar>
      <FilterButton
        active={props.active === "ALL"}
        key={`filterbutton-${99}`}
        onPress={() => props.filter("ALL")}
      >
        All
      </FilterButton>
      <Spacer key={`spacer-${99}`} position="right" size="small" />
      {props.types.map((type, i) => (
        <React.Fragment key={`open-${i}`}>
          <FilterButton
            active={props.active === type}
            key={`filterbutton-${i}`}
            onPress={() => props.filter(type)}
          >
            {type}
          </FilterButton>
          {props.types.length >= i ? (
            <Spacer key={`spacer-${i}`} position="right" size="small" />
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </Bar>
  );
};
