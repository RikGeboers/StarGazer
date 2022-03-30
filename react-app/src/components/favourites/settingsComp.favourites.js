import React, { useContext } from "react";
import styled from "styled-components";
import { SettingsFavouritesContext } from "../../services/internal/favourites/settings.favourites.context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 9;
`;
export const Favourite = ({ setting }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(SettingsFavouritesContext);
  const isFavourite = favourites.find((f) => f === setting);
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(setting)
          : removeFromFavourites(setting)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={"red"}
      />
    </FavouriteButton>
  );
};
